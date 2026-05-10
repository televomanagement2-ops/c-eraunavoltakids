import { createClient, type SupabaseClient } from '@supabase/supabase-js'

function normalizeSupabaseUrl (raw: string): string {
  let url = raw.trim()
  // Molti copiano per errore l'endpoint REST (`/rest/v1`). Supabase client vuole l'origin del progetto.
  url = url.replace(/\/rest\/v1\/?$/i, '')
  // Rimuovi slash finali extra per evitare doppi slash negli URL generati dal client.
  url = url.replace(/\/+$/, '')
  return url
}

function readEnv (): { url: string; anonKey: string } | null {
  const url = normalizeSupabaseUrl(import.meta.env.VITE_SUPABASE_URL ?? '')
  const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY?.trim() ?? ''
  if (!url || !anonKey) return null
  return { url, anonKey }
}

let cached: SupabaseClient | undefined

/** True se sono impostati URL + anon key (puoi compilare comunque senza backend). */
export function isSupabaseConfigured (): boolean {
  return readEnv() !== null
}

export function getSupabase (): SupabaseClient | null {
  const env = readEnv()
  if (!env) return null
  cached ??= createClient(env.url, env.anonKey, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
      flowType: 'pkce',
    },
  })
  return cached
}
