import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/layout/Navbar";
import { useNavigate } from "react-router-dom";
import { apiPost } from "@/lib/api";
import { useState, useEffect } from "react";
import { apiGet, type Veiculo } from "@/lib/api";

const NovoPedido = () => {
  const navigate = useNavigate();
  const [car, setCar] = useState("");
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [veiculos, setVeiculos] = useState<Veiculo[]>([]);
  const [loadingVeiculos, setLoadingVeiculos] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const lista = await apiGet<Veiculo[]>("/api/veiculos");
        setVeiculos(lista);
      } catch (e) {
        // fallback silencioso: usuário digita manualmente
      } finally {
        setLoadingVeiculos(false);
      }
    })();
  }, []);
  return (
    <div className="min-h-screen bg-background">
      <Navbar userType="client" onLogout={() => navigate("/")} />
      <div className="max-w-xl mx-auto p-6">
        <Card>
          <CardHeader>
            <CardTitle>Novo Pedido de Aluguel</CardTitle>
          </CardHeader>
          <CardContent>
            <form
              className="space-y-4"
              onSubmit={async (e) => {
                e.preventDefault();
                setLoading(true);
                try {
                  await apiPost("/api/client/pedidos", {
                    car,
                    clientName: "Cliente Demo",
                    date: date || new Date().toISOString().slice(0, 10),
              // value removed to align with simplified backend
                  });
                  navigate("/client");
                } catch (err) {
                  alert("Falha ao criar pedido");
                } finally {
                  setLoading(false);
                }
              }}
            >
              <div>
                <label className="block font-medium mb-1">Carro desejado</label>
                {loadingVeiculos ? (
                  <input disabled className="w-full border p-2 rounded" value="Carregando veículos..." />
                ) : veiculos.length > 0 ? (
                  <select
                    className="w-full border p-2 rounded bg-background"
                    value={car}
                    onChange={(e) => setCar(e.target.value)}
                    required
                  >
                    <option value="" disabled>
                      Selecione um veículo
                    </option>
                    {veiculos.map((v) => (
                      <option key={v.id} value={v.modelo}>
                        {v.modelo} • {v.placa} • {v.ano}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    className="w-full border p-2 rounded"
                    placeholder="Digite o modelo"
                    value={car}
                    onChange={(e) => setCar(e.target.value)}
                    required
                  />
                )}
              </div>
              <div>
                <label className="block font-medium mb-1">Data do Pedido</label>
                <input className="w-full border p-2 rounded" type="date" value={date} onChange={(e)=>setDate(e.target.value)} />
              </div>
              <Button type="submit" className="w-full" disabled={loading}>{loading?"Enviando...":"Solicitar"}</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
export default NovoPedido;
