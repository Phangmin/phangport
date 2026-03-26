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
      <path d="M8.6 31.2L29.4 35" stroke="#60A5FA" strokeWidth="1.8" strokeLinecap="round" opacity="0.58" />
      <path d="M29.5 35L35 44.6" stroke="#DBEAFE" strokeWidth="1.8" strokeLinecap="round" opacity="0.76" />
    </svg>
  )
}

function HeroPaperPlanes({ visible = true }) {
  return (
    <div
      aria-hidden="true"
      data-visible={visible ? 'true' : 'false'}
      className="pointer-events-none fixed inset-x-0 -top-[18vh] -bottom-[18vh] z-0 overflow-visible opacity-100 transition-opacity duration-300 data-[visible=false]:invisible data-[visible=false]:opacity-0"
    >
      <div className="absolute left-0 top-0 w-9 text-sky-300/20 opacity-50 motion-safe:animate-[plane-wander_28s_linear_infinite] max-[959px]:w-[27px]">
        <div className="relative grid place-items-center motion-safe:animate-[plane-turn_28s_linear_infinite]">
          <div className="absolute left-[-6px] top-[63%] inline-flex -translate-x-full -translate-y-1/2 items-center gap-1 opacity-90">
            <span className="block h-0.5 w-0.5 rounded-full bg-sky-300/95 shadow-[0_0_12px_rgba(125,211,252,0.4)] opacity-70" />
            <span className="block h-[3px] w-[3px] rounded-full bg-sky-300/95 shadow-[0_0_12px_rgba(125,211,252,0.4)] opacity-85" />
            <span className="block h-1 w-1 rounded-full bg-sky-300/95 shadow-[0_0_12px_rgba(125,211,252,0.4)]" />
          </div>
          <div className="relative z-[1] block h-auto w-full drop-shadow-[0_8px_18px_rgba(148,163,184,0.14)]">
            <PlaneIcon />
          </div>
        </div>
      </div>
    </div>
  )
}

export default HeroPaperPlanes
