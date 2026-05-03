'use client';

import { useState, useEffect, useCallback } from 'react';
import * as projectService from '../services/project.service';
import handleError from '../lib/utils/handleError';

export const useProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProjects = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await projectService.getProjects();
      setProjects(res.data);
    } catch (err) {
      setError(handleError(err));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const create = async (data) => {
    const res = await projectService.createProject(data);
    setProjects(prev => [res.data, ...prev]);
    return res.data;
  };

  return { projects, loading, error, refetch: fetchProjects, create };
};

export const useProject = (id) => {
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProject = useCallback(async () => {
    if (!id) return;
    try {
      setLoading(true);
      setError(null);
      const res = await projectService.getProjectById(id);
      setProject(res.data);
    } catch (err) {
      setError(handleError(err));
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchProject();
  }, [fetchProject]);

  const addMember = async (email) => {
    const res = await projectService.addMember(id, email);
    setProject(prev => ({
      ...prev,
      members: [...prev.members, res.data],
    }));
    return res.data;
  };

  const removeMember = async (userId) => {
    await projectService.removeMember(id, userId);
    setProject(prev => ({
      ...prev,
      members: prev.members.filter(m => m.id !== userId),
    }));
  };

  return { project, loading, error, refetch: fetchProject, addMember, removeMember };
};
