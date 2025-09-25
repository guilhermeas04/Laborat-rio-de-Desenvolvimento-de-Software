import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { EntidadesEmpregadorasApi, QueryKeys } from '../lib/api';
import { withToast } from '@/lib/mutationToast';

export function useEntidadesEmpregadoras() {
      return useQuery({
            queryKey: QueryKeys.entidades,
            queryFn: EntidadesEmpregadorasApi.listar
      });
}

export function useCriarEntidade() {
      const qc = useQueryClient();
      return useMutation({
            mutationFn: (data: { nome: string }) => withToast(() => EntidadesEmpregadorasApi.criar(data), { loading: 'Criando entidade...', success: 'Entidade criada!' }),
            onSuccess: () => {
                  qc.invalidateQueries({ queryKey: QueryKeys.entidades });
            }
      });
}

export function useAtualizarEntidade() {
      const qc = useQueryClient();
      return useMutation({
            mutationFn: (vars: { id: number; data: { nome: string } }) => withToast(() => EntidadesEmpregadorasApi.atualizar(vars.id, vars.data), { loading: 'Atualizando entidade...', success: 'Entidade atualizada!' }),
            onSuccess: () => {
                  qc.invalidateQueries({ queryKey: QueryKeys.entidades });
            }
      });
}

export function useDeletarEntidade() {
      const qc = useQueryClient();
      return useMutation({
            mutationFn: (id: number) => withToast(() => EntidadesEmpregadorasApi.deletar(id), { loading: 'Removendo entidade...', success: 'Entidade removida!' }),
            onSuccess: () => {
                  qc.invalidateQueries({ queryKey: QueryKeys.entidades });
            }
      });
}
