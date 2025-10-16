import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Role } from '../lib/store'
import { useAuth, defaultDashboard } from '../context/Auth'
import { useToast } from '../hooks/use-toast'

export default function Login({ fixedRole }: { fixedRole?: Role }) {
  const [loginInput, setLoginInput] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState<Role>(fixedRole || 'aluno')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const loc = useLocation()
  const { login } = useAuth()
  const { success, error } = useToast()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!loginInput || !password) {
      error('Por favor, preencha todos os campos')
      return
    }

    setLoading(true)
    try {
      await login(loginInput, password)
      success('Login realizado com sucesso!')

      // Get user role from response to determine redirect
      const userData = JSON.parse(localStorage.getItem('lab03-auth') || '{}')
      const userRole = userData.role || role

      const to = (loc.state as any)?.from?.pathname || defaultDashboard(userRole)
      navigate(to, { replace: true })
    } catch (err: any) {
      error(err.message || 'Falha no login. Verifique suas credenciais.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="card w-full max-w-md p-6 md:p-8">
        <h2 className="text-xl font-semibold mb-6">Entrar</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="label">Login</label>
            <input
              className="input"
              value={loginInput}
              onChange={(e) => setLoginInput(e.target.value)}
              placeholder="seu.login"
              disabled={loading}
            />
          </div>
          <div>
            <label className="label">Senha</label>
            <input
              className="input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
            />
          </div>
          <div className="flex items-center justify-between">
            <Link to="/cadastro-aluno" className="text-brand hover:text-brand-dark text-sm">Não tem uma conta? Cadastre-se</Link>
            <button type="submit" className="btn" disabled={loading}>
              {loading ? 'Entrando...' : 'Entrar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
