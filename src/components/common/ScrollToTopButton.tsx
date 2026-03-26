// @ts-nocheck
import { useEffect, useState } from 'react'

function getCurrentTheme() {
  if (typeof window === 'undefined') {
    return 'light'
  }

  const documentTheme = document.documentElement.dataset.theme

  if (documentTheme === 'light' || documentTheme === 'dark') {
    return documentTheme
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

function ScrollToTopButton() {
  const [theme, setTheme] = useState(getCurrentTheme)

  function getScrollTarget() {
    return document.getElementById('root') || document.scrollingElement || document.documentElement
  }

  useEffect(() => {
    function handleThemeChange(event) {
      const nextTheme = event instanceof CustomEvent ? event.detail : null
      setTheme(nextTheme === 'dark' ? 'dark' : nextTheme === 'light' ? 'light' : getCurrentTheme())
    }

    window.addEventListener('phangport-theme-change', handleThemeChange)

    return () => {
      window.removeEventListener('phangport-theme-change', handleThemeChange)
    }
  }, [])

  function handleClick() {
    const scrollTarget = getScrollTarget()

    if ('scrollTo' in scrollTarget) {
      scrollTarget.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }

    scrollTarget.scrollTop = 0
  }

  const isDark = theme === 'dark'
  const buttonClasses = isDark
    ? 'inline-flex h-[42px] w-[42px] items-center justify-center rounded-full border border-white/18 bg-transparent p-0 text-slate-100 transition-[border-color,color,transform,opacity] duration-200 hover:-translate-y-px hover:border-[#78bdff]/50 hover:text-[#78bdff] hover:opacity-95 focus-visible:-translate-y-px focus-visible:border-[#78bdff]/50 focus-visible:text-[#78bdff] focus-visible:opacity-95 focus-visible:outline-none'
    : 'inline-flex h-[42px] w-[42px] items-center justify-center rounded-full border border-slate-500/35 bg-transparent p-0 text-slate-500 transition-[border-color,color,transform,opacity] duration-200 hover:-translate-y-px hover:border-blue-600/40 hover:text-blue-600 hover:opacity-95 focus-visible:-translate-y-px focus-visible:border-blue-600/40 focus-visible:text-blue-600 focus-visible:opacity-95 focus-visible:outline-none'

  return (
    <button
      type="button"
      aria-label="Scroll to top"
      title="Scroll to top"
      onClick={handleClick}
      className={buttonClasses}
    >
      <span aria-hidden="true" className="inline-flex h-[22px] w-[22px] items-center justify-center">
        <svg viewBox="0 0 24 24" fill="none" className="h-full w-full">
          <path
            d="M12 18.5V6.5M12 6.5 6.75 11.75M12 6.5l5.25 5.25"
            stroke="currentColor"
            strokeWidth="1.9"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </button>
  )
}

export default ScrollToTopButton
