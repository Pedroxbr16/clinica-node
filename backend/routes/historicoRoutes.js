const express = require('express');
const historicoController = require('../controllers/historicoController');

const router = express.Router();

// Rota para listar todos os históricos
router.get('/historicos', historicoController.listarHistoricos);

// Rota para adicionar um histórico
router.post('/historicos', historicoController.adicionarHistorico);

// Rota para atualizar um histórico
router.put('/historicos/:id', historicoController.atualizarHistorico);

// Rota para excluir um histórico
router.delete('/historicos/:id', historicoController.excluirHistorico);

module.exports = router;
