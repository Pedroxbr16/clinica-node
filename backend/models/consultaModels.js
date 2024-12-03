const connection = require('../config/database');

class ConsultaModel {
    static async createConsulta({ titulo, inicio, fim, paciente_id, medico_id, tipo_consulta_id, modalidade }) {
        const sql = `
            INSERT INTO Consulta (titulo, inicio, fim, paciente_id, medico_id, tipo_consulta_id, modalidade) 
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `;
        return new Promise((resolve, reject) => {
            connection.execute(sql, [titulo, inicio, fim, paciente_id, medico_id, tipo_consulta_id, modalidade], (error, result) => {
                if (error) {
                    console.error('Erro ao criar consulta:', error);
                    reject(error);
                } else {
                    resolve(result.insertId);
                }
            });
        });
    }

    static async getConsultas() {
        const sql = `SELECT * FROM Consulta`;
        return new Promise((resolve, reject) => {
            connection.execute(sql, (error, result) => {
                if (error) {
                    console.error('Erro ao obter consultas:', error);
                    reject(error);
                } else {
                    resolve(result);
                }
            });
        });
    }

    static async getConsultaById(id) {
        const sql = `SELECT * FROM Consulta WHERE id = ?`;
        return new Promise((resolve, reject) => {
            connection.execute(sql, [id], (error, result) => {
                if (error) {
                    console.error('Erro ao obter consulta por ID:', error);
                    reject(error);
                } else {
                    resolve(result[0]);
                }
            });
        });
    }

    static async updateConsulta(id, { titulo, inicio, fim, paciente_id, medico_id, tipo_consulta_id, modalidade }) {
        const sql = `
            UPDATE Consulta 
            SET titulo = ?, inicio = ?, fim = ?, paciente_id = ?, medico_id = ?, tipo_consulta_id = ?, modalidade = ? 
            WHERE id = ?
        `;
        return new Promise((resolve, reject) => {
            connection.execute(sql, [titulo, inicio, fim, paciente_id, medico_id, tipo_consulta_id, modalidade, id], (error, result) => {
                if (error) {
                    console.error('Erro ao atualizar consulta:', error);
                    reject(error);
                } else {
                    resolve(result.affectedRows > 0);
                }
            });
        });
    }

    static async deleteConsulta(id) {
        const sql = `DELETE FROM Consulta WHERE id = ?`;
        return new Promise((resolve, reject) => {
            connection.execute(sql, [id], (error, result) => {
                if (error) {
                    console.error('Erro ao deletar consulta:', error);
                    reject(error);
                } else {
                    resolve(result.affectedRows > 0);
                }
            });
        });
    }

    // Obtém horários ocupados para um médico em uma data específica
    static async getHorariosOcupados(medico_id, date) {
        const sql = `
            SELECT DATE_FORMAT(inicio, '%H:%i') AS horario
            FROM Consulta
            WHERE medico_id = ? AND DATE(inicio) = ?
        `;
        return new Promise((resolve, reject) => {
            connection.execute(sql, [medico_id, date], (error, results) => {
                if (error) {
                    console.error('Erro ao obter horários ocupados:', error);
                    reject(error);
                } else {
                    resolve(results.map((row) => row.horario));
                }
            });
        });
    }

    // Novo método: Obtém detalhes do tipo de consulta (descrição e valor) pelo ID
    static async getTipoConsultaById(tipoConsultaId) {
        const sql = `SELECT descricao, valor FROM Tipos_Consulta WHERE id = ?`;
        return new Promise((resolve, reject) => {
            connection.execute(sql, [tipoConsultaId], (error, results) => {
                if (error) {
                    console.error('Erro ao obter tipo de consulta:', error);
                    reject(error);
                } else {
                    resolve(results[0]);
                }
            });
        });
    }
}

module.exports = ConsultaModel;
