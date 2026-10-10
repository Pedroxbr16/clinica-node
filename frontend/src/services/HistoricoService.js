import { api } from './api';

export const listarHistoricos = () => api.get('/historico/historicos');
export const adicionarHistorico = (data) => api.post('/historico/historicos', data);
export const atualizarHistorico = (id, data) => api.put(`/historico/historicos/${id}`, data);
export const excluirHistorico = (id) => api.delete(`/historico/historicos/${id}`);
export const buscarHistoricoPorPaciente = (pacienteId) => api.get(`/historico/paciente/${pacienteId}`);
