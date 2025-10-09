package com.projeto.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;

@Entity
public class Vantagem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String descricao;

    @Lob
    private byte[] foto;

    private double custoMoedas;

    public Vantagem() {}

    public Vantagem(String descricao, byte[] foto, double custoMoedas) {
        this.descricao = descricao;
        this.foto = foto;
        this.custoMoedas = custoMoedas;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getDescricao() { return descricao; }
    public void setDescricao(String descricao) { this.descricao = descricao; }

    public byte[] getFoto() { return foto; }
    public void setFoto(byte[] foto) { this.foto = foto; }

    public double getCustoMoedas() { return custoMoedas; }
    public void setCustoMoedas(double custoMoedas) { this.custoMoedas = custoMoedas; }

    @Override
    public String toString() { return "Vantagem{descricao='" + descricao + "', custoMoedas=" + custoMoedas + '}'; }
}
