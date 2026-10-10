const Consulta = require('../models/consultaModels');
const TipoConsulta = require('../models/tipoConsultaModel');

const list = () => Consulta.find().sort({ inicio: 1 });
const findById = (id) => Consulta.findById(id);
const create = (data) => Consulta.create(data);
const update = (id, data) => Consulta.findByIdAndUpdate(id, data, { new: true, runValidators: true });
const remove = (id) => Consulta.findByIdAndDelete(id);
const findTipoConsulta = (id) => TipoConsulta.findById(id);

const getHorariosOcupados = async (medicoId, date) => {
  const start = new Date(`${date}T00:00:00.000`);
  const end = new Date(`${date}T23:59:59.999`);
  const consultas = await Consulta.find({ medico_id: medicoId, inicio: { $gte: start, $lte: end } }).select('inicio');
  return consultas.map(({ inicio }) => inicio.toLocaleTimeString('pt-BR', {
    hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'America/Sao_Paulo',
  }));
};

module.exports = { list, findById, create, update, remove, findTipoConsulta, getHorariosOcupados };
