package com.projeto.controller;

import com.projeto.model.Automovel;
import com.projeto.service.AutomovelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/automoveis")
public class AutomovelController {

    @Autowired
    private AutomovelService automovelService;

    @PostMapping
    public ResponseEntity<Automovel> criarAutomovel(@RequestBody Automovel automovel) {
        Automovel novoAutomovel = automovelService.salvar(automovel);
        return ResponseEntity.ok(novoAutomovel);
    }

    @GetMapping
    public ResponseEntity<List<Automovel>> listarTodos() {
        List<Automovel> automoveis = automovelService.listarTodos();
        return ResponseEntity.ok(automoveis);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Automovel> buscarPorId(@PathVariable Long id) {
        Optional<Automovel> automovel = automovelService.buscarPorId(id);
        return automovel.map(ResponseEntity::ok)
                       .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Automovel> atualizarAutomovel(@PathVariable Long id, @RequestBody Automovel automovel) {
        Optional<Automovel> automovelAtualizado = automovelService.atualizar(id, automovel);
        return automovelAtualizado.map(ResponseEntity::ok)
                                 .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletarAutomovel(@PathVariable Long id) {
        boolean deletado = automovelService.deletar(id);
        if (deletado) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}