import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/layout/Navbar";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { apiGet, apiPost, type Pedido } from "@/lib/api";
import { useEffect, useState } from "react";

const AvaliarPedido = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [pedido, setPedido] = useState<Pedido | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      if (!id) return;
      try {
        const p = await apiGet<Pedido>(`/api/client/pedidos/${id}`);
        setPedido(p);
      } catch (e) {
        toast.error("Falha ao carregar pedido");
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  const aprovar = async () => {
    await apiPost(`/api/agent/avaliar/${id}?acao=aprovar`);
    toast.success(`Pedido ${id} aprovado`);
    navigate("/agent");
  };

  const reprovar = async () => {
    await apiPost(`/api/agent/avaliar/${id}?acao=reprovar`);
    toast.error(`Pedido ${id} reprovado`);
    navigate("/agent");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar userType="agent" onLogout={() => navigate("/")} />
      <div className="max-w-2xl mx-auto p-6">
        <Button variant="outline" onClick={() => navigate("/agent")} className="mb-4">
          &larr; Voltar
        </Button>

        <Card>
          <CardHeader>
            <CardTitle>Avaliar Pedido: {id}</CardTitle>
            <CardDescription>Analise e decida aprovar ou reprovar</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {loading && <p className="text-sm text-muted-foreground">Carregando...</p>}
            {!loading && pedido && (
              <>
                <p><strong>Cliente:</strong> {pedido.clientName}</p>
                <p><strong>Carro:</strong> {pedido.car}</p>
                <p><strong>Data:</strong> {pedido.date}</p>
                <p><strong>Status Atual:</strong> {pedido.status}</p>
                {/* Valor removido - não existe no modelo modelo simplificado */}
                <div className="flex gap-2 pt-2">
                  <Button onClick={aprovar}>Aprovar</Button>
                  <Button variant="destructive" onClick={reprovar}>Reprovar</Button>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AvaliarPedido;
