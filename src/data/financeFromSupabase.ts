import { mockFinance } from './mockFinance'
import type { FinanceEntry } from '../types'
import { getSupabase, isSupabaseConfigured } from '../lib/supabase'

type FinanceRow = {
  id: string
  entry_date: string
  label: string
  amount: number | string
}

function rowToEntry (row: FinanceRow): FinanceEntry {
  const amt =
    typeof row.amount === 'number'
      ? row.amount
      : Number.parseFloat(String(row.amount))
  const dateIso =
    typeof row.entry_date === 'string'
      ? row.entry_date.includes('T')
        ? row.entry_date.slice(0, 10)
        : row.entry_date
      : ''
  return {
    id: row.id,
    date: dateIso,
    label: row.label,
    amount: Number.isFinite(amt) ? amt : 0,
  }
}

/** Solo per utenti con JWT admin (policy RLS). */
export async function loadFinanceEntries (): Promise<FinanceEntry[]> {
  if (!isSupabaseConfigured()) return mockFinance

  const sb = getSupabase()
  if (!sb) return mockFinance

  const { data, error } = await sb
    .from('finance_entries')
    .select('id, entry_date, label, amount')
    .order('entry_date', { ascending: false })

  if (error) {
    console.error('[supabase] lettura finance_entries:', error.message)
    return []
  }
  const rows = (data ?? []) as FinanceRow[]
  if (!rows.length) return []
  return rows.map(rowToEntry)
}

export async function insertFinanceEntry (
  entry: Omit<FinanceEntry, 'id'>,
): Promise<{ ok: boolean; row?: FinanceEntry; error?: string }> {
  const sb = getSupabase()
  if (!sb) {
    return { ok: false, error: 'Client non disponibile' }
  }

  const { data, error } = await sb
    .from('finance_entries')
    .insert({
      entry_date: entry.date,
      label: entry.label,
      amount: entry.amount,
    })
    .select('id, entry_date, label, amount')
    .single()

  if (error) {
    return { ok: false, error: error.message }
  }
  return { ok: true, row: rowToEntry(data as FinanceRow) }
}
