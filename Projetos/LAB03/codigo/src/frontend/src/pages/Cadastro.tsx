import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Cadastro() {
  const [tipo, setTipo] = useState<'aluno'|'professor'|'empresa'>('aluno')
  const navigate = useNavigate()
  function handleContinue(e: React.FormEvent) {
    e.preventDefault()
    if (tipo === 'aluno') navigate('/cadastro/aluno')
    else if (tipo === 'professor') navigate('/cadastro/professor')
    else navigate('/cadastro/empresa')
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="card w-full max-w-md p-6 md:p-8">
        <h2 className="text-xl font-semibold mb-6">Criar Conta</h2>
        <form onSubmit={handleContinue} className="space-y-4">
          <div>
            <label className="label">Tipo de cadastro</label>
            <div className="flex gap-4 text-sm">
              <label className="flex items-center gap-2">
                <input type="radio" name="tipo" checked={tipo==='aluno'} onChange={()=>setTipo('aluno')} /> Aluno
              </label>
              <label className="flex items-center gap-2">
                <input type="radio" name="tipo" checked={tipo==='professor'} onChange={()=>setTipo('professor')} /> Professor
              </label>
              <label className="flex items-center gap-2">
                <input type="radio" name="tipo" checked={tipo==='empresa'} onChange={()=>setTipo('empresa')} /> Empresa
              </label>
            </div>
          </div>
          <div className="flex justify-end">
            <button className="btn" type="submit">Continuar</button>
          </div>
        </form>
      </div>
    </div>
  )
}
