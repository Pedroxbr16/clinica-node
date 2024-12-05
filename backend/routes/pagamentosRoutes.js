const express = require('express');
const router = express.Router();
const pagamentoController = require('../controllers/pagamentoController');

// Rotas para pagamento
router.get('/buscar', pagamentoController.getPagamentos); // Lista todos os pagamentos
router.post('/criar', pagamentoController.createPagamento); // Cria um novo pagamento
router.put('/:id', pagamentoController.updatePagamento); // Atualiza um pagamento pelo ID
router.delete('/:id', pagamentoController.deletePagamento); // Deleta um pagamento pelo ID

module.exports = router;
