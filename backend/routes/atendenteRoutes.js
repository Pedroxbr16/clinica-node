const express = require('express');
const router = express.Router();
const atendenteController = require('../controllers/atendenteController');

// Rota para criar um novo atendente
router.post('/atendente', atendenteController.criarAtendente);

// Rota para listar todos os atendentes
router.get('/atendente', atendenteController.listarAtendentes);

// Rota para buscar um atendente específico
router.get('/atendente/:id', atendenteController.buscarAtendentePorId);

// Rota para atualizar um atendente
router.put('/atendente/:id', atendenteController.atualizarAtendente);

// Rota para excluir um atendente
router.delete('/atendente/:id', atendenteController.excluirAtendente);

module.exports = router;
