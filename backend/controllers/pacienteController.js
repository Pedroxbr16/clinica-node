const pacienteService = require('../services/pacienteService');
const asyncHandler = require('../utils/asyncHandler');
const { onlyDigits } = require('../utils/normalizers');

exports.createPaciente = asyncHandler(async (req, res) => {
  const cpf = onlyDigits(req.body.cpf);
  if (cpf.length !== 11) return res.status(400).json({ error: 'CPF inválido. Deve conter 11 dígitos.' });
  const paciente = await pacienteService.create({ ...req.body, cpf, ...(req.file && { foto: req.file.filename }) });
  res.status(201).json({ message: 'Paciente cadastrado com sucesso!', id: paciente.id });
});
exports.getPacientes = asyncHandler(async (_req, res) => res.json(await pacienteService.list()));
exports.getPacienteById = asyncHandler(async (req, res) => {
  const paciente = await pacienteService.findById(req.params.id);
  if (!paciente) return res.status(404).json({ error: 'Paciente não encontrado' });
  res.json(paciente);
});
exports.getPacienteByCpf = asyncHandler(async (req, res) => {
  const paciente = await pacienteService.findByCpf(req.params.cpf);
  if (!paciente) return res.status(404).json({ error: 'Paciente não encontrado' });
  res.json(paciente);
});
exports.updatePaciente = asyncHandler(async (req, res) => {
  const paciente = await pacienteService.update(req.params.id, { ...req.body, ...(req.file && { foto: req.file.filename }) });
  if (!paciente) return res.status(404).json({ error: 'Paciente não encontrado' });
  res.json({ message: 'Paciente atualizado com sucesso' });
});
exports.deletePaciente = asyncHandler(async (req, res) => {
  if (!await pacienteService.remove(req.params.id)) return res.status(404).json({ error: 'Paciente não encontrado' });
  res.json({ message: 'Paciente excluído com sucesso' });
});
