package com.example.springboot.model;

public class Pedido {
    private String id;
    private String car;
    private String clientName;
    private String status; // pendente, aprovado, ativo
    private String date;   // yyyy-MM-dd
    private String value;  // e.g., "R$ 150/dia"

    public Pedido() {}

    public Pedido(String id, String car, String clientName, String status, String date, String value) {
        this.id = id;
        this.car = car;
        this.clientName = clientName;
        this.status = status;
        this.date = date;
        this.value = value;
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getCar() { return car; }
    public void setCar(String car) { this.car = car; }

    public String getClientName() { return clientName; }
    public void setClientName(String clientName) { this.clientName = clientName; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public String getDate() { return date; }
    public void setDate(String date) { this.date = date; }

    public String getValue() { return value; }
    public void setValue(String value) { this.value = value; }
}
