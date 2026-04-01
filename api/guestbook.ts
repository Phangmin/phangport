import { randomUUID } from 'node:crypto'
import { existsSync, readFileSync } from 'node:fs'
import path from 'node:path'

type GuestbookPayload = {
  id?: unknown
  nickname?: unknown
  message?: unknown
  password?: unknown
}

type VercelRequestLike = {
  method?: string
  body?: unknown
}

type VercelResponseLike = {
  status: (code: number) => VercelResponseLike
  setHeader: (name: string, value: string) => VercelResponseLike
  send: (body: string) => void
}

type GuestbookRow = {
  id: string
  nickname: string
  message: string
  created_at: string
}

const MAX_NICKNAME_LENGTH = 40
const MAX_MESSAGE_LENGTH = 100

type NeonModule = typeof import('@neondatabase/serverless')
type SqlClient = ReturnType<NeonModule['neon']>

let sqlClient: SqlClient | null = null
let neonLoader: Promise<NeonModule['neon']> | null = null
let localEnvCache: Record<string, string> | null = null

function parseEnvFile(filePath: string) {
  const env: Record<string, string> = {}
  const lines = readFileSync(filePath, 'utf8').split(/\r?\n/)

  for (const line of lines) {
    const trimmed = line.trim()

    if (!trimmed || trimmed.startsWith('#')) {
      continue
    }

    const separatorIndex = trimmed.indexOf('=')

    if (separatorIndex === -1) {
      continue
    }

    const key = trimmed.slice(0, separatorIndex).trim()
    let value = trimmed.slice(separatorIndex + 1).trim()

    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1)
    }

    env[key] = value
  }

  return env
}

function getLocalEnv() {
  if (localEnvCache) {
    return localEnvCache
  }

  const env: Record<string, string> = {}
  const envFilePaths = [
    path.join(process.cwd(), '.env'),
    path.join(process.cwd(), '.env.local'),
  ]

  for (const envFilePath of envFilePaths) {
    if (!existsSync(envFilePath)) {
      continue
    }

    Object.assign(env, parseEnvFile(envFilePath))
  }

  localEnvCache = env
  return env
}

function getEnv() {
  const processValue = (globalThis as typeof globalThis & { process?: { env?: Record<string, string | undefined> } }).process
  const runtimeEnv = processValue?.env ?? {}

  return { ...getLocalEnv(), ...runtimeEnv }
}

async function getNeon() {
  if (!neonLoader) {
    neonLoader = import('@neondatabase/serverless').then((module) => module.neon)
  }

  return neonLoader
}

async function getSql() {
  if (sqlClient) {
    return sqlClient
  }

  const databaseUrl = getEnv().DATABASE_URL

  if (!databaseUrl) {
    throw new Error('DATABASE_URL is not configured.')
  }

  const neon = await getNeon()
  sqlClient = neon(databaseUrl)
  return sqlClient
}

function getAdminPassword() {
  const adminPassword = getEnv().GUESTBOOK_ADMIN_PASSWORD

  if (!adminPassword) {
    throw new Error('GUESTBOOK_ADMIN_PASSWORD is not configured.')
  }

  return adminPassword
}

function toTrimmedString(value: unknown, maxLength: number) {
  if (typeof value !== 'string') {
    return ''
  }

  return value.trim().slice(0, maxLength)
}

function parseBody(body: unknown): GuestbookPayload {
  if (typeof body === 'string') {
    try {
      const parsed = JSON.parse(body) as unknown
      return parsed && typeof parsed === 'object' ? (parsed as GuestbookPayload) : {}
    } catch {
      return {}
    }
  }

  return body && typeof body === 'object' ? (body as GuestbookPayload) : {}
}

function sendJson(response: VercelResponseLike, statusCode: number, payload: Record<string, unknown>) {
  response.status(statusCode).setHeader('Content-Type', 'application/json; charset=utf-8').send(JSON.stringify(payload))
}

function toClientEntry(row: GuestbookRow) {
  return {
    id: row.id,
    nickname: row.nickname,
    message: row.message,
    createdAt: row.created_at,
  }
}

async function handleGet(response: VercelResponseLike) {
  const sql = await getSql()
  const rowsResult = await sql`
    SELECT id, nickname, message, created_at
    FROM guestbook_entries
    ORDER BY created_at DESC
    LIMIT 100
  `
  const rows = rowsResult as GuestbookRow[]

  return sendJson(response, 200, {
    entries: rows.map(toClientEntry),
  })
}

async function handlePost(request: VercelRequestLike, response: VercelResponseLike) {
  const body = parseBody(request.body)
  const entryId = toTrimmedString(body.id, 120) || randomUUID()
  const nickname = toTrimmedString(body.nickname, MAX_NICKNAME_LENGTH)
  const message = toTrimmedString(body.message, MAX_MESSAGE_LENGTH)

  if (!nickname || !message) {
    return sendJson(response, 400, { error: '닉네임과 메시지는 필수입니다.' })
  }

  const sql = await getSql()
  const createdRowsResult = await sql`
    INSERT INTO guestbook_entries (id, nickname, message)
    VALUES (${entryId}, ${nickname}, ${message})
    ON CONFLICT (id) DO UPDATE
    SET nickname = EXCLUDED.nickname,
        message = EXCLUDED.message
    RETURNING id, nickname, message, created_at
  `
  const [createdEntry] = createdRowsResult as GuestbookRow[]

  if (!createdEntry) {
    throw new Error('Failed to create guestbook entry.')
  }

  return sendJson(response, 201, {
    entry: toClientEntry(createdEntry),
  })
}

async function handleDelete(request: VercelRequestLike, response: VercelResponseLike) {
  const body = parseBody(request.body)
  const entryId = toTrimmedString(body.id, 120)
  const password = toTrimmedString(body.password, 120)

  if (!password) {
    return sendJson(response, 400, { error: '관리자 비밀번호를 입력해주세요.' })
  }

  if (password !== getAdminPassword()) {
    return sendJson(response, 403, { error: '관리자 비밀번호가 올바르지 않습니다.' })
  }

  if (!entryId) {
    return sendJson(response, 400, { error: '삭제할 방명록을 찾지 못했습니다.' })
  }

  const sql = await getSql()
  await sql`
    DELETE FROM guestbook_entries
    WHERE id = ${entryId}
  `

  return sendJson(response, 200, { ok: true })
}

export default async function handler(request: VercelRequestLike, response: VercelResponseLike) {
  try {
    if (request.method === 'GET') {
      return await handleGet(response)
    }

    if (request.method === 'POST') {
      return await handlePost(request, response)
    }

    if (request.method === 'DELETE') {
      return await handleDelete(request, response)
    }

    response.setHeader('Allow', 'GET, POST, DELETE')
    return sendJson(response, 405, { error: '허용되지 않은 요청 방식입니다.' })
  } catch (error) {
    console.error('Guestbook API error:', error)
    return sendJson(response, 500, { error: '방명록을 불러오거나 저장하지 못했습니다.' })
  }
}



