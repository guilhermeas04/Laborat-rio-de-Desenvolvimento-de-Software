export default function Transactions() {
  const mock = [
    { id: 1, aluno: 'Ana', valor: 10, tipo: 'crédito' },
    { id: 2, aluno: 'Bruno', valor: -5, tipo: 'débito' }
  ]
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Transações</h2>
      <div className="card p-4">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-slate-500">
              <th className="py-2">ID</th>
              <th>Aluno</th>
              <th>Valor</th>
              <th>Tipo</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {mock.map((t) => (
              <tr key={t.id}>
                <td className="py-2">{t.id}</td>
                <td>{t.aluno}</td>
                <td className={t.valor >= 0 ? 'text-emerald-600' : 'text-rose-600'}>
                  {t.valor}
                </td>
                <td>{t.tipo}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
