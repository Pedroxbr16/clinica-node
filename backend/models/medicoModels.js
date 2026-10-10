const mongoose = require('mongoose');
const schemaOptions = require('../utils/schemaOptions');

const medicoSchema = new mongoose.Schema({
  usuario: { type: String, required: true, trim: true },
  crm: { type: String, required: true, trim: true, unique: true }, data_nascimento: Date,
  email: { type: String, trim: true, lowercase: true }, celular: String, cpf: String,
  cep: String, numero: String, bairro: String, cidade: String, estado: String,
}, schemaOptions);

module.exports = mongoose.model('Medico', medicoSchema);
