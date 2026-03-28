import type { ReactNode, RefObject } from 'react'
import { NavLink } from 'react-router-dom'
import BrandLogo from './BrandLogo'

type NavItem = {
  label: string
  to: string
}

type MobileNavProps = {
  navItems: readonly NavItem[]
  activeTextLogo: string
  isMenuOpen: boolean
  onToggleMenu: () => void
  onCloseMenu: () => void
  menuButtonRef: RefObject<HTMLButtonElement | null>
  menuPanelRef: RefObject<HTMLDivElement | null>
  mobileHeaderSurfaceClass: string
  mobilePanelSurfaceClass: string
  mobileMenuButtonBorderClass: string
  mobileSectionBorderClass: string
  mobileSectionLabelClass: string
  mobileSectionTitle: string
  textClass: string
  mutedClass: string
  hoverTextClass: string
  activeTextClass: string
  languageMenu: ReactNode
}

function MobileNav({
  navItems,
  activeTextLogo,
  isMenuOpen,
  onToggleMenu,
  onCloseMenu,
  menuButtonRef,
  menuPanelRef,
  mobileHeaderSurfaceClass,
  mobilePanelSurfaceClass,
  mobileMenuButtonBorderClass,
  mobileSectionBorderClass,
  mobileSectionLabelClass,
  mobileSectionTitle,
  textClass,
  mutedClass,
  hoverTextClass,
  activeTextClass,
  languageMenu,
}: MobileNavProps) {
  return (
    <div className="relative w-full md:hidden">
      <div
        className={`relative flex items-center justify-between rounded-[26px] border px-4 py-3 backdrop-blur-lg ${mobileHeaderSurfaceClass}`}
      >
        <button
          ref={menuButtonRef}
          type="button"
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-primary-navigation"
          onClick={onToggleMenu}
          className={`inline-flex h-11 w-11 items-center justify-center rounded-full border bg-transparent transition-[background-color,color,transform] duration-200 hover:-translate-y-px focus-visible:-translate-y-px focus-visible:outline-none ${mobileMenuButtonBorderClass} ${textClass}`}
        >
          <span className="sr-only">{isMenuOpen ? 'Close menu' : 'Open menu'}</span>
          <span className="relative h-4 w-4">
            <span
              className={`absolute left-0 top-[1px] h-[2px] w-4 rounded-full bg-current transition-transform duration-200 ${isMenuOpen ? 'translate-y-[6px] rotate-45' : ''}`}
            />
            <span
              className={`absolute left-0 top-[7px] h-[2px] w-4 rounded-full bg-current transition-opacity duration-200 ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`}
            />
            <span
              className={`absolute left-0 top-[13px] h-[2px] w-4 rounded-full bg-current transition-transform duration-200 ${isMenuOpen ? '-translate-y-[6px] -rotate-45' : ''}`}
            />
          </span>
        </button>

        <BrandLogo
          textLogoSrc={activeTextLogo}
          textLogoClassName="h-4"
          linkClassName="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          onClick={onCloseMenu}
        />

        <div aria-hidden="true" className="h-11 w-11 shrink-0" />
      </div>

      {isMenuOpen ? (
        <div
          ref={menuPanelRef}
          id="mobile-primary-navigation"
          className={`absolute inset-x-0 top-[calc(100%+12px)] rounded-[28px] border px-4 pb-4 pt-3 backdrop-blur-lg ${mobilePanelSurfaceClass}`}
        >
          <nav aria-label="Mobile primary" className="grid gap-2">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                onClick={onCloseMenu}
                className={({ isActive }) =>
                  `rounded-2xl px-4 py-3 text-left text-[0.94rem] font-semibold transition-[color,background-color] duration-200 focus-visible:outline-none ${mutedClass} ${hoverTextClass} ${
                    isActive
                      ? `${activeTextClass} border border-transparent bg-blue-600/10`
                      : 'border border-transparent hover:bg-blue-600/6 focus-visible:bg-blue-600/6'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className={`mt-3 border-t pt-3 ${mobileSectionBorderClass}`}>
            <div className={`mb-2 px-1 text-left text-[0.7rem] font-semibold uppercase tracking-[0.2em] ${mobileSectionLabelClass}`}>
              {mobileSectionTitle}
            </div>
            {languageMenu}
          </div>
        </div>
      ) : null}
    </div>
  )
}

export default MobileNav
