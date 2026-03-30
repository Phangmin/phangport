import { useEffect, useState } from 'react'
import type { ProjectGallerySlide, ProjectPageProject } from '../../content/projects'

type FeaturedProjectCarouselProps = {
  project: ProjectPageProject
}

type SlidePanelProps = {
  index: number
  project: ProjectPageProject
  slide: ProjectGallerySlide
}

function SlidePanel({ index, project, slide }: SlidePanelProps) {
  return slide.imageSrc ? (
    <img src={slide.imageSrc} alt={slide.title} className="block h-full w-full object-cover" />
  ) : (
    <div
      className="grid h-full w-full min-w-0 content-between p-4 sm:p-5"
      style={{
        background: `linear-gradient(135deg, ${project.coverGradientFrom} 0%, ${project.coverGradientTo} 100%)`,
      }}
    >
      <span
        className="inline-flex w-fit rounded-full border border-white/28 bg-white/22 px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-slate-950/72"
        data-projects-cover-chip="true"
      >
        {String(index + 1).padStart(2, '0')}
      </span>
      <div className="grid max-w-[62%] min-w-0 gap-2 text-left md:max-w-[64%]">
        <p
          className="m-0 text-[0.74rem] font-semibold uppercase tracking-[0.16em] text-slate-950/56"
          data-projects-cover-copy="true"
        >
          {project.coverLabel}
        </p>
        <h3
          className="m-0 min-w-0 break-words text-[clamp(1.2rem,2.6vw,1.72rem)] font-bold leading-[0.98] tracking-[-0.05em] text-slate-950"
          data-projects-cover-title="true"
        >
          {slide.title}
        </h3>
        <p className="m-0 min-w-0 break-words text-[0.78rem] leading-[1.55] text-slate-950/72">
          {slide.description}
        </p>
      </div>
    </div>
  )
}

