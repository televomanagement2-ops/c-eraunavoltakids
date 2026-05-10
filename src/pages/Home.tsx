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
    <PageShell footerOnMobile>
      {isDesktop ? <HomeDesktop /> : <HomeMobile />}
    </PageShell>
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
        {!showShelf ? (
          <p className="muted">Caricamento catalogo…</p>
        ) : products.length === 0 ? (
          <p className="muted">Nessun prodotto in vetrina al momento.</p>
        ) : (
          <ProductGrid products={products.slice(0, 6)} />
        )}
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
        {!showShelf ? (
          <p className="muted">Caricamento catalogo…</p>
        ) : products.length === 0 ? (
          <p className="muted">Nessun prodotto in vetrina al momento.</p>
        ) : (
          <ProductGrid products={products.slice(0, 8)} variant="compact" />
        )}
      </section>
    </>
  )
}
