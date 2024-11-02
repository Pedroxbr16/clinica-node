// routes/atendenteRoutes.js
const express = require('express');
const router = express.Router();
const atendenteController = require('../controllers/atendenteController');

// Rota para criar um novo atendente
router.post('/atendente', atendenteController.criarAtendente);

// Rota para listar todos os atendentes
router.get('/atendente', atendenteController.listarAtendentes);

module.exports = router;
