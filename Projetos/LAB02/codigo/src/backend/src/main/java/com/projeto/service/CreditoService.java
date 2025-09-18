package com.projeto.service;

import com.projeto.model.Credito;
import com.projeto.repository.CreditoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CreditoService {

    @Autowired
    private CreditoRepository creditoRepository;

    public Credito salvar(Credito credito) {
        return creditoRepository.save(credito);
    }

    public List<Credito> listarTodos() {
        return creditoRepository.findAll();
    }

    public Optional<Credito> buscarPorId(Long id) {
        return creditoRepository.findById(id);
    }

    public Optional<Credito> atualizar(Long id, Credito creditoAtualizado) {
        return creditoRepository.findById(id)
            .map(creditoExistente -> {
                creditoExistente.setBanco(creditoAtualizado.getBanco());
                creditoExistente.setValorAprovado(creditoAtualizado.getValorAprovado());
                creditoExistente.setPrazoPagamento(creditoAtualizado.getPrazoPagamento());
                creditoExistente.setTaxaJuros(creditoAtualizado.getTaxaJuros());
                return creditoRepository.save(creditoExistente);
            });
    }

    public boolean deletar(Long id) {
        if (creditoRepository.existsById(id)) {
            creditoRepository.deleteById(id);
            return true;
        }
        return false;
    }
}