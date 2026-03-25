import styled, { keyframes } from 'styled-components'
import phangportIcon from '../../assets/phangporticon/phangport-icon.png'
import skyMedia from '../../assets/sky_media.mp4'

const glow = keyframes`
  from {
    opacity: 0.45;
    transform: scale(0.98);
  }

  to {
    opacity: 1;
    transform: scale(1.02);
  }
`

const Container = styled.div`
  position: relative;
  display: flex;
  min-height: 100vh;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background:
    radial-gradient(circle at top, rgba(255, 255, 255, 0.18), transparent 35%),
    linear-gradient(135deg, #0050b3 0%, #0b79f7 45%, #67b4ff 100%);
`

const BackgroundVideo = styled.video`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
`

const Overlay = styled.div`
  position: absolute;
  inset: 0;
  background:
    radial-gradient(circle at top, rgba(255, 255, 255, 0.16), transparent 35%),
    linear-gradient(180deg, rgba(2, 30, 62, 0.3), rgba(2, 30, 62, 0.72));
`

const Message = styled.div`
  display: grid;
  gap: 12px;
  padding: 32px;
  text-align: center;
  color: white;
  animation: ${glow} 0.9s ease-in-out infinite alternate;
`

const BrandIcon = styled.img`
  width: clamp(72px, 10vw, 112px);
  height: auto;
  margin: 0 auto 8px;
  filter: drop-shadow(0 12px 30px rgba(0, 0, 0, 0.18));
`

const Title = styled.h1`
  margin: 0;
  font-size: clamp(2rem, 4vw, 3.5rem);
  letter-spacing: -0.04em;
  color: white;
`

const Subtitle = styled.p`
  margin: 0;
  font-size: 1rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  opacity: 0.82;
`

function SkyScreen() {
  return (
    <Container>
      <BackgroundVideo autoPlay muted loop playsInline>
        <source src={skyMedia} type="video/mp4" />
      </BackgroundVideo>
      <Overlay />
      <Message>
        <BrandIcon src={phangportIcon} alt="PHANG PORT icon" />
        <Subtitle>Loading Portfolio</Subtitle>
        <Title>PHANG PORT</Title>
      </Message>
    </Container>
  )
}

export default SkyScreen
