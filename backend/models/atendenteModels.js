// models/AtendenteModel.js
const connection = require('../config/database');

// Função para criar um novo atendente no banco de dados
const criarAtendente = (usuario, senha, email, callback) => {
  const sql = 'INSERT INTO atendente (usuario, senha, email) VALUES (?, ?, ?)';
  
  // Executa a query diretamente na conexão única
  connection.query(sql, [usuario, senha, email], (error, result) => {
    if (error) {
      console.error("Erro ao executar a query de inserção:", error);
      return callback(error, null);
    }

    // Retorna o insertId do novo registro criado
    callback(null, result.insertId);
  });
};

// Função para listar todos os atendentes
const listarAtendentes = (callback) => {
  const sql = 'SELECT * FROM atendente';
  
  // Executa a query de seleção diretamente na conexão única
  connection.query(sql, (error, rows) => {
    if (error) {
      console.error("Erro ao executar a query de listagem:", error);
      return callback(error, null);
    }

    // Retorna as linhas obtidas
    callback(null, rows);
  });
};

module.exports = {
  criarAtendente,
  listarAtendentes
};
