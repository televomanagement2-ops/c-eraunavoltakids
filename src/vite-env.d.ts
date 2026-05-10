/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SUPABASE_URL: string
  readonly VITE_SUPABASE_ANON_KEY: string
  /** `true` per usare i mock se il catalogo DB è vuoto (solo sviluppo) */
  readonly VITE_USE_CATALOG_MOCK?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
