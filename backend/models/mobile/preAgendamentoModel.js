const mongoose = require('mongoose');
const schemaOptions = require('../../utils/schemaOptions');

const preAgendamentoSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'MobileUser', required: true },
  medico_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Medico', required: true },
  tipo_consulta_id: { type: mongoose.Schema.Types.ObjectId, ref: 'TipoConsulta', required: true },
  email: { type: String, trim: true, lowercase: true },
  telefone: { type: String, required: true }, modalidade: { type: String, required: true, trim: true },
  data_desejada: { type: Date, required: true }, status: { type: String, default: 'Pendente', trim: true },
}, schemaOptions);

preAgendamentoSchema.index({ user_id: 1, data_desejada: -1 });
module.exports = mongoose.model('PreAgendamento', preAgendamentoSchema);
