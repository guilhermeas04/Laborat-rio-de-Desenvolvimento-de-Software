import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { AutomoveisApi, QueryKeys, Automovel } from '../lib/api';
import { withToast } from '@/lib/mutationToast';

export function useAutomoveis() {
      return useQuery({
            queryKey: QueryKeys.automoveis,
            queryFn: AutomoveisApi.listar
      });
}

export function useCriarAutomovel() {
      const qc = useQueryClient();
      return useMutation({
            mutationFn: (data: Partial<Automovel>) => withToast(() => AutomoveisApi.criar(data as any), { loading: 'Criando veículo...', success: 'Veículo criado!' }),
            onSuccess: () => {
                  qc.invalidateQueries({ queryKey: QueryKeys.automoveis });
            }
      });
}

export function useAtualizarAutomovel() {
      const qc = useQueryClient();
      return useMutation({
            mutationFn: (vars: { id: number; data: Partial<Automovel> }) => withToast(() => AutomoveisApi.atualizar(vars.id, vars.data), { loading: 'Atualizando veículo...', success: 'Veículo atualizado!' }),
            onSuccess: () => {
                  qc.invalidateQueries({ queryKey: QueryKeys.automoveis });
            }
      });
}

export function useDeletarAutomovel() {
      const qc = useQueryClient();
      return useMutation({
            mutationFn: (id: number) => withToast(() => AutomoveisApi.deletar(id), { loading: 'Removendo veículo...', success: 'Veículo removido!' }),
            onSuccess: () => {
                  qc.invalidateQueries({ queryKey: QueryKeys.automoveis });
            }
      });
}
