import { useNavigate, useParams } from 'react-router-dom'
import { useState } from 'react'
import { store } from '../lib/store'

export default function StudentDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  if (!id) return <div>Aluno não encontrado.</div>
  const db = store.getDB()
  const initial = db.students.find(s => s.id === id)
  if (!initial) return <div>Aluno não encontrado.</div>
  const [name, setName] = useState(initial.name)
  const [email, setEmail] = useState(initial.email)

  function handleSave(e: React.FormEvent) {
    e.preventDefault()
    store.updateStudent(id, { name, email })
    alert('Atualizado!')
    navigate(-1)
  }
  function handleDelete() {
    if (!confirm('Excluir este aluno? Essa ação é irreversível.')) return
    store.deleteStudent(id)
    alert('Excluído!')
    navigate(-1)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Detalhes do Aluno</h2>
        <button className="btn bg-slate-200 text-slate-800 hover:bg-slate-300" onClick={()=>navigate(-1)}>Voltar</button>
      </div>
      <div className="card p-4">
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="label">Nome</label>
            <input className="input" value={name} onChange={e=>setName(e.target.value)} />
          </div>
          <div>
            <label className="label">E-mail</label>
            <input className="input" type="email" value={email} onChange={e=>setEmail(e.target.value)} />
          </div>
          <div className="flex gap-2 justify-end">
            <button type="button" className="btn bg-rose-600 hover:bg-rose-700" onClick={handleDelete}>Excluir</button>
            <button type="submit" className="btn">Salvar</button>
          </div>
        </form>
      </div>
    </div>
  )
}
