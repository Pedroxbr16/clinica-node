const bcrypt = require('bcryptjs');
const AtendenteModel = require('../models/atendenteModels');

// Função para criar um novo atendente
exports.criarAtendente = (req, res) => {
  const { usuario, senha, email, funcao } = req.body;

  if (!usuario || !senha || !email || !funcao) {
    return res.status(400).json({ mensagem: 'Todos os campos (usuario, senha, email, funcao) são obrigatórios.' });
  }

  bcrypt.hash(senha, 10, (err, hashedPassword) => {
    if (err) {
      console.error("Erro ao criptografar senha:", err);
      return res.status(500).json({ mensagem: 'Erro ao criptografar senha.' });
    }

    AtendenteModel.criarAtendente(usuario, hashedPassword, email, funcao, (error, insertId) => {
      if (error) {
        console.error("Erro ao criar atendente:", error);
        return res.status(500).json({ mensagem: 'Erro ao criar atendente.' });
      }

      res.status(201).json({ mensagem: 'Atendente criado com sucesso!', atendenteId: insertId });
    });
  });
};

// Função para listar todos os atendentes
exports.listarAtendentes = (req, res) => {
  AtendenteModel.listarAtendentes((error, rows) => {
    if (error) {
      console.error("Erro ao listar atendentes:", error);
      return res.status(500).json({ mensagem: 'Erro ao listar atendentes.' });
    }

    res.status(200).json(rows);
  });
};

// Função para buscar um atendente por ID
exports.buscarAtendentePorId = (req, res) => {
  const { id } = req.params;

  AtendenteModel.buscarAtendentePorId(id, (error, atendente) => {
    if (error) {
      console.error("Erro ao buscar atendente:", error);
      return res.status(500).json({ mensagem: 'Erro ao buscar atendente.' });
    }

    if (!atendente) {
      return res.status(404).json({ mensagem: 'Atendente não encontrado.' });
    }

    res.status(200).json(atendente);
  });
};

// Função para atualizar um atendente
exports.atualizarAtendente = (req, res) => {
  const { id } = req.params;
  const { usuario, senha, email, funcao } = req.body;

  if (!usuario || !email || !funcao) {
    return res.status(400).json({ mensagem: 'Os campos (usuario, email, funcao) são obrigatórios.' });
  }

  const atualizarAtendente = (hashedPassword) => {
    AtendenteModel.atualizarAtendente(id, usuario, hashedPassword, email, funcao, (error, affectedRows) => {
      if (error) {
        console.error("Erro ao atualizar atendente:", error);
        return res.status(500).json({ mensagem: 'Erro ao atualizar atendente.' });
      }

      if (affectedRows === 0) {
        return res.status(404).json({ mensagem: 'Atendente não encontrado.' });
      }

      res.status(200).json({ mensagem: 'Atendente atualizado com sucesso!' });
    });
  };

  if (senha) {
    // Se a senha foi fornecida, criptografa antes de atualizar
    bcrypt.hash(senha, 10, (err, hashedPassword) => {
      if (err) {
        console.error("Erro ao criptografar senha:", err);
        return res.status(500).json({ mensagem: 'Erro ao criptografar senha.' });
      }
      atualizarAtendente(hashedPassword);
    });
  } else {
    // Se a senha não foi fornecida, atualiza sem modificar a senha
    atualizarAtendente(null);
  }
};

// Função para excluir um atendente
exports.excluirAtendente = (req, res) => {
  const { id } = req.params;

  AtendenteModel.excluirAtendente(id, (error, affectedRows) => {
    if (error) {
      console.error("Erro ao excluir atendente:", error);
      return res.status(500).json({ mensagem: 'Erro ao excluir atendente.' });
    }

    if (affectedRows === 0) {
      return res.status(404).json({ mensagem: 'Atendente não encontrado.' });
    }

    res.status(200).json({ mensagem: 'Atendente excluído com sucesso!' });
  });
};
