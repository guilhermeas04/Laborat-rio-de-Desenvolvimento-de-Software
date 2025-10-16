import PageHeader from '../components/PageHeader'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useToast } from '../hooks/use-toast'

type Vantagem = {
  id: number
  descricao: string
  custoMoedas: number
}

export default function EmpresaVantagens() {
  const [vantagens, setVantagens] = useState<Vantagem[]>([])
  const [loading, setLoading] = useState(true)
  const { error } = useToast()

  useEffect(() => {
    async function loadVantagens() {
      try {
        // TODO: Load from backend when endpoint is available
        setVantagens([])
      } catch (err) {
        error('Erro ao carregar vantagens')
      } finally {
        setLoading(false)
      }
    }
    loadVantagens()
  }, [error])

  if (loading) {
    return <div className="text-center py-8">Carregando...</div>
  }

  return (
    <div>
      <PageHeader title="Vantagens da Empresa" action={<Link to="/empresa/vantagens/nova" className="btn">Adicionar Nova Vantagem</Link>} />
      <div className="card p-4">
        <h3 className="font-medium mb-4">Todas as Vantagens</h3>
        {vantagens.length === 0 ? (
          <div className="text-center text-slate-500 py-8">
            Nenhuma vantagem cadastrada ainda. Clique em "Adicionar Nova Vantagem" para começar.
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {vantagens.map(v => (
              <div className="grid grid-cols-2 gap-4 items-center" key={v.id}>
                <div className="bg-slate-200 rounded-md h-48" />
                <div>
                  <div className="font-medium">{v.descricao}</div>
                  <div className="text-slate-500 text-sm">{v.custoMoedas} moedas • Ativo</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
