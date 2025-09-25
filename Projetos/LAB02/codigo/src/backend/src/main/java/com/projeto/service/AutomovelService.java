package com.projeto.service;

import com.projeto.model.Automovel;
import com.projeto.repository.AutomovelRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AutomovelService {

    @Autowired
    private AutomovelRepository automovelRepository;

    public Automovel salvar(Automovel automovel) {
        return automovelRepository.save(automovel);
    }

    public List<Automovel> listarTodos() {
        return automovelRepository.findAll();
    }

    public Optional<Automovel> buscarPorId(Long id) {
        return automovelRepository.findById(id);
    }

    public Optional<Automovel> atualizar(Long id, Automovel automovelAtualizado) {
        return automovelRepository.findById(id)
            .map(automovelExistente -> {
                automovelExistente.setPlaca(automovelAtualizado.getPlaca());
                automovelExistente.setMatricula(automovelAtualizado.getMatricula());
                automovelExistente.setAno(automovelAtualizado.getAno());
                automovelExistente.setMarca(automovelAtualizado.getMarca());
                automovelExistente.setModelo(automovelAtualizado.getModelo());
                automovelExistente.setProprietario(automovelAtualizado.getProprietario());
                return automovelRepository.save(automovelExistente);
            });
    }

    public boolean deletar(Long id) {
        if (automovelRepository.existsById(id)) {
            automovelRepository.deleteById(id);
            return true;
        }
        return false;
    }
}