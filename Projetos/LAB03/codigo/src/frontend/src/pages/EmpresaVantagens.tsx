import PageHeader from '../components/PageHeader'
import { Link } from 'react-router-dom'
import { store } from '../lib/store'

export default function EmpresaVantagens() {
  return (
    <div>
      <PageHeader title="Vantagens da Empresa" action={<Link to="/empresa/vantagens/nova" className="btn">Adicionar Nova Vantagem</Link>} />
      <div className="card p-4">
        <h3 className="font-medium mb-4">Todas as Vantagens</h3>
        <div className="grid md:grid-cols-2 gap-6">
          {store.getDB().advantages.map(a => (
            <div className="grid grid-cols-2 gap-4 items-center" key={a.id}>
              <div className="bg-slate-200 rounded-md h-48" />
              <div>
                <div className="font-medium">{a.title}</div>
                <div className="text-slate-500 text-sm">{a.price} moedas • Ativo</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
