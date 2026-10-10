import { api } from './api';

export const listarPreAgendamentos = async () => (await api.get('/pre-agendamentos/listar')).data || [];
export const buscarPreAgendamento = async (id) => (await api.get(`/pre-agendamentos/buscar/${id}`)).data;
export const atualizarPreAgendamento = (id, data) => api.put(`/pre-agendamentos/atualizar/${id}`, data);
