const connection = require('../config/database');

// Função para listar todos os históricos
exports.findAll = (callback) => {
  connection.query('SELECT * FROM historico', (error, results) => {
    callback(error, results);
  });
};

// Função para adicionar um novo histórico
exports.create = (data, callback) => {
  const { paciente_id, data_consulta, historico } = data;
  connection.query(
    'INSERT INTO historico (paciente_id, data_consulta, historico) VALUES (?, ?, ?)',
    [paciente_id, data_consulta, historico],
    (error, results) => {
      callback(error, results);
    }
  );
};

// Função para atualizar um histórico pelo ID
exports.update = (id, data, callback) => {
  const { paciente_id, data_consulta, historico } = data;
  connection.query(
    'UPDATE historico SET paciente_id = ?, data_consulta = ?, historico = ? WHERE id = ?',
    [paciente_id, data_consulta, historico, id],
    (error, results) => {
      callback(error, results);
    }
  );
};

// Função para excluir um histórico pelo ID
exports.delete = (id, callback) => {
  connection.query('DELETE FROM historico WHERE id = ?', [id], (error, results) => {
    callback(error, results);
  });
};

// Função para buscar um histórico pelo ID
exports.findById = (id, callback) => {
  connection.query('SELECT * FROM historico WHERE id = ?', [id], (error, results) => {
    callback(error, results[0]);
  });
};
