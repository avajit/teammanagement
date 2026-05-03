import api from '../lib/api';
import API_ROUTES from '../constants/api.routes';

export const createProject = async (data) => {
  const res = await api.post(API_ROUTES.projects.base, data);
  return res.data;
};

export const getProjects = async () => {
  const res = await api.get(API_ROUTES.projects.base);
  return res.data;
};

export const getProjectById = async (id) => {
  const res = await api.get(API_ROUTES.projects.byId(id));
  return res.data;
};

export const addMember = async (projectId, email) => {
  const res = await api.post(API_ROUTES.projects.members(projectId), { email });
  return res.data;
};

export const removeMember = async (projectId, userId) => {
  const res = await api.delete(API_ROUTES.projects.removeMember(projectId, userId));
  return res.data;
};
