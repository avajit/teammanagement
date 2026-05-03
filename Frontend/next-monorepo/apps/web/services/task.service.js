import api from '../lib/api';
import API_ROUTES from '../constants/api.routes';

export const createTask = async (projectId, data) => {
  const res = await api.post(API_ROUTES.tasks.byProject(projectId), data);
  return res.data;
};

export const getTasks = async (projectId) => {
  const res = await api.get(API_ROUTES.tasks.byProject(projectId));
  return res.data;
};

export const updateTask = async (id, data) => {
  const res = await api.patch(API_ROUTES.tasks.byId(id), data);
  return res.data;
};

export const updateTaskStatus = async (id, status) => {
  const res = await api.patch(API_ROUTES.tasks.status(id), { status });
  return res.data;
};

export const deleteTask = async (id) => {
  const res = await api.delete(API_ROUTES.tasks.byId(id));
  return res.data;
};
