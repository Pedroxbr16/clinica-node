import { api } from './api';

export const criarMedico = (data) => api.post('/medicos/medicos', data);
export const buscarMedicos = async () => (await api.get('/medicos/medicos')).data || [];
export const buscarMedicoById = async (id) => (await api.get(`/medicos/medicos/${id}`)).data;
export const atualizarMedico = (id, data) => api.put(`/medicos/medicos/${id}`, data);
export const excluirMedico = (id) => api.delete(`/medicos/medicos/${id}`);
