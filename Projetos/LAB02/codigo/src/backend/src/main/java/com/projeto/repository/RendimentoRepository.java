package com.projeto.repository;

import com.projeto.model.Rendimento;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RendimentoRepository extends JpaRepository<Rendimento, Long> {
}