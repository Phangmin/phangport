import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import englishIcon from '../../assets/languages/english-icon.png'
import koreaIcon from '../../assets/languages/korea-icon.png'
import phangportIcon from '../../assets/phangporticon/phangport-icon.png'
import phangportTextlogoBlack from '../../assets/phangporticon/phangport-textlogo-black.png'
import phangportTextlogoWhite from '../../assets/phangporticon/phangport-textlogo-white.png'

const NAV_ITEMS = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Experiences', to: '/experiences' },
  { label: 'Skills', to: '/skills' },
  { label: 'Portfolio', to: '/portfolio' },
  { label: 'Contact', to: '/contact' },
]

const LANGUAGE_STORAGE_KEY = 'phangport-language'

const LANGUAGE_OPTIONS = [
  { code: 'ko', label: '한국어', icon: koreaIcon },
  { code: 'en', label: 'English', icon: englishIcon },
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

function Navbar({ variant = 'light' }) {
  const [language, setLanguage] = useState(() => {
    if (typeof window === 'undefined') {
      return 'ko'
    }

    const savedLanguage = window.localStorage.getItem(LANGUAGE_STORAGE_KEY)
    return savedLanguage === 'en' ? 'en' : 'ko'
  })
  const [isLanguageOpen, setIsLanguageOpen] = useState(false)
  const [themeMode, setThemeMode] = useState(() => getThemeMode())

  useEffect(() => {
    document.documentElement.lang = language
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, language)
  }, [language])

  useEffect(() => {
    function handlePointerDown() {
      const event = arguments[0]
      const menuNode = document.querySelector('[data-language-menu="true"]')

      if (!(menuNode instanceof HTMLDivElement)) {
        return
      }

      if (!(event.target instanceof Node)) {
        return
      }

      if (!menuNode.contains(event.target)) {
        setIsLanguageOpen(false)
      }
    }

    function handleThemeChange() {
      const event = arguments[0]
      setThemeMode(event.detail === 'dark' ? 'dark' : 'light')
    }

    window.addEventListener('mousedown', handlePointerDown)
    window.addEventListener('phangport-theme-change', handleThemeChange)

    return () => {
      window.removeEventListener('mousedown', handlePointerDown)
      window.removeEventListener('phangport-theme-change', handleThemeChange)
    }
  }, [])

  const isDark = variant === 'dark' || themeMode === 'dark'
  const textClass = isDark ? 'text-slate-50' : 'text-slate-900'
  const mutedClass = isDark ? 'text-slate-200/85' : 'text-slate-700'
  const hoverTextClass = isDark ? 'hover:text-blue-100 focus-visible:text-blue-100' : 'hover:text-blue-700 focus-visible:text-blue-700'
  const hoverBorderClass = isDark
    ? 'hover:border-b-blue-200/45 focus-visible:border-b-blue-200/45'
    : 'hover:border-b-blue-600/25 focus-visible:border-b-blue-600/25'
  const activeNavClass = isDark ? 'border-b-blue-200/45 text-blue-100' : 'border-b-blue-600/25 text-blue-700'
  const languageBorderClass = isDark ? 'border-slate-200/20' : 'border-slate-900/12'
  const languageMenuClass = isDark
    ? 'border-slate-200/15 bg-slate-900/95 shadow-[0_20px_48px_rgba(2,6,23,0.28)]'
    : 'border-slate-900/10 bg-white/95 shadow-[0_18px_42px_rgba(15,23,42,0.12)]'
  const navbarSurfaceClass = isDark
    ? 'border-slate-200/10 bg-[#2b2f36]/72 shadow-[0_18px_40px_rgba(2,6,23,0.28)]'
    : 'border-white/55 bg-white/68 shadow-[0_18px_40px_rgba(15,23,42,0.08)]'

  const activeLanguageIcon = language === 'en' ? englishIcon : koreaIcon
  const activeLanguageLabel = language === 'en' ? 'English' : '한국어'
  const activeTextLogo = isDark ? phangportTextlogoWhite : phangportTextlogoBlack

  return (
    <header
      className={`fixed left-1/2 top-6 z-10 flex w-[min(1126px,calc(100%-48px))] -translate-x-1/2 items-center justify-between rounded-full border px-5 py-3 backdrop-blur-xl max-md:top-[18px] max-md:flex-col max-md:gap-[14px] max-md:rounded-[28px] md:w-[min(1126px,calc(100%-128px))] ${navbarSurfaceClass}`}
    >
      <Link to="/" aria-label="Go to home" className="inline-flex items-center gap-[10px] bg-transparent p-0">
      <img src={phangportIcon} alt="PHANGPORT logo" className="h-11 w-11 object-contain" />
        <img
          src={activeTextLogo}
          alt="PHANGPORT text logo"
          className="h-5 w-auto object-contain max-md:h-4"
        />
      </Link>

      <nav aria-label="Primary" className="flex flex-wrap items-center justify-center gap-[15px]">
        <div data-language-menu="true" className="relative inline-flex">
          <button
            type="button"
            aria-haspopup="menu"
            aria-expanded={isLanguageOpen}
            onClick={() => setIsLanguageOpen((open) => !open)}
            className={`inline-flex min-w-24 items-center justify-center gap-[7px] rounded-full border bg-transparent px-[11px] py-[7px] text-[0.73rem] font-bold leading-none tracking-[0.02em] transition-[color,transform,opacity,border-color] duration-200 hover:-translate-y-px hover:opacity-95 focus-visible:-translate-y-px focus-visible:opacity-95 focus-visible:outline-none ${languageBorderClass} ${textClass} ${hoverTextClass}`}
          >
            <img
              src={activeLanguageIcon}
              alt=""
              aria-hidden="true"
              className="h-[14px] w-[14px] shrink-0 rounded-full object-cover"
            />
            <span className="whitespace-nowrap">{activeLanguageLabel}</span>
          </button>

          {isLanguageOpen ? (
            <div
              role="menu"
              className={`absolute left-1/2 top-[calc(100%+8px)] z-20 grid min-w-[122px] -translate-x-1/2 gap-1 rounded-2xl border p-1.5 backdrop-blur ${languageMenuClass}`}
            >
              {LANGUAGE_OPTIONS.map((option) => (
                <button
                  key={option.code}
                  type="button"
                  role="menuitemradio"
                  aria-checked={option.code === language}
                  onClick={() => {
                    setLanguage(option.code)
                    setIsLanguageOpen(false)
                    window.dispatchEvent(
                      new CustomEvent('phangport-language-change', { detail: option.code }),
                    )
                  }}
                  className={
                    option.code === language
                      ? 'inline-flex w-full items-center gap-2 rounded-xl bg-blue-600/10 px-[10px] py-2 text-left text-[0.74rem] font-semibold text-blue-700 transition-colors duration-200 focus-visible:outline-none dark:text-blue-100'
                      : `inline-flex w-full items-center gap-2 rounded-xl px-[10px] py-2 text-left text-[0.74rem] font-semibold transition-colors duration-200 hover:bg-blue-600/8 focus-visible:bg-blue-600/8 focus-visible:outline-none ${textClass} ${hoverTextClass}`
                  }
                >
                  <img
                    src={option.icon}
                    alt=""
                    aria-hidden="true"
                    className="h-[14px] w-[14px] shrink-0 rounded-full object-cover"
                  />
                  <span>{option.label}</span>
                </button>
              ))}
            </div>
          ) : null}
        </div>

        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === '/'}
            className={({ isActive }) =>
              `border-b-[3px] border-transparent bg-transparent px-1 py-[10px] text-[0.85rem] font-semibold transition-[border-color,color,background-color] duration-200 focus-visible:outline-none ${mutedClass} ${hoverTextClass} ${hoverBorderClass} ${isActive ? activeNavClass : ''}`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </header>
  )
}

export default Navbar
