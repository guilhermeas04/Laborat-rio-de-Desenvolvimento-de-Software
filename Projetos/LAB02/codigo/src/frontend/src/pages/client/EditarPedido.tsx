import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/layout/Navbar";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { apiGet, apiPut, type Pedido, type Veiculo } from "@/lib/api";

const EditarPedido = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [pedido, setPedido] = useState<Pedido | null>(null);
  const [car, setCar] = useState("");
  const [dataPedido, setDataPedido] = useState("");
  const [loading, setLoading] = useState(true);
  const [veiculos, setVeiculos] = useState<Veiculo[]>([]);
  const [loadingVeiculos, setLoadingVeiculos] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        if (id) {
          const p = await apiGet<Pedido>(`/api/client/pedidos/${id}`);
          setPedido(p);
          setCar(p.car);
          setDataPedido(p.date);
        }
        try {
          const vs = await apiGet<Veiculo[]>("/api/veiculos");
          setVeiculos(vs);
        } catch (e) {
          // ignora - fallback para edição texto
        } finally {
          setLoadingVeiculos(false);
        }
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar userType="client" onLogout={() => navigate("/")} />
      <div className="max-w-xl mx-auto p-6">
        <Button variant="outline" onClick={() => navigate("/client")} className="mb-4">
          &larr; Voltar
        </Button>
        <Card>
          <CardHeader>
            <CardTitle>Editar Pedido: {id}</CardTitle>
          </CardHeader>
          <CardContent>
            <form
              className="space-y-4"
              onSubmit={async (e) => {
                e.preventDefault();
                if (!id) return;
                await apiPut<Pedido>(`/api/client/pedidos/${id}`, {
                  car,
                  date: dataPedido,
            // value removed to align with simplified backend
                });
                navigate(`/client/pedido/${id}`);
              }}
            >
              <div>
                <label className="block font-medium mb-1">Carro desejado</label>
                {loadingVeiculos ? (
                  <input disabled className="w-full border p-2 rounded" value="Carregando..." />
                ) : veiculos.length > 0 ? (
                  <select
                    className="w-full border p-2 rounded bg-background"
                    value={car}
                    onChange={(e) => setCar(e.target.value)}
                    disabled={loading}
                  >
                    {veiculos.map((v) => (
                      <option key={v.id} value={v.modelo}>
                        {v.modelo} • {v.placa} • {v.ano}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    className="w-full border p-2 rounded"
                    value={car}
                    onChange={(e) => setCar(e.target.value)}
                    disabled={loading}
                  />
                )}
              </div>
              <div>
                <label className="block font-medium mb-1">Data do Pedido</label>
                <input className="w-full border p-2 rounded" type="date" value={dataPedido} onChange={(e)=>setDataPedido(e.target.value)} disabled={loading} />
              </div>
              <Button type="submit" className="w-full" disabled={loading}>Salvar Alterações</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EditarPedido;
