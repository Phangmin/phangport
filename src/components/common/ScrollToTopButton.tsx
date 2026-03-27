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
  const [isHighlighted, setIsHighlighted] = useState(false)

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
  const buttonClasses = `inline-flex h-[42px] w-[42px] items-center justify-center rounded-full border bg-transparent p-0 transition-[border-color,transform,opacity] duration-200 focus-visible:outline-none ${
    isHighlighted ? '-translate-y-px opacity-95' : ''
  } ${
    isDark
      ? isHighlighted
        ? 'border-[#78bdff]/50'
        : 'border-white/18'
      : isHighlighted
        ? 'border-blue-600/40'
        : 'border-slate-500/35'
  }`
  const iconColor = isHighlighted ? '#78bdff' : isDark ? '#f8fafc' : '#64748b'

  return (
    <button
      type="button"
      aria-label="Scroll to top"
      title="Scroll to top"
      onClick={handleClick}
      onMouseEnter={() => setIsHighlighted(true)}
      onMouseLeave={() => setIsHighlighted(false)}
      onFocus={() => setIsHighlighted(true)}
      onBlur={() => setIsHighlighted(false)}
      className={buttonClasses}
    >
      <span aria-hidden="true" className="inline-flex h-[22px] w-[22px] items-center justify-center">
        <svg viewBox="0 0 24 24" fill="none" className="h-full w-full">
          <path
            d="M12 18.5V6.5M12 6.5 6.75 11.75M12 6.5l5.25 5.25"
            stroke={iconColor}
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
