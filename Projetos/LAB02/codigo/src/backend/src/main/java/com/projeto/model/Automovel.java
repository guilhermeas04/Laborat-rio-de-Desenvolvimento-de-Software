package com.projeto.model;
import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.*;

@Entity
@Table(name = "Automovel")
public class Automovel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String placa;
    
    @Column(nullable = false, unique = true)
    private String matricula;
    
    private Integer ano;
    
    private String marca;
    
    private String modelo;

    // Relacionamento ManyToOne: Um usuário (proprietário) pode ter muitos carros.
    @ManyToOne
    @JoinColumn(name = "proprietario")
    @JsonBackReference("user-automoveis") // This is the key fix
    private Usuario proprietario;

    public Automovel() {
    }

    public Automovel(String placa, String matricula, Integer ano, String marca, String modelo, Usuario proprietario) {
        this.placa = placa;
        this.matricula = matricula;
        this.ano = ano;
        this.marca = marca;
        this.modelo = modelo;
        this.proprietario = proprietario;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getPlaca() {
        return placa;
    }

    public void setPlaca(String placa) {
        this.placa = placa;
    }

    public String getMatricula() {
        return matricula;
    }

    public void setMatricula(String matricula) {
        this.matricula = matricula;
    }

    public Integer getAno() {
        return ano;
    }

    public void setAno(Integer ano) {
        this.ano = ano;
    }

    public String getMarca() {
        return marca;
    }

    public void setMarca(String marca) {
        this.marca = marca;
    }

    public String getModelo() {
        return modelo;
    }

    public void setModelo(String modelo) {
        this.modelo = modelo;
    }

    public Usuario getProprietario() {
        return proprietario;
    }

    public void setProprietario(Usuario proprietario) {
        this.proprietario = proprietario;
    }
}