function FeaturedProjectCarousel({ project }: FeaturedProjectCarouselProps) {
  const fallbackSlides: ProjectGallerySlide[] = [
    {
      id: `${project.id}-overview`,
      title: project.title,
      description: project.summary,
      ...(project.imageSrc ? { imageSrc: project.imageSrc } : {}),
    },
  ]
  const gallerySlides = project.gallery ?? []
  const coverSlide: ProjectGallerySlide | null = project.imageSrc
    ? {
        id: `${project.id}-cover`,
        title: project.title,
        description: project.summary,
        imageSrc: project.imageSrc,
      }
    : null
  const hasGallery = gallerySlides.length > 0
  const shouldPrependCover =
    Boolean(coverSlide) && hasGallery && gallerySlides[0]?.imageSrc !== coverSlide?.imageSrc
  const slides = shouldPrependCover
    ? [coverSlide as ProjectGallerySlide, ...gallerySlides]
    : hasGallery
      ? gallerySlides
      : fallbackSlides

  const [activeIndex, setActiveIndex] = useState(0)
  const [previousIndex, setPreviousIndex] = useState<number | null>(null)
  const [direction, setDirection] = useState<'next' | 'prev'>('next')
  const [isTransitionActive, setIsTransitionActive] = useState(false)

  useEffect(() => {
    if (previousIndex === null) {
      return undefined
    }

    const frame = window.requestAnimationFrame(() => {
      setIsTransitionActive(true)
    })

    const timer = window.setTimeout(() => {
      setPreviousIndex(null)
      setIsTransitionActive(false)
    }, 320)

    return () => {
      window.cancelAnimationFrame(frame)
      window.clearTimeout(timer)
    }
  }, [previousIndex])

  const activeSlide = (slides[activeIndex] ?? slides[0] ?? fallbackSlides[0]) as ProjectGallerySlide
  const previousSlide = previousIndex === null ? null : (slides[previousIndex] ?? null)
  const previousSlideIndex = previousIndex ?? 0
  const isAnimating = previousIndex !== null

  function moveTo(nextIndex: number, nextDirection: 'next' | 'prev') {
    if (isAnimating || nextIndex === activeIndex) {
      return
    }

    setPreviousIndex(activeIndex)
    setDirection(nextDirection)
    setIsTransitionActive(false)
    setActiveIndex(nextIndex)
  }

  function handlePrev() {
    moveTo((activeIndex - 1 + slides.length) % slides.length, 'prev')
  }

  function handleNext() {
    moveTo((activeIndex + 1) % slides.length, 'next')
  }

  return (
    <div className="relative min-w-0">
      <div
        className="group relative min-w-0 overflow-hidden rounded-[24px] border border-slate-900/6 bg-slate-100 aspect-[16/9]"
        data-projects-cover="true"
      >
        {previousSlide ? (
          <>
            <div
              className={`absolute inset-0 transition-transform duration-300 ease-out ${
                isTransitionActive
                  ? direction === 'next'
                    ? '-translate-x-full'
                    : 'translate-x-full'
                  : 'translate-x-0'
              }`}
            >
              <SlidePanel index={previousSlideIndex} project={project} slide={previousSlide} />
            </div>
            <div
              className={`absolute inset-0 transition-transform duration-300 ease-out ${
                isTransitionActive
                  ? 'translate-x-0'
                  : direction === 'next'
                    ? 'translate-x-full'
                    : '-translate-x-full'
              }`}
            >
              <SlidePanel index={activeIndex} project={project} slide={activeSlide} />
            </div>
          </>
        ) : (
          <SlidePanel index={activeIndex} project={project} slide={activeSlide} />
        )}

        {slides.length > 1 ? (
          <>
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous featured image"
              className="absolute left-0 top-1/2 inline-flex h-16 w-8 -translate-y-1/2 items-center justify-center rounded-r-full border border-l-0 border-white/34 bg-white/78 pr-1 text-slate-900 shadow-[0_10px_24px_rgba(15,23,42,0.14)] backdrop-blur-sm transition-[opacity,background-color] duration-200 hover:bg-white focus-visible:bg-white focus-visible:outline-none md:h-[74px] md:w-[33px] md:opacity-0 md:pointer-events-none md:group-hover:opacity-100 md:group-hover:pointer-events-auto md:group-focus-within:opacity-100 md:group-focus-within:pointer-events-auto"
              data-projects-carousel-nav="true"
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
              onClick={handleNext}
              aria-label="Next featured image"
              className="absolute right-0 top-1/2 inline-flex h-16 w-8 -translate-y-1/2 items-center justify-center rounded-l-full border border-r-0 border-white/34 bg-white/78 pl-1 text-slate-900 shadow-[0_10px_24px_rgba(15,23,42,0.14)] backdrop-blur-sm transition-[opacity,background-color] duration-200 hover:bg-white focus-visible:bg-white focus-visible:outline-none md:h-[74px] md:w-[33px] md:opacity-0 md:pointer-events-none md:group-hover:opacity-100 md:group-hover:pointer-events-auto md:group-focus-within:opacity-100 md:group-focus-within:pointer-events-auto"
              data-projects-carousel-nav="true"
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
          </>
        ) : null}
      </div>

      {slides.length > 1 ? (
        <div className="absolute -bottom-5 left-1/2 flex -translate-x-1/2 items-center gap-1.5">
          {slides.map((slide, index) => (
            <button
              key={slide.id}
              type="button"
              onClick={() => moveTo(index, index > activeIndex ? 'next' : 'prev')}
              aria-label={`Go to featured image ${index + 1}`}
              className={`h-2 rounded-full transition-all duration-200 ${
                index === activeIndex ? 'w-6 bg-slate-900/82' : 'w-2 bg-slate-300'
              }`}
              data-projects-carousel-dot={index === activeIndex ? 'active' : 'inactive'}
            />
          ))}
        </div>
      ) : null}
    </div>
  )
}

export default FeaturedProjectCarousel
