import customerCard from '../../assets/strengthcards/strengthcard-customer.png'
import tenacityCard from '../../assets/strengthcards/strengthcard-tenacity.png'
import cooperationCard from '../../assets/strengthcards/strengthcard-cooperation.png'
import dataCard from '../../assets/strengthcards/strengthcard-data.png'
import solvingCard from '../../assets/strengthcards/strengthcard-solving.png'
import { projectsByLanguage, type ProjectPageProject } from '../../content/projects'
import type { LanguageCode } from '../../hooks/useLanguage'

const ENGLISH_MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
] as const

function formatEnglishDate(value: string) {
  const [year, month, day] = value.split('.').map((part) => Number.parseInt(part.trim(), 10))

  if (!year || !month || !day) {
    return value
  }

  return `${ENGLISH_MONTHS[month - 1]} ${day}, ${year}`
}

function formatEnglishMonth(value: string) {
  const [year, month] = value.split('.').map((part) => Number.parseInt(part.trim(), 10))

  if (!year || !month) {
    return value
  }

  return `${ENGLISH_MONTHS[month - 1]} ${year}`
}

function formatEnglishRange(start: string, end: string) {
  return `${formatEnglishDate(start)} - ${formatEnglishDate(end)}`
}

function formatEnglishMonthRange(start: string, end: string) {
  return `${formatEnglishMonth(start)} - ${formatEnglishMonth(end)}`
}

export type AboutProfileContent = {
  koreanName: string
  englishName: string
  schoolLabel: string
  schoolDetail: string
  email: string
  phone: string
  location: string
  headingLines: [string, string]
  introductionDescription: string
  certificate: string
  portraitAlt: string
  links: {
    githubUrl: string
    instagramUrl: string
    linkedinUrl: string
    tistoryUrl: string
    notionUrl: string
  }
}

export const aboutProfileContent: Record<LanguageCode, AboutProfileContent> = {
  ko: {
    koreanName: '천광민',
    englishName: 'Gwangmin Cheon',
    schoolLabel: '동아대학교 전자공학과',
    schoolDetail: '2022. 02. 23. 졸업',
    email: 'phangmin03@gmail.com',
    phone: '+82 10-2025-0041',
    location: '부산, 대한민국',
    headingLines: ['사용자 경험의 출발점부터', '서비스 구조와 구현까지 설계합니다.'],
    introductionDescription:
      '화면을 빠르게 만드는 것에서 끝나지 않고, 사용자가 자연스럽게 이해하고 편하게 사용할 수 있는 흐름을 만드는 데 관심이 많습니다. 구조가 명확한 컴포넌트 설계와 안정적인 상태 관리, 그리고 완성도를 높이는 디테일한 UI 조정을 강점으로 삼고 있습니다.',
    certificate: 'SQLD, 사무자동화산업기사, ERP 정보관리사 인사1급',
    portraitAlt: '천광민 프로필 사진',
    links: {
      githubUrl: 'https://github.com/Phangmin/',
      instagramUrl: 'https://instagram.com/gwang._.min/',
      linkedinUrl: 'https://www.linkedin.com/in/phangmin',
      tistoryUrl: 'https://phangmin.tistory.com/',
      notionUrl: 'https://phangmin.notion.site/',
    },
  },
  en: {
    koreanName: '천광민',
    englishName: 'Gwangmin Cheon',
    schoolLabel: 'Dong-A University, Electronic Engineering',
    schoolDetail: `Graduated on ${formatEnglishDate('2022.02.23')}`,
    email: 'phangmin03@gmail.com',
    phone: '+82 10-2025-0041',
    location: 'Busan, Republic of Korea',
    headingLines: ['From user experience foundations', 'to service structure and implementation.'],
    introductionDescription:
      'I care about building flows that feel natural and easy to use, not just making screens fast. My strengths are clear component architecture, stable state management, and refined UI adjustments that raise the overall quality of a product.',
    certificate: 'SQLD, Office Automation Industrial Engineer, ERP Information Manager HR Level 1',
    portraitAlt: 'Portrait of Cheon Gwang Min',
    links: {
      githubUrl: 'https://github.com/Phangmin/',
      instagramUrl: 'https://instagram.com/gwang._.min/',
      linkedinUrl: 'https://www.linkedin.com/in/phangmin',
      tistoryUrl: 'https://phangmin.tistory.com/',
      notionUrl: 'https://phangmin.notion.site/',
    },
  },
}

