const Medico = require('../config/database');

// Função para criar um novo médico
exports.createMedico = (req, res) => {
  const medicoData = req.body;

  Medico.create(medicoData, (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Erro ao criar médico', error: err });
    }
    res.status(201).json({ message: 'Médico criado com sucesso!', data: results });
  });
};

// Função para listar todos os médicos
exports.getMedicos = (req, res) => {
  Medico.getAll((err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Erro ao listar médicos', error: err });
    }
    res.status(200).json(results);
  });
};

// Função para buscar um médico por ID
exports.getMedicoById = (req, res) => {
  const { id } = req.params;

  Medico.getById(id, (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Erro ao buscar médico', error: err });
    }
    if (!result) {
      return res.status(404).json({ message: 'Médico não encontrado' });
    }
    res.status(200).json(result);
  });
};

// Função para atualizar um médico
exports.updateMedico = (req, res) => {
  const { id } = req.params;
  const medicoData = req.body;

  Medico.update(id, medicoData, (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Erro ao atualizar médico', error: err });
    }
    res.status(200).json({ message: 'Médico atualizado com sucesso!' });
  });
};

// Função para deletar um médico
exports.deleteMedico = (req, res) => {
  const { id } = req.params;

  Medico.delete(id, (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Erro ao deletar médico', error: err });
    }
    res.status(200).json({ message: 'Médico deletado com sucesso!' });
  });
};
