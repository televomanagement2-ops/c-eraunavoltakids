import type { Product, ProductCategory, ProductColor, ProductSize } from '../types'

export type CatalogFilters = {
  search: string
  category: ProductCategory | 'Tutte'
  size: ProductSize | 'Tutte'
  color: ProductColor | 'Tutte'
  priceMin: number
  priceMax: number
  nuoviOnly: boolean
  saldiOnly: boolean
}

export function filterProducts(products: Product[], filters: CatalogFilters) {
  const search = filters.search.trim().toLowerCase()

  return products.filter((product) => {
    if (filters.category !== 'Tutte' && product.category !== filters.category) {
      return false
    }

    if (filters.nuoviOnly && !product.isNew) {
      return false
    }

    if (filters.saldiOnly && product.category !== 'Saldi') {
      return false
    }

    if (filters.size !== 'Tutte' && !product.sizes.includes(filters.size)) {
      return false
    }

    if (filters.color !== 'Tutte' && !product.colors.includes(filters.color)) {
      return false
    }

    if (product.price < filters.priceMin || product.price > filters.priceMax) {
      return false
    }

    if (search) {
      const haystack = `${product.name} ${product.description}`.toLowerCase()
      if (!haystack.includes(search)) {
        return false
      }
    }

    return true
  })
}
