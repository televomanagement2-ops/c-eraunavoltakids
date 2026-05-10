import type { FormEvent } from 'react'
import { PageShell } from '../components/layout/PageShell'
import { StoreBannerCarousel } from '../components/about/StoreBannerCarousel'
import { storeBannerAlts, storeBannerUrls } from '../data/mockStoreImages'

export default function AboutStore() {
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    window.alert(
      'Grazie. Il modulo non è ancora collegato: integreremo raccolta messaggi dopo il backend.',
    )
  }

  return (
    <PageShell footerOnMobile>
      <section className="section section--tight-top">
        <div className="section__header">
          <span className="eyebrow">Il negozio</span>
          <h1>Chi siamo</h1>
          <p>
            Un ambiente luminoso dove provare tessuti delicati insieme a chi li userà ogni giorno.
          </p>
        </div>
        <StoreBannerCarousel urls={storeBannerUrls} alts={storeBannerAlts} />
      </section>

      <section className="section">
        <div className="section__header contact-block__header">
          <span className="eyebrow">Contattaci</span>
          <h2>Siamo qui per te</h2>
          <p>Scrivici per consiglio taglie o per organizzare un passaggio in boutique.</p>
        </div>
        <div className="contact-block">
          <div className="contact-block__aside">
            <p>
              <strong>Email:</strong>{' '}
              <a href="mailto:ciao@kids.example">ciao@kids.example</a>
            </p>
            <p>
              <strong>Telefono:</strong>{' '}
              <a href="tel:+390000000000">+39 000 000 0000</a>
            </p>
            <p className="muted">Orari lun–sab 9:30–19:30 (mock)</p>
          </div>
          <form className="contact-block__form" onSubmit={onSubmit}>
            <label className="contact-field">
              <span>Nome</span>
              <input type="text" name="name" autoComplete="name" required />
            </label>
            <label className="contact-field">
              <span>Messaggio</span>
              <textarea name="message" rows={4} required placeholder="Come possiamo aiutarti?" />
            </label>
            <button type="submit" className="button button--primary">
              Invia (demo)
            </button>
          </form>
        </div>
      </section>
    </PageShell>
  )
}