export type AboutTrainingItem = {
  period: string
  title: string
  description: string
  url?: string
}

export type AboutAwardItem = {
  awardName: string
  awardDate: string
  organization: string
  content: string
}

export type AboutProjectItem = {
  id?: string
  category: string
  title: string
  period: string
  role: string
  skills: string | string[]
  description: string
  imageSrc?: string
  backgroundUrl?: string
  coverLabel?: string
  coverGradientFrom?: string
  coverGradientTo?: string
}

export type AboutSectionHeader = {
  primary: string
  secondary: string
  description: string
}

export const trainingItemsByLanguage: Record<LanguageCode, AboutTrainingItem[]> = {
  ko: [
    {
      period: '2025. 01. - 2025. 12.',
      title: '삼성 청년 SW·AI 아카데미',
      description:
        'Python, JavaScript, 웹 기초, 데이터베이스, 프로젝트 협업까지 전반적인 개발 흐름을 실습 중심으로 학습하며 문제 해결 역량을 다졌습니다.',
      url: 'https://www.ssafy.com/',
    },
  ],
  en: [
    {
      period: formatEnglishMonthRange('2025.01', '2025.12'),
      title: 'Samsung Youth SW·AI Academy',
      description:
        'I strengthened my problem-solving skills through hands-on learning across Python, JavaScript, web fundamentals, databases, and project collaboration.',
      url: 'https://www.ssafy.com/',
    },
  ],
}

