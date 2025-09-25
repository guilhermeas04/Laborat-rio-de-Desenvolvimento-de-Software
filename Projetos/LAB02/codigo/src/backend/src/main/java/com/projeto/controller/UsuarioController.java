package com.projeto.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.projeto.model.Rendimento;
import com.projeto.model.Usuario;
import com.projeto.service.UsuarioService;

@RestController
@RequestMapping("/usuarios")
@CrossOrigin(origins = "*")
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    @PostMapping
    public ResponseEntity<?> criarUsuario(@RequestBody Usuario usuario) {
        Map<String,Object> body = new HashMap<>();
        if (usuario.getCpf() != null) {
            usuario.setCpf(usuario.getCpf().replaceAll("\\D", ""));
        }
        if (usuario.getCpf() == null || usuario.getCpf().length() != 11) {
            body.put("erro", "CPF inválido");
            body.put("detalhe", "CPF deve conter 11 dígitos");
            body.put("code", "CPF_INVALIDO");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(body);
        }
        try {
            Usuario novoUsuario = usuarioService.salvar(usuario);
            novoUsuario.setSenha(null);
            return ResponseEntity.status(HttpStatus.CREATED).body(novoUsuario);
        } catch (Exception e) {
            String msg = e.getMessage() != null ? e.getMessage() : "Erro ao salvar usuário";
            if (msg.toLowerCase().contains("cpf")) {
                body.put("erro", "CPF já cadastrado");
                body.put("code", "CPF_DUPLICADO");
            } else {
                body.put("erro", "Violação de integridade");
                body.put("code", "INTEGRIDADE");
            }
            body.put("detalhe", msg);
            return ResponseEntity.status(HttpStatus.CONFLICT).body(body);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Usuario> buscarUsuarioPorId(@PathVariable Long id) {
        Optional<Usuario> usuario = usuarioService.buscarPorId(id);
        return usuario.map(ResponseEntity::ok)
                      .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping
    public ResponseEntity<List<Usuario>> listarTodos() {
        List<Usuario> usuarios = usuarioService.listarTodos();
        return ResponseEntity.ok(usuarios);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Usuario> atualizarUsuario(@PathVariable Long id, @RequestBody Usuario usuario) {
        Optional<Usuario> usuarioAtualizado = usuarioService.atualizar(id, usuario);
        return usuarioAtualizado.map(ResponseEntity::ok)
                               .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletarUsuario(@PathVariable Long id) {
        boolean deletado = usuarioService.deletar(id);
        if (deletado) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/{usuarioId}/rendimentos")
    public ResponseEntity<Usuario> adicionarRendimento(@PathVariable Long usuarioId, @RequestBody Rendimento rendimento) {
        try {
            Usuario usuarioComRendimento = usuarioService.adicionarRendimento(usuarioId, rendimento);
            if (usuarioComRendimento != null) {
                return ResponseEntity.ok(usuarioComRendimento);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (IllegalStateException e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

    // Login endpoint (adicionando corpo de erro simples + normalização de CPF)
    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@RequestBody Map<String, String> loginData) {
        String cpf = loginData.get("cpf");
        String senha = loginData.get("senha");
        if (cpf != null) cpf = cpf.replaceAll("\\D", "");

        if (cpf == null || senha == null || cpf.length() != 11 || senha.isBlank()) {
            Map<String,Object> err = new HashMap<>();
            err.put("erro", "Credenciais inválidas");
            err.put("detalhe", "CPF deve ter 11 dígitos e senha não pode ser vazia");
            err.put("code", "LOGIN_INVALIDO");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(err);
        }

        Optional<Usuario> usuario = usuarioService.buscarPorCpfESenha(cpf, senha);
        if (usuario.isEmpty()) {
            Map<String,Object> err = new HashMap<>();
            err.put("erro", "CPF ou senha incorretos");
            err.put("code", "LOGIN_FALHA");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(err);
        }

        Map<String, Object> response = new HashMap<>();
        Usuario u = usuario.get();
        try { // evitar expor senha
            u.setSenha(null);
        } catch (Exception ignored) {}
        response.put("usuario", u);
        response.put("tipo", u.getTipoUsuario().toString());
        return ResponseEntity.ok(response);
    }
}