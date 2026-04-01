import { useEffect, useRef, useState, type CSSProperties } from 'react'
import type { ProjectItem } from '../../../content/home'

const DESKTOP_ARC_LAYOUT = {
  centerX: 19,
  centerY: 50,
  radiusX: 46,
  radiusY: 48,
  activeOffsetX: 8,
} as const

const ROTATION_DURATION_MS = 460

function getDesktopArcSlotOrder(length: number, focusedIndex: number) {
  const middleSlot = Math.floor(length / 2)

  return Array.from({ length }, (_, slotIndex) => {
    const projectIndex = (focusedIndex - middleSlot + slotIndex + length) % length

    return { projectIndex, slotIndex }
  })
}

function wrapIndex(index: number, length: number) {
  if (length === 0) {
    return 0
  }

  return (index % length + length) % length
}

function getCircularStepDelta(fromIndex: number, toIndex: number, length: number) {
  if (length <= 1) {
    return 0
  }

  const forward = wrapIndex(toIndex - fromIndex, length)
  const backward = forward - length

  return Math.abs(backward) < Math.abs(forward) ? backward : forward
}

function getEdgeFade(slotPosition: number, length: number) {
  if (slotPosition < 0) {
    return Math.max(0, 1 + slotPosition)
  }

  if (slotPosition > length - 1) {
    return Math.max(0, length - slotPosition)
  }

  return 1
}

function getWrappedSlotPositions(slotPosition: number, length: number) {
  return [slotPosition, slotPosition - length, slotPosition + length]
}

function getInactiveCardOpacity(slotPosition: number, length: number, isActive: boolean) {
  if (isActive) {
    return 1
  }

  const activeSlot = Math.floor(length / 2)
  const maxDistance = Math.max(activeSlot, length - 1 - activeSlot, 1)
  const distanceFromActive = Math.min(Math.abs(slotPosition - activeSlot), maxDistance)
  const proximity = 1 - distanceFromActive / maxDistance

  return 0.3 + proximity * 0.42
}

function getExpandedSlotAnchors(length: number) {
  const activeSlot = Math.floor(length / 2)
  const anchors = Array.from({ length }, (_, index) => index)
  const firstGap = 1.55
  const secondGap = 1.24
  const outerGap = 1.18

  anchors[activeSlot] = activeSlot

  for (let index = activeSlot - 1; index >= 0; index -= 1) {
    const distanceFromActive = activeSlot - index
    const gap =
      distanceFromActive === 1 ? firstGap : distanceFromActive === 2 ? secondGap : outerGap
    const nextAnchor = anchors[index + 1]

    if (nextAnchor === undefined) {
      continue
    }

    anchors[index] = nextAnchor - gap
  }

  for (let index = activeSlot + 1; index < length; index += 1) {
    const distanceFromActive = index - activeSlot
    const gap =
      distanceFromActive === 1 ? firstGap : distanceFromActive === 2 ? secondGap : outerGap
    const previousAnchor = anchors[index - 1]

    if (previousAnchor === undefined) {
      continue
    }

    anchors[index] = previousAnchor + gap
  }

  return anchors
}

function getExpandedSlotPosition(slotPosition: number, length: number, isActive: boolean) {
  if (isActive || length <= 2 || slotPosition < 0 || slotPosition > length - 1) {
    return slotPosition
  }

  const anchors = getExpandedSlotAnchors(length)
  const lowerIndex = Math.floor(slotPosition)
  const upperIndex = Math.ceil(slotPosition)

  if (lowerIndex === upperIndex) {
    return anchors[lowerIndex] ?? slotPosition
  }

  const lowerAnchor = anchors[lowerIndex]
  const upperAnchor = anchors[upperIndex]

  if (lowerAnchor === undefined || upperAnchor === undefined) {
    return slotPosition
  }

  const progress = slotPosition - lowerIndex

  return lowerAnchor + (upperAnchor - lowerAnchor) * progress
}

function getDesktopArcCardStyle(slotPosition: number, length: number, isActive: boolean): CSSProperties {
  const safeLength = Math.max(length, 2)
  const progress = safeLength === 1 ? 0.5 : slotPosition / (safeLength - 1)
  const angle = -72 + progress * 144
  const angleInRadians = (angle * Math.PI) / 180
  const { centerX, centerY, radiusX, radiusY, activeOffsetX } = DESKTOP_ARC_LAYOUT
  const originalDx = Math.sin(angleInRadians) * radiusX
  const originalDy = -Math.cos(angleInRadians) * radiusY
  const left = centerX - originalDy + (isActive ? activeOffsetX : 0)
  const top = centerY + originalDx
  const scale = isActive ? 1.14 : 0.95
  const rotation = isActive ? 0 : (angle + 90) * 0.2

  return {
    left: `${left}%`,
    top: `${top}%`,
    transform: `translate(-50%, -50%) scale(${scale}) rotate(${rotation}deg)`,
    zIndex: isActive ? 30 : Math.round(10 + (1 - Math.abs(progress - 0.5)) * 10),
  }
}

type ProjectsDesktopArcProps = {
  projects: ProjectItem[]
  focusedIndex: number
  onFocusChange: (index: number) => void
}

