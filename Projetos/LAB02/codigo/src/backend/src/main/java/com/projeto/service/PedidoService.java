package com.projeto.service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import com.projeto.model.Automovel;
import com.projeto.model.Pedido;
import com.projeto.model.Usuario;
import com.projeto.repository.AutomovelRepository;
import com.projeto.repository.PedidoRepository;
import com.projeto.repository.UsuarioRepository;

@Service
public class PedidoService {

    private static final Logger log = LoggerFactory.getLogger(PedidoService.class);

    @Autowired
    private PedidoRepository pedidoRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private AutomovelRepository automovelRepository;

    @Autowired
    private Environment env;

    @Transactional
    public Pedido salvar(Pedido pedido) {
        boolean isDev = java.util.Arrays.asList(env.getActiveProfiles()).contains("dev");

    log.debug("[PedidoService] Recebido para salvar: clienteId={}, automovelId={}, status={}, data={}",
        pedido.getCliente()!=null?pedido.getCliente().getId():null,
        pedido.getAutomovel()!=null?pedido.getAutomovel().getId():null,
        pedido.getStatus(), pedido.getDataPedido());

    // Resolve cliente (FK) if only id was provided
        if (pedido.getCliente() != null && pedido.getCliente().getId() != null) {
            Long clienteId = pedido.getCliente().getId();
            Usuario cliente = usuarioRepository.findById(clienteId).orElse(null);
            if (cliente == null) {
                if (isDev) {
                    // fallback to any existing or create mock
                    cliente = usuarioRepository.findAll().stream().findFirst().orElseGet(() -> {
                        Usuario u = new Usuario();
                        u.setNome("Cliente Mock");
                        u.setCpf("00000000000");
                        u.setRg("MG-00");
                        u.setEndereco("Rua Dev, 123");
                        u.setProfissao("Teste");
                        u.setSenha("123456");
                        u.setTipoUsuario(Usuario.TipoUsuario.Cliente);
                        return usuarioRepository.save(u);
                    });
                } else {
                    throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Cliente não encontrado: id=" + clienteId);
                }
            }
            pedido.setCliente(cliente);
        }

        // Resolve automovel (FK) if only id was provided
        if (pedido.getAutomovel() != null && pedido.getAutomovel().getId() != null) {
            Long automovelId = pedido.getAutomovel().getId();
            Automovel automovel = automovelRepository.findById(automovelId).orElse(null);
            if (automovel == null) {
                if (isDev) {
                    automovel = automovelRepository.findAll().stream().findFirst().orElse(null);
                } else {
                    throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Automóvel não encontrado: id=" + automovelId);
                }
            }
            pedido.setAutomovel(automovel);
        }

        // Defaults
        if (pedido.getStatus() == null) {
            pedido.setStatus(Pedido.StatusPedido.Em_analise);
        }
        if (pedido.getDataPedido() == null) {
            pedido.setDataPedido(new Date());
        }

        Pedido salvo = pedidoRepository.save(pedido);
        log.debug("[PedidoService] Pedido salvo id={} status={} data={}", salvo.getId(), salvo.getStatus(), salvo.getDataPedido());
        return salvo;
    }

    public List<Pedido> listarTodos() {
        List<Pedido> todos = pedidoRepository.findAll();
        log.debug("[PedidoService] listarTodos retornou {} registros", todos.size());
        return todos;
    }

    public Optional<Pedido> buscarPorId(Long id) {
        return pedidoRepository.findById(id);
    }

    public Optional<Pedido> atualizar(Long id, Pedido pedidoAtualizado) {
        return pedidoRepository.findById(id)
            .map(pedidoExistente -> {
                pedidoExistente.setAutomovel(pedidoAtualizado.getAutomovel());
                pedidoExistente.setStatus(pedidoAtualizado.getStatus());
                return pedidoRepository.save(pedidoExistente);
            });
    }

    public boolean deletar(Long id) {
        if (pedidoRepository.existsById(id)) {
            pedidoRepository.deleteById(id);
            return true;
        }
        return false;
    }
}