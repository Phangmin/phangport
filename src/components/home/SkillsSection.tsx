import { useMemo, useState } from 'react'
import { getSkillIconSrc } from '../common/SkillBadge'
import useLanguage, { type LanguageCode } from '../../hooks/useLanguage'

type SkillsTabId = 'language' | 'frontend' | 'backend' | 'database' | 'etc'

type SkillItem = {
  label: string
  description: string
}

type SkillsTab = {
  id: SkillsTabId
  label: string
  title: string
  summary: string
  items: SkillItem[]
}

type SkillsSectionCopy = {
  sectionLabel: string
  heading: string
  description: string
  tabs: SkillsTab[]
}

const skillsSectionCopyByLanguage: Record<LanguageCode, SkillsSectionCopy> = {
  ko: {
    sectionLabel: 'Skills',
    heading: '?ㅼ쓬怨?媛숈? 湲곗닠?ㅼ쓣 寃쏀뿕?덉뼱??',
    description:
      '?ъ슜??諛⑹떇 ?깆뿉 ???移댄뀒怨좊━蹂꾨줈 ?뺣━?대몢?덉쑝???명븯寃??댄렣蹂댁꽭??:)',
    tabs: [
      {
        id: 'language',
        label: 'Language',
        title: 'Language Stack',
        summary: '?밴낵 ?쒕퉬??援ы쁽??湲곕낯???섎뒗 ?몄뼱?ㅼ엯?덈떎.',
        items: [
          { label: 'HTML', description: '?뺣낫 援ъ“? ?쒕㎤??留덊겕?낆쓣 湲곗??쇰줈 ?붾㈃ 堉덈?瑜?援ъ꽦?덉뒿?덈떎.' },
          { label: 'JavaScript', description: '?곹샇?묒슜怨??곹깭 ?먮쫫???쒖뼱?섎뒗 湲곕낯 ?몄뼱濡?袁몄????ъ슜?덉뒿?덈떎.' },
          { label: 'TypeScript', description: '而댄룷?뚰듃? ?곗씠??援ъ“瑜???紐낇솗?섍쾶 ?좎??섍린 ?꾪빐 ?곴레?곸쑝濡??ъ슜?덉뒿?덈떎.' },
          { label: 'Python', description: 'Django 湲곕컲 ?꾨줈?앺듃? ?곗씠??泥섎━ 留λ씫?먯꽌 ?쒖슜?덉뒿?덈떎.' },
          { label: 'Kotlin', description: 'Android Studio 湲곕컲 紐⑤컮????援ы쁽 寃쏀뿕???ъ슜?덉뒿?덈떎.' },
        ],
      },
      {
        id: 'frontend',
        label: 'FrontEnd',
        title: 'Frontend Stack',
        summary: '?ъ슜??寃쏀뿕???ㅼ젣 ?명꽣?섏씠?ㅻ줈 ?곌껐????二쇰줈 ?곕뒗 湲곗닠?ㅼ엯?덈떎.',
        items: [
          { label: 'React', description: '媛???듭닕???꾨줎?몄뿏???꾨젅?꾩썙?щ줈, ?곹깭? UI ?먮쫫??援ъ“?곸쑝濡??ㅺ퀎?덉뒿?덈떎.' },
          { label: 'Next.js', description: '?쒕퉬??援ъ“?붿? ?쇱슦?? ?ㅼ젣 ?댁쁺??怨좊젮???꾨줎?몄뿏??寃쏀뿕???볦븯?듬땲??' },
          { label: 'Vue.js', description: '?꾨줈?앺듃 ?붽뎄?ы빆??留욎떠 ?ㅻⅨ ?꾨젅?꾩썙??臾몃쾿怨??먮쫫???좎뿰?섍쾶 ??묓뻽?듬땲??' },
          { label: 'Vite', description: '鍮좊Ⅸ 媛쒕컻 ?섍꼍怨??꾨줎?몄뿏??鍮뚮뱶 ?먮쫫 援ъ꽦??諛섎났?곸쑝濡??ъ슜?덉뒿?덈떎.' },
          { label: 'Tailwind CSS', description: '而댄룷?뚰듃 ?⑥쐞濡??붾㈃??鍮좊Ⅴ寃??뺣━?섍퀬 ?붿옄???ㅼ쓣 ?쇨??섍쾶 留욎톬?듬땲??' },
          { label: 'Bootstrap CSS', description: '鍮좊Ⅸ MVP 援ъ꽦怨?援ъ“ 寃利앹씠 ?꾩슂?????쒖슜?덉뒿?덈떎.' },
        ],
      },
      {
        id: 'backend',
        label: 'BackEnd',
        title: 'Backend & API',
        summary: '?붾㈃ ?ㅼ뿉???곗씠?곗? 湲곕뒫???곌껐?????ъ슜???꾧뎄?ㅼ엯?덈떎.',
        items: [
          { label: 'Django', description: '???쒕퉬??諛깆뿏?쒖? 愿由ъ옄 湲곕뒫, ?곗씠???먮쫫??鍮좊Ⅴ寃?援ъ텞??寃쏀뿕???덉뒿?덈떎.' },
          { label: 'Swagger', description: 'API 援ъ“瑜??뺤씤?섍퀬 ?꾨줎?몄뿏???곕룞 ?꾩뿉 ?먮쫫???뺣━?????ъ슜?덉뒿?덈떎.' },
          { label: 'Postman', description: '?붾뱶?ъ씤???뚯뒪?몄? ?붿껌/?묐떟 寃利앹뿉 ?ㅻТ?곸쑝濡??쒖슜?덉뒿?덈떎.' },
        ],
      },
      {
        id: 'database',
        label: 'Database',
        title: 'Database',
        summary: '?쒕퉬???곗씠??援ъ“瑜???ν븯怨?寃利앺븷 ???ㅻ쨾???곗씠?곕쿋?댁뒪?낅땲??',
        items: [
          { label: 'MySQL', description: '?ㅼ젣 ?쒕퉬???꾨줈?앺듃?먯꽌 ?ъ슜?먯? ?꾨찓???곗씠?곕? ?ㅻ（??湲곕낯 DB濡??ъ슜?덉뒿?덈떎.' },
          { label: 'SQLite3', description: '媛踰쇱슫 ?꾨줈?앺듃??珥덇린 ?꾨줈?좏??낆뿉??鍮좊Ⅸ 援ъ꽦?⑹쑝濡??쒖슜?덉뒿?덈떎.' },
          { label: 'NeonDB', description: 'Electron 湲곕컲 ?꾨줈?앺듃?먯꽌 ?쒕쾭由ъ뒪 Postgres 湲곕컲 ???곗씠??愿由ъ뿉 ?쒖슜?덉뒿?덈떎.' },
        ],
      },
      {
        id: 'etc',
        label: 'ETC',
        title: 'ETC Stack',
        summary: '諛고룷, ?묒뾽, 踰꾩쟾 愿由? ?곗뒪?ы넲 ????援ы쁽 諛붽묑???먮쫫源뚯? ?ㅻ（???꾧뎄?ㅼ엯?덈떎.',
        items: [
          { label: 'Figma', description: 'UI 援ъ“? ?붾㈃ ?먮쫫???뺣━?섍퀬, 援ы쁽 ??湲고쉷 ?섎룄瑜??쒓컖?뷀븷 ???ъ슜?덉뒿?덈떎.' },
          { label: 'Git', description: '肄붾뱶 蹂寃??대젰 愿由ъ? 釉뚮옖移?湲곕컲 ?묒뾽 ?먮쫫??湲곕낯?곸쑝濡??ъ슜?덉뒿?덈떎.' },
          { label: 'GitHub', description: '?꾨줈?앺듃 ??μ냼 ?댁쁺怨??묒뾽 湲곕줉 愿由ъ뿉 ?ъ슜?덉뒿?덈떎.' },
          { label: 'GitLab', description: '?몃? ??μ냼 諛??묒뾽 ?섍꼍??留욎떠 ?좎뿰?섍쾶 ?ъ슜?덉뒿?덈떎.' },
          { label: 'Jira', description: '?묒뾽 ?⑥쐞瑜??댁뒋 湲곕컲?쇰줈 ?섎늻怨??쇱젙 ?먮쫫???뺣━?????쒖슜?덉뒿?덈떎.' },
          { label: 'Notion', description: '臾몄꽌 ?뺣━? 湲고쉷, ?뚯쓽 湲곕줉 怨듭쑀???ъ슜?덉뒿?덈떎.' },
          { label: 'Mattermost', description: '? 而ㅻ??덉??댁뀡怨??꾨줈?앺듃 吏꾪뻾 ?곹솴 怨듭쑀???ъ슜?덉뒿?덈떎.' },
          { label: 'Microsoft Teams', description: '議곗쭅 ?묒뾽 ?섍꼍??留욎텣 而ㅻ??덉??댁뀡 ?꾧뎄濡??ъ슜?덉뒿?덈떎.' },
          { label: 'Electron', description: '?곗뒪?ы넲 ???뺥깭濡??뺤옣?섎뒗 ?꾨줈?앺듃 援ы쁽 寃쏀뿕???덉뒿?덈떎.' },
          { label: 'Vercel', description: '?꾨줎?몄뿏???꾨줈?앺듃 諛고룷? 誘몃━蹂닿린 ?섍꼍 ?뺤씤???ъ슜?덉뒿?덈떎.' },
        ],
      },
    ],
  },
  en: {
    sectionLabel: 'Skills',
    heading: 'What matters is not how many tools I know, but how I connect them in real work',
    description:
      'Instead of listing tools on their own, this section shows how I have applied them across real projects and delivery contexts. The tabbed structure makes it easier to scan only the areas you care about.',
    tabs: [
      {
        id: 'language',
        label: 'Language',
        title: 'Language Stack',
        summary: 'The core languages behind the interfaces and services I build.',
        items: [
          { label: 'HTML', description: 'Used to build semantic structure and readable information hierarchy.' },
          { label: 'JavaScript', description: 'Used as the base language for interaction and UI flow control.' },
          { label: 'TypeScript', description: 'Used to keep component contracts and data structures explicit.' },
          { label: 'Python', description: 'Used in Django-based products and data-related workflows.' },
          { label: 'Kotlin', description: 'Used for Android Studio based mobile app implementation.' },
        ],
      },
      {
        id: 'frontend',
        label: 'FrontEnd',
        title: 'Frontend Stack',
        summary: 'The tools I use most when turning product intent into interface behavior.',
        items: [
          { label: 'React', description: 'My primary frontend framework for structuring UI and state flow.' },
          { label: 'Next.js', description: 'Used when routing, production structure, and service delivery matter.' },
          { label: 'Vue.js', description: 'Used when project context called for a different component model.' },
          { label: 'Vite', description: 'Used to keep the frontend build setup fast and lightweight.' },
          { label: 'Tailwind CSS', description: 'Used to move quickly while keeping visual consistency across screens.' },
          { label: 'Bootstrap CSS', description: 'Used in early-stage MVP work and fast layout validation.' },
        ],
      },
      {
        id: 'backend',
        label: 'BackEnd',
        title: 'Backend & API',
        summary: 'The tools I have used to connect interfaces with real data and endpoints.',
        items: [
          { label: 'Django', description: 'Used to build web backends, admin features, and service logic.' },
          { label: 'Swagger', description: 'Used to inspect and organize API structure before frontend integration.' },
          { label: 'Postman', description: 'Used for endpoint testing and request/response validation.' },
        ],
      },
      {
        id: 'database',
        label: 'Database',
        title: 'Database',
        summary: 'The databases I have worked with while shaping product data structures.',
        items: [
          { label: 'MySQL', description: 'Used as the main relational database in service-oriented projects.' },
          { label: 'SQLite3', description: 'Used for lighter prototypes and smaller scoped applications.' },
          { label: 'NeonDB', description: 'Used as a serverless Postgres layer in Electron-based and modern app workflows.' },
        ],
      },
      {
        id: 'etc',
        label: 'ETC',
        title: 'ETC Stack',
        summary: 'Tools for design, deployment, collaboration, version control, and desktop delivery.',
        items: [
          { label: 'Figma', description: 'Used to organize interface structure and visualize product intent before implementation.' },
          { label: 'Git', description: 'Used as the baseline for version control and branch-based workflows.' },
          { label: 'GitHub', description: 'Used for repository management and collaboration history.' },
          { label: 'GitLab', description: 'Used when project context required a different repository environment.' },
          { label: 'Jira', description: 'Used to structure tasks and track delivery flow through issues.' },
          { label: 'Notion', description: 'Used to organize planning notes, meeting records, and documentation.' },
          { label: 'Mattermost', description: 'Used for team communication in project environments.' },
          { label: 'Microsoft Teams', description: 'Used in organization-based collaboration settings.' },
          { label: 'Electron', description: 'Used in projects that expanded beyond the web into desktop apps.' },
          { label: 'Vercel', description: 'Used for deployment and preview validation of frontend projects.' },
        ],
      },
    ],
  },
}

