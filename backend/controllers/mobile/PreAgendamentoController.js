const PreAgendamentoModel = require('../../models/mobile/preAgendamentoModel');

const PreAgendamentoController = {
  // Criar um novo pré-agendamento
  create(req, res) {
    const { userId, doctorId, modalidade, date, phone, email } = req.body;

    if (!userId || !doctorId || !modalidade || !date || !phone) {
      return res.status(400).json({
        success: false,
        message: 'Todos os campos obrigatórios devem ser preenchidos.',
      });
    }

    PreAgendamentoModel.create(
      { userId, doctorId, modalidade, date, phone, email },
      (error) => {
        if (error) {
          console.error('Erro ao criar pré-agendamento:', error);
          return res
            .status(500)
            .json({ success: false, message: 'Erro ao criar o pré-agendamento.' });
        }
        res.status(201).json({ success: true, message: 'Pré-agendamento criado com sucesso!' });
      }
    );
  },

  // Listar todos os pré-agendamentos
  list(req, res) {
    PreAgendamentoModel.list((error, results) => {
      if (error) {
        console.error('Erro ao listar pré-agendamentos:', error);
        return res
          .status(500)
          .json({ success: false, message: 'Erro ao listar os pré-agendamentos.' });
      }
      res.status(200).json({ success: true, data: results });
    });
  },

  // Buscar um pré-agendamento por ID
  findById(req, res) {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ success: false, message: 'O ID é obrigatório.' });
    }

    PreAgendamentoModel.findById(id, (error, results) => {
      if (error) {
        console.error('Erro ao buscar o pré-agendamento:', error);
        return res
          .status(500)
          .json({ success: false, message: 'Erro ao buscar o pré-agendamento.' });
      }
      if (results.length === 0) {
        return res.status(404).json({ success: false, message: 'Pré-agendamento não encontrado.' });
      }
      res.status(200).json({ success: true, data: results[0] });
    });
  },

  // Atualizar um pré-agendamento por ID
  update(req, res) {
    const { id } = req.params;
    const updateFields = req.body;

    if (!id) {
      return res.status(400).json({ success: false, message: 'O ID é obrigatório.' });
    }

    PreAgendamentoModel.update(id, updateFields, (error, results) => {
      if (error) {
        console.error('Erro ao atualizar o pré-agendamento:', error);
        return res
          .status(500)
          .json({ success: false, message: 'Erro ao atualizar o pré-agendamento.' });
      }
      if (results.affectedRows === 0) {
        return res.status(404).json({ success: false, message: 'Pré-agendamento não encontrado.' });
      }
      res.status(200).json({ success: true, message: 'Pré-agendamento atualizado com sucesso!' });
    });
  },

  // Deletar um pré-agendamento por ID
  delete(req, res) {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ success: false, message: 'O ID é obrigatório.' });
    }

    PreAgendamentoModel.delete(id, (error, results) => {
      if (error) {
        console.error('Erro ao deletar o pré-agendamento:', error);
        return res
          .status(500)
          .json({ success: false, message: 'Erro ao deletar o pré-agendamento.' });
      }
      if (results.affectedRows === 0) {
        return res.status(404).json({ success: false, message: 'Pré-agendamento não encontrado.' });
      }
      res.status(200).json({ success: true, message: 'Pré-agendamento deletado com sucesso!' });
    });
  },

  // Buscar pré-agendamentos por usuário
  findByUserId(req, res) {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({ success: false, message: 'O userId é obrigatório.' });
    }

    PreAgendamentoModel.findByUserId(userId, (error, results) => {
      if (error) {
        console.error('Erro ao buscar os pré-agendamentos do usuário:', error);
        return res
          .status(500)
          .json({ success: false, message: 'Erro ao buscar os pré-agendamentos do usuário.' });
      }
      if (results.length === 0) {
        return res
          .status(404)
          .json({ success: false, message: 'Nenhum pré-agendamento encontrado para este usuário.' });
      }
      res.status(200).json({ success: true, data: results });
    });
  },
};

module.exports = PreAgendamentoController;
