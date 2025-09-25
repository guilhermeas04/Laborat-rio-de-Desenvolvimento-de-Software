package com.projeto.controller;

import com.projeto.model.EntidadeEmpregadora;
import com.projeto.service.EntidadeEmpregadoraService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/entidades-empregadoras")
public class EntidadeEmpregadoraController {

    @Autowired
    private EntidadeEmpregadoraService entidadeEmpregadoraService;

    @PostMapping
    public ResponseEntity<EntidadeEmpregadora> criarEntidadeEmpregadora(@RequestBody EntidadeEmpregadora entidadeEmpregadora) {
        EntidadeEmpregadora novaEntidade = entidadeEmpregadoraService.salvar(entidadeEmpregadora);
        return ResponseEntity.ok(novaEntidade);
    }

    @GetMapping
    public ResponseEntity<List<EntidadeEmpregadora>> listarTodos() {
        List<EntidadeEmpregadora> entidades = entidadeEmpregadoraService.listarTodos();
        return ResponseEntity.ok(entidades);
    }

    @GetMapping("/{id}")
    public ResponseEntity<EntidadeEmpregadora> buscarPorId(@PathVariable Long id) {
        Optional<EntidadeEmpregadora> entidade = entidadeEmpregadoraService.buscarPorId(id);
        return entidade.map(ResponseEntity::ok)
                       .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<EntidadeEmpregadora> atualizarEntidadeEmpregadora(@PathVariable Long id, @RequestBody EntidadeEmpregadora entidadeEmpregadora) {
        Optional<EntidadeEmpregadora> entidadeAtualizada = entidadeEmpregadoraService.atualizar(id, entidadeEmpregadora);
        return entidadeAtualizada.map(ResponseEntity::ok)
                                 .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletarEntidadeEmpregadora(@PathVariable Long id) {
        boolean deletado = entidadeEmpregadoraService.deletar(id);
        if (deletado) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}