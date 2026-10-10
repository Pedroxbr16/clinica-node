require('dotenv').config();

const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const connectDatabase = require('../config/database');
const fakeData = require('./fakeData');
const Atendente = require('../models/atendenteModels');
const Paciente = require('../models/pacienteModel');
const Medico = require('../models/medicoModels');
const TipoConsulta = require('../models/tipoConsultaModel');
const Exame = require('../models/ExameModels');
const Consulta = require('../models/consultaModels');
const Pagamento = require('../models/pagamentoModel');
const Historico = require('../models/historicoModel');
const MobileUser = require('../models/mobile/User');
const PreAgendamento = require('../models/mobile/preAgendamentoModel');

const models = [
  Atendente, Paciente, Medico, TipoConsulta, Exame, Consulta,
  Pagamento, Historico, MobileUser, PreAgendamento,
];

const databaseIsEmpty = async () => {
  const counts = await Promise.all(models.map((model) => model.countDocuments()));
  return counts.every((count) => count === 0);
};

const appointmentDate = (daysFromToday, hour) => {
  const date = new Date();
  date.setDate(date.getDate() + daysFromToday);
  date.setHours(hour, 0, 0, 0);
  return date;
};

const seedDatabase = async () => {
  if (!await databaseIsEmpty()) {
    return { seeded: false, reason: 'Banco já contém dados.' };
  }

  const [adminPassword, recepcaoPassword, mobilePassword] = await Promise.all([
    bcrypt.hash(fakeData.atendentes[0].senha, 12),
    bcrypt.hash(fakeData.atendentes[1].senha, 12),
    bcrypt.hash(fakeData.mobileUser.password, 12),
  ]);
  const atendentes = await Atendente.create([
    { ...fakeData.atendentes[0], senha: adminPassword },
    { ...fakeData.atendentes[1], senha: recepcaoPassword },
  ]);
  const pacientes = await Paciente.create(fakeData.pacientes);
  const medicos = await Medico.create(fakeData.medicos);
  const tiposConsulta = await TipoConsulta.create(fakeData.tiposConsulta);
  await Exame.create(fakeData.exames);
  const mobileUser = await MobileUser.create({ ...fakeData.mobileUser, password: mobilePassword });

  const consultaAnterior = appointmentDate(-3, 9);
  const consultaHoje = appointmentDate(0, 10);
  const consultaFutura = appointmentDate(7, 14);
  await Consulta.create([
    {
      titulo: 'Consulta clínica — Maria da Silva', inicio: consultaAnterior,
      fim: new Date(consultaAnterior.getTime() + 60 * 60 * 1000), paciente_id: pacientes[0]._id,
      medico_id: medicos[0]._id, tipo_consulta_id: tiposConsulta[0]._id, modalidade: 'Presencial',
    },
    {
      titulo: 'Retorno — João Pereira', inicio: consultaHoje,
      fim: new Date(consultaHoje.getTime() + 30 * 60 * 1000), paciente_id: pacientes[1]._id,
      medico_id: medicos[1]._id, tipo_consulta_id: tiposConsulta[1]._id, modalidade: 'Presencial',
    },
    {
      titulo: 'Teleconsulta — Maria da Silva', inicio: consultaFutura,
      fim: new Date(consultaFutura.getTime() + 45 * 60 * 1000), paciente_id: pacientes[0]._id,
      medico_id: medicos[0]._id, tipo_consulta_id: tiposConsulta[2]._id, modalidade: 'Online',
    },
  ]);
  await Historico.create({
    paciente_id: pacientes[0]._id, data_consulta: consultaAnterior,
    historico: 'Paciente relatou melhora dos sintomas. Manter acompanhamento.',
  });
  await Pagamento.create({
    metodo: 'Cartão', data: consultaAnterior, usuario_id: atendentes[1]._id,
    paciente_id: pacientes[0]._id, medico_id: medicos[0]._id, tipo_consulta_id: tiposConsulta[0]._id,
  });
  await PreAgendamento.create({
    user_id: mobileUser._id, medico_id: medicos[0]._id, tipo_consulta_id: tiposConsulta[2]._id,
    email: mobileUser.email, telefone: '11999990003', modalidade: 'Online',
    data_desejada: appointmentDate(10, 15), status: 'Pendente',
  });

  return { seeded: true };
};

const runFromCli = async () => {
  try {
    await connectDatabase();
    const result = await seedDatabase();
    console.log(result.seeded ? 'Dados fictícios criados com sucesso.' : result.reason);
  } finally {
    await mongoose.disconnect();
  }
};

if (require.main === module) {
  runFromCli().catch((error) => {
    console.error('Erro ao inserir dados fictícios:', error);
    process.exitCode = 1;
  });
}

module.exports = { seedDatabase };
