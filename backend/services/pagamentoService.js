const Pagamento = require('../models/pagamentoModel');

const list = async () => {
  const pagamentos = await Pagamento.find()
    .populate('usuario_id', 'usuario')
    .populate('paciente_id', 'nome')
    .populate('medico_id', 'usuario')
    .populate('tipo_consulta_id', 'descricao')
    .sort({ data: -1 });

  return pagamentos.map((pagamento) => ({
    id: pagamento.id,
    metodo: pagamento.metodo,
    data: pagamento.data,
    usuario_nome: pagamento.usuario_id?.usuario,
    paciente_nome: pagamento.paciente_id?.nome,
    medico_nome: pagamento.medico_id?.usuario,
    tipo_consulta: pagamento.tipo_consulta_id?.descricao,
  }));
};
const create = (data) => Pagamento.create(data);
const update = (id, data) => Pagamento.findByIdAndUpdate(id, data, { new: true, runValidators: true });
const remove = (id) => Pagamento.findByIdAndDelete(id);

module.exports = { list, create, update, remove };
