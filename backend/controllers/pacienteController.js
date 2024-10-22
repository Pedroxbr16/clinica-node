const connection = require('../config/database');

exports.createPaciente = (req, res) => {
  const { nome, cep, numero, bairro, cidade, estado, cpf, cnpj, nascimento, genero, email, telefone, celular } = req.body;
  const foto = req.file ? req.file.filename : null; // Foto enviada

  // Validação simples para verificar se o CPF foi informado e tem o tamanho correto
  if (!cpf || cpf.length !== 11) {
    return res.status(400).json({ error: 'CPF inválido' });
  }

  // Verificar duplicação de CPF ou CNPJ
  const checkQuery = 'SELECT id FROM pacientes WHERE cpf = ? OR cnpj = ?';
  connection.query(checkQuery, [cpf, cnpj], (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Erro ao verificar duplicação de CPF ou CNPJ' });
    }
    
    if (results.length > 0) {
      return res.status(400).json({ error: 'CPF ou CNPJ já cadastrado' });
    }

    // Se não houver duplicação, insere o paciente
    const insertQuery = `
      INSERT INTO pacientes (nome, cep, numero, bairro, cidade, estado, cpf, cnpj, nascimento, genero, email, telefone, celular, foto)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    connection.query(insertQuery, [nome, cep, numero, bairro, cidade, estado, cpf, cnpj, nascimento, genero, email, telefone, celular, foto], (err, results) => {
      if (err) {
        return res.status(500).json({ error: 'Erro ao cadastrar paciente' });
      }

      res.status(201).json({ message: 'Paciente cadastrado com sucesso!', id: results.insertId });
    });
  });
};
