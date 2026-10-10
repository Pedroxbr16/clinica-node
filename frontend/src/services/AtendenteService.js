import { api } from './api';

export const criarAtendente = (data) => api.post('/atendente/criar', data);
export const listarAtendentes = () => api.get('/atendente/listar');
export const buscarAtendenteById = (id) => api.get(`/atendente/buscar/${id}`);
export const atualizarAtendente = (id, data) => api.put(`/atendente/atualizar/${id}`, data);
export const excluirAtendente = (id) => api.delete(`/atendente/excluir/${id}`);
