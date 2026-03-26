const skills = [
  'React + TypeScript',
  'State Management',
  'UI/UX Implementation',
  'Responsive Design',
  'Performance Tuning',
  'Design System',
]

function SkillsSection() {
  return (
    <section
      id="skills"
      className="mx-auto grid h-screen w-[min(1126px,calc(100%-48px))] content-center gap-[18px] px-0 pb-[72px] pt-[calc(var(--navbar-offset,104px)+12px)] md:w-[min(1126px,calc(100%-128px))]"
    >
      <p className="m-0 text-[0.78rem] font-bold uppercase tracking-[0.18em] text-blue-600">
        Skills
      </p>
      <h2 className="m-0 text-[clamp(2rem,4vw,3.2rem)] leading-[1.05] tracking-[-0.04em] text-[var(--text-h)]">
        기술 스택과 강점을 구조화했습니다.
      </h2>
      <p className="m-0 max-w-[820px] text-base leading-[1.8] text-slate-500">
        기술만 나열하지 않고, 실제 제품 경험에 맞춰 어떤 상황에 쓰는지까지 연결합니다.
      </p>

      <article className="grid gap-3 rounded-[20px] border border-slate-900/8 bg-white p-[22px] shadow-[0_18px_40px_rgba(15,23,42,0.06)]">
        <h3 className="mb-[30px] text-[28px] text-[var(--text-h)] after:mt-2 after:block after:h-1 after:w-10 after:bg-[#0064DE] after:content-['']">
          Core Stack
        </h3>
        <div className="flex flex-wrap gap-2.5">
          {skills.map((skill) => (
            <span
              key={skill}
              className="inline-flex items-center justify-center rounded-full bg-blue-600/8 px-[14px] py-[10px] text-[0.8rem] font-bold tracking-[0.03em] text-blue-700"
            >
              {skill}
            </span>
          ))}
        </div>
      </article>
    </section>
  )
}

export default SkillsSection
