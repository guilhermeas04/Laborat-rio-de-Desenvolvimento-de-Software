package com.projeto.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name = "usuario")
@Inheritance(strategy = InheritanceType.JOINED)
public class Usuario {
    public enum TipoUsuario {
        Cliente,
        Agente
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nome;
    
    @Column(unique = true)
    private String cpf;
    
    private String rg;
    private String endereco;
    private String profissao;
    private String senha;

    @Enumerated(EnumType.STRING)
    @Column(name = "tipousuario")
    private TipoUsuario tipoUsuario;

      // Relacionamento com Rendimentos
    @OneToMany(mappedBy = "usuario", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference("user-rendimentos")
    private List<Rendimento> rendimentos;

    // Relacionamento com Automoveis
    @OneToMany(mappedBy = "proprietario", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference("user-automoveis")
    private List<Automovel> automoveis;

    public Usuario() {
    }

    public Usuario(String nome, String cpf, String rg, String endereco, String profissao, String senha, TipoUsuario tipoUsuario) {
        this.nome = nome;
        this.cpf = cpf;
        this.rg = rg;
        this.endereco = endereco;
        this.profissao = profissao;
        this.senha = senha;
        this.tipoUsuario = tipoUsuario;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getNome() { return nome; }
    public void setNome(String nome) { this.nome = nome; }
    public String getCpf() { return cpf; }
    public void setCpf(String cpf) { this.cpf = cpf; }
    public String getRg() { return rg; }
    public void setRg(String rg) { this.rg = rg; }
    public String getEndereco() { return endereco; }
    public void setEndereco(String endereco) { this.endereco = endereco; }
    public String getProfissao() { return profissao; }
    public void setProfissao(String profissao) { this.profissao = profissao; }
    public String getSenha() { return senha; }
    public void setSenha(String senha) { this.senha = senha; }
    public TipoUsuario getTipoUsuario() { return tipoUsuario; }
    public void setTipoUsuario(TipoUsuario tipoUsuario) { this.tipoUsuario = tipoUsuario; }
    public List<Rendimento> getRendimentos() { return rendimentos; }
    public void setRendimentos(List<Rendimento> rendimentos) { this.rendimentos = rendimentos; }
    public List<Automovel> getAutomoveis() { return automoveis; }
    public void setAutomoveis(List<Automovel> automoveis) { this.automoveis = automoveis; }

    @Override
    public String toString() {
        return "Usuario{" +
                "id=" + id +
                ", nome='" + nome + '\'' +
                ", cpf='" + cpf + '\'' +
                ", tipoUsuario=" + tipoUsuario +
                '}';
    }
}