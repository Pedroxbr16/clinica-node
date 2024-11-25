const express = require('express');
const PreAgendamentoController = require('../../controllers/mobile/PreAgendamentoController');

const router = express.Router();

// Rotas de pré-agendamento
router.post('/criar', PreAgendamentoController.create); // Criar um pré-agendamento
router.get('/listar', PreAgendamentoController.list); // Listar todos os pré-agendamentos
router.get('/buscar/:id', PreAgendamentoController.findById); // Buscar pré-agendamento por ID
router.put('/atualizar/:id', PreAgendamentoController.update); // Atualizar pré-agendamento por ID
router.delete('/deletar/:id', PreAgendamentoController.delete); // Deletar pré-agendamento por ID
router.get('/usuario/:userId', PreAgendamentoController.findByUserId); // Buscar pré-agendamentos por usuário

module.exports = router;
