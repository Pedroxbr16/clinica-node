const express = require('express');
const path = require('path');
const cors = require('cors');
require('dotenv').config();

const connectDatabase = require('../config/database');
const { seedDatabase } = require('../data/seed');
const pacienteRoutes = require('../routes/pacienteRoutes');
const medicoRoutes = require('../routes/medicoRoutes');
const atendenteRoutes = require('../routes/atendenteRoutes');
const authRoutes = require('../routes/authRoutes');
const consultaRoutes = require('../routes/consultaRoutes');
const tipoConsultaRoutes = require('../routes/tipoConsultaRoutes');
const historicoRoutes = require('../routes/historicoRoutes');
const exameRoutes = require('../routes/ExameRoutes');
const usersRoutes = require('../routes/mobile/usersRoutes');
const preAgendamentoRoutes = require('../routes/mobile/preAgendamentoRoutes');
const pagamentoRoutes = require('../routes/pagamentosRoutes');
const financeController = require('../controllers/financeController');

const app = express();
const corsOrigins = (process.env.CORS_ORIGINS || 'http://localhost:3000').split(',');

app.use(express.json());
app.use(cors({
  origin: corsOrigins,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use((req, _res, next) => {
  console.log(`[${req.method}] ${req.url}`);
  next();
});
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

app.use('/pacientes', pacienteRoutes);
app.use('/medicos', medicoRoutes);
app.use('/atendente', atendenteRoutes);
app.use('/auth', authRoutes);
app.use('/consultas', consultaRoutes);
app.use('/tipos_consulta', tipoConsultaRoutes);
app.use('/historico', historicoRoutes);
app.use('/exames', exameRoutes);
app.use('/pagamentos', pagamentoRoutes);
app.use('/user', usersRoutes);
app.use('/pre-agendamentos', preAgendamentoRoutes);
app.get('/finance/dashboard', financeController.dashboard);
app.get('/health', (_req, res) => res.json({ status: 'ok' }));

app.use((error, _req, res, _next) => {
  console.error(error);
  if (error.name === 'CastError') return res.status(400).json({ error: 'ID inválido.' });
  if (error.name === 'ValidationError') return res.status(400).json({ error: error.message });
  if (error.code === 11000) return res.status(409).json({ error: 'Já existe um registro com este valor único.' });
  res.status(500).json({ error: 'Erro interno do servidor.' });
});

const PORT = process.env.PORT || 5000;
connectDatabase()
  .then(async () => {
    if (process.env.SEED_DATABASE !== 'false') {
      const result = await seedDatabase();
      if (result.seeded) console.log('Dados fictícios inseridos no primeiro uso.');
    }
    app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
  })
  .catch((error) => {
    console.error('Não foi possível iniciar o servidor:', error.message);
    process.exit(1);
  });
