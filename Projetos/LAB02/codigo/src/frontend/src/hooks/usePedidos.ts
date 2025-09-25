import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { PedidosApi, QueryKeys, StatusPedido, PedidoUI } from '../lib/api';
import { withToast } from '@/lib/mutationToast';

// Hook para listar todos os pedidos
export function usePedidos() {
      return useQuery({
            queryKey: QueryKeys.pedidos,
            queryFn: PedidosApi.listar
      });
}

// Hook para listar pedidos de um cliente específico
export function usePedidosCliente(clienteId: number | undefined) {
      return useQuery({
            queryKey: clienteId ? QueryKeys.pedidosCliente(clienteId) : ['pedidos', 'cliente', '_none'],
            queryFn: () => PedidosApi.listarPorCliente(clienteId!),
            enabled: !!clienteId
      });
}

// Criar pedido
export function useCriarPedido() {
      const qc = useQueryClient();
      return useMutation({
            mutationFn: (data: { clienteId: number; automovelId: number; status?: StatusPedido }) =>
                  withToast(() => PedidosApi.criar(data), { loading: 'Criando pedido...', success: 'Pedido criado!' }),
            onSuccess: (created) => {
                  qc.invalidateQueries({ queryKey: QueryKeys.pedidos });
                  if (created.raw.cliente?.id) {
                        qc.invalidateQueries({ queryKey: QueryKeys.pedidosCliente(created.raw.cliente.id) });
                  }
            }
      });
}

// Atualizar pedido (PUT completo)
export function useAtualizarPedido() {
      const qc = useQueryClient();
      return useMutation({
            mutationFn: (vars: { id: number; data: Partial<PedidoUI['raw']> }) =>
                  withToast(() => PedidosApi.atualizar(vars.id, vars.data), { loading: 'Atualizando pedido...', success: 'Pedido atualizado!' }),
            onSuccess: (updated) => {
                  qc.invalidateQueries({ queryKey: QueryKeys.pedidos });
                  if (updated.raw.cliente?.id) {
                        qc.invalidateQueries({ queryKey: QueryKeys.pedidosCliente(updated.raw.cliente.id) });
                  }
            }
      });
}

// Alterar apenas status (PATCH)
export function useAtualizarStatusPedido() {
      const qc = useQueryClient();
      return useMutation({
            mutationFn: (vars: { id: number; status: StatusPedido }) =>
                  withToast(() => PedidosApi.atualizarStatus(vars.id, vars.status), { loading: 'Alterando status...', success: 'Status atualizado!' }),
            onSuccess: (updated) => {
                  qc.invalidateQueries({ queryKey: QueryKeys.pedidos });
                  if (updated.raw.cliente?.id) {
                        qc.invalidateQueries({ queryKey: QueryKeys.pedidosCliente(updated.raw.cliente.id) });
                  }
            }
      });
}

// Deletar pedido
export function useDeletarPedido() {
      const qc = useQueryClient();
      return useMutation({
            mutationFn: (id: number) => withToast(() => PedidosApi.deletar(id), { loading: 'Removendo...', success: 'Pedido removido!' }),
            onSuccess: () => {
                  qc.invalidateQueries({ queryKey: QueryKeys.pedidos });
            }
      });
}
