import { useEffect, useState } from 'react'

const BACKGROUND_FADE_DURATION_MS = 520

type BackgroundMedia = {
  url: string | undefined
  isVideo: boolean
}

type ProjectsBackgroundMediaProps = {
  backgroundUrl: string | undefined
}

function renderBackgroundLayer(media: BackgroundMedia, opacityClassName: string) {
  if (!media.url) {
    return null
  }

  return (
    <div
      key={media.url}
      className={`pointer-events-none absolute inset-0 transition-opacity duration-500 ease-in-out ${opacityClassName}`}
    >
      {media.isVideo ? (
        <video autoPlay muted loop playsInline className="absolute inset-0 h-full w-full object-cover">
          <source src={media.url} type="video/mp4" />
        </video>
      ) : (
        <img
          src={media.url}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover opacity-[0.22]"
        />
      )}
      <div
        className={`absolute inset-0 ${
          media.isVideo
            ? 'bg-black/30'
            : 'bg-[radial-gradient(circle_at_top,rgba(96,165,250,0.14),transparent_32%),linear-gradient(180deg,rgba(8,17,32,0.82)_0%,rgba(15,23,42,0.86)_46%,rgba(17,24,39,0.92)_100%)]'
        }`}
      />
    </div>
  )
}

function ProjectsBackgroundMedia({ backgroundUrl }: ProjectsBackgroundMediaProps) {
  const isVideoBackground = Boolean(backgroundUrl && /\.(mp4|webm|ogg)(\?.*)?$/i.test(backgroundUrl))
  const [displayBackground, setDisplayBackground] = useState<BackgroundMedia>({
    url: backgroundUrl,
    isVideo: isVideoBackground,
  })
  const [previousBackground, setPreviousBackground] = useState<BackgroundMedia | null>(null)
  const [showCurrentBackground, setShowCurrentBackground] = useState(true)

  useEffect(() => {
    const nextBackground = { url: backgroundUrl, isVideo: isVideoBackground }

    if (displayBackground.url === nextBackground.url && displayBackground.isVideo === nextBackground.isVideo) {
      return
    }

    setPreviousBackground(displayBackground.url ? displayBackground : null)
    setDisplayBackground(nextBackground)
    setShowCurrentBackground(false)

    const frameId = requestAnimationFrame(() => {
      setShowCurrentBackground(true)
    })
    const timeoutId = window.setTimeout(() => {
      setPreviousBackground(null)
    }, BACKGROUND_FADE_DURATION_MS)

    return () => {
      cancelAnimationFrame(frameId)
      window.clearTimeout(timeoutId)
    }
  }, [backgroundUrl, isVideoBackground, displayBackground])

  if (!displayBackground.url && !previousBackground) {
    return null
  }

  return (
    <>
      {previousBackground
        ? renderBackgroundLayer(previousBackground, showCurrentBackground ? 'opacity-0' : 'opacity-100')
        : null}
      {displayBackground.url
        ? renderBackgroundLayer(displayBackground, showCurrentBackground ? 'opacity-100' : 'opacity-0')
        : null}
    </>
  )
}

export default ProjectsBackgroundMedia
