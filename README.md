# 🧩 Projeto Clinica - Fullstack com Docker

Este repositório contém o sistema completo da ONG, com arquitetura dividida em **Frontend**, **Backend**, **Mobile** e banco de dados **MySQL**, tudo orquestrado com **Docker**.

---

## 🚀 Como Rodar com Docker

### 1. Clone o repositório

```bash
git clone https://github.com/Pedroxbr16/clinica-node.git
cd clinica-node
```

### 2. Suba os containers

```bash
docker compose up -d --build
```

### 3. Acesse os serviços

| Serviço       | URL                   |
|---------------|-----------------------|
| Frontend      | http://localhost:3000 |
| Backend       | http://localhost:5000 |
| phpMyAdmin    | http://localhost:8080 |
| Mobile (Expo) | http://localhost:19000 |

---

## 🛠️ Rodar sem Docker (usando Makefile)

### 📦 Pré-requisitos

- Node.js
- npm
- Make (via WSL ou terminal com suporte)
- Docker Desktop (opcional, para usar docker)

### 🤖 Comandos disponíveis

| Comando `make`             | Descrição                                               |
|----------------------------|---------------------------------------------------------|
| `make install`             | Instala dependências do frontend, backend e mobile      |
| `make dev`                 | Inicia frontend e backend em janelas separadas          |
| `make mobile`              | Inicia o app mobile com Expo                            |
| `make build`               | Faz o build do frontend                                 |
| `make lint`                | Executa o lint em todos os módulos                     |
| `make test`                | Executa testes em todos os módulos                     |
| `make restart-backend`     | Reinicia backend manualmente (modo local)               |
| `make docker-up`           | Sobe tudo com docker-compose                            |
| `make docker-down`         | Para e remove containers e volumes                      |
| `make docker-restart-backend` | Reinicia o backend via Docker                        |
| `make push-https`          | Faz push para o GitHub via HTTPS                        |
| `make push-ssh`            | Faz push para o GitHub via SSH                          |

---

> 💡 **Dica:** Use `make` para automatizar tarefas durante o desenvolvimento e manter tudo organizado.

---

## 👨‍💻 Desenvolvido por [Pedro Justo](https://github.com/Pedroxbr16)