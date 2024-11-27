  // app.js ou outro nome do seu arquivo principal
  const express = require('express');
  const path = require('path');
  const pacienteRoutes = require('../routes/pacienteRoutes'); 
  const medicoRoutes = require('../routes/medicoRoutes');
  const atendenteRoutes = require('../routes/atendenteRoutes');
  const authRoutes = require('../routes/authRoutes');
  const consultaRoutes = require('../routes/consultaRoutes'); // Importando a rota de consulta
  const tipoConsultaRoutes = require('../routes/tipoConsultaRoutes'); // Importe a nova rota
  const historicoRoutes = require('../routes/historicoRoutes');
  const Exames = require('../routes/ExameRoutes');
  const users = require('../routes/mobile/usersRoutes');
  const preAgendamentoRoutes = require('../routes/mobile/preAgendamentoRoutes');
  const cors = require('cors');

  const app = express();

  // Middleware para parsear JSON
  app.use(express.json());
    
  // Configuração do CORS 
  app.use(cors({
    origin:[ 'http://localhost:8081',
      'http://localhost:8081',
      'exp://192.168.1.3:8081',
      'exp://192.168.27.163:8081',
      'http://localhost:3000',
      'http://localhost:3001',
      'http://192.168.1.8',
      'exp://192.168.1.8:8081'
    ],// Caso esteja usando Expo Go no dispositivo // URL do seu frontend
    methods: ['GET', 'POST','PUT','DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
  }));

  // Middleware para servir arquivos estáticos
  app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

  // Rotas
  app.use('/pacientes', pacienteRoutes);
  app.use('/medicos', medicoRoutes);
  app.use('/atendente', atendenteRoutes);
  app.use('/api', authRoutes);
  app.use('/consultas', consultaRoutes); // Usando a rota de consulta
  app.use('/tipos_consulta', tipoConsultaRoutes); // Use a rota para tipos de consulta
  app.use('/historico', historicoRoutes);
  app.use('/exames', Exames);
  // rotas do mobile
  app.use('/user',  users);
  app.use('/pre-agendamentos', preAgendamentoRoutes);

  // Iniciar o servidor
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });

  app.use((req, res, next) => {
    console.log(`[${req.method}] ${req.url}`);
    next();
  });
  