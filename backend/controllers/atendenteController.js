const atendenteService = require('../services/atendenteService');
const asyncHandler = require('../utils/asyncHandler');

const required = (data, fields) => fields.every((field) => data[field]);

exports.criarAtendente = asyncHandler(async (req, res) => {
  if (!required(req.body, ['usuario', 'senha', 'email', 'funcao'])) return res.status(400).json({ mensagem: 'Todos os campos (usuario, senha, email, funcao) são obrigatórios.' });
  const atendente = await atendenteService.create(req.body);
  res.status(201).json({ mensagem: 'Atendente criado com sucesso!', atendenteId: atendente.id });
});
exports.listarAtendentes = asyncHandler(async (_req, res) => res.json(await atendenteService.list()));
exports.buscarAtendentePorId = asyncHandler(async (req, res) => {
  const atendente = await atendenteService.findById(req.params.id);
  if (!atendente) return res.status(404).json({ mensagem: 'Atendente não encontrado.' });
  res.json(atendente);
});
exports.atualizarAtendente = asyncHandler(async (req, res) => {
  if (!required(req.body, ['usuario', 'email', 'funcao'])) return res.status(400).json({ mensagem: 'Os campos (usuario, email, funcao) são obrigatórios.' });
  const atendente = await atendenteService.update(req.params.id, req.body);
  if (!atendente) return res.status(404).json({ mensagem: 'Atendente não encontrado.' });
  res.json({ mensagem: 'Atendente atualizado com sucesso!' });
});
exports.excluirAtendente = asyncHandler(async (req, res) => {
  if (!await atendenteService.remove(req.params.id)) return res.status(404).json({ mensagem: 'Atendente não encontrado.' });
  res.json({ mensagem: 'Atendente excluído com sucesso!' });
});
