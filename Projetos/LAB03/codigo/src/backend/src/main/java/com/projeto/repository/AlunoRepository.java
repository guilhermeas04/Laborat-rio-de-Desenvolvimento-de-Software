package com.projeto.repository;

import com.projeto.model.Aluno;
import com.projeto.model.InstituicaoEnsino;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface AlunoRepository extends JpaRepository<Aluno, Long> {
    
    // Buscar aluno por email
    Optional<Aluno> findByEmail(String email);
    
    // Buscar aluno por login
    Optional<Aluno> findByLogin(String login);
    
    // Buscar aluno por documento
    Optional<Aluno> findByDocumento(String documento);
    
    // Buscar alunos por instituição
    List<Aluno> findByInstituicao(InstituicaoEnsino instituicao);
    
    // Buscar alunos por curso
    List<Aluno> findByCurso(String curso);
    
    // Buscar alunos com saldo de moedas maior que um valor
    @Query("SELECT a FROM Aluno a WHERE a.saldoMoedas >= :saldoMinimo")
    List<Aluno> findAlunosComSaldoMaiorQue(@Param("saldoMinimo") double saldoMinimo);
    
    // Verificar se já existe um aluno com o mesmo email
    boolean existsByEmail(String email);
    
    // Verificar se já existe um aluno com o mesmo login
    boolean existsByLogin(String login);
    
    // Verificar se já existe um aluno com o mesmo documento
    boolean existsByDocumento(String documento);
}
