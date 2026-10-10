import { api } from './api';

export const listarExames = () => api.get('/exames/exames');
export const criarExame = (nome) => api.post('/exames/exames', { nome });
export const atualizarExame = (id, nome) => api.put(`/exames/exames/${id}`, { nome });
export const excluirExame = (id) => api.delete(`/exames/exames/${id}`);
