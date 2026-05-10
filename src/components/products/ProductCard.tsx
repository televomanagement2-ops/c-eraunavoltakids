import { Link } from 'react-router-dom'
import type { Product } from '../../types'

type ProductCardProps = {
  product: Product
  variant?: 'default' | 'compact'
}

export function ProductCard({ product, variant = 'default' }: ProductCardProps) {
  return (
    <Link to={`/prodotto/${product.id}`} className={`product-card ${variant}`}>
      <div className="product-card__media">
        <span className="product-card__fav" aria-hidden="true" title="Preferiti">
          <svg viewBox="0 0 24 24">
            <path
              d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35Z"
              fill="currentColor"
            />
          </svg>
        </span>
        <img src={product.images[0]} alt={product.name} loading="lazy" />
        {product.isNew ? <span className="badge badge--new">Nuovo</span> : null}
        {product.isSoldOut ? (
          <span className="badge badge--sold">Esaurito</span>
        ) : null}
      </div>
      <div className="product-card__body">
        <p className="product-card__category">{product.category}</p>
        <h3>{product.name}</h3>
        <p className="product-card__price">{product.price.toFixed(2)} EUR</p>
      </div>
    </Link>
  )
}
