import PageHeader from '../components/PageHeader'
import { alunosAPI } from '../lib/api'
import { useState, useEffect } from 'react'
import { useToast } from '../hooks/use-toast'

export default function ProfessorEnviar() {
  const [alunos, setAlunos] = useState<any[]>([])
  const [studentId, setStudentId] = useState<number | null>(null)
  const [value, setValue] = useState(100)
  const [turma, setTurma] = useState('')
  const [reason, setReason] = useState('Reconhecimento do Professor')
  const { success, error } = useToast()

  useEffect(() => {
    async function loadAlunos() {
      try {
        const data = await alunosAPI.listar()
        setAlunos(data)
        if (data.length > 0) {
          setStudentId(data[0].id!)
        }
      } catch (err) {
        error('Erro ao carregar lista de alunos')
      }
    }
    loadAlunos()
  }, [error])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!studentId) return

    try {
      // Add coins to student
      await alunosAPI.adicionarMoedas(studentId, value)

      // TODO: Create transaction record when endpoint is available
      success('Moedas enviadas com sucesso!')

      // Reset form
      setValue(100)
      setTurma('')
      setReason('Reconhecimento do Professor')
    } catch (err) {
      error('Erro ao enviar moedas. Tente novamente.')
    }
  }

  return (
    <div>
      <PageHeader title="Enviar Moedas" action={<span className="text-sm text-slate-500">Formulário</span>} />
      <div className="card p-4">
        <h3 className="font-medium mb-4">Reconhecer Aluno</h3>
        <form className="grid md:grid-cols-2 gap-4" onSubmit={handleSubmit}>
          <div className="md:col-span-2">
            <label className="label">Aluno</label>
            <select
              className="input"
              value={studentId || ''}
              onChange={e => setStudentId(Number(e.target.value))}
            >
              {alunos.map(s => (
                <option key={s.id} value={s.id}>{s.nome}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="label">Quantidade de moedas</label>
            <input
              className="input"
              type="number"
              value={value}
              onChange={e => setValue(Number(e.target.value))}
              min="1"
              required
            />
          </div>
          <div>
            <label className="label">Turma (opcional)</label>
            <input
              className="input"
              placeholder="ENG-2025"
              value={turma}
              onChange={e => setTurma(e.target.value)}
            />
          </div>
          <div className="md:col-span-2">
            <label className="label">Motivo do reconhecimento</label>
            <textarea
              className="input min-h-[96px]"
              placeholder="Descreva o motivo aqui..."
              value={reason}
              onChange={e => setReason(e.target.value)}
              required
            />
          </div>
          <div className="md:col-span-2 flex justify-end">
            <button className="btn" type="submit">Enviar</button>
          </div>
        </form>
      </div>
    </div>
  )
}
