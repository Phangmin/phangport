import styled from 'styled-components'
import { AboutSection, HeroSection } from '../components/home'

const Page = styled.main`
  color: #0f172a;
  background: white;
`

function HomePage() {
  return (
    <Page>
      <Hero>
        <HeroOverlay>
          <HeroCopy>
            <Eyebrow>보이지 않는 비효율을 찾아 서비스의 가치를 만듭니다</Eyebrow>
            <MobileHeroVisual>
              <PortraitFrame>
                <ProfilePicture src={gwangminPicture} alt="Portrait of Gwangmin" />
              </PortraitFrame>
            </MobileHeroVisual>
            <HeroTitle>
              Gwangmin&apos;s
              <br />
              Workspace
            </HeroTitle>
            <HeroText>
              복잡한 과정을 단순한 화면 구조로 개선하고, 서비스 기획과 개발을
              연결하는 프론트엔드를 지향합니다.
              <br />
              단순한 기능 추가를 넘어 현장의 문제를 근본적으로 해결하는 직관적인
              경험을 만드는 데 집중합니다.
            </HeroText>
            <HeroActions>
              <PrimaryButton type="button" onClick={scrollToNextSection}>
                View Projects
              </PrimaryButton>
              <GhostLink href="mailto:hello@phangport.dev">
                Start a Conversation
              </GhostLink>
            </HeroActions>
          </HeroCopy>
          <DesktopHeroVisual>
            <PortraitFrame>
              <ProfilePicture src={gwangminPicture} alt="Portrait of Gwangmin" />
            </PortraitFrame>
          </DesktopHeroVisual>
        </HeroOverlay>
        <HeroScrollButton
          type="button"
          aria-label="Scroll to next section"
          onClick={scrollToNextSection}
        >
          <ScrollIndicator />
        </HeroScrollButton>
      </Hero>

      <Content>
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
    </Page>
  )
}

export default HomePage
