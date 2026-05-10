import type { Product } from '../../types'
import { ProductCard } from './ProductCard'

type ProductGridProps = {
  products: Product[]
  variant?: 'default' | 'compact'
}

export function ProductGrid({ products, variant = 'default' }: ProductGridProps) {
  return (
    <div className={`product-grid product-grid--${variant}`}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} variant={variant} />
      ))}
    </div>
  )
}
