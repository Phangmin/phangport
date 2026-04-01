import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from 'react'
import githubIconAsset from '../../assets/icons/github-icon.png'
import notionIconAsset from '../../assets/icons/notion-icon.webp'
import tistoryIconAsset from '../../assets/icons/tistory-icon.svg'
import instagramIconAsset from '../../assets/icons/instagram-icon.png'
import linkedinIconAsset from '../../assets/icons/linkedin-icon.png'
import { RevealOnScroll } from '../common'

type StrengthCard = {
  image: string
  alt: string
}

type SocialLinks = {
  githubUrl: string
  instagramUrl: string
  linkedinUrl: string
  tistoryUrl: string
  notionUrl: string
}

type AboutIntroSectionProps = {
  strengthCards: StrengthCard[]
  headingLines: [string, string]
  description: string
  links: SocialLinks
}

const STRENGTH_RAIL_DOT_COUNT = 2

function GithubIcon() {
  return (
    <img
      src={githubIconAsset}
      alt=""
      aria-hidden="true"
      className="h-[18px] w-[18px] object-contain transition-[filter] duration-200 group-hover:brightness-0 group-hover:invert group-focus-visible:brightness-0 group-focus-visible:invert"
    />
  )
}

function InstagramIcon() {
  return (
    <img
      src={instagramIconAsset}
      alt=""
      aria-hidden="true"
      className="h-[18px] w-[18px] object-contain transition-[filter] duration-200 group-hover:brightness-0 group-hover:invert group-focus-visible:brightness-0 group-focus-visible:invert"
    />
  )
}

function LinkedInIcon() {
  return (
    <img src={linkedinIconAsset} alt="" aria-hidden="true" className="h-[18px] w-[18px] object-contain" />
  )
}

function TistoryIcon() {
  return (
    <img
      src={tistoryIconAsset}
      alt=""
      aria-hidden="true"
      className="h-[18px] w-[18px] object-contain transition-[filter] duration-200 group-hover:brightness-0 group-hover:invert group-focus-visible:brightness-0 group-focus-visible:invert"
    />
  )
}

function NotionIcon() {
  return (
    <img
      src={notionIconAsset}
      alt=""
      aria-hidden="true"
      className="h-[18px] w-[18px] object-contain transition-[filter] duration-200 group-hover:brightness-0 group-hover:invert group-focus-visible:brightness-0 group-focus-visible:invert"
    />
  )
}

