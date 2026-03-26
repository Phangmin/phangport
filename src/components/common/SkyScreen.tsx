import phangportIcon from '../../assets/phangporticon/phangport-icon.png'
import skyMedia from '../../assets/sky_media.mp4'

function SkyScreen() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.18),transparent_35%),linear-gradient(135deg,#0050b3_0%,#0b79f7_45%,#67b4ff_100%)]">
      <video autoPlay muted loop playsInline className="absolute inset-0 h-full w-full object-cover">
        <source src={skyMedia} type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.16),transparent_35%),linear-gradient(180deg,rgba(2,30,62,0.3),rgba(2,30,62,0.72))]" />
      <div className="grid gap-3 p-8 text-center text-white motion-safe:animate-[sky-glow_0.9s_ease-in-out_infinite_alternate]">
        <img
          src={phangportIcon}
          alt="PHANG PORT icon"
          className="mx-auto mb-2 h-auto w-[clamp(72px,10vw,112px)] drop-shadow-[0_12px_30px_rgba(0,0,0,0.18)]"
        />
        <p className="m-0 text-base uppercase tracking-[0.12em] opacity-80">Loading Portfolio</p>
        <h1 className="m-0 text-[clamp(2rem,4vw,3.5rem)] tracking-[-0.04em] text-white">
          PHANG PORT
        </h1>
      </div>
    </div>
  )
}

export default SkyScreen
