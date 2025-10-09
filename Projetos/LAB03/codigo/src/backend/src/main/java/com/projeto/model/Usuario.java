package com.projeto.model;

import jakarta.persistence.DiscriminatorColumn;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Inheritance;
import jakarta.persistence.InheritanceType;

@Entity
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name = "usuario_tipo")
public abstract class Usuario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    protected Long id;

    protected String nome;
    protected String documento;
    protected String email;
    protected String login;
    protected String senha;

    public Usuario() {}

    public Usuario(String nome, String documento, String email, String login, String senha) {
        this.nome = nome;
        this.documento = documento;
        this.email = email;
        this.login = login;
        this.senha = senha;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getNome() { return nome; }
    public void setNome(String nome) { this.nome = nome; }

    public String getDocumento() { return documento; }
    public void setDocumento(String documento) { this.documento = documento; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getLogin() { return login; }
    public void setLogin(String login) { this.login = login; }

    public String getSenha() { return senha; }
    public void setSenha(String senha) { this.senha = senha; }

    @Override
    public String toString() {
        return "Usuario{id=" + id + ", nome='" + nome + "', documento='" + documento + "'}";
    }
}
