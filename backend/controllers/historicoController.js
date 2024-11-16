const Historico = require('../models/historicoModel');

// Lista todos os históricos
exports.listarHistoricos = (req, res) => {
  Historico.findAll((error, results) => {
    if (error) {
      console.error('Erro ao listar históricos:', error);
      res.status(500).json({ error: 'Erro ao listar históricos' });
    } else {
      res.json(results);
    }
  });
};

// Adiciona um novo histórico
exports.adicionarHistorico = (req, res) => {
  const { paciente_id, data_consulta, historico } = req.body;
  Historico.create({ paciente_id, data_consulta, historico }, (error, results) => {
    if (error) {
      console.error('Erro ao adicionar histórico:', error);
      res.status(500).json({ error: 'Erro ao adicionar histórico' });
    } else {
      res.status(201).json({ id: results.insertId, paciente_id, data_consulta, historico });
    }
  });
};

// Atualiza um histórico existente
exports.atualizarHistorico = (req, res) => {
  const { id } = req.params;
  const { paciente_id, data_consulta, historico } = req.body;
  Historico.update(id, { paciente_id, data_consulta, historico }, (error, results) => {
    if (error) {
      console.error('Erro ao atualizar histórico:', error);
      res.status(500).json({ error: 'Erro ao atualizar histórico' });
    } else if (results.affectedRows === 0) {
      res.status(404).json({ error: 'Histórico não encontrado' });
    } else {
      res.json({ id, paciente_id, data_consulta, historico });
    }
  });
};

// Exclui um histórico
exports.excluirHistorico = (req, res) => {
  const { id } = req.params;
  Historico.delete(id, (error, results) => {
    if (error) {
      console.error('Erro ao excluir histórico:', error);
      res.status(500).json({ error: 'Erro ao excluir histórico' });
    } else if (results.affectedRows === 0) {
      res.status(404).json({ error: 'Histórico não encontrado' });
    } else {
      res.json({ message: 'Histórico excluído com sucesso' });
    }
  });
};
