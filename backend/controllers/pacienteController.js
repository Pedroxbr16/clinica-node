const connection = require('../config/database');
const Paciente = require('../models/pacienteModel'); // Importe o modelo paciente

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

  // Remover caracteres não numéricos
  const cleanCpf = cpf ? removeNonNumeric(cpf) : null;
  const cleanCnpj = cnpj ? removeNonNumeric(cnpj) : null;
  const cleanCep = cep ? removeNonNumeric(cep) : null;
  const cleanTelefone = telefone ? removeNonNumeric(telefone) : null;
  const cleanCelular = celular ? removeNonNumeric(celular) : null;

  // Validação do CPF
  if (!cleanCpf || cleanCpf.length !== 11) {
    return res.status(400).json({ error: 'CPF inválido. Deve conter 11 dígitos.' });
  }

  // Validação opcional do CNPJ
  if (cleanCnpj && cleanCnpj.length !== 14) {
    return res.status(400).json({ error: 'CNPJ inválido. Deve conter 14 dígitos.' });
  }

  // Verificar duplicação de CPF ou CNPJ
  const checkQuery = 'SELECT id FROM pacientes WHERE cpf = ? OR cnpj = ?';
  connection.query(checkQuery, [cleanCpf, cleanCnpj], (err, results) => {
    if (err) {
      console.error('Erro ao verificar duplicação de CPF ou CNPJ:', err);
      return res.status(500).json({ error: 'Erro ao verificar duplicação de CPF ou CNPJ' });
    }

    if (results.length > 0) {
      return res.status(400).json({ error: 'CPF ou CNPJ já cadastrado' });
    }

    // Inserir paciente
    const insertQuery = `
      INSERT INTO pacientes 
      (nome, cep, numero, bairro, cidade, estado, cpf, cnpj, nascimento, genero, email, telefone, celular, foto)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    connection.query(
      insertQuery,
      [
        nome,
        cleanCep,
        numero,
        bairro,
        cidade,
        estado,
        cleanCpf,
        cleanCnpj,
        nascimento,
        genero,
        email,
        cleanTelefone,
        cleanCelular,
        foto
      ],
      (err, results) => {
        if (err) {
          console.error('Erro ao cadastrar paciente:', err);
          return res.status(500).json({ error: 'Erro ao cadastrar paciente' });
        }

        res.status(201).json({ message: 'Paciente cadastrado com sucesso!', id: results.insertId });
      }
    );
  });
};

// Método para listar todos os pacientes
exports.getPacientes = (req, res) => {
  const selectQuery = 'SELECT * FROM pacientes';

  connection.query(selectQuery, (err, results) => {
    if (err) {
      console.error('Erro ao listar pacientes:', err);
      return res.status(500).json({ error: 'Erro ao listar pacientes' });
    }

    res.status(200).json(results);
  });
};

// Método para obter um paciente pelo ID
exports.getPacienteById = (req, res) => {
  const { id } = req.params;

  // Certifique-se de que o ID é válido (número inteiro)
  if (!Number.isInteger(Number(id))) {
    return res.status(400).json({ error: 'ID inválido. Deve ser um número inteiro.' });
  }

  Paciente.getById(id, (err, result) => {
    if (err) {
      console.error('Erro ao obter paciente pelo ID:', err);
      return res.status(500).json({ error: 'Erro ao obter paciente' });
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

  const foto = req.file ? req.file.filename : null; // Foto enviada (se existir)

  // Remover caracteres não numéricos
  const cleanCpf = cpf ? removeNonNumeric(cpf) : null;
  const cleanCnpj = cnpj ? removeNonNumeric(cnpj) : null;
  const cleanCep = cep ? removeNonNumeric(cep) : null;
  const cleanTelefone = telefone ? removeNonNumeric(telefone) : null;
  const cleanCelular = celular ? removeNonNumeric(celular) : null;

  const pacienteData = {
    nome,
    cep: cleanCep,
    numero,
    bairro,
    cidade,
    estado,
    cpf: cleanCpf,
    cnpj: cleanCnpj,
    nascimento,
    genero,
    email,
    telefone: cleanTelefone,
    celular: cleanCelular,
    foto,
  };

  Paciente.update(id, pacienteData, (err, results) => {
    if (err) {
      console.error('Erro ao atualizar paciente:', err);
      return res.status(500).json({ error: 'Erro ao atualizar paciente' });
    }

    if (results.affectedRows === 0) {
      return res.status(404).json({ error: 'Paciente não encontrado' });
    }

    res.status(200).json({ message: 'Paciente atualizado com sucesso' });
  });
};

// Função para excluir um paciente pelo ID
exports.deletePaciente = (req, res) => {
  const { id } = req.params;

  // Certifique-se de que o ID é válido (número inteiro)
  if (!Number.isInteger(Number(id))) {
    return res.status(400).json({ error: 'ID inválido. Deve ser um número inteiro.' });
  }

  Paciente.delete(id, (err, results) => {
    if (err) {
      console.error('Erro ao excluir paciente:', err);
      return res.status(500).json({ error: 'Erro ao excluir paciente' });
    }

    if (results.affectedRows === 0) {
      return res.status(404).json({ error: 'Paciente não encontrado' });
    }

    res.status(200).json({ message: 'Paciente excluído com sucesso' });
  });
};
