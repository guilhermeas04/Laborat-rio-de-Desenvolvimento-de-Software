package com.projeto.controller;

import com.projeto.model.Credito;
import com.projeto.service.CreditoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/creditos")
public class CreditoController {

    @Autowired
    private CreditoService creditoService;

    @PostMapping
    public ResponseEntity<Credito> criarCredito(@RequestBody Credito credito) {
        Credito novoCredito = creditoService.salvar(credito);
        return ResponseEntity.ok(novoCredito);
    }

    @GetMapping
    public ResponseEntity<List<Credito>> listarTodos() {
        List<Credito> creditos = creditoService.listarTodos();
        return ResponseEntity.ok(creditos);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Credito> buscarPorId(@PathVariable Long id) {
        Optional<Credito> credito = creditoService.buscarPorId(id);
        return credito.map(ResponseEntity::ok)
                       .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Credito> atualizarCredito(@PathVariable Long id, @RequestBody Credito credito) {
        Optional<Credito> creditoAtualizado = creditoService.atualizar(id, credito);
        return creditoAtualizado.map(ResponseEntity::ok)
                                 .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletarCredito(@PathVariable Long id) {
        boolean deletado = creditoService.deletar(id);
        if (deletado) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}