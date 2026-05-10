import { useEffect, useMemo, useState } from 'react'

const INTERVAL_MS = 5000

type StoreBannerCarouselProps = {
  urls: string[]
  alts: string[]
}

export function StoreBannerCarousel({ urls, alts }: StoreBannerCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (paused || urls.length <= 1) return
    const id = window.setTimeout(() => {
      setActiveIndex((i) => (i + 1) % urls.length)
    }, INTERVAL_MS)
    return () => window.clearTimeout(id)
  }, [activeIndex, paused, urls.length])

  const trackStyle = useMemo(
    () => ({ transform: `translateX(-${activeIndex * 100}%)` }),
    [activeIndex],
  )

  if (!urls.length) return null

  return (
    <section
      className="store-banner"
      aria-roledescription="carousel"
      aria-label="Immagini del negozio"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="store-banner__viewport">
        <div className="store-banner__track" style={trackStyle}>
          {urls.map((src, idx) => (
            <div key={`${src}-${idx}`} className="store-banner__slide">
              <img src={src} alt={alts[idx] ?? `Immagine ${idx + 1}`} loading={idx === 0 ? 'eager' : 'lazy'} />
            </div>
          ))}
        </div>
      </div>
      {urls.length > 1 ? (
        <div className="store-banner__dots" role="tablist" aria-label="Scorri le immagini">
          {urls.map((_, idx) => (
            <button
              key={`dot-${idx}`}
              type="button"
              className={`store-banner__dot ${idx === activeIndex ? 'is-active' : ''}`}
              aria-selected={idx === activeIndex}
              aria-label={`Vai alla slide ${idx + 1}`}
              onClick={() => setActiveIndex(idx)}
            />
          ))}
        </div>
      ) : null}
    </section>
  )
}