export const awardItemsByLanguage: Record<LanguageCode, AboutAwardItem[]> = {
  ko: [
    {
      awardName: '자치회공로상',
      awardDate: '2025.12.18',
      organization: '삼성전자주식회사',
      content: '자치회 활동(캠페인·이벤트 기획 및 진행, 자치회 운영 등)에 대한 공로를 인정받아 수상',
    },
    {
      awardName: '2학기 프로젝트 전시발표회 - 발표부문(입상)',
      awardDate: '2025.12.02',
      organization: '삼성전자주식회사',
      content: '[NAMUH] 전국 180여개 팀 중 14위 이내 입상하여 결선 진출',
    },
    {
      awardName: '자율프로젝트(AIoT) 최우수상(1등)',
      awardDate: '2025.11.20',
      organization: '삼성전자주식회사',
      content: '[NAMUH] 사회와 단절된 삶의 희망을 연결하는 소아암 환아를 위한 휴머노이드 로봇 프로젝트로 최우수상 수상',
    },
    {
      awardName: '특화프로젝트(빅데이터-추천) 우수상(3등)',
      awardDate: '2025.09.29',
      organization: '삼성전자주식회사',
      content: '[Insite] 서울시 카페 상권 비교·분석·추천 서비스 프로젝트로 우수상 수상',
    },
    {
      awardName: '공통프로젝트(웹기술) 우수상(2등)',
      awardDate: '2025.08.18',
      organization: '삼성전자주식회사',
      content: '[Stalk] WebRTC 기반 양방향 차트 위 드로잉 화상 주식 상담 플랫폼 프로젝트로 우수상 수상',
    },
    {
      awardName: '관통프로젝트(웹서비스) 우수상(2등)',
      awardDate: '2025.05.30',
      organization: '삼성전자주식회사',
      content: '[서재의온도] AI를 활용한 재미있는 독서 경험 공유 플랫폼 프로젝트로 우수상 수상',
    },
    {
      awardName: 'Dong-A Leadership Camp - PT부문(BEST Presenter)',
      awardDate: '2021.01.08',
      organization: '동아대학교 학생·취업지원처',
      content: '리더십 캠프에서 PT부문 BEST Presenter로 선정되어 수상',
    },
    {
      awardName: '대한민국 관광 활성화 공모전(은상)',
      awardDate: '2020.12.21',
      organization: '관광경영학회 & GKL사회공헌재단',
      content: '부산의 5대 바다를 컬러로 분류하여 관광 활성화 방안을 제안하는 공모전에서 은상 수상',
    },
    {
      awardName: '익산 중심 관광 활성화 공모전(동상)',
      awardDate: '2020.06.20',
      organization: '관광경영학회 & 익산문화관광재단',
      content: '익산의 구도심 활성화와 관광상품 개발을 위한 아이디어를 제안하는 공모전에서 동상 수상',
    },
    {
      awardName: '활동우수상 - 후원개발부분',
      awardDate: '2018.08.25',
      organization: '한국메이크어위시재단',
      content: '레고코리아의 협업으로 소아암 환아의 소원을 이루기 위한 후원개발 활동에서 활동우수상 수상',
    },
  ],
  en: [
    {
      awardName: 'Student Council Merit Award',
      awardDate: formatEnglishDate('2025.12.18'),
      organization: 'Samsung Electronics Co., Ltd.',
      content:
        'Recognized for contributions to student council activities, including campaign planning, event operations, and council management.',
    },
    {
      awardName: '2nd Semester Project Showcase - Presentation Division (Finalist)',
      awardDate: formatEnglishDate('2025.12.02'),
      organization: 'Samsung Electronics Co., Ltd.',
      content:
        '[NAMUH] Advanced to the finals by placing within the top 14 out of more than 180 teams nationwide.',
    },
    {
      awardName: 'Autonomous Project (AIoT) Grand Prize (1st Place)',
      awardDate: formatEnglishDate('2025.11.20'),
      organization: 'Samsung Electronics Co., Ltd.',
      content:
        '[NAMUH] Won the grand prize with a humanoid robot project designed to reconnect hope for pediatric cancer patients living in social isolation.',
    },
    {
      awardName: 'Specialized Project (Big Data Recommendation) Excellence Award (3rd Place)',
      awardDate: formatEnglishDate('2025.09.29'),
      organization: 'Samsung Electronics Co., Ltd.',
      content:
        '[Insite] Received the excellence award for a Seoul cafe commercial district comparison, analysis, and recommendation service.',
    },
    {
      awardName: 'Common Project (Web Technology) Excellence Award (2nd Place)',
      awardDate: formatEnglishDate('2025.08.18'),
      organization: 'Samsung Electronics Co., Ltd.',
      content:
        '[Stalk] Received the excellence award for a WebRTC-based two-way stock consulting platform with chart drawing and video calls.',
    },
    {
      awardName: 'Integrated Project (Web Service) Excellence Award (2nd Place)',
      awardDate: formatEnglishDate('2025.05.30'),
      organization: 'Samsung Electronics Co., Ltd.',
      content:
        '[Reading Temperature] Received the excellence award for an AI-powered platform for sharing engaging reading experiences.',
    },
    {
      awardName: 'Dong-A Leadership Camp - PT Division (BEST Presenter)',
      awardDate: formatEnglishDate('2021.01.08'),
      organization: 'Dong-A University Student & Career Support Office',
      content: 'Selected as the BEST Presenter in the presentation division at the leadership camp.',
    },
    {
      awardName: 'Korea Tourism Revitalization Contest (Silver Prize)',
      awardDate: formatEnglishDate('2020.12.21'),
      organization: 'Tourism Management Society & GKL Social Contribution Foundation',
      content:
        'Won the silver prize by proposing a tourism revitalization plan that classified Busan’s five major beaches by color.',
    },
    {
      awardName: 'Iksan Downtown Tourism Revitalization Contest (Bronze Prize)',
      awardDate: formatEnglishDate('2020.06.20'),
      organization: 'Tourism Management Society & Iksan Culture and Tourism Foundation',
      content:
        'Won the bronze prize by proposing ideas for revitalizing downtown Iksan and developing tourism products.',
    },
    {
      awardName: 'Outstanding Activity Award - Fundraising Development Division',
      awardDate: formatEnglishDate('2018.08.25'),
      organization: 'Make-A-Wish Korea',
      content:
        'Received the award for fundraising development activities conducted with LEGO Korea to help fulfill the wishes of children with cancer.',
    },
  ],
}

