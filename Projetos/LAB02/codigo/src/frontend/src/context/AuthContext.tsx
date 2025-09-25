import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { login, Usuario, TipoUsuario, sanitizeUsuario } from '../lib/api';

interface AuthState {
      usuario?: Usuario;
      tipo?: TipoUsuario;
      loading: boolean;
      error?: string;
      login: (cpf: string, senha: string) => Promise<{ usuario: Usuario; tipo: TipoUsuario }>;
      logout: () => void;
}

const AuthContext = createContext<AuthState | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
      const [usuario, setUsuario] = useState<Usuario | undefined>(() => {
            try {
                  const raw = localStorage.getItem('auth.usuario');
                  return raw ? JSON.parse(raw) as Usuario : undefined;
            } catch { return undefined; }
      });
      const [tipo, setTipo] = useState<TipoUsuario | undefined>(() => {
            try { return localStorage.getItem('auth.tipo') as TipoUsuario || undefined; } catch { return undefined; }
      });
      const [loading, setLoading] = useState(false);
      const [error, setError] = useState<string | undefined>();

      const doLogin = useCallback(async (cpf: string, senha: string) => {
            setLoading(true); setError(undefined);
            try {
                  const resp = await login(cpf, senha);
                  setUsuario(sanitizeUsuario(resp.usuario));
                  setTipo(resp.tipo);
                  try {
                        localStorage.setItem('auth.usuario', JSON.stringify(sanitizeUsuario(resp.usuario)));
                        localStorage.setItem('auth.tipo', resp.tipo);
                  } catch { }
                  return { usuario: sanitizeUsuario(resp.usuario), tipo: resp.tipo };
            } catch (e: any) {
                  setError(e.message || 'Falha no login');
                  setUsuario(undefined); setTipo(undefined);
                  try { localStorage.removeItem('auth.usuario'); localStorage.removeItem('auth.tipo'); } catch { }
                  throw e;
            } finally {
                  setLoading(false);
            }
      }, []);

      const logout = useCallback(() => {
            setUsuario(undefined);
            setTipo(undefined);
            try { localStorage.removeItem('auth.usuario'); localStorage.removeItem('auth.tipo'); } catch { }
      }, []);

      // (Opcional) poderia validar sessão com backend aqui futuramente
      useEffect(() => {
            // noop placeholder for potential token refresh
      }, []);

      return (
            <AuthContext.Provider value={{ usuario, tipo, loading, error, login: doLogin, logout }}>
                  {children}
            </AuthContext.Provider>
      );
};

export function useAuth() {
      const ctx = useContext(AuthContext);
      if (!ctx) throw new Error('useAuth deve ser usado dentro de <AuthProvider>');
      return ctx;
}
