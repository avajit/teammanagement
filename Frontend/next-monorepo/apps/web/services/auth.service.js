import api from '../lib/api';
import API_ROUTES from '../constants/api.routes';

export const registerUser = async (data) => {
  const response = await api.post(API_ROUTES.auth.register, data);
  return response.data;
};

export const loginUser = async (data) => {
  const response = await api.post(API_ROUTES.auth.login, data);
  return response.data;
};

export const logoutUser = async () => {
  const response = await api.post(API_ROUTES.auth.logout);
  return response.data;
};

export const getMe = async () => {
  const response = await api.get(API_ROUTES.auth.me);
  return response.data;
};

export const forgotPassword = async (data) => {
  const response = await api.post(API_ROUTES.auth.forgotPassword, data);
  return response.data;
};

export const resetPassword = async (data) => {
  const response = await api.post(API_ROUTES.auth.resetPassword, data);
  return response.data;
};
