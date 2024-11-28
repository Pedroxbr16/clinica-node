const connection = require('../../config/database'); // Importe sua conexão com o banco de dados

// Função para criar um novo usuário
const createUser = (name, email, password, cpf, data_de_nascimento, genero, callback) => {
  const sql = `
    INSERT INTO users (name, email, password, cpf, data_de_nascimento, genero)
    VALUES (?, ?, ?, ?, ?, ?)
  `;
  connection.query(sql, [name, email, password, cpf, data_de_nascimento, genero], (err, results) => {
    callback(err, results);
  });
};

// Função para buscar usuário por e-mail
const findUserByEmail = (email, callback) => {
  const sql = 'SELECT * FROM users WHERE email = ?';
  connection.query(sql, [email], (err, results) => {
    callback(err, results[0]); // Retorna o primeiro usuário encontrado
  });
};

// Função para autenticar usuário por e-mail e senha
const authenticateUser = (email, password, callback) => {
  const sql = 'SELECT * FROM users WHERE email = ? AND password = ?';
  connection.query(sql, [email, password], (err, results) => {
    callback(err, results[0]); // Retorna o primeiro usuário encontrado
  });
};

// Função para atualizar um usuário
const updateUser = (id, name, email, password, cpf, data_de_nascimento, genero, callback) => {
  const sql = `
    UPDATE users
    SET name = ?, email = ?, password = ?, cpf = ?, data_de_nascimento = ?, genero = ?
    WHERE id = ?
  `;
  connection.query(sql, [name, email, password, cpf, data_de_nascimento, genero, id], (err, results) => {
    callback(err, results);
  });
};

// Buscar usuário pelo ID
const findUserById = (id, callback) => {
  const sql = 'SELECT * FROM users WHERE id = ?';
  connection.query(sql, [id], (err, results) => {
    callback(err, results[0]); // Retorna o primeiro usuário encontrado ou undefined
  });
};

module.exports = {
  createUser,
  findUserById,
  findUserByEmail,
  authenticateUser,
  updateUser,
};
