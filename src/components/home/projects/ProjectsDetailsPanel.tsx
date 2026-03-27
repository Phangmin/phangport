import { Link } from 'react-router-dom'
import type { ProjectItem } from '../../../content/home'

type ProjectsDetailsPanelProps = {
  sectionLabel: string
  detailCta: string
  activeProject: ProjectItem
  focusedIndex: number
}

function ProjectsDetailsPanel({
  sectionLabel,
  detailCta,
  activeProject,
  focusedIndex,
}: ProjectsDetailsPanelProps) {
  return (
    <>
      <div data-home-projects-details-mobile="true" className="grid gap-2 rounded-[24px] border border-white/10 bg-white/8 p-4 text-center shadow-[0_24px_56px_rgba(2,6,23,0.18)] backdrop-blur-sm lg:hidden">
        <span data-home-projects-card-badge="true" className="inline-flex h-10 w-10 items-center justify-center justify-self-center rounded-full bg-blue-300/15 text-[0.86rem] font-bold text-blue-200">
          {String(focusedIndex + 1).padStart(2, '0')}
        </span>
        <h3 data-home-projects-title-inverse="true" className="m-0 text-[1.35rem] leading-[1] tracking-[-0.05em] text-white">
          {activeProject.title}
        </h3>
        <p data-home-projects-period-pill="true" className="m-0 w-fit justify-self-center rounded-full bg-white/10 px-4 py-1.5 text-sm leading-[1] tracking-[-0.05em] text-white lg:justify-self-start">
          {activeProject.period}
        </p>
        <p data-home-projects-title-inverse="true" className="m-0 text-sm leading-[1] tracking-[-0.05em] text-white">{activeProject.role}</p>
        <p data-home-projects-muted-inverse="true" className="m-0 text-[0.84rem] leading-[1.65] text-slate-200/84">
          {activeProject.description}
        </p>
        <Link
          to="/portfolio"
          data-home-projects-cta="true"
          className="mt-2 inline-flex items-center justify-center justify-self-center rounded-full bg-white px-5 py-1.5 text-[0.86rem] font-bold tracking-[-0.01em] text-slate-900 no-underline shadow-[0_18px_40px_rgba(2,6,23,0.18)] transition-all duration-200 hover:-translate-y-px hover:bg-slate-50 hover:shadow-[0_22px_46px_rgba(2,6,23,0.22)]"
        >
          {detailCta}
        </Link>
      </div>

      <div className="hidden lg:relative lg:z-10 lg:grid lg:justify-items-start lg:gap-3 lg:text-left">
        <p data-home-projects-label="true" className="m-0 text-[0.78rem] font-bold uppercase tracking-[0.2em] text-blue-200">
          {sectionLabel}
        </p>
        <span data-home-projects-card-badge="true" className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-blue-300/15 text-[0.86rem] font-bold text-blue-200">
          {String(focusedIndex + 1).padStart(2, '0')}
        </span>
        <h2 data-home-projects-title-inverse="true" className="m-0 max-w-[720px] text-[clamp(2rem,4vw,3.4rem)] leading-[0.98] tracking-[-0.05em] !text-white">
          {activeProject.title}
        </h2>
        <p data-home-projects-muted-inverse="true" className="m-0 max-w-[560px] text-[0.95rem] leading-[1.75] text-slate-200/80">
          {activeProject.period}
        </p>
        <p data-home-projects-muted-inverse="true" className="m-0 max-w-[560px] text-[0.95rem] leading-[1.75] text-slate-200/80">
          {activeProject.role}
        </p>
        <p data-home-projects-muted-inverse="true" className="m-0 max-w-[560px] text-[0.95rem] leading-[1.75] text-slate-200/80">
          {activeProject.description}
        </p>
        <Link
          to="/portfolio"
          data-home-projects-cta="true"
          className="mt-2 inline-flex min-w-[148px] items-center justify-center rounded-full bg-white px-[22px] py-[14px] text-[0.92rem] font-bold tracking-[-0.01em] text-slate-900 no-underline shadow-[0_18px_40px_rgba(2,6,23,0.18)] transition-all duration-200 hover:-translate-y-px hover:bg-slate-50 hover:shadow-[0_22px_46px_rgba(2,6,23,0.22)]"
        >
          {detailCta}
        </Link>
      </div>
    </>
  )
}

export default ProjectsDetailsPanel
