<h1 align="center">🖥️ phangport</h1>

<p align="center">
  <b>천광민의 개인 포트폴리오 웹사이트</b><br/>
  보이지 않는 비효율을 찾아 서비스의 가치를 만듭니다.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white"/>
  <img src="https://img.shields.io/badge/TypeScript-6-3178C6?logo=typescript&logoColor=white"/>
  <img src="https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white"/>
  <img src="https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white"/>
  <img src="https://img.shields.io/badge/Deploy-Vercel-000000?logo=vercel&logoColor=white"/>
</p>

<p align="center">
  🌐 <a href="https://phangport.vercel.app"><b>phangport.vercel.app</b></a>
</p>

---

## 📌 소개

복잡한 과정을 단순한 화면 구조로 개선하고, 서비스 기획과 개발을 연결하는 프론트엔드 개발자 천광민의 포트폴리오입니다.

단순한 기능 추가를 넘어, 현장의 문제를 근본적으로 해결하는 직관적인 경험을 만드는 데 집중합니다.

---

## 🗂️ 페이지 구성

| 페이지 | 경로 | 내용 |
|---|---|---|
| **Home** | `/` | 소개 Hero 섹션 + 프로젝트 하이라이트 카드 |
| **About** | `/about` | 개인 소개, 스킬셋 |
| **Experiences** | `/experiences` | 경력 및 활동 타임라인 |
| **Projects** | `/projects` | 전체 프로젝트 목록 (정렬 · 상세 모달) |
| **Portfolio** | `/portfolio` | 포트폴리오 자료 모음 |
| **Contact** | `/contact` | 연락처 및 링크 |

---

## 🏆 주요 프로젝트

| 프로젝트 | 기간 | 역할 | 수상 |
|---|---|---|---|
| **Stalk** — WebRTC 기반 실시간 주식 상담 플랫폼 | 2025.07 - 08 | 프론트엔드, UI/UX | 🥇 |
| **Insite** — 서울 카페 상권 비교·추천 서비스 | 2025.08 - 09 | PM, 프론트엔드, UI/UX | 🥈 |
| **서재의 온도** — AI 독서 기록 공유 플랫폼 | 2025.05 | 풀스택, UI/UX | 🥈 |
| **Lin. Book** — 동아리 공동 계좌 회계 플랫폼 | 2025.08 | 프론트엔드, UI/UX | — |
| **NAMUH** — 소아암 환아를 위한 로봇 연계 서비스 | 2025.10 - 11 | 프론트엔드, UI/UX | 🥇 |
| **Hotel Wellness Butler** — AI 호텔 웰니스 서비스 기획 | 2025.11 - 12 | 서비스 기획, UI/UX | — |
| **My Health Calendar** — 헬스케어 캘린더 서비스 기획 | 2026.01 | 서비스 기획 | — |

---

## 🛠️ 기술 스택

| 구분 | 기술 |
|---|---|
| **Framework** | React 19 |
| **Language** | TypeScript 6 |
| **Styling** | Tailwind CSS 4 |
| **Bundler** | Vite 8 |
| **Routing** | React Router v7 |
| **State** | Zustand v5 |
| **Deploy** | Vercel (Vercel Analytics · Speed Insights 포함) |

---

## ✨ 주요 구현 특징

- **한국어 / 영어 전환** — `useLanguage` 훅으로 전체 콘텐츠 다국어 지원
- **스크롤 등장 애니메이션** — `RevealOnScroll` 컴포넌트로 부드러운 인터랙션
- **프로젝트 정렬 & 모달** — 최신순 · 오래된순 · 중요도순 정렬 + 상세 모달 확장
- **Featured 프로젝트** — 대표 프로젝트를 별도 섹션으로 강조, 갤러리 캐러셀 포함
- **다크/라이트 테마** — CSS 변수 기반 테마 전환
- **콘텐츠 분리 구조** — `/src/content/` 폴더에 모든 텍스트 데이터를 분리해 유지보수 용이

---

## ⚡ 로컬 실행

```bash
# 저장소 클론
git clone https://github.com/Phangmin/phangport.git
cd phangport

# 의존성 설치
npm install

# 개발 서버 실행
npm run dev
```

`http://localhost:5173` 에서 확인할 수 있습니다.

```bash
# 타입 체크
npm run typecheck

# 프로덕션 빌드
npm run build

# 빌드 미리보기
npm run preview
```

---

## 📁 프로젝트 구조

```
phangport/
├── public/
├── src/
│   ├── assets/           # 이미지, 아이콘
│   ├── components/       # 공통 · 페이지별 컴포넌트
│   │   ├── common/       # Navbar, Footer, SkillBadge, RevealOnScroll ...
│   │   ├── about/
│   │   └── projects/     # FeaturedProjectCarousel, ProjectDetailGrid
│   ├── content/          # 페이지별 텍스트 데이터 (ko / en)
│   │   ├── home.ts
│   │   ├── projects.ts
│   │   ├── experiences.ts
│   │   └── portfolio.ts
│   ├── hooks/            # useLanguage 등 커스텀 훅
│   ├── pages/            # 라우트 단위 페이지 컴포넌트
│   ├── App.tsx
│   └── main.tsx
├── index.html
├── vite.config.ts
└── vercel.json
```

---

<p align="center">Made with ☕ by <a href="https://github.com/Phangmin">Phangmin</a></p>
