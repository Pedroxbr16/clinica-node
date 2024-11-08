
const ConsultaModel = require('../models/consultaModels');

exports.createConsulta = async (req, res) => {
    try {
        const consultaId = await ConsultaModel.createConsulta(req.body);
        res.status(201).json({ id: consultaId });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getConsultas = async (req, res) => {
    try {
        const consultas = await ConsultaModel.getConsultas();
        res.status(200).json(consultas);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getConsultaById = async (req, res) => {
    try {
        const consulta = await ConsultaModel.getConsultaById(req.params.id);
        if (consulta) {
            res.status(200).json(consulta);
        } else {
            res.status(404).json({ message: 'Consulta não encontrada' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateConsulta = async (req, res) => {
    try {
        const success = await ConsultaModel.updateConsulta(req.params.id, req.body);
        if (success) {
            res.status(200).json({ message: 'Consulta atualizada com sucesso' });
        } else {
            res.status(404).json({ message: 'Consulta não encontrada' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteConsulta = async (req, res) => {
    try {
        const success = await ConsultaModel.deleteConsulta(req.params.id);
        if (success) {
            res.status(204).send();
        } else {
            res.status(404).json({ message: 'Consulta não encontrada' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
