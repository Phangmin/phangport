import type { ReactNode } from 'react'

export type ContactInfoCardProps = {
  title: string
  ariaLabel: string
  href: string
  icon: ReactNode
  value?: string
  framedIcon?: boolean
  tone?: 'default' | 'instagram' | 'kakao' | 'linkedin'
}

function ContactInfoCard({
  title,
  ariaLabel,
  href,
  icon,
  value,
  framedIcon = true,
  tone = 'default',
}: ContactInfoCardProps) {
  const hasDetail = typeof value === 'string' && value.length > 0
  const isSocialCard = !framedIcon
  const cardClass = framedIcon
    ? 'grid min-h-[98px] grid-cols-[48px_minmax(0,1fr)] items-center gap-4 rounded-[22px] px-5 py-[18px]'
    : 'grid min-h-[62px] grid-cols-[20px_max-content] justify-center items-center gap-2.5 rounded-[20px] px-[18px] py-[9px]'
  const toneClass =
    tone === 'instagram'
      ? 'border border-[#c13584] bg-transparent text-[#c13584] hover:border-[#c13584] hover:bg-[#c13584] hover:text-white focus-visible:border-[#c13584] focus-visible:bg-[#c13584] focus-visible:text-white'
      : tone === 'linkedin'
        ? 'border border-[#0a66c2] bg-transparent text-[#0a66c2] hover:border-[#0a66c2] hover:bg-[#0a66c2] hover:text-white focus-visible:border-[#0a66c2] focus-visible:bg-[#0a66c2] focus-visible:text-white'
      : tone === 'kakao'
        ? 'border border-[#f2d900] bg-transparent text-[#191919] hover:border-[#f2d900] hover:bg-[#f2d900] hover:text-[#191919] focus-visible:border-[#f2d900] focus-visible:bg-[#f2d900] focus-visible:text-[#191919]'
        : 'border border-slate-900/10 bg-transparent text-slate-900 hover:border-slate-900/22 focus-visible:border-slate-900/22'
  const iconWrapClass = framedIcon
    ? 'inline-flex h-[40px] w-[40px] items-center justify-center rounded-full border-[1.5px] border-slate-900/16 bg-transparent text-slate-900 transition-colors duration-200'
    : 'inline-flex h-[20px] w-[20px] items-center justify-center text-current'
  const iconSizeClass = framedIcon ? 'h-[18px] w-[18px]' : 'h-[20px] w-[20px]'
  const textClass = hasDetail
    ? 'gap-1.5'
    : framedIcon
      ? 'content-center self-center'
      : 'content-center self-center gap-0.5'
  const titleClass =
    tone === 'default'
      ? 'text-[var(--text-h)]'
      : tone === 'kakao'
        ? 'text-[#191919]'
        : tone === 'linkedin'
          ? 'text-[#0a66c2] group-hover:text-white group-focus-visible:text-white'
          : 'text-[#c13584] group-hover:text-white group-focus-visible:text-white'
  const detailClass =
    tone === 'default'
      ? 'text-slate-600'
      : tone === 'kakao'
        ? 'text-[#191919]/80'
        : tone === 'linkedin'
          ? 'text-[#0a66c2]/80 group-hover:text-white group-focus-visible:text-white'
          : 'text-[#c13584]/80 group-hover:text-white group-focus-visible:text-white'

  return (
    <a
      href={href}
      aria-label={ariaLabel}
      target={href.startsWith('http') ? '_blank' : undefined}
      rel={href.startsWith('http') ? 'noreferrer' : undefined}
      className={`${cardClass} group ${toneClass} ${isSocialCard ? 'text-center' : 'text-left'} no-underline shadow-[0_18px_42px_rgba(15,23,42,0.05)] transition-[background-color,border-color,filter,color] duration-200 focus-visible:outline-none`}
      data-contact-surface="true"
      data-contact-email-card="true"
      data-contact-card-tone={tone}
    >
      <div className={iconWrapClass} data-contact-icon-frame={framedIcon ? 'true' : 'false'}>
        <span className={iconSizeClass} data-contact-icon={framedIcon ? 'true' : 'false'}>
          {icon}
        </span>
      </div>
      <div className={`grid ${isSocialCard ? 'text-center' : 'text-left'} ${textClass}`}>
        <h2 className={`m-0 text-[0.96rem] font-semibold leading-[1.15] ${titleClass}`}>{title}</h2>
        {hasDetail ? (
          <p className={`m-0 break-words text-[0.82rem] leading-[1.6] ${detailClass}`} data-contact-muted="true">
            {value}
          </p>
        ) : null}
      </div>
    </a>
  )
}

export default ContactInfoCard
