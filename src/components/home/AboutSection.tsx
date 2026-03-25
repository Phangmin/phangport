import styled from 'styled-components'
import { SectionTitle } from '../common'

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

const Content = styled.section`
  width: min(1126px, calc(100% - 48px));
  margin: 0 auto;
  display: grid;
  gap: 36px;
  height: 100vh;
  box-sizing: border-box;
  overflow: hidden;
  align-content: center;
  align-items: center;
  padding: calc(var(--navbar-offset, 104px) + 12px) 0 72px;
  scroll-snap-align: start;
  scroll-snap-stop: always;

  @media (min-width: 768px) {
    width: min(1126px, calc(100% - 128px));
  }
`

const ContentHeader = styled.div`
  display: grid;
  gap: 14px;
  max-width: 720px;
`

const ContentEyebrow = styled.p`
  margin: 0;
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: #2563eb;
`

const ContentTitle = styled.h2`
  margin: 0;
  font-size: clamp(2rem, 4vw, 3.4rem);
  line-height: 1.02;
  letter-spacing: -0.05em;
  color: #0f172a;
`

const ContentLead = styled.p`
  margin: 0;
  max-width: 640px;
  font-size: 1rem;
  line-height: 1.8;
  color: #64748b;
`

const ContentGrid = styled.div`
  width: 100%;
  display: grid;
  gap: 24px;

  @media (min-width: 980px) {
    grid-template-columns: minmax(0, 1.05fr) minmax(0, 0.95fr);
    align-items: stretch;
  }
`

const AboutPanel = styled.article`
  display: grid;
  gap: 28px;
  padding: 36px;
  border: 1px solid rgba(15, 23, 42, 0.08);
  border-radius: 28px;
  background:
    radial-gradient(circle at top right, rgba(37, 99, 235, 0.08), transparent 32%),
    linear-gradient(180deg, #ffffff 0%, #f8fbff 100%);
  box-shadow: 0 24px 60px rgba(15, 23, 42, 0.08);
`

const AboutBody = styled.div`
  display: grid;
  gap: 16px;
`

const AboutText = styled.p`
  margin: 0;
  font-size: 0.98rem;
  line-height: 1.9;
  color: #475569;
`

const FactList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`

const FactChip = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 10px 14px;
  border-radius: 999px;
  background: rgba(37, 99, 235, 0.08);
  color: #1d4ed8;
  font-size: 0.76rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
`

const StrengthPanel = styled.article`
  display: grid;
  gap: 18px;
`

const StrengthGrid = styled.div`
  display: grid;
  gap: 16px;

  @media (min-width: 700px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`

const StrengthCard = styled.div`
  display: grid;
  gap: 14px;
  min-height: 164px;
  padding: 24px;
  border: 1px solid rgba(15, 23, 42, 0.08);
  border-radius: 24px;
  background: white;
  box-shadow: 0 18px 40px rgba(15, 23, 42, 0.06);
`

const StrengthIndex = styled.span`
  display: inline-flex;
  width: 34px;
  height: 34px;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: #eff6ff;
  color: #2563eb;
  font-size: 0.82rem;
  font-weight: 700;
`

const StrengthTitle = styled.h3`
  margin: 0;
  font-size: 1.08rem;
  color: #0f172a;
`

const StrengthDescription = styled.p`
  margin: 0;
  line-height: 1.75;
  color: #64748b;
`

function AboutSection() {
  return (
    <Content id="about">
      <ContentHeader>
        <ContentEyebrow>About Me</ContentEyebrow>
        <ContentTitle>소개와 강점을 한 번에 읽히는 구조로 정리했습니다.</ContentTitle>
        <ContentLead>
          단순한 자기소개가 아니라 어떤 관점으로 화면을 만들고, 어떤 방식으로
          문제를 해결하는지 한 눈에 보이도록 구성한 섹션입니다.
        </ContentLead>
      </ContentHeader>

      <ContentGrid>
        <AboutPanel>
          <div>
            <SectionTitle>Introduce</SectionTitle>
            <AboutBody>
              {introParagraphs.map((paragraph) => (
                <AboutText key={paragraph}>{paragraph}</AboutText>
              ))}
            </AboutBody>
          </div>
          <FactList>
            {quickFacts.map((fact) => (
              <FactChip key={fact}>{fact}</FactChip>
            ))}
          </FactList>
        </AboutPanel>

        <StrengthPanel>
          <SectionTitle>Strengths</SectionTitle>
          <StrengthGrid>
            {strengths.map((strength, index) => (
              <StrengthCard key={strength.title}>
                <StrengthIndex>{String(index + 1).padStart(2, '0')}</StrengthIndex>
                <StrengthTitle>{strength.title}</StrengthTitle>
                <StrengthDescription>{strength.description}</StrengthDescription>
              </StrengthCard>
            ))}
          </StrengthGrid>
        </StrengthPanel>
      </ContentGrid>
    </Content>
  )
}

export default AboutSection
