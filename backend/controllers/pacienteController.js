const connection = require('../config/database');
const Paciente = require('../models/pacienteModel');

// Função auxiliar para remover caracteres não numéricos
const removeNonNumeric = (value) => value.replace(/\D/g, '');

// Método para criar um paciente
exports.createPaciente = (req, res) => {
  const {
    nome,
    cep,
    numero,
    bairro,
    cidade,
    estado,
    cpf,
    cnpj,
    nascimento,
    genero,
    email,
    telefone,
    celular
  } = req.body;

  const foto = req.file ? req.file.filename : null; // Foto enviada

  const cleanCpf = cpf ? removeNonNumeric(cpf) : null;

  // Validação do CPF
  if (!cleanCpf || cleanCpf.length !== 11) {
    return res.status(400).json({ error: 'CPF inválido. Deve conter 11 dígitos.' });
  }

  Paciente.create({
    nome, cep, numero, bairro, cidade, estado, cpf: cleanCpf, cnpj, nascimento, genero, email, telefone, celular, foto
  }, (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Erro ao cadastrar paciente' });
    }
    res.status(201).json({ message: 'Paciente cadastrado com sucesso!', id: result.insertId });
  });
};

// Método para listar todos os pacientes
exports.getPacientes = (req, res) => {
  Paciente.getAll((err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Erro ao listar pacientes' });
    }
    res.status(200).json(results);
  });
};

// Método para obter um paciente pelo ID
exports.getPacienteById = (req, res) => {
  const { id } = req.params;

  Paciente.getById(id, (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Erro ao obter paciente' });
    }
    if (!result) {
      return res.status(404).json({ error: 'Paciente não encontrado' });
    }
    res.status(200).json(result);
  });
};

// Método para buscar um paciente pelo CPF
exports.getPacienteByCpf = (req, res) => {
  const { cpf } = req.params;
  const cleanCpf = removeNonNumeric(cpf);

  Paciente.getByCpf(cleanCpf, (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Erro ao buscar paciente pelo CPF' });
    }
    if (!result) {
      return res.status(404).json({ error: 'Paciente não encontrado' });
    }
    res.status(200).json(result);
  });
};

// Método para atualizar um paciente
exports.updatePaciente = (req, res) => {
  const { id } = req.params;
  const pacienteData = req.body;
  pacienteData.foto = req.file ? req.file.filename : null;

  Paciente.update(id, pacienteData, (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Erro ao atualizar paciente' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Paciente não encontrado' });
    }
    res.status(200).json({ message: 'Paciente atualizado com sucesso' });
  });
};

// Método para deletar um paciente
exports.deletePaciente = (req, res) => {
  const { id } = req.params;

  Paciente.delete(id, (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Erro ao excluir paciente' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Paciente não encontrado' });
    }
    res.status(200).json({ message: 'Paciente excluído com sucesso' });
  });
};
