package com.projeto.repository;

import com.projeto.model.Cupom;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CupomRepository extends JpaRepository<Cupom, Long> {
}
