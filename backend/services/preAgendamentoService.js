const PreAgendamento = require('../models/mobile/preAgendamentoModel');
const { omitUndefined } = require('../utils/normalizers');

const populate = (query) => query
  .populate('user_id', 'name')
  .populate('medico_id', 'usuario')
  .populate('tipo_consulta_id', 'descricao');

const format = (agendamento) => ({
  id: agendamento.id,
  user_id: agendamento.user_id?.id || agendamento.user_id,
  nome: agendamento.user_id?.name,
  medico_id: agendamento.medico_id?.id || agendamento.medico_id,
  medico_nome: agendamento.medico_id?.usuario,
  tipo_consulta_id: agendamento.tipo_consulta_id?.id || agendamento.tipo_consulta_id,
  tipo_consulta: agendamento.tipo_consulta_id?.descricao,
  email: agendamento.email, telefone: agendamento.telefone, modalidade: agendamento.modalidade,
  data_desejada: agendamento.data_desejada, status: agendamento.status,
});
const list = async () => (await populate(PreAgendamento.find().sort({ data_desejada: -1 }))).map(format);
const findById = async (id) => {
  const agendamento = await populate(PreAgendamento.findById(id));
  return agendamento ? format(agendamento) : null;
};
const listByUser = async (userId) => (await populate(
  PreAgendamento.find({ user_id: userId }).sort({ data_desejada: -1 }),
)).map(format);
const create = ({ userId, doctorId, tipoConsultaId, email, phone, modalidade, date }) => PreAgendamento.create({
  user_id: userId, medico_id: doctorId, tipo_consulta_id: tipoConsultaId, email,
  telefone: phone, modalidade, data_desejada: date,
});
const update = (id, data) => {
  const aliases = { userId: 'user_id', doctorId: 'medico_id', tipoConsultaId: 'tipo_consulta_id', phone: 'telefone', date: 'data_desejada' };
  const normalized = Object.fromEntries(Object.entries(omitUndefined(data)).map(([key, value]) => [aliases[key] || key, value]));
  return PreAgendamento.findByIdAndUpdate(id, normalized, { new: true, runValidators: true });
};
const remove = (id) => PreAgendamento.findByIdAndDelete(id);

module.exports = { list, findById, listByUser, create, update, remove };
