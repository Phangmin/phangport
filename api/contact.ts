type ContactPayload = {
  name?: unknown
  affiliation?: unknown
  email?: unknown
  message?: unknown
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

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function toTrimmedString(value: unknown, maxLength: number) {
  if (typeof value !== 'string') {
    return ''
  }

  return value.trim().slice(0, maxLength)
}

function escapeHtml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;')
}

function sendJson(response: VercelResponseLike, statusCode: number, payload: Record<string, unknown>) {
  response.status(statusCode).setHeader('Content-Type', 'application/json; charset=utf-8').send(JSON.stringify(payload))
}

function buildHtmlEmail({
  name,
  affiliation,
  email,
  message,
}: {
  name: string
  affiliation: string
  email: string
  message: string
}) {
  const affiliationText = affiliation || '미입력'
  const messageHtml = escapeHtml(message).replaceAll('\n', '<br />')

  return `
    <div style="font-family: Arial, sans-serif; line-height: 1.7; color: #0f172a;">
      <h1 style="font-size: 20px; margin-bottom: 20px;">새 문의가 도착했습니다.</h1>
      <p><strong>이름</strong><br />${escapeHtml(name)}</p>
      <p><strong>이메일</strong><br />${escapeHtml(email)}</p>
      <p><strong>소속</strong><br />${escapeHtml(affiliationText)}</p>
      <p><strong>메시지</strong><br />${messageHtml}</p>
    </div>
  `.trim()
}

function buildTextEmail({
  name,
  affiliation,
  email,
  message,
}: {
  name: string
  affiliation: string
  email: string
  message: string
}) {
  return [
    '새 문의가 도착했습니다.',
    '',
    `이름: ${name}`,
    `이메일: ${email}`,
    `소속: ${affiliation || '미입력'}`,
    '',
    '메시지:',
    message,
  ].join('\n')
}

function parseBody(body: unknown): ContactPayload {
  if (typeof body === 'string') {
    try {
      const parsed = JSON.parse(body) as unknown
      return parsed && typeof parsed === 'object' ? (parsed as ContactPayload) : {}
    } catch {
      return {}
    }
  }

  return body && typeof body === 'object' ? (body as ContactPayload) : {}
}

function getEnv() {
  const processValue = (globalThis as typeof globalThis & { process?: { env?: Record<string, string | undefined> } }).process

  if (!processValue?.env) {
    return {}
  }

  return processValue.env
}

export default async function handler(request: VercelRequestLike, response: VercelResponseLike) {
  if (request.method !== 'POST') {
    response.setHeader('Allow', 'POST')
    return sendJson(response, 405, { error: '허용되지 않은 요청 방식입니다.' })
  }

  const env = getEnv()
  const apiKey = env.RESEND_API_KEY
  const toEmail = env.CONTACT_TO_EMAIL
  const fromEmail = env.CONTACT_FROM_EMAIL || 'Phangport Contact <onboarding@resend.dev>'

  if (!apiKey || !toEmail) {
    return sendJson(response, 500, { error: '메일 전송 설정이 완료되지 않았습니다.' })
  }

  const body = parseBody(request.body)
  const name = toTrimmedString(body.name, 80)
  const affiliation = toTrimmedString(body.affiliation, 120)
  const email = toTrimmedString(body.email, 160)
  const message = toTrimmedString(body.message, 4000)

  if (!name || !email || !message) {
    return sendJson(response, 400, { error: '이름, 이메일, 메시지는 필수입니다.' })
  }

  if (!EMAIL_REGEX.test(email)) {
    return sendJson(response, 400, { error: '올바른 이메일 주소를 입력해주세요.' })
  }

  const resendResponse = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: fromEmail,
      to: [toEmail],
      replyTo: email,
      subject: `[Phangport] ${name}님이 보낸 문의`,
      html: buildHtmlEmail({ name, affiliation, email, message }),
      text: buildTextEmail({ name, affiliation, email, message }),
    }),
  })

  if (!resendResponse.ok) {
    const resendError = await resendResponse.text()
    console.error('Resend send error:', resendResponse.status, resendError)
    return sendJson(response, 502, { error: '메일 전송 서비스와 통신하지 못했습니다.' })
  }

  return sendJson(response, 200, { ok: true })
}
