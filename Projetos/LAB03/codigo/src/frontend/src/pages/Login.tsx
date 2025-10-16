import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Role, defaultDashboard } from '../lib/store'
import { useAuth } from '../context/Auth'

export default function Login({ fixedRole }: { fixedRole?: Role }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState<Role>(fixedRole || 'aluno')
  const navigate = useNavigate()
  const loc = useLocation()
  const { login } = useAuth()

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email || !password) return
    try {
      login(email, role)
      const to = (loc.state as any)?.from?.pathname || defaultDashboard(role)
      navigate(to, { replace: true })
    } catch (e) {
      alert('Falha no login (verifique e-mail/role nas seeds).')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="card w-full max-w-md p-6 md:p-8">
        <h2 className="text-xl font-semibold mb-6">Entrar</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="label">E-mail</label>
            <input className="input" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="ana@uni.br" />
          </div>
          <div>
            <label className="label">Senha</label>
            <input className="input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <div>
            <label className="label">Perfil de Acesso</label>
            <div className="flex gap-3 text-sm">
              <label className="flex items-center gap-1 opacity-90">
                <input type="radio" name="role" checked={role==='aluno'} onChange={()=>!fixedRole && setRole('aluno')} disabled={!!fixedRole && fixedRole!=='aluno'} /> Aluno
              </label>
              <label className="flex items-center gap-1 opacity-90">
                <input type="radio" name="role" checked={role==='professor'} onChange={()=>!fixedRole && setRole('professor')} disabled={!!fixedRole && fixedRole!=='professor'} /> Professor
              </label>
              <label className="flex items-center gap-1 opacity-90">
                <input type="radio" name="role" checked={role==='empresa'} onChange={()=>!fixedRole && setRole('empresa')} disabled={!!fixedRole && fixedRole!=='empresa'} /> Empresa
              </label>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <Link to="/cadastro-aluno" className="text-brand hover:text-brand-dark text-sm">Não tem uma conta? Cadastre-se</Link>
            <button type="submit" className="btn">Entrar</button>
          </div>
        </form>
      </div>
    </div>
  )
}
