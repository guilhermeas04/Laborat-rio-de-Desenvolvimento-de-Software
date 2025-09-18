package com.projeto.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name = "agente")
@PrimaryKeyJoinColumn(name = "id") // Inherits the 'id' from the Usuario table
public class Agente extends Usuario {
    public enum TipoAgente {
        Empresa,
        Banco
    }

    private String nomeAgente;

    @Enumerated(EnumType.STRING)
    private TipoAgente tipoAgente;

    @OneToMany(mappedBy = "banco", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference("agente-creditos")
    private List<Credito> creditos;

    public Agente() {
    }

    public Agente(String nomeAgente, TipoAgente tipoAgente, Usuario usuario) {
        this.nomeAgente = nomeAgente;
        this.tipoAgente = tipoAgente;
        // With inheritance, you don't need the 'usuario' field
    }

    // Getters and Setters
    public String getNomeAgente() {
        return nomeAgente;
    }

    public void setNomeAgente(String nomeAgente) {
        this.nomeAgente = nomeAgente;
    }

    public TipoAgente getTipoAgente() {
        return tipoAgente;
    }

    public void setTipoAgente(TipoAgente tipoAgente) {
        this.tipoAgente = tipoAgente;
    }

    public List<Credito> getCreditos() {
        return creditos;
    }

    public void setCreditos(List<Credito> creditos) {
        this.creditos = creditos;
    }
}