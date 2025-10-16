import PageHeader from '../components/PageHeader'

export default function Perfil() {
  return (
    <div>
      <PageHeader title="Perfil" />
      <div className="card p-4">
        <form className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="label">Nome</label>
            <input className="input" placeholder="Maria Silva" />
          </div>
          <div>
            <label className="label">E-mail</label>
            <input className="input" placeholder="maria@email.com" />
          </div>
          <div>
            <label className="label">CPF</label>
            <input className="input" placeholder="000.000.000-00" />
          </div>
          <div>
            <label className="label">RG</label>
            <input className="input" placeholder="00.000.000-0" />
          </div>
          <div className="md:col-span-2">
            <label className="label">Endereço</label>
            <input className="input" placeholder="Rua Exemplo, 123 - Centro" />
          </div>
          <div>
            <label className="label">Instituição de Ensino</label>
            <input className="input" placeholder="Selecione a instituição" />
          </div>
          <div>
            <label className="label">Curso</label>
            <input className="input" placeholder="Engenharia de Software" />
          </div>
          <div className="md:col-span-2 flex justify-end">
            <button className="btn">Salvar</button>
          </div>
        </form>
      </div>
    </div>
  )
}
