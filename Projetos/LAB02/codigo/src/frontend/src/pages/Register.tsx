import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Car, User, Building } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { registerCliente, registerAgente } from "../lib/api";
import { useAuth } from '@/context/AuthContext';

const Register = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [clientData, setClientData] = useState({
    name: "",
    password: "",
    rg: "",
    cpf: "",
    address: "",
    profession: "",
    employer: "",
    income: "",
  });

  const [agentData, setAgentData] = useState({
    companyName: "",
    password: "",
    cnpj: "",
    contact: "",
    address: "",
    cpfResponsavel: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const handleClientSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    try {
      const renda = parseFloat(clientData.income.replace(/[^0-9,.]/g, '').replace(',', '.'));
      const novo = await registerCliente({
        nome: clientData.name,
        cpf: clientData.cpf,
        rg: clientData.rg,
        endereco: clientData.address,
        profissao: clientData.profession,
        senha: clientData.password,
        empregador: clientData.employer,
        rendaMensal: isNaN(renda) ? undefined : renda
      });
      toast.success("Cadastro de cliente realizado! Entrando...");
      try {
        await login(clientData.cpf, clientData.password);
        navigate('/client', { replace: true });
      } catch {
        navigate('/login');
      }
    } catch (err: any) {
      if (err?.status === 409) {
        toast.error('CPF já cadastrado. Tente fazer login.');
      } else if (err?.status === 400) {
        toast.error('Dados inválidos. Verifique CPF (11 dígitos) e campos obrigatórios.');
      } else {
        toast.error(err.message || 'Falha ao cadastrar cliente');
      }
    } finally {
      setSubmitting(false);
    }
  };

  const handleAgentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    try {
      const tipoAgente = /banco/i.test(agentData.companyName) ? 'Banco' : 'Empresa';
      const novoAgente = await registerAgente({
        nomeAgente: agentData.companyName,
        cpfResponsavel: agentData.cpfResponsavel || agentData.cnpj, // fallback
        senha: agentData.password,
        endereco: agentData.address,
        tipoAgente: tipoAgente as any
      });
      toast.success("Cadastro de agente realizado! Entrando...");
      try {
        await login(agentData.cpfResponsavel || agentData.cnpj, agentData.password);
        navigate('/agent', { replace: true });
      } catch {
        navigate('/login');
      }
    } catch (err: any) {
      if (err?.status === 409) {
        toast.error('CPF do responsável já cadastrado. Use outro ou faça login.');
      } else if (err?.status === 400) {
        toast.error('Dados inválidos. Verifique CPF e campos obrigatórios.');
      } else {
        toast.error(err.message || 'Falha ao cadastrar agente');
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-2xl space-y-8">
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <Car className="h-12 w-12 text-primary" />
          </div>
          <h1 className="text-3xl font-bold text-foreground">CarOn</h1>
          <p className="text-muted-foreground mt-2">Crie sua conta no sistema</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Criar Nova Conta</CardTitle>
            <CardDescription>
              Escolha o tipo de conta que deseja criar
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="client" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="client" className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Cliente
                </TabsTrigger>
                <TabsTrigger value="agent" className="flex items-center gap-2">
                  <Building className="h-4 w-4" />
                  Agente
                </TabsTrigger>
              </TabsList>

              <TabsContent value="client" className="space-y-4 mt-6">
                <form onSubmit={handleClientSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="client-name">Nome Completo</Label>
                      <Input
                        id="client-name"
                        placeholder="Seu nome completo"
                        value={clientData.name}
                        onChange={(e) =>
                          setClientData({ ...clientData, name: e.target.value })
                        }
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="client-cpf">CPF</Label>
                      <Input
                        id="client-cpf"
                        placeholder="000.000.000-00"
                        value={clientData.cpf}
                        onChange={(e) => {
                          const onlyDigits = e.target.value.replace(/\D/g, '').slice(0, 11);
                          setClientData({ ...clientData, cpf: onlyDigits });
                        }}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="client-rg">RG</Label>
                      <Input
                        id="client-rg"
                        placeholder="00.000.000-0"
                        value={clientData.rg}
                        onChange={(e) =>
                          setClientData({ ...clientData, rg: e.target.value })
                        }
                        required
                      />
                    </div>
                    {/* Campo CPF movido para linha anterior substituindo Email */}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="client-address">Endereço</Label>
                    <Input
                      id="client-address"
                      placeholder="Endereço completo"
                      value={clientData.address}
                      onChange={(e) =>
                        setClientData({ ...clientData, address: e.target.value })
                      }
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="client-profession">Profissão</Label>
                      <Input
                        id="client-profession"
                        placeholder="Sua profissão"
                        value={clientData.profession}
                        onChange={(e) =>
                          setClientData({ ...clientData, profession: e.target.value })
                        }
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="client-employer">Empregador</Label>
                      <Input
                        id="client-employer"
                        placeholder="Nome da empresa"
                        value={clientData.employer}
                        onChange={(e) =>
                          setClientData({ ...clientData, employer: e.target.value })
                        }
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="client-income">Renda Mensal</Label>
                      <Input
                        id="client-income"
                        placeholder="R$ 0,00"
                        value={clientData.income}
                        onChange={(e) => setClientData({ ...clientData, income: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="client-password">Senha</Label>
                      <Input
                        id="client-password"
                        type="password"
                        placeholder="Digite uma senha"
                        value={clientData.password}
                        onChange={(e) =>
                          setClientData({ ...clientData, password: e.target.value })
                        }
                        required
                      />
                    </div>
                  </div>

                  <Button type="submit" className="w-full" disabled={submitting || clientData.cpf.replace(/\D/g, '').length !== 11}>
                    Cadastrar Cliente
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="agent" className="space-y-4 mt-6">
                <form onSubmit={handleAgentSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="agent-company">Nome da Empresa</Label>
                      <Input
                        id="agent-company"
                        placeholder="Nome da empresa/banco"
                        value={agentData.companyName}
                        onChange={(e) =>
                          setAgentData({ ...agentData, companyName: e.target.value })
                        }
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="agent-cnpj">CNPJ</Label>
                      <Input
                        id="agent-cnpj"
                        placeholder="00.000.000/0000-00"
                        value={agentData.cnpj}
                        onChange={(e) => setAgentData({ ...agentData, cnpj: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="agent-cnpj">CNPJ</Label>
                      <Input
                        id="agent-cnpj"
                        placeholder="00.000.000/0000-00"
                        value={agentData.cnpj}
                        onChange={(e) => setAgentData({ ...agentData, cnpj: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="agent-contact">Contato</Label>
                      <Input
                        id="agent-contact"
                        placeholder="(11) 99999-9999"
                        value={agentData.contact}
                        onChange={(e) => setAgentData({ ...agentData, contact: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="agent-address">Endereço da Empresa</Label>
                    <Input
                      id="agent-address"
                      placeholder="Endereço completo da empresa"
                      value={agentData.address}
                      onChange={(e) => setAgentData({ ...agentData, address: e.target.value })}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="agent-cpf-resp">CPF Responsável</Label>
                      <Input
                        id="agent-cpf-resp"
                        placeholder="000.000.000-00"
                        value={agentData.cpfResponsavel}
                        onChange={(e) => {
                          const onlyDigits = e.target.value.replace(/\D/g, '').slice(0, 11);
                          setAgentData({ ...agentData, cpfResponsavel: onlyDigits });
                        }}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="agent-password">Senha</Label>
                      <Input
                        id="agent-password"
                        type="password"
                        placeholder="Digite uma senha"
                        value={agentData.password}
                        onChange={(e) => setAgentData({ ...agentData, password: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <Button type="submit" className="w-full" disabled={submitting || agentData.cpfResponsavel.replace(/\D/g, '').length !== 11}>
                    Cadastrar Agente
                  </Button>
                </form>
              </TabsContent>
            </Tabs>

            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                Já tem uma conta?{" "}
                <Button
                  variant="link"
                  className="p-0 h-auto"
                  onClick={() => navigate("/login")}
                >
                  Faça login aqui
                </Button>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Register;