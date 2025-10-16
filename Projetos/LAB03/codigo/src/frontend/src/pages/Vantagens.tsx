import PageHeader from '../components/PageHeader'
import AdvantageCard from '../components/AdvantageCard'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useToast } from '../hooks/use-toast'

type Vantagem = {
  id: number
  descricao: string
  custoMoedas: number
}

export default function Vantagens() {
  const navigate = useNavigate()
  const { error } = useToast()
  const [vantagens, setVantagens] = useState<Vantagem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadVantagens() {
      try {
        // TODO: Load from backend when endpoint is available
        // For now, use empty array
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
      <PageHeader title="Vantagens" action={<a className="text-sm text-slate-500">Marketplace</a>} />
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {vantagens.length === 0 ? (
          <div className="col-span-3 text-center text-slate-500 py-8">
            Nenhuma vantagem disponível no momento
          </div>
        ) : (
          vantagens.map(v => (
            <AdvantageCard
              key={v.id}
              item={{ id: v.id.toString(), title: v.descricao, price: v.custoMoedas }}
              onDetails={(id) => navigate(`/vantagens/${id}`)}
            />
          ))
        )}
      </div>
    </div>
  )
}
