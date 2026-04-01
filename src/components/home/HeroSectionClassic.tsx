import { heroContent } from '../../content/home'
import useLanguage from '../../hooks/useLanguage'
import gwangminPicture from '../../assets/profiles/gwangmin-picture.png'
import { ScrollIndicator } from '../common'
import { Link } from 'react-router-dom'

function scrollToNextSection() {
  const root = document.getElementById('root')

  if (!root) {
    return
  }

  root.scrollBy({ top: window.innerHeight, behavior: 'smooth' })
}

function HeroSectionClassic() {
  const language = useLanguage()
  const content = heroContent[language]

  return (
    <section
      id="home"
      className="relative z-[1] grid h-screen items-center overflow-hidden bg-white snap-start snap-always"
      data-home-hero-section="true"
    >
      <div className="relative z-[1] mx-auto grid h-full w-[min(1126px,calc(100%-48px))] gap-8 px-0 pb-[72px] pt-[calc(var(--navbar-offset,104px)+16px)] text-[var(--text-h)] max-md:gap-4 max-md:pb-6 max-md:pt-[calc(var(--navbar-offset,96px)+8px)] md:w-[min(1126px,calc(100%-128px))] lg:grid-cols-[minmax(0,1.1fr)_minmax(320px,0.9fr)] lg:items-center">
        <div className="grid gap-6 max-lg:justify-items-center max-lg:text-center max-md:gap-4">
          <p data-home-accent-label="true" className="m-0 text-[0.85rem] font-bold uppercase tracking-[0.18em] text-[#0b5ed7] opacity-0 motion-safe:animate-[rise-in_0.9s_ease-out_0.08s_forwards] motion-reduce:opacity-100 max-md:text-[0.7rem] max-md:leading-5">
            {content.eyebrow}
          </p>

          <div className="grid justify-items-center opacity-0 motion-safe:animate-[rise-in_1.02s_ease-out_0.22s_forwards] motion-reduce:opacity-100 lg:hidden">
            <div className="relative inline-grid justify-items-center">
              <div
                data-home-hero-shadow="true"
                className="pointer-events-none absolute bottom-[-18px] left-1/2 z-0 h-[42px] w-[88%] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(15,23,42,0.18)_0%,rgba(15,23,42,0.08)_46%,rgba(15,23,42,0)_100%)] blur-[10px] max-md:bottom-[-12px] max-md:h-[28px]"
              />
              <div className="relative z-[1] inline-grid overflow-hidden rounded-[28px] max-md:rounded-[22px]">
                <img
                  src={gwangminPicture}
                  alt={content.portraitAlt}
                  className="block h-auto w-[min(72vw,320px)] max-w-full max-md:w-[min(52vw,208px)]"
                />
              </div>
            </div>
          </div>

          <h1 className="m-0 max-w-[820px] text-[clamp(2rem,5vw,4rem)] font-black leading-[2.16] tracking-[-0.05em] text-[var(--text-h)] opacity-0 motion-safe:animate-[rise-in_0.98s_ease-out_0.24s_forwards] motion-reduce:opacity-100 max-md:text-[clamp(1.55rem,7vw,2.3rem)] max-md:leading-[2]">
            {content.title[0]}
            <br />
            {content.title[1]}
          </h1>

          <p data-home-muted-text="true" className="m-0 max-w-[640px] text-[0.95rem] leading-[1.9] text-slate-600 opacity-0 motion-safe:animate-[rise-in_1.04s_ease-out_0.42s_forwards] motion-reduce:opacity-100 max-md:max-w-[32ch] max-md:text-[0.82rem] max-md:leading-[1.65]">
            {content.description[0]}
            <br />
            {content.description[1]}
          </p>

          <div className="flex flex-wrap gap-3 opacity-0 motion-safe:animate-[rise-in_1.04s_ease-out_0.6s_forwards] motion-reduce:opacity-100 max-lg:justify-center max-md:w-full max-md:flex-col max-md:gap-2">
            <button
              type="button"
              onClick={scrollToNextSection}
              className="inline-flex items-center justify-center rounded bg-[#0064DE] px-6 py-3 font-semibold text-white transition-colors duration-200 hover:bg-[#004BA3] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 max-md:min-h-[46px] max-md:w-full max-md:px-5 max-md:py-2.5 max-md:text-[0.9rem]"
            >
              {content.primaryCta}
            </button>
            <Link
              to="/contact"
              data-home-hero-secondary="true"
              className="inline-flex items-center justify-center rounded border border-slate-900/15 bg-white px-[18px] py-3 font-semibold text-slate-900 no-underline max-md:min-h-[46px] max-md:w-full max-md:px-5 max-md:py-2.5 max-md:text-[0.9rem]"
            >
              {content.secondaryCta}
            </Link>
          </div>
        </div>

        <div className="hidden justify-items-center opacity-0 motion-safe:animate-[rise-in_1.08s_ease-out_0.5s_forwards] motion-reduce:opacity-100 lg:grid">
          <div className="relative inline-grid justify-items-center">
            <div
              data-home-hero-shadow="true"
              className="pointer-events-none absolute bottom-[-18px] left-1/2 z-0 h-[42px] w-[88%] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(15,23,42,0.18)_0%,rgba(15,23,42,0.08)_46%,rgba(15,23,42,0)_100%)] blur-[10px]"
            />
            <div className="relative z-[1] inline-grid overflow-hidden rounded-[28px]">
              <img
                src={gwangminPicture}
                alt={content.portraitAlt}
                className="block h-auto w-[min(72vw,320px)] max-w-full"
              />
            </div>
          </div>
        </div>
      </div>

      <button
        type="button"
        aria-label={content.scrollLabel}
        onClick={scrollToNextSection}
        data-home-hero-scroll="true"
        className="absolute bottom-7 left-1/2 z-[2] -translate-x-1/2 bg-transparent p-0 text-slate-400 max-md:hidden"
      >
        <ScrollIndicator />
      </button>
    </section>
  )
}

export default HeroSectionClassic
