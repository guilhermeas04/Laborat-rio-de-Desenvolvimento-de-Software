import Navbar from "@/components/layout/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const PedidosAgente = () => {
  const navigate = useNavigate();
  // Simulação de pedidos
  const pedidos = [
    { id: "PED-004", cliente: "João Silva", carro: "Honda Civic 2023" },
    { id: "PED-005", cliente: "Maria Santos", carro: "Toyota Corolla 2022" },
  ];
  return (
    <div className="min-h-screen bg-background">
      <Navbar userType="agent" onLogout={() => navigate("/")} />
      <div className="max-w-3xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4">Pedidos para Avaliação</h1>
        <Card>
          <CardHeader>
            <CardTitle>Lista de Pedidos</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {pedidos.map((pedido) => (
                <li key={pedido.id} className="flex justify-between items-center border-b pb-2">
                  <span>{pedido.carro} - {pedido.cliente}</span>
                  <Button size="sm" onClick={() => navigate(`/agent/avaliar/${pedido.id}`)}>
                    Avaliar
                  </Button>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
export default PedidosAgente;
