package com.projeto.service;

import com.projeto.model.Cliente;
import com.projeto.repository.ClienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ClienteService {

    @Autowired
    private ClienteRepository clienteRepository;

    public Cliente salvar(Cliente cliente) {
        return clienteRepository.save(cliente);
    }

    public List<Cliente> listarTodos() {
        return clienteRepository.findAll();
    }

    public Optional<Cliente> buscarPorId(Long id) {
        return clienteRepository.findById(id);
    }

    public Optional<Cliente> atualizar(Long id, Cliente clienteAtualizado) {
        return clienteRepository.findById(id)
            .map(clienteExistente -> {
                clienteExistente.setNome(clienteAtualizado.getNome());
                clienteExistente.setCpf(clienteAtualizado.getCpf());
                clienteExistente.setRg(clienteAtualizado.getRg());
                clienteExistente.setEndereco(clienteAtualizado.getEndereco());
                clienteExistente.setProfissao(clienteAtualizado.getProfissao());
                clienteExistente.setSenha(clienteAtualizado.getSenha());
                clienteExistente.setTipoUsuario(clienteAtualizado.getTipoUsuario());
                clienteExistente.setEmpregadoras(clienteAtualizado.getEmpregadoras());
                return clienteRepository.save(clienteExistente);
            });
    }

    public boolean deletar(Long id) {
        if (clienteRepository.existsById(id)) {
            clienteRepository.deleteById(id);
            return true;
        }
        return false;
    }
}