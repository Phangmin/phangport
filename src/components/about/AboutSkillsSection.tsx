// @ts-nocheck
import { RevealOnScroll, SkillBadge } from '../common'

function AboutSkillsSection(props) {
  const { skillGroups, header } = props

  return (
    <section className="grid gap-4 px-0 py-1 md:gap-[18px] md:px-1 md:py-2">
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
          className="m-0 text-[0.9rem] leading-[1.72] text-slate-500 md:leading-7"
          data-about-section-description="true"
        >
          {header.description}
        </p>
      </RevealOnScroll>

      <div className="grid gap-3.5 md:grid-cols-2 md:gap-4 xl:grid-cols-3">
        {skillGroups.map((group, index) => (
          <RevealOnScroll
            as="article"
            key={group.title}
            delay={0.2 + index * 0.08}
            className="grid content-start gap-3 rounded-[20px] border border-slate-900/8 bg-white p-4 md:gap-[14px] md:rounded-[24px] md:p-[22px]"
          >
            <h3 className="m-0 font-semibold text-[0.96rem] text-[var(--text-h)] md:text-base">{group.title}</h3>
            <div className="flex flex-wrap content-start items-start gap-2">
              {group.items.map((item) => (
                <SkillBadge key={item} label={item} />
              ))}
            </div>
          </RevealOnScroll>
        ))}
      </div>
    </section>
  )
}

export default AboutSkillsSection
