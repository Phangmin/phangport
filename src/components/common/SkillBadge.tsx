import androidStudioIcon from '../../assets/skillsicons/andriod-studio-icon.png'
import bootstrapIcon from '../../assets/skillsicons/bootstrap-icon.png'
import djangoIcon from '../../assets/skillsicons/django-icon.png'
import electronIcon from '../../assets/skillsicons/electron-icon.png'
import figmaIcon from '../../assets/skillsicons/firma-icon.svg'
import gitIcon from '../../assets/skillsicons/git-icon.png'
import githubIcon from '../../assets/icons/github-icon.png'
import gitlabIcon from '../../assets/skillsicons/gitlab-icon.png'
import html5Icon from '../../assets/skillsicons/html5-icon.png'
import javascriptIcon from '../../assets/skillsicons/javascript-icon.png'
import jiraIcon from '../../assets/skillsicons/jira-icon.png'
import kotlinIcon from '../../assets/skillsicons/kotlin-icon.png'
import mattermostIcon from '../../assets/skillsicons/mattermost-icon.webp'
import microsoftTeamsIcon from '../../assets/skillsicons/microsoftteams-icon.png'
import mysqlIcon from '../../assets/skillsicons/mysql-icon.png'
import nextjsIcon from '../../assets/skillsicons/nextjs-icon.png'
import notionIcon from '../../assets/icons/notion-icon.webp'
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

const SKILL_ICON_MAP: Record<string, string> = {
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
}

export function getSkillIconSrc(label: string) {
  return SKILL_ICON_MAP[label]
}

type SkillBadgeProps = {
  label: string
  className?: string
}

function SkillBadge({ label, className = '' }: SkillBadgeProps) {
  const iconSrc = getSkillIconSrc(label)

  return (
    <span
      data-about-skill-badge="true"
      className={`inline-flex h-7 whitespace-nowrap items-center justify-center gap-1.5 rounded-full bg-gray-600/8 px-2.5 text-[0.72rem] font-bold leading-none text-gray-700 md:h-8 md:px-3 md:text-[0.76rem] ${className}`.trim()}
    >
      {iconSrc ? (
        <img
          src={iconSrc}
          alt=""
          aria-hidden="true"
          className="h-3.5 w-3.5 shrink-0 object-contain md:h-4 md:w-4"
        />
      ) : null}
      <span className="whitespace-nowrap leading-none">{label}</span>
    </span>
  )
}

export default SkillBadge
