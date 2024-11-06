// models/medicoModel.js
const connection = require('../config/database');

// Função para inserir um novo médico
exports.createMedico = (medicoData, callback) => {
  const {
    usuario, crm, data_nascimento, email, celular, cpf, cep, numero, bairro, cidade, estado
  } = medicoData;

  const query = `
    INSERT INTO medicos (usuario, crm, data_nascimento, email, celular, cpf, cep, numero, bairro, cidade, estado)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;
  
  const values = [
    usuario,
    crm,
    data_nascimento,
    email,
    celular,
    cpf,
    cep,
    numero,
    bairro,
    cidade,
    estado
  ];

  connection.query(query, values, callback);
};

// Função para buscar todos os médicos
exports.getAllMedicos = (callback) => {
  const query = 'SELECT * FROM medicos';
  connection.query(query, callback);
};

// Função para buscar um médico pelo ID
exports.getMedicoById = (id, callback) => {
  const query = 'SELECT * FROM medicos WHERE id = ?';
  connection.query(query, [id], callback);
};

// Função para atualizar um médico pelo ID
exports.updateMedico = (id, medicoData, callback) => {
  const {
    usuario, crm, data_nascimento, email, celular, cpf, cep, numero, bairro, cidade, estado
  } = medicoData;

  const query = `
    UPDATE medicos 
    SET usuario = ?, crm = ?, data_nascimento = ?, email = ?, celular = ?, cpf = ?, 
        cep = ?, numero = ?, bairro = ?, cidade = ?, estado = ? 
    WHERE id = ?
  `;
  
  const values = [
    usuario,
    crm,
    data_nascimento,
    email,
    celular,
    cpf,
    cep,
    numero,
    bairro,
    cidade,
    estado,
    id
  ];

  connection.query(query, values, callback);
};

// Função para excluir um médico pelo ID
exports.deleteMedico = (id, callback) => {
  const query = 'DELETE FROM medicos WHERE id = ?';
  connection.query(query, [id], callback);
};
