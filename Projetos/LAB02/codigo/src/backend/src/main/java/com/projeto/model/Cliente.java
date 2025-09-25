package com.projeto.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name = "cliente")
@PrimaryKeyJoinColumn(name = "id")
public class Cliente extends Usuario {

    @ManyToMany
    @JoinTable(
        name = "cliente_entidadeempregadora",
        joinColumns = @JoinColumn(name = "idcliente"),
        inverseJoinColumns = @JoinColumn(name = "identidade")
    )
    @JsonIgnore // Evita recursão e problemas de desserialização para testes e APIs simples
    private List<EntidadeEmpregadora> empregadoras;

    public Cliente() {
    }

    public List<EntidadeEmpregadora> getEmpregadoras() {
        return empregadoras;
    }

    public void setEmpregadoras(List<EntidadeEmpregadora> empregadoras) {
        this.empregadoras = empregadoras;
    }
}