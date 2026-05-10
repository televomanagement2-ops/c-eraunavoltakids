import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { useAuth } from './AuthContext'

const ADMIN_LS_KEY = 'cuvk-enable-admin'

function readDevAdminUnlock (): boolean {
  if (!import.meta.env.DEV) {
    return false
  }

  try {
    return window.localStorage.getItem(ADMIN_LS_KEY) === 'true'
  } catch {
    return false
  }
}

function persistDevAdmin (value: boolean): void {
  if (!import.meta.env.DEV) {
    return
  }

  try {
    if (value) {
      window.localStorage.setItem(ADMIN_LS_KEY, 'true')
    } else {
      window.localStorage.removeItem(ADMIN_LS_KEY)
    }
  } catch {
    /* ignore */
  }
}

type AdminModeContextValue = {
  isAdmin: boolean
  setIsAdmin: (value: boolean) => void
  toggleAdmin: () => void
}

const AdminModeContext = createContext<AdminModeContextValue | undefined>(
  undefined,
)

type AdminModeProviderProps = {
  children: ReactNode
}

export function AdminModeProvider ({ children }: AdminModeProviderProps) {
  const { profile } = useAuth()
  const [devBypass, setDevBypass] = useState<boolean>(() => readDevAdminUnlock())

  const dbAdmin = profile?.role === 'admin'
  const isAdmin = dbAdmin || (import.meta.env.DEV && devBypass)

  const setIsAdminPersisted = useCallback((value: boolean) => {
    if (!import.meta.env.DEV) return
    setDevBypass(value)
    persistDevAdmin(value)
  }, [])

  const toggleAdmin = useCallback(() => {
    if (!import.meta.env.DEV) return
    setDevBypass((prev) => {
      const next = !prev
      persistDevAdmin(next)
      return next
    })
  }, [])

  const value = useMemo(
    () => ({
      isAdmin,
      setIsAdmin: setIsAdminPersisted,
      toggleAdmin,
    }),
    [isAdmin, setIsAdminPersisted, toggleAdmin],
  )

  return (
    <AdminModeContext.Provider value={value}>
      {children}
    </AdminModeContext.Provider>
  )
}

export function useAdminMode () {
  const context = useContext(AdminModeContext)
  if (!context) {
    throw new Error('useAdminMode must be used within AdminModeProvider')
  }
  return context
}
