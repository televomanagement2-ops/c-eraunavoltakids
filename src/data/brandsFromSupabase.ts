import type { BrandProfile } from './mockBrands'
import { brands as mockBrands } from './mockBrands'
import { getSupabase, isSupabaseConfigured } from '../lib/supabase'

type BrandRow = {
  id: string
  name: string
  tagline: string | null
  description: string
  highlights: unknown
}

function mapHighlights (raw: unknown): string[] {
  if (Array.isArray(raw)) {
    return raw.filter((x): x is string => typeof x === 'string')
  }
  if (typeof raw === 'string') {
    try {
      const p = JSON.parse(raw) as unknown
      return Array.isArray(p)
        ? p.filter((x): x is string => typeof x === 'string')
        : []
    } catch {
      return []
    }
  }
  return []
}

function mapRow (row: BrandRow): BrandProfile {
  return {
    id: row.id,
    name: row.name,
    tagline: row.tagline ?? undefined,
    description: row.description ?? '',
    highlights: mapHighlights(row.highlights),
  }
}

/** Marchi da Supabase; se tabella vuota o non configurato → mock. */
export async function loadBrandsFromSupabase (): Promise<BrandProfile[]> {
  if (!isSupabaseConfigured()) return mockBrands

  const sb = getSupabase()
  if (!sb) return mockBrands

  const { data, error } = await sb.from('brands').select('*').order('name')

  if (error) {
    console.error('[supabase] brands:', error.message)
    return mockBrands
  }
  const rows = (data ?? []) as BrandRow[]
  if (!rows.length) return mockBrands
  return rows.map(mapRow)
}
