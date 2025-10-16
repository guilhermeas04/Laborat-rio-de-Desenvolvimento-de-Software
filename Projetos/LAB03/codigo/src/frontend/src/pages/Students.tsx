import { Link } from 'react-router-dom'
import { store } from '../lib/store'

export default function Students() {
  const { students } = store.getDB()
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Alunos</h2>
      <div className="card p-4 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-slate-500">
              <th className="py-2">ID</th>
              <th>Nome</th>
              <th>E-mail</th>
              <th>Saldo</th>
              <th></th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {students.map((s) => (
              <tr key={s.id}>
                <td className="py-2">{s.id}</td>
                <td>{s.name}</td>
                <td>{s.email}</td>
                <td>{s.saldo}</td>
                <td className="text-right">
                  <Link className="text-brand hover:text-brand-dark" to={`/students/${s.id}`}>ver/editar</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
