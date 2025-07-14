const express = require('express');
const router = express.Router();
const consultaController = require('../controllers/consultaController');

// Rota para criar uma nova consulta
router.post('/criar', consultaController.createConsulta);

// Rota para listar todas as consultas
router.get('/lista', consultaController.getConsultas);

// Rota para obter uma consulta por ID
router.get('/buscar/:id', consultaController.getConsultaById);

// Rota para atualizar uma consulta por ID
router.put('atualizar/:id', consultaController.updateConsulta);

// Rota para deletar uma consulta por ID
router.delete('excluir/:id', consultaController.deleteConsulta);

// Rota para obter horários disponíveis
router.get('/horarios', consultaController.getHorariosDisponiveis);

module.exports = router;
