import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Car } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useAuth } from '@/context/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const { login, loading, error, usuario, tipo, logout } = useAuth() as any;
  const [credentials, setCredentials] = useState({ cpf: "", password: "" });

  function formatCpf(raw: string) {
    const digits = raw.replace(/\D/g, '').slice(0, 11);
    return digits
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
  }

  // Removido redirecionamento automático: usuário decide se continua com a sessão atual ou troca.

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!credentials.cpf || !credentials.password) {
      toast.error('Por favor, preencha todos os campos');
      return;
    }
    try {
      await login(credentials.cpf, credentials.password);
    } catch (e: any) {
      // o AuthContext já setou erro; exibimos toast
      toast.error(e.message || 'Falha no login');
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
            {usuario && tipo ? (
              <div className="space-y-4">
                <div className="p-3 rounded-md bg-muted text-sm text-muted-foreground">
                  Você já está autenticado como <strong>{usuario.nome}</strong> ({tipo}).
                </div>
                <div className="flex gap-2">
                  <Button type="button" className="flex-1" onClick={() => navigate(tipo === 'Agente' ? '/agent' : '/client', { replace: true })}>
                    Ir para dashboard
                  </Button>
                  <Button type="button" variant="secondary" className="flex-1" onClick={() => { logout(); }}>
                    Trocar de conta
                  </Button>
                </div>
                <div className="text-xs text-muted-foreground text-center">Para entrar com outra conta, clique em "Trocar de conta".</div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="cpf">CPF</Label>
                  <Input
                    id="cpf"
                    inputMode="numeric"
                    placeholder="000.000.000-00"
                    value={formatCpf(credentials.cpf)}
                    onChange={(e) => {
                      const onlyDigits = e.target.value.replace(/\D/g, '').slice(0, 11);
                      setCredentials({ ...credentials, cpf: onlyDigits });
                    }}
                    required
                  />
                  {credentials.cpf.length > 0 && credentials.cpf.length !== 11 && (
                    <p className="text-xs text-red-500">CPF deve ter 11 dígitos (atual: {credentials.cpf.length}).</p>
                  )}
                </div>
                {/* Tipo agora definido pelo backend na resposta de login */}

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

                {error && (
                  <p className="text-sm text-red-500">{error}</p>
                )}
                <Button
                  type="submit"
                  className="w-full"
                  disabled={loading || credentials.cpf.length !== 11 || credentials.password.length === 0}
                >
                  {loading ? 'Entrando...' : 'Entrar'}
                </Button>
              </form>
            )}

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

            <div className="mt-4 p-3 bg-muted rounded-lg text-xs text-muted-foreground space-y-1">
              <p><strong>Dica:</strong> O tipo de usuário é detectado automaticamente pelo backend.</p>
              <p>Se ainda não existir, cadastre-se primeiro.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;