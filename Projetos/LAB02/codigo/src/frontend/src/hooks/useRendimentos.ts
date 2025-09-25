import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { RendimentosApi, QueryKeys, Rendimento } from '../lib/api';
import { withToast } from '@/lib/mutationToast';

export function useRendimentos() {
      return useQuery({
            queryKey: QueryKeys.rendimentos,
            queryFn: RendimentosApi.listar
      });
}

export function useCriarRendimento() {
      const qc = useQueryClient();
      return useMutation({
            mutationFn: (data: Partial<Rendimento>) => withToast(() => RendimentosApi.criar(data), { loading: 'Adicionando rendimento...', success: 'Rendimento adicionado!' }),
            onSuccess: () => {
                  qc.invalidateQueries({ queryKey: QueryKeys.rendimentos });
                  qc.invalidateQueries({ queryKey: QueryKeys.usuarios });
            }
      });
}

export function useAtualizarRendimento() {
      const qc = useQueryClient();
      return useMutation({
            mutationFn: (vars: { id: number; data: Partial<Rendimento> }) => withToast(() => RendimentosApi.atualizar(vars.id, vars.data), { loading: 'Atualizando rendimento...', success: 'Rendimento atualizado!' }),
            onSuccess: () => {
                  qc.invalidateQueries({ queryKey: QueryKeys.rendimentos });
            }
      });
}

export function useDeletarRendimento() {
      const qc = useQueryClient();
      return useMutation({
            mutationFn: (id: number) => withToast(() => RendimentosApi.deletar(id), { loading: 'Removendo rendimento...', success: 'Rendimento removido!' }),
            onSuccess: () => {
                  qc.invalidateQueries({ queryKey: QueryKeys.rendimentos });
            }
      });
}
