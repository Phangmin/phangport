// @ts-nocheck
import { RevealOnScroll } from '../common'

function AboutAwardsSection(props) {
  const { items } = props

  return (
    <section className="grid gap-5 px-1 py-2">
      <RevealOnScroll delay={0.1} className="grid gap-2">
        <h2 className="m-0 text-[1.32rem] font-bold text-[var(--text-h)]">수상내역</h2>
      </RevealOnScroll>

      <div className="grid gap-[14px] md:grid-cols-2">
        {items.map((item, index) => (
          <RevealOnScroll
            as="article"
            key={`${item.awardName || item.title}-${item.awardDate || item.date || ''}`}
            delay={0.2 + index * 0.06}
            className="grid gap-1 rounded-[22px] border border-slate-900/8 bg-white px-5 py-[18px]"
          >
            <h3 className="m-0 text-base font-semibold text-[var(--text-h)]">
              {item.awardName || item.title}
            </h3>
            <div className="flex gap-3">
              <p className="text-blue-700 font-semibold text-xs">{item.organization || item.institution}</p>
              <div className="flex w-fit flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500">
                <span>{item.awardDate || item.date}</span>
              </div>
            </div>
            <p className="m-0 text-xs leading-[1.7] text-slate-500">
              {item.content || item.description}
            </p>
          </RevealOnScroll>
        ))}
      </div>
    </section>
  )
}

export default AboutAwardsSection
