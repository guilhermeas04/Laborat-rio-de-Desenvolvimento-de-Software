package com.projeto.dto;

public class LoginResponseDTO {
    private Long id;
    private String nome;
    private String email;
    private String login;
    private String tipo; // "ALUNO", "PROFESSOR", "EMPRESA"

    public LoginResponseDTO() {}

    public LoginResponseDTO(Long id, String nome, String email, String login, String tipo) {
        this.id = id;
        this.nome = nome;
        this.email = email;
        this.login = login;
        this.tipo = tipo;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getNome() { return nome; }
    public void setNome(String nome) { this.nome = nome; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getLogin() { return login; }
    public void setLogin(String login) { this.login = login; }

    public String getTipo() { return tipo; }
    public void setTipo(String tipo) { this.tipo = tipo; }
}
