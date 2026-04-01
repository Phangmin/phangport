import { useState, type FormEvent } from 'react'
import { RevealOnScroll } from '../common'
import type { GuestbookFormCopy, SubmitState } from './types'

const fieldClassName =
  'h-[54px] w-full rounded-[18px] border border-slate-900/10 bg-transparent px-4 text-[0.92rem] text-slate-900 outline-none transition-[border-color,transform] duration-200 placeholder:text-transparent focus:-translate-y-px focus:border-blue-600 disabled:cursor-not-allowed disabled:opacity-60'

type GuestbookEntryFormProps = {
  copy: GuestbookFormCopy
  nickname: string
  message: string
  isSubmitting: boolean
  submitState: SubmitState
  onNicknameChange: (value: string) => void
  onMessageChange: (value: string) => void
  onSubmit: (event: FormEvent<HTMLFormElement>) => void
}

type FloatingFieldProps = {
  id: string
  label: string
  value: string
  disabled?: boolean
  maxLength: number
  onChange: (value: string) => void
}

type FloatingTextareaProps = {
  id: string
  label: string
  value: string
  disabled?: boolean
  maxLength: number
  onChange: (value: string) => void
  onSubmit?: () => void
}

function FloatingField({ id, label, value, disabled = false, maxLength, onChange }: FloatingFieldProps) {
  const [isFocused, setIsFocused] = useState(false)
  const isRaised = isFocused || value.trim().length > 0
  const floatingLabelClassName = isRaised
    ? `pointer-events-none absolute left-3 top-0 z-[1] -translate-y-1/2 rounded-full bg-white px-2 text-[0.72rem] font-semibold leading-none whitespace-nowrap transition-all duration-200 ${
        isFocused ? 'text-blue-600' : 'text-slate-900'
      }`
    : 'pointer-events-none absolute left-3 top-1/2 z-[1] -translate-y-1/2 rounded-full bg-transparent px-2 text-[0.84rem] font-semibold leading-none whitespace-nowrap text-slate-500 transition-all duration-200'

  return (
    <div className="relative">
      <input
        id={id}
        type="text"
        value={value}
        disabled={disabled}
        onChange={(event) => onChange(event.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder=" "
        className={fieldClassName}
        data-guestbook-input="true"
        maxLength={maxLength}
        required
      />
      <label
        htmlFor={id}
        className={floatingLabelClassName}
        data-guestbook-floating-label="true"
        data-guestbook-floating-raised={isRaised ? 'true' : 'false'}
      >
        {label}
      </label>
    </div>
  )
}

function FloatingTextarea({
  id,
  label,
  value,
  disabled = false,
  maxLength,
  onChange,
  onSubmit,
}: FloatingTextareaProps) {
  const [isFocused, setIsFocused] = useState(false)
  const isRaised = isFocused || value.trim().length > 0
  const floatingLabelClassName = isRaised
    ? `pointer-events-none absolute left-3 top-0 z-[1] -translate-y-1/2 rounded-full bg-white px-2 text-[0.72rem] font-semibold leading-none whitespace-nowrap transition-all duration-200 ${
        isFocused ? 'text-blue-600' : 'text-slate-900'
      }`
    : 'pointer-events-none absolute left-3 top-5 z-[1] -translate-y-1/2 rounded-full bg-transparent px-2 text-[0.84rem] font-semibold leading-none whitespace-nowrap text-slate-500 transition-all duration-200'

  return (
    <div className="relative">
      <textarea
        id={id}
        rows={4}
        value={value}
        disabled={disabled}
        onChange={(event) => onChange(event.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onKeyDown={(event) => {
          if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault()
            onSubmit?.()
          }
        }}
        placeholder=" "
        className="min-h-[142px] w-full resize-y rounded-[22px] border border-slate-900/10 bg-transparent px-4 py-4 text-[0.92rem] leading-[1.75] text-slate-900 outline-none transition-[border-color,transform] duration-200 placeholder:text-transparent focus:-translate-y-px focus:border-blue-600 disabled:cursor-not-allowed disabled:opacity-60"
        data-guestbook-input="true"
        data-guestbook-textarea="true"
        maxLength={maxLength}
        required
      />
      <label
        htmlFor={id}
        className={floatingLabelClassName}
        data-guestbook-floating-label="true"
        data-guestbook-floating-raised={isRaised ? 'true' : 'false'}
      >
        {label}
      </label>
    </div>
  )
}

function GuestbookEntryForm({
  copy,
  nickname,
  message,
  isSubmitting,
  submitState,
  onNicknameChange,
  onMessageChange,
  onSubmit,
}: GuestbookEntryFormProps) {
  const submitMessageClassName =
    submitState.type === 'success'
      ? 'text-slate-700'
      : submitState.type === 'error'
        ? 'text-rose-600'
        : 'text-slate-500'

  return (
    <RevealOnScroll
      as="section"
      className="grid gap-5 rounded-[30px] border border-slate-900/8 bg-transparent p-4 shadow-[0_24px_58px_rgba(15,23,42,0.07)] md:rounded-[34px] md:p-6 xl:sticky xl:top-[calc(var(--navbar-offset)+24px)]"
      data-guestbook-surface="form"
    >
      <div className="grid gap-2">
        <p className="m-0 text-[0.72rem] font-bold uppercase tracking-[0.18em] text-blue-600" data-guestbook-accent="true">
          {copy.eyebrow}
        </p>
        <h2 className="m-0 text-[1.38rem] font-bold leading-[1.04] tracking-[-0.04em] text-[var(--text-h)]">
          {copy.title}
        </h2>
      </div>

      <form className="grid gap-4" onSubmit={onSubmit}>
        <FloatingField
          id="guestbook-nickname"
          label={copy.nicknameLabel}
          value={nickname}
          disabled={isSubmitting}
          onChange={onNicknameChange}
          maxLength={40}
        />

        <FloatingTextarea
          id="guestbook-message"
          label={copy.messageLabel}
          value={message}
          disabled={isSubmitting}
          onChange={onMessageChange}
          maxLength={100}
          onSubmit={() => {
            if (!isSubmitting) {
              document.getElementById('guestbook-submit-button')?.click()
            }
          }}
        />

        <button
          id="guestbook-submit-button"
          type="submit"
          disabled={isSubmitting}
          className="inline-flex min-h-12 items-center justify-center rounded-full border border-blue-600 bg-[linear-gradient(135deg,#2563eb_0%,#0f62fe_100%)] px-5 py-3 text-[0.86rem] font-semibold text-white transition-colors duration-200 hover:border-blue-700 hover:bg-[linear-gradient(135deg,#1d4ed8_0%,#1d4ed8_100%)] focus-visible:border-blue-700 focus-visible:bg-[linear-gradient(135deg,#1d4ed8_0%,#1d4ed8_100%)] focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-55"
          data-guestbook-submit="true"
        >
          {isSubmitting ? copy.submitBusy : copy.submitIdle}
        </button>

        {submitState.type !== 'idle' ? (
          <p className={`m-0 text-[0.82rem] leading-[1.6] ${submitMessageClassName}`}>
            {submitState.message}
          </p>
        ) : null}
      </form>
    </RevealOnScroll>
  )
}

export default GuestbookEntryForm
