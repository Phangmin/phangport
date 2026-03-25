import styled, { keyframes } from 'styled-components'
import gwangminPicture from '../../assets/profiles/gwangmin-picture.png'
import { PrimaryButton, ScrollIndicator } from '../common'

const riseIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(18px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
`

const Hero = styled.section`
  position: relative;
  z-index: 1;
  display: grid;
  height: 100vh;
  overflow: hidden;
  align-items: center;
  background: white;
  scroll-snap-align: start;
  scroll-snap-stop: always;
`

const HeroOverlay = styled.div`
  position: relative;
  z-index: 1;
  width: min(1126px, calc(100% - 48px));
  height: 100%;
  margin: 0 auto;
  display: grid;
  gap: 32px;
  padding: calc(var(--navbar-offset, 104px) + 16px) 0 72px;
  box-sizing: border-box;
  color: #0f172a;

  @media (min-width: 768px) {
    width: min(1126px, calc(100% - 128px));
  }

  @media (min-width: 960px) {
    grid-template-columns: minmax(0, 1.1fr) minmax(320px, 0.9fr);
    align-items: center;
  }
`

const HeroCopy = styled.div`
  display: grid;
  gap: 24px;

  @media (max-width: 959px) {
    justify-items: center;
    text-align: center;
  }
`

const HeroVisual = styled.div`
  display: grid;
  justify-items: center;
`

const MobileHeroVisual = styled(HeroVisual)`
  opacity: 0;
  animation: ${riseIn} 1.02s ease-out 0.22s forwards;

  @media (min-width: 960px) {
    display: none;
  }

  @media (prefers-reduced-motion: reduce) {
    opacity: 1;
    animation: none;
  }
`

const DesktopHeroVisual = styled(HeroVisual)`
  display: none;
  opacity: 0;
  animation: ${riseIn} 1.08s ease-out 0.5s forwards;

  @media (min-width: 960px) {
    display: grid;
  }

  @media (prefers-reduced-motion: reduce) {
    opacity: 1;
    animation: none;
  }
`

const PortraitShell = styled.div`
  position: relative;
  display: inline-grid;
  justify-items: center;

  &::after {
    content: '';
    position: absolute;
    left: 50%;
    bottom: -18px;
    width: 88%;
    height: 42px;
    z-index: 0;
    border-radius: 999px;
    background: radial-gradient(
      ellipse at center,
      rgba(15, 23, 42, 0.18) 0%,
      rgba(15, 23, 42, 0.08) 46%,
      rgba(15, 23, 42, 0) 100%
    );
    transform: translateX(-50%);
    filter: blur(10px);
    pointer-events: none;
  }
`

const PortraitFrame = styled.div`
  position: relative;
  z-index: 1;
  display: inline-grid;
  width: auto;
  overflow: hidden;
  border-radius: 28px;
`

const ProfilePicture = styled.img`
  display: block;
  width: min(72vw, 320px);
  max-width: 100%;
  height: auto;
`

const Eyebrow = styled.p`
  margin: 0;
  font-size: 0.85rem;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: #0b5ed7;
  opacity: 0;
  animation: ${riseIn} 0.9s ease-out 0.08s forwards;

  @media (prefers-reduced-motion: reduce) {
    opacity: 1;
    animation: none;
  }
`

const HeroTitle = styled.h1`
  max-width: 820px;
  margin: 0;
  font-size: clamp(3rem, 8vw, 6rem);
  line-height: 0.95;
  color: #0f172a;
  opacity: 0;
  animation: ${riseIn} 0.98s ease-out 0.24s forwards;

  @media (prefers-reduced-motion: reduce) {
    opacity: 1;
    animation: none;
  }
`

const HeroText = styled.p`
  max-width: 640px;
  margin: 0;
  font-size: 0.95rem;
  line-height: 1.9;
  color: #475569;
  opacity: 0;
  animation: ${riseIn} 1.04s ease-out 0.42s forwards;

  @media (prefers-reduced-motion: reduce) {
    opacity: 1;
    animation: none;
  }
`

const HeroActions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  opacity: 0;
  animation: ${riseIn} 1.04s ease-out 0.6s forwards;

  @media (max-width: 959px) {
    justify-content: center;
  }

  @media (prefers-reduced-motion: reduce) {
    opacity: 1;
    animation: none;
  }
`

const GhostLink = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 12px 18px;
  border: 1px solid rgba(15, 23, 42, 0.14);
  border-radius: 4px;
  color: #0f172a;
  font-weight: 600;
  text-decoration: none;
  background: white;
`

const HeroScrollButton = styled.button`
  position: absolute;
  left: 50%;
  bottom: 28px;
  z-index: 2;
  transform: translateX(-50%);
  color: #9ca3af;
  padding: 0;
  border: 0;
  background: transparent;
  cursor: pointer;
`

function scrollToNextSection() {
  const root = document.getElementById('root')

  if (!root) {
    return
  }

  root.scrollBy({ top: window.innerHeight, behavior: 'smooth' })
}

function HeroSection() {
  return (
    <Hero id="home">
      <HeroOverlay>
        <HeroCopy>
          <Eyebrow>보이지 않는 비효율을 찾아 서비스의 가치를 만듭니다</Eyebrow>
          <MobileHeroVisual>
            <PortraitShell>
              <PortraitFrame>
                <ProfilePicture src={gwangminPicture} alt="Portrait of Gwangmin" />
              </PortraitFrame>
            </PortraitShell>
          </MobileHeroVisual>
          <HeroTitle>
            Gwangmin&apos;s
            <br />
            Workspace
          </HeroTitle>
          <HeroText>
            복잡한 과정을 단순한 화면 구조로 개선하고, 서비스 기획과 개발을 연결하는
            프론트엔드를 지향합니다.
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
          <PortraitShell>
            <PortraitFrame>
              <ProfilePicture src={gwangminPicture} alt="Portrait of Gwangmin" />
            </PortraitFrame>
          </PortraitShell>
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
  )
}

export default HeroSection
