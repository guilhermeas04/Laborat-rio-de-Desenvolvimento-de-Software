import { store } from '../lib/store'
import { useNavigate } from 'react-router-dom'

export default function Dashboard() {
  const navigate = useNavigate()
  const { student, tx } = store.studentOverview()
  const cards = [
    { title: 'Saldo Total', value: `${student.saldo} moedas`, hint: 'Disponível para resgate' },
    { title: 'Resgatadas', value: `${tx.filter(t=>t.value<0).reduce((a,b)=>a+Math.abs(b.value),0)}`, hint: 'Últimos 30 dias' },
    { title: 'Recebidas', value: `${tx.filter(t=>t.value>0).reduce((a,b)=>a+b.value,0)}`, hint: 'Últimos 30 dias' },
  ]
  const perks = store.getDB().advantages
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Extrato</h2>
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
          {tx.map((t) => (
            <div key={t.id} className="py-3 flex items-center justify-between">
              <div>
                <div className="font-medium flex items-center gap-3">
                  <span>{t.title}</span>
                  {t.advantageId && (
                    <button className="text-sm text-brand hover:text-brand-dark underline" onClick={() => navigate(`/vantagens/${t.advantageId}`)}>
                      ver vantagem
                    </button>
                  )}
                </div>
                <div className="text-sm text-slate-500">{t.author || t.date}</div>
              </div>
              <div className={`font-medium ${t.value>=0 ? 'text-emerald-600' : 'text-rose-600'}`}>{t.value>=0?`+${t.value}`:`${t.value}`}</div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="font-medium">Vantagens em Destaque</div>
          <a className="text-sm text-brand hover:text-brand-dark" href="#">Marketplace</a>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {perks.map((p) => (
            <div className="card overflow-hidden" key={p.id}>
              <div className="h-36 bg-slate-200" />
              <div className="p-4">
                <div className="font-medium">{p.title}</div>
                <div className="text-sm text-slate-500 mb-3">{p.price} moedas</div>
                <button className="btn" onClick={() => navigate(`/vantagens/${p.id}`)}>Ver detalhes</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
