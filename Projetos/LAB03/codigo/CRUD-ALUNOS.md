# CRUD de Alunos - LAB03

## 📋 Funcionalidades Implementadas

### ✅ CRUD Completo para Alunos
- **CREATE**: Criar novo aluno com validações
- **READ**: Listar todos os alunos e buscar por ID
- **UPDATE**: Atualizar dados do aluno
- **DELETE**: Remover aluno do sistema

### ✅ Funcionalidades Extras
- **Adicionar Moedas**: Endpoint para adicionar moedas ao saldo do aluno
- **Debitar Moedas**: Endpoint para debitar moedas do saldo do aluno
- **Validações**: Validação de dados de entrada e unicidade
- **Tratamento de Erros**: Handler global para exceções

## 🏗️ Arquitetura Implementada

```
src/main/java/com/projeto/
├── controller/
│   ├── AlunoController.java        # Endpoints REST
│   └── HomeController.java
├── service/
│   └── AlunoService.java           # Lógica de negócio
├── repository/
│   ├── AlunoRepository.java        # Acesso a dados (métodos customizados)
│   └── InstituicaoEnsinoRepository.java
├── model/
│   ├── Aluno.java                  # Entidade JPA
│   ├── Usuario.java                # Classe base
│   └── InstituicaoEnsino.java
├── dto/
│   ├── AlunoRequestDTO.java        # DTO para entrada
│   └── AlunoResponseDTO.java       # DTO para resposta
├── exception/
│   └── GlobalExceptionHandler.java # Tratamento global de erros
├── config/
│   └── DataLoader.java             # Dados de exemplo
└── Application.java
```

## 🚀 Como Executar

### 1. Pré-requisitos
- Java 17+
- PostgreSQL rodando na porta 5432
- Banco de dados `lab03bd` criado

### 2. Configuração do Banco
```sql
CREATE DATABASE lab03bd;
```

### 3. Executar a Aplicação
```bash
cd codigo/src/backend
./mvnw spring-boot:run
```

### 4. Testar os Endpoints
Use o arquivo `aluno-api-test.http` no VS Code ou qualquer cliente HTTP.

## 📡 Endpoints da API

### Base URL: `http://localhost:8080/api/alunos`

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/` | Listar todos os alunos |
| GET | `/{id}` | Buscar aluno por ID |
| POST | `/` | Criar novo aluno |
| PUT | `/{id}` | Atualizar aluno |
| DELETE | `/{id}` | Deletar aluno |
| PATCH | `/{id}/adicionar-moedas?quantidade={valor}` | Adicionar moedas |
| PATCH | `/{id}/debitar-moedas?quantidade={valor}` | Debitar moedas |

## 📝 Exemplo de Uso

### Criar Aluno
```http
POST /api/alunos
Content-Type: application/json

{
  "nome": "João Silva",
  "documento": "12345678901",
  "email": "joao@email.com",
  "login": "joao.silva",
  "senha": "senha123",
  "rg": "MG-12345678",
  "endereco": "Rua das Flores, 123",
  "curso": "Ciência da Computação",
  "saldoMoedas": 100.0,
  "instituicaoId": 1
}
```

### Resposta de Sucesso
```json
{
  "id": 1,
  "nome": "João Silva",
  "documento": "12345678901",
  "email": "joao@email.com",
  "login": "joao.silva",
  "rg": "MG-12345678",
  "endereco": "Rua das Flores, 123",
  "curso": "Ciência da Computação",
  "saldoMoedas": 100.0,
  "instituicaoNome": "PUC Minas",
  "instituicaoId": 1
}
```

## ✅ Validações Implementadas

### Campos Obrigatórios
- `nome`: Não pode estar vazio
- `documento`: Não pode estar vazio (deve ser único)
- `email`: Formato válido e não pode estar vazio (deve ser único)
- `login`: Não pode estar vazio (deve ser único)
- `senha`: Não pode estar vazia
- `rg`: Não pode estar vazio
- `endereco`: Não pode estar vazio
- `curso`: Não pode estar vazio
- `saldoMoedas`: Deve ser positivo ou zero
- `instituicaoId`: Deve referenciar uma instituição existente

### Regras de Negócio
- Email, login e documento devem ser únicos
- Não é possível debitar moedas se o saldo for insuficiente
- Instituição deve existir antes de associar a um aluno

## 🛠️ Tecnologias Utilizadas

- **Spring Boot 3.5.5**
- **Java 17**
- **Spring Data JPA** (Persistência)
- **Spring Web** (REST API)
- **Spring Validation** (Validações)
- **PostgreSQL** (Banco de dados)
- **H2** (Testes/Desenvolvimento alternativo)

## 📊 Dados de Exemplo

O sistema carrega automaticamente dados de exemplo:

### Instituições
1. PUC Minas
2. UFMG  
3. FUMEC

### Alunos
1. João Silva (PUC Minas) - 100 moedas
2. Maria Santos (UFMG) - 50 moedas

## 🔍 Próximos Passos

Para continuar o desenvolvimento, considere implementar:
- CRUD para Professor
- CRUD para EmpresaParceira
- CRUD para Vantagem
- Sistema de autenticação e autorização
- Criptografia de senhas
- Testes unitários e de integração
- Frontend para consumir a API