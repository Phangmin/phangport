import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import englishIcon from '../../assets/languages/english-icon.png'
import koreaIcon from '../../assets/languages/korea-icon.png'
import phangportTextlogoBlack from '../../assets/phangporticon/phangport-textlogo-black.png'
import phangportTextlogoWhite from '../../assets/phangporticon/phangport-textlogo-white.png'
import DesktopNav from './navbar/DesktopNav'
import LanguageMenu from './navbar/LanguageMenu'
import MobileNav from './navbar/MobileNav'
import { getResolvedTheme, type ThemeMode } from './theme'

const NAV_ITEMS = [
  { label: { ko: '홈', en: 'Home' }, to: '/' },
  { label: { ko: '자기소개', en: 'About' }, to: '/about' },
  { label: { ko: '경험사항', en: 'Experiences' }, to: '/experiences' },
  { label: { ko: '프로젝트', en: 'Projects' }, to: '/projects' },
  { label: { ko: '포트폴리오', en: 'Portfolio' }, to: '/portfolio' },
  { label: { ko: '연락처', en: 'Contact' }, to: '/contact' },
] as const

const LANGUAGE_STORAGE_KEY = 'phangport-language'

const LANGUAGE_OPTIONS = [
  { code: 'ko', label: '\uD55C\uAD6D\uC5B4', icon: koreaIcon },
  { code: 'en', label: 'English', icon: englishIcon },
] as const

type LanguageCode = 'ko' | 'en'

