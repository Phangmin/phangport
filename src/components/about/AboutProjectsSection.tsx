// @ts-nocheck
import { useEffect, useRef, useState } from 'react'
import { RevealOnScroll } from '../common'

function AboutProjectsSection(props) {
  const { items } = props
  const trackRef = useRef(null)
  const pauseRef = useRef(false)
  const intervalRef = useRef(0)
  const isAnimatingRef = useRef(false)
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
      return 236
    }

    const firstCard = trackNode.querySelector('[data-project-card="true"]')
    const computedStyle = window.getComputedStyle(trackNode)
    const gap = Number.parseFloat(computedStyle.columnGap || computedStyle.gap || '0') || 0

    if (!(firstCard instanceof HTMLElement)) {
      return 236 + gap
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

  return (
    <section className="grid px-1 py-2">
      <RevealOnScroll delay={0.1} className="flex flex-wrap items-end justify-between gap-3">
        <div className="grid gap-2 text-left">
          <h2 className="m-0 text-[1.32rem] font-bold text-[var(--text-h)]">프로젝트</h2>
          <p className="m-0 text-xs leading-6 text-slate-500">
            각 프로젝트 카드를 클릭하면 상세한 내용을 볼 수 있습니다.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label="Scroll projects left"
            onClick={handlePrev}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-900/10 bg-white/80 text-slate-700 transition-colors duration-200 hover:border-blue-600/30 hover:text-blue-700 focus-visible:border-blue-600/30 focus-visible:text-blue-700 focus-visible:outline-none"
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
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-900/10 bg-white/80 text-slate-700 transition-colors duration-200 hover:border-blue-600/30 hover:text-blue-700 focus-visible:border-blue-600/30 focus-visible:text-blue-700 focus-visible:outline-none"
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
        className="mt-1"
        onMouseEnter={() => {
          pauseRef.current = true
        }}
        onMouseLeave={() => {
          pauseRef.current = false
        }}
      >
        <div className="-mx-4 overflow-x-hidden overflow-y-visible px-4 py-4">
          <div
            ref={trackRef}
            onTransitionEnd={handleTransitionEnd}
            style={{
              transform: `translateX(${offsetPx}px)`,
              transition: transitionEnabled ? 'transform 560ms ease' : 'none',
            }}
            className="flex gap-4"
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
                  className="group min-h-[320px] min-w-[85%] max-w-[85%] text-left focus-visible:outline-none sm:min-w-[calc((100%-1rem)/2)] sm:max-w-[calc((100%-1rem)/2)] lg:min-w-[calc((100%-2rem)/3)] lg:max-w-[calc((100%-2rem)/3)] xl:min-w-[calc((100%-3rem)/4)] xl:max-w-[calc((100%-3rem)/4)]"
                >
                  <div className="relative flex min-h-[320px] h-full flex-col overflow-hidden rounded-[26px] border border-slate-900/5 bg-[linear-gradient(180deg,#ffffff_0%,#f8fbff_58%,#eef6ff_100%)] p-5 text-slate-950 transition-[transform,background,border-color] duration-300 group-hover:-translate-y-1 group-hover:border-white/12 group-hover:bg-[linear-gradient(135deg,#0e2f9a_0%,#1f66ff_52%,#4da4ff_100%)] group-focus-visible:-translate-y-1 group-focus-visible:border-white/12 group-focus-visible:bg-[linear-gradient(135deg,#0e2f9a_0%,#1f66ff_52%,#4da4ff_100%)]">
                    <div className="pointer-events-none absolute right-[-34px] top-[-26px] h-28 w-28 rounded-full bg-blue-300/40 blur-3xl transition-colors duration-300 group-hover:bg-[#78bdff]/46 group-focus-visible:bg-[#78bdff]/46" />
                    <div className="pointer-events-none absolute bottom-[-30px] left-[-24px] h-24 w-24 rounded-full bg-sky-200/70 blur-3xl transition-colors duration-300 group-hover:bg-[#2f74ff]/34 group-focus-visible:bg-[#2f74ff]/34" />

                    <div className="flex flex-col">
                      <div className="grid gap-3">
                        <div
                          className={`aspect-video w-full overflow-hidden rounded-[18px] transition-colors duration-300 ${
                            projectImage
                              ? 'bg-slate-100'
                              : 'bg-[linear-gradient(180deg,rgba(255,255,255,0.96)_0%,rgba(219,234,254,0.92)_100%)] group-hover:bg-[linear-gradient(180deg,rgba(255,255,255,0.18)_0%,rgba(77,164,255,0.22)_100%)] group-focus-visible:bg-[linear-gradient(180deg,rgba(255,255,255,0.18)_0%,rgba(77,164,255,0.22)_100%)]'
                          }`}
                        >
                          {projectImage ? (
                            <img src={projectImage} alt={item.title} className="h-full w-full object-cover" />
                          ) : (
                            <div className="flex h-full w-full items-end justify-between bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.42),transparent_42%)] p-4">
                              <span className="text-[0.7rem] uppercase tracking-[0.14em] text-slate-500 transition-colors duration-300 group-hover:text-[#dbeeff]/80 group-focus-visible:text-[#dbeeff]/80">
                                Project Image
                              </span>
                              <div className="h-12 w-12 rounded-full bg-blue-600/12 transition-colors duration-300 group-hover:bg-[#dbeeff]/14 group-focus-visible:bg-[#dbeeff]/14" />
                            </div>
                          )}
                        </div>

                        <div className="grid gap-1">
                          <h3 className="m-0 text-[1.1rem] font-semibold leading-[1.2] text-slate-950 transition-colors duration-300 group-hover:text-white group-focus-visible:text-white">
                            {item.title}
                          </h3>

                          <div className="grid gap-1">
                            <p className="m-0 text-xs leading-[1.7] text-slate-700 transition-colors duration-300 group-hover:text-[#ebf5ff]/88 group-focus-visible:text-[#ebf5ff]/88">
                              <strong>|</strong> {item.period}
                            </p>
                            <p className="m-0 text-xs leading-[1.7] text-slate-700 transition-colors duration-300 group-hover:text-[#ebf5ff]/88 group-focus-visible:text-[#ebf5ff]/88">
                              <strong>|</strong> {item.role}
                            </p>
                          </div>

                          <p className="m-0 min-h-[4.8rem] text-xs leading-[1.7] text-slate-700 transition-colors duration-300 group-hover:text-[#ebf5ff]/88 group-focus-visible:text-[#ebf5ff]/88">
                            {item.description}
                          </p>
                        </div>
                      </div>

                      {skillItems.length > 0 ? (
                        <div className="flex flex-wrap gap-2">
                          {skillItems.map((skill) => (
                            <span
                              key={`${item.title}-${skill}`}
                              className="inline-flex items-center justify-center rounded-full bg-blue-600/8 px-2.5 py-1 text-[0.68rem] font-medium leading-none text-blue-700 transition-colors duration-300 group-hover:bg-[#dbeeff]/14 group-hover:text-[#dbeeff] group-focus-visible:bg-[#dbeeff]/14 group-focus-visible:text-[#dbeeff]"
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
    </section>
  )
}

export default AboutProjectsSection
