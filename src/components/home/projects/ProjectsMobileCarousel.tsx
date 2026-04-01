import { useRef, useState } from 'react'
import type { PointerEvent, WheelEvent } from 'react'
import type { ProjectItem } from '../../../content/home'

function wrapIndex(nextIndex: number, length: number) {
  return (nextIndex + length) % length
}

function getCircularOffset(index: number, activeIndex: number, length: number) {
  let offset = index - activeIndex
  const half = Math.floor(length / 2)

  if (offset > half) {
    offset -= length
  }

  if (offset < -half) {
    offset += length
  }

  return offset
}

type ProjectsMobileCarouselProps = {
  projects: ProjectItem[]
  sectionLabel: string
  swipeHint: string
  focusedIndex: number
  onFocusChange: (index: number) => void
}

function ProjectsMobileCarousel({
  projects,
  sectionLabel,
  swipeHint,
  focusedIndex,
  onFocusChange,
}: ProjectsMobileCarouselProps) {
  const [dragOffset, setDragOffset] = useState(0)
  const pointerStateRef = useRef<{ pointerId: number | null; startX: number }>({
    pointerId: null,
    startX: 0,
  })
  const suppressClickRef = useRef(false)
  const wheelLockRef = useRef(0)

  const isDragging = pointerStateRef.current.pointerId !== null

  function moveFocus(step: number) {
    onFocusChange(wrapIndex(focusedIndex + step, projects.length))
  }

  function handleWheel(event: WheelEvent<HTMLDivElement>) {
    const dominantDelta =
      Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : event.deltaY

    if (Math.abs(dominantDelta) < 18) {
      return
    }

    const now = Date.now()

    event.preventDefault()
    event.stopPropagation()

    if (now - wheelLockRef.current < 340) {
      return
    }

    wheelLockRef.current = now
    moveFocus(dominantDelta > 0 ? 1 : -1)
  }

  function handlePointerDown(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType === 'mouse' && event.button !== 0) {
      return
    }

    suppressClickRef.current = false
    pointerStateRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
    }

    event.preventDefault()
    event.stopPropagation()
    event.currentTarget.setPointerCapture(event.pointerId)
  }

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    if (pointerStateRef.current.pointerId !== event.pointerId) {
      return
    }

    event.preventDefault()
    event.stopPropagation()
    setDragOffset(event.clientX - pointerStateRef.current.startX)
  }

  function finishPointerGesture(pointerId: number, clientX: number) {
    if (pointerStateRef.current.pointerId !== pointerId) {
      return
    }

    const deltaX = clientX - pointerStateRef.current.startX

    if (Math.abs(deltaX) > 56) {
      suppressClickRef.current = true
      moveFocus(deltaX < 0 ? 1 : -1)
    }

    pointerStateRef.current = {
      pointerId: null,
      startX: 0,
    }
    setDragOffset(0)
  }

  return (
    <div className="relative left-1/2 grid w-[calc(100%+48px)] -translate-x-1/2 gap-3 lg:hidden lg:col-span-2">
      <div
        role="region"
        aria-label={sectionLabel}
        tabIndex={0}
        onWheel={handleWheel}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={(event) => {
          event.preventDefault()
          event.stopPropagation()
          finishPointerGesture(event.pointerId, event.clientX)
        }}
        onPointerCancel={() => {
          pointerStateRef.current = { pointerId: null, startX: 0 }
          setDragOffset(0)
        }}
        onKeyDown={(event) => {
          if (event.key === 'ArrowLeft') {
            event.preventDefault()
            moveFocus(-1)
          }

          if (event.key === 'ArrowRight') {
            event.preventDefault()
            moveFocus(1)
          }
        }}
        className="relative h-[232px] touch-none overflow-hidden overscroll-contain outline-none"
      >
        {projects.map((project, index) => {
          const offset = getCircularOffset(index, focusedIndex, projects.length)
          const distance = Math.abs(offset)
          const xShift = offset * 106
          const baseScale = offset === 0 ? 1 : 0.92
          const opacity = distance > 1 ? 0 : distance === 0 ? 1 : 0.42
          const zIndex = projects.length - distance
          const isActive = index === focusedIndex
          const coverLabel = project.coverLabel || String(index + 1).padStart(2, '0')
          const coverGradientFrom = project.coverGradientFrom || '#dbeafe'
          const coverGradientTo = project.coverGradientTo || '#60a5fa'

          return (
            <button
              key={project.title}
              type="button"
              aria-pressed={isActive}
              aria-label={`${String(index + 1).padStart(2, '0')} ${project.title}`}
              onClick={() => {
                if (suppressClickRef.current) {
                  suppressClickRef.current = false
                  return
                }

                onFocusChange(index)
              }}
              data-home-projects-mobile-card="true"
              className={`absolute left-1/2 top-0 rounded-[24px] border border-white/10 text-left shadow-none ${
                isDragging ? '' : 'transition-[transform,opacity] duration-300 ease-out'
              } ${isActive ? 'h-[214px] w-[82%] max-w-[320px] overflow-hidden bg-transparent p-0' : 'grid h-[214px] w-[68%] max-w-[272px] bg-white/95 p-5'}`}
              style={{
                zIndex,
                opacity,
                transform: `translate3d(calc(-50% + ${xShift}% + ${dragOffset}px), 0, 0) scale(${baseScale})`,
              }}
            >
              {isActive ? (
                <div data-home-projects-card-cover="true" className="absolute inset-0 overflow-hidden">
                  {project.imageSrc ? (
                    <img src={project.imageSrc} alt={project.title} className="block h-full w-full object-cover" />
                  ) : (
                    <div
                      className="relative h-full w-full"
                      style={{
                        background: `linear-gradient(135deg, ${coverGradientFrom} 0%, ${coverGradientTo} 100%)`,
                      }}
                    >
                      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.32),transparent_42%)]" />
                      <div className="pointer-events-none absolute bottom-4 right-4 h-14 w-14 rounded-full border border-white/22 bg-white/10" />
                      <div className="pointer-events-none absolute left-4 top-4 inline-flex rounded-full border border-white/28 bg-white/22 px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-slate-950/72">
                        {coverLabel}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <span data-home-projects-card-badge="true" className="inline-flex h-[30px] w-[30px] items-center justify-center rounded-full bg-blue-50 text-[0.74rem] font-bold text-blue-600">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <div className="mt-3 grid gap-2">
                    <strong data-home-projects-card-title="true" className="text-[1rem] leading-[1.2] text-slate-900">{project.title}</strong>
                    <span data-home-projects-card-description="true" className="text-[0.86rem] leading-[1.65] text-slate-500">
                      {project.description}
                    </span>
                  </div>
                </>
              )}
            </button>
          )
        })}
      </div>

      <p data-home-projects-hint="true" className="m-0 text-center text-[0.72rem] font-medium tracking-[0.02em] text-slate-300/72">
        {swipeHint}
      </p>

      <div className="flex items-center justify-center gap-2">
        {projects.map((project, index) => (
          <button
            key={project.title}
            type="button"
            aria-label={`Select ${project.title}`}
            onClick={() => onFocusChange(index)}
            data-home-projects-dot={index === focusedIndex ? 'active' : 'inactive'}
            className={`h-2.5 rounded-full transition-all duration-200 ${
              index === focusedIndex ? 'w-7 bg-blue-300' : 'w-2.5 bg-white/28'
            }`}
          />
        ))}
      </div>
    </div>
  )
}

export default ProjectsMobileCarousel
