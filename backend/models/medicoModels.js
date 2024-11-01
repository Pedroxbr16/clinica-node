const connection = require('../config/database'); // Importe a conexão com o banco de dados

// Função para criar um novo médico no banco de dados
exports.create = (medicoData, callback) => {
  const { username, password, crm, nascimento, email, celular, cpf, cep, numero, bairro, cidade, estado } = medicoData;

  const query = `
    INSERT INTO medicos (usuario, password, crm, nascimento, email, celular, cpf, cep, numero, bairro, cidade, estado)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  connection.query(query, [username, password, crm, nascimento, email, celular, cpf, cep, numero, bairro, cidade, estado], (err, results) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, results);
  });
};

// Função para buscar todos os médicos
exports.getAll = (callback) => {
  const query = 'SELECT * FROM medicos';

  connection.query(query, (err, results) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, results);
  });
};

// Função para buscar um médico por ID
exports.getById = (id, callback) => {
  const query = 'SELECT * FROM medicos WHERE id = ?';

  connection.query(query, [id], (err, results) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, results[0]); // Retorna o primeiro (e único) resultado
  });
};

// Função para atualizar um médico
exports.update = (id, medicoData, callback) => {
  const { username, password, crm, nascimento, email, celular, cpf, cep, numero, bairro, cidade, estado } = medicoData;

  const query = `
    UPDATE medicos 
    SET username = ?, password = ?, crm = ?, nascimento = ?, email = ?, celular = ?, cpf = ?, cep = ?, numero = ?, bairro = ?, cidade = ?, estado = ?
    WHERE id = ?
  `;

  connection.query(query, [username, password, crm, nascimento, email, celular, cpf, cep, numero, bairro, cidade, estado, id], (err, results) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, results);
  });
};

// Função para deletar um médico
exports.delete = (id, callback) => {
  const query = 'DELETE FROM medicos WHERE id = ?';

  connection.query(query, [id], (err, results) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, results);
  });
};
