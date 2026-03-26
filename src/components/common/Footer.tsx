import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import phangportTextlogoBlack from '../../assets/phangporticon/phangport-textlogo-black.png'
import phangportTextlogoWhite from '../../assets/phangporticon/phangport-textlogo-white.png'

function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-[22px] w-[22px]">
      <path d="M12 2.25a9.75 9.75 0 0 0-3.08 19.01c.49.09.67-.21.67-.47v-1.65c-2.73.59-3.31-1.16-3.31-1.16-.45-1.13-1.1-1.43-1.1-1.43-.9-.62.07-.61.07-.61 1 .07 1.52 1.02 1.52 1.02.88 1.52 2.31 1.08 2.87.83.09-.64.35-1.08.63-1.33-2.18-.25-4.47-1.09-4.47-4.84 0-1.07.38-1.95 1.01-2.63-.1-.25-.44-1.28.1-2.66 0 0 .83-.27 2.71 1a9.4 9.4 0 0 1 4.94 0c1.88-1.27 2.71-1 2.71-1 .54 1.38.2 2.41.1 2.66.63.68 1.01 1.56 1.01 2.63 0 3.76-2.29 4.59-4.48 4.83.36.31.67.93.67 1.87v2.77c0 .26.18.56.68.47A9.75 9.75 0 0 0 12 2.25Z" />
    </svg>
  )
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-[22px] w-[22px]">
      <rect
        x="4.25"
        y="4.25"
        width="15.5"
        height="15.5"
        rx="4.5"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <circle cx="12" cy="12" r="3.75" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" />
    </svg>
  )
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-[22px] w-[22px]">
      <path d="M6.47 8.36a1.43 1.43 0 1 1 0-2.86 1.43 1.43 0 0 1 0 2.86Zm1.24 1.57H5.23v8.57h2.48V9.93Zm3.95 0H9.2v8.57h2.46v-4.5c0-1.18.22-2.33 1.68-2.33 1.44 0 1.46 1.35 1.46 2.41v4.42h2.48v-4.93c0-2.42-.52-4.28-3.34-4.28-1.35 0-2.25.74-2.62 1.44h-.04V9.93Z" />
    </svg>
  )
}

function TistoryIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-[22px] w-[22px]">
      <path d="M6 6.25A1.75 1.75 0 0 1 7.75 4.5h8.5A1.75 1.75 0 0 1 18 6.25v1.1h-4.17V18h-3.66V7.35H6v-1.1Z" />
    </svg>
  )
}

const SOCIAL_ITEMS = [
  { label: 'GitHub', Icon: GitHubIcon },
  { label: 'Instagram', Icon: InstagramIcon },
  { label: 'LinkedIn', Icon: LinkedInIcon },
  { label: 'Tistory', Icon: TistoryIcon },
]

function getThemeMode() {
  if (typeof window === 'undefined') {
    return 'light'
  }

  const savedTheme = window.localStorage.getItem('phangport-theme')

  if (savedTheme === 'dark' || savedTheme === 'light') {
    return savedTheme
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

function Footer() {
  const [themeMode, setThemeMode] = useState(() => getThemeMode())

  useEffect(() => {
    function handleThemeChange() {
      const event = arguments[0]
      setThemeMode(event.detail === 'dark' ? 'dark' : 'light')
    }

    window.addEventListener('phangport-theme-change', handleThemeChange)

    return () => {
      window.removeEventListener('phangport-theme-change', handleThemeChange)
    }
  }, [])

  const activeTextLogo = themeMode === 'dark' ? phangportTextlogoWhite : phangportTextlogoBlack
  const iconToneClass = themeMode === 'dark' ? 'text-slate-100' : 'text-slate-700'

  return (
    <footer className="w-full shrink-0 border-t border-slate-900/8 bg-white/90 dark:border-slate-200/10 dark:bg-slate-900/75">
      <div className="mx-auto flex w-[min(1126px,calc(100%-48px))] flex-col gap-4 px-0 py-4 text-center md:w-[min(1126px,calc(100%-128px))] md:flex-row md:items-center md:justify-between md:text-left">
        <div className="flex flex-col items-center gap-2 md:flex-row md:items-center md:gap-3">
          <Link to="/" aria-label="Go to home" className="inline-flex items-center bg-transparent p-0">
            <img
              src={activeTextLogo}
              alt="PHANGPORT"
              className="h-[18px] w-auto object-contain max-md:h-4"
            />
          </Link>
          <p className="m-0 text-xs text-slate-500">&copy; 2026 Gwang Min Cheon. All rights reserved.</p>
        </div>

        <div
          aria-label="Social platforms"
          className="flex items-center justify-center gap-2 md:justify-end"
        >
          {SOCIAL_ITEMS.map((item) => (
            <button
              key={item.label}
              type="button"
              aria-label={item.label}
              title={item.label}
              className={`inline-flex h-10 w-10 items-center justify-center bg-transparent p-0 transition-colors duration-200 hover:-translate-y-px hover:text-blue-600 focus-visible:-translate-y-px focus-visible:text-blue-600 focus-visible:outline-none ${iconToneClass}`}
            >
              {item.Icon()}
            </button>
          ))}
        </div>
      </div>
    </footer>
  )
}

export default Footer
