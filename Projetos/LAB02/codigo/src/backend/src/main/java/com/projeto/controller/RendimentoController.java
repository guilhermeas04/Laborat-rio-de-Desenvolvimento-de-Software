package com.projeto.controller;

import com.projeto.model.Rendimento;
import com.projeto.service.RendimentoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/rendimentos")
public class RendimentoController {

    @Autowired
    private RendimentoService rendimentoService;

    @PostMapping
    public ResponseEntity<Rendimento> criarRendimento(@RequestBody Rendimento rendimento) {
        try {
            Rendimento novoRendimento = rendimentoService.salvar(rendimento);
            return ResponseEntity.ok(novoRendimento);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping
    public ResponseEntity<List<Rendimento>> listarTodos() {
        List<Rendimento> rendimentos = rendimentoService.listarTodos();
        return ResponseEntity.ok(rendimentos);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Rendimento> buscarPorId(@PathVariable Long id) {
        Optional<Rendimento> rendimento = rendimentoService.buscarPorId(id);
        return rendimento.map(ResponseEntity::ok)
                         .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Rendimento> atualizarRendimento(@PathVariable Long id, @RequestBody Rendimento rendimento) {
        Optional<Rendimento> rendimentoAtualizado = rendimentoService.atualizar(id, rendimento);
        return rendimentoAtualizado.map(ResponseEntity::ok)
                                 .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletarRendimento(@PathVariable Long id) {
        boolean deletado = rendimentoService.deletar(id);
        if (deletado) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}