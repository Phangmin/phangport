function ScrollIndicator() {
  return (
    <div
      aria-hidden="true"
      className="grid place-items-center gap-1 text-center text-inherit motion-safe:animate-[scroll-indicator-float_1.8s_ease-in-out_infinite]"
    >
      <svg viewBox="0 0 72 84" aria-hidden="true" className="h-[42px] w-9">
        <rect
          x="18"
          y="6"
          width="36"
          height="64"
          rx="18"
          fill="none"
          stroke="currentColor"
          strokeWidth="4"
        />
        <rect
          x="32.5"
          y="18"
          width="7"
          height="16"
          rx="3.5"
          fill="currentColor"
          className="origin-center motion-safe:animate-[scroll-indicator-wheel_1.6s_ease-in-out_infinite]"
        />
      </svg>
      <span className="block text-[0.375rem] font-semibold uppercase tracking-[0.16em]">
        Scroll Down
      </span>
    </div>
  )
}

export default ScrollIndicator
