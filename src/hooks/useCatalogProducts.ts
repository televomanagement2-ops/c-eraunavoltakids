import { useEffect, useState } from 'react'
import type { Product } from '../types'
import { getCatalogProductsCached } from '../data/productsFromSupabase'

type Status = 'loading' | 'ready' | 'error'

/** Prodotti storefront (Supabase quando configurato, altrimenti mock). Cache condivisa. */
export function useCatalogProducts (): {
  products: Product[]
  status: Status
} {
  const [products, setProducts] = useState<Product[]>([])
  const [status, setStatus] = useState<Status>('loading')

  useEffect(() => {
    let cancelled = false
    setStatus('loading')
    getCatalogProductsCached()
      .then((list) => {
        if (cancelled) return
        setProducts(list)
        setStatus('ready')
      })
      .catch(() => {
        if (cancelled) return
        setStatus('error')
      })
    return () => {
      cancelled = true
    }
  }, [])

  return { products, status }
}
