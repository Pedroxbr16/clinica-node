const mongoose = require('mongoose');
const schemaOptions = require('../utils/schemaOptions');

const historicoSchema = new mongoose.Schema({
  paciente_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Paciente', required: true },
  data_consulta: { type: Date, required: true },
  historico: { type: String, required: true, trim: true },
}, schemaOptions);

historicoSchema.index({ paciente_id: 1, data_consulta: -1 });
module.exports = mongoose.model('Historico', historicoSchema);
