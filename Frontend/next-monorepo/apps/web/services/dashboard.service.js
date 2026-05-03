import api from '../lib/api';
import API_ROUTES from '../constants/api.routes';

export const getDashboardStats = async () => {
  const res = await api.get(API_ROUTES.dashboard.stats);
  return res.data;
};
