package com.projeto.dto;

public class EmpresaParceiraResponseDTO {
    private Long id;
    private String nome;
    private String documento;
    private String email;
    private String login;
    private String nomeFantasia;
    private String cnpj;

    public EmpresaParceiraResponseDTO() {}

    public EmpresaParceiraResponseDTO(Long id, String nome, String documento, String email, String login, String nomeFantasia, String cnpj) {
        this.id = id;
        this.nome = nome;
        this.documento = documento;
        this.email = email;
        this.login = login;
        this.nomeFantasia = nomeFantasia;
        this.cnpj = cnpj;
    }

    // getters e setters
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
    public String getNomeFantasia() { return nomeFantasia; }
    public void setNomeFantasia(String nomeFantasia) { this.nomeFantasia = nomeFantasia; }
    public String getCnpj() { return cnpj; }
    public void setCnpj(String cnpj) { this.cnpj = cnpj; }
}
