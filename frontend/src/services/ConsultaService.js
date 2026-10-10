import { api } from './api';

export const criarConsulta = (data) => api.post('/consultas/criar', data);
export const listarConsultas = () => api.get('/consultas/lista');
export const buscarConsultaById = (id) => api.get(`/consultas/buscar/${id}`);
export const atualizarConsulta = (id, data) => api.put(`/consultas/atualizar/${id}`, data);
export const excluirConsulta = (id) => api.delete(`/consultas/excluir/${id}`);
export const buscarHorariosDisponiveis = (doctorId, date) => api.get(
  `/consultas/horarios?doctorId=${encodeURIComponent(doctorId)}&date=${encodeURIComponent(date)}`,
);
