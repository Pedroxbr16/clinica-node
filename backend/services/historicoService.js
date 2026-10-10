const Historico = require('../models/historicoModel');

const list = () => Historico.find().sort({ data_consulta: -1 });
const listByPaciente = (pacienteId) => Historico.find({ paciente_id: pacienteId }).sort({ data_consulta: -1 });
const create = (data) => Historico.create(data);
const update = (id, data) => Historico.findByIdAndUpdate(id, data, { new: true, runValidators: true });
const remove = (id) => Historico.findByIdAndDelete(id);

module.exports = { list, listByPaciente, create, update, remove };
