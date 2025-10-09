package com.projeto.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class InstituicaoEnsino {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;

    public InstituicaoEnsino() {}

    public InstituicaoEnsino(String nome) { this.nome = nome; }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getNome() { return nome; }
    public void setNome(String nome) { this.nome = nome; }

    @Override
    public String toString() { return "InstituicaoEnsino{nome='" + nome + "'}"; }
}
