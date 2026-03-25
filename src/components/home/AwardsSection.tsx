import styled from 'styled-components'

const Section = styled.section`
  width: min(1126px, calc(100% - 48px));
  margin: 0 auto;
  display: grid;
  gap: 18px;
  height: 100vh;
  box-sizing: border-box;
  align-content: center;
  padding: calc(var(--navbar-offset, 104px) + 12px) 0 72px;
  scroll-snap-align: start;
  scroll-snap-stop: always;

  @media (min-width: 768px) {
    width: min(1126px, calc(100% - 128px));
  }
`

const Label = styled.p`
  margin: 0;
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: #2563eb;
`

const Title = styled.h2`
  margin: 0;
  font-size: clamp(2rem, 4vw, 3.2rem);
  line-height: 1.05;
  letter-spacing: -0.04em;
  color: #0f172a;
`

const Card = styled.div`
  padding: 32px;
  border: 1px solid rgba(15, 23, 42, 0.08);
  border-radius: 24px;
  background: white;
  box-shadow: 0 18px 40px rgba(15, 23, 42, 0.06);
`

const Text = styled.p`
  margin: 0;
  max-width: 640px;
  line-height: 1.8;
  color: #64748b;
`

function AwardsSection() {
  return (
    <Section id="awards">
      <Label>Awards</Label>
      <Title>수상내역 섹션도 같은 구조로 이어서 확장할 수 있습니다.</Title>
      <Card>
        <Text>
          현재는 메뉴 동선과 섹션 흐름을 먼저 잡았습니다. 수상명, 기관, 연도,
          간단한 설명을 카드 형태로 정리하면 포트폴리오 완성도가 더 높아집니다.
        </Text>
      </Card>
    </Section>
  )
}

export default AwardsSection
