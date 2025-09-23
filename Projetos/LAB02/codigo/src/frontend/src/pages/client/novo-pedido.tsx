import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/layout/Navbar";
import { useNavigate } from "react-router-dom";
import { apiPost } from "@/lib/api";
import { useState } from "react";

const NovoPedido = () => {
  const navigate = useNavigate();
  const [car, setCar] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [loading, setLoading] = useState(false);
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
              onSubmit={async (e) => {
                e.preventDefault();
                setLoading(true);
                try {
                  await apiPost("/api/client/pedidos", {
                    car,
                    clientName: "Cliente Demo",
                    date: start || new Date().toISOString().slice(0, 10),
                    value: "R$ 100/dia",
                  });
                  navigate("/client");
                } catch (err) {
                  alert("Falha ao criar pedido");
                } finally {
                  setLoading(false);
                }
              }}
            >
              <div>
                <label className="block font-medium mb-1">Carro desejado</label>
                <input className="w-full border p-2 rounded" placeholder="Ex: Honda Civic 2023" value={car} onChange={(e)=>setCar(e.target.value)} required />
              </div>
              <div>
                <label className="block font-medium mb-1">Data de início</label>
                <input className="w-full border p-2 rounded" type="date" value={start} onChange={(e)=>setStart(e.target.value)} />
              </div>
              <div>
                <label className="block font-medium mb-1">Data de fim</label>
                <input className="w-full border p-2 rounded" type="date" value={end} onChange={(e)=>setEnd(e.target.value)} />
              </div>
              <Button type="submit" className="w-full" disabled={loading}>{loading?"Enviando...":"Solicitar"}</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
export default NovoPedido;
