import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Navbar from "@/components/layout/Navbar";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { PedidosApi, QueryKeys } from "@/lib/api";
import { useQuery } from '@tanstack/react-query';
import StatusBadge from '@/components/ui/status-badge';

const DetalhesPedido = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const pedidoId = Number(id);
  const { data: pedido, isLoading } = useQuery({
    queryKey: isNaN(pedidoId) ? QueryKeys.pedidos : QueryKeys.pedido(pedidoId),
    queryFn: () => PedidosApi.obter(pedidoId),
    enabled: !isNaN(pedidoId)
  });

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
            {isLoading && <p className="text-sm text-muted-foreground">Carregando...</p>}
            {!isLoading && pedido && (
              <div className="space-y-2">
                <p><strong>Automóvel:</strong> {pedido.automovelLabel || '—'}</p>
                <p className="flex items-center gap-2"><strong>Status:</strong> <StatusBadge status={pedido.status} /></p>
                <p><strong>Data do Pedido:</strong> {pedido.data || '—'}</p>
                <p><strong>Cliente:</strong> {pedido.clienteNome || '—'}</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DetalhesPedido;
