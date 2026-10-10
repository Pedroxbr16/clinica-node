const TipoConsulta = require('../models/tipoConsultaModel');

const list = () => TipoConsulta.find().sort({ descricao: 1 });
const findById = (id) => TipoConsulta.findById(id);
const create = ({ descricao, valor }) => TipoConsulta.create({ descricao, valor: Number(valor) });
const update = (id, { descricao, valor }) => TipoConsulta.findByIdAndUpdate(
  id, { descricao, valor: Number(valor) }, { new: true, runValidators: true },
);
const remove = (id) => TipoConsulta.findByIdAndDelete(id);

module.exports = { list, findById, create, update, remove };
