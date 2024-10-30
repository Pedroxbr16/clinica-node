const connection = require('../config/database');

// Função para criar um novo usuário no banco de dados
exports.create = (usuarioData, callback) => {
  const { nome, email, funcao, senha } = usuarioData;

  const query = `
    INSERT INTO usuario (nome, email, funcao, senha)
    VALUES (?, ?, ?, ?)
  `;

  connection.query(query, [nome, email, funcao, senha], (err, results) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, results);
  });
};

// Função para buscar todos os usuários
exports.getAll = (callback) => {
  const query = 'SELECT * FROM usuario';

  connection.query(query, (err, results) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, results);
  });
};

// Função para buscar um usuário por ID
exports.getById = (id, callback) => {
  const query = 'SELECT * FROM usuario WHERE id = ?';

  connection.query(query, [id], (err, results) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, results[0]); // Retorna o primeiro (e único) resultado
  });
};

// Função para atualizar um usuário
exports.update = (id, usuarioData, callback) => {
  const { nome, email, funcao, senha } = usuarioData;

  const query = `
    UPDATE usuario SET nome = ?, email = ?, funcao = ?, senha = ?
    WHERE id = ?
  `;

  connection.query(query, [nome, email, funcao, senha, id], (err, results) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, results);
  });
};

// Função para deletar um usuário
exports.delete = (id, callback) => {
  const query = 'DELETE FROM usuario WHERE id = ?';

  connection.query(query, [id], (err, results) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, results);
  });
};
