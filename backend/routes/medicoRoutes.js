const express = require('express');
const router = express.Router();
const medicoController = require('../controllers/medicoController'); // Certifique-se de que o caminho está correto

// Rota para criar um médico
router.post('/medicos', medicoController.createMedico);

// Rota para listar todos os médicos
router.get('/medicos', medicoController.getMedicos);

module.exports = router;
