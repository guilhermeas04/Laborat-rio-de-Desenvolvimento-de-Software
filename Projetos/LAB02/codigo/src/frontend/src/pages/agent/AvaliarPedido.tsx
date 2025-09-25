import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/layout/Navbar";
import { useNavigate, useParams } from "react-router-dom";
import { PedidosApi, QueryKeys } from "@/lib/api";
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import StatusBadge from '@/components/ui/status-badge';

const AvaliarPedido = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const pedidoId = Number(id);
  const qc = useQueryClient();
  const { data: pedido, isLoading } = useQuery({
    queryKey: !isNaN(pedidoId) ? QueryKeys.pedido(pedidoId) : QueryKeys.pedidos,
    queryFn: () => PedidosApi.obter(pedidoId),
    enabled: !isNaN(pedidoId)
  });
  const mutAprovar = useMutation({
    mutationFn: () => PedidosApi.atualizarStatus(pedidoId, 'APROVADO'),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: QueryKeys.pedido(pedidoId) });
      qc.invalidateQueries({ queryKey: QueryKeys.pedidos });
      navigate('/agent');
    }
  });
  const mutRejeitar = useMutation({
    mutationFn: () => PedidosApi.atualizarStatus(pedidoId, 'REJEITADO'),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: QueryKeys.pedido(pedidoId) });
      qc.invalidateQueries({ queryKey: QueryKeys.pedidos });
      navigate('/agent');
    }
  });

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
            {isLoading && <p className="text-sm text-muted-foreground">Carregando...</p>}
            {!isLoading && pedido && (
              <div className="space-y-2">
                <p><strong>ID:</strong> {pedido.id}</p>
                <p><strong>Cliente:</strong> {pedido.clienteNome || '—'}</p>
                <p><strong>Automóvel:</strong> {pedido.automovelLabel || '—'}</p>
                <p><strong>Data:</strong> {pedido.data || '—'}</p>
                <p className="flex items-center gap-2"><strong>Status Atual:</strong> <StatusBadge status={pedido.status} /></p>
                <div className="flex gap-2 pt-2">
                  <Button onClick={() => mutAprovar.mutate()} disabled={mutAprovar.isPending}>Aprovar</Button>
                  <Button variant="destructive" onClick={() => mutRejeitar.mutate()} disabled={mutRejeitar.isPending}>Reprovar</Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AvaliarPedido;
