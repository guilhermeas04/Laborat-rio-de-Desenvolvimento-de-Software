package com.projeto.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class EmpresaParceiraRequestDTO {

    @NotBlank(message = "Nome é obrigatório")
    private String nome;

    @NotBlank(message = "Documento é obrigatório")
    private String documento;

    @NotBlank(message = "Email é obrigatório")
    private String email;

    @NotBlank(message = "Login é obrigatório")
    private String login;

    @NotBlank(message = "Senha é obrigatória")
    private String senha;

    @NotBlank(message = "Nome fantasia é obrigatório")
    private String nomeFantasia;

    @NotBlank(message = "CNPJ é obrigatório")
    private String cnpj;

    public EmpresaParceiraRequestDTO() {}

    public EmpresaParceiraRequestDTO(String nome, String documento, String email, String login, String senha, String nomeFantasia, String cnpj) {
        this.nome = nome;
        this.documento = documento;
        this.email = email;
        this.login = login;
        this.senha = senha;
        this.nomeFantasia = nomeFantasia;
        this.cnpj = cnpj;
    }

    // getters e setters
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
    public String getNomeFantasia() { return nomeFantasia; }
    public void setNomeFantasia(String nomeFantasia) { this.nomeFantasia = nomeFantasia; }
    public String getCnpj() { return cnpj; }
    public void setCnpj(String cnpj) { this.cnpj = cnpj; }
}
