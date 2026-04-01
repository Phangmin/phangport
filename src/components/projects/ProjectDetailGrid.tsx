import type { ReactNode } from 'react'
import { SkillBadge } from '../common'
import type { ProjectCopyLabels, ProjectPageProject } from '../../content/projects'
import awardIcon from '../../assets/award-icon.png'
import githubIcon from '../../assets/icons/github-icon.png'

type ProjectDetailGridProps = {
  project: ProjectPageProject
  labels: ProjectCopyLabels
  projectTypeLabel: string
  media: ReactNode
}

type ProjectActionLink = {
  key: 'github' | 'website' | 'download'
  href: string
  label: string
}

function ProjectDetailGrid({ project, labels, projectTypeLabel, media }: ProjectDetailGridProps) {
  const isEnglish = labels.period === 'Period'
  const resultLabel = labels.result ?? (isEnglish ? 'Outcome' : '결과')
  const missionItems = Array.isArray(project.contribution) ? project.contribution : [project.contribution]
  const troubleshootingItems = Array.isArray(project.troubleshooting)
    ? project.troubleshooting
    : [project.troubleshooting]
  const resultItems = project.results ?? []
  const websiteActionLabel = isEnglish ? 'Visit This Website' : '웹사이트 이동하기'
  const downloadActionLabel = isEnglish ? 'Desktop App DownLoad' : '데스크탑앱 다운로드'
  const githubActionLink = project.githubUrl?.trim()
    ? { key: 'github' as const, href: project.githubUrl.trim(), label: labels.github }
    : null
  const primaryActionLinks = [
    { key: 'website', href: project.websiteUrl?.trim(), label: websiteActionLabel },
    { key: 'download', href: project.downloadUrl?.trim(), label: downloadActionLabel },
  ].filter((link): link is ProjectActionLink => Boolean(link.href))

  function renderActionIcon(key: ProjectActionLink['key']) {
    if (key === 'github') {
      return <img src={githubIcon} alt="" aria-hidden="true" className="h-4 w-4 object-contain" />
    }

    if (key === 'website') {
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4" fill="none">
          <path
            d="M4 12h16M12 4c2.8 2.3 4.2 5 4.2 8S14.8 17.7 12 20c-2.8-2.3-4.2-5-4.2-8S9.2 6.3 12 4Z"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )
    }

    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4" fill="none">
        <path
          d="M12 4v10m0 0 4-4m-4 4-4-4M5 18h14"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    )
  }

  return (
    <div
      className="grid overflow-hidden rounded-[30px] border border-slate-900/8 bg-white/95 p-4 shadow-[0_28px_68px_rgba(15,23,42,0.08)] md:gap-6 md:rounded-[34px] md:p-6"
      data-projects-surface="featured"
    >
      <section className="grid gap-8 pb-6 xl:grid-cols-[minmax(0,1.02fr)_minmax(0,0.98fr)] xl:items-stretch">
        <div className="min-w-0">{media}</div>

        <div className="grid min-w-0 gap-4 xl:h-full xl:grid-rows-[auto_auto_minmax(0,1fr)]">
          <div className="flex flex-wrap items-center gap-2">
            <span
              className={`inline-flex items-center rounded-full px-3 py-1 text-[0.74rem] font-semibold ${
                project.type === 'individual'
                  ? 'bg-amber-400/18 text-amber-700'
                  : 'bg-blue-600/10 text-blue-700'
              }`}
              data-projects-type-badge={project.type}
            >
              {projectTypeLabel}
            </span>
            {project.type === 'team' && project.teamSize ? (
              <span
                className="inline-flex items-center rounded-full border border-slate-900/8 bg-slate-900/4 px-3 py-1 text-[0.74rem] font-semibold text-slate-700"
                data-projects-contribution-badge="true"
              >
                {isEnglish ? `${project.teamSize}-person team` : `${project.teamSize}인 팀`}
              </span>
            ) : null}
            <span
              className="inline-flex items-center rounded-full border border-slate-900/8 bg-slate-900/4 px-3 py-1 text-[0.74rem] font-semibold text-slate-700"
              data-projects-contribution-badge="true"
            >
              {labels.contribution} {project.contributionRate}%
            </span>
            {githubActionLink ? (
              <a
                key={`${project.id}-${githubActionLink.key}`}
                href={githubActionLink.href}
                target="_blank"
                rel="noreferrer noopener"
                aria-label={githubActionLink.label}
                title={githubActionLink.label}
                className="group inline-flex h-8 w-8 items-center justify-center gap-0 overflow-hidden rounded-full border border-slate-900/10 bg-white text-slate-700 transition-all duration-300 ease-out hover:w-[104px] hover:justify-start hover:border-slate-950 hover:bg-slate-950 hover:px-3 hover:text-white focus-visible:w-[104px] focus-visible:justify-start focus-visible:border-slate-950 focus-visible:bg-slate-950 focus-visible:px-3 focus-visible:text-white focus-visible:outline-none"
                data-projects-action="true"
              >
                <img
                  src={githubIcon}
                  alt=""
                  aria-hidden="true"
                  data-projects-action-icon="github"
                  className="h-4 w-4 shrink-0 object-contain transition duration-300 group-hover:brightness-0 group-hover:invert group-focus-visible:brightness-0 group-focus-visible:invert"
                />
                <span className="max-w-0 overflow-hidden whitespace-nowrap text-[0.78rem] font-semibold opacity-0 transition-all duration-300 ease-out group-hover:ml-2 group-hover:max-w-16 group-hover:opacity-100 group-focus-visible:ml-2 group-focus-visible:max-w-16 group-focus-visible:opacity-100">
                  {githubActionLink.label}
                </span>
              </a>
            ) : null}
          </div>

          <div className="grid gap-3">
            <h2 className="m-0 flex min-w-0 items-center gap-2 text-[clamp(1.55rem,4.6vw,2.5rem)] font-bold leading-[0.98] tracking-[-0.05em] text-[var(--text-h)]">
              {project.hasAward ? (
                <img
                  src={awardIcon}
                  alt=""
                  aria-hidden="true"
                  className="h-7 w-7 shrink-0 object-contain md:h-8 md:w-8"
                />
              ) : null}
              <span className="min-w-0 break-words font-bold">{project.title}</span>
            </h2>
            <p
              className="m-0 text-[0.92rem] leading-[1.75] text-slate-600 md:text-[1rem]"
              data-projects-muted="true"
            >
              {project.summary}
            </p>
          </div>

          <div className="grid h-full content-end gap-2">
            <div
              className="grid h-full content-center gap-2 rounded-[24px] border border-slate-900/8 bg-slate-900/[0.02] p-3 md:p-4"
              data-projects-featured-meta="true"
            >
              <div className="grid h-full items-center gap-2 sm:grid-cols-2">
                <div className="grid gap-1">
                  <p
                    className="m-0 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-slate-400"
                    data-projects-secondary="true"
                  >
                    {labels.period}
                  </p>
                  <p className="m-0 text-[0.92rem] text-slate-800" data-projects-meta="true">
                    {project.period}
                  </p>
                </div>
                <div className="grid gap-1">
                  <p
                    className="m-0 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-slate-400"
                    data-projects-secondary="true"
                  >
                    {labels.role}
                  </p>
                  <p className="m-0 text-[0.92rem] text-slate-800" data-projects-meta="true">
                    {project.role}
                  </p>
                </div>
              </div>
            </div>
            {primaryActionLinks.length ? (
              <div className={`grid gap-2 ${primaryActionLinks.length > 1 ? 'sm:grid-cols-2' : 'sm:grid-cols-1'}`}>
                {primaryActionLinks.map((link) => (
                  <a
                    key={`${project.id}-${link.key}`}
                    href={link.href}
                    target={link.key === 'download' ? undefined : '_blank'}
                    rel={link.key === 'download' ? undefined : 'noreferrer noopener'}
                    download={link.key === 'download' ? true : undefined}
                    className="flex min-h-12 w-full items-center justify-center gap-2 self-stretch rounded-[18px] border border-slate-900/10 bg-white px-4 py-3 text-center text-[0.88rem] font-semibold text-slate-700 transition-colors duration-200 hover:border-slate-950 hover:bg-slate-950 hover:text-white focus-visible:border-slate-950 focus-visible:bg-slate-950 focus-visible:text-white focus-visible:outline-none"
                    data-projects-action="primary"
                  >
                    {renderActionIcon(link.key)}
                    <span>{link.label}</span>
                  </a>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </section>

      <div className="grid gap-0 divide-y divide-slate-900/8" data-projects-featured-list="true">
        <div className="grid gap-3 py-4 first:pt-0 last:pb-0 md:grid-cols-[180px_minmax(0,1fr)] md:items-start">
          <p
            className="m-0 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-slate-400"
            data-projects-secondary="true"
          >
            {labels.stack}
          </p>
          <div className="flex flex-wrap gap-2">
            {project.stacks.map((stack) => (
              <SkillBadge key={`${project.id}-${stack}`} label={stack} />
            ))}
          </div>
        </div>

        <div className="grid gap-3 py-4 first:pt-0 last:pb-0 md:grid-cols-[180px_minmax(0,1fr)] md:items-start">
          <p
            className="m-0 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-slate-400"
            data-projects-secondary="true"
          >
            {labels.introduction}
          </p>
          <p className="m-0 text-[0.88rem] leading-[1.74] text-slate-700" data-projects-body="true">
            {project.introduction}
          </p>
        </div>

        <div className="grid gap-3 py-4 first:pt-0 last:pb-0 md:grid-cols-[180px_minmax(0,1fr)] md:items-start">
          <p
            className="m-0 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-slate-400"
            data-projects-secondary="true"
          >
            {labels.mission}
          </p>
          <ul
            className="grid list-disc gap-2 pl-[1.2rem] text-[0.88rem] leading-[1.72] text-slate-700 marker:text-slate-500"
            data-projects-body="true"
          >
            {missionItems.map((mission) => (
              <li key={`${project.id}-${mission}`}>{mission}</li>
            ))}
          </ul>
        </div>

        <div className="grid gap-3 py-4 first:pt-0 last:pb-0 md:grid-cols-[180px_minmax(0,1fr)] md:items-start">
          <p
            className="m-0 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-slate-400"
            data-projects-secondary="true"
          >
            {labels.features}
          </p>
          <ul
            className="grid list-disc gap-2 pl-[1.2rem] text-[0.88rem] leading-[1.72] text-slate-700 marker:text-slate-500"
            data-projects-body="true"
          >
            {project.features.map((feature) => (
              <li key={`${project.id}-${feature}`}>{feature}</li>
            ))}
          </ul>
        </div>

        <div className="grid gap-3 py-4 first:pt-0 last:pb-0 md:grid-cols-[180px_minmax(0,1fr)] md:items-start">
          <p
            className="m-0 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-slate-400"
            data-projects-secondary="true"
          >
            {labels.troubleshooting}
          </p>
          <ul
            className="grid list-disc gap-2 pl-[1.2rem] text-[0.88rem] leading-[1.72] text-slate-700 marker:text-slate-500"
            data-projects-body="true"
          >
            {troubleshootingItems.map((troubleshooting) => (
              <li key={`${project.id}-${troubleshooting}`}>{troubleshooting}</li>
            ))}
          </ul>
        </div>

        {resultItems.length ? (
          <div className="grid gap-3 py-4 first:pt-0 last:pb-0 md:grid-cols-[180px_minmax(0,1fr)] md:items-start">
            <p
              className="m-0 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-slate-400"
              data-projects-secondary="true"
            >
              {resultLabel}
            </p>
            <ul
              className="grid list-disc gap-2 pl-[1.2rem] text-[0.88rem] leading-[1.72] text-slate-700 marker:text-slate-500"
              data-projects-body="true"
            >
              {resultItems.map((result) => (
                <li key={`${project.id}-${result}`}>{result}</li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </div>
  )
}

export default ProjectDetailGrid
