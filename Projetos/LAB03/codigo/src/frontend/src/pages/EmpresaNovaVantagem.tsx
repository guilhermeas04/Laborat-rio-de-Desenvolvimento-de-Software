import PageHeader from '../components/PageHeader'
import { store } from '../lib/store'
import { useState } from 'react'

export default function EmpresaNovaVantagem() {
  const [desc, setDesc] = useState('')
  const [price, setPrice] = useState(500)
  return (
    <div>
      <PageHeader title="Nova Vantagem" action={<span className="text-sm text-slate-500">Cadastro</span>} />
      <div className="card p-4">
        <h3 className="font-medium mb-4">Dados da Vantagem</h3>
        <form className="grid md:grid-cols-2 gap-4" onSubmit={(e)=>{e.preventDefault(); store.addAdvantage(desc || 'Vantagem', price); alert('Vantagem salva!');}}>
          <div className="md:col-span-2">
            <label className="label">Descrição do produto/vantagem</label>
            <input className="input" placeholder="Descreva a vantagem aqui" value={desc} onChange={e=>setDesc(e.target.value)} />
          </div>
          <div>
            <label className="label">Foto</label>
            <input className="input" placeholder="Arraste e solte a imagem aqui" />
          </div>
          <div>
            <label className="label">Custo em moedas</label>
            <input className="input" type="number" value={price} onChange={e=>setPrice(Number(e.target.value))} />
          </div>
          <div className="md:col-span-2 flex justify-end">
            <button className="btn">Salvar Vantagem</button>
          </div>
        </form>
      </div>
    </div>
  )
}
