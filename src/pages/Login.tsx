import type { FormEvent } from 'react'
import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { PageShell } from '../components/layout/PageShell'
import { isSupabaseConfigured } from '../lib/supabase'
import { useAuth } from '../context/AuthContext'

type LocationFrom = {
  from?: { pathname: string }
}

export default function Login () {
  const navigate = useNavigate()
  const location = useLocation()
  const {
    signInWithEmail,
    signUp,
    signInWithGoogle,
    signOut,
    status,
    user,
    profile,
  } = useAuth()
  const [notice, setNotice] = useState<string | null>(null)
  const [mode, setMode] = useState<'login' | 'register'>('login')
  const configured = isSupabaseConfigured()

  const fromPath =
    (location.state as LocationFrom | null)?.from?.pathname ?? '/'

  const goAfterAuth = () => {
    navigate(fromPath, { replace: true })
  }

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setNotice(null)
    const form = e.currentTarget
    const email = (form.elements.namedItem('email') as HTMLInputElement).value
    const password = (form.elements.namedItem('password') as HTMLInputElement)
      .value

    if (mode === 'login') {
      const { error } = await signInWithEmail(email, password)
      if (error) {
        setNotice(error.message ?? 'Accesso non riuscito.')
        return
      }
      goAfterAuth()
      return
    }

    const fullName =
      (form.elements.namedItem('fullName') as HTMLInputElement)?.value ?? ''
    const { error, pendingEmailConfirmation } = await signUp({
      email,
      password,
      fullName: fullName.trim() || undefined,
    })
    if (error) {
      setNotice(error.message ?? 'Registrazione non riuscita.')
      return
    }
    if (pendingEmailConfirmation) {
      setNotice(
        'Ti abbiamo inviato un’email di conferma. Apri il link, poi torna per accedere.',
      )
      return
    }
    goAfterAuth()
  }

  const onGoogle = async () => {
    setNotice(null)
    const { error } = await signInWithGoogle()
    if (error) setNotice(error.message ?? 'OAuth non disponibile.')
  }

  if (status === 'signedIn' && user) {
    const display =
      profile?.full_name?.trim()
      ?? user.email
      ?? 'Account'
    return (
      <PageShell>
        <section className="section login-page">
          <div className="section__header">
            <span className="eyebrow">Account</span>
            <h1>Sei connesso</h1>
            <p>
              Bentornato, <strong>{display}</strong>
              {profile?.role === 'admin' ? (
                <>
                  {' '}
                  — profilo <strong>admin</strong>.{' '}
                  <Link to="/admin">Vai al pannello</Link>
                </>
              ) : null}
            </p>
          </div>
          <div className="login-card">
            <div className="login-actions">
              <button
                type="button"
                className="button button--primary"
                onClick={() => navigate('/')}
              >
                Vai alla home
              </button>
              <button
                type="button"
                className="button button--ghost"
                onClick={() => {
                  void signOut().then(() => navigate('/login', { replace: true }))
                }}
              >
                Disconnetti
              </button>
            </div>
          </div>
        </section>
      </PageShell>
    )
  }

  return (
    <PageShell>
      <section className="section login-page">
        <div className="section__header">
          <span className="eyebrow">Benvenuto</span>
          <h1>{mode === 'login' ? 'Accedi' : 'Crea un account'}</h1>
          <p>
            {configured
              ? 'Inserisci le tue credenziali per continuare.'
              : 'Aggiungi VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY nel file .env.'}
          </p>
        </div>

        <div className="login-card">
          <div className="login-mode-tabs">
            <button
              type="button"
              className={`button ${mode === 'login' ? 'button--primary' : 'button--ghost'}`}
              onClick={() => {
                setMode('login')
                setNotice(null)
              }}
            >
              Accedi
            </button>
            <button
              type="button"
              className={`button ${mode === 'register' ? 'button--primary' : 'button--ghost'}`}
              onClick={() => {
                setMode('register')
                setNotice(null)
              }}
            >
              Registrati
            </button>
          </div>
          {notice ? <p className="login-card__notice">{notice}</p> : null}
          <form className="login-form" onSubmit={onSubmit}>
            {mode === 'register' ? (
              <label className="contact-field">
                <span>Nome (opzionale)</span>
                <input
                  type="text"
                  name="fullName"
                  autoComplete="name"
                  placeholder="Come vuoi essere chiamato"
                />
              </label>
            ) : null}
            <label className="contact-field">
              <span>Email</span>
              <input type="email" name="email" autoComplete="email" placeholder="nome@posta.it" required />
            </label>
            <label className="contact-field">
              <span>Password</span>
              <input
                type="password"
                name="password"
                autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
                required
              />
            </label>
            <button type="submit" className="button button--primary login-form__submit">
              {mode === 'login' ? 'Accedi con email' : 'Crea account'}
            </button>
          </form>
          <div className="login-divider">
            <span>oppure</span>
          </div>
          <button type="button" className="button button--ghost login-google" onClick={onGoogle}>
            <svg className="login-google__icon" viewBox="0 0 24 24" aria-hidden="true">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            Continua con Google
          </button>
        </div>
      </section>
    </PageShell>
  )
}
