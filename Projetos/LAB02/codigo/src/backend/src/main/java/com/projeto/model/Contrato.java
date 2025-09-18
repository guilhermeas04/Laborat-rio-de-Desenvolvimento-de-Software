package com.projeto.model;

import jakarta.persistence.*;
import java.util.Date;

@Entity
@Table(name = "contrato")
public class Contrato {
    public enum TipoContrato {
        Cliente,
        Empresa,
        Banco
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "pedido")
    private Pedido pedido;

    @Enumerated(EnumType.STRING)
    @Column(name = "tipo_contrato") // Adição da anotação para mapear a coluna

    private TipoContrato tipoContrato;

    private Double valor;
    
    @Temporal(TemporalType.DATE)
    @Column(name = "data_inicio")
    private Date dataInicio;

    @Temporal(TemporalType.DATE)
    @Column(name = "data_fim")
    private Date dataFim;

    @ManyToOne
    @JoinColumn(name = "automovel")
    private Automovel automovel;

    public Contrato() {
    }

    public Contrato(Pedido pedido, TipoContrato tipoContrato, Double valor, Date dataInicio, Date dataFim, Automovel automovel) {
        this.pedido = pedido;
        this.tipoContrato = tipoContrato;
        this.valor = valor;
        this.dataInicio = dataInicio;
        this.dataFim = dataFim;
        this.automovel = automovel;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Pedido getPedido() {
        return pedido;
    }

    public void setPedido(Pedido pedido) {
        this.pedido = pedido;
    }

    public TipoContrato getTipoContrato() {
        return tipoContrato;
    }

    public void setTipoContrato(TipoContrato tipoContrato) {
        this.tipoContrato = tipoContrato;
    }

    public Double getValor() {
        return valor;
    }

    public void setValor(Double valor) {
        this.valor = valor;
    }

    public Date getDataInicio() {
        return dataInicio;
    }

    public void setDataInicio(Date dataInicio) {
        this.dataInicio = dataInicio;
    }

    public Date getDataFim() {
        return dataFim;
    }

    public void setDataFim(Date dataFim) {
        this.dataFim = dataFim;
    }

    public Automovel getAutomovel() {
        return automovel;
    }

    public void setAutomovel(Automovel automovel) {
        this.automovel = automovel;
    }
}