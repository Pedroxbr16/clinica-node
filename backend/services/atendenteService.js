const bcrypt = require('bcryptjs');
const Atendente = require('../models/atendenteModels');
const { omitUndefined } = require('../utils/normalizers');

const list = () => Atendente.find().select('-senha').sort({ usuario: 1 });
const findById = (id) => Atendente.findById(id).select('-senha');
const create = async (data) => Atendente.create({ ...data, senha: await bcrypt.hash(data.senha, 12) });
const update = async (id, data) => {
  const updateData = omitUndefined(data);
  if (updateData.senha) updateData.senha = await bcrypt.hash(updateData.senha, 12);
  return Atendente.findByIdAndUpdate(id, updateData, { new: true, runValidators: true }).select('-senha');
};
const remove = (id) => Atendente.findByIdAndDelete(id);
const authenticate = async (usuario, senha) => {
  const atendente = await Atendente.findOne({ usuario }).select('+senha');
  if (!atendente || !(await bcrypt.compare(senha, atendente.senha))) return null;
  return atendente;
};

module.exports = { list, findById, create, update, remove, authenticate };
