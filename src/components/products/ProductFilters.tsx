import type { CatalogFilters } from '../../utils/filters'
import type { ProductCategory, ProductColor, ProductSize } from '../../types'

const ALL_LABEL = 'Tutte'

type ProductFiltersProps = {
  filters: CatalogFilters
  categories: ProductCategory[]
  sizes: ProductSize[]
  colors: ProductColor[]
  minPrice: number
  maxPrice: number
  onChange: (next: CatalogFilters) => void
}

export function ProductFilters({
  filters,
  categories,
  sizes,
  colors,
  minPrice,
  maxPrice,
  onChange,
}: ProductFiltersProps) {
  const update = (patch: Partial<CatalogFilters>) => {
    onChange({ ...filters, ...patch })
  }

  const setMin = (value: number) => {
    const clamped = Math.min(value, filters.priceMax)
    update({ priceMin: clamped })
  }

  const setMax = (value: number) => {
    const clamped = Math.max(value, filters.priceMin)
    update({ priceMax: clamped })
  }

  return (
    <div className="filters">
      <div className="filters__group">
        <label htmlFor="search">Ricerca</label>
        <input
          id="search"
          type="search"
          placeholder="Nome o descrizione"
          value={filters.search}
          onChange={(event) => update({ search: event.target.value })}
        />
      </div>
      <div className="filters__group">
        <label htmlFor="category">Categoria</label>
        <select
          id="category"
          value={filters.category}
          onChange={(event) =>
            update({ category: event.target.value as CatalogFilters['category'] })
          }
        >
          <option value={ALL_LABEL}>{ALL_LABEL}</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
      <div className="filters__group">
        <label htmlFor="size">Taglia</label>
        <select
          id="size"
          value={filters.size}
          onChange={(event) =>
            update({ size: event.target.value as CatalogFilters['size'] })
          }
        >
          <option value={ALL_LABEL}>{ALL_LABEL}</option>
          {sizes.map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
      </div>
      <div className="filters__group">
        <label htmlFor="color">Colore</label>
        <select
          id="color"
          value={filters.color}
          onChange={(event) =>
            update({ color: event.target.value as CatalogFilters['color'] })
          }
        >
          <option value={ALL_LABEL}>{ALL_LABEL}</option>
          {colors.map((color) => (
            <option key={color} value={color}>
              {color}
            </option>
          ))}
        </select>
      </div>
      <div className="filters__group">
        <label>Prezzo</label>
        <div className="filters__range">
          <div>
            <span>Min</span>
            <input
              type="range"
              min={minPrice}
              max={maxPrice}
              value={filters.priceMin}
              onChange={(event) => setMin(Number(event.target.value))}
            />
            <input
              type="number"
              min={minPrice}
              max={filters.priceMax}
              value={filters.priceMin}
              onChange={(event) => setMin(Number(event.target.value))}
            />
          </div>
          <div>
            <span>Max</span>
            <input
              type="range"
              min={minPrice}
              max={maxPrice}
              value={filters.priceMax}
              onChange={(event) => setMax(Number(event.target.value))}
            />
            <input
              type="number"
              min={filters.priceMin}
              max={maxPrice}
              value={filters.priceMax}
              onChange={(event) => setMax(Number(event.target.value))}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
