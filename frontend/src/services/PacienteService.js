import { api } from './api';

export const criarPaciente = (data) => api.post('/pacientes/pacientes', data);
export const listarPacientes = () => api.get('/pacientes/pacientes');
export const buscarPacientePorId = (id) => api.get(`/pacientes/pacientes/${id}`);
export const buscarPacientePorCpf = (cpf) => api.get(`/pacientes/pacientes/cpf/${encodeURIComponent(cpf)}`);
export const atualizarPaciente = (id, data) => api.put(`/pacientes/pacientes/${id}`, data);
export const excluirPaciente = (id) => api.delete(`/pacientes/pacientes/${id}`);
