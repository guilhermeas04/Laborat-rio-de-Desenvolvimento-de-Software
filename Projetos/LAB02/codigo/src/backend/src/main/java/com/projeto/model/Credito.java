package com.projeto.model;

import jakarta.persistence.*;
import com.fasterxml.jackson.annotation.JsonBackReference;


@Entity
@Table(name = "credito")
public class Credito {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "banco")
    @JsonBackReference("agente-creditos") // This is the key fix
    private Agente banco;

    @Column(name = "valor_aprovado")
    private Double valorAprovado;

    @Column(name = "prazo_pagamento")
    private Integer prazoPagamento;

    @Column(name = "taxa_juros")
    private Double taxaJuros;

    public Credito() {
    }

    public Credito(Agente banco, Double valorAprovado, Integer prazoPagamento, Double taxaJuros) {
        this.banco = banco;
        this.valorAprovado = valorAprovado;
        this.prazoPagamento = prazoPagamento;
        this.taxaJuros = taxaJuros;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Agente getBanco() {
        return banco;
    }

    public void setBanco(Agente banco) {
        this.banco = banco;
    }

    public Double getValorAprovado() {
        return valorAprovado;
    }

    public void setValorAprovado(Double valorAprovado) {
        this.valorAprovado = valorAprovado;
    }

    public Integer getPrazoPagamento() {
        return prazoPagamento;
    }

    public void setPrazoPagamento(Integer prazoPagamento) {
        this.prazoPagamento = prazoPagamento;
    }

    public Double getTaxaJuros() {
        return taxaJuros;
    }

    public void setTaxaJuros(Double taxaJuros) {
        this.taxaJuros = taxaJuros;
    }
}