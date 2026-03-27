import { Link } from 'react-router-dom'
import phangportIcon from '../../../assets/phangporticon/phangport-icon.png'

type BrandLogoProps = {
  textLogoSrc: string
  textLogoClassName?: string
  linkClassName?: string
  onClick?: () => void
}

function BrandLogo({
  textLogoSrc,
  textLogoClassName,
  linkClassName,
  onClick,
}: BrandLogoProps) {
  return (
    <Link
      to="/"
      aria-label="Go to home"
      onClick={onClick}
      className={`inline-flex items-center gap-[10px] bg-transparent p-0 ${linkClassName ?? ''}`}
    >
      <img src={phangportIcon} alt="PHANGPORT logo" className="h-11 w-11 object-contain" />
      <img
        src={textLogoSrc}
        alt="PHANGPORT text logo"
        className={`h-5 w-auto object-contain ${textLogoClassName ?? ''}`}
      />
    </Link>
  )
}

export default BrandLogo
