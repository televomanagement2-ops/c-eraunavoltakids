import type { AuthError } from '@supabase/supabase-js'

/** Messaggi user-friendly in italiano per errori Supabase Auth. */
export function mapAuthErrorToMessage (error: AuthError | Error | null): string {
  if (!error) return 'Errore sconosciuto.'

  const status = 'status' in error ? error.status : undefined
  if (status === 429) {
    return 'Troppi tentativi. Riprova tra qualche minuto.'
  }

  const msg = (error.message ?? '').toLowerCase()

  if (
    msg.includes('invalid login credentials')
    || msg.includes('invalid_credentials')
    || msg === 'invalid email or password'
  ) {
    return 'Email o password non corretti.'
  }

  if (
    msg.includes('email not confirmed')
    || msg.includes('email not verified')
  ) {
    return 'Controlla la posta e conferma l’indirizzo email prima di accedere.'
  }

  if (
    msg.includes('user already registered')
    || msg.includes('already been registered')
    || msg.includes('already exists')
  ) {
    return 'Questa email è già registrata. Prova ad accedere.'
  }

  if (msg.includes('signup') && msg.includes('disabled')) {
    return 'Registrazioni momentaneamente disabilitate.'
  }

  if (msg.includes('password') && (msg.includes('least') || msg.includes('short'))) {
    return 'La password non rispetta i requisiti di sicurezza.'
  }

  if (msg.includes('network') || msg.includes('fetch') || msg.includes('failed to fetch')) {
    return 'Problema di connessione. Controlla la rete e riprova.'
  }

  return error.message || 'Operazione non riuscita.'
}
