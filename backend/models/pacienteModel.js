const mongoose = require('mongoose');
const schemaOptions = require('../utils/schemaOptions');

const pacienteSchema = new mongoose.Schema({
  nome: { type: String, required: true, trim: true }, cep: String, numero: String,
  bairro: String, cidade: String, estado: String,
  cpf: { type: String, required: true, unique: true }, cnpj: String, nascimento: Date,
  genero: String, email: { type: String, trim: true, lowercase: true }, telefone: String,
  celular: String, foto: String,
}, schemaOptions);

module.exports = mongoose.model('Paciente', pacienteSchema);
