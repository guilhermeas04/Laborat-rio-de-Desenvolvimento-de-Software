package com.projeto.service;

import com.projeto.dto.EmpresaParceiraRequestDTO;
import com.projeto.dto.EmpresaParceiraResponseDTO;
import com.projeto.model.EmpresaParceira;
import com.projeto.repository.EmpresaParceiraRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class EmpresaParceiraService {

    @Autowired
    private EmpresaParceiraRepository empresaRepository;

    public List<EmpresaParceiraResponseDTO> listarTodos() {
        List<EmpresaParceira> empresas = empresaRepository.findAll();
        return empresas.stream().map(this::toResponseDTO).collect(Collectors.toList());
    }

    public Optional<EmpresaParceiraResponseDTO> buscarPorId(Long id) {
        return empresaRepository.findById(id).map(this::toResponseDTO);
    }

    @Transactional
    public EmpresaParceiraResponseDTO criar(EmpresaParceiraRequestDTO dto) {
        EmpresaParceira empresa = new EmpresaParceira(
                dto.getNome(), dto.getDocumento(), dto.getEmail(), dto.getLogin(), dto.getSenha(),
                dto.getNomeFantasia(), dto.getCnpj()
        );
        EmpresaParceira salvo = empresaRepository.save(empresa);
        return toResponseDTO(salvo);
    }

    @Transactional
    public Optional<EmpresaParceiraResponseDTO> atualizar(Long id, EmpresaParceiraRequestDTO dto) {
        Optional<EmpresaParceira> opt = empresaRepository.findById(id);
        if (opt.isPresent()) {
            EmpresaParceira e = opt.get();
            e.setNome(dto.getNome());
            e.setDocumento(dto.getDocumento());
            e.setEmail(dto.getEmail());
            e.setLogin(dto.getLogin());
            e.setSenha(dto.getSenha());
            e.setNomeFantasia(dto.getNomeFantasia());
            e.setCnpj(dto.getCnpj());
            EmpresaParceira atualizado = empresaRepository.save(e);
            return Optional.of(toResponseDTO(atualizado));
        }
        return Optional.empty();
    }

    @Transactional
    public boolean deletar(Long id) {
        if (empresaRepository.existsById(id)) {
            empresaRepository.deleteById(id);
            return true;
        }
        return false;
    }

    private EmpresaParceiraResponseDTO toResponseDTO(EmpresaParceira e) {
        return new EmpresaParceiraResponseDTO(
                e.getId(), e.getNome(), e.getDocumento(), e.getEmail(), e.getLogin(), e.getNomeFantasia(), e.getCnpj()
        );
    }
}
