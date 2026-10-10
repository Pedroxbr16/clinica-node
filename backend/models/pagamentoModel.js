const mongoose = require('mongoose');
const schemaOptions = require('../utils/schemaOptions');

const pagamentoSchema = new mongoose.Schema({
  metodo: { type: String, required: true, trim: true }, data: { type: Date, default: Date.now },
  usuario_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Atendente', required: true },
  paciente_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Paciente', required: true },
  medico_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Medico', required: true },
  tipo_consulta_id: { type: mongoose.Schema.Types.ObjectId, ref: 'TipoConsulta', required: true },
}, schemaOptions);

module.exports = mongoose.model('Pagamento', pagamentoSchema);
