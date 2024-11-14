// routes/exameRoutes.js
const express = require('express');
const exameController = require('../controllers/ExameController');

const router = express.Router();

// Rota para listar todos os exames
router.get('/exames', exameController.listarExames);

// Rota para adicionar um exame
router.post('/exames', exameController.adicionarExame);

// Rota para atualizar um exame
router.put('/exames/:id', exameController.atualizarExame);

// Rota para excluir um exame
router.delete('/exames/:id', exameController.excluirExame);

module.exports = router;
