import { Link, useParams } from 'react-router-dom'
import { PageShell } from '../components/layout/PageShell'
import { ProductGrid } from '../components/products/ProductGrid'
import { useCatalogProducts } from '../hooks/useCatalogProducts'
import { useMediaQuery } from '../hooks/useMediaQuery'

export default function ProductDetail () {
  const { productId } = useParams()
  const isDesktop = useMediaQuery('(min-width: 1024px)')
  const { products, status } = useCatalogProducts()
  const product = productId ? products.find((item) => item.id === productId) : undefined

  if (status === 'loading') {
    return (
      <PageShell>
        <section className="section">
          <p className="muted">Caricamento prodotto…</p>
        </section>
      </PageShell>
    )
  }

  if (!product) {
    return (
      <PageShell>
        <section className="section">
          <h2>Prodotto non trovato</h2>
          <Link to="/catalogo" className="section__link">
            Torna al catalogo
          </Link>
        </section>
      </PageShell>
    )
  }

  const related = products.filter((p) => p.id !== product.id).slice(0, 4)

  return (
    <PageShell>
      <section className="section product-detail">
        {isDesktop ? (
          <div className="product-detail__layout">
            <div className="product-detail__gallery">
              <img src={product.images[0]} alt={product.name} />
              <div className="product-detail__thumbs">
                {product.images.map((image, index) => (
                  <img
                    key={`${product.id}-thumb-${index}`}
                    src={image}
                    alt=""
                  />
                ))}
              </div>
            </div>
            <div className="product-detail__info">
              <div className="product-detail__meta">
                <span className="eyebrow">{product.category}</span>
                <span className="muted">SKU {product.id.toUpperCase()}</span>
              </div>
              <h2>{product.name}</h2>
              <p className="muted">{product.description}</p>
              <div className="product-detail__options">
                <div>
                  <h4>Taglie</h4>
                  <div className="chip-row">
                    {product.sizes.map((size) => (
                      <button key={size} className="chip" type="button">
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <h4>Colori</h4>
                  <div className="chip-row">
                    {product.colors.map((color) => (
                      <button key={color} className="chip chip--soft" type="button">
                        {color}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="product-detail__layout product-detail__layout--mobile">
            <img src={product.images[0]} alt={product.name} />
            <div className="product-detail__info">
              <span className="eyebrow">{product.category}</span>
              <h2>{product.name}</h2>
              <p className="muted">{product.description}</p>
              <div className="product-detail__options">
                <h4>Taglie</h4>
                <div className="chip-row">
                  {product.sizes.map((size) => (
                    <button key={size} className="chip" type="button">
                      {size}
                    </button>
                  ))}
                </div>
                <h4>Colori</h4>
                <div className="chip-row">
                  {product.colors.map((color) => (
                    <button key={color} className="chip chip--soft" type="button">
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
      <section className="section">
        <div className="section__header">
          <div>
            <span className="eyebrow">RECENSIONI</span>
            <h3>Scrivi una recensione</h3>
            <p>La tua valutazione: 5 stelle</p>
          </div>
        </div>
        <div className="review-card">
          <p className="muted">
            Questo prodotto non ha ancora recensioni. Condividi la tua.
          </p>
          <button type="button" className="button button--ghost">
            Lascia una recensione
          </button>
        </div>
      </section>
      <section className="section">
        <div className="section__header">
          <div>
            <span className="eyebrow">CORRELATI</span>
            <h3>Scelti per completare il look</h3>
          </div>
        </div>
        <ProductGrid products={related} />
      </section>
    </PageShell>
  )
}
