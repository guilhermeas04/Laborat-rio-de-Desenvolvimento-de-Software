import { Routes, Route, Link, Navigate } from 'react-router-dom'
import { LayoutDashboard, Gift, UserRound, History, Building2, Send, LogIn } from 'lucide-react'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Students from './pages/Students'
import StudentDetail from './pages/StudentDetail'
import Transactions from './pages/Transactions'
import Vantagens from './pages/Vantagens'
import VantagemDetalhe from './pages/VantagemDetalhe'
import Perfil from './pages/Perfil'
import Cadastro from './pages/Cadastro'
import CadastroAluno from './pages/CadastroAluno'
import CadastroProfessor from './pages/CadastroProfessor'
import CadastroEmpresa from './pages/CadastroEmpresa'
import ProfessorEnviar from './pages/ProfessorEnviar'
import ProfessorHistorico from './pages/ProfessorHistorico'
import EmpresaCadastro from './pages/EmpresaCadastro'
import EmpresaVantagens from './pages/EmpresaVantagens'
import EmpresaNovaVantagem from './pages/EmpresaNovaVantagem'
import TopBar from './components/TopBar'
import { Toaster } from './components/Toaster'
import { useAuth, RequireAuth, defaultDashboard } from './context/Auth'

function Shell({ children }: { children: React.ReactNode }) {
  const { user, logout } = useAuth()
  return (
    <div className="min-h-screen flex bg-slate-50">
      <aside className="hidden md:flex w-64 flex-col gap-2 p-4 border-r bg-white">
        <div className="text-lg font-semibold px-2 py-1">Student Coin</div>
        <nav className="flex-1 space-y-1">
          {(!user || user.role === 'aluno') && (
            <Section title="Aluno">
              <NavItem to="/dashboard" icon={<LayoutDashboard size={18} />}>Extrato</NavItem>
              <NavItem to="/vantagens" icon={<Gift size={18} />}>Vantagens</NavItem>
              <NavItem to="/perfil" icon={<UserRound size={18} />}>Perfil</NavItem>
            </Section>
          )}
          {user?.role === 'professor' && (
            <Section title="Professor">
              <NavItem to="/prof/enviar" icon={<Send size={18} />}>Enviar Moedas</NavItem>
              <NavItem to="/prof/historico" icon={<History size={18} />}>Histórico</NavItem>
            </Section>
          )}
          {user?.role === 'empresa' && (
            <Section title="Empresa">
              <NavItem to="/empresa" icon={<Building2 size={18} />}>Dashboard</NavItem>
              <NavItem to="/empresa/vantagens" icon={<Gift size={18} />}>Vantagens</NavItem>
            </Section>
          )}
        </nav>
        {user ? (
          <button onClick={logout} className="btn w-full justify-center">Sair</button>
        ) : (
          <Link to="/login" className="btn w-full justify-center"><LogIn className="mr-2" size={16} />Login</Link>
        )}
      </aside>
      <main className="flex-1 p-4 md:p-8">
        <TopBar />
        {children}
      </main>
    </div>
  )
}

function Section({ title, children }: { title: string, children: React.ReactNode }) {
  return (
    <div>
      <div className="text-xs uppercase tracking-wide text-slate-400 px-2 mb-1">{title}</div>
      <div className="grid gap-1">{children}</div>
    </div>
  )
}

function NavItem({ to, icon, children }: { to: string, icon?: React.ReactNode, children: React.ReactNode }) {
  return (
    <Link to={to} className="flex items-center gap-2 px-2 py-2 rounded-md text-slate-700 hover:bg-slate-100">
      {icon}
      <span>{children}</span>
    </Link>
  )
}

export default function App() {
  return (
    <>
      <Toaster />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/login/aluno" element={<Login fixedRole="aluno" />} />
        <Route path="/login/professor" element={<Login fixedRole="professor" />} />
        <Route path="/login/empresa" element={<Login fixedRole="empresa" />} />
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/dashboard" element={<Shell><RequireAuth role="aluno"><Dashboard /></RequireAuth></Shell>} />
        <Route path="/vantagens" element={<Shell><RequireAuth role="aluno"><Vantagens /></RequireAuth></Shell>} />
        <Route path="/vantagens/:id" element={<Shell><RequireAuth role="aluno"><VantagemDetalhe /></RequireAuth></Shell>} />
        <Route path="/perfil" element={<Shell><RequireAuth role="aluno"><Perfil /></RequireAuth></Shell>} />
        <Route path="/cadastro-aluno" element={<Shell><CadastroAluno /></Shell>} />
        <Route path="/prof/enviar" element={<Shell><RequireAuth role="professor"><ProfessorEnviar /></RequireAuth></Shell>} />
        <Route path="/prof/historico" element={<Shell><RequireAuth role="professor"><ProfessorHistorico /></RequireAuth></Shell>} />
        <Route path="/empresa" element={<Shell><RequireAuth role="empresa"><EmpresaCadastro /></RequireAuth></Shell>} />
        <Route path="/empresa/vantagens" element={<Shell><RequireAuth role="empresa"><EmpresaVantagens /></RequireAuth></Shell>} />
        <Route path="/empresa/vantagens/nova" element={<Shell><RequireAuth role="empresa"><EmpresaNovaVantagem /></RequireAuth></Shell>} />
        <Route path="/students" element={<Shell><Students /></Shell>} />
        <Route path="/transactions" element={<Shell><Transactions /></Shell>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  )
}

// RedirectToDefault no longer used
