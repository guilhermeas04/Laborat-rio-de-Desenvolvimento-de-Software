import PageHeader from '../components/PageHeader'
import { store } from '../lib/store'
import { Link } from 'react-router-dom'

export default function EmpresaCadastro() {
  return (
    <div>
      <PageHeader title="Cadastro de Empresa" action={<span className="text-sm text-slate-500">Dados da Empresa</span>} />
      <div className="card p-4">
        <h3 className="font-medium mb-4">Informações</h3>
        <form className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="label">Nome</label>
            <input className="input" placeholder="Empresa XYZ" />
          </div>
          <div>
            <label className="label">CNPJ</label>
            <input className="input" placeholder="00.000.000/0001-00" />
          </div>
          <div>
            <label className="label">E-mail</label>
            <input className="input" placeholder="contato@empresa.com.br" />
          </div>
          <div className="md:col-span-2">
            <label className="label">Endereço</label>
            <input className="input" placeholder="Av. Central, 1000 - Bairro" />
          </div>
          <div className="md:col-span-2 flex justify-end">
            <button className="btn">Concluir Cadastro</button>
          </div>
        </form>
      </div>
      <div className="card p-4 mt-4">
        <h3 className="font-medium mb-4">Alunos Cadastrados</h3>
        <div className="overflow-x-auto">
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
              {store.getDB().students.map((s) => (
                <tr key={s.id}>
                  <td className="py-2">{s.id}</td>
                  <td>{s.name}</td>
                  <td>{s.email}</td>
                  <td>{s.saldo}</td>
                  <td className="text-right"><Link to={`/students/${s.id}`} className="text-brand hover:text-brand-dark">ver/editar</Link></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
