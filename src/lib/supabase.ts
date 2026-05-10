import { createClient, type SupabaseClient } from '@supabase/supabase-js'

function readEnv (): { url: string; anonKey: string } | null {
  const url = import.meta.env.VITE_SUPABASE_URL?.trim() ?? ''
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
    },
  })
  return cached
}