function Navbar({ variant = 'light' }: { variant?: ThemeMode }) {
  const location = useLocation()
  const desktopLanguageMenuRef = useRef<HTMLDivElement | null>(null)
  const mobileLanguageMenuRef = useRef<HTMLDivElement | null>(null)
  const mobileMenuButtonRef = useRef<HTMLButtonElement | null>(null)
  const mobileMenuPanelRef = useRef<HTMLDivElement | null>(null)

  const [language, setLanguage] = useState<LanguageCode>(() => {
    if (typeof window === 'undefined') {
      return 'ko'
    }

    const savedLanguage = window.localStorage.getItem(LANGUAGE_STORAGE_KEY)
    return savedLanguage === 'en' ? 'en' : 'ko'
  })
  const [openLanguageMenu, setOpenLanguageMenu] = useState<'desktop' | 'mobile' | null>(null)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [themeMode, setThemeMode] = useState<ThemeMode>(() => getResolvedTheme())

  useEffect(() => {
    document.documentElement.lang = language
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, language)
  }, [language])

  useEffect(() => {
    setOpenLanguageMenu(null)
    setIsMobileMenuOpen(false)
  }, [location.pathname])

  useEffect(() => {
    const rootElement = document.documentElement

    function syncThemeMode() {
      setThemeMode(getResolvedTheme())
    }

    function handlePointerDown(event: MouseEvent) {
      const clickedInsideDesktopLanguageMenu =
        event.target instanceof Node &&
        !!desktopLanguageMenuRef.current?.contains(event.target)
      const clickedInsideMobileLanguageMenu =
        event.target instanceof Node &&
        !!mobileLanguageMenuRef.current?.contains(event.target)

      if (
        event.target instanceof Node &&
        !clickedInsideDesktopLanguageMenu &&
        !clickedInsideMobileLanguageMenu
      ) {
        setOpenLanguageMenu(null)
      }

      if (
        mobileMenuPanelRef.current &&
        mobileMenuButtonRef.current &&
        event.target instanceof Node &&
        !mobileMenuPanelRef.current.contains(event.target) &&
        !mobileMenuButtonRef.current.contains(event.target)
      ) {
        setIsMobileMenuOpen(false)
      }
    }

    function handleThemeChange(event: Event) {
      const nextTheme = event instanceof CustomEvent && event.detail === 'dark' ? 'dark' : 'light'
      setThemeMode(nextTheme)
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setOpenLanguageMenu(null)
        setIsMobileMenuOpen(false)
      }
    }

    function handleResize() {
      if (window.innerWidth >= 768) {
        setOpenLanguageMenu(null)
        setIsMobileMenuOpen(false)
      }
    }

    const observer = new MutationObserver(syncThemeMode)

    syncThemeMode()
    observer.observe(rootElement, { attributes: true, attributeFilter: ['data-theme'] })
    window.addEventListener('mousedown', handlePointerDown)
    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('resize', handleResize)
    window.addEventListener('phangport-theme-change', handleThemeChange)

    return () => {
      observer.disconnect()
      window.removeEventListener('mousedown', handlePointerDown)
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('phangport-theme-change', handleThemeChange)
    }
  }, [])

  useEffect(() => {
    const root = document.getElementById('root')

    if (!root) {
      return undefined
    }

    const previousOverflow = root.style.overflowY
    root.style.overflowY = isMobileMenuOpen ? 'hidden' : previousOverflow || 'auto'

    return () => {
      root.style.overflowY = previousOverflow
    }
  }, [isMobileMenuOpen])

  useEffect(() => {
    const root = document.getElementById('root')

    if (!root) {
      return undefined
    }

    const currentRoot = root

    function updateScrollbarWidth() {
      const scrollbarWidth = Math.max(0, currentRoot.offsetWidth - currentRoot.clientWidth)
      document.documentElement.style.setProperty('--app-scrollbar-width', `${scrollbarWidth}px`)
    }

    updateScrollbarWidth()
    window.addEventListener('resize', updateScrollbarWidth)

    return () => {
      window.removeEventListener('resize', updateScrollbarWidth)
      document.documentElement.style.removeProperty('--app-scrollbar-width')
    }
  }, [])

  const isDark = variant === 'dark' || themeMode === 'dark'
  const textClass = isDark ? 'text-slate-50' : 'text-slate-900'
  const mutedClass = isDark ? 'text-slate-200/85' : 'text-slate-700'
  const hoverTextClass = isDark
    ? 'hover:text-blue-100 focus-visible:text-blue-100'
    : 'hover:text-blue-700 focus-visible:text-blue-700'
  const hoverBorderClass = isDark
    ? 'hover:border-b-blue-200/45 focus-visible:border-b-blue-200/45'
    : 'hover:border-b-blue-600/25 focus-visible:border-b-blue-600/25'
  const activeNavClass = isDark
    ? 'border-b-blue-200/45 text-blue-100'
    : 'border-b-blue-600/25 text-blue-700'
  const activeTextClass = isDark ? 'text-blue-100' : 'text-blue-700'
  const languageBorderClass = isDark ? 'border-slate-200/20' : 'border-slate-900/12'
  const languageMenuClass = isDark
    ? 'border-slate-200/15 bg-slate-900/95 shadow-[0_20px_48px_rgba(2,6,23,0.28)]'
    : 'border-slate-900/10 bg-white/95 shadow-[0_18px_42px_rgba(15,23,42,0.12)]'
  const activeLanguageOptionTextClass = isDark ? 'text-blue-100' : 'text-blue-700'
  const navbarSurfaceClass = isDark
    ? 'border-slate-200/10 bg-[#2b2f36]/68 shadow-[0_18px_40px_rgba(2,6,23,0.22)]'
    : 'border-white/54 bg-white/64 shadow-[0_18px_40px_rgba(15,23,42,0.08)]'
  const mobileHeaderSurfaceClass = navbarSurfaceClass
  const mobilePanelSurfaceClass = navbarSurfaceClass
  const mobileMenuButtonBorderClass = isDark ? 'border-slate-200/15' : 'border-slate-900/10'
  const mobileSectionBorderClass = isDark ? 'border-slate-200/12' : 'border-slate-900/8'
  const mobileSectionLabelClass = isDark ? 'text-slate-400' : 'text-slate-500'
  const mobileSectionTitle = language === 'en' ? 'Language' : '언어'

  const activeLanguageIcon = language === 'en' ? englishIcon : koreaIcon
  const activeLanguageLabel = language === 'en' ? 'English' : '\uD55C\uAD6D\uC5B4'
  const activeTextLogo = isDark ? phangportTextlogoWhite : phangportTextlogoBlack
  const navItems = NAV_ITEMS.map((item) => ({ ...item, label: item.label[language] }))

  const languageMenu = (
    <LanguageMenu
      language={language}
      options={LANGUAGE_OPTIONS}
      menuRef={desktopLanguageMenuRef}
      isOpen={openLanguageMenu === 'desktop'}
      onToggle={() =>
        setOpenLanguageMenu((openMenu) => (openMenu === 'desktop' ? null : 'desktop'))
      }
      onSelect={(nextLanguage) => {
        setLanguage(nextLanguage)
        setOpenLanguageMenu(null)
        window.dispatchEvent(new CustomEvent('phangport-language-change', { detail: nextLanguage }))
      }}
      activeLanguageIcon={activeLanguageIcon}
      activeLanguageLabel={activeLanguageLabel}
      textClass={textClass}
      hoverTextClass={hoverTextClass}
      languageBorderClass={languageBorderClass}
      languageMenuClass={languageMenuClass}
      activeOptionTextClass={activeLanguageOptionTextClass}
    />
  )

  const mobileLanguageMenu = (
    <LanguageMenu
      language={language}
      options={LANGUAGE_OPTIONS}
      isOpen={openLanguageMenu === 'mobile'}
      onToggle={() =>
        setOpenLanguageMenu((openMenu) => (openMenu === 'mobile' ? null : 'mobile'))
      }
      onSelect={(nextLanguage) => {
        setLanguage(nextLanguage)
        setOpenLanguageMenu(null)
        window.dispatchEvent(new CustomEvent('phangport-language-change', { detail: nextLanguage }))
      }}
      menuRef={mobileLanguageMenuRef}
      activeLanguageIcon={activeLanguageIcon}
      activeLanguageLabel={activeLanguageLabel}
      textClass={textClass}
      hoverTextClass={hoverTextClass}
      languageBorderClass={languageBorderClass}
      languageMenuClass={languageMenuClass}
      activeOptionTextClass={activeLanguageOptionTextClass}
      wrapperClassName="flex w-full"
      buttonClassName="min-h-12 w-full justify-between rounded-[18px] px-4 py-3 text-[0.82rem]"
      menuPositionClassName="inset-x-0 top-[calc(100%+10px)]"
      menuClassName="min-w-0"
    />
  )

  return (
    <header className="fixed inset-x-0 top-0 z-30">
      <div className="ml-3 mr-auto flex w-[min(1126px,calc(100%-24px-var(--app-scrollbar-width,0px)))] justify-center pt-3 md:mx-auto md:w-[min(1160px,calc(100%-120px))] md:pt-6">
        <DesktopNav
          navItems={navItems}
          activeTextLogo={activeTextLogo}
          mutedClass={mutedClass}
          hoverTextClass={hoverTextClass}
          hoverBorderClass={hoverBorderClass}
          activeNavClass={activeNavClass}
          navbarSurfaceClass={navbarSurfaceClass}
          languageMenu={languageMenu}
        />

        <MobileNav
          navItems={navItems}
          activeTextLogo={activeTextLogo}
          isMenuOpen={isMobileMenuOpen}
          onToggleMenu={() => {
            setIsMobileMenuOpen((open) => !open)
            setOpenLanguageMenu(null)
          }}
          onCloseMenu={() => {
            setIsMobileMenuOpen(false)
            setOpenLanguageMenu(null)
          }}
          menuButtonRef={mobileMenuButtonRef}
          menuPanelRef={mobileMenuPanelRef}
          mobileHeaderSurfaceClass={mobileHeaderSurfaceClass}
          mobilePanelSurfaceClass={mobilePanelSurfaceClass}
          mobileMenuButtonBorderClass={mobileMenuButtonBorderClass}
          mobileSectionBorderClass={mobileSectionBorderClass}
          mobileSectionLabelClass={mobileSectionLabelClass}
          mobileSectionTitle={mobileSectionTitle}
          textClass={textClass}
          mutedClass={mutedClass}
          hoverTextClass={hoverTextClass}
          activeTextClass={activeTextClass}
          languageMenu={mobileLanguageMenu}
        />
      </div>
    </header>
  )
}

export default Navbar
