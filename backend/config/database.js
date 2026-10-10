const mongoose = require('mongoose');

const connectDatabase = async () => {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error('A variável MONGODB_URI é obrigatória.');

  mongoose.set('strictQuery', true);
  await mongoose.connect(uri);
  console.log(`Conectado ao MongoDB (${mongoose.connection.host}).`);
};

module.exports = connectDatabase;
