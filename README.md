# Programa pra Clínicas

## Sobre o Projeto
aplicação desenvolvida para clinicas pra resolver problemas de cadastramento e agendamento, com integração com uma aplicação [mobile](https://github.com/Pedroxbr16/clinica-mobiile).

## estrutura de pastas

/backend <br/>
    /config         # Onde fica localizado o arquivo de conexão com o banco de dados <br/>
    /controlers     # Funções de controle das rotas <br/>
    /models         # Modelo de dados no Mysql <br/>
    /routes         # Definição das rotas <br/>
    /server         # Localização do arquivo responsável pro rodar o servidor node <br/>
    /uploads        # Onde sobe os arquivos de imagem da aplicação <br/>
/frontend <br/>
    /public         # Arquivos públicos <br/>
    /src            # Onde se localiza o codigo-fonte principal  <br/>
        /assets     # Arquivos estaticos <br/>
        /css        # Arquivos de estilização <br/>




## Tecnologias Utilizadas

- **Node.js**:Ambiente de execução Javascript no lado do servidor.
- **Express.js**:Framework para Node.js que facilita a criação de servidores HTTP.
- **Mysql**: Banco de dados relacional, ideal para dados robustos.
- **React**: Biblioteca do Javascript pra facilitar na criação de interfaces.

## Funcionalidades

- **CRUD de Pacientes**
- **Cadastro de  Medicos**
- **Cadastro de Atendentes**
- **Agendamento de Consulta**
- **Guia de exames**
- **Historicos**

# Requisitos

node 20.14.0  </br>
xampp 8.0.30
-------------
# Banco de dados
assim que instalar o xampp rode os comando no terminal dele "shell" 

dê o comando pra acessar o mariadb
```bash
mysql -u root -p
```
logo após crie o banco de dados
```bash
CREATE DATABASE clinica;
```
depos crie o usuário e senha e dê todas as permissões
altere os campos 'usuario' e 'senha' para oque desejar
e lembre de alterar no codigo de conexão com o banco de dados

```bash
CREATE USER 'usuario'@'localhost' IDENTIFIED BY 'senha';
```
```bash
GRANT ALL PRIVILEGES ON nome_do_banco.* TO 'usuario'@'localhost';
```

```bash
FLUSH PRIVILEGES;
```

# Rodando localmente

Clone o repositório:
```bash
git clone https://github.com/Pedroxbr16/clinica-node.git
```

Instale as dependencias tanto do backend como do frontend:

```bash
cd backend
npm install
```
```bash
cd ..
cd frontend
npm install
```

Rode o servidor node e o react:

```bash
cd backend
node server/app.js
```

```bash
cd frontend
npm start
```

**ℹ️não se esqueça de alterar no codigo o usuário e senha que colocou**
