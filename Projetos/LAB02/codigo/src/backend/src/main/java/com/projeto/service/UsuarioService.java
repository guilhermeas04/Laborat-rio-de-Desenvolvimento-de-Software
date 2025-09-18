package com.projeto.service;

import com.projeto.model.Usuario;
import com.projeto.model.Rendimento;
import com.projeto.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private RendimentoService rendimentoService;

    public List<Usuario> listarTodos() {
        return usuarioRepository.findAll();
    }

    public Optional<Usuario> buscarPorId(Long id) {
        return usuarioRepository.findById(id);
    }

    public Optional<Usuario> buscarPorCpfESenha(String cpf, String senha) {
        return usuarioRepository.findByCpfAndSenha(cpf, senha);
    }

    public Usuario salvar(Usuario usuario) {
        return usuarioRepository.save(usuario);
    }

    // New method to handle updates
    public Optional<Usuario> atualizar(Long id, Usuario usuarioAtualizado) {
        return usuarioRepository.findById(id)
            .map(usuarioExistente -> {
                usuarioExistente.setNome(usuarioAtualizado.getNome());
                usuarioExistente.setCpf(usuarioAtualizado.getCpf());
                usuarioExistente.setRg(usuarioAtualizado.getRg());
                usuarioExistente.setEndereco(usuarioAtualizado.getEndereco());
                usuarioExistente.setProfissao(usuarioAtualizado.getProfissao());
                usuarioExistente.setSenha(usuarioAtualizado.getSenha());
                usuarioExistente.setTipoUsuario(usuarioAtualizado.getTipoUsuario());
                
                // Note: The rendimentos list will be updated in the new 'adicionarRendimento' method.
                // It's generally not good practice to update collections via the main update method.
                
                return Optional.of(usuarioRepository.save(usuarioExistente));
            })
            .orElse(Optional.empty());
    }

    // New method for deletion
    @Transactional
    public boolean deletar(Long id) {
        if (usuarioRepository.existsById(id)) {
            usuarioRepository.deleteById(id);
            return true;
        }
        return false;
    }

    // New method to manage rendimentos for a user
    @Transactional
    public Usuario adicionarRendimento(Long usuarioId, Rendimento rendimento) {
        Optional<Usuario> usuarioOptional = usuarioRepository.findById(usuarioId);
        if (usuarioOptional.isPresent()) {
            Usuario usuario = usuarioOptional.get();

            if (usuario.getTipoUsuario() == Usuario.TipoUsuario.Cliente && usuario.getRendimentos().size() >= 3) {
                throw new IllegalStateException("O cliente já atingiu o limite máximo de 3 rendimentos.");
            }

            // Associate the rendimento with the user and save it.
            rendimento.setUsuario(usuario);
            rendimentoService.salvar(rendimento);

            // Add the new rendimento to the user's list and save the user.
            usuario.getRendimentos().add(rendimento);
            return usuarioRepository.save(usuario);
        }
        return null; // User not found
    }
}