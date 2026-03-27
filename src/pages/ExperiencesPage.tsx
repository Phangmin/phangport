import { Footer, RevealOnScroll } from '../components/common'
import { experiencesPageContentByLanguage } from '../content/experiences'
import useLanguage from '../hooks/useLanguage'

function ExperiencesPage() {
  const language = useLanguage()
  const content = experiencesPageContentByLanguage[language]

  return (
    <main
      className="min-h-screen text-left text-[var(--text-h)] [--navbar-offset:104px] max-md:[--navbar-offset:96px]"
      style={{
        background:
          'radial-gradient(circle at top left, rgba(37, 99, 235, 0.08), transparent 32%), linear-gradient(180deg, #ffffff 0%, #f8fbff 100%)',
      }}
    >
      <section className="mx-auto box-border grid w-[min(1126px,calc(100%-24px))] min-w-0 gap-7 px-4 pb-[72px] pt-[calc(var(--navbar-offset)+24px)] md:w-[min(1126px,calc(100%-128px))] md:px-0 md:gap-9 md:pt-[calc(var(--navbar-offset)+36px)]">
        <RevealOnScroll className="grid gap-4">
          <div className="relative grid gap-6 md:gap-8">
            <div
              className="pointer-events-none absolute bottom-2 left-[13px] top-2 w-px bg-slate-200 md:left-1/2 md:-translate-x-1/2"
              data-experiences-line="true"
            />

            {content.items.map((item, index) => {
              const isLeft = index % 2 === 0

              return (
                <RevealOnScroll
                  key={item.id}
                  className="relative grid grid-cols-[28px_minmax(0,1fr)] gap-4 md:grid-cols-[minmax(0,1fr)_56px_minmax(0,1fr)] md:gap-6"
                >
                  <div className="relative z-10 flex justify-center pt-2 md:col-start-2">
                    <span
                      className="block h-4 w-4 rounded-full border-4 border-white bg-blue-600 shadow-[0_0_0_6px_rgba(37,99,235,0.12)]"
                      data-experiences-dot="true"
                    />
                  </div>

                  <article
                    className={`grid gap-4 rounded-[24px] border border-slate-900/8 bg-white/95 p-4 shadow-[0_20px_48px_rgba(15,23,42,0.06)] md:p-5 ${
                      isLeft ? 'md:col-start-1 md:row-start-1' : 'md:col-start-3 md:row-start-1'
                    }`}
                    data-experiences-card="true"
                  >
                    <div className="flex flex-wrap items-center gap-2">
                      <span
                        className="inline-flex items-center rounded-full bg-blue-600/10 px-3 py-1 text-[0.69rem] font-semibold tracking-[-0.02em] text-blue-700"
                        data-experiences-period="true"
                      >
                        {item.period}
                      </span>
                      <span
                        className="inline-flex items-center rounded-full border border-slate-900/8 bg-slate-900/[0.03] px-3 py-1 text-[0.69rem] font-semibold tracking-[-0.02em] text-slate-700"
                        data-experiences-tag="true"
                      >
                        {content.categoryLabels[item.category]}
                      </span>
                      <span
                        className="text-[0.71rem] font-semibold tracking-[-0.02em] text-slate-400"
                        data-experiences-muted="true"
                      >
                        {item.meta}
                      </span>
                    </div>

                    <div className="grid gap-2">
                      <h3 className="m-0 text-[1.08rem] font-bold leading-[1.08] tracking-[-0.05em] text-[var(--text-h)] md:text-[1.14rem]">
                        {item.title}
                      </h3>
                      <ul
                        className="grid list-disc gap-1.5 pl-[1.15rem] text-[0.82rem] leading-[1.68] tracking-[-0.02em] text-slate-600 marker:text-slate-400 md:text-[0.86rem]"
                        data-experiences-muted="true"
                      >
                        {item.details.map((detail) => (
                          <li key={`${item.id}-${detail}`}>{detail}</li>
                        ))}
                      </ul>
                    </div>
                  </article>
                </RevealOnScroll>
              )
            })}
          </div>
        </RevealOnScroll>
      </section>
      <Footer />
    </main>
  )
}

export default ExperiencesPage
