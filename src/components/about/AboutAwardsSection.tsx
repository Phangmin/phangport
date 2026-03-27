// @ts-nocheck
import { RevealOnScroll } from '../common'

function AboutAwardsSection(props) {
  const { items, header } = props

  return (
    <section className="grid gap-4 px-0 py-1 md:gap-5 md:px-1 md:py-2">
      <RevealOnScroll delay={0.1} className="grid gap-2">
        <div className="flex items-end gap-2">
          <h2 className="m-0 text-[1.18rem] font-bold text-[var(--text-h)] md:text-[1.32rem]">{header.primary}</h2>
          <p
            className="m-0 leading-none text-[0.78rem] text-gray-400 md:text-sm"
            data-about-section-secondary="true"
          >
            {header.secondary}
          </p>
        </div>
        <p
          className="m-0 text-[0.9rem] leading-[1.72] text-slate-500 md:text-sm md:leading-7"
          data-about-section-description="true"
        >
          {header.description}
        </p>
      </RevealOnScroll>

      <div className="grid gap-3.5 md:grid-cols-2 md:gap-[14px]">
        {items.map((item, index) => (
          <RevealOnScroll
            as="article"
            key={`${item.awardName || item.title}-${item.awardDate || item.date || ''}`}
            delay={0.2 + index * 0.06}
            className="grid self-start h-full content-start gap-1.5 rounded-[20px] border border-slate-900/8 bg-white px-4 py-4 md:gap-1 md:rounded-[22px] md:px-5 md:py-[18px]"
          >
            <h3 className="m-0 text-[0.96rem] font-semibold text-[var(--text-h)] md:text-base">
              {item.awardName || item.title}
            </h3>
            <div className="flex flex-wrap items-center gap-3">
              <p
                className="m-0 text-[0.75rem] font-semibold leading-none text-blue-700 md:text-xs"
                data-about-award-organization="true"
              >
                {item.organization || item.institution}
              </p>
              <div className="flex items-center text-[0.75rem] leading-none text-slate-500 md:text-xs">
                <span>{item.awardDate || item.date}</span>
              </div>
            </div>
            <p className="m-0 text-[0.72rem] leading-[1.65] text-slate-500 md:text-[0.72rem] md:leading-[1.7]">
              {item.content || item.description}
            </p>
          </RevealOnScroll>
        ))}
      </div>
    </section>
  )
}

export default AboutAwardsSection
