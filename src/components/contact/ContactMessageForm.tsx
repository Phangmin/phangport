import { useState } from 'react'
import useLanguage, { type LanguageCode } from '../../hooks/useLanguage'
import { RevealOnScroll } from '../common'

const fieldClassName =
  'h-[54px] w-full rounded-[16px] border border-slate-900/12 bg-white px-4 text-[0.92rem] text-slate-900 outline-none transition-[border-color,transform] duration-200 placeholder:text-transparent focus:-translate-y-px focus:border-blue-600'

type SubmitState =
  | { type: 'idle'; message: '' }
  | { type: 'success' | 'error'; message: string }

type FloatingFieldProps = {
  id: string
  name: string
  label: string
  language: LanguageCode
  type?: 'text' | 'email'
  autoComplete?: string
  value: string
  onChange: (value: string) => void
  maxLength: number
  required?: boolean
}

type FloatingTextareaProps = {
  id: string
  name: string
  label: string
  language: LanguageCode
  value: string
  onChange: (value: string) => void
  maxLength: number
  required?: boolean
}

type ContactFormCopy = {
  name: string
  email: string
  affiliation: string
  message: string
  submitIdle: string
  submitPending: string
  submitSuccess: string
  submitError: string
}

const contactFormCopyByLanguage: Record<LanguageCode, ContactFormCopy> = {
  ko: {
    name: '이름',
    email: '이메일',
    affiliation: '소속',
    message: '메시지',
    submitIdle: '메시지 보내기',
    submitPending: '전송 중...',
    submitSuccess: '메시지를 전송했습니다. 확인 후 답변드리겠습니다.',
    submitError: '메시지 전송 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.',
  },
  en: {
    name: 'Name',
    email: 'Email',
    affiliation: 'Affiliation',
    message: 'Message',
    submitIdle: 'Send Message',
    submitPending: 'Sending...',
    submitSuccess: 'Your message has been sent. I will reply after reviewing it.',
    submitError: 'An error occurred while sending your message. Please try again shortly.',
  },
}

function FloatingField({
  id,
  name,
  label,
  language,
  type = 'text',
  autoComplete,
  value,
  onChange,
  maxLength,
  required = false,
}: FloatingFieldProps) {
  const [isFocused, setIsFocused] = useState(false)
  const isRaised = isFocused || value.trim().length > 0
  const floatingLabelClassName = isRaised
    ? `pointer-events-none absolute left-3 top-0 z-[1] -translate-y-1/2 rounded-full bg-white px-2 text-[0.72rem] font-semibold leading-none whitespace-nowrap transition-all duration-200 ${
        isFocused ? 'text-blue-600' : 'text-slate-900'
      }`
    : 'pointer-events-none absolute left-3 top-1/2 z-[1] -translate-y-1/2 rounded-full bg-transparent px-2 text-[0.84rem] font-semibold leading-none whitespace-nowrap text-slate-400 transition-all duration-200'

  return (
    <div className="relative" data-contact-floating-field="true">
      <input
        id={id}
        name={name}
        aria-label={label}
        autoComplete={autoComplete}
        lang={language}
        type={type}
        placeholder=" "
        value={value}
        onChange={(event) => onChange(event.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className={fieldClassName}
        data-contact-input="true"
        maxLength={maxLength}
        required={required}
      />
      <label
        htmlFor={id}
        className={floatingLabelClassName}
        data-contact-floating-label="true"
        data-contact-floating-raised={isRaised ? 'true' : 'false'}
      >
        {label}
      </label>
    </div>
  )
}

function FloatingTextarea({
  id,
  name,
  label,
  language,
  value,
  onChange,
  maxLength,
  required = false,
}: FloatingTextareaProps) {
  const [isFocused, setIsFocused] = useState(false)
  const isRaised = isFocused || value.trim().length > 0
  const floatingLabelClassName = isRaised
    ? `pointer-events-none absolute left-3 top-0 z-[1] -translate-y-1/2 rounded-full bg-white px-2 text-[0.72rem] font-semibold leading-none whitespace-nowrap transition-all duration-200 ${
        isFocused ? 'text-blue-600' : 'text-slate-900'
      }`
    : 'pointer-events-none absolute left-3 top-5 z-[1] -translate-y-1/2 rounded-full bg-transparent px-2 text-[0.84rem] font-semibold leading-none whitespace-nowrap text-slate-400 transition-all duration-200'

  return (
    <div className="relative" data-contact-floating-field="true">
      <textarea
        id={id}
        name={name}
        aria-label={label}
        lang={language}
        placeholder=" "
        value={value}
        onChange={(event) => onChange(event.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className="min-h-[220px] w-full resize-y rounded-[18px] border border-slate-900/12 bg-white px-4 py-4 text-[0.92rem] leading-[1.68] text-slate-900 outline-none transition-[border-color,transform] duration-200 placeholder:text-transparent focus:-translate-y-px focus:border-blue-600"
        data-contact-input="true"
        data-contact-textarea="true"
        maxLength={maxLength}
        required={required}
      />
      <label
        htmlFor={id}
        className={floatingLabelClassName}
        data-contact-floating-label="true"
        data-contact-floating-raised={isRaised ? 'true' : 'false'}
      >
        {label}
      </label>
    </div>
  )
}

function ContactMessageForm() {
  const language = useLanguage()
  const copy = contactFormCopyByLanguage[language]
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
        throw new Error(payload?.error ?? copy.submitError)
      }

      setName('')
      setAffiliation('')
      setEmail('')
      setMessage('')
      setSubmitState({ type: 'success', message: copy.submitSuccess })
    } catch (error) {
      setSubmitState({
        type: 'error',
        message: error instanceof Error ? error.message : copy.submitError,
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const submitMessageClassName =
    submitState.type === 'success'
      ? 'text-slate-700'
      : submitState.type === 'error'
        ? 'text-rose-600'
        : 'text-slate-500'

  return (
    <RevealOnScroll
      className="rounded-[30px] border border-slate-900/8 bg-transparent p-5 shadow-[0_24px_58px_rgba(15,23,42,0.07)] md:p-7"
      data-contact-surface="true"
      data-contact-form-surface="true"
    >
      <form className="grid gap-4" onSubmit={handleSubmit}>
        <div className="grid gap-4 md:grid-cols-2">
          <FloatingField
            id="contact-name"
            name="name"
            label={copy.name}
            language={language}
            autoComplete="name"
            value={name}
            onChange={setName}
            maxLength={80}
            required
          />
          <FloatingField
            id="contact-email"
            name="email"
            label={copy.email}
            language={language}
            type="email"
            autoComplete="email"
            value={email}
            onChange={setEmail}
            maxLength={160}
            required
          />
        </div>

        <FloatingField
          id="contact-affiliation"
          name="affiliation"
          label={copy.affiliation}
          language={language}
          autoComplete="organization"
          value={affiliation}
          onChange={setAffiliation}
          maxLength={120}
        />

        <FloatingTextarea
          id="contact-message"
          name="message"
          label={copy.message}
          language={language}
          value={message}
          onChange={setMessage}
          maxLength={4000}
          required
        />

        <div className="flex flex-col items-end gap-3 pt-1">
          <button
            type="submit"
            disabled={isSubmitting}
            className="min-h-[45px] rounded-full bg-[linear-gradient(135deg,#2563eb_0%,#0f62fe_100%)] px-6 text-[0.94rem] font-bold text-white transition-opacity duration-200 disabled:cursor-not-allowed disabled:opacity-55"
          >
            {isSubmitting ? copy.submitPending : copy.submitIdle}
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
