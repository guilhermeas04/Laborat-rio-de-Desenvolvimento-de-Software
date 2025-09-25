package com.projeto.model;

import jakarta.persistence.*;

@Entity
@Table(name = "rendimento")
public class Rendimento {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Double valor;
    private String empregador;

    @ManyToOne
    @JoinColumn(name = "usuario_id", nullable = false)
    private Usuario usuario;

    public Rendimento() {
    }

    public Rendimento(Double valor, Usuario usuario) {
        this.valor = valor;
        this.usuario = usuario;
    }

    public Rendimento(Double valor, String empregador, Usuario usuario) {
        this.valor = valor;
        this.empregador = empregador;
        this.usuario = usuario;
    }

    // Getters e Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Double getValor() { return valor; }
    public void setValor(Double valor) { this.valor = valor; }
    public String getEmpregador() { return empregador; }
    public void setEmpregador(String empregador) { this.empregador = empregador; }
    public Usuario getUsuario() { return usuario; }
    public void setUsuario(Usuario usuario) { this.usuario = usuario; }
}