const express = require('express');
const path = require('path');
const cors = require('cors');
require('dotenv').config(); // Carrega as variáveis do .env

const pacienteRoutes = require('../routes/pacienteRoutes'); 
const medicoRoutes = require('../routes/medicoRoutes');
const atendenteRoutes = require('../routes/atendenteRoutes');
const authRoutes = require('../routes/authRoutes');
const consultaRoutes = require('../routes/consultaRoutes');
const tipoConsultaRoutes = require('../routes/tipoConsultaRoutes');
const historicoRoutes = require('../routes/historicoRoutes');
const Exames = require('../routes/ExameRoutes');
const users = require('../routes/mobile/usersRoutes');
const preAgendamentoRoutes = require('../routes/mobile/preAgendamentoRoutes');
const pagamentoRoutes = require('../routes/pagamentosRoutes');

const app = express();

// Middleware para parsear JSON
app.use(express.json());

// Configuração do CORS
const corsOrigins = process.env.CORS_ORIGINS.split(','); // Divide as origens configuradas no .env
app.use(cors({
  origin: corsOrigins,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Middleware para servir arquivos estáticos
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Rotas
app.use('/pacientes', pacienteRoutes);
app.use('/medicos', medicoRoutes);
app.use('/atendente', atendenteRoutes);
app.use('/api', authRoutes);
app.use('/consultas', consultaRoutes);
app.use('/tipos_consulta', tipoConsultaRoutes);
app.use('/historico', historicoRoutes);
app.use('/exames', Exames);
app.use('/pagamentos', pagamentoRoutes);

// rotas do mobile
app.use('/user', users);
app.use('/pre-agendamentos', preAgendamentoRoutes);

// Iniciar o servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

// Logger básico de requisições
app.use((req, res, next) => {
  console.log(`[${req.method}] ${req.url}`);
  next();
});
