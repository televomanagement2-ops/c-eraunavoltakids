import { useEffect, useState } from 'react'
import { PageShell } from '../components/layout/PageShell'
import { BrandDetailModal } from '../components/brands/BrandDetailModal'
import { brands } from '../data/mockBrands'

const ROTATE_MS = 4000

export default function Brands() {
  const [index, setIndex] = useState(0)
  const [detail, setDetail] = useState<(typeof brands)[number] | null>(null)

  useEffect(() => {
    if (brands.length <= 1 || detail !== null) return
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % brands.length)
    }, ROTATE_MS)
    return () => window.clearInterval(id)
  }, [detail])

  useEffect(() => {
    if (!detail) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setDetail(null)
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [detail])

  const active = brands[index]!

  return (
    <PageShell footerOnMobile>
      <section className="section brands-page">
        <div className="section__header">
          <span className="eyebrow">Curati per le famiglie</span>
          <h1>I nostri marchi</h1>
          <p>Passiamo ogni stagione nei laboratori selezionati per portarti texture che respirano con i bambini.</p>
        </div>

        <div className="brands-hero">
          <p className="brands-hero__hint" aria-live="polite">
            Brand in primo piano · cambia ogni pochi secondi
          </p>
          <p key={active.id} className="brands-hero__title">
            {active.name}
          </p>
          {active.tagline ? <p className="brands-hero__tag">{active.tagline}</p> : null}
          <button
            type="button"
            className="button button--primary brands-hero__cta"
            onClick={() => setDetail(active)}
          >
            Clicca qui per più informazioni
          </button>
        </div>
      </section>

      <BrandDetailModal brand={detail} onClose={() => setDetail(null)} />
    </PageShell>
  )
}
