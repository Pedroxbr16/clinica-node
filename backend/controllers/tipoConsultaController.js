// controllers/tipoConsultaController.js
const TipoConsultaModel = require('../models/tipoConsultaModel');

exports.createTipoConsulta = (req, res) => {
    const { descricao, valor } = req.body;

    // Validação dos parâmetros
    if (!descricao || typeof descricao !== 'string' || descricao.trim() === '') {
        return res.status(400).json({ error: 'Descrição é obrigatória e deve ser uma string válida.' });
    }
    if (!valor || isNaN(parseFloat(valor))) {
        return res.status(400).json({ error: 'Valor é obrigatório e deve ser um número válido.' });
    }

    // Chamando o método do modelo
    TipoConsultaModel.createTipoConsulta(descricao, parseFloat(valor), (err, id) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Erro ao criar tipo de consulta.' });
        }
        res.status(201).json({ message: 'Tipo de consulta criado com sucesso!', id });
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
    const { id } = req.params; // ID do tipo de consulta
    const { descricao, valor } = req.body;

    // Validações
    if (!descricao || typeof descricao !== 'string' || descricao.trim() === '') {
        return res.status(400).json({ error: 'Descrição é obrigatória e deve ser uma string válida.' });
    }
    if (!valor || isNaN(parseFloat(valor))) {
        return res.status(400).json({ error: 'Valor é obrigatório e deve ser um número válido.' });
    }

    // Chamando o modelo para atualizar
    TipoConsultaModel.updateTipoConsulta(id, descricao, parseFloat(valor), (err, success) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Erro ao atualizar tipo de consulta.' });
        }
        if (!success) {
            return res.status(404).json({ error: 'Tipo de consulta não encontrado.' });
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
