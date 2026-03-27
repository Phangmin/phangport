// @ts-nocheck
import { RevealOnScroll } from '../common'

function AboutEducationSection(props) {
  const { items, header } = props

  return (
    <section className="grid gap-4 px-0 py-1 md:gap-5 md:px-1 md:py-2">
      <RevealOnScroll delay={0.08} className="grid gap-2">
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
          className="m-0 text-[0.9rem] leading-[1.75] text-slate-500 md:text-sm md:leading-7"
          data-about-section-description="true"
        >
          {header.description}
        </p>
      </RevealOnScroll>

      <div className="grid gap-3.5 md:gap-[14px]">
        {items.map((item, index) =>
          item.url ? (
            <RevealOnScroll
              as="a"
              key={`${item.period}-${item.title}`}
              delay={0.18 + index * 0.08}
              href={item.url}
              target="_blank"
              rel="noreferrer"
              data-about-education-card="true"
              className="grid gap-2 rounded-[20px] border border-slate-900/8 bg-white px-4 py-4 transition-[transform,border-color,box-shadow] duration-200 hover:-translate-y-px hover:border-blue-600/30 hover:shadow-[0_16px_36px_rgba(37,99,235,0.10)] focus-visible:-translate-y-px focus-visible:border-blue-600/30 focus-visible:shadow-[0_16px_36px_rgba(37,99,235,0.10)] focus-visible:outline-none md:rounded-[22px] md:px-5 md:py-[18px]"
            >
              <span
                data-about-education-period="true"
                className="text-[0.76rem] font-bold uppercase tracking-[0.08em] text-blue-700"
              >
                {item.period}
              </span>
              <h3 className="m-0 text-[0.96rem] font-semibold text-[var(--text-h)] md:text-base">{item.title}</h3>
              <p className="m-0 text-[0.86rem] leading-[1.65] text-slate-500 md:text-sm md:leading-[1.7]">
                {item.description}
              </p>
            </RevealOnScroll>
          ) : (
            <RevealOnScroll
              as="article"
              key={`${item.period}-${item.title}`}
              delay={0.18 + index * 0.08}
              data-about-education-card="true"
              className="grid gap-2 rounded-[20px] border border-slate-900/8 bg-white px-4 py-4 md:rounded-[22px] md:px-5 md:py-[18px]"
            >
              <span
                data-about-education-period="true"
                className="text-[0.76rem] font-bold uppercase tracking-[0.08em] text-blue-700"
              >
                {item.period}
              </span>
              <h3 className="m-0 text-[0.96rem] font-semibold text-[var(--text-h)] md:text-base">{item.title}</h3>
              <p className="m-0 text-[0.86rem] leading-[1.65] text-slate-500 md:text-sm md:leading-[1.7]">
                {item.description}
              </p>
            </RevealOnScroll>
          ),
        )}
      </div>
    </section>
  )
}

export default AboutEducationSection
