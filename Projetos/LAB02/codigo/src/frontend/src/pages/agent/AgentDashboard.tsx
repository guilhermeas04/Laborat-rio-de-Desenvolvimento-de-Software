import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import StatusBadge from "@/components/ui/status-badge";
import Navbar from "@/components/layout/Navbar";
import { Users, Clock, CheckCircle, Car, FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useMemo } from "react";
import { PedidosApi, AutomoveisApi, QueryKeys } from "@/lib/api";
import { useQuery } from '@tanstack/react-query';

const AgentDashboard = () => {
  const navigate = useNavigate();

  const { data: pedidos, isLoading: loadingPedidos } = useQuery({
    queryKey: QueryKeys.pedidos,
    queryFn: PedidosApi.listar
  });
  const { data: veiculos, isLoading: loadingVeiculos } = useQuery({
    queryKey: QueryKeys.automoveis,
    queryFn: AutomoveisApi.listar
  });
  const pendingOrders = useMemo(() => (pedidos || []).filter(p => p.status === 'PENDENTE'), [pedidos]);
  const orders = pedidos || [];
  const loading = loadingPedidos || loadingVeiculos;

  const todayStr = useMemo(() => new Date().toISOString().slice(0, 10), []);
  const pendingCount = pendingOrders.length;
  const approvedToday = orders.filter(
    (o) => o.status === "APROVADO" && o.data === todayStr
  ).length;
  const contratosAtivos = orders.filter((o) => o.status === "APROVADO").length; // até existir distinção
  const veiculosDisponiveis = (veiculos || []).length;

  const stats = [
    { title: "Pedidos Pendentes", value: String(pendingCount), icon: Clock, color: "text-warning" },
    { title: "Aprovados Hoje", value: String(approvedToday), icon: CheckCircle, color: "text-success" },
    { title: "Contratos Ativos", value: String(contratosAtivos), icon: FileText, color: "text-info" },
    { title: "Veículos Disponíveis", value: String(veiculosDisponiveis), icon: Car, color: "text-foreground" },
  ];

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar userType="agent" onLogout={handleLogout} />

      <div className="max-w-7xl mx-auto p-6">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Dashboard do Agente
            </h1>
            <p className="text-muted-foreground">
              Gerencie pedidos, contratos e veículos
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button onClick={() => navigate("/agent")} size="sm">
              <Clock className="h-4 w-4 mr-2" />
              Avaliar Pedidos
            </Button>
            <Button onClick={() => navigate("/agent/carros")} variant="outline" size="sm">
              <Car className="h-4 w-4 mr-2" />
              Veículos
            </Button>
            <Button onClick={() => navigate("/agent/contratos")} variant="outline" size="sm">
              <FileText className="h-4 w-4 mr-2" />
              Contratos
            </Button>
            <Button onClick={() => navigate("/agent/carros/novo")} variant="outline" size="sm">
              + Cadastrar Veículo
            </Button>
          </div>
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

        <div className="grid grid-cols-1 gap-6">
          {/* Pedidos Pendentes */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
              <div>
                <CardTitle>Pedidos Pendentes</CardTitle>
                <CardDescription>
                  Pedidos aguardando sua análise
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {loading && <p className="text-sm text-muted-foreground">Carregando pedidos...</p>}
                {!loading && pendingOrders.length === 0 && (
                  <p className="text-sm text-muted-foreground">Nenhum pedido pendente.</p>
                )}
                {pendingOrders.map((order) => (
                  <div
                    key={order.id}
                    className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
                    onClick={() => navigate(`/agent/avaliar/${order.id}`)}
                  >
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0">
                        <Users className="h-10 w-10 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{order.clienteNome || 'Cliente'}</p>
                        <p className="text-sm text-muted-foreground">{order.automovelLabel || 'Automóvel'} • {order.data || '-'}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <StatusBadge status={order.status} />
                      {/* Valor removido pois não existe no schema oficial */}
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

export default AgentDashboard;