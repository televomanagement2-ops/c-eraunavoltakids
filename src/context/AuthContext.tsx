import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import type { Session, User } from '@supabase/supabase-js'
import { getSupabase, isSupabaseConfigured } from '../lib/supabase'
import { mapAuthErrorToMessage } from '../lib/mapAuthError'

export type UserProfile = {
  id: string
  full_name: string | null
  avatar_url: string | null
  role: 'customer' | 'admin'
}

type AuthStatus = 'unknown' | 'signedOut' | 'signedIn'

type SignUpResult = {
  error: Error | null
  /** True se Supabase richiede conferma email prima della sessione */
  pendingEmailConfirmation?: boolean
}

type AuthContextValue = {
  status: AuthStatus
  session: Session | null
  user: User | null
  profile: UserProfile | null
  /** Ricarica `profiles` (es. dopo promozione ad admin nel DB). */
  refreshProfile: () => Promise<void>
  signInWithEmail: (
    email: string,
    password: string,
  ) => Promise<{ error: Error | null }>
  signUp: (params: {
    email: string
    password: string
    fullName?: string
  }) => Promise<SignUpResult>
  signInWithGoogle: () => Promise<{ error: Error | null }>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

async function fetchProfileRow (userId: string): Promise<UserProfile | null> {
  const sb = getSupabase()
  if (!sb) return null
  type Row = {
    id: string
    full_name: string | null
    avatar_url: string | null
    role: UserProfile['role']
  }
  const { data, error } = await sb
    .from('profiles')
    .select('id, full_name, avatar_url, role')
    .eq('id', userId)
    .maybeSingle()

  if (error || !data) {
    if (error?.message) console.error('[supabase] profilo:', error.message)
    return null
  }

  const row = data as Row
  return {
    id: row.id,
    full_name: row.full_name,
    avatar_url: row.avatar_url,
    role: row.role === 'admin' ? 'admin' : 'customer',
  }
}

async function loadProfileWithEnsure (userId: string): Promise<UserProfile | null> {
  const sb = getSupabase()
  let row = await fetchProfileRow(userId)
  if (row || !sb) return row

  const { error: rpcErr } = await sb.rpc('ensure_profile')
  if (rpcErr) {
    console.error('[supabase] ensure_profile:', rpcErr.message)
    return null
  }

  row = await fetchProfileRow(userId)
  return row
}

export function AuthProvider ({ children }: { children: ReactNode }) {
  const sb = useMemo(() => getSupabase(), [])
  const [session, setSession] = useState<Session | null>(null)
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [status, setStatus] = useState<AuthStatus>(() =>
    !isSupabaseConfigured() ? 'signedOut' : 'unknown',
  )

  const refreshProfile = useCallback(async () => {
    const uid = session?.user?.id
    if (!uid || !sb) {
      setProfile(null)
      return
    }
    const row = await loadProfileWithEnsure(uid)
    setProfile(row)
  }, [sb, session?.user?.id])

  useEffect(() => {
    if (!sb) {
      setSession(null)
      setProfile(null)
      setStatus('signedOut')
      return
    }

    sb.auth
      .getSession()
      .then(({ data: { session: s } }) => {
        setSession(s)
        setStatus(s?.user ? 'signedIn' : 'signedOut')
      })
      .catch(() => {
        setSession(null)
        setStatus('signedOut')
      })

    const {
      data: { subscription },
    } = sb.auth.onAuthStateChange((_event, s) => {
      setSession(s)
      setStatus(s?.user ? 'signedIn' : 'signedOut')
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [sb])

  useEffect(() => {
    if (!sb || !session?.user?.id) {
      setProfile(null)
      return
    }
    void loadProfileWithEnsure(session.user.id).then(setProfile)
  }, [sb, session?.user?.id])

  const signInWithEmail = useCallback(
    async (email: string, password: string) => {
      if (!sb) {
        return { error: new Error('Supabase non configurato (variabili env mancanti).') }
      }
      const { error } = await sb.auth.signInWithPassword({
        email: email.trim(),
        password,
      })
      if (!error) return { error: null }
      return { error: new Error(mapAuthErrorToMessage(error)) }
    },
    [sb],
  )

  const signUp = useCallback(
    async ({
      email,
      password,
      fullName,
    }: {
      email: string
      password: string
      fullName?: string
    }): Promise<SignUpResult> => {
      if (!sb) {
        return { error: new Error('Supabase non configurato (variabili env mancanti).') }
      }
      const { data, error } = await sb.auth.signUp({
        email: email.trim(),
        password,
        options: {
          data: {
            full_name: fullName?.trim() ?? undefined,
            name: fullName?.trim() ?? undefined,
          },
        },
      })
      if (error) {
        return { error: new Error(mapAuthErrorToMessage(error)) }
      }
      const pending =
        Boolean(data.user) && !data.session
      return { error: null, pendingEmailConfirmation: pending }
    },
    [sb],
  )

  const signInWithGoogle = useCallback(async () => {
    if (!sb) {
      return { error: new Error('Supabase non configurato (variabili env mancanti).') }
    }
    const stable = import.meta.env.VITE_SITE_URL?.trim()
    const base = stable && /^https?:\/\//i.test(stable) ? stable.replace(/\/+$/, '') : globalThis.window.location.origin
    const redirectTo = `${base}/`
    const { error } = await sb.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo },
    })
    if (!error) return { error: null }
    return { error: new Error(mapAuthErrorToMessage(error)) }
  }, [sb])

  const signOut = useCallback(async () => {
    if (!sb) return
    await sb.auth.signOut()
    setProfile(null)
  }, [sb])

  const value = useMemo<AuthContextValue>(
    () => ({
      status,
      session,
      user: session?.user ?? null,
      profile,
      refreshProfile,
      signInWithEmail,
      signUp,
      signInWithGoogle,
      signOut,
    }),
    [
      profile,
      refreshProfile,
      session,
      signInWithEmail,
      signUp,
      signInWithGoogle,
      signOut,
      status,
    ],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth (): AuthContextValue {
  const ctx = useContext(AuthContext)
  if (!ctx) {
    throw new Error('useAuth deve essere usato dentro AuthProvider.')
  }
  return ctx
}
