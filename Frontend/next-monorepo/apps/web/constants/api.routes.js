const API_ROUTES = {
  auth: {
    register: '/auth/register',
    login: '/auth/login',
    logout: '/auth/logout',
    me: '/auth/me',
    forgotPassword: '/auth/forgot-password',
    resetPassword: '/auth/reset-password',
  },
  projects: {
    base: '/projects',
    byId: (id) => `/projects/${id}`,
    members: (id) => `/projects/${id}/members`,
    removeMember: (projectId, userId) => `/projects/${projectId}/members/${userId}`,
  },
  tasks: {
    byProject: (projectId) => `/projects/${projectId}/tasks`,
    byId: (id) => `/tasks/${id}`,
    status: (id) => `/tasks/${id}/status`,
  },
  dashboard: {
    stats: '/dashboard/stats',
  },
};

export default API_ROUTES;
