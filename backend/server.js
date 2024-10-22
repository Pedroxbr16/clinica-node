const express = require('express');
const app = express();
const port = 5000;

// Configuração para permitir requisições do frontend
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Rota simples
app.get('/api', (req, res) => {
  res.json({ message: 'Hello from the backend!' });
});

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
