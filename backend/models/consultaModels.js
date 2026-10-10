const mongoose = require('mongoose');
const schemaOptions = require('../utils/schemaOptions');

const consultaSchema = new mongoose.Schema({
  titulo: { type: String, required: true, trim: true },
  inicio: { type: Date, required: true }, fim: { type: Date, required: true },
  paciente_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Paciente', required: true },
  medico_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Medico', required: true },
  tipo_consulta_id: { type: mongoose.Schema.Types.ObjectId, ref: 'TipoConsulta', required: true },
  modalidade: { type: String, required: true, trim: true },
}, schemaOptions);

consultaSchema.index({ medico_id: 1, inicio: 1 });
module.exports = mongoose.model('Consulta', consultaSchema);
