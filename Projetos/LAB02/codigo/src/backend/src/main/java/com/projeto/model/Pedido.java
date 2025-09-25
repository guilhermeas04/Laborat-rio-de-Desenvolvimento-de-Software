package com.projeto.model;
import java.util.Date;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;

@Entity
@Table(name = "pedido") // Tabela "pedidos" no banco de dados
public class Pedido {
    public enum StatusPedido {
        Em_analise,
        Aprovado,
        Rejeitado,
        Cancelado;

        // Accept aliases from frontend (e.g., "PENDENTE") and normalize input
        @JsonCreator
        public static StatusPedido fromString(String value) {
            if (value == null) return null;
            String v = value.trim().toUpperCase(java.util.Locale.ROOT);
            switch (v) {
                case "PENDENTE":
                case "EM_ANALISE":
                case "EM-ANALISE":
                case "EM ANÁLISE":
                case "EM ANALISE":
                    return Em_analise;
                case "APROVADO":
                    return Aprovado;
                case "REJEITADO":
                    return Rejeitado;
                case "CANCELADO":
                    return Cancelado;
                default:
                    throw new IllegalArgumentException("StatusPedido inválido: " + value);
            }
        }

        // Control JSON serialization to match frontend expectations
        @JsonValue
        public String toJson() {
            if (this == Em_analise) return "PENDENTE"; // keep public API consistent
            return this.name().toUpperCase(java.util.Locale.ROOT);
        }
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne
    @JoinColumn(name = "cliente_id")
    private Usuario cliente; // removido JsonBackReference para serializar cliente no retorno
    
    @ManyToOne
    @JoinColumn(name = "automovel_id")
    private Automovel automovel; // removido JsonBackReference para serializar automovel

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private StatusPedido status;

    @Temporal(TemporalType.DATE)
    @Column(name = "data_pedido")
    private Date dataPedido;

    // Construtores
    public Pedido() {
    }

    public Pedido(Usuario cliente, Automovel automovel, StatusPedido status, Date dataPedido) {
        this.cliente = cliente;
        this.automovel = automovel;
        this.status = status;
        this.dataPedido = dataPedido;
    }

    // Getters and Setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Usuario getCliente() {
        return cliente;
    }

    public void setCliente(Usuario cliente) {
        this.cliente = cliente;
    }

    public Automovel getAutomovel() {
        return automovel;
    }

    public void setAutomovel(Automovel automovel) {
        this.automovel = automovel;
    }

    public StatusPedido getStatus() {
        return status;
    }

    public void setStatus(StatusPedido status) {
        this.status = status;
    }

    public Date getDataPedido() {
        return dataPedido;
    }

    public void setDataPedido(Date dataPedido) {
        this.dataPedido = dataPedido;
    }
}