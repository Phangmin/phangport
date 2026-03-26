import { useEffect, useState } from 'react'

const THEME_STORAGE_KEY = 'phangport-theme'

function ThemeToggle() {
  const [theme, setTheme] = useState(() => {
    if (typeof window === 'undefined') {
      return 'light'
    }

    const savedTheme = window.localStorage.getItem(THEME_STORAGE_KEY)

    if (savedTheme === 'light' || savedTheme === 'dark') {
      return savedTheme
    }

    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  })

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    document.documentElement.style.colorScheme = theme
    window.localStorage.setItem(THEME_STORAGE_KEY, theme)
    window.dispatchEvent(new CustomEvent('phangport-theme-change', { detail: theme }))
  }, [theme])

  function handleToggle() {
    setTheme((currentTheme) => (currentTheme === 'dark' ? 'light' : 'dark'))
  }

  const isDark = theme === 'dark'
  const label = isDark ? 'Switch to light mode' : 'Switch to dark mode'
  const buttonClasses = isDark
    ? 'inline-flex h-[42px] w-[42px] items-center justify-center rounded-full border border-white/18 bg-transparent p-0 text-slate-100 transition-[border-color,color,transform,opacity] duration-200 hover:-translate-y-px hover:border-[#78bdff]/50 hover:text-[#78bdff] hover:opacity-95 focus-visible:-translate-y-px focus-visible:border-[#78bdff]/50 focus-visible:text-[#78bdff] focus-visible:opacity-95 focus-visible:outline-none'
    : 'inline-flex h-[42px] w-[42px] items-center justify-center rounded-full border border-slate-500/35 bg-transparent p-0 text-slate-500 transition-[border-color,color,transform,opacity] duration-200 hover:-translate-y-px hover:border-blue-600/40 hover:text-blue-600 hover:opacity-95 focus-visible:-translate-y-px focus-visible:border-blue-600/40 focus-visible:text-blue-600 focus-visible:opacity-95 focus-visible:outline-none'

  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={handleToggle}
      className={buttonClasses}
    >
      <span aria-hidden="true" className="inline-flex h-[22px] w-[22px]">
        {isDark ? (
          <svg viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="4.2" fill="currentColor" />
            <path
              d="M12 2.5V5.2M12 18.8V21.5M21.5 12H18.8M5.2 12H2.5M18.7 5.3L16.8 7.2M7.2 16.8L5.3 18.7M18.7 18.7L16.8 16.8M7.2 7.2L5.3 5.3"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
            />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" fill="none">
            <path
              d="M18.6 14.2C17.7 14.7 16.7 15 15.6 15C11.9 15 8.9 12 8.9 8.3C8.9 6.5 9.6 4.8 10.8 3.6C7 4.2 4.1 7.5 4.1 11.5C4.1 15.9 7.7 19.5 12.1 19.5C15.6 19.5 18.7 17.2 19.8 14C19.4 14.1 19 14.2 18.6 14.2Z"
              fill="currentColor"
            />
          </svg>
        )}
      </span>
    </button>
  )
}

export default ThemeToggle
