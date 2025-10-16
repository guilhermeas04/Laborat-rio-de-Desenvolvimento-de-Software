package com.projeto.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.projeto.dto.LoginRequestDTO;
import com.projeto.dto.LoginResponseDTO;
import com.projeto.model.Aluno;
import com.projeto.model.EmpresaParceira;
import com.projeto.model.Professor;
import com.projeto.model.Usuario;
import com.projeto.repository.UsuarioRepository;

@Service
public class AuthService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    public LoginResponseDTO login(LoginRequestDTO loginRequest) {
        Optional<Usuario> usuarioOpt = usuarioRepository.findByLoginAndSenha(
            loginRequest.getLogin(), 
            loginRequest.getSenha()
        );

        if (usuarioOpt.isEmpty()) {
            throw new RuntimeException("Login ou senha inválidos");
        }

        Usuario usuario = usuarioOpt.get();
        String tipo = determinarTipoUsuario(usuario);

        return new LoginResponseDTO(
            usuario.getId(),
            usuario.getNome(),
            usuario.getEmail(),
            usuario.getLogin(),
            tipo
        );
    }

    private String determinarTipoUsuario(Usuario usuario) {
        if (usuario instanceof Aluno) {
            return "aluno";
        } else if (usuario instanceof Professor) {
            return "professor";
        } else if (usuario instanceof EmpresaParceira) {
            return "empresa";
        }
        return "unknown";
    }
}
