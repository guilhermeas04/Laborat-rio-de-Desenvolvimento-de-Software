import { createContext, useContext, useEffect, useState } from 'react'
import { Role, User } from '../lib/store'
import { Navigate, useLocation } from 'react-router-dom'
import { authAPI } from '../lib/api'

type AuthCtx = {
  user?: User
  login: (login: string, senha: string) => Promise<void>
  logout: () => void
}

const Ctx = createContext<AuthCtx>({
  async login() { },
  logout() { },
})

const AUTH_KEY = 'lab03-auth'

// Helper to load user from localStorage
function loadUser(): User | undefined {
  const stored = localStorage.getItem(AUTH_KEY)
  if (!stored) return undefined
  return JSON.parse(stored)
}

// Helper to save user to localStorage
function saveUser(user: User | undefined) {
  if (user) {
    localStorage.setItem(AUTH_KEY, JSON.stringify(user))
  } else {
    localStorage.removeItem(AUTH_KEY)
  }
}

export function defaultDashboard(role: Role): string {
  if (role === 'aluno') return '/dashboard'
  if (role === 'professor') return '/prof/historico'
  return '/empresa'
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | undefined>(loadUser())

  useEffect(() => {
    setUser(loadUser())
  }, [])

  async function login(login: string, senha: string) {
    // Call backend API for authentication
    const response = await authAPI.login(login, senha)

    const authenticatedUser: User = {
      id: response.id,
      role: response.tipo as Role,
      name: response.nome,
      email: response.email,
    }

    saveUser(authenticatedUser)
    setUser(authenticatedUser)
  }

  function logout() {
    saveUser(undefined)
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
