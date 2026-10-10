const Medico = require('../models/medicoModels');
const { omitUndefined } = require('../utils/normalizers');

const list = () => Medico.find().sort({ usuario: 1 });
const findById = (id) => Medico.findById(id);
const create = (data) => Medico.create(data);
const update = (id, data) => Medico.findByIdAndUpdate(id, omitUndefined(data), { new: true, runValidators: true });
const remove = (id) => Medico.findByIdAndDelete(id);

module.exports = { list, findById, create, update, remove };
