import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Car } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Login = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    cpf: "",
    password: "",
    tipo: "CLIENTE" as "CLIENTE" | "AGENTE",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulação de login - em uma app real seria uma API
    if (credentials.cpf && credentials.password) {
      toast.success("Login realizado com sucesso!");
      if (credentials.tipo === "AGENTE") navigate("/agent"); else navigate("/client");
    } else {
      toast.error("Por favor, preencha todos os campos");
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <Car className="h-12 w-12 text-primary" />
          </div>
          <h1 className="text-3xl font-bold text-foreground">CarOn</h1>
          <p className="text-muted-foreground mt-2">Sistema de Aluguel de Carros</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Entrar na sua conta</CardTitle>
            <CardDescription>
              Digite suas credenciais para acessar o sistema
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="cpf">CPF</Label>
                <Input
                  id="cpf"
                  inputMode="numeric"
                  placeholder="000.000.000-00"
                  value={credentials.cpf}
                  onChange={(e) =>
                    setCredentials({ ...credentials, cpf: e.target.value })
                  }
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>Tipo de Usuário</Label>
                <div className="flex gap-4 text-sm">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="tipo"
                      value="CLIENTE"
                      checked={credentials.tipo === "CLIENTE"}
                      onChange={() => setCredentials({ ...credentials, tipo: "CLIENTE" })}
                    />
                    Cliente
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="tipo"
                      value="AGENTE"
                      checked={credentials.tipo === "AGENTE"}
                      onChange={() => setCredentials({ ...credentials, tipo: "AGENTE" })}
                    />
                    Agente
                  </label>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Senha</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Digite sua senha"
                  value={credentials.password}
                  onChange={(e) =>
                    setCredentials({ ...credentials, password: e.target.value })
                  }
                  required
                />
              </div>

              <Button type="submit" className="w-full">
                Entrar
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                Não tem uma conta?{" "}
                <Button
                  variant="link"
                  className="p-0 h-auto"
                  onClick={() => navigate("/cadastro")}
                >
                  Cadastre-se aqui
                </Button>
              </p>
            </div>

            <div className="mt-4 p-3 bg-muted rounded-lg">
              <p className="text-xs text-muted-foreground text-center">
                <strong>Demo:</strong> Use qualquer CPF/senha. Selecione o tipo desejado.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;