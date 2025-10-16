import PageHeader from '../components/PageHeader'

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
    </div>
  )
}
