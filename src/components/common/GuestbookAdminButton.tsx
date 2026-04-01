import { useEffect, useState } from 'react'
import { getResolvedTheme } from './theme'

type SubmitState =
  | { type: 'idle'; message: '' }
  | { type: 'error'; message: string }

function GuestbookAdminButton() {
  const [theme, setTheme] = useState(getResolvedTheme)
  const [isHighlighted, setIsHighlighted] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [isAdminMode, setIsAdminMode] = useState(false)
  const [password, setPassword] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitState, setSubmitState] = useState<SubmitState>({ type: 'idle', message: '' })

  useEffect(() => {
    function handleThemeChange(event: Event) {
      const nextTheme = event instanceof CustomEvent ? event.detail : null
      setTheme(nextTheme === 'dark' ? 'dark' : nextTheme === 'light' ? 'light' : getResolvedTheme())
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsOpen(false)
      }
    }

    function handleAdminAuth() {
      setIsAdminMode(true)
    }

    function handleAdminExit() {
      setIsAdminMode(false)
    }

    window.addEventListener('phangport-theme-change', handleThemeChange)
    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('phangport-guestbook-admin-auth', handleAdminAuth)
    window.addEventListener('phangport-guestbook-admin-exit', handleAdminExit)

    return () => {
      window.removeEventListener('phangport-theme-change', handleThemeChange)
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('phangport-guestbook-admin-auth', handleAdminAuth)
      window.removeEventListener('phangport-guestbook-admin-exit', handleAdminExit)
    }
  }, [])

  function closeModal() {
    setIsOpen(false)
    setPassword('')
    setSubmitState({ type: 'idle', message: '' })
  }

  async function handleAuthenticate() {
    if (isSubmitting) {
      return
    }

    setIsSubmitting(true)
    setSubmitState({ type: 'idle', message: '' })

    try {
      const response = await fetch('/api/guestbook-admin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
      })

      const payload = (await response.json().catch(() => null)) as { error?: string } | null

      if (!response.ok) {
        throw new Error(payload?.error ?? '관리자 인증에 실패했습니다.')
      }

      window.dispatchEvent(new CustomEvent('phangport-guestbook-admin-auth', { detail: password }))
      closeModal()
    } catch (error) {
      setSubmitState({
        type: 'error',
        message: error instanceof Error ? error.message : '관리자 인증에 실패했습니다.',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const isDark = theme === 'dark'
  const buttonClasses = `inline-flex h-[42px] w-[42px] items-center justify-center rounded-full border p-0 transition-[background-color,border-color,transform,opacity] duration-200 focus-visible:outline-none ${
    isHighlighted ? '-translate-y-px opacity-95' : ''
  } ${
    isDark
      ? isHighlighted
        ? 'border-rose-500 bg-rose-600'
        : 'border-white/18 bg-transparent'
      : isHighlighted
        ? 'border-rose-600 bg-rose-600'
        : 'border-slate-500/35 bg-transparent'
  }`
  const iconColor = isHighlighted ? '#ffffff' : isDark ? '#f8fafc' : '#64748b'
  const buttonLabel = isAdminMode ? 'Exit guestbook admin mode' : 'Guestbook admin'

  return (
    <>
      <button
        type="button"
        aria-label={buttonLabel}
        title={buttonLabel}
        onClick={() => {
          if (isAdminMode) {
            setIsAdminMode(false)
            window.dispatchEvent(new CustomEvent('phangport-guestbook-admin-exit'))
            return
          }

          setIsOpen(true)
          setSubmitState({ type: 'idle', message: '' })
        }}
        onMouseEnter={() => setIsHighlighted(true)}
        onMouseLeave={() => setIsHighlighted(false)}
        onFocus={() => setIsHighlighted(true)}
        onBlur={() => setIsHighlighted(false)}
        className={buttonClasses}
      >
        <span aria-hidden="true" className="inline-flex h-[20px] w-[20px] items-center justify-center">
          {isAdminMode ? (
            <svg viewBox="0 0 24 24" className="h-full w-full" fill="none" aria-hidden="true">
              <path
                d="M7 7 17 17M17 7 7 17"
                stroke={iconColor}
                strokeWidth="2.2"
                strokeLinecap="round"
              />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" className="h-full w-full" fill={iconColor} aria-hidden="true">
              <path d="M12 12.25a4.125 4.125 0 1 0 0-8.25 4.125 4.125 0 0 0 0 8.25Zm0 2.25c-4.28 0-7.75 2.62-7.75 5.85 0 .36.29.65.65.65h14.2c.36 0 .65-.29.65-.65 0-3.23-3.47-5.85-7.75-5.85Z" />
            </svg>
          )}
        </span>
      </button>

      {isOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/42 px-4 backdrop-blur-sm" onClick={closeModal}>
          <div
            className="grid w-full max-w-[420px] gap-4 rounded-[28px] border border-slate-900/10 bg-white p-5 shadow-[0_28px_80px_rgba(15,23,42,0.18)] md:p-6"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="grid gap-2">
              <p className="m-0 text-[0.72rem] font-bold uppercase tracking-[0.18em] text-rose-600">Admin</p>
              <h2 className="m-0 text-[1.28rem] font-bold leading-[1.05] tracking-[-0.04em] text-slate-900">
                관리자 인증
              </h2>
              <p className="m-0 text-[0.88rem] leading-[1.7] text-slate-600">
                관리자 비밀번호를 입력하면 각 방명록 오른쪽에 삭제 버튼이 표시됩니다.
              </p>
            </div>

            <label className="grid gap-2">
              <span className="text-[0.78rem] font-semibold uppercase tracking-[0.16em] text-slate-500">Password</span>
              <input
                type="password"
                value={password}
                onChange={(event) => {
                  setPassword(event.target.value)
                  setSubmitState({ type: 'idle', message: '' })
                }}
                onKeyDown={(event) => {
                  if (event.key === 'Enter') {
                    event.preventDefault()
                    void handleAuthenticate()
                  }
                }}
                placeholder="관리자 비밀번호"
                autoComplete="current-password"
                className="min-h-12 rounded-[18px] border border-slate-900/10 bg-slate-50/80 px-4 text-[0.92rem] text-slate-900 outline-none transition-colors duration-200 placeholder:text-slate-400 focus:border-rose-500/35"
              />
            </label>

            {submitState.type === 'error' ? (
              <p className="m-0 text-[0.82rem] leading-[1.6] text-rose-600">{submitState.message}</p>
            ) : null}

            <div className="flex gap-2 sm:justify-end">
              <button
                type="button"
                onClick={closeModal}
                className="inline-flex min-h-11 items-center justify-center rounded-full border border-slate-900/10 bg-white px-4 py-2 text-[0.84rem] font-semibold text-slate-700 transition-colors duration-200 hover:border-slate-900/20 focus-visible:outline-none"
              >
                닫기
              </button>
              <button
                type="button"
                onClick={() => {
                  void handleAuthenticate()
                }}
                disabled={isSubmitting}
                className="inline-flex min-h-11 items-center justify-center rounded-full bg-rose-600 px-4 py-2 text-[0.84rem] font-semibold text-white transition-colors duration-200 hover:bg-rose-700 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-55"
              >
                {isSubmitting ? '확인 중...' : '인증하기'}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  )
}

export default GuestbookAdminButton



