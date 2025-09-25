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
  // Removido campo de período pois o modelo atual só possui uma data (data do pedido)

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
                {/* Campo de período removido pois o modelo não possui data fim */}
                {/* Valor removido - não existe no modelo atual */}
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DetalhesPedido;
