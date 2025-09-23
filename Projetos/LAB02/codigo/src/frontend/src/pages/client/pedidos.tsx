import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/layout/Navbar";
import { useNavigate } from "react-router-dom";

const Pedidos = () => {
  const navigate = useNavigate();
  // Simulação de pedidos
  const pedidos = [
    { id: "PED-001", carro: "Honda Civic 2023", status: "pendente" },
    { id: "PED-002", carro: "Toyota Corolla 2022", status: "aprovado" },
    { id: "PED-003", carro: "Hyundai HB20 2023", status: "ativo" },
  ];
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
              {pedidos.map((pedido) => (
                <li key={pedido.id} className="flex justify-between items-center border-b pb-2">
                  <span>{pedido.carro} ({pedido.status})</span>
                  <Button size="sm" onClick={() => navigate(`/client/pedido/${pedido.id}`)}>
                    Detalhes
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
export default Pedidos;
