import styled, { keyframes } from 'styled-components'

const wander = keyframes`
  0% {
    transform: translate(8vw, 18vh);
  }

  14% {
    transform: translate(26vw, 8vh);
  }

  28% {
    transform: translate(58vw, 14vh);
  }

  42% {
    transform: translate(74vw, 34vh);
  }

  58% {
    transform: translate(68vw, 68vh);
  }

  74% {
    transform: translate(34vw, 78vh);
  }

  88% {
    transform: translate(10vw, 58vh);
  }

  100% {
    transform: translate(8vw, 18vh);
  }
`

const turn = keyframes`
  0% {
    transform: rotate(332deg);
  }

  14% {
    transform: rotate(332deg);
  }

  28% {
    transform: rotate(10deg);
  }

  42% {
    transform: rotate(40deg);
  }

  58% {
    transform: rotate(112deg);
  }

  74% {
    transform: rotate(164deg);
  }

  88% {
    transform: rotate(220deg);
  }

  100% {
    transform: rotate(268deg);
  }
`

const Layer = styled.div`
  position: fixed;
  top: -18vh;
  right: 0;
  bottom: -18vh;
  left: 0;
  pointer-events: none;
  overflow: visible;
  z-index: 0;
  opacity: 1;
  visibility: visible;
  transition: opacity 0.28s ease;

  &[data-visible='false'] {
    opacity: 0;
    visibility: hidden;
  }
`

const Plane = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 36px;
  color: rgba(125, 211, 252, 0.2);
  opacity: 0.5;
  animation: ${wander} 28s linear infinite;
  will-change: transform;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }

  @media (max-width: 959px) {
    width: 27px;
  }
`

const PlaneBody = styled.div`
  position: relative;
  display: grid;
  place-items: center;
  transform-origin: 50% 50%;
  animation: ${turn} 28s linear infinite;
  will-change: transform;

  svg {
    position: relative;
    z-index: 1;
    display: block;
    width: 100%;
    height: auto;
    filter: drop-shadow(0 8px 18px rgba(148, 163, 184, 0.14));
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`

const Trail = styled.div`
  position: absolute;
  top: 63%;
  left: -6px;
  display: inline-flex;
  gap: 4px;
  align-items: center;
  transform: translate(-100%, -50%);
  opacity: 0.92;

  span {
    display: block;
    border-radius: 999px;
    background: rgba(125, 211, 252, 0.98);
    box-shadow: 0 0 12px rgba(125, 211, 252, 0.4);
  }

  span:nth-child(1) {
    width: 2px;
    height: 2px;
    opacity: 0.72;
  }

  span:nth-child(2) {
    width: 3px;
    height: 3px;
    opacity: 0.86;
  }

  span:nth-child(3) {
    width: 4px;
    height: 4px;
  }
`

function PlaneIcon() {
  return (
    <svg viewBox="0 0 64 64" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id="plane-left-wing" x1="8" y1="29" x2="52" y2="15" gradientUnits="userSpaceOnUse">
          <stop stopColor="#BAE6FD" />
          <stop offset="1" stopColor="#7DD3FC" />
        </linearGradient>
        <linearGradient id="plane-right-wing" x1="33" y1="26" x2="56" y2="47" gradientUnits="userSpaceOnUse">
          <stop stopColor="#E0F2FE" />
          <stop offset="1" stopColor="#93C5FD" />
        </linearGradient>
        <linearGradient id="plane-fold" x1="22" y1="49" x2="50" y2="14" gradientUnits="userSpaceOnUse">
          <stop stopColor="#38BDF8" />
          <stop offset="1" stopColor="#3B82F6" />
        </linearGradient>
      </defs>
      <path
        d="M8 31.1C7.5 29.8 8.3 28.3 9.6 27.8L53.2 12.2C55.7 11.3 57.9 13.4 57.6 16L55.3 36.1C54.8 40.2 50.3 42.7 46.5 41.3L29.6 35.1L8 31.1Z"
        fill="url(#plane-left-wing)"
      />
      <path
        d="M29.3 34.9L53.2 12.3C55.1 10.9 58.2 12.7 57.8 15.7L54.8 47.8C54.5 51 50.9 52.8 48.1 51.5L34.1 45L29.3 34.9Z"
        fill="url(#plane-right-wing)"
      />
      <path
        d="M21.7 50.6C20.8 50.6 20.1 49.7 20.5 48.9L29.5 35L53.1 12.4C54 11.6 55.3 12.6 54.8 13.7L35 44.8L23.3 50.3C22.8 50.5 22.2 50.6 21.7 50.6Z"
        fill="url(#plane-fold)"
      />
      <path
        d="M8.6 31.2L29.4 35"
        stroke="#60A5FA"
        strokeWidth="1.8"
        strokeLinecap="round"
        opacity="0.58"
      />
      <path
        d="M29.5 35L35 44.6"
        stroke="#DBEAFE"
        strokeWidth="1.8"
        strokeLinecap="round"
        opacity="0.76"
      />
    </svg>
  )
}

function HeroPaperPlanes({ visible = true }) {
  return (
    <Layer aria-hidden="true" data-visible={visible ? 'true' : 'false'}>
      <Plane>
        <PlaneBody>
          <Trail>
            <span />
            <span />
            <span />
          </Trail>
          <PlaneIcon />
        </PlaneBody>
      </Plane>
    </Layer>
  )
}

export default HeroPaperPlanes
