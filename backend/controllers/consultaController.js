const ConsultaModel = require('../models/consultaModels');

// Cria uma nova consulta

exports.createConsulta = async (req, res) => {
    try {
        const consultaId = await ConsultaModel.createConsulta(req.body);
        res.status(201).json({ id: consultaId });
    } catch (error) {
        // Se o erro for de duplicação, trata de forma especial
        if (error.message.includes('Já existe uma consulta agendada')) {
            return res.status(400).json({ error: error.message });
        }
        res.status(500).json({ error: 'Erro ao criar consulta' });
    }
};

// Obtém todas as consultas
exports.getConsultas = async (req, res) => {
    try {
        const consultas = await ConsultaModel.getConsultas();
        res.status(200).json(consultas);
    } catch (error) {
        console.error('Erro no controlador ao obter consultas:', error);
        res.status(500).json({ error: 'Erro ao obter consultas' });
    }
};

// Obtém uma consulta por ID
exports.getConsultaById = async (req, res) => {
    try {
        const consulta = await ConsultaModel.getConsultaById(req.params.id);
        if (consulta) {
            res.status(200).json(consulta);
        } else {
            res.status(404).json({ message: 'Consulta não encontrada' });
        }
    } catch (error) {
        console.error(`Erro no controlador ao obter consulta com ID ${req.params.id}:`, error);
        res.status(500).json({ error: 'Erro ao obter consulta' });
    }
};

// Atualiza uma consulta por ID
exports.updateConsulta = async (req, res) => {
    try {
        const success = await ConsultaModel.updateConsulta(req.params.id, req.body);
        if (success) {
            res.status(200).json({ message: 'Consulta atualizada com sucesso' });
        } else {
            res.status(404).json({ message: 'Consulta não encontrada' });
        }
    } catch (error) {
        console.error(`Erro no controlador ao atualizar consulta com ID ${req.params.id}:`, error);
        res.status(500).json({ error: 'Erro ao atualizar consulta' });
    }
};

// Deleta uma consulta por ID
exports.deleteConsulta = async (req, res) => {
    try {
        const success = await ConsultaModel.deleteConsulta(req.params.id);
        if (success) {
            res.status(204).send();
        } else {
            res.status(404).json({ message: 'Consulta não encontrada' });
        }
    } catch (error) {
        console.error(`Erro no controlador ao deletar consulta com ID ${req.params.id}:`, error);
        res.status(500).json({ error: 'Erro ao deletar consulta' });
    }
};
