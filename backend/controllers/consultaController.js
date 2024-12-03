const ConsultaModel = require('../models/consultaModels');
const nodemailer = require('nodemailer');

// Cria uma nova consulta e envia e-mail de confirmação
exports.createConsulta = async (req, res) => {
    const { titulo, inicio, fim, paciente_id, medico_id, tipo_consulta_id, modalidade, pacienteEmail, pacienteNome } = req.body;

    // Validação de campos obrigatórios
    if (!titulo || !inicio || !fim || !paciente_id || !medico_id || !tipo_consulta_id || !modalidade || !pacienteEmail || !pacienteNome) {
        return res.status(400).json({ error: 'Todos os campos, incluindo nome e e-mail do paciente, são obrigatórios.' });
    }

    try {
        // Criação da consulta
        const consultaId = await ConsultaModel.createConsulta({
            titulo,
            inicio,
            fim,
            paciente_id,
            medico_id,
            tipo_consulta_id,
            modalidade,
        });

        console.log('Consulta criada com sucesso. ID:', consultaId);

        // Configuração do transporte de e-mail
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'herique.ph14@gmail.com', // Substitua pelo seu e-mail
                pass: 'kylf mqwp apqs mjhg', // Substitua pela sua senha ou token de aplicativo
            },
        });

        // Configuração do e-mail
        const mailOptions = {
            from: 'herique.ph14@gmail.com',
            to: pacienteEmail,
            subject: 'Confirmação de Consulta',
            text: `Olá ${pacienteNome},

                Sua consulta foi agendada com sucesso!
                Título: ${titulo}
                Data: ${new Date(inicio).toLocaleDateString()}
                Horário: ${new Date(inicio).toLocaleTimeString()}
                Modalidade: ${modalidade}
                
                Por favor, ao chegar na clínica, dirija-se à recepção para realizar o pagamento com a atendente. 
                Estamos à disposição para ajudá-lo com o que for necessário.

                Obrigado por confiar em nossos serviços!`,
        };

        // Envio do e-mail
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Erro ao enviar e-mail:', error);
                return res.status(201).json({
                    id: consultaId,
                    message: 'Consulta criada, mas ocorreu um erro ao enviar o e-mail.',
                });
            }

            console.log('E-mail enviado com sucesso:', info.response);
            res.status(201).json({
                id: consultaId,
                message: 'Consulta criada e e-mail enviado com sucesso!',
            });
        });
    } catch (error) {
        console.error('Erro ao criar consulta:', error);
        res.status(500).json({ error: 'Erro ao criar consulta.' });
    }
};

// Obtém todas as consultas
exports.getConsultas = async (req, res) => {
    try {
        const consultas = await ConsultaModel.getConsultas();
        res.status(200).json(consultas);
    } catch (error) {
        console.error('Erro ao obter consultas:', error);
        res.status(500).json({ error: 'Erro ao obter consultas.' });
    }
};

// Obtém uma consulta por ID
exports.getConsultaById = async (req, res) => {
    const { id } = req.params;

    try {
        const consulta = await ConsultaModel.getConsultaById(id);
        if (!consulta) {
            return res.status(404).json({ message: 'Consulta não encontrada.' });
        }
        res.status(200).json(consulta);
    } catch (error) {
        console.error('Erro ao obter consulta por ID:', error);
        res.status(500).json({ error: 'Erro ao obter consulta.' });
    }
};

// Atualiza uma consulta pelo ID
exports.updateConsulta = async (req, res) => {
    const { id } = req.params;
    const { titulo, inicio, fim, paciente_id, medico_id, tipo_consulta_id, modalidade } = req.body;

    if (!titulo || !inicio || !fim || !paciente_id || !medico_id || !tipo_consulta_id || !modalidade) {
        return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
    }

    try {
        const success = await ConsultaModel.updateConsulta(id, {
            titulo,
            inicio,
            fim,
            paciente_id,
            medico_id,
            tipo_consulta_id,
            modalidade,
        });
        if (!success) {
            return res.status(404).json({ message: 'Consulta não encontrada.' });
        }
        res.status(200).json({ message: 'Consulta atualizada com sucesso!' });
    } catch (error) {
        console.error('Erro ao atualizar consulta:', error);
        res.status(500).json({ error: 'Erro ao atualizar consulta.' });
    }
};

// Deleta uma consulta pelo ID
exports.deleteConsulta = async (req, res) => {
    const { id } = req.params;

    try {
        const success = await ConsultaModel.deleteConsulta(id);
        if (!success) {
            return res.status(404).json({ message: 'Consulta não encontrada.' });
        }
        res.status(200).json({ message: 'Consulta deletada com sucesso!' });
    } catch (error) {
        console.error('Erro ao deletar consulta:', error);
        res.status(500).json({ error: 'Erro ao deletar consulta.' });
    }
};

// Obtém horários disponíveis para um médico em uma data específica
exports.getHorariosDisponiveis = async (req, res) => {
    const { doctorId, date } = req.query;

    if (!doctorId || !date) {
        return res.status(400).json({ error: 'Os parâmetros "doctorId" e "date" são obrigatórios.' });
    }

    try {
        const horariosOcupados = await ConsultaModel.getHorariosOcupados(doctorId, date);
        const todosHorarios = [
            "08:00", "09:00", "10:00", "11:00", "13:00", "14:00", "15:00", "16:00"
        ];
        const horariosDisponiveis = todosHorarios.filter(horario => !horariosOcupados.includes(horario));

        res.status(200).json({ data: horariosDisponiveis });
    } catch (error) {
        console.error('Erro ao buscar horários disponíveis:', error);
        res.status(500).json({ error: 'Erro ao buscar horários disponíveis.' });
    }
};
