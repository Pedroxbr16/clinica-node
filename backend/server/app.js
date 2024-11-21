const express = require('express');
const path = require('path');
const pacienteRoutes = require('../routes/pacienteRoutes'); 
const medicoRoutes = require('../routes/medicoRoutes');
const atendenteRoutes = require('../routes/atendenteRoutes');
const authRoutes = require('../routes/authRoutes');
const consultaRoutes = require('../routes/consultaRoutes');
const tipoConsultaRoutes = require('../routes/tipoConsultaRoutes');
const historicoRoutes = require('../routes/historicoRoutes');
const Exames = require('../routes/ExameRoutes');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');

// Criação da aplicação e do servidor HTTP
const app = express();
const server = http.createServer(app);

// Configuração do Socket.IO com CORS
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000', // URL do seu frontend
    methods: ['GET', 'POST']
  }
});

// Middleware para parsear JSON
app.use(express.json());
  
// Configuração do CORS para requisições HTTP
app.use(cors({
  origin: 'http://localhost:3000', // URL do seu frontend
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
app.use('/consultas', consultaRoutes);
app.use('/tipos_consulta', tipoConsultaRoutes);
app.use('/historico', historicoRoutes);
app.use('/exames', Exames);

// Configuração do WebRTC com Socket.IO
io.on('connection', (socket) => {
  console.log('Usuário conectado:', socket.id);

  // Evento para criar ou entrar em uma sala
  socket.on('join-room', (roomId) => {
    socket.join(roomId);
    console.log(`Usuário ${socket.id} entrou na sala: ${roomId}`);
    socket.to(roomId).emit('user-connected', socket.id);
  });

  // Evento para troca de sinalização WebRTC
  socket.on('signal', ({ roomId, data }) => {
    socket.to(roomId).emit('signal', data);
  });

  // Evento para desconexão
  socket.on('disconnect', () => {
    console.log('Usuário desconectado:', socket.id);
  });
});

// Iniciar o servidor
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
