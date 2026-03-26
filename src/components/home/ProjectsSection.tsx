import { useState } from 'react'

const projects = [
  {
    title: 'Portfolio UX',
    description: '브랜드와 자기소개를 한 화면 안에서 자연스럽게 읽히게 만드는 구조 설계',
  },
  {
    title: 'Service Flow',
    description: '복잡한 기능을 단순한 흐름으로 재정리하는 사용자 중심 인터페이스 작업',
  },
  {
    title: 'Frontend Build',
    description: 'React와 TypeScript를 기반으로 화면 구조를 안정적으로 구현하는 개발 작업',
  },
  {
    title: 'Responsive UI',
    description: '모바일과 데스크톱 모두에서 일관된 인상을 유지하는 반응형 설계',
  },
  {
    title: 'Design Detail',
    description: '간격과 타이포그래피, 포커스 포인트를 세밀하게 다듬는 시각 완성도 작업',
  },
]

function ProjectsSection() {
  const [focusedIndex, setFocusedIndex] = useState(2)
  const activeProject = projects[focusedIndex] || projects[0] || { title: '', description: '' }

  return (
    <section
      id="portfolio"
      className="h-screen w-full snap-start snap-always bg-[radial-gradient(circle_at_top,rgba(96,165,250,0.16),transparent_32%),linear-gradient(180deg,#081120_0%,#0f172a_46%,#111827_100%)]"
    >
      <div className="mx-auto grid h-screen w-[min(1126px,calc(100%-48px))] content-center gap-7 px-0 pb-[72px] pt-[calc(var(--navbar-offset,104px)+12px)] md:w-[min(1126px,calc(100%-128px))] lg:grid-cols-[minmax(0,1.08fr)_minmax(320px,0.92fr)] lg:items-center lg:gap-[42px]">
        <div className="grid gap-[14px] lg:grid-cols-2 xl:grid-cols-3">
          {projects.map((project, index) => (
            <button
              key={project.title}
              type="button"
              aria-pressed={index === focusedIndex}
              onClick={() => setFocusedIndex(index)}
              className={`grid gap-[10px] rounded-[24px] border border-white/10 bg-white/95 p-5 text-left shadow-[0_24px_56px_rgba(2,6,23,0.24)] transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_28px_62px_rgba(2,6,23,0.3)] ${index === focusedIndex ? 'ring-2 ring-blue-500/40' : ''}`}
            >
              <span className="inline-flex h-[30px] w-[30px] items-center justify-center rounded-full bg-blue-50 text-[0.74rem] font-bold text-blue-600">
                {String(index + 1).padStart(2, '0')}
              </span>
              <div className="grid gap-2">
                <strong className="text-[0.98rem] leading-[1.2] text-slate-900">{project.title}</strong>
                <span className="text-[0.88rem] leading-[1.65] text-slate-500">
                  {project.description}
                </span>
              </div>
            </button>
          ))}
        </div>

        <div className="grid justify-items-center gap-3 text-center lg:justify-items-start lg:text-left">
          <p className="m-0 text-[0.78rem] font-bold uppercase tracking-[0.2em] text-blue-200">
            Projects
          </p>
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-blue-300/15 text-[0.86rem] font-bold text-blue-200">
            {String(focusedIndex + 1).padStart(2, '0')}
          </span>
          <h2 className="m-0 max-w-[720px] text-[clamp(2rem,4vw,3.4rem)] leading-[0.98] tracking-[-0.05em] text-white">
            {activeProject.title}
          </h2>
          <p className="m-0 max-w-[560px] text-[0.95rem] leading-[1.75] text-slate-200/80">
            {activeProject.description}
          </p>
          <button
            type="button"
            className="mt-2 min-w-[148px] rounded-full bg-white px-[22px] py-[14px] text-[0.92rem] font-bold tracking-[-0.01em] text-slate-900 shadow-[0_18px_40px_rgba(2,6,23,0.18)] transition-all duration-200 hover:-translate-y-px hover:bg-slate-50 hover:shadow-[0_22px_46px_rgba(2,6,23,0.22)]"
          >
            자세히 보기
          </button>
        </div>
      </div>
    </section>
  )
}

export default ProjectsSection
