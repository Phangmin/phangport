// @ts-nocheck

function AboutIntroSection(props) {
  const { strengthCards } = props

  return (
    <section className="flex h-full flex-col justify-between gap-6">
      <header className="flex flex-col gap-6 px-1 py-2">
        <p className="m-0 text-[0.78rem] font-bold uppercase tracking-[0.18em] text-blue-600">
          About
        </p>
        <div className="grid gap-4">
          <h1 className="m-0 text-4xl font-semibold text-[var(--text-h)] max-md:text-3xl">
            <span className="block">사용자 경험을 끝까지 다듬는</span>
            <span className="block">IT 기획·개발자를 지향합니다.</span>
          </h1>
          <div className="border-b border-gray-300" />
          <p className="m-0 max-w-[760px] text-sm leading-[1.85] text-slate-600">
            화면을 빠르게 만드는 것에서 끝나지 않고, 사용자가 자연스럽게 이해하고 편하게
            사용할 수 있는 흐름을 만드는 데 관심이 많습니다. 구조가 명확한 컴포넌트 설계와
            안정적인 상태 관리, 그리고 완성도를 높이는 디테일한 UI 조정을 강점으로 삼고
            있습니다.
          </p>
        </div>
      </header>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-5">
        {strengthCards.map((card) => (
          <img
            key={card.alt}
            src={card.image}
            alt={card.alt}
            className="block w-full rounded-[18px]"
          />
        ))}
      </div>
    </section>
  )
}

export default AboutIntroSection
