package com.example.springboot.model;

public class Veiculo {
    private String id;
    private String modelo;
    private String placa;
    private int ano;
    private String cor;
    private Double diaria;

    public Veiculo() {}

    public Veiculo(String id, String modelo, String placa, int ano, String cor, Double diaria) {
        this.id = id;
        this.modelo = modelo;
        this.placa = placa;
        this.ano = ano;
        this.cor = cor;
        this.diaria = diaria;
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getModelo() { return modelo; }
    public void setModelo(String modelo) { this.modelo = modelo; }
    public String getPlaca() { return placa; }
    public void setPlaca(String placa) { this.placa = placa; }
    public int getAno() { return ano; }
    public void setAno(int ano) { this.ano = ano; }
    public String getCor() { return cor; }
    public void setCor(String cor) { this.cor = cor; }
    public Double getDiaria() { return diaria; }
    public void setDiaria(Double diaria) { this.diaria = diaria; }
}
