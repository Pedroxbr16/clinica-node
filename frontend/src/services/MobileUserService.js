import { api } from './api';

export const buscarUsuarioMobile = (id) => api.get(`/user/buscar/${id}`);
