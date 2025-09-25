package com.projeto;

import org.junit.jupiter.api.*;
import org.junit.jupiter.api.MethodOrderer.OrderAnnotation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.http.*;
import org.springframework.test.context.ActiveProfiles;

import java.util.*;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@ActiveProfiles("dev")
@TestMethodOrder(OrderAnnotation.class)
public class ApiIntegrationTest {

    @LocalServerPort
    private int port;

    @Autowired
    private TestRestTemplate rest;

    private static Long usuarioClienteId;
    private static Long automovelId;
    private static Long agenteId;
    private static Long pedidoId;
    private static Long contratoId;
    private static Long creditoId;
    private static String unique(String prefix) {
        return prefix + UUID.randomUUID().toString().substring(0, 8);
    }

    private String baseUrl(String path) { return "http://localhost:" + port + path; }

    private <T> ResponseEntity<T> post(String path, Object body, Class<T> type) {
        return rest.postForEntity(baseUrl(path), body, type);
    }

    @Test @Order(1)
    void createUsuarioCliente_andLogin() {
        Map<String,Object> usuario = new LinkedHashMap<>();
        usuario.put("nome", "Cliente IT");
        usuario.put("cpf", unique("111"));
        usuario.put("rg", "RG-IT");
        usuario.put("endereco", "Rua Test 1");
        usuario.put("profissao", "Dev");
        usuario.put("senha", "123456");
        usuario.put("tipoUsuario", "Cliente");

        ResponseEntity<Map> createResp = post("/usuarios", usuario, Map.class);
        assertThat(createResp.getStatusCode()).isEqualTo(HttpStatus.OK);
        usuarioClienteId = Long.valueOf(((Number)createResp.getBody().get("id")).longValue());
        assertThat(usuarioClienteId).isNotNull();

        // login
        Map<String,String> login = new HashMap<>();
        login.put("cpf", (String) usuario.get("cpf"));
        login.put("senha", "123456");
        ResponseEntity<Map> loginResp = post("/usuarios/login", login, Map.class);
        assertThat(loginResp.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(loginResp.getBody()).containsKey("usuario");
    }

    @Test @Order(2)
    void addRendimentoToUsuario() {
        Map<String,Object> rendimento = new HashMap<>();
        rendimento.put("empregador", "Empresa IT");
        rendimento.put("valor", 5000.0);
        ResponseEntity<Map> resp = post("/usuarios/"+usuarioClienteId+"/rendimentos", rendimento, Map.class);
        assertThat(resp.getStatusCode()).isEqualTo(HttpStatus.OK);
    }

    @Test @Order(3)
    void createAutomovel() {
        Map<String,Object> automovel = new LinkedHashMap<>();
        automovel.put("placa", unique("PL") );
        automovel.put("matricula", unique("MAT") );
        automovel.put("marca", "MarcaX");
        automovel.put("modelo", "ModeloY");
        automovel.put("ano", 2024);
        automovel.put("proprietario", Collections.singletonMap("id", usuarioClienteId));
        ResponseEntity<Map> resp = post("/automoveis", automovel, Map.class);
        assertThat(resp.getStatusCode()).isEqualTo(HttpStatus.OK);
        automovelId = Long.valueOf(((Number)resp.getBody().get("id")).longValue());
    }

    @Test @Order(4)
    void createAgente_andCredito() {
        Map<String,Object> agente = new LinkedHashMap<>();
        agente.put("nome", "Agente IT");
        agente.put("cpf", unique("222"));
        agente.put("rg", "RG-AG");
        agente.put("endereco", "Av Central");
        agente.put("profissao", "Analista");
        agente.put("senha", "123456");
        agente.put("tipoUsuario", "Agente");
        agente.put("nomeAgente", "Banco IT");
        agente.put("tipoAgente", "Banco");
        ResponseEntity<Map> resp = post("/agentes", agente, Map.class);
        assertThat(resp.getStatusCode()).isEqualTo(HttpStatus.OK);
        agenteId = Long.valueOf(((Number)resp.getBody().get("id")).longValue());

        Map<String,Object> credito = new LinkedHashMap<>();
        credito.put("valorAprovado", 100000.0);
        credito.put("taxaJuros", 1.5);
        credito.put("prazoPagamento", 24);
        credito.put("banco", Collections.singletonMap("id", agenteId));
        ResponseEntity<Map> credResp = post("/creditos", credito, Map.class);
        assertThat(credResp.getStatusCode()).isEqualTo(HttpStatus.OK);
        creditoId = Long.valueOf(((Number)credResp.getBody().get("id")).longValue());
    }

    @Test @Order(5)
    void createPedido_thenListAndUpdate() {
        Map<String,Object> pedido = new LinkedHashMap<>();
        pedido.put("status", "PENDENTE");
        pedido.put("cliente", Collections.singletonMap("id", usuarioClienteId));
        pedido.put("automovel", Collections.singletonMap("id", automovelId));
        ResponseEntity<Map> resp = post("/pedidos", pedido, Map.class);
        assertThat(resp.getStatusCode()).isEqualTo(HttpStatus.OK);
        pedidoId = Long.valueOf(((Number)resp.getBody().get("id")).longValue());
        assertThat(resp.getBody().get("status")).isEqualTo("PENDENTE");

        // list
        ResponseEntity<List> listResp = rest.getForEntity(baseUrl("/pedidos"), List.class);
        assertThat(listResp.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(listResp.getBody()).isNotEmpty();

        // update to APROVADO
        pedido.put("status", "APROVADO");
        HttpHeaders h = new HttpHeaders();
        h.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<Map<String,Object>> putEntity = new HttpEntity<>(pedido, h);
        ResponseEntity<Map> upd = rest.exchange(baseUrl("/pedidos/"+pedidoId), HttpMethod.PUT, putEntity, Map.class);
        assertThat(upd.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(upd.getBody().get("status")).isEqualTo("APROVADO");
    }

    @Test @Order(6)
    void createContrato() {
        // minimal contrato without dates (nullable assumed)
        Map<String,Object> contrato = new LinkedHashMap<>();
        contrato.put("valor", 50000.0);
        contrato.put("tipoContrato", "Cliente");
        contrato.put("automovel", Collections.singletonMap("id", automovelId));
        contrato.put("pedido", Collections.singletonMap("id", pedidoId));
        ResponseEntity<Map> resp = post("/contratos", contrato, Map.class);
        assertThat(resp.getStatusCode()).isEqualTo(HttpStatus.OK);
        contratoId = Long.valueOf(((Number)resp.getBody().get("id")).longValue());
    }

    @Test @Order(7)
    void listSummaries() {
        assertThat(rest.getForEntity(baseUrl("/usuarios"), List.class).getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(rest.getForEntity(baseUrl("/automoveis"), List.class).getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(rest.getForEntity(baseUrl("/agentes"), List.class).getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(rest.getForEntity(baseUrl("/creditos"), List.class).getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(rest.getForEntity(baseUrl("/contratos"), List.class).getStatusCode()).isEqualTo(HttpStatus.OK);
    }
}
