const express = require('express');
const bodyParser = require('body-parser');
const pacienteRoutes = require('../routes/pacienteRoutes'); // Importar as rotas dos pacientes
const path = require('path');

const app = express();
const port = 5000;

// Middlewares
app.use(bodyParser.json()); // Middleware para processar JSON
app.use(bodyParser.urlencoded({ extended: true })); // Para processar dados de formulários

// Servir arquivos estáticos, como fotos enviadas
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); 

// Rotas
app.use('/api', pacienteRoutes); // Usar as rotas definidas no arquivo pacienteRoutes

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
