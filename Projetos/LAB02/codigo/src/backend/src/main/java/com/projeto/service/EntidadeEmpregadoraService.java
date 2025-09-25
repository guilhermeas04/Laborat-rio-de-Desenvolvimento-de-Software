package com.projeto.service;

import com.projeto.model.EntidadeEmpregadora;
import com.projeto.repository.EntidadeEmpregadoraRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EntidadeEmpregadoraService {

    @Autowired
    private EntidadeEmpregadoraRepository entidadeEmpregadoraRepository;

    public EntidadeEmpregadora salvar(EntidadeEmpregadora entidadeEmpregadora) {
        return entidadeEmpregadoraRepository.save(entidadeEmpregadora);
    }

    public List<EntidadeEmpregadora> listarTodos() {
        return entidadeEmpregadoraRepository.findAll();
    }

    public Optional<EntidadeEmpregadora> buscarPorId(Long id) {
        return entidadeEmpregadoraRepository.findById(id);
    }

    public Optional<EntidadeEmpregadora> atualizar(Long id, EntidadeEmpregadora entidadeEmpregadoraAtualizada) {
        return entidadeEmpregadoraRepository.findById(id)
            .map(entidadeExistente -> {
                entidadeExistente.setNome(entidadeEmpregadoraAtualizada.getNome());
                entidadeExistente.setClientes(entidadeEmpregadoraAtualizada.getClientes());
                return entidadeEmpregadoraRepository.save(entidadeExistente);
            });
    }

    public boolean deletar(Long id) {
        if (entidadeEmpregadoraRepository.existsById(id)) {
            entidadeEmpregadoraRepository.deleteById(id);
            return true;
        }
        return false;
    }
}