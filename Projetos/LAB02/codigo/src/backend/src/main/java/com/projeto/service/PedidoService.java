package com.projeto.service;

import com.projeto.model.Pedido;
import com.projeto.repository.PedidoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PedidoService {

    @Autowired
    private PedidoRepository pedidoRepository;

    public Pedido salvar(Pedido pedido) {
        return pedidoRepository.save(pedido);
    }

    public List<Pedido> listarTodos() {
        return pedidoRepository.findAll();
    }

    public Optional<Pedido> buscarPorId(Long id) {
        return pedidoRepository.findById(id);
    }

    public Optional<Pedido> atualizar(Long id, Pedido pedidoAtualizado) {
        return pedidoRepository.findById(id)
            .map(pedidoExistente -> {
                pedidoExistente.setAutomovel(pedidoAtualizado.getAutomovel());
                pedidoExistente.setStatus(pedidoAtualizado.getStatus());
                return pedidoRepository.save(pedidoExistente);
            });
    }

    public boolean deletar(Long id) {
        if (pedidoRepository.existsById(id)) {
            pedidoRepository.deleteById(id);
            return true;
        }
        return false;
    }
}