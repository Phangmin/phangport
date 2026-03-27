// @ts-nocheck
import { useEffect, useRef, useState } from 'react'
import { RevealOnScroll } from '../common'

function AboutProjectsSection(props) {
  const { items, header } = props
  const trackRef = useRef(null)
  const pauseRef = useRef(false)
  const intervalRef = useRef(0)
  const isAnimatingRef = useRef(false)
  const [activeProjectPage, setActiveProjectPage] = useState(0)
  const [currentStartIndex, setCurrentStartIndex] = useState(0)
  const [offsetPx, setOffsetPx] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [transitionEnabled, setTransitionEnabled] = useState(false)
  const [pendingDirection, setPendingDirection] = useState(0)

  const itemCount = items.length
  const safeStartIndex =
    itemCount > 0 ? ((currentStartIndex % itemCount) + itemCount) % itemCount : 0
  const orderedItems =
    itemCount > 1
      ? items.map((_, index) => items[(safeStartIndex + index) % itemCount])
      : items

  function getCardStep() {
    const trackNode = trackRef.current

    if (!trackNode) {
      return 292
    }

    const firstCard = trackNode.querySelector('[data-project-card="true"]')
    const computedStyle = window.getComputedStyle(trackNode)
    const gap = Number.parseFloat(computedStyle.columnGap || computedStyle.gap || '0') || 0

    if (!(firstCard instanceof HTMLElement)) {
      return 292 + gap
    }

    return firstCard.getBoundingClientRect().width + gap
  }

  function handleNext() {
    if (isAnimatingRef.current || itemCount < 2) {
      return
    }

    const step = getCardStep()
    setPendingDirection(1)
    setTransitionEnabled(true)
    setIsAnimating(true)
    setOffsetPx(-step)
  }

  function handlePrev() {
    if (isAnimatingRef.current || itemCount < 2) {
      return
    }

    const step = getCardStep()

    setIsAnimating(true)
    setPendingDirection(-1)
    setTransitionEnabled(false)
    setCurrentStartIndex((value) => (value - 1 + itemCount) % itemCount)
    setOffsetPx(-step)

    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        setTransitionEnabled(true)
        setOffsetPx(0)
      })
    })
  }

  function handleTransitionEnd(event) {
    if (event.target !== event.currentTarget || !isAnimatingRef.current) {
      return
    }

    if (pendingDirection === 1 && itemCount > 0) {
      setTransitionEnabled(false)
      setCurrentStartIndex((value) => (value + 1) % itemCount)
      setOffsetPx(0)
    } else if (pendingDirection === -1) {
      setTransitionEnabled(false)
    }

    setPendingDirection(0)
    setIsAnimating(false)
  }

  useEffect(() => {
    isAnimatingRef.current = isAnimating
  }, [isAnimating])

  useEffect(() => {
    if (itemCount < 2) {
      return undefined
    }

    intervalRef.current = window.setInterval(() => {
      if (!pauseRef.current && !isAnimatingRef.current) {
        const step = getCardStep()
        setPendingDirection(1)
        setTransitionEnabled(true)
        setIsAnimating(true)
        setOffsetPx(-step)
      }
    }, 2600)

    return () => {
      window.clearInterval(intervalRef.current)
    }
  }, [itemCount])

  useEffect(() => {
    const trackNode = trackRef.current

    if (!(trackNode instanceof HTMLElement)) {
      return undefined
    }

    function updateActivePage() {
      const maxOffset = (itemCount - 1) * getCardStep()

      if (maxOffset <= 0) {
        setActiveProjectPage(0)
        return
      }

      const effectiveOffset = currentStartIndex * getCardStep() + Math.abs(offsetPx)
      const progress = Math.min(1, effectiveOffset / maxOffset)
      const nextPage = Math.round(progress * (itemCount - 1))
      setActiveProjectPage(nextPage)
    }

    updateActivePage()
    window.addEventListener('resize', updateActivePage)

    return () => {
      window.removeEventListener('resize', updateActivePage)
    }
  }, [currentStartIndex, itemCount, offsetPx])

  return (
    <section className="grid min-w-0 overflow-x-clip px-0 py-1 md:px-1 md:py-2">
      <RevealOnScroll
        delay={0.1}
        className="grid w-full min-w-0 grid-cols-[minmax(0,1fr)_auto] items-end gap-3"
      >
        <div className="grid gap-2 text-left">
          <div className="flex items-end gap-2">
            <h2 className="m-0 text-[1.18rem] font-bold text-[var(--text-h)] md:text-[1.32rem]">{header.primary}</h2>
            <p
              className="m-0 leading-none text-[0.78rem] text-gray-400 md:text-sm"
              data-about-section-secondary="true"
            >
              {header.secondary}
            </p>
          </div>
          <p
            className="m-0 text-[0.9rem] leading-[1.72] text-slate-500 md:text-sm md:leading-7"
            data-about-section-description="true"
          >
            {header.description}
          </p>
        </div>

        <div className="flex items-center justify-end gap-2 self-start">
          <button
            type="button"
            aria-label="Scroll projects left"
            onClick={handlePrev}
            data-about-project-nav="true"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-900/10 bg-white/80 text-slate-700 transition-colors duration-200 hover:border-blue-600/30 hover:text-blue-700 focus-visible:border-blue-600/30 focus-visible:text-blue-700 focus-visible:outline-none md:h-10 md:w-10"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4" fill="none">
              <path
                d="m14.5 5.5-6 6 6 6"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <button
            type="button"
            aria-label="Scroll projects right"
            onClick={handleNext}
            data-about-project-nav="true"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-900/10 bg-white/80 text-slate-700 transition-colors duration-200 hover:border-blue-600/30 hover:text-blue-700 focus-visible:border-blue-600/30 focus-visible:text-blue-700 focus-visible:outline-none md:h-10 md:w-10"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4" fill="none">
              <path
                d="m9.5 5.5 6 6-6 6"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </RevealOnScroll>

      <RevealOnScroll
        delay={0.18}
        className="mt-1 w-full min-w-0"
        onMouseEnter={() => {
          pauseRef.current = true
        }}
        onMouseLeave={() => {
          pauseRef.current = false
        }}
      >
        <div className="w-full min-w-0 overflow-x-hidden overflow-y-visible py-3 md:py-4">
          <div
            ref={trackRef}
            onTransitionEnd={handleTransitionEnd}
            style={{
              transform: `translateX(${offsetPx}px)`,
              transition: transitionEnabled ? 'transform 560ms ease' : 'none',
            }}
            className="flex w-full min-w-0 gap-3 md:gap-4"
          >
            {orderedItems.map((item, index) => {
              const projectImage = item.image || item.imageSrc || item.thumbnail || item.poster
              const skillItems = Array.isArray(item.skills)
                ? item.skills
                : String(item.skills || '')
                    .split(',')
                    .map((skill) => skill.trim())
                    .filter(Boolean)

              return (
                <button
                  key={`${item.title}-${index}`}
                  type="button"
                  data-project-card="true"
                  className="group min-h-0 min-w-[min(18.25rem,calc(100%-2rem))] max-w-[min(18.25rem,calc(100%-2rem))] text-left focus-visible:outline-none sm:min-h-[300px] sm:min-w-[calc((100%-1rem)/2)] sm:max-w-[calc((100%-1rem)/2)] lg:min-h-[320px] lg:min-w-[calc((100%-2rem)/3)] lg:max-w-[calc((100%-2rem)/3)] xl:min-w-[calc((100%-3rem)/4)] xl:max-w-[calc((100%-3rem)/4)]"
                >
                  <div
                    className="relative flex h-full flex-col overflow-hidden rounded-[22px] border border-slate-900/5 bg-[linear-gradient(180deg,#ffffff_0%,#f8fbff_58%,#eef6ff_100%)] p-3.5 text-slate-950 transition-[transform,background,border-color] duration-300 group-hover:-translate-y-1 group-hover:border-white/12 group-hover:bg-[linear-gradient(135deg,#0e2f9a_0%,#1f66ff_52%,#4da4ff_100%)] group-focus-visible:-translate-y-1 group-focus-visible:border-white/12 group-focus-visible:bg-[linear-gradient(135deg,#0e2f9a_0%,#1f66ff_52%,#4da4ff_100%)] sm:min-h-[300px] sm:rounded-[24px] sm:p-5 lg:min-h-[320px] lg:rounded-[26px]"
                    data-about-project-card-surface="true"
                  >
                    <div
                      data-about-project-glow="primary"
                      className="pointer-events-none absolute right-[-34px] top-[-26px] h-28 w-28 rounded-full bg-blue-300/40 blur-3xl transition-colors duration-300 group-hover:bg-[#78bdff]/46 group-focus-visible:bg-[#78bdff]/46"
                    />
                    <div
                      data-about-project-glow="secondary"
                      className="pointer-events-none absolute bottom-[-30px] left-[-24px] h-24 w-24 rounded-full bg-sky-200/70 blur-3xl transition-colors duration-300 group-hover:bg-[#2f74ff]/34 group-focus-visible:bg-[#2f74ff]/34"
                    />

                    <div className="flex flex-col">
                      <div className="grid gap-2 sm:gap-3">
                        <div
                          data-about-project-image-surface="true"
                          className={`aspect-[16/9] w-full overflow-hidden rounded-[16px] transition-colors duration-300 sm:rounded-[18px] ${
                            projectImage
                              ? 'bg-slate-100'
                              : 'bg-[linear-gradient(180deg,rgba(255,255,255,0.96)_0%,rgba(219,234,254,0.92)_100%)] group-hover:bg-[linear-gradient(180deg,rgba(255,255,255,0.18)_0%,rgba(77,164,255,0.22)_100%)] group-focus-visible:bg-[linear-gradient(180deg,rgba(255,255,255,0.18)_0%,rgba(77,164,255,0.22)_100%)]'
                          }`}
                        >
                          {projectImage ? (
                            <img src={projectImage} alt={item.title} className="h-full w-full object-cover" />
                          ) : (
                            <div className="flex h-full w-full items-end justify-between bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.42),transparent_42%)] p-4">
                            <span
                              className="text-[0.7rem] uppercase tracking-[0.14em] text-slate-500 transition-colors duration-300 group-hover:text-[#dbeeff]/80 group-focus-visible:text-[#dbeeff]/80"
                              data-about-project-placeholder="true"
                            >
                              Project Image
                            </span>
                              <div className="h-12 w-12 rounded-full bg-blue-600/12 transition-colors duration-300 group-hover:bg-[#dbeeff]/14 group-focus-visible:bg-[#dbeeff]/14" />
                            </div>
                          )}
                        </div>

                        <div className="grid gap-1">
                          <h3
                            data-about-project-title="true"
                            className="m-0 text-[0.92rem] font-semibold leading-[1.2] text-slate-950 transition-colors duration-300 group-hover:text-white group-focus-visible:text-white sm:text-[1.1rem]"
                          >
                            {item.title}
                          </h3>

                          <div className="grid gap-1">
                            <p
                              className="m-0 text-[0.74rem] leading-[1.6] text-slate-700 transition-colors duration-300 group-hover:text-[#ebf5ff]/88 group-focus-visible:text-[#ebf5ff]/88 sm:text-xs sm:leading-[1.7]"
                              data-about-project-meta="true"
                            >
                              <strong>|</strong> {item.period}
                            </p>
                            <p
                              className="m-0 text-[0.74rem] leading-[1.6] text-slate-700 transition-colors duration-300 group-hover:text-[#ebf5ff]/88 group-focus-visible:text-[#ebf5ff]/88 sm:text-xs sm:leading-[1.7]"
                              data-about-project-meta="true"
                            >
                              <strong>|</strong> {item.role}
                            </p>
                          </div>

                          <p
                            data-about-project-description="true"
                            className="m-0 min-h-[3.15rem] text-[0.74rem] leading-[1.55] text-slate-700 transition-colors duration-300 group-hover:text-[#ebf5ff]/88 group-focus-visible:text-[#ebf5ff]/88 sm:min-h-[4.8rem] sm:text-xs sm:leading-[1.7]"
                          >
                            {item.description}
                          </p>
                        </div>
                      </div>

                      {skillItems.length > 0 ? (
                        <div className="mt-1 flex flex-wrap gap-1.5 sm:mt-0 sm:gap-2">
                          {skillItems.map((skill) => (
                            <span
                              key={`${item.title}-${skill}`}
                              data-about-skill-chip="true"
                              className="inline-flex items-center justify-center rounded-full bg-blue-600/8 px-2.5 py-1 text-[0.64rem] font-medium leading-none text-blue-700 transition-colors duration-300 group-hover:bg-[#dbeeff]/14 group-hover:text-[#dbeeff] group-focus-visible:bg-[#dbeeff]/14 group-focus-visible:text-[#dbeeff] sm:text-[0.68rem]"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <div className="mt-auto" />
                      )}
                    </div>
                  </div>
                </button>
              )
            })}
          </div>
        </div>
      </RevealOnScroll>

      <div className="mt-1 flex items-center justify-center gap-1.5 md:hidden">
        {Array.from({ length: itemCount }, (_, index) => (
          <span
            key={`project-dot-${index}`}
            aria-hidden="true"
            className={`h-1.5 rounded-full transition-all duration-200 ${
              index === activeProjectPage ? 'w-5 bg-blue-600' : 'w-1.5 bg-slate-300'
            }`}
            data-about-project-dot={index === activeProjectPage ? 'active' : 'inactive'}
          />
        ))}
      </div>
    </section>
  )
}

export default AboutProjectsSection