const legacyProjectItemsByLanguage: Record<LanguageCode, AboutProjectItem[]> = {
  ko: [
    {
      category: 'Project',
      title: '서재의온도',
      period: '2025.05.26 ~ 2025.05.31',
      role: 'Full-Stack, UI/UX 설계',
      skills: 'Django, Vue.js, BootStrap CSS, Vite, Zustand, SQLite3, Figma',
      description: 'AI를 활용한 재미있는 독서 경험 공유 플랫폼',
    },
    {
      category: 'Project',
      title: 'Stalk',
      period: '2025.07.01 ~ 2025.08.15',
      role: 'Front-end, UI/UX 설계',
      skills: 'React, Tailwind CSS, Vite, Zustand, MySQL, Figma',
      description: 'WebRTC 기반 양방향 차트 위 드로잉 화상 주식 상담 플랫폼',
    },
    {
      category: 'Project',
      title: 'Lin. Book',
      period: '2025.08.12 ~ 2025.08.31',
      role: 'Front-end, UI/UX 설계',
      skills: 'AndroidStudio, Tailwind CSS, Django, Vite, Zustand, MySQL, Figma',
      description: '모임통장을 활용한 투명한 관리가 쉬운 동아리 회계 플랫폼',
    },
    {
      category: 'Project',
      title: 'Insite',
      period: '2025.08.17 ~ 2025.09.30',
      role: 'PM, Front-end, UI/UX 설계',
      skills: 'Next.js, Tailwind CSS, Vite, Zustand, MySQL, Figma',
      description: '서울시 카페 상권 비교·분석·추천 서비스',
    },
    {
      category: 'Project',
      title: 'NAMUH',
      period: '2025.10.01 ~ 2025.11.30',
      role: 'Front-end, UI/UX 설계',
      skills: 'React, TailwindCSS, Vite, Zustand, MySQL, Figma',
      description: '사회와 단절된 삶의 희망을 연결하는 소아암 환아를 위한 휴머노이드 로봇',
    },
    {
      category: 'Project',
      title: 'Hotel Wellness Butler',
      period: '2025.11.01 ~ 2025.12.01',
      role: '서비스 기획, UI/UX 설계',
      skills: 'Figma',
      description: 'SK Intellix의 A1 제품을 활용한 호텔 AI 상품 제안',
    },
    {
      category: 'Project',
      title: 'My Health Calendar',
      period: '2026.01.01 ~ 2026.01.14',
      role: '서비스 기획',
      skills: 'Figma',
      description: '한국보건의료정보원의 「내 건강기록 앱」 아이디어 제안',
    },
  ],
  en: [
    {
      category: 'Project',
      title: 'Reading Temperature',
      period: formatEnglishRange('2025.05.26', '2025.05.31'),
      role: 'Full-Stack, UI/UX Design',
      skills: 'Django, Vue.js, BootStrap CSS, Vite, Zustand, SQLite3, Figma',
      description: 'An AI-powered platform for sharing engaging reading experiences',
    },
    {
      category: 'Project',
      title: 'Stalk',
      period: formatEnglishRange('2025.07.01', '2025.08.15'),
      role: 'Front-end, UI/UX Design',
      skills: 'React, Tailwind CSS, Vite, Zustand, MySQL, Figma',
      description: 'A WebRTC-based stock consulting platform with two-way video calls and chart drawing',
    },
    {
      category: 'Project',
      title: 'Lin. Book',
      period: formatEnglishRange('2025.08.12', '2025.08.31'),
      role: 'Front-end, UI/UX Design',
      skills: 'AndroidStudio, Tailwind CSS, Django, Vite, Zustand, MySQL, Figma',
      description: 'A club accounting platform focused on transparent and easy management through shared accounts',
    },
    {
      category: 'Project',
      title: 'Insite',
      period: formatEnglishRange('2025.08.17', '2025.09.30'),
      role: 'PM, Front-end, UI/UX Design',
      skills: 'Next.js, Tailwind CSS, Vite, Zustand, MySQL, Figma',
      description: 'A service for comparing, analyzing, and recommending cafe business districts in Seoul',
    },
    {
      category: 'Project',
      title: 'NAMUH',
      period: formatEnglishRange('2025.10.01', '2025.11.30'),
      role: 'Front-end, UI/UX Design',
      skills: 'React, TailwindCSS, Vite, Zustand, MySQL, Figma',
      description: 'A humanoid robot project for pediatric cancer patients facing social isolation',
    },
    {
      category: 'Project',
      title: 'Hotel Wellness Butler',
      period: formatEnglishRange('2025.11.01', '2025.12.01'),
      role: 'Service Planning, UI/UX Design',
      skills: 'Figma',
      description: 'An AI hotel product proposal using SK Intellix A1',
    },
    {
      category: 'Project',
      title: 'My Health Calendar',
      period: formatEnglishRange('2026.01.01', '2026.01.14'),
      role: 'Service Planning',
      skills: 'Figma',
      description: 'An idea proposal for the Korea Health Information Service app "My Health Records"',
    },
  ],
}

