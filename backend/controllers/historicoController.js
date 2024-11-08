const HistoricoModel = require('../models/historicoModel');

// Adiciona um novo registro de histórico
exports.createHistorico = async (req, res) => {
    try {
        const { pacienteId, descricao } = req.body;
        const historicoId = await HistoricoModel.createHistorico(pacienteId, descricao);
        res.status(201).json({ id: historicoId, message: 'Histórico adicionado com sucesso!' });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao adicionar histórico: ' + error.message });
    }
};

// Obtém o histórico de um paciente específico
exports.getHistoricoByPacienteId = async (req, res) => {
    try {
        const { pacienteId } = req.params;
        const historico = await HistoricoModel.getHistoricoByPacienteId(pacienteId);
        res.status(200).json(historico);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao obter histórico: ' + error.message });
    }
};
