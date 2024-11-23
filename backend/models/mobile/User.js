const connection = require('../../config/database'); // Importe sua conexão com o banco de dados

// Função para criar um novo usuário
const createUser = (name, email, password, callback) => {
  const sql = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
  connection.query(sql, [name, email, password], (err, results) => {
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
const updateUser = (id, name, email, password, callback) => {
  const sql = `
    UPDATE users
    SET name = ?, email = ?, password = ?
    WHERE id = ?
  `;
  connection.query(sql, [name, email, password, id], (err, results) => {
    callback(err, results);
  });
};

module.exports = {
  createUser,
  findUserByEmail,
  authenticateUser,
  updateUser,
};
