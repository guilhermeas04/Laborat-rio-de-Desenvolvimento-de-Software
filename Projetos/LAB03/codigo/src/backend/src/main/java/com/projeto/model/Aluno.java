package com.projeto.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;

@Entity
public class Aluno extends Usuario {
    private String rg;
    private String endereco;
    private String curso;
    private double saldoMoedas;
    @ManyToOne
    private InstituicaoEnsino instituicao;

    public Aluno() { super(); }

    public Aluno(String nome, String documento, String email, String login, String senha,
                 String rg, String endereco, String curso, double saldoMoedas, InstituicaoEnsino instituicao) {
        super(nome, documento, email, login, senha);
        this.rg = rg;
        this.endereco = endereco;
        this.curso = curso;
        this.saldoMoedas = saldoMoedas;
        this.instituicao = instituicao;
    }

    public String getRg() { return rg; }
    public void setRg(String rg) { this.rg = rg; }

    public String getEndereco() { return endereco; }
    public void setEndereco(String endereco) { this.endereco = endereco; }

    public String getCurso() { return curso; }
    public void setCurso(String curso) { this.curso = curso; }

    public double getSaldoMoedas() { return saldoMoedas; }
    public void setSaldoMoedas(double saldoMoedas) { this.saldoMoedas = saldoMoedas; }

    public InstituicaoEnsino getInstituicao() { return instituicao; }
    public void setInstituicao(InstituicaoEnsino instituicao) { this.instituicao = instituicao; }

    @Override
    public String toString() {
        return "Aluno{nome='" + nome + "', rg='" + rg + "', curso='" + curso + "'}";
    }
}