function AboutIntroSection({ strengthCards, headingLines, description, links }: AboutIntroSectionProps) {
  const railRef = useRef<HTMLDivElement | null>(null)
  const socialRailRef = useRef<HTMLDivElement | null>(null)
  const [activeStrengthPage, setActiveStrengthPage] = useState(0)
  const dragStateRef = useRef({
    pointerId: -1,
    startX: 0,
    startScrollLeft: 0,
    isDragging: false,
  })
  const socialDragStateRef = useRef({
    pointerId: -1,
    startX: 0,
    startScrollLeft: 0,
    isDragging: false,
  })

  useEffect(() => {
    const rail = railRef.current

    if (!rail) {
      return undefined
    }

    const currentRail = rail

    function updateActiveIndex() {
      const maxScrollLeft = currentRail.scrollWidth - currentRail.clientWidth

      if (maxScrollLeft <= 0) {
        setActiveStrengthPage(0)
        return
      }

      const progress = currentRail.scrollLeft / maxScrollLeft
      const nextPage = Math.round(progress * (STRENGTH_RAIL_DOT_COUNT - 1))
      setActiveStrengthPage(nextPage)
    }

    updateActiveIndex()
    currentRail.addEventListener('scroll', updateActiveIndex, { passive: true })
    window.addEventListener('resize', updateActiveIndex)

    return () => {
      currentRail.removeEventListener('scroll', updateActiveIndex)
      window.removeEventListener('resize', updateActiveIndex)
    }
  }, [strengthCards.length])

  function handlePointerDown(event: ReactPointerEvent<HTMLDivElement>) {
    const rail = railRef.current

    if (!rail || rail.scrollWidth <= rail.clientWidth) {
      return
    }

    dragStateRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startScrollLeft: rail.scrollLeft,
      isDragging: true,
    }

    rail.setPointerCapture(event.pointerId)
  }

  function handlePointerMove(event: ReactPointerEvent<HTMLDivElement>) {
    const rail = railRef.current
    const dragState = dragStateRef.current

    if (!rail || !dragState.isDragging || dragState.pointerId !== event.pointerId) {
      return
    }

    const deltaX = event.clientX - dragState.startX
    rail.scrollLeft = dragState.startScrollLeft - deltaX
    event.preventDefault()
  }

  function handlePointerEnd(event: ReactPointerEvent<HTMLDivElement>) {
    const rail = railRef.current
    const dragState = dragStateRef.current

    if (!dragState.isDragging || dragState.pointerId !== event.pointerId) {
      return
    }

    dragStateRef.current = {
      pointerId: -1,
      startX: 0,
      startScrollLeft: 0,
      isDragging: false,
    }

    if (rail?.hasPointerCapture(event.pointerId)) {
      rail.releasePointerCapture(event.pointerId)
    }
  }

  function handleSocialPointerDown(event: ReactPointerEvent<HTMLDivElement>) {
    const rail = socialRailRef.current

    if (!rail || rail.scrollWidth <= rail.clientWidth) {
      return
    }

    socialDragStateRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startScrollLeft: rail.scrollLeft,
      isDragging: true,
    }

    rail.setPointerCapture(event.pointerId)
  }

  function handleSocialPointerMove(event: ReactPointerEvent<HTMLDivElement>) {
    const rail = socialRailRef.current
    const dragState = socialDragStateRef.current

    if (!rail || !dragState.isDragging || dragState.pointerId !== event.pointerId) {
      return
    }

    const deltaX = event.clientX - dragState.startX
    rail.scrollLeft = dragState.startScrollLeft - deltaX
    event.preventDefault()
  }

  function handleSocialPointerEnd(event: ReactPointerEvent<HTMLDivElement>) {
    const rail = socialRailRef.current
    const dragState = socialDragStateRef.current

    if (!dragState.isDragging || dragState.pointerId !== event.pointerId) {
      return
    }

    socialDragStateRef.current = {
      pointerId: -1,
      startX: 0,
      startScrollLeft: 0,
      isDragging: false,
    }

    if (rail?.hasPointerCapture(event.pointerId)) {
      rail.releasePointerCapture(event.pointerId)
    }
  }

  const socialLinks = [
    {
      label: 'GitHub',
      href: links.githubUrl,
      icon: <GithubIcon />,
      hoverClass:
        'hover:border-[#111827]/30 hover:bg-[#111827] hover:text-white focus-visible:border-[#111827]/30 focus-visible:bg-[#111827] focus-visible:text-white',
    },
    {
      label: 'Instagram',
      href: links.instagramUrl,
      icon: <InstagramIcon />,
      hoverClass:
        'hover:border-transparent hover:[background:linear-gradient(135deg,rgba(249,206,52,0.92)_0%,rgba(238,42,123,0.92)_55%,rgba(98,40,215,0.94)_100%)_padding-box,linear-gradient(135deg,#f9ce34_0%,#ee2a7b_55%,#6228d7_100%)_border-box] hover:text-white focus-visible:border-transparent focus-visible:[background:linear-gradient(135deg,rgba(249,206,52,0.92)_0%,rgba(238,42,123,0.92)_55%,rgba(98,40,215,0.94)_100%)_padding-box,linear-gradient(135deg,#f9ce34_0%,#ee2a7b_55%,#6228d7_100%)_border-box] focus-visible:text-white',
    },
    {
      label: 'LinkedIn',
      href: links.linkedinUrl,
      icon: <LinkedInIcon />,
      hoverClass:
        'hover:border-[#0a66c2]/30 hover:bg-[#0a66c2] hover:text-white focus-visible:border-[#0a66c2]/30 focus-visible:bg-[#0a66c2] focus-visible:text-white',
    },
    {
      label: 'Tistory',
      href: links.tistoryUrl,
      icon: <TistoryIcon />,
      hoverClass:
        'hover:border-[#ff5a1f]/30 hover:bg-[#ff5a1f] hover:text-white focus-visible:border-[#ff5a1f]/30 focus-visible:bg-[#ff5a1f] focus-visible:text-white',
    },
    {
      label: 'Notion',
      href: links.notionUrl,
      icon: <NotionIcon />,
      hoverClass:
        'hover:border-[#111111]/30 hover:bg-[#111111] hover:text-white focus-visible:border-[#111111]/30 focus-visible:bg-[#111111] focus-visible:text-white',
    },
  ]

  return (
    <section
      className="flex h-full min-w-0 w-full flex-col justify-between gap-4 overflow-x-clip md:gap-6"
      data-about-intro-section="true"
    >
      <header className="flex flex-col gap-3.5 px-0 py-0 md:gap-5">
        <RevealOnScroll
          as="p"
          delay={0.05}
          distance={12}
          duration={720}
          threshold={0.1}
          className="m-0 text-[0.74rem] font-bold uppercase tracking-[0.2em] text-blue-600 md:text-[0.78rem]"
        >
          About
        </RevealOnScroll>

        <div className="grid gap-3.5 md:gap-5">
          <RevealOnScroll
            as="h1"
            delay={0.1}
            distance={12}
            duration={760}
            threshold={0.1}
            className="m-0 grid gap-4 text-[clamp(1.6rem,7.2vw,2.2rem)] font-bold leading-[1] tracking-[-0.05em] text-[var(--text-h)] md:text-[clamp(2rem,5.2vw,2.9rem)] md:leading-[0.98]"
          >
            <span className="block">{headingLines[0]}</span>
            <span className="block">{headingLines[1]}</span>
          </RevealOnScroll>

          <RevealOnScroll
            delay={0.14}
            distance={10}
            duration={680}
            threshold={0.08}
            className="h-px w-full bg-slate-300"
            data-about-intro-divider="true"
          />

          <RevealOnScroll
            as="p"
            delay={0.18}
            distance={12}
            duration={760}
            threshold={0.08}
            className="m-0 max-w-[62ch] text-[0.89rem] leading-[1.72] text-slate-600 md:text-[0.98rem] md:leading-[1.9]"
            data-about-intro-description="true"
          >
            {description}
          </RevealOnScroll>
        </div>
      </header>

      <div
        ref={railRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerEnd}
        onPointerCancel={handlePointerEnd}
        className="flex w-full snap-x snap-mandatory gap-3 overflow-x-auto overscroll-x-contain pb-2 pt-1 touch-pan-x cursor-grab select-none [-webkit-overflow-scrolling:touch] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden active:cursor-grabbing md:grid md:grid-cols-[repeat(auto-fit,minmax(112px,1fr))] md:gap-3.5 md:overflow-visible md:overscroll-auto md:pb-0 md:pt-0 md:cursor-auto md:select-auto xl:grid-cols-5"
      >
        {strengthCards.map((card, index) => (
          <RevealOnScroll
            key={card.alt}
            delay={0.24 + index * 0.06}
            distance={10}
            duration={700}
            threshold={0.08}
            className="block shrink-0 snap-start select-none md:min-w-0 md:shrink md:snap-none"
            data-strength-card="true"
          >
            <img
              src={card.image}
              alt={card.alt}
              draggable={false}
              className="block w-[108px] rounded-[16px] object-cover transition-transform duration-500 ease-out hover:scale-[1.02] md:w-full"
            />
          </RevealOnScroll>
        ))}
      </div>

      <div className="flex items-center justify-center gap-1.5 md:hidden">
        {Array.from({ length: STRENGTH_RAIL_DOT_COUNT }, (_, index) => (
          <span
            key={`strength-dot-${index}`}
            aria-hidden="true"
            className={`h-1.5 rounded-full transition-all duration-200 ${
              index === activeStrengthPage ? 'w-5 bg-blue-600' : 'w-1.5 bg-slate-300'
            }`}
            data-about-intro-dot={index === activeStrengthPage ? 'active' : 'inactive'}
          />
        ))}
      </div>

      <RevealOnScroll as="div" delay={0.34} distance={10} duration={700} threshold={0.08}>
        <div
          ref={socialRailRef}
          onPointerDown={handleSocialPointerDown}
          onPointerMove={handleSocialPointerMove}
          onPointerUp={handleSocialPointerEnd}
          onPointerCancel={handleSocialPointerEnd}
          className="flex w-full items-center gap-2 overflow-x-auto pb-1 pt-1 touch-pan-x cursor-grab [-webkit-overflow-scrolling:touch] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden active:cursor-grabbing md:flex-wrap md:overflow-visible md:pb-0 md:cursor-auto"
        >
          {socialLinks.map((item) =>
            item.href ? (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noreferrer"
                aria-label={item.label}
                data-about-social-link="true"
                className={`group inline-flex shrink-0 items-center gap-2 rounded-full border border-slate-900/10 bg-white/85 px-3 py-2 text-[0.76rem] font-semibold leading-none text-slate-700 transition-[transform,border-color,color,background-color] duration-200 hover:-translate-y-px focus-visible:-translate-y-px focus-visible:outline-none ${item.hoverClass}`}
              >
                {item.icon}
                <span>{item.label}</span>
              </a>
            ) : (
              <span
                key={item.label}
                aria-label={`${item.label} unavailable`}
                data-about-social-link="disabled"
                className="inline-flex shrink-0 cursor-not-allowed items-center gap-2 rounded-full border border-slate-900/8 bg-slate-100/80 px-3 py-2 text-[0.76rem] font-semibold leading-none text-slate-400"
              >
                {item.icon}
                <span>{item.label}</span>
              </span>
            ),
          )}
        </div>
      </RevealOnScroll>
    </section>
  )
}

export default AboutIntroSection
