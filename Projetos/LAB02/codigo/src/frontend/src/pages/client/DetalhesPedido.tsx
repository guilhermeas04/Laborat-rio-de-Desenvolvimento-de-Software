import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Navbar from "@/components/layout/Navbar";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { apiGet, type Pedido } from "@/lib/api";

const DetalhesPedido = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [pedido, setPedido] = useState<Pedido | null>(null);
  const [loading, setLoading] = useState(true);
  const periodo = "-"; // Placeholder sem cálculo de período real

  useEffect(() => {
    (async () => {
      try {
        if (id) {
          const data = await apiGet<Pedido>(`/api/client/pedidos/${id}`);
          setPedido(data);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar userType="client" onLogout={() => navigate("/")} />
      <div className="max-w-2xl mx-auto p-6">
        <Button variant="outline" onClick={() => navigate("/client")} className="mb-4">
          &larr; Voltar ao Dashboard
        </Button>
        <Card>
          <CardHeader>
            <CardTitle>Detalhes do Pedido: {id}</CardTitle>
            <CardDescription>Informações completas do seu pedido</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {loading && <p className="text-sm text-muted-foreground">Carregando...</p>}
            {!loading && pedido && (
              <>
                <p><strong>Carro:</strong> {pedido.car}</p>
                <p><strong>Status:</strong> {pedido.status}</p>
                <p><strong>Data do Pedido:</strong> {pedido.date}</p>
                <p><strong>Período de Aluguel:</strong> {periodo}</p>
                <p><strong>Valor:</strong> {pedido.value}</p>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DetalhesPedido;
