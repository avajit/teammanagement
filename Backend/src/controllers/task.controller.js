const taskService = require('../services/task.service');

// Create a task in a project
const createTask = async (req, res, next) => {
  try {
    const data = await taskService.createTask(req.params.id, req.body, req.user.id);
    res.status(201).json({ status: 'success', data });
  } catch (err) {
    next(err);
  }
};

// Get tasks for a project (scoped by role)
const getTasks = async (req, res, next) => {
  try {
    const data = await taskService.getTasks(req.params.id, req.user.id, req.projectRole);
    res.status(200).json({ status: 'success', data });
  } catch (err) {
    next(err);
  }
};

// Update task fields (Admin only)
const updateTask = async (req, res, next) => {
  try {
    const data = await taskService.updateTask(req.params.id, req.body, req.task.projectId);
    res.status(200).json({ status: 'success', data });
  } catch (err) {
    next(err);
  }
};

// Update task status only (any project member)
const updateTaskStatus = async (req, res, next) => {
  try {
    const data = await taskService.updateTaskStatus(req.params.id, req.body.status);
    res.status(200).json({ status: 'success', data });
  } catch (err) {
    next(err);
  }
};

// Delete a task (Admin only)
const deleteTask = async (req, res, next) => {
  try {
    const data = await taskService.deleteTask(req.params.id);
    res.status(200).json({ status: 'success', ...data });
  } catch (err) {
    next(err);
  }
};

module.exports = { createTask, getTasks, updateTask, updateTaskStatus, deleteTask };
