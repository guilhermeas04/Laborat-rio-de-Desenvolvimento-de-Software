import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { CreditosApi, QueryKeys, Credito } from '../lib/api';
import { withToast } from '@/lib/mutationToast';

export function useCreditos() {
      return useQuery({
            queryKey: QueryKeys.creditos,
            queryFn: CreditosApi.listar
      });
}

export function useCriarCredito() {
      const qc = useQueryClient();
      return useMutation({
            mutationFn: (data: Partial<Credito>) => withToast(() => CreditosApi.criar(data as any), { loading: 'Criando crédito...', success: 'Crédito criado!' }),
            onSuccess: () => {
                  qc.invalidateQueries({ queryKey: QueryKeys.creditos });
            }
      });
}

export function useAtualizarCredito() {
      const qc = useQueryClient();
      return useMutation({
            mutationFn: (vars: { id: number; data: Partial<Credito> }) => withToast(() => CreditosApi.atualizar(vars.id, vars.data), { loading: 'Atualizando crédito...', success: 'Crédito atualizado!' }),
            onSuccess: () => {
                  qc.invalidateQueries({ queryKey: QueryKeys.creditos });
            }
      });
}

export function useDeletarCredito() {
      const qc = useQueryClient();
      return useMutation({
            mutationFn: (id: number) => withToast(() => CreditosApi.deletar(id), { loading: 'Removendo crédito...', success: 'Crédito removido!' }),
            onSuccess: () => {
                  qc.invalidateQueries({ queryKey: QueryKeys.creditos });
            }
      });
}
