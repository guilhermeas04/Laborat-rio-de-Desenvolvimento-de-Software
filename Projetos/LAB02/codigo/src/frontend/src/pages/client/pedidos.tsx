import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/layout/Navbar";
import { useNavigate } from "react-router-dom";
import { useAuth } from '@/context/AuthContext';
import { useQuery } from '@tanstack/react-query';
import { PedidosApi, QueryKeys } from '@/lib/api';
import StatusBadge from '@/components/ui/status-badge';

const Pedidos = () => {
  const navigate = useNavigate();
  const { usuario } = useAuth();
  const clienteId = usuario?.id;
  const { data: pedidos, isLoading } = useQuery({
    queryKey: clienteId ? QueryKeys.pedidosCliente(clienteId) : QueryKeys.pedidos,
    queryFn: () => clienteId ? PedidosApi.listarPorCliente(clienteId) : PedidosApi.listar(),
    enabled: !!clienteId
  });
  return (
    <div className="min-h-screen bg-background">
      <Navbar userType="client" onLogout={() => navigate("/")} />
      <div className="max-w-3xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4">Meus Pedidos</h1>
        <Card>
          <CardHeader>
            <CardTitle>Lista de Pedidos</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {isLoading && <p className="text-sm text-muted-foreground">Carregando...</p>}
              {!isLoading && (pedidos?.length || 0) === 0 && <p className="text-sm text-muted-foreground">Nenhum pedido.</p>}
              {(pedidos || []).map(p => (
                <li key={p.id} className="flex justify-between items-center border-b pb-2">
                  <span className="flex items-center gap-2">
                    {p.automovelLabel || 'Automóvel'}
                    <StatusBadge status={p.status} />
                  </span>
                  <Button size="sm" onClick={() => navigate(`/client/pedido/${p.id}`)}>Detalhes</Button>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
export default Pedidos;
