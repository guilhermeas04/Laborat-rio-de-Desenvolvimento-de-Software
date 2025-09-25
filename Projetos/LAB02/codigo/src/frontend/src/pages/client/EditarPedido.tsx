import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/layout/Navbar";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { PedidosApi, AutomoveisApi, QueryKeys, type Automovel } from "@/lib/api";
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import StatusBadge from '@/components/ui/status-badge';

const EditarPedido = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const pedidoId = Number(id);
  const { data: pedido, isLoading } = useQuery({
    queryKey: !isNaN(pedidoId) ? QueryKeys.pedido(pedidoId) : QueryKeys.pedidos,
    queryFn: () => PedidosApi.obter(pedidoId),
    enabled: !isNaN(pedidoId)
  });
  const { data: veiculos, isLoading: loadingVeiculos } = useQuery({
    queryKey: QueryKeys.automoveis,
    queryFn: AutomoveisApi.listar
  });
  const [automovelId, setAutomovelId] = useState<number | ''>('');
  const qc = useQueryClient();
  const atualizar = useMutation({
    mutationFn: () => {
      if (isNaN(pedidoId)) throw new Error('ID inválido');
      return PedidosApi.atualizar(pedidoId, {
        automovel: automovelId ? { id: Number(automovelId) } as any : undefined,
        status: pedido?.status
      } as any);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: QueryKeys.pedido(pedidoId) });
      qc.invalidateQueries({ queryKey: QueryKeys.pedidos });
      navigate(`/client/pedido/${pedidoId}`);
    }
  });

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
            {isLoading && <p className="text-sm text-muted-foreground">Carregando...</p>}
            {!isLoading && pedido && (
              <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); atualizar.mutate(); }}>
                <div className="space-y-1">
                  <p><strong>ID:</strong> {pedido.id}</p>
                  <p><strong>Status Atual:</strong> <StatusBadge status={pedido.status} /></p>
                  <p><strong>Automóvel Atual:</strong> {pedido.automovelLabel || '—'}</p>
                </div>
                <div>
                  <label className="block font-medium mb-1">Alterar Automóvel</label>
                  {loadingVeiculos && <input disabled className="w-full border p-2 rounded" value="Carregando..." />}
                  {!loadingVeiculos && (veiculos || []).length > 0 && (
                    <select className="w-full border p-2 rounded bg-background" value={automovelId} onChange={e => setAutomovelId(Number(e.target.value))}>
                      <option value="">Manter atual</option>
                      {(veiculos as Automovel[]).map(v => (
                        <option key={v.id} value={v.id}>{(v.marca || '') + ' ' + (v.modelo || '')} • {v.placa}</option>
                      ))}
                    </select>
                  )}
                </div>
                <Button type="submit" className="w-full" disabled={atualizar.isPending}> {atualizar.isPending ? 'Salvando...' : 'Salvar Alterações'} </Button>
                {atualizar.isError && <p className="text-sm text-destructive">Erro ao salvar</p>}
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EditarPedido;
