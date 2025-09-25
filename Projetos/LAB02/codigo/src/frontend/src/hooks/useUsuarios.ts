import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { UsuariosApi, QueryKeys, Usuario } from '../lib/api';
import { withToast } from '@/lib/mutationToast';

export function useUsuarios() {
      return useQuery({
            queryKey: QueryKeys.usuarios,
            queryFn: UsuariosApi.listar
      });
}

export function useCriarUsuario() {
      const qc = useQueryClient();
      return useMutation({
            mutationFn: (data: Partial<Usuario>) => withToast(() => UsuariosApi.criar(data), { loading: 'Criando usuário...', success: 'Usuário criado!' }),
            onSuccess: () => {
                  qc.invalidateQueries({ queryKey: QueryKeys.usuarios });
            }
      });
}

export function useAtualizarUsuario() {
      const qc = useQueryClient();
      return useMutation({
            mutationFn: (vars: { id: number; data: Partial<Usuario> }) => withToast(() => UsuariosApi.atualizar(vars.id, vars.data), { loading: 'Atualizando usuário...', success: 'Usuário atualizado!' }),
            onSuccess: () => {
                  qc.invalidateQueries({ queryKey: QueryKeys.usuarios });
            }
      });
}

export function useDeletarUsuario() {
      const qc = useQueryClient();
      return useMutation({
            mutationFn: (id: number) => withToast(() => UsuariosApi.deletar(id), { loading: 'Removendo usuário...', success: 'Usuário removido!' }),
            onSuccess: () => {
                  qc.invalidateQueries({ queryKey: QueryKeys.usuarios });
            }
      });
}
