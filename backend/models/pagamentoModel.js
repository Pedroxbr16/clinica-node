const connection = require('../config/database');

class PagamentoModel {
    // Cria um novo pagamento
    static async createPagamento({ metodo, usuario_id, paciente_id }) {
        const sql = `
            INSERT INTO Pagamento (metodo, data, usuario_id, paciente_id)
            VALUES (?, NOW(), ?, ?)
        `;
        return new Promise((resolve, reject) => {
            connection.query(sql, [metodo, usuario_id, paciente_id], (error, result) => {
                if (error) {
                    console.error('Erro ao criar pagamento:', error);
                    reject(error);
                } else {
                    resolve(result.insertId);
                }
            });
        });
    }

    // Obtém todos os pagamentos
    static async getPagamentos() {
        const sql = `
            SELECT 
                p.id, 
                p.metodo, 
                p.data, 
                a.usuario AS usuario_nome, 
                pa.nome AS paciente_nome
            FROM Pagamento p
            JOIN Atendente a ON p.usuario_id = a.id
            JOIN Pacientes pa ON p.paciente_id = pa.id
        `;
        return new Promise((resolve, reject) => {
            connection.query(sql, (error, results) => {
                if (error) {
                    console.error('Erro ao obter pagamentos:', error);
                    reject(error);
                } else {
                    resolve(results);
                }
            });
        });
    }
    
    

    // Atualiza um pagamento pelo ID
    static async updatePagamento(id, { metodo, usuario_id, paciente_id }) {
        const sql = `
            UPDATE Pagamento 
            SET metodo = ?, usuario_id = ?, paciente_id = ? 
            WHERE id = ?
        `;
        return new Promise((resolve, reject) => {
            connection.query(sql, [metodo, usuario_id, paciente_id, id], (error, result) => {
                if (error) {
                    console.error('Erro ao atualizar pagamento:', error);
                    reject(error);
                } else {
                    resolve(result.affectedRows > 0);
                }
            });
        });
    }

    // Deleta um pagamento pelo ID
    static async deletePagamento(id) {
        const sql = `DELETE FROM Pagamento WHERE id = ?`;
        return new Promise((resolve, reject) => {
            connection.query(sql, [id], (error, result) => {
                if (error) {
                    console.error('Erro ao deletar pagamento:', error);
                    reject(error);
                } else {
                    resolve(result.affectedRows > 0);
                }
            });
        });
    }
}

module.exports = PagamentoModel;
