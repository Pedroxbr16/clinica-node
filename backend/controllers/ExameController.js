const exameService = require('../services/exameService');
const asyncHandler = require('../utils/asyncHandler');

exports.listarExames = asyncHandler(async (_req, res) => res.json(await exameService.list()));
exports.adicionarExame = asyncHandler(async (req, res) => {
  if (!req.body.nome?.trim()) return res.status(400).json({ error: 'Nome é obrigatório.' });
  const exame = await exameService.create(req.body.nome);
  res.status(201).json({ id: exame.id, nome: exame.nome });
});
exports.atualizarExame = asyncHandler(async (req, res) => {
  if (!req.body.nome?.trim()) return res.status(400).json({ error: 'Nome é obrigatório.' });
  const exame = await exameService.update(req.params.id, req.body.nome);
  if (!exame) return res.status(404).json({ error: 'Exame não encontrado' });
  res.json({ id: exame.id, nome: exame.nome });
});
exports.excluirExame = asyncHandler(async (req, res) => {
  if (!await exameService.remove(req.params.id)) return res.status(404).json({ error: 'Exame não encontrado' });
  res.json({ message: 'Exame excluído com sucesso' });
});
