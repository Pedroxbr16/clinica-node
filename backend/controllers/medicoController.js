const medicoModel = require('../models/medicoModels');

// Função auxiliar para responder com erro
const handleError = (res, message, statusCode = 500) => {
  console.error(message);
  res.status(statusCode).json({ success: false, error: message });
};

// Criação de um novo médico
exports.createMedico = (req, res) => {
  try {
    const medicoData = req.body; // Todos os dados, exceto senha

    medicoModel.createMedico(medicoData, (err, results) => {
      if (err) return handleError(res, 'Erro ao cadastrar médico');
      res.status(201).json({ success: true, message: 'Médico cadastrado com sucesso!', id: results.insertId });
    });
  } catch (error) {
    handleError(res, 'Erro interno do servidor');
  }
};

// Obter todos os médicos
exports.getAllMedicos = (req, res) => {
  medicoModel.getAllMedicos((err, results) => {
    if (err) return handleError(res, 'Erro ao buscar médicos');
    res.status(200).json({ success: true, data: results });
  });
};

// Obter um médico pelo ID
exports.getMedicoById = (req, res) => {
  const { id } = req.params;
  if (isNaN(id)) return handleError(res, 'ID inválido', 400);

  medicoModel.getMedicoById(id, (err, results) => {
    if (err) return handleError(res, 'Erro ao buscar médico');
    if (results.length === 0) return handleError(res, 'Médico não encontrado', 404);
    res.status(200).json({ success: true, data: results[0] });
  });
};

// Atualizar um médico pelo ID
exports.updateMedico = (req, res) => {
  try {
    const { id } = req.params;
    if (isNaN(id)) return handleError(res, 'ID inválido', 400);

    const medicoData = req.body; // Dados do médico sem senha

    medicoModel.updateMedico(id, medicoData, (err) => {
      if (err) return handleError(res, 'Erro ao atualizar médico');
      res.status(200).json({ success: true, message: 'Médico atualizado com sucesso!' });
    });
  } catch (error) {
    handleError(res, 'Erro interno do servidor');
  }
};

// Excluir um médico pelo ID
exports.deleteMedico = (req, res) => {
  const { id } = req.params;
  if (isNaN(id)) return handleError(res, 'ID inválido', 400);

  medicoModel.deleteMedico(id, (err) => {
    if (err) return handleError(res, 'Erro ao excluir médico');
    res.status(200).json({ success: true, message: 'Médico excluído com sucesso!' });
  });
};
