import { useParams, Link, useNavigate } from 'react-router-dom'
import PageHeader from '../components/PageHeader'
import { store } from '../lib/store'

export default function VantagemDetalhe() {
  const { id } = useParams()
  const navigate = useNavigate()
  const vant = store.getDB().advantages.find(v => v.id === id)
  if (!vant) return <div className="text-slate-500">Vantagem não encontrada</div>
  return (
    <div>
      <PageHeader title="Detalhe da Vantagem" action={<Link to="/vantagens" className="text-sm text-slate-500">Resumo</Link>} />
      <div className="card p-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div className="aspect-video bg-slate-100 rounded-md flex items-center justify-center text-slate-400">Imagem</div>
          <div>
            <h3 className="text-xl font-semibold mb-1">{vant.title}</h3>
            <div className="text-slate-700 mb-4">{vant.price} moedas</div>
            <div className="flex gap-2 mb-6">
              <button className="btn" onClick={() => {
                const { student } = store.studentOverview()
                store.redeem(student.id, vant.id)
                navigate('/dashboard')
              }}>Resgatar Vantagem</button>
              <Link to="/vantagens" className="btn bg-slate-200 text-slate-800 hover:bg-slate-300">Voltar</Link>
            </div>
            <div className="text-sm text-orange-700 bg-orange-100 p-3 rounded-md">
              Após o resgate, você receberá instruções por e-mail para utilizar a vantagem.
            </div>
          </div>
        </div>
        <div className="mt-6">
          <h4 className="font-medium mb-2">Descrição Completa</h4>
          <p className="text-sm text-slate-700">{vant.description || 'Descrição não informada.'}</p>
        </div>
      </div>
    </div>
  )
}
