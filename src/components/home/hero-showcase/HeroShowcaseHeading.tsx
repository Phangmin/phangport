import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { scrollToNextSection } from './utils'

type HeroShowcaseHeadingContent = {
  eyebrow: string
  title: [string, string]
  description: string
  primaryCta: string
  secondaryCta: string
}

type HeroShowcaseHeadingProps = {
  content: HeroShowcaseHeadingContent
  isDark: boolean
  mobileInsert?: ReactNode
  tones: {
    titleTone: string
    accentLabelTone: string
    subtleTextTone: string
    primaryButtonTone: string
    secondaryButtonTone: string
  }
}

function HeroShowcaseHeading({ content, isDark, mobileInsert, tones }: HeroShowcaseHeadingProps) {
  const koreanTitleSuffix = '\uC73C\uB85C \uBC14\uAFC9\uB2C8\uB2E4'
  const hasSplitKoreanTitle = content.title[1].endsWith(koreanTitleSuffix)
  const highlightedTitle = hasSplitKoreanTitle
    ? content.title[1].slice(0, -koreanTitleSuffix.length)
    : content.title[1]
  const trailingTitle = hasSplitKoreanTitle ? koreanTitleSuffix : ''
  const highlightTone = isDark ? 'text-sky-300' : 'text-[#3182f6]'

  return (
    <>
      <p
        data-home-showcase-label="true"
        className={`m-0 text-[0.78rem] font-semibold uppercase tracking-[0.26em] opacity-0 motion-safe:animate-[rise-in_0.8s_ease-out_0.06s_forwards] motion-reduce:opacity-100 ${tones.accentLabelTone}`}
      >
        {content.eyebrow}
      </p>

      <div className="grid gap-4 opacity-0 motion-safe:animate-[rise-in_0.92s_ease-out_0.14s_forwards] motion-reduce:opacity-100">
        <h1
          className={`m-0 max-w-full text-[clamp(0.9rem,2.7vw,2.4rem)] font-black leading-[1.65] tracking-[-0.065em] max-md:text-[clamp(0.94rem,4.95vw,1.9rem)] max-md:leading-[1.65] ${tones.titleTone}`}
        >
          {content.title[0]}
          <br />
          {hasSplitKoreanTitle ? (
            <span className="inline-block whitespace-nowrap">
              <span
                className={`text-[clamp(1.05rem,3.45vw,3.2rem)] font-[950] max-md:text-[clamp(1.12rem,6.35vw,2.54rem)] ${highlightTone}`}
              >
                {highlightedTitle}
              </span>
              <span className={`ml-1 ${tones.titleTone}`}>{trailingTitle}</span>
            </span>
          ) : (
            <span
              className={`inline-block whitespace-nowrap text-[clamp(1.05rem,3.45vw,3.2rem)] max-md:text-[clamp(1.12rem,6.35vw,2.54rem)] ${highlightTone}`}
            >
              {content.title[1]}
            </span>
          )}
        </h1>

        {mobileInsert}

        <p
          data-home-showcase-muted="true"
          className={`m-0 max-w-[60ch] text-[1rem] leading-[1.9] max-lg:max-w-[68ch] max-md:max-w-[34ch] max-md:text-[0.93rem] max-md:leading-[1.76] ${tones.subtleTextTone}`}
        >
          {content.description}
        </p>
      </div>

      <div className="flex flex-wrap gap-3 opacity-0 motion-safe:animate-[rise-in_1.02s_ease-out_0.34s_forwards] motion-reduce:opacity-100 max-lg:justify-center max-md:w-full max-md:flex-col">
        <button
          type="button"
          onClick={scrollToNextSection}
          className={`inline-flex items-center justify-center rounded-full px-6 py-3 font-semibold transition-transform duration-200 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300 max-md:min-h-[48px] max-md:w-full ${tones.primaryButtonTone}`}
        >
          {content.primaryCta}
        </button>
        <Link
          to="/contact"
          className={`inline-flex items-center justify-center rounded-full px-6 py-3 font-semibold no-underline transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300 max-md:min-h-[48px] max-md:w-full ${tones.secondaryButtonTone}`}
        >
          {content.secondaryCta}
        </Link>
      </div>
    </>
  )
}

export default HeroShowcaseHeading
