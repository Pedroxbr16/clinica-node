const mongoose = require('mongoose');
const schemaOptions = require('../utils/schemaOptions');

const tipoConsultaSchema = new mongoose.Schema({
  descricao: { type: String, required: true, trim: true },
  valor: { type: Number, required: true, min: 0 },
}, schemaOptions);

module.exports = mongoose.model('TipoConsulta', tipoConsultaSchema);
