const tipoConsultaService = require('../services/tipoConsultaService');
const asyncHandler = require('../utils/asyncHandler');

const valid = ({ descricao, valor }) => typeof descricao === 'string' && descricao.trim() && valor !== undefined && !Number.isNaN(Number(valor));
exports.createTipoConsulta = asyncHandler(async (req, res) => {
  if (!valid(req.body)) return res.status(400).json({ error: 'Descrição e valor válidos são obrigatórios.' });
  const tipo = await tipoConsultaService.create(req.body);
  res.status(201).json({ message: 'Tipo de consulta criado com sucesso!', id: tipo.id });
});
exports.getTiposConsulta = asyncHandler(async (_req, res) => res.json(await tipoConsultaService.list()));
exports.getTipoConsultaById = asyncHandler(async (req, res) => {
  const tipo = await tipoConsultaService.findById(req.params.id);
  if (!tipo) return res.status(404).json({ message: 'Tipo de consulta não encontrado' });
  res.json(tipo);
});
exports.updateTipoConsulta = asyncHandler(async (req, res) => {
  if (!valid(req.body)) return res.status(400).json({ error: 'Descrição e valor válidos são obrigatórios.' });
  const tipo = await tipoConsultaService.update(req.params.id, req.body);
  if (!tipo) return res.status(404).json({ error: 'Tipo de consulta não encontrado.' });
  res.json({ message: 'Tipo de consulta atualizado com sucesso!' });
});
exports.deleteTipoConsulta = asyncHandler(async (req, res) => {
  if (!await tipoConsultaService.remove(req.params.id)) return res.status(404).json({ message: 'Tipo de consulta não encontrado' });
  res.json({ message: 'Tipo de consulta deletado com sucesso!' });
});
