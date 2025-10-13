package com.projeto.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;

public class AlunoRequestDTO {
    
    @NotBlank(message = "Nome é obrigatório")
    private String nome;
    
    @NotBlank(message = "Documento é obrigatório")
    private String documento;
    
    @Email(message = "Email deve ter formato válido")
    @NotBlank(message = "Email é obrigatório")
    private String email;
    
    @NotBlank(message = "Login é obrigatório")
    private String login;
    
    @NotBlank(message = "Senha é obrigatória")
    private String senha;
    
    @NotBlank(message = "RG é obrigatório")
    private String rg;
    
    @NotBlank(message = "Endereço é obrigatório")
    private String endereco;
    
    @NotBlank(message = "Curso é obrigatório")
    private String curso;
    
    @PositiveOrZero(message = "Saldo de moedas deve ser positivo ou zero")
    private double saldoMoedas;
    
    @NotNull(message = "ID da instituição é obrigatório")
    private Long instituicaoId;

    // Construtores
    public AlunoRequestDTO() {}

    public AlunoRequestDTO(String nome, String documento, String email, String login, String senha,
                          String rg, String endereco, String curso, double saldoMoedas, Long instituicaoId) {
        this.nome = nome;
        this.documento = documento;
        this.email = email;
        this.login = login;
        this.senha = senha;
        this.rg = rg;
        this.endereco = endereco;
        this.curso = curso;
        this.saldoMoedas = saldoMoedas;
        this.instituicaoId = instituicaoId;
    }

    // Getters e Setters
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

    public String getRg() { return rg; }
    public void setRg(String rg) { this.rg = rg; }

    public String getEndereco() { return endereco; }
    public void setEndereco(String endereco) { this.endereco = endereco; }

    public String getCurso() { return curso; }
    public void setCurso(String curso) { this.curso = curso; }

    public double getSaldoMoedas() { return saldoMoedas; }
    public void setSaldoMoedas(double saldoMoedas) { this.saldoMoedas = saldoMoedas; }

    public Long getInstituicaoId() { return instituicaoId; }
    public void setInstituicaoId(Long instituicaoId) { this.instituicaoId = instituicaoId; }
}