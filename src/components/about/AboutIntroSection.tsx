// @ts-nocheck
import { RevealOnScroll } from '../common'

function AboutIntroSection(props) {
  const { strengthCards } = props

  return (
    <section className="flex h-full flex-col justify-between gap-6">
      <header className="flex flex-col gap-6 px-1 py-2">
        <RevealOnScroll
          as="p"
          delay={0.06}
          className="m-0 text-[0.78rem] font-bold uppercase tracking-[0.18em] text-blue-600"
        >
          About
        </RevealOnScroll>

        <div className="grid gap-4">
          <RevealOnScroll
            as="h1"
            delay={0.12}
            className="m-0 text-4xl font-semibold text-[var(--text-h)] max-md:text-3xl"
          >
            <span className="block">사용자 경험의 출발점부터</span>
            <span className="block">서비스 구조와 구현까지 설계합니다.</span>
          </RevealOnScroll>

          <RevealOnScroll delay={0.18} className="border-b border-gray-300" />

          <RevealOnScroll
            as="p"
            delay={0.24}
            className="m-0 max-w-[760px] text-sm leading-[1.85] text-slate-600"
          >
            화면을 빠르게 만드는 것에서 멈추지 않고, 사용자가 자연스럽게 이해하고 편하게
            사용할 수 있는 흐름을 만드는 데 관심이 많습니다. 구조가 명확한 컴포넌트 설계와
            안정적인 상태 관리, 그리고 완성도를 높이는 세밀한 UI 조정을 강점으로 두고
            있습니다.
          </RevealOnScroll>
        </div>
      </header>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-5">
        {strengthCards.map((card, index) => (
          <RevealOnScroll key={card.alt} delay={0.3 + index * 0.08} className="block">
            <img src={card.image} alt={card.alt} className="block w-full rounded-[18px]" />
          </RevealOnScroll>
        ))}
      </div>
    </section>
  )
}

export default AboutIntroSection
