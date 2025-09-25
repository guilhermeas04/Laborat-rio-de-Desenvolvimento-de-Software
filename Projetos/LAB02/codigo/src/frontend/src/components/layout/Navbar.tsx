import { Button } from "@/components/ui/button";
import { Car, LogOut } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from '@/context/AuthContext';

interface NavbarProps {
  userType?: "client" | "agent" | null;
  onLogout?: () => void;
}

const Navbar = ({ userType, onLogout }: NavbarProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout: authLogout } = useAuth();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="bg-card border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <Car className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold text-foreground">CarOn</span>
          </div>

          <div className="flex items-center space-x-4">
            {userType && (
              <>
                <Button
                  variant={isActive(`/${userType}`) ? "default" : "ghost"}
                  onClick={() => navigate(`/${userType}`)}
                  size="sm"
                >
                  Dashboard
                </Button>

                {userType === "client" && (
                  <>
                    <Button
                      variant={isActive("/client/novo-pedido") ? "default" : "ghost"}
                      onClick={() => navigate("/client/novo-pedido")}
                      size="sm"
                    >
                      Novo Pedido
                    </Button>
                  </>
                )}

                {userType === "agent" && <></>}

                <Button
                  variant="ghost"
                  onClick={() => {
                    // Limpa estado de autenticação e depois executa callback externo (ex: navegar)
                    authLogout();
                    if (onLogout) {
                      onLogout();
                    } else {
                      navigate('/login');
                    }
                  }}
                  size="sm"
                  aria-label="Sair"
                >
                  <LogOut className="h-4 w-4 mr-1" />
                  <span className="hidden sm:inline">Sair</span>
                </Button>
              </>
            )}

            {!userType && (
              <>
                <Button
                  variant="ghost"
                  onClick={() => navigate("/login")}
                  size="sm"
                >
                  Login
                </Button>
                <Button
                  onClick={() => navigate("/cadastro")}
                  size="sm"
                >
                  Cadastre-se
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;