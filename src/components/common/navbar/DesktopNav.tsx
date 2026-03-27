import type { ReactNode } from 'react'
import { NavLink } from 'react-router-dom'
import BrandLogo from './BrandLogo'

type NavItem = {
  label: string
  to: string
}

type DesktopNavProps = {
  navItems: readonly NavItem[]
  activeTextLogo: string
  mutedClass: string
  hoverTextClass: string
  hoverBorderClass: string
  activeNavClass: string
  navbarSurfaceClass: string
  languageMenu: ReactNode
}

function DesktopNav({
  navItems,
  activeTextLogo,
  mutedClass,
  hoverTextClass,
  hoverBorderClass,
  activeNavClass,
  navbarSurfaceClass,
  languageMenu,
}: DesktopNavProps) {
  return (
    <div
      className={`hidden w-full items-center justify-between rounded-full border px-5 py-3 backdrop-blur-lg md:flex ${navbarSurfaceClass}`}
    >
      <BrandLogo textLogoSrc={activeTextLogo} />

      <nav aria-label="Primary" className="flex flex-wrap items-center justify-center gap-[15px]">
        {languageMenu}

        {navItems.map((item) => (
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
    </div>
  )
}

export default DesktopNav
