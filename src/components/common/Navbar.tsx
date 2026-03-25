import styled from 'styled-components'
import phangportIcon from '../../assets/phangporticon/phangport-icon.png'

const NAV_ITEMS = [
  { label: '자기소개', targetId: 'about' },
  { label: '프로젝트', targetId: 'projects' },
  { label: '수상내역', targetId: 'awards' },
]

const Bar = styled.header`
  --navbar-text: #0f172a;
  --navbar-muted: #334155;
  --navbar-border: rgba(15, 23, 42, 0.1);
  --navbar-hover-border: rgba(37, 99, 235, 0.25);
  --navbar-hover-text: #1d4ed8;
  --navbar-hover-bg: rgba(37, 99, 235, 0.04);
  position: fixed;
  top: 24px;
  left: 50%;
  z-index: 10;
  width: min(1126px, calc(100% - 48px));
  display: flex;
  align-items: center;
  justify-content: space-between;
  transform: translateX(-50%);
  background: transparent;

  &[data-variant='dark'] {
    --navbar-text: #f8fafc;
    --navbar-muted: rgba(248, 250, 252, 0.86);
    --navbar-border: rgba(226, 232, 240, 0.18);
    --navbar-hover-border: rgba(191, 219, 254, 0.48);
    --navbar-hover-text: #dbeafe;
    --navbar-hover-bg: rgba(148, 163, 184, 0.14);
  }

  @media (min-width: 768px) {
    width: min(1126px, calc(100% - 128px));
  }

  @media (max-width: 767px) {
    top: 18px;
    gap: 14px;
    flex-direction: column;
  }
`

const LogoButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 0;
  border: 0;
  background: transparent;
  cursor: pointer;
`

const LogoMark = styled.img`
  width: 44px;
  height: 44px;
  object-fit: contain;
`

const LogoText = styled.span`
  color: var(--navbar-text);
  font-size: 0.95rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
`

const Menu = styled.nav`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 15px;
`

const MenuButton = styled.button`
  padding: 10px 4px;
  border: 0;
  border-bottom: 3px solid transparent;
  background: transparent;
  color: var(--navbar-muted);
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  transition:
    border-color 0.2s ease,
    color 0.2s ease,
    background-color 0.2s ease;

  &:hover,
  &:focus,
  &:active,
  &:focus-visible {
    border-bottom-color: var(--navbar-hover-border);
    color: var(--navbar-hover-text);
    background: transparent;
    outline: none;
  }
`

function scrollToTarget(targetId = '') {
  const root = document.getElementById('root')
  const target = document.getElementById(targetId)

  if (!root || !target) {
    return
  }

  const rootRect = root.getBoundingClientRect()
  const targetRect = target.getBoundingClientRect()
  const offsetTop = targetRect.top - rootRect.top + root.scrollTop

  root.scrollTo({ top: offsetTop, behavior: 'smooth' })
}

function Navbar({ variant = 'light' }) {
  return (
    <Bar data-variant={variant}>
      <LogoButton type="button" aria-label="Go to home" onClick={() => scrollToTarget('home')}>
        <LogoMark src={phangportIcon} alt="PHANGPORT logo" />
        {/* <LogoText>PHANGPORT</LogoText> */}
      </LogoButton>

      <Menu aria-label="Primary">
        {NAV_ITEMS.map((item) => (
          <MenuButton
            key={item.targetId}
            type="button"
            onClick={() => scrollToTarget(item.targetId)}
          >
            {item.label}
          </MenuButton>
        ))}
      </Menu>
    </Bar>
  )
}

export default Navbar
