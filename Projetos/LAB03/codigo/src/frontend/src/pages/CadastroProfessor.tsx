import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { store } from '../lib/store'

export default function CadastroProfessor() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!name || !email || !password) return alert('Preencha nome, e-mail e senha')
    // For demo, we only collect data and redirect; no separate professor entity in store
    alert('Cadastro de professor registrado localmente. Faça login como Professor.')
    navigate('/login/professor', { replace: true })
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="card w-full max-w-md p-6 md:p-8">
        <h2 className="text-xl font-semibold mb-6">Cadastro de Professor</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="label">Nome</label>
            <input className="input" value={name} onChange={e=>setName(e.target.value)} />
          </div>
          <div>
            <label className="label">E-mail</label>
            <input className="input" type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="prof@uni.br" />
          </div>
          <div>
            <label className="label">Senha</label>
            <input className="input" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
          </div>
          <div className="flex justify-end">
            <button className="btn" type="submit">Concluir Cadastro</button>
          </div>
        </form>
      </div>
    </div>
  )
}
