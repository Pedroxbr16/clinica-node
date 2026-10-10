const medicoService = require('../services/medicoService');
const asyncHandler = require('../utils/asyncHandler');

exports.createMedico = asyncHandler(async (req, res) => {
  const medico = await medicoService.create(req.body);
  res.status(201).json({ success: true, message: 'Médico cadastrado com sucesso!', id: medico.id });
});
exports.getAllMedicos = asyncHandler(async (_req, res) => res.json({ success: true, data: await medicoService.list() }));
exports.getMedicoById = asyncHandler(async (req, res) => {
  const medico = await medicoService.findById(req.params.id);
  if (!medico) return res.status(404).json({ success: false, error: 'Médico não encontrado' });
  res.json({ success: true, data: medico });
});
exports.updateMedico = asyncHandler(async (req, res) => {
  const medico = await medicoService.update(req.params.id, req.body);
  if (!medico) return res.status(404).json({ success: false, error: 'Médico não encontrado' });
  res.json({ success: true, message: 'Médico atualizado com sucesso!' });
});
exports.deleteMedico = asyncHandler(async (req, res) => {
  if (!await medicoService.remove(req.params.id)) return res.status(404).json({ success: false, error: 'Médico não encontrado' });
  res.json({ success: true, message: 'Médico excluído com sucesso!' });
});
