import type { LanguageCode } from '../hooks/useLanguage'
import airPassCoverImage from '../assets/projects/cover-imeges/Air-PASS-coverimage.png'
import healthCalendarCoverImage from '../assets/projects/cover-imeges/Health-Calendar-coverimage.png'
import hotelWellnessButlerCoverImage from '../assets/projects/cover-imeges/HotelWellnessButler-coverimage.png'
import linBookCoverImage from '../assets/projects/cover-imeges/LinBook-coverimage.png'
import insiteCoverImage from '../assets/projects/cover-imeges/Insite-coveriamge.png'
import namuhCoverImage from '../assets/projects/cover-imeges/NAMUH-coverimage.png'
import airPassHomeImage from '../assets/projects/detail-imeges/air-pass/Air-PASS-Home.png'
import airPassManagementImage from '../assets/projects/detail-imeges/air-pass/Air-PASS-Managemanet.png'
import airPassReportImage from '../assets/projects/detail-imeges/air-pass/Air-PASS-Report.png'
import hotelWellnessButlerCallImage from '../assets/projects/detail-imeges/hotelwellnessbutler/HotelWellnessButler-Call.png'
import hotelWellnessButlerHomeImage from '../assets/projects/detail-imeges/hotelwellnessbutler/HotelWellnessButler-Home.png'
import hotelWellnessButlerRoomImage from '../assets/projects/detail-imeges/hotelwellnessbutler/HotelWellnessButler-Room.png'
import shinhanfriendsVideo from '../assets/projects/videos/shinhanfriends-vedio.mp4'
import airplaneVideo from '../assets/projects/videos/airplane-video.mp4'
import namuhVideo from '../assets/projects/videos/namuh-video.web.mp4'
import cafeVideo from '../assets/projects/videos/cafe-video.mp4'
import hotelroomVideo from '../assets/projects/videos/hotelroom-video.mp4'
import libraryVideo from '../assets/projects/videos/library-video.mp4'
import stockVideo from '../assets/projects/videos/stock-video.mp4'
import calendarVideo from '../assets/projects/videos/calendar-video.mp4'

const airPassDownloadUrl = new URL('../assets/projects/files/Air-PASS.exe', import.meta.url).href

export type ProjectSortKey = 'latest' | 'oldest' | 'importance'
export type ProjectType = 'individual' | 'team'

export type ProjectGallerySlide = {
  id: string
  title: string
  description: string
  imageSrc?: string
}

export type ProjectPageProject = {
  id: string
  title: string
  period: string
  startedAt: string
  endedAt: string
  role: string
  summary: string
  introduction: string
  features: string[]
  troubleshooting: string | string[]
  results?: string[]
  stacks: string[]
  contribution: string | string[]
  contributionRate: number
  type: ProjectType
  teamSize?: number
  hasAward?: boolean
  importance: number
  gallery?: ProjectGallerySlide[]
  githubUrl?: string
  websiteUrl?: string
  downloadUrl?: string
  isFeatured?: boolean
  imageSrc?: string
  backgroundUrl?: string
  coverLabel: string
  coverGradientFrom: string
  coverGradientTo: string
}

export type ProjectCopyLabels = {
  period: string
  role: string
  contribution: string
  github: string
  website: string
  download: string
  mission: string
  stack: string
  introduction: string
  features: string
  troubleshooting: string
  result?: string
  personal: string
  team: string
}

type ProjectsPageCopy = {
  eyebrow: string
  title: string
  description: string
  featuredLabel: string
  featuredDescription: string
  allProjectsLabel: string
  allProjectsDescription: string
  sortLabel: string
  sortOptions: Record<ProjectSortKey, string>
  labels: ProjectCopyLabels
}

