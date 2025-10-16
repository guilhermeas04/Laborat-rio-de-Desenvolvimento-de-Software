import PageHeader from '../components/PageHeader'
import { store } from '../lib/store'
import { useState } from 'react'

export default function ProfessorEnviar() {
  const [studentId, setStudentId] = useState('s1')
  const [value, setValue] = useState(100)
  const [turma, setTurma] = useState('')
  const [reason, setReason] = useState('Reconhecimento do Professor')
  return (
    <div>
      <PageHeader title="Enviar Moedas" action={<span className="text-sm text-slate-500">Formulário</span>} />
      <div className="card p-4">
        <h3 className="font-medium mb-4">Reconhecer Aluno</h3>
        <form className="grid md:grid-cols-2 gap-4" onSubmit={(e)=>{e.preventDefault(); store.recognize(studentId, value, reason + (turma? ` • ${turma}`:'')); alert('Moedas enviadas!');}}>
          <div className="md:col-span-2">
            <label className="label">Aluno</label>
            <select className="input" value={studentId} onChange={e=>setStudentId(e.target.value)}>
              {store.getDB().students.map(s=> <option key={s.id} value={s.id}>{s.name}</option>)}
            </select>
          </div>
          <div>
            <label className="label">Quantidade de moedas</label>
            <input className="input" type="number" value={value} onChange={e=>setValue(Number(e.target.value))} />
          </div>
          <div>
            <label className="label">Turma (opcional)</label>
            <input className="input" placeholder="ENG-2025" value={turma} onChange={e=>setTurma(e.target.value)} />
          </div>
          <div className="md:col-span-2">
            <label className="label">Motivo do reconhecimento</label>
            <textarea className="input min-h-[96px]" placeholder="Descreva o motivo aqui..." value={reason} onChange={e=>setReason(e.target.value)} />
          </div>
          <div className="md:col-span-2 flex justify-end">
            <button className="btn">Enviar</button>
          </div>
        </form>
      </div>
    </div>
  )
}
