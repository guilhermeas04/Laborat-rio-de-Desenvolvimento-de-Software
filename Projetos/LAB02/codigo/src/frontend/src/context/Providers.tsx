import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './AuthContext';

const queryClient = new QueryClient({
      defaultOptions: {
            queries: {
                  refetchOnWindowFocus: false,
                  staleTime: 1000 * 30,
                  retry: 1
            }
      }
});

export const AppProviders: React.FC<{ children: React.ReactNode }> = ({ children }) => {
      return (
            <QueryClientProvider client={queryClient}>
                  <AuthProvider>
                        {children}
                  </AuthProvider>
            </QueryClientProvider>
      );
};
