const express = require('express');
const router = express.Router();
const atendenteController = require('../controllers/atendenteController');

// Rota para criar um novo atendente
router.post('/criar', atendenteController.criarAtendente);

// Rota para listar todos os atendentes
router.get('/listar', atendenteController.listarAtendentes);

// Rota para buscar um atendente específico
router.get('/buscar/:id', atendenteController.buscarAtendentePorId);

// Rota para atualizar um atendente
router.put('/atualizar/:id', atendenteController.atualizarAtendente);

// Rota para excluir um atendente
router.delete('/excluir/:id', atendenteController.excluirAtendente);

module.exports = router;
