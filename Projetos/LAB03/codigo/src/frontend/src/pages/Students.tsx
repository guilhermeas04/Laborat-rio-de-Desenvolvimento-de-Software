export default function Students() {
  const mock = [
    { id: 1, nome: 'Ana', saldo: 120 },
    { id: 2, nome: 'Bruno', saldo: 80 }
  ]
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Estudantes</h2>
      <div className="card p-4">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-slate-500">
              <th className="py-2">ID</th>
              <th>Nome</th>
              <th>Saldo</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {mock.map((s) => (
              <tr key={s.id}>
                <td className="py-2">{s.id}</td>
                <td>{s.nome}</td>
                <td>{s.saldo}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
