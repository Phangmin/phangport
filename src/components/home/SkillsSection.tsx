import { useMemo, useState } from 'react'
import { getSkillIconSrc, skillsSectionCopyByLanguage, type SkillsTabId } from '../../content/skills'
import useLanguage from '../../hooks/useLanguage'

function SkillsSection() {
  const language = useLanguage()
  const copy = skillsSectionCopyByLanguage[language]
  const [activeTabId, setActiveTabId] = useState<SkillsTabId>('frontend')

  const activeTab = useMemo(
    () => copy.tabs.find((tab) => tab.id === activeTabId) ?? copy.tabs[0]!,
    [activeTabId, copy.tabs]
  )

  return (
    <section
      id="skills"
      className="relative min-h-[100svh] overflow-hidden bg-transparent text-slate-950 dark:text-white"
      data-home-skills-section="true"
    >
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(148,163,184,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.12)_1px,transparent_1px)] bg-[size:88px_88px] opacity-[0.16] dark:opacity-[0.08]" />

      <div className="relative z-[1] mx-auto grid min-h-[100svh] w-[min(1126px,calc(100%-48px))] content-center gap-8 py-[calc(var(--navbar-offset,104px)+28px)] max-md:w-[min(calc(100%-32px),1126px)] max-md:content-start max-md:gap-6 max-md:py-[calc(var(--navbar-offset,96px)+18px)] md:w-[min(1126px,calc(100%-128px))]">
        <div className="grid justify-items-center gap-3 text-center max-md:gap-2">
          <p className="m-0 text-[0.76rem] font-semibold uppercase tracking-[0.22em] text-blue-700 dark:text-sky-200">
            {copy.sectionLabel}
          </p>
          <h2 className="m-0 text-[clamp(1.9rem,4.4vw,3.4rem)] font-semibold leading-[1.02] tracking-[-0.055em] text-slate-950 dark:text-white">
            {copy.heading}
          </h2>
          <p className="m-0 text-[0.98rem] leading-[1.82] text-slate-600 dark:text-slate-300">
            {copy.description}
          </p>
        </div>

        <div className="grid gap-4 rounded-[32px] border border-slate-900/8 bg-transparent p-4 shadow-[0_26px_80px_rgba(148,163,184,0.16)] backdrop-blur-[14px] dark:border-white/10 dark:bg-transparent dark:shadow-[0_26px_80px_rgba(2,6,23,0.3)] md:grid-cols-[minmax(164px,0.34fr)_minmax(0,1fr)] md:gap-0 md:p-0">
          <div className="grid content-start gap-1 border-b border-slate-900/8 pb-3 md:border-b-0 md:border-r md:border-slate-900/8 md:p-5 dark:border-white/10">
            {copy.tabs.map((tab) => {
              const isActive = tab.id === activeTab.id

              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTabId(tab.id)}
                  className={`flex items-center justify-between rounded-[16px] px-3 py-2.5 text-left text-[0.92rem] font-medium transition-colors duration-200 ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-[0_14px_34px_rgba(37,99,235,0.26)] dark:bg-sky-400 dark:text-slate-950'
                      : 'text-slate-600 hover:bg-slate-900/[0.04] hover:text-slate-950 dark:text-slate-300 dark:hover:bg-white/[0.06] dark:hover:text-white'
                  }`}
                >
                  <span>{tab.label}</span>
                  <span className={`text-[0.72rem] ${isActive ? 'text-inherit/80' : 'text-slate-400 dark:text-slate-500'}`}>
                    {tab.items.length}
                  </span>
                </button>
              )
            })}
          </div>

          <div className="grid content-start gap-5 px-1 pt-1 md:p-6">
            <div className="grid gap-2 border-b border-slate-900/8 pb-4 dark:border-white/10">
              <p className="m-0 text-[1.3rem] font-semibold tracking-[-0.04em] text-slate-950 dark:text-white">{activeTab.title}</p>
              <p className="m-0 text-[0.94rem] leading-[1.72] text-slate-600 dark:text-slate-300">{activeTab.summary}</p>
            </div>

            <div className="grid gap-4 xl:grid-cols-2">
              {activeTab.items.map((item) => {
                const iconSrc = getSkillIconSrc(item.label)

                return (
                  <article
                    key={`${activeTab.id}-${item.label}`}
                    className="grid grid-cols-[64px_minmax(0,1fr)] items-center gap-5 rounded-[24px] border border-slate-900/8 bg-transparent p-4 transition-transform duration-200 hover:-translate-y-0.5 dark:border-white/10 dark:bg-transparent"
                  >
                    <div className="flex h-16 w-16 items-center justify-center rounded-full border border-blue-500/70 bg-[radial-gradient(circle_at_center,rgba(49,130,246,0.16)_0%,rgba(49,130,246,0.05)_56%,transparent_72%)] shadow-[inset_0_0_0_1px_rgba(49,130,246,0.18)]">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-950/[0.03] dark:bg-white/[0.04]">
                        {iconSrc ? (
                          <img src={iconSrc} alt="" aria-hidden="true" className="h-8 w-8 object-contain" />
                        ) : (
                          <span className="text-sm font-semibold text-blue-700 dark:text-blue-300">{item.label.slice(0, 2)}</span>
                        )}
                      </div>
                    </div>

                    <div className="grid items-center gap-1.5 text-left">
                      <h3 className="m-0 text-[1.08rem] font-semibold tracking-[-0.03em] text-slate-950 dark:text-white">{item.label}</h3>
                      <p className="m-0 text-[0.84rem] leading-[1.68] text-left text-slate-600 dark:text-slate-300">{item.description}</p>
                    </div>
                  </article>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SkillsSection
