package com.projeto;

import org.junit.jupiter.api.*;
import org.junit.jupiter.api.TestInstance;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.http.*;
import org.springframework.test.context.ActiveProfiles;

import java.util.*;

import static org.assertj.core.api.Assertions.assertThat;

/**
 * Testa rotas ainda não cobertas pelo fluxo principal e cenários de erro:
 * - CRUD de Cliente, EntidadeEmpregadora, Rendimento direto
 * - PUT/DELETE e verificação de 404 após remoção
 * - Login com senha errada
 * - Limite de 3 rendimentos para Cliente (4º deve falhar 400)
 */
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@ActiveProfiles("dev")
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
public class CrudAndErrorPathsTest {

    @LocalServerPort
    int port;
    @Autowired
    TestRestTemplate rest;

    private Long clienteId;
    private Long entidadeId;
    private Long rendimentoId;
    private Long usuarioLoginId;
    private Long automovelToDeleteId;

    private String url(String p){ return "http://localhost:"+port+p; }

    private Map<String,Object> novoClientePayload(String cpf){
        Map<String,Object> c = new LinkedHashMap<>();
        c.put("nome","Cliente Extra");
        c.put("cpf",cpf);
        c.put("rg","RG-X");
        c.put("endereco","Rua B, 10");
        c.put("profissao","Tester");
        c.put("senha","abc123");
        c.put("tipoUsuario","Cliente");
        return c;
    }

    @Test @Order(1)
    void criarCliente_eLoginErrado() {
        String cpf = "CL"+UUID.randomUUID().toString().substring(0,6);
        ResponseEntity<Map> create = rest.postForEntity(url("/clientes"), novoClientePayload(cpf), Map.class);
        assertThat(create.getStatusCode()).isEqualTo(HttpStatus.OK);
        clienteId = ((Number)create.getBody().get("id")).longValue();
        assertThat(clienteId).isNotNull();

        // login correto (via /usuarios/login porque Cliente herda Usuario)
        Map<String,String> loginOk = Map.of("cpf", cpf, "senha", "abc123");
        ResponseEntity<Map> loginResp = rest.postForEntity(url("/usuarios/login"), loginOk, Map.class);
        assertThat(loginResp.getStatusCode()).isEqualTo(HttpStatus.OK);

        // login errado
        Map<String,String> loginBad = Map.of("cpf", cpf, "senha", "errada");
        ResponseEntity<Map> loginBadResp = rest.postForEntity(url("/usuarios/login"), loginBad, Map.class);
        assertThat(loginBadResp.getStatusCode()).isEqualTo(HttpStatus.BAD_REQUEST);
        usuarioLoginId = clienteId; // reutilizado depois
    }

