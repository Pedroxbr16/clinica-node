const connection = require('../config/database');

// Função para criar um novo paciente no banco de dados
exports.create = (pacienteData, callback) => {
  const { nome, cep, numero, bairro, cidade, estado, cpf, cnpj, nascimento, genero, email, telefone, celular, foto } = pacienteData;

  const query = `
    INSERT INTO pacientes (nome, cep, numero, bairro, cidade, estado, cpf, cnpj, nascimento, genero, email, telefone, celular, foto)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  connection.query(query, [nome, cep, numero, bairro, cidade, estado, cpf, cnpj, nascimento, genero, email, telefone, celular, foto], (err, results) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, results);
  });
};

// Função para buscar todos os pacientes
exports.getAll = (callback) => {
  const query = 'SELECT * FROM pacientes';
  
  connection.query(query, (err, results) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, results);
  });
};

// Função para buscar um paciente por ID
exports.getById = (id, callback) => {
  const query = 'SELECT * FROM pacientes WHERE id = ?';
  
  connection.query(query, [id], (err, results) => {
    if (err) {
      return callback(err, null);
    }
    if (results[0] && results[0].foto) {
      // Converte o campo 'foto' de binário para Base64
      results[0].fotoUrl = `data:image/jpeg;base64,${results[0].foto.toString('base64')}`;
    }
    callback(null, results[0]); // Retorna o primeiro (e único) resultado
  });
};


// Função para atualizar um paciente
exports.update = (id, pacienteData, callback) => {
  const { nome, cep, numero, bairro, cidade, estado, cpf, cnpj, nascimento, genero, email, telefone, celular, foto } = pacienteData;

  const query = `
    UPDATE pacientes SET nome = ?, cep = ?, numero = ?, bairro = ?, cidade = ?, estado = ?, cpf = ?, cnpj = ?, nascimento = ?, genero = ?, email = ?, telefone = ?, celular = ?, foto = ?
    WHERE id = ?
  `;

  connection.query(query, [nome, cep, numero, bairro, cidade, estado, cpf, cnpj, nascimento, genero, email, telefone, celular, foto, id], (err, results) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, results);
  });
};

// Função para deletar um paciente
exports.delete = (id, callback) => {
  const query = 'DELETE FROM pacientes WHERE id = ?';

  connection.query(query, [id], (err, results) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, results);
  });
};
