package com.projeto.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;


@Entity
public class EmpresaParceira extends Usuario {
    private String nomeFantasia;
    private String cnpj;

    public EmpresaParceira() { super(); }

    public EmpresaParceira(String nome, String documento, String email, String login, String senha,
                           String nomeFantasia, String cnpj) {
        super(nome, documento, email, login, senha);
        this.nomeFantasia = nomeFantasia;
        this.cnpj = cnpj;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getNomeFantasia() { return nomeFantasia; }
    public void setNomeFantasia(String nomeFantasia) { this.nomeFantasia = nomeFantasia; }

    public String getCnpj() { return cnpj; }
    public void setCnpj(String cnpj) { this.cnpj = cnpj; }

    @Override
    public String toString() {
        return "EmpresaParceira{nome='" + nome + "', nomeFantasia='" + nomeFantasia + "'}";
    }
}
