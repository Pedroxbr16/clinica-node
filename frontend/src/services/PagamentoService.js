import { api } from './api';

export const buscarPagamentos = () => api.get('/pagamentos/buscar');
export const criarPagamento = (data) => api.post('/pagamentos/criar', data);
export const atualizarPagamento = (id, data) => api.put(`/pagamentos/${id}`, data);
export const excluirPagamento = (id) => api.delete(`/pagamentos/${id}`);
