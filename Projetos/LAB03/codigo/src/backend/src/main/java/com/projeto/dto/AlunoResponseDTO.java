package com.projeto.dto;

public class AlunoResponseDTO {
    private Long id;
    private String nome;
    private String documento;
    private String email;
    private String login;
    private String rg;
    private String endereco;
    private String curso;
    private double saldoMoedas;
    private String instituicaoNome;
    private Long instituicaoId;

    // Construtores
    public AlunoResponseDTO() {}

    public AlunoResponseDTO(Long id, String nome, String documento, String email, String login,
                           String rg, String endereco, String curso, double saldoMoedas,
                           String instituicaoNome, Long instituicaoId) {
        this.id = id;
        this.nome = nome;
        this.documento = documento;
        this.email = email;
        this.login = login;
        this.rg = rg;
        this.endereco = endereco;
        this.curso = curso;
        this.saldoMoedas = saldoMoedas;
        this.instituicaoNome = instituicaoNome;
        this.instituicaoId = instituicaoId;
    }

    // Getters e Setters
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

    public String getRg() { return rg; }
    public void setRg(String rg) { this.rg = rg; }

    public String getEndereco() { return endereco; }
    public void setEndereco(String endereco) { this.endereco = endereco; }

    public String getCurso() { return curso; }
    public void setCurso(String curso) { this.curso = curso; }

    public double getSaldoMoedas() { return saldoMoedas; }
    public void setSaldoMoedas(double saldoMoedas) { this.saldoMoedas = saldoMoedas; }

    public String getInstituicaoNome() { return instituicaoNome; }
    public void setInstituicaoNome(String instituicaoNome) { this.instituicaoNome = instituicaoNome; }

    public Long getInstituicaoId() { return instituicaoId; }
    public void setInstituicaoId(Long instituicaoId) { this.instituicaoId = instituicaoId; }
}