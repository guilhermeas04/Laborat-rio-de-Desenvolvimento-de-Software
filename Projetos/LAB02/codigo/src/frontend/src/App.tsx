import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ClientDashboard from "./pages/client/ClientDashboard";
import AgentDashboard from "./pages/agent/AgentDashboard";
import NotFound from "./pages/NotFound";
import Pedidos from "./pages/client/pedidos";
import NovoPedido from "./pages/client/novo-pedido";
import Perfil from "./pages/client/perfil";
import PedidosAgente from "./pages/agent/pedidos";
import Carros from "./pages/agent/carros";
import Contratos from "./pages/agent/contratos";
import PerfilAgente from "./pages/agent/perfil";
import AvaliarPedido from "./pages/agent/AvaliarPedido";
import NovoVeiculo from "./pages/agent/NovoVeiculo";
import DetalhesPedido from "./pages/client/DetalhesPedido";
import EditarPedido from "./pages/client/EditarPedido";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cadastro" element={<Register />} />
          <Route path="/client" element={<ClientDashboard />} />
          <Route path="/client/pedidos" element={<Pedidos />} />
          <Route path="/client/novo-pedido" element={<NovoPedido />} />
          <Route path="/client/perfil" element={<Perfil />} />
          <Route path="/client/pedido/:id" element={<DetalhesPedido />} />
          <Route path="/client/editar-pedido/:id" element={<EditarPedido />} />
          <Route path="/agent" element={<AgentDashboard />} />
          <Route path="/agent/pedidos" element={<PedidosAgente />} />
          <Route path="/agent/avaliar/:id" element={<AvaliarPedido />} />
          <Route path="/agent/carros" element={<Carros />} />
          <Route path="/agent/carros/novo" element={<NovoVeiculo />} />
          <Route path="/agent/contratos" element={<Contratos />} />
          <Route path="/agent/perfil" element={<PerfilAgente />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
