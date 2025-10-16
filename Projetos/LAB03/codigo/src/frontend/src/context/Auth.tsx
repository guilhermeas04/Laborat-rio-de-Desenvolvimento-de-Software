import { createContext, useContext, useEffect, useState } from 'react'
import { Role, store, User, defaultDashboard } from '../lib/store'
import { Navigate, useLocation } from 'react-router-dom'

type AuthCtx = {
  user?: User
  login: (email: string, role: Role) => void
  logout: () => void
}

const Ctx = createContext<AuthCtx>({
  async login() {},
  logout() {},
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | undefined>(store.currentUser())

  useEffect(() => {
    setUser(store.currentUser())
  }, [])

  function login(email: string, role: Role) {
    const u = store.login(email, role)
    setUser(u)
  }
  function logout() {
    store.logout()
    setUser(undefined)
  }

  return <Ctx.Provider value={{ user, login, logout }}>{children}</Ctx.Provider>
}

export function useAuth() { return useContext(Ctx) }

export function RequireAuth({ children, role }: { children: JSX.Element; role?: Role }) {
  const { user } = useAuth()
  const loc = useLocation()
  if (!user) return <Navigate to="/login" state={{ from: loc }} replace />
  if (role && user.role !== role) return <Navigate to={defaultDashboard(user.role)} replace />
  return children
}
