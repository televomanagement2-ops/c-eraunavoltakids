import { mockProducts } from './mockProducts'
import type { Product, ProductCategory, ProductColor, ProductSize } from '../types'
import { getSupabase, isSupabaseConfigured } from '../lib/supabase'

type ProductRow = {
  id: string
  name: string
  description: string
  price: number | string
  category: string
  sizes: string[] | null
  colors: string[] | null
  images: string[] | null
  is_new: boolean
  is_sold_out: boolean
  stock: number
  rating: number | string | null
}

function mockFallbackWhenDbEmpty (): boolean {
  if (!isSupabaseConfigured()) return true
  return import.meta.env.VITE_USE_CATALOG_MOCK === 'true'
}

function asProductCategories (sizes: string[]): Product['sizes'] {
  return sizes.map((s) => s as ProductSize)
}

function asProductColors (colors: string[]): Product['colors'] {
  return colors.map((c) => c as ProductColor)
}

function asCategory (category: string): Product['category'] {
  return category as ProductCategory
}

export function mapProductRowToProduct (row: ProductRow): Product {
  const ratingNum =
    row.rating === null || row.rating === undefined
      ? 0
      : typeof row.rating === 'number'
        ? row.rating
        : Number.parseFloat(row.rating)
  const priceNum =
    typeof row.price === 'number' ? row.price : Number.parseFloat(String(row.price))
  const sizesRaw = Array.isArray(row.sizes) ? row.sizes : []
  const colorsRaw = Array.isArray(row.colors) ? row.colors : []
  const imagesRaw = Array.isArray(row.images) ? row.images : []
  return {
    id: row.id,
    name: row.name,
    description: row.description ?? '',
    price: Number.isFinite(priceNum) ? priceNum : 0,
    category: asCategory(row.category),
    sizes: sizesRaw.length ? asProductCategories(sizesRaw) : [],
    colors: colorsRaw.length ? asProductColors(colorsRaw) : [],
    images: imagesRaw,
    isNew: row.is_new,
    isSoldOut: row.is_sold_out,
    stock: typeof row.stock === 'number' ? row.stock : 0,
    rating: Number.isFinite(ratingNum) ? ratingNum : 0,
  }
}

let catalogCache: Product[] | null = null
let inflight: Promise<Product[]> | null = null

async function fetchFromSupabase (): Promise<Product[]> {
  const sb = getSupabase()
  if (!sb) return mockProducts

  const { data, error } = await sb.from('products').select('*')

  if (error) {
    console.error('[supabase] lettura prodotti:', error.message)
    if (mockFallbackWhenDbEmpty()) return mockProducts
    return []
  }
  const rows = (data ?? []) as ProductRow[]
  if (!rows.length) {
    if (mockFallbackWhenDbEmpty()) return mockProducts
    return []
  }
  return rows.map(mapProductRowToProduct)
}

/**
 * Lista catalogo: con Supabase configurato usa il DB; se vuoto ed è attivo
 * VITE_USE_CATALOG_MOCK torna ai mock, altrimenti lista vuota.
 */
export async function loadCatalogProducts (): Promise<Product[]> {
  if (!isSupabaseConfigured()) return mockProducts
  return fetchFromSupabase()
}

/** Carica una volta per sessione SPA. */
export async function getCatalogProductsCached (): Promise<Product[]> {
  if (catalogCache) return catalogCache
  if (!inflight) inflight = loadCatalogProducts().then((p) => p)
  const list = await inflight
  inflight = null
  catalogCache = list
  return list
}

export function invalidateCatalogCache (): void {
  catalogCache = null
  inflight = null
}
