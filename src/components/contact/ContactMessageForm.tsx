import { useState } from 'react'
import { RevealOnScroll } from '../common'

const fieldClassName =
  'min-h-[54px] w-full rounded-[16px] border border-blue-600/24 bg-white px-4 text-[0.92rem] text-slate-900 outline-none transition-[border-color,box-shadow,transform] duration-200 placeholder:text-slate-400 focus:-translate-y-px focus:border-blue-600 focus:shadow-[0_0_0_4px_rgba(37,99,235,0.12)]'

type SubmitState =
  | { type: 'idle'; message: '' }
  | { type: 'success' | 'error'; message: string }

function ContactMessageForm() {
  const [name, setName] = useState('')
  const [affiliation, setAffiliation] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitState, setSubmitState] = useState<SubmitState>({ type: 'idle', message: '' })

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (isSubmitting) {
      return
    }

    setIsSubmitting(true)
    setSubmitState({ type: 'idle', message: '' })

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          affiliation,
          email,
          message,
        }),
      })

      const payload = (await response.json().catch(() => null)) as { error?: string } | null

      if (!response.ok) {
        throw new Error(payload?.error ?? '메시지 전송 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.')
      }

      setName('')
      setAffiliation('')
      setEmail('')
      setMessage('')
      setSubmitState({ type: 'success', message: '메시지를 전송했습니다. 확인 후 답변드리겠습니다.' })
    } catch (error) {
      setSubmitState({
        type: 'error',
        message: error instanceof Error ? error.message : '메시지 전송 중 오류가 발생했습니다.',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const submitMessageClassName =
    submitState.type === 'success'
      ? 'text-blue-600'
      : submitState.type === 'error'
        ? 'text-rose-600'
        : 'text-slate-500'

  return (
    <RevealOnScroll
      className="rounded-[30px] border border-slate-900/8 bg-white/95 p-5 shadow-[0_24px_58px_rgba(15,23,42,0.07)] md:p-7"
      data-contact-surface="true"
    >
      <form className="grid gap-4" onSubmit={handleSubmit}>
        <div className="grid gap-4 md:grid-cols-2">
          <input
            id="contact-name"
            name="name"
            aria-label="이름"
            autoComplete="name"
            lang="ko"
            type="text"
            placeholder="이름을 입력해주세요"
            value={name}
            onChange={(event) => setName(event.target.value)}
            className={fieldClassName}
            maxLength={80}
            required
          />

          <input
            id="contact-email"
            name="email"
            aria-label="이메일"
            autoComplete="email"
            lang="ko"
            type="email"
            placeholder="이메일을 입력해주세요"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className={fieldClassName}
            maxLength={160}
            required
          />
        </div>

        <input
          id="contact-affiliation"
          name="affiliation"
          aria-label="소속"
          autoComplete="organization"
          lang="ko"
          type="text"
          placeholder="소속을 입력해주세요"
          value={affiliation}
          onChange={(event) => setAffiliation(event.target.value)}
          className={fieldClassName}
          maxLength={120}
        />

        <textarea
          id="contact-message"
          name="message"
          aria-label="메시지"
          lang="ko"
          placeholder="메시지를 입력해주세요"
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          className="min-h-[220px] w-full resize-y rounded-[18px] border border-blue-600/24 bg-white px-4 py-4 text-[0.92rem] leading-[1.68] text-slate-900 outline-none transition-[border-color,box-shadow,transform] duration-200 placeholder:text-slate-400 focus:-translate-y-px focus:border-blue-600 focus:shadow-[0_0_0_4px_rgba(37,99,235,0.12)]"
          maxLength={4000}
          required
        />

        <div className="flex flex-col gap-3 pt-1 md:flex-row md:items-center md:justify-between">
          <p className="m-0 text-[0.8rem] leading-[1.6] text-slate-500" data-contact-muted="true">
            전달달하고자 하는 내용을 작성해 보내주시면 입력하신 이메일로 회신드립니다.
          </p>
          <button
            type="submit"
            disabled={isSubmitting}
            className="min-h-[54px] rounded-full bg-[linear-gradient(135deg,#2563eb_0%,#0f62fe_100%)] px-6 text-[0.94rem] font-bold text-white transition-opacity duration-200 disabled:cursor-not-allowed disabled:opacity-55"
          >
            {isSubmitting ? '전송 중...' : '메시지 보내기'}
          </button>
        </div>

        {submitState.type !== 'idle' ? (
          <p className={`m-0 text-[0.82rem] leading-[1.6] ${submitMessageClassName}`}>{submitState.message}</p>
        ) : null}
      </form>
    </RevealOnScroll>
  )
}

export default ContactMessageForm
