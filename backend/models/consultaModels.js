const connection = require('../config/database');

class ConsultaModel {
    static async createConsulta({ titulo, inicio, fim, paciente_id, medico_id, tipo_consulta_id, modalidade }) {
        const sql = `
            INSERT INTO Consulta (titulo, inicio, fim, paciente_id, medico_id, tipo_consulta_id, modalidade) 
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `;
        try {
            return new Promise((resolve, reject) => {
                connection.execute(sql, [titulo, inicio, fim, paciente_id, medico_id, tipo_consulta_id, modalidade], (error, result) => {
                    if (error) {
                        console.error('Erro ao criar consulta:', error);
                        reject(error);
                    }
                    resolve(result.insertId);
                });
            });
        } catch (error) {
            console.error('Erro ao criar consulta:', error);
            throw error;
        }
    }

    static async getConsultas() {
        const sql = `SELECT * FROM Consulta`;
        try {
            return new Promise((resolve, reject) => {
                connection.execute(sql, (error, result) => {
                    if (error) {
                        console.error('Erro ao obter consultas:', error);
                        reject(error);
                    }
                    resolve(result);
                });
            });
        } catch (error) {
            console.error('Erro ao obter consultas no banco de dados:', error);
            throw error;
        }
    }

    static async getConsultaById(id) {
        const sql = `SELECT * FROM Consulta WHERE id = ?`;
        try {
            return new Promise((resolve, reject) => {
                connection.execute(sql, [id], (error, result) => {
                    if (error) {
                        console.error('Erro ao obter consulta por ID:', error);
                        reject(error);
                    }
                    resolve(result[0]);
                });
            });
        } catch (error) {
            console.error('Erro ao obter consulta por ID:', error);
            throw error;
        }
    }

    static async updateConsulta(id, { titulo, inicio, fim, paciente_id, medico_id, tipo_consulta_id, modalidade }) {
        const sql = `
            UPDATE Consulta 
            SET titulo = ?, inicio = ?, fim = ?, paciente_id = ?, medico_id = ?, tipo_consulta_id = ?, modalidade = ? 
            WHERE id = ?
        `;
        try {
            return new Promise((resolve, reject) => {
                connection.execute(sql, [titulo, inicio, fim, paciente_id, medico_id, tipo_consulta_id, modalidade, id], (error, result) => {
                    if (error) {
                        console.error('Erro ao atualizar consulta:', error);
                        reject(error);
                    }
                    resolve(result.affectedRows > 0);
                });
            });
        } catch (error) {
            console.error('Erro ao atualizar consulta:', error);
            throw error;
        }
    }

    static async deleteConsulta(id) {
        const sql = `DELETE FROM Consulta WHERE id = ?`;
        try {
            return new Promise((resolve, reject) => {
                connection.execute(sql, [id], (error, result) => {
                    if (error) {
                        console.error('Erro ao deletar consulta:', error);
                        reject(error);
                    }
                    resolve(result.affectedRows > 0);
                });
            });
        } catch (error) {
            console.error('Erro ao deletar consulta:', error);
            throw error;
        }
    }

    // Obtém horários ocupados para um médico em uma data específica
    static async getHorariosOcupados(medico_id, date) {
        const sql = `
            SELECT DATE_FORMAT(inicio, '%H:%i') AS horario
            FROM Consulta
            WHERE medico_id = ? AND DATE(inicio) = ?
        `;
        try {
            return new Promise((resolve, reject) => {
                connection.execute(sql, [medico_id, date], (error, results) => {
                    if (error) {
                        console.error('Erro ao obter horários ocupados:', error);
                        reject(error);
                    }
                    resolve(results.map((row) => row.horario));
                });
            });
        } catch (error) {
            console.error('Erro ao obter horários ocupados no banco de dados:', error);
            throw error;
        }
    }
}

module.exports = ConsultaModel;
