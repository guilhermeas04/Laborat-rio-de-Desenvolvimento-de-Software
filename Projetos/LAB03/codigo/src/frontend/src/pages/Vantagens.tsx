import PageHeader from '../components/PageHeader'
import AdvantageCard from '../components/AdvantageCard'
import { store } from '../lib/store'
import { useNavigate } from 'react-router-dom'

export default function Vantagens() {
  const navigate = useNavigate()
  return (
    <div>
      <PageHeader title="Vantagens" action={<a className="text-sm text-slate-500">Marketplace</a>} />
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {store.getDB().advantages.map(a => (
          <AdvantageCard key={a.id} item={{ id: a.id, title: a.title, price: a.price }} onDetails={(id) => navigate(`/vantagens/${id}`)} />
        ))}
      </div>
    </div>
  )
}
