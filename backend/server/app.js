const express = require('express');
const path = require('path');
const pacienteRoutes = require('../routes/pacienteRoutes'); 
const medicoRoutes = require('../routes/medicoRoutes');
const atendenteRoutes = require('../routes/atendenteRoutes');
const cors = require('cors');

const app = express();

// Middleware para parsear JSON
app.use(express.json());

// Configuração do CORS 
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

// Iniciar o servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
