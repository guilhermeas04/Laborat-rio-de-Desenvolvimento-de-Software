import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Car, User, Building } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Register = () => {
  const navigate = useNavigate();
  const [clientData, setClientData] = useState({
    name: "",
    email: "",
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
    email: "",
    password: "",
    cnpj: "",
    contact: "",
    address: "",
  });

  const handleClientSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Cadastro de cliente realizado com sucesso!");
    navigate("/login");
  };

  const handleAgentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Cadastro de agente realizado com sucesso!");
    navigate("/login");
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
                      <Label htmlFor="client-email">Email</Label>
                      <Input
                        id="client-email"
                        type="email"
                        placeholder="seu@email.com"
                        value={clientData.email}
                        onChange={(e) =>
                          setClientData({ ...clientData, email: e.target.value })
                        }
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
                    <div className="space-y-2">
                      <Label htmlFor="client-cpf">CPF</Label>
                      <Input
                        id="client-cpf"
                        placeholder="000.000.000-00"
                        value={clientData.cpf}
                        onChange={(e) =>
                          setClientData({ ...clientData, cpf: e.target.value })
                        }
                        required
                      />
                    </div>
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
                        onChange={(e) =>
                          setClientData({ ...clientData, income: e.target.value })
                        }
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

                  <Button type="submit" className="w-full">
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
                        onChange={(e) =>
                          setAgentData({ ...agentData, cnpj: e.target.value })
                        }
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="agent-email">Email Corporativo</Label>
                      <Input
                        id="agent-email"
                        type="email"
                        placeholder="empresa@email.com"
                        value={agentData.email}
                        onChange={(e) =>
                          setAgentData({ ...agentData, email: e.target.value })
                        }
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="agent-contact">Contato</Label>
                      <Input
                        id="agent-contact"
                        placeholder="(11) 99999-9999"
                        value={agentData.contact}
                        onChange={(e) =>
                          setAgentData({ ...agentData, contact: e.target.value })
                        }
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
                      onChange={(e) =>
                        setAgentData({ ...agentData, address: e.target.value })
                      }
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
                      onChange={(e) =>
                        setAgentData({ ...agentData, password: e.target.value })
                      }
                      required
                    />
                  </div>

                  <Button type="submit" className="w-full">
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