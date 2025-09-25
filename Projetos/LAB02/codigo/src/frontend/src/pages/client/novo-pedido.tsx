import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/layout/Navbar";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from '@/context/AuthContext';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { AutomoveisApi, PedidosApi, QueryKeys, type Automovel } from "@/lib/api";
import StatusBadge from '@/components/ui/status-badge';

const NovoPedido = () => {
  const navigate = useNavigate();
  const { usuario } = useAuth();
  const [automovelId, setAutomovelId] = useState<number | ''>('');
  const [dataPedido, setDataPedido] = useState("");
  const qc = useQueryClient();
  const { data: veiculos, isLoading: loadingVeiculos } = useQuery({
    queryKey: QueryKeys.automoveis,
    queryFn: AutomoveisApi.listar
  });
  const criarPedido = useMutation({
    mutationFn: () => {
      if (!usuario?.id || !automovelId) throw new Error('Dados insuficientes');
      return PedidosApi.criar({ clienteId: usuario.id, automovelId, status: 'PENDENTE' });
    },
    onSuccess: () => {
      if (usuario?.id) qc.invalidateQueries({ queryKey: QueryKeys.pedidosCliente(usuario.id) });
      qc.invalidateQueries({ queryKey: QueryKeys.pedidos });
      navigate('/client');
    }
  });
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
              onSubmit={(e) => {
                e.preventDefault();
                criarPedido.mutate();
              }}
            >
              <div>
                <label className="block font-medium mb-1">Carro desejado</label>
                {loadingVeiculos && <input disabled className="w-full border p-2 rounded" value="Carregando veículos..." />}
                {!loadingVeiculos && (veiculos || []).length > 0 && (
                  <select
                    className="w-full border p-2 rounded bg-background"
                    value={automovelId}
                    onChange={(e) => setAutomovelId(Number(e.target.value))}
                    required
                  >
                    <option value="" disabled>Selecione um veículo</option>
                    {(veiculos as Automovel[]).map(v => (
                      <option key={v.id} value={v.id}>{(v.marca || '') + ' ' + (v.modelo || '')} • {v.placa} • {v.ano}</option>
                    ))}
                  </select>
                )}
              </div>
              <div>
                <label className="block font-medium mb-1">Data do Pedido</label>
                <input className="w-full border p-2 rounded" type="date" value={dataPedido} onChange={(e) => setDataPedido(e.target.value)} />
              </div>
              <Button type="submit" className="w-full" disabled={criarPedido.isPending || !automovelId}>{criarPedido.isPending ? "Enviando..." : "Solicitar"}</Button>
              {criarPedido.isError && <p className="text-sm text-destructive">Erro ao criar pedido</p>}
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
export default NovoPedido;
