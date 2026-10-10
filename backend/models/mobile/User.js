const mongoose = require('mongoose');
const schemaOptions = require('../../utils/schemaOptions');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true, lowercase: true, unique: true },
  password: { type: String, required: true, select: false },
  cpf: String, data_de_nascimento: Date, genero: String,
}, schemaOptions);

module.exports = mongoose.model('MobileUser', userSchema);