function toAboutProjectItem(project: ProjectPageProject): AboutProjectItem {
  return {
    id: project.id,
    category: 'Project',
    title: project.title,
    period: project.period,
    role: project.role,
    skills: project.stacks,
    description: project.summary,
    ...(project.imageSrc ? { imageSrc: project.imageSrc } : {}),
    ...(project.backgroundUrl ? { backgroundUrl: project.backgroundUrl } : {}),
    coverLabel: project.coverLabel,
    coverGradientFrom: project.coverGradientFrom,
    coverGradientTo: project.coverGradientTo,
  }
}

export const projectItemsByLanguage: Record<LanguageCode, AboutProjectItem[]> = {
  ko: projectsByLanguage.ko.map(toAboutProjectItem),
  en: projectsByLanguage.en.map(toAboutProjectItem),
}

export const aboutSectionHeaders: Record<
  LanguageCode,
  {
    education: AboutSectionHeader
    awards: AboutSectionHeader
    projects: AboutSectionHeader
    skills: AboutSectionHeader
  }
> = {
  ko: {
    education: {
      primary: '교육사항',
      secondary: 'Education',
      description:
        '기술을 익히는 과정에서 단순 구현을 넘어서, 실제 사용자에게 어떤 경험을 줄 수 있는지 고민하며 학습해왔습니다.',
    },
    awards: {
      primary: '수상내역',
      secondary: 'Awards',
      description:
        '문제를 정의하고 해결 방향을 설계한 뒤, 결과로 증명해낸 과정들을 정리했습니다.',
    },
    projects: {
      primary: '프로젝트',
      secondary: 'Projects',
      description:
        '각 프로젝트 카드를 클릭하면 어떤 문제를 어떤 방식으로 풀어냈는지 자세히 볼 수 있습니다.',
    },
    skills: {
      primary: '기술 스택',
      secondary: 'Skills',
      description:
        '단순한 사용 경험을 넘어 실제 화면 구성과 협업 과정에서 자주 활용하는 기술 중심으로 정리했습니다.',
    },
  },
  en: {
    education: {
      primary: 'Education',
      secondary: '교육사항',
      description:
        'I approached learning beyond implementation, with a focus on what kind of experience technology can deliver to real users.',
    },
    awards: {
      primary: 'Awards',
      secondary: '수상내역',
      description:
        'These are the outcomes that reflect how I defined problems, shaped solutions, and proved the results through execution.',
    },
    projects: {
      primary: 'Projects',
      secondary: '프로젝트',
      description:
        'Browse the project cards to see how each problem was approached and translated into product decisions.',
    },
    skills: {
      primary: 'Skills',
      secondary: '사용 가능 기술 스택',
      description:
        'This is a focused set of tools I use frequently in real product work, from interface implementation to collaboration.',
    },
  },
}

export const skillGroups = [
  {
    title: 'Frontend Core',
    items: ['React', 'Vue.js', 'Next.js', 'Vite', 'HTML', 'JavaScript', 'TypeScript'],
  },
  {
    title: 'State & Styling',
    items: ['Zustand', 'Bootstrap CSS', 'Tailwind CSS', 'Figma'],
  },
  {
    title: 'Backend & API',
    items: ['Python', 'Django', 'REST API', 'Swagger', 'Postman'],
  },
  {
    title: 'Database',
    items: ['SQLite3', 'MySQL'],
  },
  {
    title: 'Mobile',
    items: ['Android Studio', 'Kotlin', 'React Native'],
  },
  {
    title: 'Desktop App',
    items: ['Electron'],
  },
  {
    title: 'Version Control',
    items: ['Git', 'GitHub', 'GitLab'],
  },
  {
    title: 'Collaboration',
    items: ['Jira', 'Notion', 'Mattermost', 'Microsoft Teams'],
  },
  {
    title: 'Deployment',
    items: ['Vercel'],
  },
]

export const strengthCards = [
  { image: customerCard, alt: 'Customer strength card' },
  { image: tenacityCard, alt: 'Tenacity strength card' },
  { image: cooperationCard, alt: 'Cooperation strength card' },
  { image: dataCard, alt: 'Data strength card' },
  { image: solvingCard, alt: 'Solving strength card' },
]
