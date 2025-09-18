package com.projeto.service;

import com.projeto.model.Rendimento;
import com.projeto.repository.RendimentoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RendimentoService {

    @Autowired
    private RendimentoRepository rendimentoRepository;

    public Rendimento salvar(Rendimento rendimento) {
        return rendimentoRepository.save(rendimento);
    }

    public List<Rendimento> listarTodos() {
        return rendimentoRepository.findAll();
    }

    public Optional<Rendimento> buscarPorId(Long id) {
        return rendimentoRepository.findById(id);
    }

    public Optional<Rendimento> atualizar(Long id, Rendimento rendimentoAtualizado) {
        if (rendimentoRepository.existsById(id)) {
            rendimentoAtualizado.setId(id);
            return Optional.of(rendimentoRepository.save(rendimentoAtualizado));
        }
        return Optional.empty();
    }

    public boolean deletar(Long id) {
        if (rendimentoRepository.existsById(id)) {
            rendimentoRepository.deleteById(id);
            return true;
        }
        return false;
    }
}