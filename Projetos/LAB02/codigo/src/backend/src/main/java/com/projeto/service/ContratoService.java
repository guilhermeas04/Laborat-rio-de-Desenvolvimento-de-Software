package com.projeto.service;

import com.projeto.model.Contrato;
import com.projeto.repository.ContratoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ContratoService {

    @Autowired
    private ContratoRepository contratoRepository;

    public Contrato salvar(Contrato contrato) {
        return contratoRepository.save(contrato);
    }

    public List<Contrato> listarTodos() {
        return contratoRepository.findAll();
    }

    public Optional<Contrato> buscarPorId(Long id) {
        return contratoRepository.findById(id);
    }

    public Optional<Contrato> atualizar(Long id, Contrato contratoAtualizado) {
        return contratoRepository.findById(id)
            .map(contratoExistente -> {
                contratoExistente.setPedido(contratoAtualizado.getPedido());
                contratoExistente.setTipoContrato(contratoAtualizado.getTipoContrato());
                contratoExistente.setValor(contratoAtualizado.getValor());
                contratoExistente.setDataInicio(contratoAtualizado.getDataInicio());
                contratoExistente.setDataFim(contratoAtualizado.getDataFim());
                contratoExistente.setAutomovel(contratoAtualizado.getAutomovel());
                return contratoRepository.save(contratoExistente);
            });
    }

    public boolean deletar(Long id) {
        if (contratoRepository.existsById(id)) {
            contratoRepository.deleteById(id);
            return true;
        }
        return false;
    }
}