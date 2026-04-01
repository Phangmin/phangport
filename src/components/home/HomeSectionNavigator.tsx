import { useEffect, useMemo, useState } from 'react'
import useLanguage, { type LanguageCode } from '../../hooks/useLanguage'
import { getResolvedTheme, type ThemeMode } from '../common/theme'

type SectionNavigatorItem = {
  id: string
  label: string
}

const sectionNavigatorItemsByLanguage: Record<LanguageCode, SectionNavigatorItem[]> = {
  ko: [
    { id: 'home', label: 'Home' },
    { id: 'portfolio', label: 'Projects' },
    { id: 'skills', label: 'Skills' },
    { id: 'home-contact', label: 'Contact' },
  ],
  en: [
    { id: 'home', label: 'Home' },
    { id: 'portfolio', label: 'Projects' },
    { id: 'skills', label: 'Skills' },
    { id: 'home-contact', label: 'Contact' },
  ],
}

function HomeSectionNavigator() {
  const language = useLanguage()
  const items = sectionNavigatorItemsByLanguage[language]
  const [activeSectionId, setActiveSectionId] = useState(items[0]?.id ?? 'home')
  const [theme, setTheme] = useState<ThemeMode>(() => getResolvedTheme())

  const resolvedItems = useMemo(() => items, [items])
  const shouldUseDarkTone = activeSectionId === 'portfolio' || theme === 'dark'
  const isDark = shouldUseDarkTone
  const textTone = isDark ? 'text-white' : 'text-slate-950'
  const borderTone = isDark ? 'border-white/38' : 'border-slate-300/90'
  const fillTone = isDark ? 'bg-white/38' : 'bg-slate-300/90'
  const activeTone = 'border-[#3182f6] bg-[#3182f6]'

  useEffect(() => {
    function handleThemeChange(event: Event) {
      if (!(event instanceof CustomEvent)) {
        return
      }

      setTheme(event.detail === 'dark' ? 'dark' : 'light')
    }

    window.addEventListener('phangport-theme-change', handleThemeChange)

    return () => {
      window.removeEventListener('phangport-theme-change', handleThemeChange)
    }
  }, [])

  useEffect(() => {
    const scrollRoot = document.getElementById('root')

    if (!scrollRoot || resolvedItems.length === 0) {
      return undefined
    }

    let animationFrameId = 0

    function updateActiveSection() {
      animationFrameId = 0

      const viewportCenter = window.innerHeight / 2
      let nextActiveId = resolvedItems[0]?.id ?? 'home'
      let closestDistance = Number.POSITIVE_INFINITY

      for (const item of resolvedItems) {
        const sectionElement = document.getElementById(item.id)

        if (!sectionElement) {
          continue
        }

        const rect = sectionElement.getBoundingClientRect()
        const sectionCenter = rect.top + rect.height / 2
        const distance = Math.abs(sectionCenter - viewportCenter)

        if (distance < closestDistance) {
          closestDistance = distance
          nextActiveId = item.id
        }
      }

      setActiveSectionId((current) => (current === nextActiveId ? current : nextActiveId))
    }

    function requestActiveSectionUpdate() {
      if (animationFrameId) {
        return
      }

      animationFrameId = window.requestAnimationFrame(updateActiveSection)
    }

    requestActiveSectionUpdate()
    scrollRoot.addEventListener('scroll', requestActiveSectionUpdate, { passive: true })
    window.addEventListener('resize', requestActiveSectionUpdate)

    return () => {
      if (animationFrameId) {
        window.cancelAnimationFrame(animationFrameId)
      }

      scrollRoot.removeEventListener('scroll', requestActiveSectionUpdate)
      window.removeEventListener('resize', requestActiveSectionUpdate)
    }
  }, [resolvedItems])

  function handleSectionMove(sectionId: string) {
    const sectionElement = document.getElementById(sectionId)

    if (!sectionElement) {
      return
    }

    sectionElement.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <nav
      aria-label="Home section navigation"
      className="pointer-events-none fixed right-8 top-1/2 z-[35] hidden -translate-y-1/2 lg:flex"
    >
      <div className="pointer-events-auto grid justify-items-end gap-3">
        {resolvedItems.map((item) => {
          const isActive = item.id === activeSectionId

          return (
            <button
              key={item.id}
              type="button"
              aria-current={isActive ? 'true' : undefined}
              aria-label={item.label}
              onClick={() => handleSectionMove(item.id)}
              className="group flex min-h-[16px] items-center justify-end gap-2 bg-transparent p-0 text-right focus-visible:outline-none"
            >
              <span
                className={`text-[0.82rem] font-medium transition-all duration-200 ${textTone} ${
                  isActive
                    ? 'translate-x-0 opacity-100'
                    : 'translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100'
                }`}
              >
                {item.label}
              </span>
              <span
                className={`inline-flex items-center justify-center rounded-[2px] border transition-colors duration-200 ${
                  isActive
                    ? `h-[10px] w-5 ${activeTone}`
                    : `h-[10px] w-[10px] ${borderTone} ${fillTone}`
                }`}
              />
            </button>
          )
        })}
      </div>
    </nav>
  )
}

export default HomeSectionNavigator
