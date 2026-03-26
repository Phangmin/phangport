// @ts-nocheck
import { RevealOnScroll } from '../common'

function AboutSkillsSection(props) {
  const { skillGroups } = props

  return (
    <section className="grid gap-[18px] rounded-[28px] border border-slate-900/8 bg-white/95 p-7 shadow-[0_20px_48px_rgba(15,23,42,0.06)]">
      <RevealOnScroll delay={0.1} className="grid gap-2">
        <h2 className="m-0 text-[1.32rem] font-bold text-[var(--text-h)]">사용 가능 기술 스택</h2>
        <p className="m-0 leading-7 text-slate-500">
          단순한 사용 경험을 넘어 실제 화면 구성과 협업 과정에서 자주 활용하는 기술
          중심으로 정리했습니다.
        </p>
      </RevealOnScroll>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {skillGroups.map((group, index) => (
          <RevealOnScroll
            as="article"
            key={group.title}
            delay={0.2 + index * 0.08}
            className="grid gap-[14px] rounded-[24px] border border-slate-900/8 bg-white p-[22px]"
          >
            <h3 className="m-0 text-base text-[var(--text-h)]">{group.title}</h3>
            <div className="flex flex-wrap gap-2.5">
              {group.items.map((item) => (
                <span
                  key={item}
                  className="inline-flex items-center justify-center rounded-full bg-blue-600/8 px-3 py-2 text-[0.76rem] font-bold text-blue-700"
                >
                  {item}
                </span>
              ))}
            </div>
          </RevealOnScroll>
        ))}
      </div>
    </section>
  )
}

export default AboutSkillsSection
