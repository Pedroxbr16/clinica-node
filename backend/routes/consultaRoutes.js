// routes/consultaRoutes.js
const express = require('express');
const router = express.Router();
const consultaController = require('../controllers/consultaController');

// Rota para criar uma nova consulta
router.post('/adiciona', consultaController.createConsulta);

// Rota para listar todas as consultas
router.get('/lista', consultaController.getConsultas);

// Rota para obter uma consulta por ID
router.get('/:id', consultaController.getConsultaById);

// Rota para atualizar uma consulta por ID
router.put('/:id', consultaController.updateConsulta);

// Rota para deletar uma consulta por ID
router.delete('/:id', consultaController.deleteConsulta);

module.exports = router;
