const preAgendamentoService = require('../../services/preAgendamentoService');
const asyncHandler = require('../../utils/asyncHandler');

const PreAgendamentoController = {
  create: asyncHandler(async (req, res) => {
    const { userId, doctorId, tipoConsultaId, modalidade, date, phone } = req.body;
    if (!userId || !doctorId || !tipoConsultaId || !modalidade || !date || !phone) return res.status(400).json({ success: false, message: 'Todos os campos obrigatórios devem ser preenchidos.' });
    await preAgendamentoService.create(req.body);
    res.status(201).json({ success: true, message: 'Pré-agendamento criado com sucesso!' });
  }),
  list: asyncHandler(async (_req, res) => {
    const items = await preAgendamentoService.list();
    if (!items.length) return res.status(404).json({ success: false, message: 'Nenhum pré-agendamento encontrado.' });
    res.json({ success: true, data: items });
  }),
  findById: asyncHandler(async (req, res) => {
    const item = await preAgendamentoService.findById(req.params.id);
    if (!item) return res.status(404).json({ success: false, message: 'Pré-agendamento não encontrado.' });
    res.json({ success: true, data: item });
  }),
  update: asyncHandler(async (req, res) => {
    if (!await preAgendamentoService.update(req.params.id, req.body)) return res.status(404).json({ success: false, message: 'Pré-agendamento não encontrado.' });
    res.json({ success: true, message: 'Pré-agendamento atualizado com sucesso!' });
  }),
  delete: asyncHandler(async (req, res) => {
    if (!await preAgendamentoService.remove(req.params.id)) return res.status(404).json({ success: false, message: 'Pré-agendamento não encontrado.' });
    res.json({ success: true, message: 'Pré-agendamento deletado com sucesso!' });
  }),
  findByUserId: asyncHandler(async (req, res) => {
    const items = await preAgendamentoService.listByUser(req.params.userId);
    if (!items.length) return res.status(404).json({ success: false, message: 'Nenhum pré-agendamento encontrado para este usuário.' });
    res.json({ success: true, data: items });
  }),
};

module.exports = PreAgendamentoController;
