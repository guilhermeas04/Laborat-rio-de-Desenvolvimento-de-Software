package com.projeto.config;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;

import com.projeto.model.Automovel;
import com.projeto.model.Usuario;
import com.projeto.repository.AutomovelRepository;
import com.projeto.repository.UsuarioRepository;

@Configuration
@Profile("dev")
public class DevDataLoader {

    private static final Logger log = LoggerFactory.getLogger(DevDataLoader.class);

    @Bean
    CommandLineRunner seedDevData(UsuarioRepository usuarioRepository, AutomovelRepository automovelRepository) {
        return args -> {
            // Seed a sample Cliente user if none exists
            Usuario cliente = usuarioRepository.findAll().stream()
                    .filter(u -> u.getTipoUsuario() == Usuario.TipoUsuario.Cliente)
                    .findFirst()
                    .orElseGet(() -> {
                        Usuario u = new Usuario();
                        u.setNome("Cliente Mock");
                        u.setCpf("00000000000");
                        u.setRg("MG-00");
                        u.setEndereco("Rua Dev, 123");
                        u.setProfissao("Teste");
                        u.setSenha("123456");
                        u.setTipoUsuario(Usuario.TipoUsuario.Cliente);
                        Usuario saved = usuarioRepository.save(u);
                        log.info("[DEV] Seeded Cliente id={} cpf={}", saved.getId(), saved.getCpf());
                        return saved;
                    });

            // Seed a sample Automovel owned by the cliente if none exists
            Automovel automovel = automovelRepository.findAll().stream().findFirst().orElseGet(() -> {
                Automovel a = new Automovel();
                a.setPlaca("ABC-1234");
                a.setMatricula("MAT-001");
                a.setAno(2022);
                a.setMarca("Toyota");
                a.setModelo("Corolla");
                a.setProprietario(cliente);
                Automovel saved = automovelRepository.save(a);
                log.info("[DEV] Seeded Automovel id={} placa={}", saved.getId(), saved.getPlaca());
                return saved;
            });

            log.info("[DEV] Ready. Sample Cliente id={} and Automovel id={} available.", cliente.getId(), automovel.getId());
        };
    }
}
