package com.projeto.repository;

import com.projeto.model.EntidadeEmpregadora;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EntidadeEmpregadoraRepository extends JpaRepository<EntidadeEmpregadora, Long> {
}