package com.projeto.model;
import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.*;
import java.util.Date;

@Entity
@Table(name = "pedidos") // Tabela "pedidos" no banco de dados
public class Pedido {
    public enum StatusPedido {
        Em_analise,
        Aprovado,
        Rejeitado,
        Cancelado
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne
    @JoinColumn(name = "cliente_id")
    @JsonBackReference("user-pedidos")
    private Usuario cliente;
    
    @ManyToOne
    @JoinColumn(name = "automovel_id")
    @JsonBackReference("automovel-pedidos")
    private Automovel automovel;

    @Enumerated(EnumType.STRING)
    private StatusPedido status;

    @Temporal(TemporalType.DATE)
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