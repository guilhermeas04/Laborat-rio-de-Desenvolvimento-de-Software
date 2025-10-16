import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function CadastroEmpresa() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [cnpj, setCnpj] = useState('')
  const navigate = useNavigate()

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!name || !email || !password) return alert('Preencha razão social, e-mail e senha')
    alert('Cadastro de empresa registrado localmente. Faça login como Empresa.')
    navigate('/login/empresa', { replace: true })
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="card w-full max-w-md p-6 md:p-8">
        <h2 className="text-xl font-semibold mb-6">Cadastro de Empresa</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="label">Razão Social</label>
            <input className="input" value={name} onChange={e=>setName(e.target.value)} />
          </div>
          <div>
            <label className="label">E-mail</label>
            <input className="input" type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="contato@empresa.com" />
          </div>
          <div>
            <label className="label">Senha</label>
            <input className="input" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
          </div>
          <div>
            <label className="label">CNPJ</label>
            <input className="input" value={cnpj} onChange={e=>setCnpj(e.target.value)} placeholder="00.000.000/0001-00" />
          </div>
          <div className="flex justify-end">
            <button className="btn" type="submit">Concluir Cadastro</button>
          </div>
        </form>
      </div>
    </div>
  )
}
