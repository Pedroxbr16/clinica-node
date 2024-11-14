// models/Exame.js
const connection = require('../config/database');

// Função para listar todos os exames
exports.findAll = (callback) => {
  connection.query('SELECT * FROM exames', (error, results) => {
    callback(error, results);
  });
};

// Função para adicionar um novo exame
exports.create = (nome, callback) => {
  connection.query('INSERT INTO exames (nome) VALUES (?)', [nome], (error, results) => {
    callback(error, results);
  });
};

// Função para atualizar um exame pelo ID
exports.update = (id, nome, callback) => {
  connection.query('UPDATE exames SET nome = ? WHERE id = ?', [nome, id], (error, results) => {
    callback(error, results);
  });
};

// Função para excluir um exame pelo ID
exports.delete = (id, callback) => {
  connection.query('DELETE FROM exames WHERE id = ?', [id], (error, results) => {
    callback(error, results);
  });
};

// Função para buscar um exame pelo ID
exports.findById = (id, callback) => {
  connection.query('SELECT * FROM exames WHERE id = ?', [id], (error, results) => {
    callback(error, results[0]);
  });
};
