package com.projeto.controller;

import com.projeto.dto.AlunoRequestDTO;
import com.projeto.dto.AlunoResponseDTO;
import com.projeto.service.AlunoService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/alunos")
@CrossOrigin(origins = "*")
public class AlunoController {

    @Autowired
    private AlunoService alunoService;

    @GetMapping
    public ResponseEntity<List<AlunoResponseDTO>> listarTodos() {
        List<AlunoResponseDTO> alunos = alunoService.listarTodos();
        return ResponseEntity.ok(alunos);
    }

    @GetMapping("/{id}")
    public ResponseEntity<AlunoResponseDTO> buscarPorId(@PathVariable Long id) {
        Optional<AlunoResponseDTO> aluno = alunoService.buscarPorId(id);
        
        if (aluno.isPresent()) {
            return ResponseEntity.ok(aluno.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public ResponseEntity<AlunoResponseDTO> criar(@Valid @RequestBody AlunoRequestDTO requestDTO) {
        AlunoResponseDTO alunoResposta = alunoService.criar(requestDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(alunoResposta);
    }

    @PutMapping("/{id}")
    public ResponseEntity<AlunoResponseDTO> atualizar(@PathVariable Long id, 
                                                     @Valid @RequestBody AlunoRequestDTO requestDTO) {
        Optional<AlunoResponseDTO> alunoAtualizado = alunoService.atualizar(id, requestDTO);
        if (alunoAtualizado.isPresent()) {
            return ResponseEntity.ok(alunoAtualizado.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        boolean deletado = alunoService.deletar(id);
        
        if (deletado) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PatchMapping("/{id}/adicionar-moedas")
    public ResponseEntity<String> adicionarMoedas(@PathVariable Long id, 
                                                 @RequestParam double quantidade) {
        if (quantidade <= 0) {
            return ResponseEntity.badRequest().body("A quantidade deve ser positiva");
        }
        
        boolean sucesso = alunoService.adicionarMoedas(id, quantidade);
        
        if (sucesso) {
            return ResponseEntity.ok("Moedas adicionadas com sucesso");
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PatchMapping("/{id}/debitar-moedas")
    public ResponseEntity<String> debitarMoedas(@PathVariable Long id, 
                                               @RequestParam double quantidade) {
        if (quantidade <= 0) {
            return ResponseEntity.badRequest().body("A quantidade deve ser positiva");
        }
        
        boolean sucesso = alunoService.debitarMoedas(id, quantidade);
        
        if (sucesso) {
            return ResponseEntity.ok("Moedas debitadas com sucesso");
        } else {
            return ResponseEntity.badRequest().body("Saldo insuficiente ou aluno não encontrado");
        }
    }
}