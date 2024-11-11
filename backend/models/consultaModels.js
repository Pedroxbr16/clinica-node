const connection = require('../config/database');


class ConsultaModel {
    // Cria uma nova consulta no banco de dados
    static async createConsulta({ titulo, inicio, fim, paciente_id, medico_id, tipo_consulta_id }) {
        const sql = `
            INSERT INTO Consulta (titulo, inicio, fim, paciente_id, medico_id, tipo_consulta_id) 
            VALUES (?, ?, ?, ?, ?, ?)
        `;
        try {
            return new Promise((resolve, reject) => {
                connection.execute(sql, [titulo, inicio, fim, paciente_id, medico_id, tipo_consulta_id], (error, result) => {
                    if (error) {
                        console.error('Erro ao criar consulta:', error);
                        reject(error);
                    }
                    resolve(result.insertId); // Retorna o id da consulta criada
                });
            });
        } catch (error) {
            console.error('Erro ao criar consulta:', error);
            throw error;
        }
    }

    // Obtém todas as consultas
    static async getConsultas() {
        const sql = `SELECT * FROM Consulta`;
        try {
            return new Promise((resolve, reject) => {
                connection.execute(sql, (error, result) => {
                    if (error) {
                        console.error('Erro ao obter consultas:', error);
                        reject(error);
                    }
                    resolve(result); // Retorna as consultas
                });
            });
        } catch (error) {
            console.error('Erro ao obter consultas no banco de dados:', error);
            throw error;
        }
    }

    // Obtém uma consulta específica por ID
    static async getConsultaById(id) {
        const sql = `SELECT * FROM Consulta WHERE id = ?`;
        try {
            return new Promise((resolve, reject) => {
                connection.execute(sql, [id], (error, result) => {
                    if (error) {
                        console.error('Erro ao obter consulta por ID:', error);
                        reject(error);
                    }
                    resolve(result[0]); // Retorna o resultado da consulta com o ID
                });
            });
        } catch (error) {
            console.error('Erro ao obter consulta por ID:', error);
            throw error;
        }
    }

    // Atualiza uma consulta por ID
    static async updateConsulta(id, { titulo, inicio, fim, paciente_id, medico_id, tipo_consulta_id }) {
        const sql = `
            UPDATE Consulta 
            SET titulo = ?, inicio = ?, fim = ?, paciente_id = ?, medico_id = ?, tipo_consulta_id = ? 
            WHERE id = ?
        `;
        try {
            return new Promise((resolve, reject) => {
                connection.execute(sql, [titulo, inicio, fim, paciente_id, medico_id, tipo_consulta_id, id], (error, result) => {
                    if (error) {
                        console.error('Erro ao atualizar consulta:', error);
                        reject(error);
                    }
                    resolve(result.affectedRows > 0); // Retorna um valor booleano se a atualização foi bem-sucedida
                });
            });
        } catch (error) {
            console.error('Erro ao atualizar consulta:', error);
            throw error;
        }
    }

    // Deleta uma consulta por ID
    static async deleteConsulta(id) {
        const sql = `DELETE FROM Consulta WHERE id = ?`;
        try {
            return new Promise((resolve, reject) => {
                connection.execute(sql, [id], (error, result) => {
                    if (error) {
                        console.error('Erro ao deletar consulta:', error);
                        reject(error);
                    }
                    resolve(result.affectedRows > 0); // Retorna um valor booleano se a exclusão foi bem-sucedida
                });
            });
        } catch (error) {
            console.error('Erro ao deletar consulta:', error);
            throw error;
        }
    }
}

module.exports = ConsultaModel;
