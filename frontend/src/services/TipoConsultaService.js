import { api } from './api';

export const listarTiposConsulta = () => api.get('/tipos_consulta/lista');
export const criarTipoConsulta = (data) => api.post('/tipos_consulta/adiciona', data);
export const buscarTipoConsultaPorId = (id) => api.get(`/tipos_consulta/${id}`);
export const atualizarTipoConsulta = (id, data) => api.put(`/tipos_consulta/${id}`, data);
export const excluirTipoConsulta = (id) => api.delete(`/tipos_consulta/${id}`);
