const ConsultaModel = require('../models/consultaModels');

// Cria uma nova consulta
exports.createConsulta = async (req, res) => {
    try {
        const consultaId = await ConsultaModel.createConsulta(req.body);
        res.status(201).json({ id: consultaId });
    } catch (error) {
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

// Obtém horários disponíveis para um médico em uma data específica
exports.getHorariosDisponiveis = async (req, res) => {
    console.log('Requisição recebida em /horarios:', req.query);

    try {
        const { doctorId, date } = req.query;

        if (!doctorId || !date) {
            return res.status(400).json({ error: 'Parâmetros "doctorId" e "date" são obrigatórios.' });
        }

        const horariosOcupados = await ConsultaModel.getHorariosOcupados(doctorId, date);
        const todosHorarios = [
            "08:00", "09:00", "10:00", "11:00", "13:00", "14:00", "15:00", "16:00"
        ];
        const horariosDisponiveis = todosHorarios.filter(
            (horario) => !horariosOcupados.includes(horario)
        );

        res.status(200).json({ data: horariosDisponiveis });
    } catch (error) {
        console.error('Erro ao buscar horários disponíveis:', error);
        res.status(500).json({ error: 'Erro ao buscar horários disponíveis' });
    }
};