    @Test @Order(2)
    void crudEntidadeEmpregadora() {
        Map<String,Object> payload = Map.of("nome","Empresa Z");
        ResponseEntity<Map> create = rest.postForEntity(url("/entidades-empregadoras"), payload, Map.class);
        assertThat(create.getStatusCode()).isEqualTo(HttpStatus.OK);
        entidadeId = ((Number)create.getBody().get("id")).longValue();

        ResponseEntity<Map> get = rest.getForEntity(url("/entidades-empregadoras/"+entidadeId), Map.class);
        assertThat(get.getStatusCode()).isEqualTo(HttpStatus.OK);

        Map<String,Object> updatePayload = new LinkedHashMap<>();
        updatePayload.put("nome","Empresa Z Atualizada");
        HttpEntity<Map<String,Object>> putEntity = new HttpEntity<>(updatePayload, jsonHeaders());
        ResponseEntity<Map> put = rest.exchange(url("/entidades-empregadoras/"+entidadeId), HttpMethod.PUT, putEntity, Map.class);
        assertThat(put.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(put.getBody().get("nome")).isEqualTo("Empresa Z Atualizada");
    }

    @Test @Order(3)
    void rendimentoDiretoCrud() {
        // Garante que existe um cliente criado em testes anteriores; se não, cria agora (id não persiste sem PER_CLASS/ordem)
        if (clienteId == null) {
            String cpf = "RC"+UUID.randomUUID().toString().substring(0,6);
            ResponseEntity<Map> createCliente = rest.postForEntity(url("/clientes"), novoClientePayload(cpf), Map.class);
            assertThat(createCliente.getStatusCode()).isEqualTo(HttpStatus.OK);
            clienteId = ((Number)createCliente.getBody().get("id")).longValue();
        }
        Map<String,Object> r = new LinkedHashMap<>();
        r.put("empregador","Empresa Y");
        r.put("valor", 3000.0);
        Map<String,Object> userRef = new HashMap<>();
        userRef.put("id", clienteId);
        r.put("usuario", userRef);
        ResponseEntity<Map> create = rest.postForEntity(url("/rendimentos"), r, Map.class);
        assertThat(create.getStatusCode()).isEqualTo(HttpStatus.OK);
        rendimentoId = ((Number)create.getBody().get("id")).longValue();

        ResponseEntity<Map> get = rest.getForEntity(url("/rendimentos/"+rendimentoId), Map.class);
        assertThat(get.getStatusCode()).isEqualTo(HttpStatus.OK);

        r.put("valor", 3500.0);
        HttpEntity<Map<String,Object>> putEntity = new HttpEntity<>(r, jsonHeaders());
        ResponseEntity<Map> upd = rest.exchange(url("/rendimentos/"+rendimentoId), HttpMethod.PUT, putEntity, Map.class);
        assertThat(upd.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(((Number)upd.getBody().get("valor")).doubleValue()).isEqualTo(3500.0);
    }

    @Test @Order(4)
    void limiteTresRendimentos_quartoFalha() {
        // Criar novo cliente só para este teste
        String cpf = "LIM"+UUID.randomUUID().toString().substring(0,6);
        ResponseEntity<Map> cliente = rest.postForEntity(url("/clientes"), novoClientePayload(cpf), Map.class);
        Long cId = ((Number)cliente.getBody().get("id")).longValue();
        for(int i=1;i<=3;i++) {
            Map<String,Object> rend = new LinkedHashMap<>();
            rend.put("empregador","Emp"+i);
            rend.put("valor", 1000.0 * i);
            ResponseEntity<Map> ok = rest.postForEntity(url("/usuarios/"+cId+"/rendimentos"), rend, Map.class);
            assertThat(ok.getStatusCode()).isEqualTo(HttpStatus.OK);
        }
        // 4º deve retornar 400
        Map<String,Object> rend4 = new LinkedHashMap<>();
        rend4.put("empregador","Emp4");
        rend4.put("valor", 4000.0);
        ResponseEntity<Map> fail = rest.postForEntity(url("/usuarios/"+cId+"/rendimentos"), rend4, Map.class);
        assertThat(fail.getStatusCode()).isEqualTo(HttpStatus.BAD_REQUEST);
    }

    @Test @Order(5)
    void deleteAutomovel_eVerificar404() {
        // criar usuário proprietário
        String cpf = "AUT"+UUID.randomUUID().toString().substring(0,6);
        ResponseEntity<Map> user = rest.postForEntity(url("/usuarios"), novoClientePayload(cpf), Map.class);
        Long ownerId = ((Number)user.getBody().get("id")).longValue();
        Map<String,Object> auto = new LinkedHashMap<>();
        auto.put("placa","PL"+UUID.randomUUID().toString().substring(0,5));
        auto.put("matricula","MAT"+UUID.randomUUID().toString().substring(0,5));
        auto.put("marca","MarcaT");
        auto.put("modelo","ModeloT");
        auto.put("ano", 2023);
        auto.put("proprietario", Map.of("id", ownerId));
        ResponseEntity<Map> create = rest.postForEntity(url("/automoveis"), auto, Map.class);
        assertThat(create.getStatusCode()).isEqualTo(HttpStatus.OK);
        automovelToDeleteId = ((Number)create.getBody().get("id")).longValue();

        rest.delete(url("/automoveis/"+automovelToDeleteId));
        ResponseEntity<Map> getDeleted = rest.getForEntity(url("/automoveis/"+automovelToDeleteId), Map.class);
        assertThat(getDeleted.getStatusCode()).isEqualTo(HttpStatus.NOT_FOUND);
    }

    @Test @Order(6)
    void getNotFoundGenerico() {
        ResponseEntity<Map> resp = rest.getForEntity(url("/usuarios/999999"), Map.class);
        assertThat(resp.getStatusCode()).isEqualTo(HttpStatus.NOT_FOUND);
    }

    private HttpHeaders jsonHeaders(){
        HttpHeaders h = new HttpHeaders();
        h.setContentType(MediaType.APPLICATION_JSON);
        return h;
    }
}
