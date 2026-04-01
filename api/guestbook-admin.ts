import { existsSync, readFileSync } from 'node:fs'
import path from 'node:path'

type GuestbookPayload = {
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

export default async function handler(request: VercelRequestLike, response: VercelResponseLike) {
  try {
    if (request.method !== 'POST') {
      response.setHeader('Allow', 'POST')
      return sendJson(response, 405, { error: '허용되지 않은 요청 방식입니다.' })
    }

    const body = parseBody(request.body)
    const password = toTrimmedString(body.password, 120)

    if (!password) {
      return sendJson(response, 400, { error: '관리자 비밀번호를 입력해주세요.' })
    }

    if (password !== getAdminPassword()) {
      return sendJson(response, 403, { error: '관리자 비밀번호가 올바르지 않습니다.' })
    }

    return sendJson(response, 200, { ok: true })
  } catch (error) {
    console.error('Guestbook admin API error:', error)
    return sendJson(response, 500, { error: '관리자 인증에 실패했습니다.' })
  }
}

