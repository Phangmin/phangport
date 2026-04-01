import notionPortfolioImage from '../assets/portfolios/notion-portfolio-image.png'
import { Footer, RevealOnScroll } from '../components/common'
import { portfolioPageCopyByLanguage } from '../content/portfolio'
import useLanguage from '../hooks/useLanguage'

const PORTFOLIO_PDF_PATH = '/portfolio.pdf'
const NOTION_PORTFOLIO_URL = 'https://phangmin.notion.site/'

function PortfolioPage() {
  const language = useLanguage()
  const copy = portfolioPageCopyByLanguage[language]

  return (
    <main className="min-h-screen text-left text-[var(--text-h)] [--navbar-offset:104px] max-md:[--navbar-offset:96px]">
      <section className="mx-auto grid w-[min(1126px,calc(100%-24px))] gap-7 pb-[72px] pt-[calc(var(--navbar-offset)+20px)] md:w-[min(1126px,calc(100%-128px))] md:gap-9 md:pt-[calc(var(--navbar-offset)+28px)]">
        <RevealOnScroll className="grid gap-4 max-md:px-4 md:gap-5">
          <p className="m-0 text-[0.76rem] font-bold uppercase tracking-[0.2em] text-blue-600">
            {copy.eyebrow}
          </p>
          <p
            className="m-0 text-[0.92rem] leading-[1.78] text-slate-600 md:text-[1rem] md:leading-[1.9]"
            data-portfolio-muted="true"
          >
            {copy.description}
          </p>
        </RevealOnScroll>

        <div className="grid gap-4 xl:grid-cols-2 xl:items-stretch">
          <RevealOnScroll
            as="article"
            className="flex h-full flex-col gap-5 overflow-hidden rounded-[30px] border border-slate-900/8 bg-white/95 p-4 shadow-[0_28px_68px_rgba(15,23,42,0.08)] md:rounded-[34px] md:p-6"
            data-portfolio-surface="featured"
          >
            <div className="grid gap-2">
              <p
                className="m-0 text-[0.72rem] font-bold uppercase tracking-[0.18em] text-blue-600"
                data-portfolio-accent="true"
              >
                {copy.featuredLabel}
              </p>
              <div className="grid gap-2">
                <h2 className="m-0 text-[clamp(1.55rem,4.4vw,2.4rem)] font-bold leading-[0.98] tracking-[-0.05em] text-[var(--text-h)]">
                  {copy.featuredTitle}
                </h2>
                <p className="m-0 text-[0.92rem] leading-[1.78] text-slate-600" data-portfolio-muted="true">
                  {copy.featuredDescription}
                </p>
              </div>
            </div>

            <div
              className="overflow-hidden rounded-xl border border-slate-900/8 bg-slate-100 aspect-[16/9]"
              data-portfolio-preview="true"
            >
              <img
                src={notionPortfolioImage}
                alt="Notion portfolio preview"
                className="block h-full w-full object-cover object-top"
              />
            </div>

            <div className="mt-auto flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <p className="m-0 text-[0.82rem] font-medium text-slate-500 md:text-[0.88rem]" data-portfolio-muted="true">
                {copy.featuredMeta}
              </p>
              <a
                href={NOTION_PORTFOLIO_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-11 items-center justify-center rounded-full bg-blue-600 px-5 py-3 text-[0.86rem] font-semibold text-white no-underline transition-colors duration-200 hover:bg-blue-700 focus-visible:bg-blue-700 focus-visible:outline-none"
                data-portfolio-cta="primary"
              >
                {copy.featuredCta}
              </a>
            </div>
          </RevealOnScroll>

          <RevealOnScroll
            as="article"
            delay={0.08}
            className="flex h-full flex-col gap-5 overflow-hidden rounded-[30px] border border-slate-900/8 bg-white/95 p-4 shadow-[0_24px_58px_rgba(15,23,42,0.07)] md:rounded-[34px] md:p-6"
            data-portfolio-surface="secondary"
          >
            <div className="grid gap-2">
              <p
                className="m-0 text-[0.72rem] font-bold uppercase tracking-[0.18em] text-blue-600"
                data-portfolio-accent="true"
              >
                {copy.pdfLabel}
              </p>
              <div className="grid gap-2">
                <h2 className="m-0 text-[1.36rem] font-bold leading-[1.02] tracking-[-0.04em] text-[var(--text-h)] md:text-[1.6rem]">
                  {copy.pdfTitle}
                </h2>
                <p className="m-0 text-[0.9rem] leading-[1.78] text-slate-600" data-portfolio-muted="true">
                  {copy.pdfDescription}
                </p>
              </div>
            </div>

            <div
              className="grid aspect-[16/9] place-items-center rounded-[22px] border border-dashed border-slate-900/12 bg-[linear-gradient(180deg,#ffffff_0%,#f1f6ff_100%)] p-5 text-center"
              data-portfolio-placeholder="true"
            >
              <div className="grid gap-2">
                <div className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-full border border-blue-600/14 bg-blue-600/8 text-blue-700">
                  <svg viewBox="0 0 24 24" aria-hidden="true" className="h-6 w-6" fill="none">
                    <path
                      d="M12 4.5v10m0 0 4-4m-4 4-4-4M5 18.5h14"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <p className="m-0 text-[0.82rem] font-semibold text-slate-700" data-portfolio-meta="true">
                  {copy.pdfPreviewLabel}
                </p>
              </div>
            </div>

            <div className="mt-auto flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <p className="m-0 text-[0.82rem] font-medium text-slate-500 md:text-[0.88rem]" data-portfolio-muted="true">
                {copy.pdfMeta}
              </p>
              <a
                href={PORTFOLIO_PDF_PATH}
                download
                className="inline-flex min-h-11 items-center justify-center rounded-full border border-slate-900/10 bg-white/82 px-5 py-3 text-[0.86rem] font-semibold text-slate-800 no-underline transition-colors duration-200 hover:border-blue-600/20 hover:text-blue-700 focus-visible:border-blue-600/20 focus-visible:text-blue-700 focus-visible:outline-none"
                data-portfolio-cta="secondary"
              >
                {copy.pdfCta}
              </a>
            </div>
          </RevealOnScroll>
        </div>
      </section>
      <Footer />
    </main>
  )
}

export default PortfolioPage
