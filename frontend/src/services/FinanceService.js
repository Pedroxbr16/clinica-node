import { api } from './api';

export const buscarDashboardFinanceiro = ({ month, year }) =>
  api.get(`/finance/dashboard?month=${encodeURIComponent(month)}&year=${encodeURIComponent(year)}`);
