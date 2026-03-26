import { Footer } from '../components/common'

const PORTFOLIO_PDF_PATH = '/portfolio.pdf'
const NOTION_PORTFOLIO_URL = 'https://phangmin.notion.site/'

function PortfolioPage() {
  return (
    <main
      className="min-h-screen text-left text-[var(--text-h)] [--navbar-offset:104px] max-md:[--navbar-offset:132px]"
      style={{
        background:
          'radial-gradient(circle at top left, rgba(37, 99, 235, 0.10), transparent 30%), linear-gradient(180deg, #ffffff 0%, #f8fbff 100%)',
      }}
    >
      <section className="mx-auto grid min-h-screen w-[min(1126px,calc(100%-48px))] content-center gap-8 px-0 pb-[72px] pt-[calc(var(--navbar-offset)+24px)] md:w-[min(1126px,calc(100%-128px))]">
        <div className="grid gap-4 text-center">
          <p className="m-0 text-[0.8rem] font-bold uppercase tracking-[0.18em] text-blue-600">
            Portfolio
          </p>
          <h1 className="m-0 text-[clamp(2.5rem,6vw,4.4rem)] font-semibold leading-[0.95] tracking-[-0.04em] text-[var(--text-h)]">
            포트폴리오를
            <br />
            원하는 방식으로 확인하세요.
          </h1>
          <p className="mx-auto m-0 max-w-[620px] text-sm leading-7 text-slate-600">
            PDF로 바로 내려받거나, Notion 페이지에서 더 자세한 포트폴리오 내용을 확인할 수
            있습니다.
          </p>
        </div>

        <div className="mx-auto grid w-full max-w-[760px] gap-4 md:grid-cols-2">
          <a
            href={PORTFOLIO_PDF_PATH}
            download
            className="group grid gap-4 rounded-[28px] border border-slate-900/8 bg-white/95 p-7 text-left no-underline shadow-[0_22px_54px_rgba(15,23,42,0.07)] transition-[transform,border-color,box-shadow] duration-200 hover:-translate-y-1 hover:border-blue-600/28 hover:shadow-[0_24px_56px_rgba(37,99,235,0.12)] focus-visible:-translate-y-1 focus-visible:border-blue-600/28 focus-visible:shadow-[0_24px_56px_rgba(37,99,235,0.12)] focus-visible:outline-none"
          >
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-blue-600/16 bg-blue-600/8 text-blue-700">
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
            <div className="grid gap-2">
              <h2 className="m-0 text-[1.28rem] font-bold text-[var(--text-h)]">PDF 다운로드</h2>
              <p className="m-0 text-sm leading-7 text-slate-600">
                포트폴리오 PDF 파일을 바로 내려받아 오프라인으로 확인할 수 있습니다.
              </p>
            </div>
            <span className="text-sm font-semibold text-blue-700">Download PDF</span>
          </a>

          <a
            href={NOTION_PORTFOLIO_URL}
            target="_blank"
            rel="noreferrer"
            className="group grid gap-4 rounded-[28px] border border-slate-900/8 bg-white/95 p-7 text-left no-underline shadow-[0_22px_54px_rgba(15,23,42,0.07)] transition-[transform,border-color,box-shadow] duration-200 hover:-translate-y-1 hover:border-blue-600/28 hover:shadow-[0_24px_56px_rgba(37,99,235,0.12)] focus-visible:-translate-y-1 focus-visible:border-blue-600/28 focus-visible:shadow-[0_24px_56px_rgba(37,99,235,0.12)] focus-visible:outline-none"
          >
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-blue-600/16 bg-blue-600/8 text-blue-700">
              <svg viewBox="0 0 24 24" aria-hidden="true" className="h-6 w-6" fill="none">
                <path
                  d="M14.5 5.5h4v4m-8 9h-5a1 1 0 0 1-1-1v-11a1 1 0 0 1 1-1h5m4 0h-3m3 0-8 8"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div className="grid gap-2">
              <h2 className="m-0 text-[1.28rem] font-bold text-[var(--text-h)]">Notion 바로가기</h2>
              <p className="m-0 text-sm leading-7 text-slate-600">
                Notion 포트폴리오 페이지에서 프로젝트와 작업 내용을 더 자세히 확인할 수
                있습니다.
              </p>
            </div>
            <span className="text-sm font-semibold text-blue-700">Open Notion</span>
          </a>
        </div>
      </section>
      <Footer />
    </main>
  )
}

export default PortfolioPage
