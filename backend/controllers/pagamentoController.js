const pagamentoService = require('../services/pagamentoService');
const asyncHandler = require('../utils/asyncHandler');

const valid = (data) => ['metodo', 'usuario_id', 'paciente_id', 'medico_id', 'tipo_consulta_id'].every((field) => data[field]);
exports.createPagamento = asyncHandler(async (req, res) => {
  if (!valid(req.body)) return res.status(400).json({ error: 'Todos os campos são obrigatórios: método, usuário, paciente, médico e tipo de consulta.' });
  const pagamento = await pagamentoService.create(req.body);
  res.status(201).json({ message: 'Pagamento criado com sucesso.', id: pagamento.id });
});
exports.getPagamentos = asyncHandler(async (_req, res) => res.json(await pagamentoService.list()));
exports.updatePagamento = asyncHandler(async (req, res) => {
  if (!valid(req.body)) return res.status(400).json({ error: 'Todos os campos são obrigatórios: método, usuário, paciente, médico e tipo de consulta.' });
  if (!await pagamentoService.update(req.params.id, req.body)) return res.status(404).json({ error: 'Pagamento não encontrado.' });
  res.json({ message: 'Pagamento atualizado com sucesso.' });
});
exports.deletePagamento = asyncHandler(async (req, res) => {
  if (!await pagamentoService.remove(req.params.id)) return res.status(404).json({ error: 'Pagamento não encontrado.' });
  res.json({ message: 'Pagamento deletado com sucesso.' });
});
