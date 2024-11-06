const bcrypt = require('bcryptjs');
const AtendenteModel = require('../models/atendenteModels');

// Função para criar um novo atendente
exports.criarAtendente = (req, res) => {
  const { usuario, senha, email, funcao } = req.body;

  // Verificação se todos os dados estão presentes
  if (!usuario || !senha || !email || !funcao) {
    return res.status(400).json({ mensagem: 'Todos os campos (usuario, senha, email, funcao) são obrigatórios.' });
  }

  // Criptografa a senha
  bcrypt.hash(senha, 10, (err, hashedPassword) => {
    if (err) {
      console.error("Erro ao criptografar senha:", err);
      return res.status(500).json({ mensagem: 'Erro ao criptografar senha.' });
    }

    // Chama a função do modelo para criar o atendente, incluindo a função
    AtendenteModel.criarAtendente(usuario, hashedPassword, email, funcao, (error, insertId) => {
      if (error) {
        console.error("Erro ao criar atendente:", error);
        return res.status(500).json({ mensagem: 'Erro ao criar atendente.' });
      }

      // Retorna o sucesso e o ID do novo atendente
      res.status(201).json({ mensagem: 'Atendente criado com sucesso!', atendenteId: insertId });
    });
  });
};

// Função para listar todos os atendentes
exports.listarAtendentes = (req, res) => {
  // Chama a função do modelo para listar atendentes
  AtendenteModel.listarAtendentes((error, rows) => {
    if (error) {
      console.error("Erro ao listar atendentes:", error);
      return res.status(500).json({ mensagem: 'Erro ao listar atendentes.' });
    }

    // Retorna os atendentes
    res.status(200).json(rows);
  });
};
