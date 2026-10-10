const historicoService = require('../services/historicoService');
const asyncHandler = require('../utils/asyncHandler');

exports.listarHistoricos = asyncHandler(async (_req, res) => res.json(await historicoService.list()));
exports.adicionarHistorico = asyncHandler(async (req, res) => {
  const { paciente_id, data_consulta, historico } = req.body;
  if (!paciente_id || !data_consulta || !historico) return res.status(400).json({ error: 'Paciente, data e histórico são obrigatórios.' });
  const registro = await historicoService.create({ paciente_id, data_consulta, historico });
  res.status(201).json({ id: registro.id, paciente_id, data_consulta, historico });
});
exports.atualizarHistorico = asyncHandler(async (req, res) => {
  const registro = await historicoService.update(req.params.id, req.body);
  if (!registro) return res.status(404).json({ error: 'Histórico não encontrado' });
  res.json(registro);
});
exports.excluirHistorico = asyncHandler(async (req, res) => {
  if (!await historicoService.remove(req.params.id)) return res.status(404).json({ error: 'Histórico não encontrado' });
  res.json({ message: 'Histórico excluído com sucesso' });
});
exports.buscarHistoricoPorPaciente = asyncHandler(async (req, res) => {
  const historicos = await historicoService.listByPaciente(req.params.pacienteId);
  if (!historicos.length) return res.status(404).json({ error: 'Nenhum histórico encontrado para este paciente' });
  res.json(historicos);
});
