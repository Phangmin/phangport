const experiences = [
  {
    title: '제품 관점의 구현',
    text: '기획 의도와 사용자 흐름을 화면 구조로 번역해 실제 사용성까지 이어지는 UI를 만듭니다.',
  },
  {
    title: '컴포넌트 기반 확장',
    text: '재사용 가능한 구조를 바탕으로 유지보수와 확장성이 좋은 프론트엔드를 설계합니다.',
  },
  {
    title: '디테일 중심 완성도',
    text: '타이포그래피, 간격, 상호작용까지 세밀하게 조정해 완성도 높은 경험을 만듭니다.',
  },
]

function ExperiencesSection() {
  return (
    <section
      id="experiences"
      className="mx-auto grid h-screen w-[min(1126px,calc(100%-48px))] content-center gap-[18px] px-0 pb-[72px] pt-[calc(var(--navbar-offset,104px)+12px)] md:w-[min(1126px,calc(100%-128px))]"
    >
      <p data-home-accent-label="true" className="m-0 text-[0.78rem] font-bold uppercase tracking-[0.18em] text-blue-600">
        Experiences
      </p>
      <h2 className="m-0 text-[clamp(2rem,4vw,3.2rem)] leading-[1.05] tracking-[-0.04em] text-[var(--text-h)]">
        경험을 중심으로 일하는 방식을 정리했습니다.
      </h2>
      <p data-home-muted-text="true" className="m-0 max-w-[820px] text-base leading-[1.8] text-slate-500">
        반복적으로 마주하는 문제를 어떤 기준으로 정리하고, 어떤 방식으로 해결하는지
        핵심 영역 중심으로 소개합니다.
      </p>

      <div>
        <h3 className="mb-[30px] text-[28px] text-[var(--text-h)] after:mt-2 after:block after:h-1 after:w-10 after:bg-[#0064DE] after:content-['']">
          Focus Areas
        </h3>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {experiences.map((exp) => (
          <article
            key={exp.title}
            data-home-experience-card="true"
            className="rounded-[20px] border border-slate-900/8 bg-white p-[22px] shadow-[0_18px_40px_rgba(15,23,42,0.06)]"
          >
            <h3 className="mb-[10px] text-[1.05rem] text-[var(--text-h)]">{exp.title}</h3>
            <p data-home-muted-text="true" className="m-0 text-[0.95rem] leading-[1.75] text-slate-500">{exp.text}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

export default ExperiencesSection
