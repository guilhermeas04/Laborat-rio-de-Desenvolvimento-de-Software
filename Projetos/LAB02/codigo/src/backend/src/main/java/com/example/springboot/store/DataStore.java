package com.example.springboot.store;

import com.example.springboot.model.Pedido;
import com.example.springboot.model.Veiculo;

import java.util.*;
import java.util.concurrent.ConcurrentHashMap;

public class DataStore {
    public static final Map<String, Pedido> pedidos = new ConcurrentHashMap<>();
    public static final Map<String, Veiculo> veiculos = new ConcurrentHashMap<>();

    static {
        // Seed pedidos
        pedidos.put("PED-001", new Pedido("PED-001","Honda Civic 2023","Cliente A","pendente","2024-01-15","R$ 150/dia"));
        pedidos.put("PED-002", new Pedido("PED-002","Toyota Corolla 2022","Cliente B","aprovado","2024-01-10","R$ 120/dia"));
        pedidos.put("PED-003", new Pedido("PED-003","Hyundai HB20 2023","Cliente C","ativo","2024-01-05","R$ 90/dia"));

        // Seed veiculos
        veiculos.put("CAR-001", new Veiculo("CAR-001","Honda Civic 2023","ABC1D23",2023,"Azul",150.0));
        veiculos.put("CAR-002", new Veiculo("CAR-002","Toyota Corolla 2022","EFG4H56",2022,"Prata",120.0));
    }
}
