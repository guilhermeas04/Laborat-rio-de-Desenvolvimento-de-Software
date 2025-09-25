import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
// QueryClientProvider agora é fornecido em AppProviders (main.tsx)
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
import { RequireAuth, RequireTipo } from './routes/Guards';

const App = () => (
  <TooltipProvider>
    <Toaster />
    <Sonner />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Register />} />
        {/* Rotas Cliente protegidas */}
        <Route path="/client" element={<RequireAuth><RequireTipo tipo="Cliente"><ClientDashboard /></RequireTipo></RequireAuth>} />
        <Route path="/client/pedidos" element={<RequireAuth><RequireTipo tipo="Cliente"><Pedidos /></RequireTipo></RequireAuth>} />
        <Route path="/client/novo-pedido" element={<RequireAuth><RequireTipo tipo="Cliente"><NovoPedido /></RequireTipo></RequireAuth>} />
        <Route path="/client/perfil" element={<RequireAuth><RequireTipo tipo="Cliente"><Perfil /></RequireTipo></RequireAuth>} />
        <Route path="/client/pedido/:id" element={<RequireAuth><RequireTipo tipo="Cliente"><DetalhesPedido /></RequireTipo></RequireAuth>} />
        <Route path="/client/editar-pedido/:id" element={<RequireAuth><RequireTipo tipo="Cliente"><EditarPedido /></RequireTipo></RequireAuth>} />
        {/* Rotas Agente protegidas */}
        <Route path="/agent" element={<RequireAuth><RequireTipo tipo="Agente"><AgentDashboard /></RequireTipo></RequireAuth>} />
        <Route path="/agent/pedidos" element={<RequireAuth><RequireTipo tipo="Agente"><PedidosAgente /></RequireTipo></RequireAuth>} />
        <Route path="/agent/avaliar/:id" element={<RequireAuth><RequireTipo tipo="Agente"><AvaliarPedido /></RequireTipo></RequireAuth>} />
        <Route path="/agent/carros" element={<RequireAuth><RequireTipo tipo="Agente"><Carros /></RequireTipo></RequireAuth>} />
        <Route path="/agent/carros/novo" element={<RequireAuth><RequireTipo tipo="Agente"><NovoVeiculo /></RequireTipo></RequireAuth>} />
        <Route path="/agent/contratos" element={<RequireAuth><RequireTipo tipo="Agente"><Contratos /></RequireTipo></RequireAuth>} />
        <Route path="/agent/perfil" element={<RequireAuth><RequireTipo tipo="Agente"><PerfilAgente /></RequireTipo></RequireAuth>} />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </TooltipProvider>
);

export default App;
