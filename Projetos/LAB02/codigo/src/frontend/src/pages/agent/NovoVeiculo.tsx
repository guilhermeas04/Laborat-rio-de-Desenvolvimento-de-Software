import Navbar from "@/components/layout/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { apiPost } from "@/lib/api";

const NovoVeiculo = () => {
  const navigate = useNavigate();
  const [modelo, setModelo] = useState("");
  const [placa, setPlaca] = useState("");
  const [ano, setAno] = useState<number | "">("");
  const [cor, setCor] = useState("");
  const [diaria, setDiaria] = useState<number | "">("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await apiPost("/api/agent/veiculos", {
        modelo,
        placa,
        ano: ano || 0,
        cor,
        diaria: diaria || 0,
      });
      navigate("/agent/carros");
    } catch (e) {
      alert("Falha ao cadastrar veículo");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar userType="agent" onLogout={() => navigate("/")} />
      <div className="max-w-xl mx-auto p-6">
        <Button variant="outline" onClick={() => navigate("/agent/carros")} className="mb-4">
          &larr; Voltar
        </Button>
        <Card>
          <CardHeader>
            <CardTitle>Cadastrar Novo Veículo</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block font-medium mb-1">Modelo</label>
                <input className="w-full border p-2 rounded" placeholder="Ex: Honda Civic 2023" required value={modelo} onChange={(e)=>setModelo(e.target.value)} />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-medium mb-1">Placa</label>
                  <input className="w-full border p-2 rounded" placeholder="ABC-1D23" required value={placa} onChange={(e)=>setPlaca(e.target.value)} />
                </div>
                <div>
                  <label className="block font-medium mb-1">Ano</label>
                  <input type="number" className="w-full border p-2 rounded" placeholder="2024" required value={ano} onChange={(e)=>setAno(Number(e.target.value))} />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-medium mb-1">Cor</label>
                  <input className="w-full border p-2 rounded" placeholder="Azul" value={cor} onChange={(e)=>setCor(e.target.value)} />
                </div>
                <div>
                  <label className="block font-medium mb-1">Diária (R$)</label>
                  <input type="number" className="w-full border p-2 rounded" placeholder="150" value={diaria} onChange={(e)=>setDiaria(Number(e.target.value))} />
                </div>
              </div>
              <Button type="submit" className="w-full" disabled={loading}>{loading?"Salvando...":"Salvar"}</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default NovoVeiculo;
