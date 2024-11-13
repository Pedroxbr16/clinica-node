const connection = require('../config/database');

// Função para criar um novo atendente no banco de dados
const criarAtendente = (usuario, senha, email, funcao, callback) => {
  const sql = 'INSERT INTO atendente (usuario, senha, email, funcao) VALUES (?, ?, ?, ?)';
  
  connection.query(sql, [usuario, senha, email, funcao], (error, result) => {
    if (error) {
      console.error("Erro ao executar a query de inserção:", error);
      return callback(error, null);
    }

    callback(null, result.insertId);
  });
};

// Função para listar todos os atendentes
const listarAtendentes = (callback) => {
  const sql = 'SELECT * FROM atendente';
  
  connection.query(sql, (error, rows) => {
    if (error) {
      console.error("Erro ao executar a query de listagem:", error);
      return callback(error, null);
    }

    callback(null, rows);
  });
};

// Função para buscar um atendente por ID
const buscarAtendentePorId = (id, callback) => {
  const sql = 'SELECT * FROM atendente WHERE id = ?';
  
  connection.query(sql, [id], (error, rows) => {
    if (error) {
      console.error("Erro ao executar a query de busca:", error);
      return callback(error, null);
    }

    // Retorna o primeiro atendente encontrado (ou null se não encontrado)
    callback(null, rows[0] || null);
  });
};

// Função para atualizar um atendente
const atualizarAtendente = (id, usuario, senha, email, funcao, callback) => {
  const sql = senha
    ? 'UPDATE atendente SET usuario = ?, senha = ?, email = ?, funcao = ? WHERE id = ?'
    : 'UPDATE atendente SET usuario = ?, email = ?, funcao = ? WHERE id = ?';
  
  const params = senha ? [usuario, senha, email, funcao, id] : [usuario, email, funcao, id];

  connection.query(sql, params, (error, result) => {
    if (error) {
      console.error("Erro ao executar a query de atualização:", error);
      return callback(error, null);
    }

    callback(null, result.affectedRows);
  });
};

// Função para excluir um atendente
const excluirAtendente = (id, callback) => {
  const sql = 'DELETE FROM atendente WHERE id = ?';
  
  connection.query(sql, [id], (error, result) => {
    if (error) {
      console.error("Erro ao executar a query de exclusão:", error);
      return callback(error, null);
    }

    callback(null, result.affectedRows);
  });
};

module.exports = {
  criarAtendente,
  listarAtendentes,
  buscarAtendentePorId,
  atualizarAtendente,
  excluirAtendente
};
