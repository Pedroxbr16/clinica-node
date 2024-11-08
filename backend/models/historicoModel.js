const db = require('../config/database');

class HistoricoModel {
    // Adiciona um novo histórico
    static async createHistorico(pacienteId, descricao) {
        const [result] = await db.execute(
            'INSERT INTO historico (paciente_id, descricao) VALUES (?, ?)',
            [pacienteId, descricao]
        );
        return result.insertId;
    }

    // Obtém o histórico de um paciente específico
    static async getHistoricoByPacienteId(pacienteId) {
        const [rows] = await db.execute(
            'SELECT * FROM historico WHERE paciente_id = ? ORDER BY data DESC',
            [pacienteId]
        );
        return rows;
    }
}

module.exports = HistoricoModel;
