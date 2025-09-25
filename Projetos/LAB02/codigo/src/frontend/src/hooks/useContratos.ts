import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ContratosApi, QueryKeys, Contrato } from '../lib/api';
import { withToast } from '@/lib/mutationToast';

export function useContratos() {
      return useQuery({
            queryKey: QueryKeys.contratos,
            queryFn: ContratosApi.listar
      });
}

export function useCriarContrato() {
      const qc = useQueryClient();
      return useMutation({
            mutationFn: (data: Partial<Contrato>) => withToast(() => ContratosApi.criar(data), { loading: 'Criando contrato...', success: 'Contrato criado!' }),
            onSuccess: () => {
                  qc.invalidateQueries({ queryKey: QueryKeys.contratos });
            }
      });
}

export function useAtualizarContrato() {
      const qc = useQueryClient();
      return useMutation({
            mutationFn: (vars: { id: number; data: Partial<Contrato> }) => withToast(() => ContratosApi.atualizar(vars.id, vars.data), { loading: 'Atualizando contrato...', success: 'Contrato atualizado!' }),
            onSuccess: () => {
                  qc.invalidateQueries({ queryKey: QueryKeys.contratos });
            }
      });
}

export function useDeletarContrato() {
      const qc = useQueryClient();
      return useMutation({
            mutationFn: (id: number) => withToast(() => ContratosApi.deletar(id), { loading: 'Removendo contrato...', success: 'Contrato removido!' }),
            onSuccess: () => {
                  qc.invalidateQueries({ queryKey: QueryKeys.contratos });
            }
      });
}
