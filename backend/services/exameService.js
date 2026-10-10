const Exame = require('../models/ExameModels');

const list = () => Exame.find().sort({ nome: 1 });
const create = (nome) => Exame.create({ nome });
const update = (id, nome) => Exame.findByIdAndUpdate(id, { nome }, { new: true, runValidators: true });
const remove = (id) => Exame.findByIdAndDelete(id);

module.exports = { list, create, update, remove };
