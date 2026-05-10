import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import type { HeroSlide } from '../../types'

const INTERVAL_MS = 6000

type HeroCarouselProps = {
  slides: HeroSlide[]
}

export function HeroCarousel({ slides }: HeroCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    if (isPaused || slides.length <= 1) {
      return
    }

    const id = window.setTimeout(() => {
      setActiveIndex((prev) => (prev + 1) % slides.length)
    }, INTERVAL_MS)

    return () => window.clearTimeout(id)
  }, [activeIndex, isPaused, slides.length])

  const trackStyle = useMemo(
    () => ({ transform: `translateX(-${activeIndex * 100}%)` }),
    [activeIndex],
  )

  const goTo = (index: number) => {
    setActiveIndex((index + slides.length) % slides.length)
  }

  const renderHeroMedia = (slide: HeroSlide, slideIndex: number) => {
    if (slide.images?.length) {
      const imgs = slide.images.slice(0, 4)
      return (
        <div className="hero__collage">
          {imgs.map((src, idx) => (
            <div key={`${slide.id}-${idx}`} className="hero__collage-cell">
              <img
                src={src}
                alt={
                  slide.collageAlts?.[idx] ??
                  `${slide.tag}: immagine collage ${idx + 1}`
                }
                loading={
                  slideIndex === activeIndex && idx === 0 ? 'eager' : 'lazy'
                }
              />
            </div>
          ))}
        </div>
      )
    }

    if (slide.image) {
      return (
        <div className="hero__media-single">
          <img src={slide.image} alt={slide.collageAlts?.[0] ?? slide.title} />
        </div>
      )
    }

    return null
  }

  return (
    <section
      className="hero"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="hero__foliage hero__foliage--one" aria-hidden="true" />
      <div className="hero__foliage hero__foliage--two" aria-hidden="true" />
      <div className="hero__cloud hero__cloud--a" aria-hidden="true" />
      <div className="hero__cloud hero__cloud--b" aria-hidden="true" />

      <div className="hero__track" style={trackStyle}>
        {slides.map((slide, slideIndex) => (
          <article key={slide.id} className="hero__slide">
            <div className={`hero__content ${slide.accent}`}>
              <span className="hero__tag">{slide.tag}</span>
              <h1>{slide.title}</h1>
              <p>{slide.subtitle}</p>
              <div className="hero__actions">
                <Link to="/catalogo" className="button button--primary">
                  Collezioni
                </Link>
                <Link to="/catalogo" className="button button--ghost">
                  Sfoglia tutto
                </Link>
              </div>
            </div>
            <div className="hero__media">{renderHeroMedia(slide, slideIndex)}</div>
          </article>
        ))}
      </div>
      <div className="hero__controls">
        <button
          type="button"
          className="icon-button"
          aria-label="Slide precedente"
          onClick={() => goTo(activeIndex - 1)}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path
              d="M15 6l-6 6 6 6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <div className="hero__dots">
          {slides.map((slide, index) => (
            <button
              key={slide.id}
              type="button"
              className={`hero__dot ${index === activeIndex ? 'is-active' : ''}`}
              aria-label={`Vai alla slide ${index + 1}`}
              onClick={() => goTo(index)}
            />
          ))}
        </div>
        <button
          type="button"
          className="icon-button"
          aria-label="Slide successiva"
          onClick={() => goTo(activeIndex + 1)}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path
              d="M9 6l6 6-6 6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </section>
  )
}
