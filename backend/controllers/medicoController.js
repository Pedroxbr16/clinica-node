// controllers/medicoController.js
const bcrypt = require('bcryptjs');
const medicoModel = require('../models/medicoModels');

// Criação de um novo médico
exports.createMedico = async (req, res) => {
  try {
    const { senha, ...medicoData } = req.body;

    // Criptografar a senha antes de enviar ao modelo
    const hashedPassword = await bcrypt.hash(senha, 10);

    // Passar todos os dados do médico, incluindo a senha criptografada
    medicoModel.createMedico({ ...medicoData, senha: hashedPassword }, (err, results) => {
      if (err) {
        console.error('Erro ao cadastrar médico:', err);
        return res.status(500).json({ error: 'Erro ao cadastrar médico' });
      }
      res.status(201).json({ message: 'Médico cadastrado com sucesso!', id: results.insertId });
    });
  } catch (error) {
    console.error('Erro interno:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

// Obter todos os médicos
exports.getAllMedicos = (req, res) => {
  medicoModel.getAllMedicos((err, results) => {
    if (err) {
      console.error('Erro ao buscar médicos:', err);
      return res.status(500).json({ error: 'Erro ao buscar médicos' });
    }
    res.status(200).json(results);
  });
};

// Obter um médico pelo ID
exports.getMedicoById = (req, res) => {
  const { id } = req.params;
  medicoModel.getMedicoById(id, (err, results) => {
    if (err) {
      console.error('Erro ao buscar médico:', err);
      return res.status(500).json({ error: 'Erro ao buscar médico' });
    }
    if (results.length === 0) return res.status(404).json({ error: 'Médico não encontrado' });
    res.status(200).json(results[0]);
  });
};

// Atualizar um médico pelo ID
exports.updateMedico = async (req, res) => {
  try {
    const { id } = req.params;
    const { senha, ...medicoData } = req.body;

    // Se uma nova senha foi enviada, criptografe-a; caso contrário, mantenha a antiga
    if (senha) {
      medicoData.senha = await bcrypt.hash(senha, 10);
    }

    medicoModel.updateMedico(id, medicoData, (err) => {
      if (err) {
        console.error('Erro ao atualizar médico:', err);
        return res.status(500).json({ error: 'Erro ao atualizar médico' });
      }
      res.status(200).json({ message: 'Médico atualizado com sucesso!' });
    });
  } catch (error) {
    console.error('Erro interno:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

// Excluir um médico pelo ID
exports.deleteMedico = (req, res) => {
  const { id } = req.params;
  medicoModel.deleteMedico(id, (err) => {
    if (err) {
      console.error('Erro ao excluir médico:', err);
      return res.status(500).json({ error: 'Erro ao excluir médico' });
    }
    res.status(200).json({ message: 'Médico excluído com sucesso!' });
  });
};
