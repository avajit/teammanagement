'use client';

import { useState, useEffect, useCallback } from 'react';
import * as taskService from '../services/task.service';
import handleError from '../lib/utils/handleError';

export const useTasks = (projectId) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTasks = useCallback(async () => {
    if (!projectId) return;
    try {
      setLoading(true);
      setError(null);
      const res = await taskService.getTasks(projectId);
      setTasks(res.data);
    } catch (err) {
      setError(handleError(err));
    } finally {
      setLoading(false);
    }
  }, [projectId]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const createTask = async (data) => {
    const res = await taskService.createTask(projectId, data);
    setTasks(prev => [res.data, ...prev]);
    return res.data;
  };

  const updateTask = async (id, data) => {
    const res = await taskService.updateTask(id, data);
    setTasks(prev => prev.map(t => t.id === id ? res.data : t));
    return res.data;
  };

  const updateTaskStatus = async (id, status) => {
    const res = await taskService.updateTaskStatus(id, status);
    setTasks(prev => prev.map(t => t.id === id ? res.data : t));
    return res.data;
  };

  const deleteTask = async (id) => {
    await taskService.deleteTask(id);
    setTasks(prev => prev.filter(t => t.id !== id));
  };

  return { tasks, loading, error, refetch: fetchTasks, createTask, updateTask, updateTaskStatus, deleteTask };
};
