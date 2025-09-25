import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import StatusBadge from "@/components/ui/status-badge";
import Navbar from "@/components/layout/Navbar";
import { Plus, Car, Clock, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useMemo } from "react";
import { PedidosApi, QueryKeys } from "@/lib/api";
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '@/context/AuthContext';

const ClientDashboard = () => {
  const navigate = useNavigate();

  const { usuario } = useAuth();
  const clienteId = usuario?.id;

  const { data: pedidos, isLoading } = useQuery({
    queryKey: clienteId ? QueryKeys.pedidosCliente(clienteId) : QueryKeys.pedidos,
    queryFn: () => clienteId ? PedidosApi.listarPorCliente(clienteId) : PedidosApi.listar(),
    enabled: !!clienteId
  });

  const qc = useQueryClient();
  const deleteMutation = useMutation({
    mutationFn: (id: number) => PedidosApi.deletar(id),
    onSuccess: () => {
      if (clienteId) qc.invalidateQueries({ queryKey: QueryKeys.pedidosCliente(clienteId) });
      qc.invalidateQueries({ queryKey: QueryKeys.pedidos });
    }
  });

  const activeCount = useMemo(() => (pedidos || []).filter((o) => o.status === "APROVADO" /* ou ATIVO futuro */).length, [pedidos]);
  const pendingCount = useMemo(() => (pedidos || []).filter((o) => o.status === "PENDENTE").length, [pedidos]);
  const approvedCount = activeCount; // simplificado até existir distinção de ATIVO
  const stats = [
    { title: "Pedidos Ativos", value: String(activeCount), icon: Car, color: "text-success" },
    { title: "Pendentes", value: String(pendingCount), icon: Clock, color: "text-warning" },
    { title: "Aprovados", value: String(approvedCount), icon: CheckCircle, color: "text-info" },
    { title: "Total de Pedidos", value: String(pedidos?.length || 0), icon: Car, color: "text-foreground" },
  ];

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar userType="client" onLogout={handleLogout} />

      <div className="max-w-7xl mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Bem-vindo ao seu Dashboard
          </h1>
          <p className="text-muted-foreground">
            Gerencie seus pedidos de aluguel de carros
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      {stat.title}
                    </p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                  </div>
                  <stat.icon className={`h-8 w-8 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="flex flex-col gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <div>
                <CardTitle>Pedidos</CardTitle>
                <CardDescription>Gerencie todos os seus pedidos</CardDescription>
              </div>
              <Button onClick={() => navigate("/client/novo-pedido")}>
                <Plus className="h-4 w-4 mr-2" />
                Novo Pedido
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {isLoading && <p className="text-sm text-muted-foreground">Carregando pedidos...</p>}
                {!isLoading && (pedidos?.length || 0) === 0 && (
                  <p className="text-sm text-muted-foreground">Você ainda não possui pedidos.</p>
                )}
                {(pedidos || []).map((order) => (
                  <div
                    key={order.id}
                    className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0">
                        <Car className="h-10 w-10 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{order.automovelLabel || 'Automóvel'}</p>
                        <p className="text-sm text-muted-foreground">Pedido {order.id} • {order.data || '-'}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button size="sm" variant="outline" onClick={() => navigate(`/client/pedido/${order.id}`)}>
                        Ver Detalhes
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => navigate(`/client/editar-pedido/${order.id}`)}>
                        Editar
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={async () => {
                          const ok = window.confirm(`Tem certeza que deseja excluir o pedido ${order.id}?`);
                          if (!ok) return;
                          try {
                            await deleteMutation.mutateAsync(order.id);
                          } catch (e) {
                            alert("Falha ao excluir");
                          }
                        }}
                      >
                        Excluir
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ClientDashboard;