import gwangminPicture from '../../assets/profiles/gwangmin-picture.png'
import { ScrollIndicator } from '../common'

function scrollToNextSection() {
  const root = document.getElementById('root')

  if (!root) {
    return
  }

  root.scrollBy({ top: window.innerHeight, behavior: 'smooth' })
}

function HeroSection() {
  return (
    <section
      id="home"
      className="relative z-[1] grid h-screen items-center overflow-hidden bg-white snap-start snap-always"
    >
      <div className="relative z-[1] mx-auto grid h-full w-[min(1126px,calc(100%-48px))] gap-8 px-0 pb-[72px] pt-[calc(var(--navbar-offset,104px)+16px)] text-slate-900 md:w-[min(1126px,calc(100%-128px))] lg:grid-cols-[minmax(0,1.1fr)_minmax(320px,0.9fr)] lg:items-center">
        <div className="grid gap-6 max-lg:justify-items-center max-lg:text-center">
          <p className="m-0 text-[0.85rem] font-bold uppercase tracking-[0.18em] text-[#0b5ed7] opacity-0 motion-safe:animate-[rise-in_0.9s_ease-out_0.08s_forwards] motion-reduce:opacity-100">
            보이지 않는 비효율을 찾아 서비스의 가치를 만듭니다
          </p>

          <div className="grid justify-items-center opacity-0 motion-safe:animate-[rise-in_1.02s_ease-out_0.22s_forwards] motion-reduce:opacity-100 lg:hidden">
            <div className="relative inline-grid justify-items-center">
              <div className="pointer-events-none absolute bottom-[-18px] left-1/2 z-0 h-[42px] w-[88%] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(15,23,42,0.18)_0%,rgba(15,23,42,0.08)_46%,rgba(15,23,42,0)_100%)] blur-[10px]" />
              <div className="relative z-[1] inline-grid overflow-hidden rounded-[28px]">
                <img
                  src={gwangminPicture}
                  alt="Portrait of Gwangmin"
                  className="block h-auto w-[min(72vw,320px)] max-w-full"
                />
              </div>
            </div>
          </div>

          <h1 className="m-0 max-w-[820px] text-[clamp(3rem,8vw,6rem)] leading-[0.95] tracking-[-0.05em] text-[var(--text-h)] opacity-0 motion-safe:animate-[rise-in_0.98s_ease-out_0.24s_forwards] motion-reduce:opacity-100">
            Gwangmin&apos;s
            <br />
            Workspace
          </h1>

          <p className="m-0 max-w-[640px] text-[0.95rem] leading-[1.9] text-slate-600 opacity-0 motion-safe:animate-[rise-in_1.04s_ease-out_0.42s_forwards] motion-reduce:opacity-100">
            복잡한 과정을 단순한 화면 구조로 개선하고, 서비스 기획과 개발을 연결하는
            프론트엔드를 지향합니다.
            <br />
            단순한 기능 추가를 넘어서 현장의 문제를 근본적으로 해결하는 직관적인 경험을
            만드는 데 집중합니다.
          </p>

          <div className="flex flex-wrap gap-3 opacity-0 motion-safe:animate-[rise-in_1.04s_ease-out_0.6s_forwards] motion-reduce:opacity-100 max-lg:justify-center">
            <button
              type="button"
              onClick={scrollToNextSection}
              className="inline-flex items-center justify-center rounded px-6 py-3 font-semibold text-white transition-colors duration-200 hover:bg-[#004BA3] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 bg-[#0064DE]"
            >
              View Projects
            </button>
            <a
              href="mailto:hello@phangport.dev"
              className="inline-flex items-center justify-center rounded border border-slate-900/15 bg-white px-[18px] py-3 font-semibold text-slate-900 no-underline"
            >
              Start a Conversation
            </a>
          </div>
        </div>

        <div className="hidden justify-items-center opacity-0 motion-safe:animate-[rise-in_1.08s_ease-out_0.5s_forwards] motion-reduce:opacity-100 lg:grid">
          <div className="relative inline-grid justify-items-center">
            <div className="pointer-events-none absolute bottom-[-18px] left-1/2 z-0 h-[42px] w-[88%] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(15,23,42,0.18)_0%,rgba(15,23,42,0.08)_46%,rgba(15,23,42,0)_100%)] blur-[10px]" />
            <div className="relative z-[1] inline-grid overflow-hidden rounded-[28px]">
              <img
                src={gwangminPicture}
                alt="Portrait of Gwangmin"
                className="block h-auto w-[min(72vw,320px)] max-w-full"
              />
            </div>
          </div>
        </div>
      </div>

      <button
        type="button"
        aria-label="Scroll to next section"
        onClick={scrollToNextSection}
        className="absolute bottom-7 left-1/2 z-[2] -translate-x-1/2 bg-transparent p-0 text-slate-400"
      >
        <ScrollIndicator />
      </button>
    </section>
  )
}

export default HeroSection
