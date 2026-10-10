const mongoose = require('mongoose');
const schemaOptions = require('../utils/schemaOptions');

const atendenteSchema = new mongoose.Schema({
  usuario: { type: String, required: true, trim: true },
  senha: { type: String, required: true, select: false },
  email: { type: String, required: true, trim: true, lowercase: true, unique: true },
  funcao: { type: String, required: true, trim: true },
}, schemaOptions);

module.exports = mongoose.model('Atendente', atendenteSchema);
