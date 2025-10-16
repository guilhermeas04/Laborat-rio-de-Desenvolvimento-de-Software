import PageHeader from '../components/PageHeader'

export default function ProfessorHistorico() {
  return (
    <div>
      <PageHeader title="Área do Professor" />
      <div className="grid md:grid-cols-3 gap-4 mb-4">
        <div className="card p-4">
          <div className="text-xs text-slate-500">Moedas Disponíveis</div>
          <div className="text-2xl font-semibold">5.000</div>
          <div className="text-xs text-slate-400 mt-1">Para distribuição</div>
        </div>
        <div className="card p-4">
          <div className="text-xs text-slate-500">Transferidas</div>
          <div className="text-2xl font-semibold">1.200</div>
          <div className="text-xs text-slate-400 mt-1">Últimos 30 dias</div>
        </div>
        <div className="card p-4">
          <div className="text-xs text-slate-500">Alunos Reconhecidos</div>
          <div className="text-2xl font-semibold">34</div>
          <div className="text-xs text-slate-400 mt-1">Total</div>
        </div>
      </div>
      <div className="card p-4">
        <h3 className="font-medium mb-4">Histórico de Transferências</h3>
        <div className="flex items-center gap-4">
          <div className="w-48 h-48 bg-slate-200 rounded-md overflow-hidden">
            <div className="w-full h-full bg-slate-300" />
          </div>
          <div>
            <div className="font-medium">Maria Silva</div>
            <div className="text-sm text-slate-500">Projeto de Pesquisa</div>
          </div>
        </div>
      </div>
    </div>
  )
}