function SkillsSection() {
  const language = useLanguage()
  const copy = skillsSectionCopyByLanguage[language]
  const [activeTabId, setActiveTabId] = useState<SkillsTabId>('frontend')

  const activeTab = useMemo(
    () => copy.tabs.find((tab) => tab.id === activeTabId) ?? copy.tabs[0]!,
    [activeTabId, copy.tabs]
  )

  return (
    <section
      id="skills"
      className="relative min-h-[100svh] overflow-hidden bg-transparent text-slate-950 dark:text-white"
      data-home-skills-section="true"
    >
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(148,163,184,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.12)_1px,transparent_1px)] bg-[size:88px_88px] opacity-[0.16] dark:opacity-[0.08]" />

      <div className="relative z-[1] mx-auto grid min-h-[100svh] w-[min(1126px,calc(100%-48px))] content-center gap-8 py-[calc(var(--navbar-offset,104px)+28px)] max-md:w-[min(calc(100%-32px),1126px)] max-md:content-start max-md:gap-6 max-md:py-[calc(var(--navbar-offset,96px)+18px)] md:w-[min(1126px,calc(100%-128px))]">
        <div className="grid justify-items-center gap-3 text-center max-md:gap-2">
          <p className="m-0 text-[0.76rem] font-semibold uppercase tracking-[0.22em] text-blue-700 dark:text-sky-200">
            {copy.sectionLabel}
          </p>
          <h2 className="m-0 text-[clamp(1.9rem,4.4vw,3.4rem)] font-semibold leading-[1.02] tracking-[-0.055em] text-slate-950 dark:text-white">
            {copy.heading}
          </h2>
          <p className="m-0 text-[0.98rem] leading-[1.82] text-slate-600 dark:text-slate-300">
            {copy.description}
          </p>
        </div>

        <div className="grid gap-4 rounded-[32px] border border-slate-900/8 bg-transparent p-4 shadow-[0_26px_80px_rgba(148,163,184,0.16)] backdrop-blur-[14px] dark:border-white/10 dark:bg-transparent dark:shadow-[0_26px_80px_rgba(2,6,23,0.3)] md:grid-cols-[minmax(164px,0.34fr)_minmax(0,1fr)] md:gap-0 md:p-0">
          <div className="grid content-start gap-1 border-b border-slate-900/8 pb-3 md:border-b-0 md:border-r md:border-slate-900/8 md:p-5 dark:border-white/10">
            {copy.tabs.map((tab) => {
              const isActive = tab.id === activeTab.id

              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTabId(tab.id)}
                  className={`flex items-center justify-between rounded-[16px] px-3 py-2.5 text-left text-[0.92rem] font-medium transition-colors duration-200 ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-[0_14px_34px_rgba(37,99,235,0.26)] dark:bg-sky-400 dark:text-slate-950'
                      : 'text-slate-600 hover:bg-slate-900/[0.04] hover:text-slate-950 dark:text-slate-300 dark:hover:bg-white/[0.06] dark:hover:text-white'
                  }`}
                >
                  <span>{tab.label}</span>
                  <span className={`text-[0.72rem] ${isActive ? 'text-inherit/80' : 'text-slate-400 dark:text-slate-500'}`}>
                    {tab.items.length}
                  </span>
                </button>
              )
            })}
          </div>

          <div className="grid content-start gap-5 px-1 pt-1 md:p-6">
            <div className="grid gap-2 border-b border-slate-900/8 pb-4 dark:border-white/10">
              <p className="m-0 text-[1.3rem] font-semibold tracking-[-0.04em] text-slate-950 dark:text-white">{activeTab.title}</p>
              <p className="m-0 text-[0.94rem] leading-[1.72] text-slate-600 dark:text-slate-300">{activeTab.summary}</p>
            </div>

            <div className="grid gap-4 xl:grid-cols-2">
              {activeTab.items.map((item) => {
                const iconSrc = getSkillIconSrc(item.label)

                return (
                  <article
                    key={`${activeTab.id}-${item.label}`}
                    className="grid grid-cols-[64px_minmax(0,1fr)] items-center gap-5 rounded-[24px] border border-slate-900/8 bg-transparent p-4 transition-transform duration-200 hover:-translate-y-0.5 dark:border-white/10 dark:bg-transparent"
                  >
                    <div className="flex h-16 w-16 items-center justify-center rounded-full border border-blue-500/70 bg-[radial-gradient(circle_at_center,rgba(49,130,246,0.16)_0%,rgba(49,130,246,0.05)_56%,transparent_72%)] shadow-[inset_0_0_0_1px_rgba(49,130,246,0.18)]">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-950/[0.03] dark:bg-white/[0.04]">
                        {iconSrc ? (
                          <img src={iconSrc} alt="" aria-hidden="true" className="h-8 w-8 object-contain" />
                        ) : (
                          <span className="text-sm font-semibold text-blue-700 dark:text-blue-300">{item.label.slice(0, 2)}</span>
                        )}
                      </div>
                    </div>

                    <div className="grid items-center gap-1.5 text-left">
                      <h3 className="m-0 text-[1.08rem] font-semibold tracking-[-0.03em] text-slate-950 dark:text-white">{item.label}</h3>
                      <p className="m-0 text-[0.84rem] leading-[1.68] text-left text-slate-600 dark:text-slate-300">{item.description}</p>
                    </div>
                  </article>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SkillsSection
