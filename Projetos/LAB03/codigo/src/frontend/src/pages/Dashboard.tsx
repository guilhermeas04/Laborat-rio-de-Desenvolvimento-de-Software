import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { alunosAPI } from '../lib/api'
import { useAuth } from '../context/Auth'
import { useToast } from '../hooks/use-toast'

type Transaction = {
  id: number
  titulo: string
  valor: number
  autor?: string
  data: string
}

type Vantagem = {
  id: number
  descricao: string
  custoMoedas: number
}

export default function Dashboard() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const { error } = useToast()
  const [aluno, setAluno] = useState<any>(null)
  const [transacoes, setTransacoes] = useState<Transaction[]>([])
  const [vantagens, setVantagens] = useState<Vantagem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadData() {
      try {
        // Load first student for now (TODO: use authenticated user)
        const alunos = await alunosAPI.listar()
        if (alunos.length > 0) {
          setAluno(alunos[0])
        }

        // TODO: Load transactions and advantages from backend when endpoints are ready
        setTransacoes([])
        setVantagens([])
      } catch (err) {
        error('Erro ao carregar dados do dashboard')
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [error])

  if (loading) {
    return <div className="text-center py-8">Carregando...</div>
  }

  if (!aluno) {
    return <div className="text-center py-8">Nenhum aluno encontrado</div>
  }

  const saldoTotal = aluno.saldoMoedas || 0
  const resgatadas = transacoes.filter(t => t.valor < 0).reduce((a, b) => a + Math.abs(b.valor), 0)
  const recebidas = transacoes.filter(t => t.valor > 0).reduce((a, b) => a + b.valor, 0)

  const cards = [
    { title: 'Saldo Total', value: `${saldoTotal} moedas`, hint: 'Disponível para resgate' },
    { title: 'Resgatadas', value: `${resgatadas}`, hint: 'Últimos 30 dias' },
    { title: 'Recebidas', value: `${recebidas}`, hint: 'Últimos 30 dias' },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Extrato - {aluno.nome}</h2>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((c) => (
          <div className="card p-5" key={c.title}>
            <div className="text-sm text-slate-500">{c.title}</div>
            <div className="text-2xl font-semibold mt-1">{c.value}</div>
            <div className="text-xs text-slate-400 mt-2">{c.hint}</div>
          </div>
        ))}
      </div>

      <div className="card p-5">
        <div className="font-medium mb-3">Histórico de Transações</div>
        <div className="divide-y">
          {transacoes.length === 0 ? (
            <div className="py-3 text-center text-slate-500">Nenhuma transação encontrada</div>
          ) : (
            transacoes.map((t) => (
              <div key={t.id} className="py-3 flex items-center justify-between">
                <div>
                  <div className="font-medium">{t.titulo}</div>
                  <div className="text-sm text-slate-500">{t.autor || t.data}</div>
                </div>
                <div className={`font-medium ${t.valor >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                  {t.valor >= 0 ? `+${t.valor}` : `${t.valor}`}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="font-medium">Vantagens em Destaque</div>
          <button className="text-sm text-brand hover:text-brand-dark" onClick={() => navigate('/vantagens')}>
            Marketplace
          </button>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {vantagens.length === 0 ? (
            <div className="col-span-3 text-center text-slate-500 py-8">Nenhuma vantagem disponível</div>
          ) : (
            vantagens.map((v) => (
              <div className="card overflow-hidden" key={v.id}>
                <div className="h-36 bg-slate-200" />
                <div className="p-4">
                  <div className="font-medium">{v.descricao}</div>
                  <div className="text-sm text-slate-500 mb-3">{v.custoMoedas} moedas</div>
                  <button className="btn" onClick={() => navigate(`/vantagens/${v.id}`)}>
                    Ver detalhes
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