export const projectsPageCopyByLanguage: Record<LanguageCode, ProjectsPageCopy> = {
  ko: {
    eyebrow: 'Projects',
    title: '가장 강조하고 싶은 프로젝트를 먼저 보여주고, 전체 프로젝트를 한눈에 정리합니다.',
    description:
      '대표 프로젝트는 핵심 기능과 트러블슈팅까지 깊게 보여주고, 아래 전체 프로젝트는 정렬과 이후 모달 확장을 고려한 구조로 구성했습니다.',
    featuredLabel: 'Main Project',
    featuredDescription: '대표 프로젝트의 주요 성과와 구현 포인트를 집중적으로 보여주는 영역입니다.',
    allProjectsLabel: 'All Projects',
    allProjectsDescription:
      '전체 프로젝트는 최신순, 오래된순, 중요도순으로 정렬할 수 있고, 모든 카드가 이후 모달 상세 보기를 고려한 동일한 데이터 구조를 가집니다.',
    sortLabel: '정렬',
    sortOptions: {
      latest: '최신순',
      oldest: '오래된순',
      importance: '중요도순',
    },
    labels: {
      period: '기간',
      role: '역할',
      contribution: '기여도',
      github: 'GitHub',
      website: 'URL',
      download: '다운로드',
      mission: '임무',
      stack: '기술 스택',
      introduction: '프로젝트 소개',
      features: '핵심 기능',
      troubleshooting: '트러블슈팅',
      personal: '개인 프로젝트',
      team: '팀 프로젝트',
    },
  },
  en: {
    eyebrow: 'Projects',
    title: 'Lead with the one project that matters most, then organize the full archive underneath.',
    description:
      'The featured block goes deeper into product value and troubleshooting, while the full project list is structured for sorting now and modal expansion later.',
    featuredLabel: 'Main Project',
    featuredDescription: 'A focused block for the project you want to emphasize the most.',
    allProjectsLabel: 'All Projects',
    allProjectsDescription:
      'The full list supports sorting by latest, oldest, and importance, and every card already carries the same detail structure needed for future modal views.',
    sortLabel: 'Sort',
    sortOptions: {
      latest: 'Latest',
      oldest: 'Oldest',
      importance: 'Importance',
    },
    labels: {
      period: 'Period',
      role: 'Role',
      contribution: 'Contribution',
      github: 'GitHub',
      website: 'URL',
      download: 'Download',
      mission: 'Mission',
      stack: 'Tech Stack',
      introduction: 'Overview',
      features: 'Key Features',
      troubleshooting: 'Troubleshooting',
      result: 'Outcome',
      personal: 'Personal Project',
      team: 'Team Project',
    },
  },
}

