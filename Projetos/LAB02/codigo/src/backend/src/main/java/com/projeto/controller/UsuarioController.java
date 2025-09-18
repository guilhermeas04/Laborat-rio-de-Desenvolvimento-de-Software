package com.projeto.controller;

import com.projeto.model.Usuario;
import com.projeto.model.Rendimento;
import com.projeto.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/usuarios")
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    @PostMapping
    public ResponseEntity<Usuario> criarUsuario(@RequestBody Usuario usuario) {
        Usuario novoUsuario = usuarioService.salvar(usuario);
        return ResponseEntity.ok(novoUsuario);
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

    // New Endpoint to add a Rendimento to a Usuario
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
            // This handles the business rule: a client cannot have more than 3 rendimentos.
            return ResponseEntity.badRequest().body(null);
        }
    }
}