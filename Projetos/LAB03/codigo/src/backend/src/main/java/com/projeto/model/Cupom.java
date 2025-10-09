package com.projeto.model;

import java.util.Date;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Cupom {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String codigo;
    private Date dataGeracao;
    private boolean valido;

    public Cupom() {}

    public Cupom(String codigo, Date dataGeracao, boolean valido) {
        this.codigo = codigo;
        this.dataGeracao = dataGeracao;
        this.valido = valido;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getCodigo() { return codigo; }
    public void setCodigo(String codigo) { this.codigo = codigo; }

    public Date getDataGeracao() { return dataGeracao; }
    public void setDataGeracao(Date dataGeracao) { this.dataGeracao = dataGeracao; }

    public boolean isValido() { return valido; }
    public void setValido(boolean valido) { this.valido = valido; }

    @Override
    public String toString() { return "Cupom{codigo='" + codigo + "', valido=" + valido + '}'; }
}