export const projectsByLanguage: Record<LanguageCode, ProjectPageProject[]> = {
  ko: [
    {
      id: 'air-pass',
      title: 'Air-PASS',
      period: '2026.03.03 - 현재',
      startedAt: '2026-03-03',
      endedAt: '2026-03-30',
      role: '서비스 기획, 업무 자동화 설계',
      summary: '행정과태료 처리 흐름을 더 빠르고 일관되게 만들기 위한 업무 자동화 시스템 프로젝트',
      introduction:
        '공공 행정 실무 환경에서 반복되는 과태료 업무 흐름을 더 정확하고 효율적으로 처리할 수 있도록, 절차 중심의 사용자 흐름과 업무 화면 구조를 정리한 프로젝트입니다.',
      features: [
        '행정과태료 업무 단계를 기준으로 정리한 프로세스 중심 화면 구조',
        '반복 입력과 확인 절차를 줄이기 위한 업무 흐름 단순화',
        '실무자가 현재 처리 상태를 빠르게 파악할 수 있는 단계별 정보 구성',
      ],
      troubleshooting:
        '공공 업무는 정확성과 절차 준수가 중요해서 단순히 화면을 줄이는 것만으로는 해결되지 않았습니다. 실무 흐름을 기준으로 입력, 검토, 처리 단계를 다시 나누고 각 단계에서 필요한 정보만 우선 노출하도록 구조를 재정리했습니다.',
      results: [
        '행정과태료 업무를 절차 중심으로 재구성한 서비스 흐름 초안을 만들었습니다.',
        '반복적인 실무 과정을 더 명확하게 처리할 수 있는 화면 구조 방향을 정리했습니다.',
      ],
      stacks: ['Figma', 'Workflow Design', 'Service Planning'],
      contribution: '업무 흐름 분석과 화면 구조 설계 중심으로 프로젝트 방향을 구체화하고 있습니다.',
      contributionRate: 70,
      type: 'team',
      importance: 110,
      githubUrl: 'https://github.com/Phangmin/Air-PASS',
      websiteUrl: '',
      downloadUrl: airPassDownloadUrl,
      backgroundUrl: airplaneVideo,
      gallery: [
        {
          id: 'air-pass-flow',
          title: '업무 절차 중심 구조',
          description: '실무 처리 순서에 맞춰 입력, 검토, 처리 단계가 자연스럽게 이어지도록 화면 흐름을 설계했습니다.',
          imageSrc: airPassHomeImage,
        },
        {
          id: 'air-pass-state',
          title: '상태 파악을 위한 정보 계층',
          description: '현재 어떤 업무 단계에 있는지 빠르게 확인할 수 있도록 상태 정보와 핵심 액션의 우선순위를 조정했습니다.',
          imageSrc: airPassManagementImage,
        },
        {
          id: 'air-pass-efficiency',
          title: '반복 업무 단순화',
          description: '반복 입력과 확인 절차를 줄이는 방향으로 업무 자동화 경험을 정리하고 있습니다.',
          imageSrc: airPassReportImage,
        },
      ],
      isFeatured: true,
      imageSrc: airPassCoverImage,
      coverLabel: 'AP',
      coverGradientFrom: '#dbeafe',
      coverGradientTo: '#06b6d4',
    },
    {
      id: 'stalk',
      title: 'Stalk',
      period: '2025.07.01 - 2025.08.15',
      startedAt: '2025-07-01',
      endedAt: '2025-08-15',
      role: '프론트엔드, UI/UX 설계',
      summary: 'WebRTC 기반 양방향 주식 상담 경험을 설계한 실시간 컨설팅 플랫폼',
      introduction:
        '실시간 영상 상담과 차트 드로잉을 하나의 흐름으로 연결해, 상담사와 사용자가 같은 맥락에서 빠르게 의사결정을 내릴 수 있도록 설계한 프로젝트입니다.',
      features: [
        'WebRTC 기반 양방향 화상 상담 인터페이스',
        '종목 차트 위 드로잉과 메모를 결합한 상담 화면',
        '상담 흐름이 끊기지 않도록 상태 전환과 액션 우선순위를 정리한 UI',
      ],
      troubleshooting:
        '실시간 영상과 차트 인터랙션이 동시에 일어날 때 화면 우선순위가 충돌하는 문제가 있어, 상담 흐름을 기준으로 패널 계층과 상태 표시 로직을 다시 설계해 사용자가 현재 맥락을 잃지 않도록 정리했습니다.',
      results: [
        '실시간 상담과 차트 인터랙션을 하나의 흐름으로 통합한 화면 구조를 구축했습니다.',
        '상담 중 맥락 전환 비용을 줄이는 UI/UX 방향을 팀 내 기준안으로 정리했습니다.',
      ],
      stacks: ['React', 'Tailwind CSS', 'Vite', 'Zustand', 'MySQL', 'Figma'],
      contribution: '프론트엔드 화면 설계와 주요 상담 플로우 구현을 주도했습니다.',
      contributionRate: 45,
      type: 'team',
      teamSize: 6,
      hasAward: true,
      importance: 100,
      githubUrl: 'https://github.com/Phangmin/Stalk',
      websiteUrl: '',
      downloadUrl: '',
      backgroundUrl: stockVideo,
      gallery: [
        {
          id: 'stalk-live-room',
          title: '실시간 상담 화면',
          description: '상담사와 사용자가 같은 흐름 안에서 바로 대화와 확인을 이어갈 수 있도록 정리한 메인 화면입니다.',
        },
        {
          id: 'stalk-chart-drawing',
          title: '차트 드로잉 인터랙션',
          description: '종목 차트 위에 바로 메모하고 강조할 수 있도록 상담 맥락 중심으로 인터랙션을 설계했습니다.',
        },
        {
          id: 'stalk-guidance-flow',
          title: '상담 맥락 유지 구조',
          description: '영상, 차트, 안내 요소가 동시에 보여도 사용자가 현재 상태를 잃지 않도록 정보 계층을 재정리했습니다.',
        },
      ],
      coverLabel: 'ST',
      coverGradientFrom: '#dbeafe',
      coverGradientTo: '#60a5fa',
    },
    {
      id: 'reading-temperature',
      title: '서재의 온도',
      period: '2025.05.26 - 2025.05.31',
      startedAt: '2025-05-26',
      endedAt: '2025-05-31',
      role: '풀스택, UI/UX 설계',
      summary: 'AI를 활용해 독서 경험을 기록하고 공유하는 독서 플랫폼',
      introduction:
        '사용자가 자신의 독서 경험을 부담 없이 남기고, 다른 사람의 기록과 자연스럽게 연결될 수 있도록 구성한 독서 공유 서비스입니다.',
      features: [
        'AI 기반 감상 요약과 문장 정리 흐름',
        '독서 기록 작성과 공유를 연결하는 피드 구조',
        '가볍게 참여할 수 있는 감상 카드 중심 인터페이스',
      ],
      troubleshooting:
        '기록 작성 단계가 길어질수록 이탈이 커지는 문제가 있어 입력 흐름을 단계별 카드로 쪼개고, 작성 중인 상태를 시각적으로 유지하도록 재구성했습니다.',
      results: [
        'AI 기반 독서 기록 경험을 짧은 입력 흐름으로 재구성했습니다.',
        '프로젝트 완성도와 발표력을 인정받아 공통 프로젝트 우수상을 수상했습니다.',
      ],
      stacks: ['Django', 'Vue.js', 'Bootstrap CSS', 'Vite', 'Zustand', 'SQLite3', 'Figma'],
      contribution: '서비스 흐름 설계와 프론트엔드 구현, 백엔드 연동을 함께 진행했습니다.',
      contributionRate: 55,
      type: 'team',
      teamSize: 2,
      hasAward: true,
      importance: 84,
      githubUrl: 'https://github.com/Phangmin/BookTemperature',
      websiteUrl: '',
      downloadUrl: '',
      backgroundUrl: libraryVideo,
      coverLabel: 'RT',
      coverGradientFrom: '#fef3c7',
      coverGradientTo: '#f59e0b',
    },
    {
      id: 'lin-book',
      title: 'Lin. Book',
      period: '2025.08.12 - 2025.08.31',
      startedAt: '2025-08-12',
      endedAt: '2025-08-31',
      role: '프론트엔드, UI/UX 설계',
      summary: '공동 계좌 기반으로 동아리 회계를 투명하게 관리하는 플랫폼',
      introduction:
        '동아리 운영에서 반복되는 회계 혼선을 줄이기 위해 사용 흐름을 단순화하고, 기록과 확인 과정이 빠르게 이어지도록 만든 서비스입니다.',
      features: [
        '지출 내역과 승인 흐름을 한 화면에서 확인하는 구조',
        '회계 담당자와 구성원의 시점을 분리한 정보 설계',
        '반복 입력을 줄이기 위한 정산 템플릿 인터페이스',
      ],
      troubleshooting:
        '사용자마다 필요한 정보의 깊이가 달라 한 화면에 모든 정보를 넣으면 복잡해졌기 때문에, 역할별 우선 정보를 다시 정의하고 상세 정보는 단계적으로 확장되도록 정리했습니다.',
      results: [
        '공동 계좌 기반 회계 흐름을 역할 중심으로 다시 설계했습니다.',
        '복잡한 사용 시나리오를 단계형 정보 구조로 정리했습니다.',
      ],
      stacks: ['Android Studio', 'Django', 'Tailwind CSS', 'Vite', 'Zustand', 'MySQL', 'Figma'],
      contribution: '주요 사용자 흐름 정리와 프론트엔드 인터랙션 구현을 맡았습니다.',
      contributionRate: 40,
      type: 'team',
      teamSize: 5,
      importance: 76,
      githubUrl: 'https://github.com/Phangmin/LinBook',
      websiteUrl: '',
      downloadUrl: '',
      imageSrc: linBookCoverImage,
      backgroundUrl: shinhanfriendsVideo,
      coverLabel: 'LB',
      coverGradientFrom: '#e0e7ff',
      coverGradientTo: '#818cf8',
    },
    {
      id: 'insite',
      title: 'Insite',
      period: '2025.08.17 - 2025.09.30',
      startedAt: '2025-08-17',
      endedAt: '2025-09-30',
      role: 'PM, 프론트엔드, UI/UX 설계',
      summary: '서울 카페 상권을 비교·분석·추천하는 데이터 기반 탐색 서비스',
      introduction:
        '복잡한 상권 데이터를 예비 창업자가 이해하기 쉬운 화면 구조로 재정리하고, 탐색과 비교의 부담을 줄이는 데 집중한 프로젝트입니다.',
      features: [
        '지역별 상권 비교와 추천 흐름',
        '핵심 지표를 먼저 보여주는 카드형 대시보드',
        '탐색 결과를 빠르게 좁혀가는 필터 인터랙션',
      ],
      troubleshooting:
        '데이터량이 많아질수록 첫 화면에서 정보가 과하게 쏟아지는 문제가 있어, 사용자의 의사결정 순서에 맞춰 지표 노출 우선순위와 카드 구성 방식을 재정의했습니다.',
      results: [
        '복잡한 상권 데이터를 빠르게 비교할 수 있는 탐색 경험으로 정리했습니다.',
        '빅데이터 추천 특화 프로젝트 우수상을 수상했습니다.',
      ],
      stacks: ['Next.js', 'Tailwind CSS', 'Vite', 'Zustand', 'MySQL', 'Figma'],
      contribution: '서비스 방향 설정, 화면 구조 설계, 프론트엔드 구현을 함께 리드했습니다.',
      contributionRate: 60,
      type: 'team',
      teamSize: 6,
      hasAward: true,
      importance: 94,
      githubUrl: 'https://github.com/Phangmin/Insite',
      websiteUrl: '',
      downloadUrl: '',
      backgroundUrl: cafeVideo,
      imageSrc: insiteCoverImage,
      coverLabel: 'IN',
      coverGradientFrom: '#dcfce7',
      coverGradientTo: '#22c55e',
    },
    {
      id: 'namuh',
      title: 'NAMUH',
      period: '2025.10.01 - 2025.11.30',
      startedAt: '2025-10-01',
      endedAt: '2025-11-30',
      role: '프론트엔드, UI/UX 설계',
      summary: '사회적 단절을 겪는 소아암 환아를 위한 휴머노이드 로봇 연계 프로젝트',
      introduction:
        '정서적 연결이 필요한 상황에서 로봇 인터페이스와 사용자 경험을 어떻게 단순하게 전달할지에 초점을 맞춰 구성한 프로젝트입니다.',
      features: [
        '환아와 보호자가 쉽게 이해할 수 있는 단순한 조작 흐름',
        '정서적 부담을 줄이기 위한 친화적 인터페이스',
        '연계 디바이스와 서비스 동작 상태를 명확하게 보여주는 피드백 구조',
      ],
      troubleshooting:
        '정서적 맥락이 중요한 서비스라 기능 설명이 길어질수록 오히려 부담이 커져, 조작 단계를 줄이고 피드백 메시지를 더 직관적인 문장으로 재설계했습니다.',
      results: [
        '감정적으로 민감한 맥락에서도 이해하기 쉬운 인터페이스 방향을 정립했습니다.',
        'AIoT 자율 프로젝트 최우수상을 수상했습니다.',
      ],
      stacks: ['React', 'Tailwind CSS', 'Vite', 'Zustand', 'MySQL', 'Figma'],
      contribution: '프론트엔드 구현과 감성 톤에 맞춘 화면 흐름 설계를 담당했습니다.',
      contributionRate: 42,
      type: 'team',
      teamSize: 6,
      hasAward: true,
      importance: 72,
      githubUrl: 'https://github.com/Phangmin/NAMUH',
      websiteUrl: '',
      downloadUrl: '',
      backgroundUrl: namuhVideo,
      imageSrc: namuhCoverImage,
      coverLabel: 'NA',
      coverGradientFrom: '#fee2e2',
      coverGradientTo: '#f87171',
    },
    {
      id: 'hotel-wellness-butler',
      title: 'Hotel Wellness Butler',
      period: '2025.11.01 - 2025.12.01',
      startedAt: '2025-11-01',
      endedAt: '2025-12-01',
      role: '서비스 기획, UI/UX 설계',
      summary: 'SK Intelix의 A1 서비스를 200% 활용한 호텔 웰니스 프로젝트',
      introduction:
        '호텔 공간 안에서 고객의 웰니스 경험을 끊김 없이 연결할 수 있도록 서비스 흐름과 접점 화면을 기획한 프로젝트',
      features: [
        '미로같은 복도에서 투숙객이 길을 잃지 않도록 객실을 안내하는 기능',
        '5성급 호텔 객실 스마트화의 시작을 알리는 투숙객 객실 웰컴 모드 서비스',
        '투숙객의 건강정보와 스케줄을 고려해 온습도·조명·커튼·음악 제어를 통한 9가지 사용모드',
      ],
      troubleshooting:
        '실현 가능성과 현장 접목성 그리고 법적 문제(개인정보침해우려, 사생활보호 등)를 고려한 서비스 제안',
      results: [
        '호텔 시스템 연계를 통한 시설 내 A1 서비스 일괄 관리 플로우 및 서비스 제안',
        '기존 A1 서비스의 고도화 및 활용성을 높인 기능 제안',
      ],
      stacks: ['Figma'],
      contribution: '투숙객의 객실 이용 흐름과 편의성을 고려한 서비스 흐름 설계',
      contributionRate: 50,
      type: 'team',
      teamSize: 2,
      importance: 64,
      githubUrl: '',
      websiteUrl: '',
      downloadUrl: '',
      backgroundUrl: hotelroomVideo,
      gallery: [
        {
          id: 'hotel-wellness-butler-home',
          title: '웰니스 서비스 홈',
          description: '호텔 웰니스 서비스의 전체 톤과 핵심 진입 경험을 빠르게 이해할 수 있도록 구성한 메인 화면입니다.',
          imageSrc: hotelWellnessButlerHomeImage,
        },
        {
          id: 'hotel-wellness-butler-room',
          title: '객실 경험 연계',
          description: '객실 내 접점에서도 서비스 흐름이 끊기지 않도록 웰니스 여정을 연결하는 화면입니다.',
          imageSrc: hotelWellnessButlerRoomImage,
        },
        {
          id: 'hotel-wellness-butler-call',
          title: '컨시어지 호출 흐름',
          description: '고객 요청과 호텔 응대 접점이 자연스럽게 이어지도록 서비스 호출 흐름을 제안형 UX로 정리했습니다.',
          imageSrc: hotelWellnessButlerCallImage,
        },
      ],
      imageSrc: hotelWellnessButlerCoverImage,
      coverLabel: 'HW',
      coverGradientFrom: '#fae8ff',
      coverGradientTo: '#d946ef',
    },
    {
      id: 'my-health-calendar',
      title: 'My Health Calendar',
      period: '2026.01.01 - 2026.01.14',
      startedAt: '2026-01-01',
      endedAt: '2026-01-14',
      role: '서비스 기획',
      summary: '건강 기록을 더 쉽게 남기도록 돕는 헬스케어 캘린더 제안',
      introduction:
        '공공 의료정보 서비스 안에서 사용자가 자신의 건강 기록을 더 쉽게 남기고 되돌아볼 수 있도록 캘린더 중심의 경험을 제안한 프로젝트입니다.',
      features: [
        '일정과 건강 기록을 한 맥락으로 보는 캘린더 구조',
        '반복 입력 부담을 줄이는 기록 흐름',
        '장기적으로 건강 패턴을 확인할 수 있는 시각화 아이디어',
      ],
      troubleshooting:
        '의료 정보 서비스는 정보 신뢰성과 단순함을 동시에 가져가야 해서, 과한 기능 확장 대신 사용자가 바로 이해할 수 있는 기록 흐름에 집중해 구조를 정리했습니다.',
      results: [
        '건강 기록을 캘린더 중심으로 통합하는 서비스 컨셉을 독립적으로 구체화했습니다.',
        '공공 의료 정보 서비스에 확장 가능한 사용자 흐름 초안을 만들었습니다.',
      ],
      stacks: ['Figma'],
      contribution: '서비스 아이디어 정의와 사용자 흐름 기획을 단독으로 진행했습니다.',
      contributionRate: 100,
      type: 'individual',
      importance: 68,
      githubUrl: '',
      websiteUrl: '',
      downloadUrl: '',
      imageSrc: healthCalendarCoverImage,
      backgroundUrl: calendarVideo,
      coverLabel: 'MH',
      coverGradientFrom: '#dbeafe',
      coverGradientTo: '#38bdf8',
    },
  ],
  en: [
    {
      id: 'air-pass',
      title: 'Air-PASS',
      period: 'March 3, 2026 - Present',
      startedAt: '2026-03-03',
      endedAt: '2026-03-30',
      role: 'Service Planning, Workflow Design',
      summary:
        'A workflow automation system project designed to make administrative penalty processing faster and more consistent.',
      introduction:
        'This project focuses on organizing a procedure-centered service flow for real public-sector work, helping repetitive administrative penalty tasks become clearer, more efficient, and easier to manage accurately.',
      features: [
        'A process-first interface structured around each administrative penalty step',
        'A simplified workflow that reduces repeated input and review effort',
        'A staged information layout that helps staff understand current processing status quickly',
      ],
      troubleshooting:
        'Because public-sector operations require both accuracy and procedural clarity, reducing screen count alone was not enough. I reorganized the structure around input, review, and processing stages so each step surfaces only the information needed at that moment.',
      results: [
        'Defined a procedure-centered service flow for administrative penalty work.',
        'Established a clearer screen structure for handling repetitive operational tasks.',
      ],
      stacks: ['Figma', 'Workflow Design', 'Service Planning'],
      contribution: 'I am shaping the project direction through workflow analysis and screen-structure planning.',
      contributionRate: 70,
      type: 'team',
      importance: 110,
      githubUrl: '',
      websiteUrl: '',
      downloadUrl: airPassDownloadUrl,
      backgroundUrl: airplaneVideo,
      gallery: [
        {
          id: 'air-pass-flow',
          title: 'Procedure-Centered Flow',
          description: 'The screen flow is structured so input, review, and processing steps follow the real working order naturally.',
          imageSrc: airPassHomeImage,
        },
        {
          id: 'air-pass-state',
          title: 'Status-First Information Hierarchy',
          description: 'I adjusted content priority so staff can quickly understand the current task stage and next action.',
          imageSrc: airPassManagementImage,
        },
        {
          id: 'air-pass-efficiency',
          title: 'Repeated Task Simplification',
          description: 'The workflow is being organized to reduce repeated checks and manual entry in day-to-day operations.',
          imageSrc: airPassReportImage,
        },
      ],
      isFeatured: true,
      imageSrc: airPassCoverImage,
      coverLabel: 'AP',
      coverGradientFrom: '#dbeafe',
      coverGradientTo: '#06b6d4',
    },
    {
      id: 'stalk',
      title: 'Stalk',
      period: 'July 1, 2025 - August 15, 2025',
      startedAt: '2025-07-01',
      endedAt: '2025-08-15',
      role: 'Front-end, UI/UX Design',
      summary: 'A real-time consulting platform that combined WebRTC video sessions with stock chart collaboration.',
      introduction:
        'This project focused on connecting live video consulting and chart interaction into one decision-making flow, so both the advisor and the user could stay aligned in real time.',
      features: [
        'Two-way video consulting interface built around WebRTC',
        'Shared chart drawing and memo interaction during live sessions',
        'A UI flow that prioritized context and action order during consultation',
      ],
      troubleshooting:
        'Video, chart interaction, and guidance UI competed for attention on the same screen. I restructured visual hierarchy and state cues around the consultation flow so users would not lose context while interacting in real time.',
      results: [
        'Built a screen structure that unified live consultation and chart interaction into one flow.',
        'Established a UI/UX direction that reduced context switching during real-time consulting.',
      ],
      stacks: ['React', 'Tailwind CSS', 'Vite', 'Zustand', 'MySQL', 'Figma'],
      contribution: 'Led the front-end interaction design and implemented the core consultation experience.',
      contributionRate: 45,
      type: 'team',
      teamSize: 6,
      hasAward: true,
      importance: 100,
      githubUrl: '',
      websiteUrl: '',
      downloadUrl: '',
      backgroundUrl: stockVideo,
      gallery: [
        {
          id: 'stalk-live-room',
          title: 'Live Consultation Screen',
          description: 'The main view was structured so the advisor and user could move through the same context without losing pace.',
        },
        {
          id: 'stalk-chart-drawing',
          title: 'Chart Drawing Interaction',
          description: 'The chart interface was designed so annotations and visual guidance could happen directly inside the consultation flow.',
        },
        {
          id: 'stalk-guidance-flow',
          title: 'Context-Preserving Flow',
          description: 'I reorganized visual hierarchy so video, chart, and guidance elements could coexist without breaking the user’s focus.',
        },
      ],
      coverLabel: 'ST',
      coverGradientFrom: '#dbeafe',
      coverGradientTo: '#60a5fa',
    },
    {
      id: 'reading-temperature',
      title: 'Book Temperature',
      period: 'May 26, 2025 - May 31, 2025',
      startedAt: '2025-05-26',
      endedAt: '2025-05-31',
      role: 'Full-Stack, UI/UX Design',
      summary: 'An AI-assisted reading platform for capturing and sharing personal reading experiences.',
      introduction:
        'The service was designed to make reading reflections lightweight to write, easy to share, and naturally connected to other readers’ records.',
      features: [
        'AI-assisted reflection summaries and writing flow',
        'A feed structure for sharing reading records',
        'A lightweight card-based interface for low-friction participation',
      ],
      troubleshooting:
        'Drop-off increased whenever the writing flow felt too long. I broke the flow into smaller steps and made progress more visible so users could finish records with less friction.',
      results: [
        'Restructured the reading-record experience into a shorter, lower-friction flow.',
        'Received an excellence award for the project presentation and product execution.',
      ],
      stacks: ['Django', 'Vue.js', 'Bootstrap CSS', 'Vite', 'Zustand', 'SQLite3', 'Figma'],
      contribution: 'Worked across service flow design, front-end implementation, and back-end integration.',
      contributionRate: 55,
      type: 'team',
      teamSize: 2,
      hasAward: true,
      importance: 84,
      githubUrl: '',
      websiteUrl: '',
      downloadUrl: '',
      backgroundUrl: libraryVideo,
      coverLabel: 'RT',
      coverGradientFrom: '#fef3c7',
      coverGradientTo: '#f59e0b',
    },
    {
      id: 'lin-book',
      title: 'Lin. Book',
      period: 'August 12, 2025 - August 31, 2025',
      startedAt: '2025-08-12',
      endedAt: '2025-08-31',
      role: 'Front-end, UI/UX Design',
      summary: 'A club accounting platform built around transparent shared-account workflows.',
      introduction:
        'The goal was to reduce recurring accounting confusion in student groups by simplifying the flow and making records and approvals easier to follow.',
      features: [
        'Expense and approval flow visible in one place',
        'Information architecture separated by user role',
        'Templates for faster repetitive accounting tasks',
      ],
      troubleshooting:
        'Different users needed different levels of detail, and a single dense screen became hard to read. I reorganized the flow around role-based priorities and moved secondary detail into progressive layers.',
      results: [
        'Reframed the shared-account experience around role-based priorities.',
        'Reduced accounting complexity through a more staged information structure.',
      ],
      stacks: ['Android Studio', 'Django', 'Tailwind CSS', 'Vite', 'Zustand', 'MySQL', 'Figma'],
      contribution: 'Handled user flow restructuring and implemented the main front-end interactions.',
      contributionRate: 40,
      type: 'team',
      teamSize: 5,
      importance: 76,
      githubUrl: '',
      websiteUrl: '',
      downloadUrl: '',
      imageSrc: linBookCoverImage,
      backgroundUrl: shinhanfriendsVideo,
      coverLabel: 'LB',
      coverGradientFrom: '#e0e7ff',
      coverGradientTo: '#818cf8',
    },
    {
      id: 'insite',
      title: 'Insite',
      period: 'August 17, 2025 - September 30, 2025',
      startedAt: '2025-08-17',
      endedAt: '2025-09-30',
      role: 'PM, Front-end, UI/UX Design',
      summary: 'A data-driven service for comparing, analyzing, and recommending cafe business districts in Seoul.',
      introduction:
        'This project focused on translating dense commercial-area data into a clearer product structure, helping users explore and compare options without overload.',
      features: [
        'Regional comparison and recommendation flow',
        'Dashboard cards that prioritize key signals first',
        'Filter interactions that narrow decisions quickly',
      ],
      troubleshooting:
        'As the amount of data increased, the first screen became too dense. I redefined content priority around the user’s decision sequence and redesigned the card structure to reduce cognitive load.',
      results: [
        'Turned dense commercial-area data into a faster comparison experience.',
        'Received an excellence award in the big-data recommendation track.',
      ],
      stacks: ['Next.js', 'Tailwind CSS', 'Vite', 'Zustand', 'MySQL', 'Figma'],
      contribution: 'Led service direction, screen structure, and core front-end implementation.',
      contributionRate: 60,
      type: 'team',
      teamSize: 6,
      hasAward: true,
      importance: 94,
      githubUrl: '',
      websiteUrl: '',
      downloadUrl: '',
      imageSrc: insiteCoverImage,
      backgroundUrl: cafeVideo,
      coverLabel: 'IN',
      coverGradientFrom: '#dcfce7',
      coverGradientTo: '#22c55e',
    },
    {
      id: 'namuh',
      title: 'NAMUH',
      period: 'October 1, 2025 - November 30, 2025',
      startedAt: '2025-10-01',
      endedAt: '2025-11-30',
      role: 'Front-end, UI/UX Design',
      summary: 'A humanoid robot service concept designed for pediatric cancer patients experiencing social isolation.',
      introduction:
        'The project focused on simplifying the interface around emotionally sensitive interactions, making the product feel clear and approachable.',
      features: [
        'A simple control flow for children and guardians',
        'Friendly UI language for emotionally sensitive contexts',
        'Clear feedback for connected device and service states',
      ],
      troubleshooting:
        'Because emotional context mattered, long explanations created more burden than clarity. I reduced step complexity and rewrote interface feedback in more direct, understandable language.',
      results: [
        'Defined a calmer interface direction for an emotionally sensitive product context.',
        'Received the grand prize in the AIoT autonomous project track.',
      ],
      stacks: ['React', 'Tailwind CSS', 'Vite', 'Zustand', 'MySQL', 'Figma'],
      contribution: 'Owned front-end implementation and user-flow design aligned with the product tone.',
      contributionRate: 42,
      type: 'team',
      teamSize: 6,
      hasAward: true,
      importance: 72,
      githubUrl: 'https://github.com/Phangmin/NAMUH',
      websiteUrl: '',
      downloadUrl: '',
      imageSrc: namuhCoverImage,
      backgroundUrl: namuhVideo,
      coverLabel: 'NA',
      coverGradientFrom: '#fee2e2',
      coverGradientTo: '#f87171',
    },
    {
      id: 'hotel-wellness-butler',
      title: 'Hotel Wellness Butler',
      period: 'November 1, 2025 - December 1, 2025',
      startedAt: '2025-11-01',
      endedAt: '2025-12-01',
      role: 'Service Planning, UI/UX Design',
      summary: 'An AI-based hotel wellness service proposal that connected on-site touchpoints into one journey.',
      introduction:
        'This concept project focused on shaping a seamless wellness experience across hotel touchpoints, from service structure to screen-level storytelling.',
      features: [
        'A wellness journey spanning before, during, and after the stay',
        'A service structure that considered both guest and staff touchpoints',
        'Scenario-driven screens built to communicate concept value quickly',
      ],
      troubleshooting:
        'Because it was a proposal-stage concept, overexplaining features weakened the idea. I reduced the number of screens and focused on a few scenes that made the service value instantly legible.',
      results: [
        'Organized the hotel wellness journey into a proposal-ready UX narrative.',
        'Clarified service value with a smaller set of high-impact concept screens.',
      ],
      stacks: ['Figma'],
      contribution: 'Defined the core concept and designed the primary UX journey.',
      contributionRate: 70,
      type: 'team',
      teamSize: 2,
      importance: 64,
      githubUrl: '',
      websiteUrl: '',
      downloadUrl: '',
      gallery: [
        {
          id: 'hotel-wellness-butler-home',
          title: 'Wellness Service Home',
          description: 'The main screen was composed to communicate the service tone and primary entry points at a glance.',
          imageSrc: hotelWellnessButlerHomeImage,
        },
        {
          id: 'hotel-wellness-butler-room',
          title: 'In-Room Journey Touchpoint',
          description: 'This screen connects the wellness journey into the guest room experience without breaking the service flow.',
          imageSrc: hotelWellnessButlerRoomImage,
        },
        {
          id: 'hotel-wellness-butler-call',
          title: 'Concierge Request Flow',
          description: 'The service request flow was organized so guest needs and hotel response touchpoints connect naturally.',
          imageSrc: hotelWellnessButlerCallImage,
        },
      ],
      imageSrc: hotelWellnessButlerCoverImage,
      backgroundUrl: hotelroomVideo,
      coverLabel: 'HW',
      coverGradientFrom: '#fae8ff',
      coverGradientTo: '#d946ef',
    },
    {
      id: 'my-health-calendar',
      title: 'My Health Calendar',
      period: 'January 1, 2026 - January 14, 2026',
      startedAt: '2026-01-01',
      endedAt: '2026-01-14',
      role: 'Service Planning',
      summary: 'A healthcare calendar concept for making personal health records easier to capture and revisit.',
      introduction:
        'The project proposed a calendar-centered experience inside a public healthcare service so users could record and review their health more naturally.',
      features: [
        'A calendar view that connected schedules and health records',
        'A lighter input flow for repeated record creation',
        'A concept for visualizing long-term health patterns',
      ],
      troubleshooting:
        'Healthcare products need trust and clarity at the same time, so instead of adding too many features I focused the structure on the simplest possible recording flow users could understand immediately.',
      results: [
        'Defined an independent calendar-centered healthcare service concept.',
        'Built a reusable first-pass user flow for future public-service expansion.',
      ],
      stacks: ['Figma'],
      contribution: 'Handled the service concept and user-flow planning independently.',
      contributionRate: 100,
      type: 'individual',
      importance: 68,
      githubUrl: '',
      websiteUrl: '',
      downloadUrl: '',
      imageSrc: healthCalendarCoverImage,
      backgroundUrl: calendarVideo,
      coverLabel: 'MH',
      coverGradientFrom: '#dbeafe',
      coverGradientTo: '#38bdf8',
    },
  ],
}
