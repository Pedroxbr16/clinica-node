const Paciente = require('../models/pacienteModel');
const { onlyDigits, omitUndefined } = require('../utils/normalizers');

const list = () => Paciente.find().sort({ nome: 1 });
const findById = (id) => Paciente.findById(id);
const findByCpf = (cpf) => Paciente.findOne({ cpf: onlyDigits(cpf) });
const create = (data) => Paciente.create({ ...data, cpf: onlyDigits(data.cpf) });
const update = (id, data) => {
  const normalized = omitUndefined(data);
  if (normalized.cpf !== undefined) normalized.cpf = onlyDigits(normalized.cpf);
  return Paciente.findByIdAndUpdate(id, normalized, { new: true, runValidators: true });
};
const remove = (id) => Paciente.findByIdAndDelete(id);

module.exports = { list, findById, findByCpf, create, update, remove };
