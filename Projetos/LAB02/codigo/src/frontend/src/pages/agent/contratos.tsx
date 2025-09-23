import Navbar from "@/components/layout/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

const Contratos = () => {
  const navigate = useNavigate();
  // Simulação de contratos
  const contratos = [
    { id: "CON-001", cliente: "João Silva", carro: "Honda Civic 2023" },
    { id: "CON-002", cliente: "Maria Santos", carro: "Toyota Corolla 2022" },
  ];
  return (
    <div className="min-h-screen bg-background">
      <Navbar userType="agent" onLogout={() => navigate("/")} />
      <div className="max-w-3xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4">Contratos Ativos</h1>
        <Card>
          <CardHeader>
            <CardTitle>Lista de Contratos</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {contratos.map((contrato) => (
                <li key={contrato.id} className="flex justify-between items-center border-b pb-2">
                  <span>{contrato.carro} - {contrato.cliente}</span>
                  <span>ID: {contrato.id}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
export default Contratos;
