import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/layout/Navbar";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { apiPost } from "@/lib/api";

const AvaliarPedido = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  // Mock de dados do pedido
  const pedido = {
    id,
    cliente: "João Silva",
    carro: "Honda Civic 2023",
    data: "2024-01-16",
    valor: "R$ 150/dia",
    score: 720,
    historico: "Sem restrições, pagamentos em dia.",
  };

  const aprovar = async () => {
    await apiPost(`/api/agent/avaliar/${id}?acao=aprovar`);
    toast.success(`Pedido ${pedido.id} aprovado`);
    navigate("/agent");
  };

  const reprovar = async () => {
    await apiPost(`/api/agent/avaliar/${id}?acao=reprovar`);
    toast.error(`Pedido ${pedido.id} reprovado`);
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
            <CardTitle>Avaliar Pedido: {pedido.id}</CardTitle>
            <CardDescription>Analise e decida aprovar ou reprovar</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <p><strong>Cliente:</strong> {pedido.cliente}</p>
            <p><strong>Carro:</strong> {pedido.carro}</p>
            <p><strong>Data:</strong> {pedido.data}</p>
            <p><strong>Valor:</strong> {pedido.valor}</p>
            <div className="border-t pt-3 mt-3">
              <p className="font-medium">Análise de Crédito</p>
              <p><strong>Score:</strong> {pedido.score}</p>
              <p><strong>Histórico:</strong> {pedido.historico}</p>
            </div>
            <div className="flex gap-2 pt-2">
              <Button onClick={aprovar}>Aprovar</Button>
              <Button variant="destructive" onClick={reprovar}>Reprovar</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AvaliarPedido;
