import { getSupabase, isSupabaseConfigured } from '../lib/supabase'
import { invalidateCatalogCache } from './productsFromSupabase'

export type ReviewDisplay = {
  id: string
  rating: number
  body: string
  createdAt: string
  authorLabel: string
}

function formatDate (iso: string): string {
  try {
    const d = new Date(iso)
    return d.toLocaleDateString('it-IT', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    })
  } catch {
    return iso
  }
}

export async function listReviewsWithAuthors (
  productId: string,
): Promise<ReviewDisplay[]> {
  if (!isSupabaseConfigured()) return []

  const sb = getSupabase()
  if (!sb) return []

  const { data: reviews, error } = await sb
    .from('reviews')
    .select('id, user_id, rating, body, created_at')
    .eq('product_id', productId)
    .order('created_at', { ascending: false })

  if (error || !reviews?.length) return []

  type RRow = {
    id: string
    user_id: string
    rating: number
    body: string
    created_at: string
  }

  const rows = reviews as RRow[]
  const ids = [...new Set(rows.map((r) => r.user_id))]
  const { data: profs } = await sb
    .from('profiles')
    .select('id, full_name')
    .in('id', ids)

  type PRow = { id: string; full_name: string | null }
  const nameById = new Map<string, string | null>(
    ((profs ?? []) as PRow[]).map((p) => [p.id, p.full_name]),
  )

  return rows.map((r) => ({
    id: r.id,
    rating: r.rating,
    body: r.body,
    createdAt: formatDate(r.created_at),
    authorLabel:
      nameById.get(r.user_id)?.trim() || 'Cliente',
  }))
}

export async function getMyReview (
  productId: string,
  userId: string,
): Promise<{ id: string; rating: number; body: string } | null> {
  const sb = getSupabase()
  if (!sb) return null
  const { data, error } = await sb
    .from('reviews')
    .select('id, rating, body')
    .eq('product_id', productId)
    .eq('user_id', userId)
    .maybeSingle()
  if (error || !data) return null
  const row = data as { id: string; rating: number; body: string }
  return row
}

export async function upsertMyReview (params: {
  productId: string
  userId: string
  rating: number
  body: string
}): Promise<{ error: string | null }> {
  const sb = getSupabase()
  if (!sb) return { error: 'Client non configurato' }

  const existing = await getMyReview(params.productId, params.userId)

  if (existing) {
    const { error } = await sb
      .from('reviews')
      .update({
        rating: params.rating,
        body: params.body.trim(),
        updated_at: new Date().toISOString(),
      })
      .eq('id', existing.id)
    if (error) return { error: error.message }
  } else {
    const { error } = await sb.from('reviews').insert({
      product_id: params.productId,
      user_id: params.userId,
      rating: params.rating,
      body: params.body.trim(),
    })
    if (error) return { error: error.message }
  }

  invalidateCatalogCache()
  return { error: null }
}
