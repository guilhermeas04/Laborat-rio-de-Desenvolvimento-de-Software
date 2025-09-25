import Navbar from "@/components/layout/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { AutomoveisApi, QueryKeys, type Automovel } from "@/lib/api";
import { useQuery } from '@tanstack/react-query';

const Carros = () => {
  const navigate = useNavigate();
  const { data: carros, isLoading: loading } = useQuery({
    queryKey: QueryKeys.automoveis,
    queryFn: AutomoveisApi.listar
  });
  return (
    <div className="min-h-screen bg-background">
      <Navbar userType="agent" onLogout={() => navigate("/")} />
      <div className="max-w-3xl mx-auto p-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold">Gerenciar Veículos</h1>
          <Button onClick={() => navigate("/agent/carros/novo")}>+ Cadastrar Veículo</Button>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Lista de Veículos</CardTitle>
          </CardHeader>
          <CardContent>
            {loading && <p className="text-sm text-muted-foreground">Carregando...</p>}
            {!loading && (carros?.length || 0) === 0 && (
              <p className="text-sm text-muted-foreground">Nenhum veículo cadastrado.</p>
            )}
            {!loading && (carros?.length || 0) > 0 && (
              <ul className="space-y-4">
                {(carros as Automovel[]).map((carro) => (
                  <li key={carro.id} className="flex justify-between items-center border-b pb-2">
                    <span>{(carro.marca || '') + ' ' + (carro.modelo || '')} • {carro.placa} • {carro.ano || '—'}</span>
                    <Button size="sm">Editar</Button>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
export default Carros;