function ProjectsDesktopArc({
  projects,
  focusedIndex,
  onFocusChange,
}: ProjectsDesktopArcProps) {
  const [displayFocusedIndex, setDisplayFocusedIndex] = useState(focusedIndex)
  const [stepProgress, setStepProgress] = useState(0)
  const [stepDirection, setStepDirection] = useState(0)
  const animationFrameRef = useRef<number | null>(null)

  useEffect(() => {
    setDisplayFocusedIndex((current) => {
      if (projects.length === 0) {
        return 0
      }

      return wrapIndex(current, projects.length)
    })
  }, [projects.length])

  useEffect(() => {
    if (projects.length <= 1) {
      setDisplayFocusedIndex(focusedIndex)
      setStepDirection(0)
      setStepProgress(0)
      return
    }

    if (stepDirection !== 0) {
      return
    }

    const delta = getCircularStepDelta(displayFocusedIndex, focusedIndex, projects.length)

    if (delta === 0) {
      return
    }

    setStepDirection(delta > 0 ? 1 : -1)
    setStepProgress(0)
  }, [displayFocusedIndex, focusedIndex, projects.length, stepDirection])

  useEffect(() => {
    if (stepDirection === 0 || projects.length <= 1) {
      return
    }

    let startTime: number | null = null

    const tick = (timestamp: number) => {
      if (startTime === null) {
        startTime = timestamp
      }

      const elapsed = timestamp - startTime
      const linearProgress = Math.min(elapsed / ROTATION_DURATION_MS, 1)
      const easedProgress = 1 - Math.pow(1 - linearProgress, 3)

      setStepProgress(easedProgress)

      if (linearProgress < 1) {
        animationFrameRef.current = requestAnimationFrame(tick)
        return
      }

      setDisplayFocusedIndex((current) => wrapIndex(current + stepDirection, projects.length))
      setStepDirection(0)
      setStepProgress(0)
      animationFrameRef.current = null
    }

    animationFrameRef.current = requestAnimationFrame(tick)

    return () => {
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current)
        animationFrameRef.current = null
      }
    }
  }, [projects.length, stepDirection])

  const slotAssignments = getDesktopArcSlotOrder(projects.length, displayFocusedIndex)
  const stepTargetIndex =
    stepDirection === 0 ? displayFocusedIndex : wrapIndex(displayFocusedIndex + stepDirection, projects.length)

  return (
    <div className="relative hidden min-h-[clamp(560px,58vw,660px)] lg:block">
      <div className="absolute inset-y-0 left-0 right-[144px]">
        <div className="pointer-events-none absolute inset-x-[2%] bottom-[5%] h-[500px] rounded-[999px] border border-white/8 opacity-40 [mask-image:linear-gradient(to_top,black_56%,transparent_100%)]" />
        {slotAssignments.map(({ projectIndex, slotIndex }) => {
          const project = projects[projectIndex]

          if (!project) {
            return null
          }

          const slotPosition = slotIndex - stepDirection * stepProgress
          const isActive = projectIndex === stepTargetIndex
          const wrappedPositions = getWrappedSlotPositions(slotPosition, projects.length)

          return wrappedPositions.map((position, duplicateIndex) => {
            const edgeFade = getEdgeFade(position, projects.length)
            const isGhost = duplicateIndex > 0
            const baseOpacity = getInactiveCardOpacity(position, projects.length, isActive)
            const visualPosition = getExpandedSlotPosition(position, projects.length, isActive)
            const coverLabel = project.coverLabel || String(projectIndex + 1).padStart(2, '0')
            const coverGradientFrom = project.coverGradientFrom || '#dbeafe'
            const coverGradientTo = project.coverGradientTo || '#60a5fa'

            return (
              <button
                key={`${project.title}-${duplicateIndex}`}
                type="button"
                aria-hidden={isGhost}
                aria-pressed={isGhost ? undefined : isActive}
                tabIndex={isGhost ? -1 : 0}
                onClick={isGhost ? undefined : () => onFocusChange(projectIndex)}
                data-home-projects-arc-card="true"
                className={`group absolute rounded-[24px] border border-white/30 text-left shadow-[0_24px_56px_rgba(2,6,23,0.24)] transition-[box-shadow,background-color,opacity,border-color] ${
                  isGhost ? 'duration-500 ease-out' : 'duration-500 ease-out'
                } hover:shadow-[0_28px_62px_rgba(2,6,23,0.3)] ${
                  isActive
                    ? 'relative aspect-[16/9] w-[clamp(320px,30vw,408px)] overflow-hidden p-0'
                    : 'grid aspect-[16/9] w-[clamp(216px,19vw,264px)] content-start gap-[10px] p-4'
                } ${
                  isActive ? 'bg-white/95 opacity-100 ring-2 ring-blue-500/40' : 'bg-white/72 opacity-58'
                }`}
                style={{
                  ...getDesktopArcCardStyle(visualPosition, projects.length, isActive),
                  opacity: edgeFade * baseOpacity,
                  pointerEvents: isGhost || edgeFade < 0.08 ? 'none' : 'auto',
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
                    <span data-home-projects-card-badge="true" className="relative z-[1] inline-flex h-[30px] w-[30px] items-center justify-center rounded-full bg-blue-50 text-[0.74rem] font-bold text-blue-600 transition-opacity duration-200 group-hover:opacity-0 group-focus-visible:opacity-0">
                      {String(projectIndex + 1).padStart(2, '0')}
                    </span>
                    <div className="relative z-[1] grid gap-2 transition-opacity duration-200 group-hover:opacity-0 group-focus-visible:opacity-0">
                      <strong data-home-projects-card-title="true" className="text-[0.92rem] leading-[1.2] text-slate-900">{project.title}</strong>
                      <span data-home-projects-card-description="true" className="max-h-[3.9rem] overflow-hidden text-[0.78rem] leading-[1.6] text-slate-500">
                        {project.description}
                      </span>
                    </div>

                    <div
                      data-home-projects-card-cover="true"
                      className="pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit] opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100"
                    >
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
                  </>
                )}
              </button>
            )
          })
        })}
      </div>
    </div>
  )
}

export default ProjectsDesktopArc
