package com.projeto.service;

import com.projeto.model.Agente;
import com.projeto.repository.AgenteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AgenteService {

    @Autowired
    private AgenteRepository agenteRepository;

    public Agente salvar(Agente agente) {
        return agenteRepository.save(agente);
    }

    public List<Agente> listarTodos() {
        return agenteRepository.findAll();
    }

    public Optional<Agente> buscarPorId(Long id) {
        return agenteRepository.findById(id);
    }

    public Optional<Agente> atualizar(Long id, Agente agenteAtualizado) {
        return agenteRepository.findById(id)
            .map(agenteExistente -> {
                agenteExistente.setNomeAgente(agenteAtualizado.getNomeAgente());
                agenteExistente.setTipoAgente(agenteAtualizado.getTipoAgente());
                return agenteRepository.save(agenteExistente);
            });
    }

    public boolean deletar(Long id) {
        if (agenteRepository.existsById(id)) {
            agenteRepository.deleteById(id);
            return true;
        }
        return false;
    }
}