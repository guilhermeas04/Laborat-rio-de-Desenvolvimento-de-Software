package com.projeto.config;

import com.projeto.model.InstituicaoEnsino;
import com.projeto.model.Aluno;
import com.projeto.repository.InstituicaoEnsinoRepository;
import com.projeto.repository.AlunoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataLoader implements CommandLineRunner {

    @Autowired
    private InstituicaoEnsinoRepository instituicaoRepository;

    @Autowired
    private AlunoRepository alunoRepository;

    @Override
    public void run(String... args) throws Exception {
        // Criar instituições de exemplo se não existirem
        if (instituicaoRepository.count() == 0) {
            InstituicaoEnsino pucMinas = new InstituicaoEnsino("PUC Minas");
            InstituicaoEnsino ufmg = new InstituicaoEnsino("UFMG");
            InstituicaoEnsino fumec = new InstituicaoEnsino("FUMEC");
            
            instituicaoRepository.save(pucMinas);
            instituicaoRepository.save(ufmg);
            instituicaoRepository.save(fumec);

            // Criar alguns alunos de exemplo
            Aluno aluno1 = new Aluno(
                "João Silva",
                "12345678901",
                "joao.silva@email.com",
                "joao.silva",
                "senha123",
                "MG-12345678",
                "Rua das Flores, 123",
                "Ciência da Computação",
                100.0,
                pucMinas
            );

            Aluno aluno2 = new Aluno(
                "Maria Santos",
                "98765432109",
                "maria.santos@email.com",
                "maria.santos",
                "senha456",
                "MG-87654321",
                "Av. Principal, 456",
                "Engenharia de Software",
                50.0,
                ufmg
            );

            alunoRepository.save(aluno1);
            alunoRepository.save(aluno2);

            System.out.println("Dados de exemplo carregados!");
        }
    }
}