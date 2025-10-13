package com.projeto.service;

import com.projeto.dto.AlunoRequestDTO;
import com.projeto.dto.AlunoResponseDTO;
import com.projeto.model.Aluno;
import com.projeto.model.InstituicaoEnsino;
import com.projeto.repository.AlunoRepository;
import com.projeto.repository.InstituicaoEnsinoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class AlunoService {

    @Autowired
    private AlunoRepository alunoRepository;

    @Autowired
    private InstituicaoEnsinoRepository instituicaoRepository;

    public List<AlunoResponseDTO> listarTodos() {
        List<Aluno> alunos = alunoRepository.findAll();
        return alunos.stream()
                .map(this::converterParaResponseDTO)
                .collect(Collectors.toList());
    }

    public Optional<AlunoResponseDTO> buscarPorId(Long id) {
        Optional<Aluno> aluno = alunoRepository.findById(id);
        return aluno.map(this::converterParaResponseDTO);
    }

    @Transactional
    public AlunoResponseDTO criar(AlunoRequestDTO requestDTO) {
        // Validações de unicidade
        if (alunoRepository.existsByEmail(requestDTO.getEmail())) {
            throw new RuntimeException("Já existe um aluno com este email: " + requestDTO.getEmail());
        }
        
        if (alunoRepository.existsByLogin(requestDTO.getLogin())) {
            throw new RuntimeException("Já existe um aluno com este login: " + requestDTO.getLogin());
        }
        
        if (alunoRepository.existsByDocumento(requestDTO.getDocumento())) {
            throw new RuntimeException("Já existe um aluno com este documento: " + requestDTO.getDocumento());
        }

        // Verificar se a instituição existe
        InstituicaoEnsino instituicao = instituicaoRepository.findById(requestDTO.getInstituicaoId())
                .orElseThrow(() -> new com.projeto.exception.NotFoundException("Instituição não encontrada com ID: " + requestDTO.getInstituicaoId()));

        // Criar nova entidade Aluno
        Aluno aluno = new Aluno(
                requestDTO.getNome(),
                requestDTO.getDocumento(),
                requestDTO.getEmail(),
                requestDTO.getLogin(),
                requestDTO.getSenha(),
                requestDTO.getRg(),
                requestDTO.getEndereco(),
                requestDTO.getCurso(),
                requestDTO.getSaldoMoedas(),
                instituicao
        );

        Aluno alunoSalvo = alunoRepository.save(aluno);
        return converterParaResponseDTO(alunoSalvo);
    }

    @Transactional
    public Optional<AlunoResponseDTO> atualizar(Long id, AlunoRequestDTO requestDTO) {
        Optional<Aluno> alunoExistente = alunoRepository.findById(id);
        
        if (alunoExistente.isPresent()) {
            Aluno aluno = alunoExistente.get();
            
            // Verificar se a instituição existe
            InstituicaoEnsino instituicao = instituicaoRepository.findById(requestDTO.getInstituicaoId())
                        .orElseThrow(() -> new com.projeto.exception.NotFoundException("Instituição não encontrada com ID: " + requestDTO.getInstituicaoId()));

            // Atualizar campos
            aluno.setNome(requestDTO.getNome());
            aluno.setDocumento(requestDTO.getDocumento());
            aluno.setEmail(requestDTO.getEmail());
            aluno.setLogin(requestDTO.getLogin());
            aluno.setSenha(requestDTO.getSenha());
            aluno.setRg(requestDTO.getRg());
            aluno.setEndereco(requestDTO.getEndereco());
            aluno.setCurso(requestDTO.getCurso());
            aluno.setSaldoMoedas(requestDTO.getSaldoMoedas());
            aluno.setInstituicao(instituicao);

            Aluno alunoAtualizado = alunoRepository.save(aluno);
            return Optional.of(converterParaResponseDTO(alunoAtualizado));
        }
        
        return Optional.empty();
    }

    @Transactional
    public boolean deletar(Long id) {
        if (alunoRepository.existsById(id)) {
            alunoRepository.deleteById(id);
            return true;
        }
        return false;
    }

    @Transactional
    public boolean adicionarMoedas(Long alunoId, double quantidade) {
        Optional<Aluno> alunoOpt = alunoRepository.findById(alunoId);
        if (alunoOpt.isPresent()) {
            Aluno aluno = alunoOpt.get();
            aluno.setSaldoMoedas(aluno.getSaldoMoedas() + quantidade);
            alunoRepository.save(aluno);
            return true;
        }
        return false;
    }

    @Transactional
    public boolean debitarMoedas(Long alunoId, double quantidade) {
        Optional<Aluno> alunoOpt = alunoRepository.findById(alunoId);
        if (alunoOpt.isPresent()) {
            Aluno aluno = alunoOpt.get();
            if (aluno.getSaldoMoedas() >= quantidade) {
                aluno.setSaldoMoedas(aluno.getSaldoMoedas() - quantidade);
                alunoRepository.save(aluno);
                return true;
            }
        }
        return false;
    }

    private AlunoResponseDTO converterParaResponseDTO(Aluno aluno) {
        return new AlunoResponseDTO(
                aluno.getId(),
                aluno.getNome(),
                aluno.getDocumento(),
                aluno.getEmail(),
                aluno.getLogin(),
                aluno.getRg(),
                aluno.getEndereco(),
                aluno.getCurso(),
                aluno.getSaldoMoedas(),
                aluno.getInstituicao() != null ? aluno.getInstituicao().getNome() : null,
                aluno.getInstituicao() != null ? aluno.getInstituicao().getId() : null
        );
    }
}