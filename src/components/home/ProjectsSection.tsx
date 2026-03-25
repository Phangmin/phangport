import { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'

const projects = [
  {
    title: 'Portfolio UX',
    description: '브랜드와 자기소개를 한 화면 안에서 자연스럽게 읽히게 만드는 구조 설계',
  },
  {
    title: 'Service Flow',
    description: '복잡한 기능을 단순한 흐름으로 재정리하는 사용자 중심 인터페이스 작업',
  },
  {
    title: 'Frontend Build',
    description: 'React와 TypeScript를 기반으로 화면 구조를 안정적으로 구현하는 개발 작업',
  },
  {
    title: 'Responsive UI',
    description: '모바일과 데스크톱 모두에서 일관된 인상을 유지하는 반응형 설계',
  },
  {
    title: 'Design Detail',
    description: '간격과 타이포그래피, 포커스 포인트를 세밀하게 다듬는 시각 완성도 작업',
  },
]

const fallbackSlot = {
  top: '54%',
  right: '32%',
  width: 'min(260px, 26vw)',
  minHeight: '176px',
  padding: '24px 22px',
  transform: 'translateY(-50%) scale(1.04)',
  zIndex: 5,
  opacity: 1,
  role: 'focus',
}

const slots = [
  {
    top: '21%',
    right: '57%',
    width: 'min(172px, 18vw)',
    minHeight: '126px',
    padding: '16px 16px',
    transform: 'translateY(-50%) rotate(18deg) scale(0.88)',
    zIndex: 1,
    opacity: 0.22,
    role: 'back-far',
  },
  {
    top: '36%',
    right: '42%',
    width: 'min(184px, 19vw)',
    minHeight: '136px',
    padding: '18px 18px',
    transform: 'translateY(-50%) rotate(10deg) scale(0.94)',
    zIndex: 2,
    opacity: 0.46,
    role: 'back-near',
  },
  {
    top: '55%',
    right: '32%',
    width: 'min(260px, 26vw)',
    minHeight: '176px',
    padding: '24px 22px',
    transform: 'translateY(-50%) scale(1.04)',
    zIndex: 5,
    opacity: 1,
    role: 'focus',
  },
  {
    top: '72%',
    right: '42%',
    width: 'min(184px, 19vw)',
    minHeight: '136px',
    padding: '18px 18px',
    transform: 'translateY(-50%) rotate(-10deg) scale(0.94)',
    zIndex: 2,
    opacity: 0.46,
    role: 'front-near',
  },
  {
    top: '87%',
    right: '57%',
    width: 'min(172px, 18vw)',
    minHeight: '126px',
    padding: '16px 16px',
    transform: 'translateY(-50%) rotate(-18deg) scale(0.88)',
    zIndex: 1,
    opacity: 0.22,
    role: 'front-far',
  },
]

const Section = styled.section`
  width: 100%;
  height: 100vh;
  background:
    radial-gradient(circle at top, rgba(96, 165, 250, 0.16), transparent 32%),
    linear-gradient(180deg, #081120 0%, #0f172a 46%, #111827 100%);
  scroll-snap-align: start;
  scroll-snap-stop: always;
`

const Inner = styled.div`
  width: min(1126px, calc(100% - 48px));
  height: 100vh;
  margin: 0 auto;
  display: grid;
  align-content: center;
  gap: 28px;
  padding: calc(var(--navbar-offset, 104px) + 12px) 0 72px;
  box-sizing: border-box;

  @media (min-width: 768px) {
    width: min(1126px, calc(100% - 128px));
  }

  @media (min-width: 980px) {
    grid-template-columns: minmax(0, 1.08fr) minmax(320px, 0.92fr);
    align-items: center;
    gap: 42px;
  }
`

const Header = styled.div`
  display: grid;
  gap: 12px;
  justify-items: center;
  text-align: center;

  @media (min-width: 980px) {
    justify-items: start;
    text-align: left;
  }
`

const Label = styled.p`
  margin: 0;
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: #93c5fd;
`

const ProjectNumber = styled.span`
  display: inline-flex;
  width: 40px;
  height: 40px;
  align-items: center;
  justify-content: center;
  border-radius: 999px;
  background: rgba(147, 197, 253, 0.16);
  color: #bfdbfe;
  font-size: 0.86rem;
  font-weight: 700;
`

const Title = styled.h2`
  margin: 0;
  max-width: 720px;
  font-size: clamp(2rem, 4vw, 3.4rem);
  line-height: 0.98;
  letter-spacing: -0.05em;
  color: white;
`

const Lead = styled.p`
  margin: 0;
  max-width: 560px;
  line-height: 1.75;
  font-size: 0.95rem;
  color: rgba(226, 232, 240, 0.78);
`

const DetailButton = styled.button`
  margin-top: 8px;
  min-width: 148px;
  padding: 14px 22px;
  border: 0;
  border-radius: 999px;
  background: white;
  color: #0f172a;
  font-size: 0.92rem;
  font-weight: 700;
  letter-spacing: -0.01em;
  cursor: pointer;
  box-shadow: 0 18px 40px rgba(2, 6, 23, 0.18);
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease,
    background-color 0.2s ease;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 22px 46px rgba(2, 6, 23, 0.22);
    background: #f8fafc;
  }
`

const ArcStage = styled.div`
  position: relative;
  height: 560px;

  @media (max-width: 979px) {
    height: 460px;
  }
`

const ArcList = styled.div`
  position: relative;
  height: 560px;

  @media (max-width: 899px) {
    display: grid;
    gap: 14px;
    height: auto;
  }
`

const ProjectButton = styled.button`
  position: absolute;
  top: var(--card-top);
  right: var(--card-right);
  display: grid;
  gap: 10px;
  width: var(--card-width);
  min-height: var(--card-height);
  padding: var(--card-padding);
  border: 0;
  border-radius: 24px;
  background: rgba(255, 255, 255, 0.98);
  box-shadow: 0 24px 56px rgba(2, 6, 23, 0.24);
  text-align: left;
  cursor: pointer;
  opacity: var(--card-opacity);
  transform: var(--card-transform);
  z-index: var(--card-z);
  transform-origin: 50% 50%;
  transition:
    top 0.45s ease,
    right 0.45s ease,
    width 0.45s ease,
    min-height 0.45s ease,
    padding 0.45s ease,
    transform 0.45s ease,
    opacity 0.28s ease,
    box-shadow 0.28s ease,
    filter 0.28s ease;

  &:hover {
    box-shadow: 0 28px 62px rgba(2, 6, 23, 0.3);
  }

  &[data-role='focus'] {
    box-shadow: 0 30px 70px rgba(2, 6, 23, 0.34);
  }

  &[data-role='back-far'],
  &[data-role='back-near'],
  &[data-role='front-near'],
  &[data-role='front-far'] {
    filter: saturate(0.76);
  }

  @media (max-width: 899px) {
    position: static;
    width: 100%;
    min-height: auto;
    opacity: 1;
    transform: none;
    filter: none;
    margin-top: 0;
  }
`

const CardIndex = styled.span`
  display: inline-flex;
  width: 30px;
  height: 30px;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: #eff6ff;
  color: #2563eb;
  font-size: 0.74rem;
  font-weight: 700;
`

const CardContent = styled.div`
  display: grid;
  gap: 8px;
`

const CardTitle = styled.strong`
  font-size: 0.98rem;
  line-height: 1.2;
  color: #0f172a;
`

const CardText = styled.span`
  font-size: 0.88rem;
  line-height: 1.65;
  color: #64748b;
`

function ProjectsSection() {
  const [focusedIndex, setFocusedIndex] = useState(2)
  const wheelLockRef = useRef(false)
  const activeProject =
    projects[focusedIndex] || projects[0] || { title: '', description: '' }

  useEffect(() => {
    const node = document.querySelector('[data-project-wheel-zone="true"]')

    if (!(node instanceof HTMLDivElement)) {
      return undefined
    }

    function handleWheel() {
      const event = arguments[0]

      if (wheelLockRef.current || event.deltaY === 0) {
        return
      }

      event.preventDefault()
      event.stopPropagation()

      wheelLockRef.current = true
      setFocusedIndex((currentIndex) => {
        const direction = event.deltaY > 0 ? 1 : -1
        return (currentIndex + direction + projects.length) % projects.length
      })

      window.setTimeout(() => {
        wheelLockRef.current = false
      }, 280)
    }

    node.addEventListener('wheel', handleWheel, { passive: false })

    return () => {
      node.removeEventListener('wheel', handleWheel)
    }
  }, [focusedIndex])

  return (
    <Section id="projects">
      <Inner>
        <ArcStage>
          <ArcList data-project-wheel-zone="true">
            {projects.map((project, index) => {
              const slotIndex =
                (index - focusedIndex + 2 + projects.length) % projects.length
              const slot = slots[slotIndex] || fallbackSlot

              return (
                <ProjectButton
                  key={project.title}
                  type="button"
                  data-role={slot.role}
                  style={{
                    '--card-top': slot.top,
                    '--card-right': slot.right,
                    '--card-width': slot.width,
                    '--card-height': slot.minHeight,
                    '--card-padding': slot.padding,
                    '--card-transform': slot.transform,
                    '--card-opacity': String(slot.opacity),
                    '--card-z': String(slot.zIndex),
                  }}
                  aria-pressed={slot.role === 'focus'}
                  onClick={() => setFocusedIndex(index)}
                >
                  <CardIndex>{String(index + 1).padStart(2, '0')}</CardIndex>
                  <CardContent>
                    <CardTitle>{project.title}</CardTitle>
                    <CardText>{project.description}</CardText>
                  </CardContent>
                </ProjectButton>
              )
            })}
          </ArcList>
        </ArcStage>

        <Header>
          <Label>Projects</Label>
          <ProjectNumber>{String(focusedIndex + 1).padStart(2, '0')}</ProjectNumber>
          <Title>{activeProject.title}</Title>
          <Lead>{activeProject.description}</Lead>
          <DetailButton type="button">자세히 보기</DetailButton>
        </Header>
      </Inner>
    </Section>
  )
}

export default ProjectsSection
