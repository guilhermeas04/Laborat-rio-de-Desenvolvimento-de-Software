package com.projeto.controller;

import com.projeto.model.Agente;
import com.projeto.service.AgenteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/agentes")
public class AgenteController {

    @Autowired
    private AgenteService agenteService;

    @PostMapping
    public ResponseEntity<Agente> criarAgente(@RequestBody Agente agente) {
        Agente novoAgente = agenteService.salvar(agente);
        return ResponseEntity.ok(novoAgente);
    }

    @GetMapping
    public ResponseEntity<List<Agente>> listarTodos() {
        List<Agente> agentes = agenteService.listarTodos();
        return ResponseEntity.ok(agentes);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Agente> buscarPorId(@PathVariable Long id) {
        Optional<Agente> agente = agenteService.buscarPorId(id);
        return agente.map(ResponseEntity::ok)
                       .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Agente> atualizarAgente(@PathVariable Long id, @RequestBody Agente agente) {
        Optional<Agente> agenteAtualizado = agenteService.atualizar(id, agente);
        return agenteAtualizado.map(ResponseEntity::ok)
                               .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletarAgente(@PathVariable Long id) {
        boolean deletado = agenteService.deletar(id);
        if (deletado) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}