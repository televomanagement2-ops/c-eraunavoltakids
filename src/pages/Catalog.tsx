import { useEffect, useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { PageShell } from '../components/layout/PageShell'
import { ProductFilters } from '../components/products/ProductFilters'
import { ProductGrid } from '../components/products/ProductGrid'
import { ProductPagination } from '../components/products/ProductPagination'
import {
  productCategories,
  productColors,
  productSizes,
} from '../data/mockProducts'
import { useMediaQuery } from '../hooks/useMediaQuery'
import { useCatalogProducts } from '../hooks/useCatalogProducts'
import type { Product } from '../types'
import { filterProducts, type CatalogFilters } from '../utils/filters'
import { getPageCount, paginate } from '../utils/pagination'

const PER_PAGE = 8

export default function Catalog() {
  const isDesktop = useMediaQuery('(min-width: 1024px)')
  const [searchParams] = useSearchParams()
  const categoryParam = searchParams.get('category')
  const { products: catalogProducts, status: catalogStatus } = useCatalogProducts()

  const priceMin =
    catalogProducts.length > 0
      ? Math.min(...catalogProducts.map((product) => product.price))
      : 0
  const priceMax =
    catalogProducts.length > 0
      ? Math.max(...catalogProducts.map((product) => product.price))
      : 100

  const [filters, setFilters] = useState<CatalogFilters>(() => ({
    search: searchParams.get('search') ?? '',
    category: productCategories.includes(categoryParam as never)
      ? (categoryParam as CatalogFilters['category'])
      : 'Tutte',
    size: 'Tutte',
    color: 'Tutte',
    priceMin,
    priceMax,
    nuoviOnly: searchParams.get('nuovi') === '1',
    saldiOnly: searchParams.get('saldi') === '1',
  }))

  useEffect(() => {
    const search = searchParams.get('search') ?? ''
    const category = searchParams.get('category') ?? 'Tutte'
    const nextCategory = productCategories.includes(category as never)
      ? (category as CatalogFilters['category'])
      : 'Tutte'
    setFilters((prev) => ({
      ...prev,
      search,
      category: nextCategory,
      nuoviOnly: searchParams.get('nuovi') === '1',
      saldiOnly: searchParams.get('saldi') === '1',
    }))
  }, [searchParams])

  useEffect(() => {
    if (
      catalogStatus !== 'ready' ||
      catalogProducts.length === 0 ||
      !(Number.isFinite(priceMin) && Number.isFinite(priceMax))
    ) {
      return
    }
    setFilters((prev) => ({
      ...prev,
      priceMin,
      priceMax,
    }))
  }, [catalogProducts, catalogStatus, priceMin, priceMax])

  const filtered = useMemo(
    () => filterProducts(catalogProducts, filters),
    [catalogProducts, filters],
  )

  const [page, setPage] = useState(1)
  const pageCount = getPageCount(filtered.length, PER_PAGE)
  const paginated = paginate(filtered, page, PER_PAGE)

  const onFiltersChange = (next: CatalogFilters) => {
    setPage(1)
    setFilters({
      ...next,
      nuoviOnly: false,
      saldiOnly: false,
    })
  }

  if (catalogStatus === 'loading') {
    return (
      <PageShell>
        <section className="section section--catalog">
          <p className="muted">Caricamento catalogo…</p>
        </section>
      </PageShell>
    )
  }

  if (catalogStatus === 'ready' && catalogProducts.length === 0) {
    return (
      <PageShell>
        <section className="section section--catalog">
          <div className="section__header">
            <div>
              <span className="eyebrow">Catalogo</span>
              <h2>Stiamo aggiornando la vetrina</h2>
              <p>
                Non ci sono ancora prodotti online. Controlla di aver importato il
                catalogo in Supabase, oppure abilita il fallback mock in sviluppo
                con VITE_USE_CATALOG_MOCK=true.
              </p>
            </div>
            <Link to="/" className="section__link">
              Torna alla home
            </Link>
          </div>
        </section>
      </PageShell>
    )
  }

  return (
    <PageShell>
      <section className="section section--catalog">
        <div className="section__header">
          <div>
            <span className="eyebrow">Catalogo</span>
            <h2>Abbigliamento per neonati fino ai ragazzi</h2>
            <p>
              Filtra per categoria, taglie, colore e fascia prezzo tutto in un
              unico posto.
            </p>
          </div>
          <Link to="/" className="section__link">
            Torna alla home
          </Link>
        </div>
        {isDesktop ? (
          <div className="catalog-layout">
            <aside className="catalog-filters">
              <ProductFilters
                filters={filters}
                categories={productCategories}
                sizes={productSizes}
                colors={productColors}
                minPrice={priceMin}
                maxPrice={priceMax}
                onChange={onFiltersChange}
              />
            </aside>
            <div className="catalog-results">
              <ProductGrid products={paginated} />
              <ProductPagination
                page={page}
                pageCount={pageCount}
                onChange={setPage}
              />
            </div>
          </div>
        ) : (
          <CatalogMobile
            filters={filters}
            onFiltersChange={onFiltersChange}
            priceMin={priceMin}
            priceMax={priceMax}
            paginated={paginated}
            totalCount={filtered.length}
            page={page}
            pageCount={pageCount}
            setPage={setPage}
          />
        )}
      </section>
    </PageShell>
  )
}

type CatalogMobileProps = {
  filters: CatalogFilters
  onFiltersChange: (next: CatalogFilters) => void
  priceMin: number
  priceMax: number
  paginated: Product[]
  totalCount: number
  page: number
  pageCount: number
  setPage: (page: number) => void
}

function CatalogMobile({
  filters,
  onFiltersChange,
  priceMin,
  priceMax,
  paginated,
  totalCount,
  page,
  pageCount,
  setPage,
}: CatalogMobileProps) {
  const [showFilters, setShowFilters] = useState(false)

  return (
    <div className="catalog-mobile">
      <div className="catalog-mobile__bar">
        <button
          type="button"
          className="button button--ghost"
          onClick={() => setShowFilters(true)}
        >
          Filtri
        </button>
        <span className="catalog-mobile__count">
          {totalCount} risultati
        </span>
      </div>
      <ProductGrid products={paginated} variant="compact" />
      <ProductPagination page={page} pageCount={pageCount} onChange={setPage} />
      {showFilters ? (
        <div className="filters-drawer">
          <div className="filters-drawer__header">
            <h3>Filtri</h3>
            <button
              type="button"
              className="icon-button"
              onClick={() => setShowFilters(false)}
              aria-label="Chiudi filtri"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path
                  d="M6 6l12 12M18 6l-12 12"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>
          <ProductFilters
            filters={filters}
            categories={productCategories}
            sizes={productSizes}
            colors={productColors}
            minPrice={priceMin}
            maxPrice={priceMax}
            onChange={onFiltersChange}
          />
          <button
            type="button"
            className="button button--primary"
            onClick={() => setShowFilters(false)}
          >
            Applica
          </button>
        </div>
      ) : null}
    </div>
  )
}
