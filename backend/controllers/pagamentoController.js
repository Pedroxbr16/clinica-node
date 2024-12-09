const PagamentoModel = require('../models/pagamentoModel');

exports.createPagamento = async (req, res) => {
    const { metodo, usuario_id, paciente_id, medico_id, tipo_consulta_id } = req.body;

    // Validação
    if (!metodo || !usuario_id || !paciente_id || !medico_id || !tipo_consulta_id) {
        return res.status(400).json({ error: 'Todos os campos são obrigatórios: método, usuário, paciente, médico e tipo de consulta.' });
    }

    try {
        const pagamentoId = await PagamentoModel.createPagamento({
            metodo,
            usuario_id,
            paciente_id,
            medico_id,
            tipo_consulta_id,
        });
        res.status(201).json({ message: 'Pagamento criado com sucesso.', id: pagamentoId });
    } catch (error) {
        console.error('Erro ao criar pagamento:', error);
        res.status(500).json({ error: 'Erro ao criar pagamento.' });
    }
};

exports.getPagamentos = async (req, res) => {
    try {
        const pagamentos = await PagamentoModel.getPagamentos();
        res.status(200).json(pagamentos);
    } catch (error) {
        console.error('Erro ao obter pagamentos:', error);
        res.status(500).json({ error: 'Erro ao obter pagamentos.' });
    }
};

exports.updatePagamento = async (req, res) => {
    const { id } = req.params;
    const { metodo, usuario_id, paciente_id, medico_id, tipo_consulta_id } = req.body;

    // Validação
    if (!metodo || !usuario_id || !paciente_id || !medico_id || !tipo_consulta_id) {
        return res.status(400).json({ error: 'Todos os campos são obrigatórios: método, usuário, paciente, médico e tipo de consulta.' });
    }

    try {
        const success = await PagamentoModel.updatePagamento(id, {
            metodo,
            usuario_id,
            paciente_id,
            medico_id,
            tipo_consulta_id,
        });
        if (!success) {
            return res.status(404).json({ error: 'Pagamento não encontrado.' });
        }
        res.status(200).json({ message: 'Pagamento atualizado com sucesso.' });
    } catch (error) {
        console.error('Erro ao atualizar pagamento:', error);
        res.status(500).json({ error: 'Erro ao atualizar pagamento.' });
    }
};

exports.deletePagamento = async (req, res) => {
    const { id } = req.params;

    try {
        const success = await PagamentoModel.deletePagamento(id);
        if (!success) {
            return res.status(404).json({ error: 'Pagamento não encontrado.' });
        }
        res.status(200).json({ message: 'Pagamento deletado com sucesso.' });
    } catch (error) {
        console.error('Erro ao deletar pagamento:', error);
        res.status(500).json({ error: 'Erro ao deletar pagamento.' });
    }
};
