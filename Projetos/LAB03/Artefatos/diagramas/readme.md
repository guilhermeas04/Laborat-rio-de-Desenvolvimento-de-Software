
# 💰 Sistema de Moeda Estudantil (Release 1)

## 📘 Descrição do Projeto

O **Sistema de Moeda Estudantil** tem como objetivo **estimular o reconhecimento do mérito estudantil** por meio de uma **moeda virtual**.  
Professores podem conceder moedas aos alunos como forma de reconhecimento por bom comportamento, desempenho e participação em aula.  
Essas moedas podem ser trocadas pelos alunos por **produtos ou descontos** oferecidos por **empresas parceiras**.

O projeto foi desenvolvido na disciplina **Laboratório de Desenvolvimento de Software**, sob orientação do professor **João Paulo Carneiro Aramuni**, no curso de **Engenharia de Software**.

---

## 🎯 Objetivos

- Reconhecer o mérito dos estudantes por meio de uma moeda digital.  
- Permitir que professores distribuam moedas aos alunos.  
- Viabilizar parcerias com empresas que ofereçam vantagens e recompensas.  
- Implementar autenticação e controle de saldo de moedas.  
- Aplicar arquitetura **MVC (Model-View-Controller)** no desenvolvimento.

---

## 👥 Atores do Sistema

### 🧑‍🎓 Aluno
- Realiza cadastro (nome, email, CPF, RG, endereço, instituição e curso).  
- Recebe moedas dos professores.  
- Visualiza extrato de transações.  
- Troca moedas por vantagens cadastradas.  
- Recebe notificações por email ao ganhar moedas ou resgatar vantagens.

### 👨‍🏫 Professor
- Pré-cadastrado pela instituição (nome, CPF, departamento, instituição).  
- Recebe **1.000 moedas por semestre** (acumulativas).  
- Envia moedas aos alunos, informando motivo do reconhecimento.  
- Visualiza extrato de envios.  

### 🏢 Empresa Parceira
- Realiza cadastro no sistema.  
- Cadastra vantagens (descrição, custo em moedas, foto).  
- Recebe notificação por email a cada resgate realizado.

---

## 🔐 Autenticação

Todos os tipos de usuário (aluno, professor e empresa) possuem **login e senha**.  
O acesso ao sistema requer **autenticação obrigatória**.

---

## ✉️ Notificações por Email

- **Alunos**: recebem emails ao ganhar moedas e ao resgatar vantagens.  
- **Empresas**: recebem emails com o código do cupom a ser conferido.  
- **Cupom digital**: contém código de verificação único gerado pelo sistema.

---

## 🧩 Requisitos Funcionais

1. Cadastro de alunos e autenticação.  
2. Cadastro de empresas e suas vantagens.  
3. Envio de moedas por professores.  
4. Consulta de extrato por alunos e professores.  
5. Resgate de vantagens e envio de cupons por email.  
6. Persistência de dados (ORM/DAO).  
7. Interface para CRUD de aluno e empresa.

---

## 🏗️ Arquitetura e Tecnologias

O sistema deve seguir o padrão **MVC** e contemplar:  
- **Modelagem UML**:  
  - Casos de Uso  
  - Histórias do Usuário  
  - Diagrama de Classes  
  - Diagrama de Componentes  
- **Camada de Persistência**: modelo ER e integração via ORM/DAO.  
- **CRUDs**: aluno e empresa parceira (versões inicial e final).  
- **Banco de Dados**: pode ser relacional (MySQL, PostgreSQL, H2 etc.).

---

## 🧱 Estrutura de Desenvolvimento

### 🧩 Sprint 01 — Modelagem
- Casos de Uso  
- Histórias do Usuário  
- Diagrama de Classes  
- Diagrama de Componentes  

### 💾 Sprint 02 — Banco de Dados e CRUDs Iniciais
- Modelo ER  
- Estratégia de persistência (ORM / DAO)  
- CRUDs iniciais: aluno e empresa  

### ⚙️ Sprint 03 — Integração e Apresentação
- CRUDs finais  
- Camada de persistência  
- Apresentação da arquitetura  
- Tutorial das tecnologias utilizadas  

---

## 🧮 Avaliação

| Critério | Descrição |
|-----------|------------|
| **Adequação aos requisitos** | O sistema deve atender fielmente às especificações. |
| **Alinhamento modelo-código** | O código deve refletir a modelagem UML e a arquitetura definida. |
| **Atualizações de modelo** | Modelos devem ser ajustados conforme a evolução do projeto. |
| **Apresentação** | Protótipo funcional e tutorial técnico das tecnologias utilizadas. |

> 💡 **Pontuação total:** 20 pontos  
> 📉 **Penalidade:** -1 ponto por dia de atraso  
> 🚫 **Ausência em aula:** perda automática de 50% da sprint  

---

## 🔗 Links Úteis

- [Cronograma oficial do laboratório](https://github.com/joaopauloaramuni/laboratorio-de-desenvolvimento-de-software/tree/main/CRONOGRAMA)

---

## 📚 Licença

Este projeto foi desenvolvido exclusivamente para fins acadêmicos, como parte da disciplina **Laboratório de Desenvolvimento de Software**, e não possui fins comerciais.
