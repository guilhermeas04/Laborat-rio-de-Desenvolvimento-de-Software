import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

export const RequireAuth: React.FC<{ children: React.ReactNode }> = ({ children }) => {
      const { usuario, loading } = useAuth();
      if (loading) return <div className="p-4 text-sm">Carregando...</div>;
      if (!usuario) return <Navigate to="/login" replace />;
      return <>{children}</>;
};

export const RequireTipo: React.FC<{ tipo: 'Cliente' | 'Agente'; children: React.ReactNode }> = ({ tipo, children }) => {
      const { usuario, tipo: atual } = useAuth();
      if (!usuario) return <Navigate to="/login" replace />;
      if (atual !== tipo) return <Navigate to={atual === 'Cliente' ? '/client' : '/agent'} replace />;
      return <>{children}</>;
};

export const OptionalAuth: React.FC<{ children: React.ReactNode }> = ({ children }) => <>{children}</>;
