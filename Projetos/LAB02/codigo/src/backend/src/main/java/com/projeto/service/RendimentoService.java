package com.projeto.service;

import com.projeto.model.Rendimento;
import com.projeto.model.Usuario;
import com.projeto.repository.UsuarioRepository;
import com.projeto.repository.RendimentoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RendimentoService {

    @Autowired
    private RendimentoRepository rendimentoRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    public Rendimento salvar(Rendimento rendimento) {
        // Se veio apenas o ID do usuário, carregar entidade gerenciada para evitar TransientPropertyValueException
        if (rendimento.getUsuario() != null && rendimento.getUsuario().getId() != null) {
            Long uid = rendimento.getUsuario().getId();
            Usuario managed = usuarioRepository.findById(uid)
                .orElseThrow(() -> new IllegalArgumentException("Usuario associado ao rendimento não encontrado: id=" + uid));
            rendimento.setUsuario(managed);
        }
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
            if (rendimentoAtualizado.getUsuario() != null && rendimentoAtualizado.getUsuario().getId() != null) {
                Long uid = rendimentoAtualizado.getUsuario().getId();
                Usuario managed = usuarioRepository.findById(uid)
                        .orElseThrow(() -> new IllegalArgumentException("Usuario associado ao rendimento não encontrado: id=" + uid));
                rendimentoAtualizado.setUsuario(managed);
            }
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