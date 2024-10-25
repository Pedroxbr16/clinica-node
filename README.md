# Requisitos

node 20.14.0 ou superior </br>
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

```bash
CREATE USER 'usuario'@'localhost' IDENTIFIED BY 'senha';
```
```bash
GRANT ALL PRIVILEGES ON nome_do_banco.* TO 'usuario'@'localhost';
```

```bash
FLUSH PRIVILEGES;
```

