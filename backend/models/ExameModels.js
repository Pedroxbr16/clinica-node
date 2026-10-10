const mongoose = require('mongoose');
const schemaOptions = require('../utils/schemaOptions');

const exameSchema = new mongoose.Schema({
  nome: { type: String, required: true, trim: true, unique: true },
}, schemaOptions);

module.exports = mongoose.model('Exame', exameSchema);
