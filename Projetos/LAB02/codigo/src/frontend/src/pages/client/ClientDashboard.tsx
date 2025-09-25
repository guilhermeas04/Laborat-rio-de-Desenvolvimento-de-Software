import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import StatusBadge from "@/components/ui/status-badge";
import Navbar from "@/components/layout/Navbar";
import { Plus, Car, Clock, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { apiDelete, apiGet, type Pedido } from "@/lib/api";

const ClientDashboard = () => {
  const navigate = useNavigate();

  const [orders, setOrders] = useState<Pedido[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    (async () => {
      try {
        const data = await apiGet<Pedido[]>("/api/client/pedidos");
        setOrders(data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const activeCount = orders.filter((o) => o.status === "ativo").length;
  const pendingCount = orders.filter((o) => o.status === "pendente").length;
  const approvedCount = orders.filter((o) => o.status === "aprovado").length;
  const stats = [
    { title: "Pedidos Ativos", value: String(activeCount), icon: Car, color: "text-success" },
    { title: "Pendentes", value: String(pendingCount), icon: Clock, color: "text-warning" },
    { title: "Aprovados", value: String(approvedCount), icon: CheckCircle, color: "text-info" },
    { title: "Total de Pedidos", value: String(orders.length), icon: Car, color: "text-foreground" },
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
                {loading && <p className="text-sm text-muted-foreground">Carregando pedidos...</p>}
                {!loading && orders.length === 0 && (
                  <p className="text-sm text-muted-foreground">Você ainda não possui pedidos.</p>
                )}
                {orders.map((order) => (
                  <div
                    key={order.id}
                    className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0">
                        <Car className="h-10 w-10 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{order.car}</p>
                        <p className="text-sm text-muted-foreground">
                          Pedido {order.id} • {order.date}
                        </p>
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
                            await apiDelete(`/api/client/pedidos/${order.id}`);
                            setOrders((prev) => prev.filter((p) => p.id !== order.id));
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