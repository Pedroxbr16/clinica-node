const connection = require('../config/database');

// Função auxiliar para remover caracteres não numéricos
const removeNonNumeric = (value) => value.replace(/\D/g, '');

// Método para criar um médico
exports.createMedico = (req, res) => {
  const {
    usuario,
    crm,
    cep,
    numero,
    bairro,
    cidade,
    estado,
    cpf,
    nascimento,
    genero,
    email,
    telefone,
    celular
  } = req.body;

  const foto = req.file ? req.file.filename : null; // Foto enviada

  // Remover caracteres não numéricos
  const cleanCpf = cpf ? removeNonNumeric(cpf) : null;
  const cleanCep = cep ? removeNonNumeric(cep) : null;
  const cleanTelefone = telefone ? removeNonNumeric(telefone) : null;
  const cleanCelular = celular ? removeNonNumeric(celular) : null;

  // Validação simples para verificar se o CPF foi informado e tem o tamanho correto
  if (!cleanCpf || cleanCpf.length !== 11) {
    return res.status(400).json({ error: 'CPF inválido. Deve conter 11 dígitos.' });
  }

  // Opcional: Validar CNPJ se fornecido
  // if (cleanCnpj && cleanCnpj.length !== 14) {
  //   return res.status(400).json({ error: 'CNPJ inválido. Deve conter 14 dígitos.' });
  // }

  // Verificar duplicação de CPF ou CNPJ
  const checkQuery = 'SELECT id FROM medicos WHERE cpf = ?'
  connection.query(checkQuery, [cleanCpf], (err, results) => {
    if (err) {
      console.error('Erro ao verificar duplicação de CPF ', err);
      return res.status(500).json({ error: 'Erro ao verificar duplicação de CPF ' });
    }

    if (results.length > 0) {
      return res.status(400).json({ error: 'CPF  já cadastrado' });
    }

    // Se não houver duplicação, insere o médico
    const insertQuery = `
      INSERT INTO medicos 
      (nome, crm, cep, numero, bairro, cidade, estado, cpf,nascimento, genero, email, telefone, celular, foto)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    connection.query(
      insertQuery,
      [
        nome,
        crm,
        cleanCep,
        numero,
        bairro,
        cidade,
        estado,
        cleanCpf,
        nascimento,
        genero,
        email,
        cleanTelefone,
        cleanCelular,
        foto
      ],
      (err, results) => {
        if (err) {
          console.error('Erro ao cadastrar médico:', err);
          return res.status(500).json({ error: 'Erro ao cadastrar médico' });
        }

        res.status(201).json({ message: 'Médico cadastrado com sucesso!', id: results.insertId });
      }
    );
  });
};

// Método para listar todos os médicos
exports.getMedicos = (req, res) => {
  const selectQuery = 'SELECT * FROM medicos';

  connection.query(selectQuery, (err, results) => {
    if (err) {
      console.error('Erro ao listar médicos:', err);
      return res.status(500).json({ error: 'Erro ao listar médicos' });
    }

    res.status(200).json(results);
  });
};
