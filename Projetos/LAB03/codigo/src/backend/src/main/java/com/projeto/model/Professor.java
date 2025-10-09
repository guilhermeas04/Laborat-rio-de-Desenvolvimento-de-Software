package com.projeto.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;

@Entity
public class Professor extends Usuario {
    private String departamento;
    private double saldoMoedas;

    @ManyToOne
    private InstituicaoEnsino instituicao;

    public Professor() { super(); }

    public Professor(String nome, String documento, String email, String login, String senha,
                     String departamento, double saldoMoedas, InstituicaoEnsino instituicao) {
        super(nome, documento, email, login, senha);
        this.departamento = departamento;
        this.saldoMoedas = saldoMoedas;
        this.instituicao = instituicao;
    }

    

    public String getDepartamento() { return departamento; }
    public void setDepartamento(String departamento) { this.departamento = departamento; }

    public double getSaldoMoedas() { return saldoMoedas; }
    public void setSaldoMoedas(double saldoMoedas) { this.saldoMoedas = saldoMoedas; }

    public InstituicaoEnsino getInstituicao() { return instituicao; }
    public void setInstituicao(InstituicaoEnsino instituicao) { this.instituicao = instituicao; }

    @Override
    public String toString() {
        return "Professor{nome='" + nome + "', departamento='" + departamento + "'}";
    }
}
