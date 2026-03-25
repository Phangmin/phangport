import styled, { keyframes } from 'styled-components'

const float = keyframes`
  0%,
  100% {
    transform: translateY(0);
    opacity: 0.52;
  }

  50% {
    transform: translateY(8px);
    opacity: 0.92;
  }
`

const wheel = keyframes`
  0% {
    transform: translateY(0);
    opacity: 0.2;
  }

  30% {
    opacity: 0.85;
  }

  100% {
    transform: translateY(16px);
    opacity: 0;
  }
`

const Root = styled.div`
  display: grid;
  align-items: center;
  justify-items: center;
  align-content: center;
  gap: 4px;
  color: inherit;
  text-align: center;
  animation: ${float} 1.8s ease-in-out infinite;
`

const Icon = styled.svg`
  width: 36px;
  height: 42px;
`

const MouseOutline = styled.rect`
  fill: none;
  stroke: currentColor;
  stroke-width: 4;
`

const Wheel = styled.rect`
  fill: currentColor;
  animation: ${wheel} 1.6s ease-in-out infinite;
  transform-origin: center;
`

const Label = styled.span`
  display: block;
  font-size: 0.375rem;
  font-weight: 600;
  letter-spacing: 0.16em;
  line-height: 1;
  text-align: center;
  text-transform: uppercase;
`

function ScrollIndicator() {
  return (
    <Root aria-hidden="true">
      <Icon viewBox="0 0 72 84" aria-hidden="true">
        <MouseOutline x="18" y="6" width="36" height="64" rx="18" />
        <Wheel x="32.5" y="18" width="7" height="16" rx="3.5" />
      </Icon>
      <Label>Scroll Down</Label>
    </Root>
  )
}

export default ScrollIndicator
