package com.projeto.controller;

import com.projeto.dto.EmpresaParceiraRequestDTO;
import com.projeto.dto.EmpresaParceiraResponseDTO;
import com.projeto.service.EmpresaParceiraService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/empresas")
@CrossOrigin(origins = "*")
public class EmpresaParceiraController {

    @Autowired
    private EmpresaParceiraService empresaService;

    @GetMapping
    public ResponseEntity<List<EmpresaParceiraResponseDTO>> listarTodos() {
        return ResponseEntity.ok(empresaService.listarTodos());
    }

    @GetMapping("/{id}")
    public ResponseEntity<EmpresaParceiraResponseDTO> buscarPorId(@PathVariable Long id) {
        Optional<EmpresaParceiraResponseDTO> opt = empresaService.buscarPorId(id);
        return opt.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<EmpresaParceiraResponseDTO> criar(@Valid @RequestBody EmpresaParceiraRequestDTO dto) {
        EmpresaParceiraResponseDTO criado = empresaService.criar(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(criado);
    }

    @PutMapping("/{id}")
    public ResponseEntity<EmpresaParceiraResponseDTO> atualizar(@PathVariable Long id, @Valid @RequestBody EmpresaParceiraRequestDTO dto) {
        Optional<EmpresaParceiraResponseDTO> opt = empresaService.atualizar(id, dto);
        return opt.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        boolean ok = empresaService.deletar(id);
        if (ok) return ResponseEntity.noContent().build();
        return ResponseEntity.notFound().build();
    }
}
