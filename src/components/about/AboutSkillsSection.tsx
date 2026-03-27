// @ts-nocheck
import androidStudioIcon from '../../assets/skillsicons/andriod-studio-icon.png'
import bootstrapIcon from '../../assets/skillsicons/bootstrap-icon.png'
import djangoIcon from '../../assets/skillsicons/django-icon.png'
import electronIcon from '../../assets/skillsicons/electron-icon.png'
import figmaIcon from '../../assets/skillsicons/firma-icon.svg'
import gitIcon from '../../assets/skillsicons/git-icon.png'
import githubIcon from '../../assets/skillsicons/github-icon.png'
import gitlabIcon from '../../assets/skillsicons/gitlab-icon.png'
import html5Icon from '../../assets/skillsicons/html5-icon.png'
import javascriptIcon from '../../assets/skillsicons/javascript-icon.png'
import jiraIcon from '../../assets/skillsicons/jira-icon.png'
import kotlinIcon from '../../assets/skillsicons/kotlin-icon.png'
import mattermostIcon from '../../assets/skillsicons/mattermost-icon.webp'
import microsoftTeamsIcon from '../../assets/skillsicons/microsoftteams-icon.png'
import mysqlIcon from '../../assets/skillsicons/mysql-icon.png'
import nextjsIcon from '../../assets/skillsicons/nextjs-icon.png'
import notionIcon from '../../assets/skillsicons/notion-icon.webp'
import postmanIcon from '../../assets/skillsicons/postman-icon.svg'
import pythonIcon from '../../assets/skillsicons/python-icon.png'
import reactIcon from '../../assets/skillsicons/React-icon.png'
import sqlite3Icon from '../../assets/skillsicons/sqlite3-icon.svg'
import swaggerIcon from '../../assets/skillsicons/swagger-icon.png'
import tailwindIcon from '../../assets/skillsicons/tailwind-icon.png'
import typescriptIcon from '../../assets/skillsicons/typescript-icon.png'
import vercelIcon from '../../assets/skillsicons/vercel-icon.png'
import viteIcon from '../../assets/skillsicons/vite-icon.png'
import vueIcon from '../../assets/skillsicons/vue-icon.png'
import { RevealOnScroll } from '../common'

const SKILL_ICON_MAP = {
  React: reactIcon,
  'React Native': reactIcon,
  'Vue.js': vueIcon,
  'Next.js': nextjsIcon,
  Vite: viteIcon,
  HTML: html5Icon,
  JavaScript: javascriptIcon,
  TypeScript: typescriptIcon,
  'Bootstrap CSS': bootstrapIcon,
  'Tailwind CSS': tailwindIcon,
  Figma: figmaIcon,
  Django: djangoIcon,
  Python: pythonIcon,
  Swagger: swaggerIcon,
  Postman: postmanIcon,
  Electron: electronIcon,
  Git: gitIcon,
  GitHub: githubIcon,
  GitLab: gitlabIcon,
  SQLite3: sqlite3Icon,
  MySQL: mysqlIcon,
  'Android Studio': androidStudioIcon,
  Kotlin: kotlinIcon,
  Jira: jiraIcon,
  Notion: notionIcon,
  Mattermost: mattermostIcon,
  'Microsoft Teams': microsoftTeamsIcon,
  Vercel: vercelIcon,
} as const

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
              {group.items.map((item) => {
                const iconSrc = SKILL_ICON_MAP[item]

                return (
                  <span
                    key={item}
                    data-about-skill-badge="true"
                    className="inline-flex h-7 whitespace-nowrap items-center justify-center gap-1.5 rounded-full bg-gray-600/8 px-2.5 text-[0.72rem] font-bold leading-none text-gray-700 md:h-8 md:px-3 md:text-[0.76rem]"
                  >
                    {iconSrc ? (
                      <img
                        src={iconSrc}
                        alt=""
                        aria-hidden="true"
                        className="h-3.5 w-3.5 shrink-0 object-contain md:h-4 md:w-4"
                      />
                    ) : null}
                    <span className="whitespace-nowrap leading-none">{item}</span>
                  </span>
                )
              })}
            </div>
          </RevealOnScroll>
        ))}
      </div>
    </section>
  )
}

export default AboutSkillsSection
