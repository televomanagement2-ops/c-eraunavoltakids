import type { FormEvent } from 'react'
import { PageShell } from '../components/layout/PageShell'
import { StoreBannerCarousel } from '../components/about/StoreBannerCarousel'
import { storeBannerAlts, storeBannerUrls } from '../data/mockStoreImages'

export default function AboutStore() {
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const name = (form.elements.namedItem('name') as HTMLInputElement | null)?.value?.trim() ?? ''
    const message = (form.elements.namedItem('message') as HTMLTextAreaElement | null)?.value?.trim() ?? ''

    const to = 'ceraunavoltakidz@gmail.com'
    const subject = encodeURIComponent('Richiesta supporto — C’era una volta kids')
    const body = encodeURIComponent(
      [
        `Nome: ${name || '-'}`,
        '',
        message || '',
        '',
        '---',
        'Inviato dal sito (form Contattaci).',
      ].join('\n'),
    )

    window.location.href = `mailto:${to}?subject=${subject}&body=${body}`
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
        <div className="section__header contact-block__header" id="contattaci">
          <span className="eyebrow">Contattaci</span>
          <h2>Siamo qui per te</h2>
          <p>Scrivici per consiglio taglie o per organizzare un passaggio in boutique.</p>
        </div>
        <div className="contact-block">
          <div className="contact-block__aside">
            <p>
              <strong>Email:</strong>{' '}
              <a href="mailto:ceraunavoltakidz@gmail.com">ceraunavoltakidz@gmail.com</a>
            </p>
            <p>
              <strong>Telefono:</strong>{' '}
              <a href="tel:0744404633">0744 404633</a>
            </p>
            <p className="muted">Orari lun–sab 9:30–20:00</p>
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
              Invia email
            </button>
          </form>
        </div>
      </section>
    </PageShell>
  )
}
