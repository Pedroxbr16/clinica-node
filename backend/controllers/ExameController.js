// controllers/exameController.js
const Exame = require('../models/ExameModels');

// Lista todos os exames
exports.listarExames = (req, res) => {
  Exame.findAll((error, results) => {
    if (error) {
      console.error('Erro ao listar exames:', error);
      res.status(500).json({ error: 'Erro ao listar exames' });
    } else {
      res.json(results);
    }
  });
};

// Adiciona um novo exame
exports.adicionarExame = (req, res) => {
  const { nome } = req.body;
  Exame.create(nome, (error, results) => {
    if (error) {
      console.error('Erro ao adicionar exame:', error);
      res.status(500).json({ error: 'Erro ao adicionar exame' });
    } else {
      res.status(201).json({ id: results.insertId, nome });
    }
  });
};

// Atualiza um exame existente
exports.atualizarExame = (req, res) => {
  const { id } = req.params;
  const { nome } = req.body;
  Exame.update(id, nome, (error, results) => {
    if (error) {
      console.error('Erro ao atualizar exame:', error);
      res.status(500).json({ error: 'Erro ao atualizar exame' });
    } else if (results.affectedRows === 0) {
      res.status(404).json({ error: 'Exame não encontrado' });
    } else {
      res.json({ id, nome });
    }
  });
};

// Exclui um exame
exports.excluirExame = (req, res) => {
  const { id } = req.params;
  Exame.delete(id, (error, results) => {
    if (error) {
      console.error('Erro ao excluir exame:', error);
      res.status(500).json({ error: 'Erro ao excluir exame' });
    } else if (results.affectedRows === 0) {
      res.status(404).json({ error: 'Exame não encontrado' });
    } else {
      res.json({ message: 'Exame excluído com sucesso' });
    }
  });
};
