import { useParams, Link, useNavigate } from 'react-router-dom'
import PageHeader from '../components/PageHeader'
import { useState, useEffect } from 'react'
import { alunosAPI } from '../lib/api'
import { useAuth } from '../context/Auth'
import { useToast } from '../hooks/use-toast'

type Vantagem = {
  id: number
  descricao: string
  custoMoedas: number
  foto?: string
}

export default function VantagemDetalhe() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()
  const { success, error, warning } = useToast()
  const [vantagem, setVantagem] = useState<Vantagem | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadVantagem() {
      try {
        // TODO: Load from backend when endpoint is available
        // For now, return null
        setVantagem(null)
      } catch (err) {
        error('Erro ao carregar detalhes da vantagem')
      } finally {
        setLoading(false)
      }
    }
    loadVantagem()
  }, [id, error])

  async function handleRedeem() {
    if (!vantagem) return

    try {
      // TODO: Get current student ID properly
      const alunos = await alunosAPI.listar()
      if (alunos.length === 0) {
        warning('Nenhum aluno encontrado')
        return
      }

      const aluno = alunos[0]

      if (aluno.saldoMoedas < vantagem.custoMoedas) {
        warning('Saldo insuficiente para resgatar esta vantagem')
        return
      }

      // Debit coins
      await alunosAPI.debitarMoedas(aluno.id!, vantagem.custoMoedas)

      // TODO: Create transaction record when endpoint is available

      success('Vantagem resgatada com sucesso!')
      navigate('/dashboard')
    } catch (err) {
      error('Erro ao resgatar vantagem. Tente novamente.')
    }
  }

  if (loading) {
    return <div className="text-center py-8">Carregando...</div>
  }

  if (!vantagem) {
    return (
      <div className="text-center py-8">
        <div className="text-slate-500 mb-4">Vantagem não encontrada</div>
        <Link to="/vantagens" className="btn">Voltar para Vantagens</Link>
      </div>
    )
  }

  return (
    <div>
      <PageHeader title="Detalhe da Vantagem" action={<Link to="/vantagens" className="text-sm text-slate-500">Resumo</Link>} />
      <div className="card p-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div className="aspect-video bg-slate-100 rounded-md flex items-center justify-center text-slate-400">
            {vantagem.foto ? (
              <img src={vantagem.foto} alt={vantagem.descricao} className="w-full h-full object-cover rounded-md" />
            ) : (
              'Imagem'
            )}
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-1">{vantagem.descricao}</h3>
            <div className="text-slate-700 mb-4">{vantagem.custoMoedas} moedas</div>
            <div className="flex gap-2 mb-6">
              <button className="btn" onClick={handleRedeem}>
                Resgatar Vantagem
              </button>
              <Link to="/vantagens" className="btn bg-slate-200 text-slate-800 hover:bg-slate-300">
                Voltar
              </Link>
            </div>
            <div className="text-sm text-orange-700 bg-orange-100 p-3 rounded-md">
              Após o resgate, você receberá instruções por e-mail para utilizar a vantagem.
            </div>
          </div>
        </div>
        <div className="mt-6">
          <h4 className="font-medium mb-2">Descrição Completa</h4>
          <p className="text-sm text-slate-700">
            {vantagem.descricao || 'Descrição não informada.'}
          </p>
        </div>
      </div>
    </div>
  )
}
