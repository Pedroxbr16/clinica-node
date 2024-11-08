const express = require('express');
const router = express.Router();
const historicoController = require('../controllers/historicoController');

// Rota para adicionar um novo histórico
router.post('/adicionar', historicoController.createHistorico);

// Rota para obter o histórico de um paciente específico
router.get('/paciente/:pacienteId', historicoController.getHistoricoByPacienteId);

module.exports = router;
