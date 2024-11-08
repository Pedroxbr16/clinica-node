// controllers/tipoConsultaController.js
const TipoConsultaModel = require('../models/tipoConsultaModel');

exports.createTipoConsulta = (req, res) => {
    const { descricao } = req.body;
    if (!descricao) {
        return res.status(400).json({ error: 'O campo "descricao" é obrigatório.' });
    }
    
    TipoConsultaModel.createTipoConsulta(descricao, (error, tipoConsultaId) => {
        if (error) {
            return res.status(500).json({ error: 'Erro ao criar tipo de consulta: ' + error.message });
        }
        res.status(201).json({ id: tipoConsultaId, message: 'Tipo de consulta criado com sucesso!' });
    });
};

exports.getTiposConsulta = (req, res) => {
    TipoConsultaModel.getAllTiposConsulta((error, tiposConsulta) => {
        if (error) {
            return res.status(500).json({ error: 'Erro ao obter tipos de consulta: ' + error.message });
        }
        res.status(200).json(tiposConsulta);
    });
};

exports.getTipoConsultaById = (req, res) => {
    const { id } = req.params;
    TipoConsultaModel.getTipoConsultaById(id, (error, tipoConsulta) => {
        if (error) {
            return res.status(500).json({ error: 'Erro ao obter tipo de consulta: ' + error.message });
        }
        if (!tipoConsulta) {
            return res.status(404).json({ message: 'Tipo de consulta não encontrado' });
        }
        res.status(200).json(tipoConsulta);
    });
};

exports.updateTipoConsulta = (req, res) => {
    const { id } = req.params;
    const { descricao } = req.body;
    if (!descricao) {
        return res.status(400).json({ error: 'O campo "descricao" é obrigatório.' });
    }
    
    TipoConsultaModel.updateTipoConsulta(id, descricao, (error, success) => {
        if (error) {
            return res.status(500).json({ error: 'Erro ao atualizar tipo de consulta: ' + error.message });
        }
        if (!success) {
            return res.status(404).json({ message: 'Tipo de consulta não encontrado' });
        }
        res.status(200).json({ message: 'Tipo de consulta atualizado com sucesso!' });
    });
};

exports.deleteTipoConsulta = (req, res) => {
    const { id } = req.params;
    TipoConsultaModel.deleteTipoConsulta(id, (error, success) => {
        if (error) {
            return res.status(500).json({ error: 'Erro ao deletar tipo de consulta: ' + error.message });
        }
        if (!success) {
            return res.status(404).json({ message: 'Tipo de consulta não encontrado' });
        }
        res.status(200).json({ message: 'Tipo de consulta deletado com sucesso!' });
    });
};
