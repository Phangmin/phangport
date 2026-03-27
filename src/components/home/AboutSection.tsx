const introParagraphs = [
  '안녕하세요. 저는 사용자에게 자연스럽고 설득력 있게 전달되는 화면을 만드는 프론트엔드 개발자입니다.',
  '기획 의도를 인터페이스로 구체화하는 과정에 강점이 있으며, 보기 좋은 화면을 넘어 실제로 사용하기 편한 경험을 만드는 데 집중합니다.',
  '작은 상호작용 하나까지도 브랜드의 인상과 서비스의 신뢰도를 좌우한다고 생각하며, 그래서 구조와 디테일을 함께 챙기는 개발을 지향합니다.',
]

const quickFacts = [
  'Frontend Development',
  'React + TypeScript',
  'Product Thinking',
  'Responsive UI',
]

const strengths = [
  {
    title: '구조적인 구현',
    description:
      '재사용 가능한 컴포넌트와 명확한 화면 구조를 통해 확장 가능한 프론트엔드 기반을 만듭니다.',
  },
  {
    title: '사용자 중심 설계',
    description:
      '사용자 흐름을 기준으로 정보 우선순위를 정리하고 직관적인 인터페이스를 구성합니다.',
  },
  {
    title: '빠른 실행력',
    description:
      '기획 의도를 빠르게 화면으로 옮기되, 완성도와 일관성을 유지하는 데 집중합니다.',
  },
  {
    title: '디테일 감각',
    description:
      '타이포그래피, 간격, 반응형 레이아웃, 상호작용까지 세밀하게 다듬어 경험의 밀도를 높입니다.',
  },
]

function AboutSection() {
  return (
    <section
      id="about"
      className="mx-auto grid h-screen w-[min(1126px,calc(100%-48px))] content-center items-center gap-9 overflow-hidden px-0 pb-[72px] pt-[calc(var(--navbar-offset,104px)+12px)] md:w-[min(1126px,calc(100%-128px))]"
    >
      <div className="grid max-w-[720px] gap-[14px]">
        <p data-home-accent-label="true" className="m-0 text-[0.78rem] font-bold uppercase tracking-[0.18em] text-blue-600">
          About Me
        </p>
        <h2 className="m-0 text-[clamp(2rem,4vw,3.4rem)] leading-[1.02] tracking-[-0.05em] text-[var(--text-h)]">
          소개와 강점을 한 번에 읽히는 구조로 정리했습니다.
        </h2>
        <p data-home-muted-text="true" className="m-0 max-w-[640px] text-base leading-[1.8] text-slate-500">
          단순한 자기소개가 아니라 어떤 관점으로 화면을 만들고, 어떤 방식으로 문제를 해결하는지
          한 눈에 보이도록 구성한 섹션입니다.
        </p>
      </div>

      <div className="grid w-full gap-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
        <article
          data-home-about-card="true"
          className="grid gap-7 rounded-[28px] border border-slate-900/8 bg-[radial-gradient(circle_at_top_right,rgba(37,99,235,0.08),transparent_32%),linear-gradient(180deg,#ffffff_0%,#f8fbff_100%)] p-9 shadow-[0_24px_60px_rgba(15,23,42,0.08)]"
        >
          <div>
            <h3 className="mb-[30px] text-[28px] text-[var(--text-h)] after:mt-2 after:block after:h-1 after:w-10 after:bg-[#0064DE] after:content-['']">
              Introduce
            </h3>
            <div className="grid gap-4">
              {introParagraphs.map((paragraph) => (
                <p key={paragraph} data-home-muted-text="true" className="m-0 text-[0.98rem] leading-[1.9] text-slate-600">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
          <div className="flex flex-wrap gap-2.5">
            {quickFacts.map((fact) => (
              <span
                key={fact}
                data-home-about-chip="true"
                className="inline-flex items-center justify-center rounded-full bg-blue-600/8 px-[14px] py-[10px] text-[0.76rem] font-bold uppercase tracking-[0.08em] text-blue-700"
              >
                {fact}
              </span>
            ))}
          </div>
        </article>

        <article className="grid gap-[18px]">
          <h3 className="mb-[30px] text-[28px] text-[var(--text-h)] after:mt-2 after:block after:h-1 after:w-10 after:bg-[#0064DE] after:content-['']">
            Strengths
          </h3>
          <div className="grid gap-4 sm:grid-cols-2">
            {strengths.map((strength, index) => (
              <div
                key={strength.title}
                data-home-strength-card="true"
                className="grid min-h-[164px] gap-[14px] rounded-[24px] border border-slate-900/8 bg-white p-6 shadow-[0_18px_40px_rgba(15,23,42,0.06)]"
              >
                <span
                  data-home-strength-index="true"
                  className="inline-flex h-[34px] w-[34px] items-center justify-center rounded-full bg-blue-50 text-[0.82rem] font-bold text-blue-600"
                >
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h4 className="m-0 text-[1.08rem] text-[var(--text-h)]">{strength.title}</h4>
                <p data-home-muted-text="true" className="m-0 leading-[1.75] text-slate-500">{strength.description}</p>
              </div>
            ))}
          </div>
        </article>
      </div>
    </section>
  )
}

export default AboutSection
