import type { LanguageCode } from '../hooks/useLanguage'

export type ExperienceCategory = 'education' | 'training' | 'award' | 'project' | 'career'

export type ExperienceTimelineItem = {
  id: string
  period: string
  category: ExperienceCategory
  title: string
  meta: string
  details: string[]
}

type ExperiencesPageContent = {
  eyebrow: string
  description: string
  items: ExperienceTimelineItem[]
  categoryLabels: Record<ExperienceCategory, string>
}

export const experiencesPageContentByLanguage: Record<LanguageCode, ExperiencesPageContent> = {
  ko: {
    eyebrow: 'Experiences',
    description:
      '프로젝트, 수상, 교육, 실무를 지나오며 어떤 문제를 만나고 어떻게 풀어왔는지 시간순으로 정리했습니다.',
    categoryLabels: {
      education: '학력',
      training: '교육',
      award: '수상',
      project: '프로젝트',
      career: '경력',
    },
    items: [
      {
        id: 'award-2018',
        period: '2018.08',
        category: 'award',
        title: '활동우수상 - 후원개발부문',
        meta: '메이크어위시 코리아',
        details: [
          '레고코리아 협업 후원개발 활동 수행 및 활동우수상 수상',
          '공익 프로젝트 내 실행력과 전달 구조 중요성 체득',
        ],
      },
      {
        id: 'award-2020-iksan',
        period: '2020.06',
        category: 'award',
        title: '익산 중심 관광 활성화 공모전 동상',
        meta: '관광경영학회 · 익산문화관광재단',
        details: [
          '지역 관광 활성화 문제 기반 아이디어 기획 및 공모전 제안',
          '실제 지역 이슈에 서비스 기획 관점 적용',
        ],
      },
      {
        id: 'award-2020-busan',
        period: '2020.12',
        category: 'award',
        title: '대한민국 관광 활성화 공모전 은상',
        meta: '관광경영학회 · GKL사회공헌재단',
        details: [
          '부산 관광 활성화 아이디어 제안 및 은상 수상',
          '사용자 관점 문제 재정의와 설득 구조 정리 경험 축적',
        ],
      },
      {
        id: 'award-2021-presentation',
        period: '2021.01',
        category: 'award',
        title: 'BEST Presenter 수상',
        meta: 'Dong-A Leadership Camp',
        details: [
          'BEST Presenter 수상 및 발표 중심 전달 역량 강화',
          '아이디어 전달 구조 명확성의 중요성 체감',
        ],
      },
      {
        id: 'education-2022',
        period: '2022.02',
        category: 'education',
        title: '동아대학교 전자공학과 졸업업',
        meta: 'Electronic Engineering, Dong-A University',
        details: [
          '공학적 사고 기반 시스템 구조 이해 역량 확보',
          '서비스와 화면 구조 설계에 구조적 관점 적용',
        ],
      },
      {
        id: 'training-2025',
        period: '2025.01 - 2025.12',
        category: 'training',
        title: 'Samsung Youth SW·AI Academy 수료 과정',
        meta: 'Python · JavaScript · Web · Database · Team Project',
        details: [
          'Python, JavaScript, Web, Database, Team Project 중심 집중 학습',
          '개발 역량과 협업 경험 기반 제품 경험 설계 기준 구체화',
        ],
      },
      {
        id: 'project-2025-reading-temperature',
        period: '2025.05',
        category: 'project',
        title: '서재의 온도 프로젝트 및 우수상',
        meta: 'Integrated Project · Reading Temperature',
        details: [
          'AI 기반 독서 경험 공유 플랫폼 설계 및 구현',
          '짧고 자연스러운 기록 흐름 중심 UI/UX 방향 검증',
        ],
      },
      {
        id: 'project-2025-stalk',
        period: '2025.08',
        category: 'project',
        title: 'Stalk 프로젝트 및 우수상',
        meta: 'Common Project · WebRTC Stock Consulting Platform',
        details: [
          '실시간 영상 상담과 차트 인터랙션 통합 경험 설계',
          '복잡한 상태 전환의 사용자 관점 재구조화',
        ],
      },
      {
        id: 'project-2025-insite',
        period: '2025.09',
        category: 'project',
        title: 'Insite 프로젝트 및 우수상',
        meta: 'Specialized Project · Big Data Recommendation',
        details: [
          '복잡한 상권 데이터의 비교·추천 흐름 재구조화',
          '고정보량 서비스 내 판단 흐름 명확화 방식 정립',
        ],
      },
      {
        id: 'project-2025-namuh',
        period: '2025.11 - 2025.12',
        category: 'project',
        title: 'NAMUH 프로젝트 최우수상 및 발표 결선',
        meta: 'Autonomous Project · AIoT',
        details: [
          '정서적으로 민감한 맥락의 인터페이스 단순화 및 톤 설계',
          '제품 톤과 사용자 흐름 동시 조정 역량 강화',
        ],
      },
      {
        id: 'career-2026-busan-regional-aviation',
        period: '2026.03.03 - 현재',
        category: 'career',
        title: '부산지방항공청 청년인턴 근무',
        meta: 'Busan Regional Office of Aviation · Youth Intern',
        details: [
          'Air-PASS(행정과태료 업무 자동화 시스템) 기획 및 개발',
          '사무행정보조 및 공공행정 업무 흐름 실무 경험',
        ],
      },
    ],
  },
  en: {
    eyebrow: 'Experiences',
    description:
      'This timeline shows how I approached problems across projects, awards, education, and real work over time.',
    categoryLabels: {
      education: 'Education',
      training: 'Training',
      award: 'Award',
      project: 'Project',
      career: 'Career',
    },
    items: [
      {
        id: 'award-2018',
        period: 'August 2018',
        category: 'award',
        title: 'Outstanding Activity Award - Fundraising Development',
        meta: 'Make-A-Wish Korea',
        details: [
          'Received recognition for fundraising development work in a public-interest project.',
          'Learned that execution and communication structure matter just as much as the idea itself.',
        ],
      },
      {
        id: 'award-2020-iksan',
        period: 'June 2020',
        category: 'award',
        title: 'Bronze Prize in the Iksan Tourism Revitalization Contest',
        meta: 'Tourism Management Society · Iksan Culture and Tourism Foundation',
        details: [
          'Turned a regional tourism issue into a structured contest proposal.',
          'Built early practice in framing service ideas around real-world contexts.',
        ],
      },
      {
        id: 'award-2020-busan',
        period: 'December 2020',
        category: 'award',
        title: 'Silver Prize in the Korea Tourism Revitalization Contest',
        meta: 'Tourism Management Society · GKL Social Contribution Foundation',
        details: [
          'Won a silver prize with a tourism revitalization proposal for Busan.',
          'Refined how I reframe problems from a user perspective and organize them persuasively.',
        ],
      },
      {
        id: 'award-2021-presentation',
        period: 'January 2021',
        category: 'award',
        title: 'BEST Presenter Award',
        meta: 'Dong-A Leadership Camp',
        details: [
          'Received recognition for presentation-driven storytelling and clarity.',
          'This experience reinforced that strong ideas need an equally strong explanation structure.',
        ],
      },
      {
        id: 'education-2022',
        period: 'February 2022',
        category: 'education',
        title: 'Graduated in Electronic Engineering',
        meta: 'Dong-A University',
        details: [
          'Built a structural understanding of systems through engineering training.',
          'That mindset still informs how I design services and interfaces today.',
        ],
      },
      {
        id: 'training-2025',
        period: 'January 2025 - December 2025',
        category: 'training',
        title: 'Samsung Youth SW·AI Academy',
        meta: 'Python · JavaScript · Web · Database · Team Project',
        details: [
          'Completed intensive training across Python, JavaScript, web, databases, and team projects.',
          'This was the turning point where implementation, collaboration, and product experience design became one working standard.',
        ],
      },
      {
        id: 'project-2025-reading-temperature',
        period: 'May 2025',
        category: 'project',
        title: 'Reading Temperature Project and Excellence Award',
        meta: 'Integrated Project · Reading Temperature',
        details: [
          'Designed and built an AI-assisted platform for sharing reading experiences.',
          'Validated how to make reflective writing flows shorter and more natural.',
        ],
      },
      {
        id: 'project-2025-stalk',
        period: 'August 2025',
        category: 'project',
        title: 'Stalk Project and Excellence Award',
        meta: 'Common Project · WebRTC Stock Consulting Platform',
        details: [
          'Designed a flow that connected live consultation and chart interaction in real time.',
          'Strengthened how I organize complex state transitions around user flow.',
        ],
      },
      {
        id: 'project-2025-insite',
        period: 'September 2025',
        category: 'project',
        title: 'Insite Project and Excellence Award',
        meta: 'Specialized Project · Big Data Recommendation',
        details: [
          'Restructured dense commercial-area data into comparison and recommendation flows.',
          'Sharpened my ability to support faster decisions through clearer information structure.',
        ],
      },
      {
        id: 'project-2025-namuh',
        period: 'November 2025 - December 2025',
        category: 'project',
        title: 'NAMUH Grand Prize and Final Presentation',
        meta: 'Autonomous Project · AIoT',
        details: [
          'Designed a calmer interface for an emotionally sensitive product context.',
          'Clarified how tone, clarity, and flow need to work together in this kind of service.',
        ],
      },
      {
        id: 'career-2026-busan-regional-aviation',
        period: 'March 3, 2026 - Present',
        category: 'career',
        title: 'Youth Intern at the Busan Regional Office of Aviation',
        meta: 'Busan Regional Office of Aviation',
        details: [
          'Working on the planning and development of Air-PASS, an administrative penalty workflow automation system.',
          'Supporting office administration tasks within a real public-sector environment.',
        ],
      },
    ],
  },
}
