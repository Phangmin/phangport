import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import githubIconAsset from '../../assets/skillsicons/github-icon.png'
import instagramIconAsset from '../../assets/skillsicons/instagram-icon.png'
import phangportTextlogoBlack from '../../assets/phangporticon/phangport-textlogo-black.png'
import phangportTextlogoBlue from '../../assets/phangporticon/phangport-textlogo-blue.png'
import phangportTextlogoWhite from '../../assets/phangporticon/phangport-textlogo-white.png'
import linkedinIconAsset from '../../assets/skillsicons/linkedin-icon.png'
import notionIconAsset from '../../assets/skillsicons/notion-icon.webp'
import tistoryIconAsset from '../../assets/skillsicons/tistory-icon.svg'

type ThemeMode = 'light' | 'dark'

const SOCIAL_ITEMS = [
  { label: 'GitHub', src: githubIconAsset },
  { label: 'Instagram', src: instagramIconAsset },
  { label: 'LinkedIn', src: linkedinIconAsset },
  { label: 'Tistory', src: tistoryIconAsset },
  { label: 'Notion', src: notionIconAsset },
] as const

function getSocialIconFilter(label: string, themeMode: ThemeMode, isActive: boolean) {
  const lightDefault = 'brightness(0) saturate(100%)'
  const darkDefault = 'brightness(0) saturate(100%) invert(1)'

  if (label === 'LinkedIn') {
    if (themeMode === 'dark') {
      return isActive ? 'none' : 'grayscale(1) brightness(2.8) contrast(1.15)'
    }

    return isActive ? 'none' : 'grayscale(1) contrast(8) brightness(0.45)'
  }

  if (themeMode === 'dark') {
    if (isActive) {
      return label === 'GitHub' || label === 'Notion' ? darkDefault : 'none'
    }

    return darkDefault
  }

  return isActive && label !== 'GitHub' && label !== 'Notion' ? 'none' : lightDefault
}

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
  const [themeMode, setThemeMode] = useState<ThemeMode>(() => getThemeMode())
  const [activeIcon, setActiveIcon] = useState<string | null>(null)
  const [isLogoActive, setIsLogoActive] = useState(false)

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

  const defaultTextLogo = themeMode === 'dark' ? phangportTextlogoWhite : phangportTextlogoBlack
  const activeTextLogo = isLogoActive ? phangportTextlogoBlue : defaultTextLogo
  const iconToneClass = themeMode === 'dark' ? 'text-slate-100' : 'text-slate-700'

  return (
    <footer className="w-full shrink-0">
      <div className="mx-auto flex w-[min(1126px,calc(100%-48px))] flex-col gap-4 px-0 py-4 text-center md:w-[min(1126px,calc(100%-128px))] md:flex-row md:items-center md:justify-between md:text-left">
        <div className="flex flex-col items-center gap-2 md:flex-row md:items-center md:gap-3">
          <Link
            to="/"
            aria-label="Go to home"
            onMouseEnter={() => setIsLogoActive(true)}
            onMouseLeave={() => setIsLogoActive(false)}
            onFocus={() => setIsLogoActive(true)}
            onBlur={() => setIsLogoActive(false)}
            className="inline-flex items-center bg-transparent p-0 focus-visible:outline-none"
          >
            <img
              src={activeTextLogo}
              alt="PHANGPORT"
              className="h-[18px] w-auto object-contain max-md:h-4"
            />
          </Link>
          <p className="m-0 text-xs text-slate-500">&copy; 2026 Gwangmin Cheon. All rights reserved.</p>
        </div>

        <div
          aria-label="Social platforms"
          className="flex items-center justify-center gap-1.5 md:justify-end"
        >
          {SOCIAL_ITEMS.map((item) => (
            <button
              key={item.label}
              type="button"
              aria-label={item.label}
              title={item.label}
              onMouseEnter={() => setActiveIcon(item.label)}
              onMouseLeave={() => setActiveIcon((currentIcon) => (currentIcon === item.label ? null : currentIcon))}
              onFocus={() => setActiveIcon(item.label)}
              onBlur={() => setActiveIcon((currentIcon) => (currentIcon === item.label ? null : currentIcon))}
              className={`inline-flex h-10 w-10 items-center justify-center rounded-full bg-transparent p-0 transition-transform duration-200 hover:-translate-y-px focus-visible:-translate-y-px focus-visible:outline-none ${iconToneClass}`}
            >
              <span className="inline-flex h-[22px] w-[22px] items-center justify-center">
                <img
                  src={item.src}
                  alt=""
                  aria-hidden="true"
                  className="block h-[18px] w-[18px] object-contain transition-[filter] duration-200"
                  style={{
                    filter: getSocialIconFilter(item.label, themeMode, activeIcon === item.label),
                  }}
                />
              </span>
            </button>
          ))}
        </div>
      </div>
    </footer>
  )
}

export default Footer
