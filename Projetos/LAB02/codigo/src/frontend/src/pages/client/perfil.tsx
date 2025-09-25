import Navbar from "@/components/layout/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Perfil = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-background">
      <Navbar userType="client" onLogout={() => navigate("/")} />
      <div className="max-w-xl mx-auto p-6">
        <Card>
          <CardHeader>
            <CardTitle>Meu Perfil</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <input className="w-full border p-2 rounded" placeholder="Nome" />
              <input className="w-full border p-2 rounded" placeholder="Email" type="email" />
              <Button type="submit" className="w-full">Salvar</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
export default Perfil;
