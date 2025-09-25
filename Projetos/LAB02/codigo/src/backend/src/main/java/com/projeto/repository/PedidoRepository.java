package com.projeto.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.projeto.model.Pedido;

@Repository
public interface PedidoRepository extends JpaRepository<Pedido, Long> {
	java.util.List<Pedido> findByClienteId(Long clienteId);
}