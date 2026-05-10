import { Link } from 'react-router-dom'
import { PageShell } from '../components/layout/PageShell'
import { HeroCarousel } from '../components/hero/HeroCarousel'
import { ProductGrid } from '../components/products/ProductGrid'
import { heroSlides } from '../data/mockHero'
import { useMediaQuery } from '../hooks/useMediaQuery'
import { useCatalogProducts } from '../hooks/useCatalogProducts'

export default function Home() {
  const isDesktop = useMediaQuery('(min-width: 1024px)')

  return (
    <PageShell>
      {isDesktop ? <HomeDesktop /> : <HomeMobile />}
    </PageShell>
  )
}

function HomeStories() {
  return (
    <section className="section stories-section">
      <div className="section__header">
        <div>
          <span className="eyebrow">Le nostre storie</span>
          <h2>Piccoli valori, grandi abitudini</h2>
          <p>
            Idee e cura dietro ogni tessuto che scegliamo per accompagnare la
            crescita dei bambini.
          </p>
        </div>
      </div>
      <div className="stories-grid">
        <article className="story-card">
          <div
            className="story-card__visual story-card__visual--sage"
            aria-hidden="true"
          />
          <div className="story-card__body">
            <h3>Materiali con criterio</h3>
            <p>
              Preferiamo fibre naturali e lavorazioni che rispettano la pelle
              delicata e il pianeta dove cresceranno.
            </p>
          </div>
        </article>
        <article className="story-card story-card--reverse">
          <div
            className="story-card__visual story-card__visual--rose"
            aria-hidden="true"
          />
          <div className="story-card__body">
            <h3>Comunita al centro</h3>
            <p>
              Feedback di genitori e nonni ci aiuta a tenere nel catalogo solo
              ciò che vale davvero la prova degli slacci e delle macchie.
            </p>
          </div>
        </article>
        <article className="story-card">
          <div
            className="story-card__visual story-card__visual--sky"
            aria-hidden="true"
          />
          <div className="story-card__body">
            <h3>Giornate leggere</h3>
            <p>
              Tagli pensati per muoversi, strati facili da togliere e combinare:
              anche la mattina piu frenetica parte con un pizzico di leggerezza.
            </p>
          </div>
        </article>
      </div>
    </section>
  )
}

function HomeDesktop () {
  const { products, status } = useCatalogProducts()
  const showShelf = !(status === 'loading' && products.length === 0)
  return (
    <>
      <HeroCarousel slides={heroSlides} />
      <section className="section">
        <div className="section__header">
          <div>
            <span className="eyebrow">In vetrina</span>
            <h2>I preferiti delle famiglie</h2>
            <p>
              Una selezione di capi comfy e versatile per neonati fino ai
              ragazzi, aggiornata spesso sul nostro catalogo.
            </p>
          </div>
          <Link to="/catalogo" className="section__link">
            Vedi tutto
          </Link>
        </div>
        {showShelf ? (
          <ProductGrid products={products.slice(0, 6)} />
        ) : (
          <p className="muted">Caricamento catalogo…</p>
        )}
      </section>
      <HomeStories />
      <section className="section section--cta">
        <div className="cta-card">
          <div>
            <span className="eyebrow">Pronti per giocare</span>
            <h3>Un look nuovo per ogni avventura</h3>
            <p>
              Scegli taglie facilmente e ricrea lo stesso comfort che vedi qui
              in negozio, anche quando ordini da casa.
            </p>
          </div>
          <div className="cta-actions">
            <Link to="/catalogo" className="button button--primary">
              Collezioni
            </Link>
            <button type="button" className="button button--ghost">
              Lista desideri
            </button>
          </div>
        </div>
      </section>
    </>
  )
}

function HomeMobile () {
  const { products, status } = useCatalogProducts()
  const showShelf = !(status === 'loading' && products.length === 0)
  return (
    <>
      <HeroCarousel slides={heroSlides} />
      <section className="section">
        <div className="section__header section__header--mobile">
          <div>
            <span className="eyebrow">In vetrina</span>
            <h2>I preferiti delle famiglie</h2>
            <p>
              Completini e layering facili per tutta la giornata, scelti dai
              brand che amano i bambini quanto noi.
            </p>
          </div>
          <Link to="/catalogo" className="section__link">
            Vedi tutto
          </Link>
        </div>
        {showShelf ? (
          <ProductGrid products={products.slice(0, 8)} variant="compact" />
        ) : (
          <p className="muted">Caricamento catalogo…</p>
        )}
      </section>
      <HomeStories />
    </>
  )
}
