const projectService = require('../services/project.service');

// Create a new project
const createProject = async (req, res, next) => {
  try {
    const data = await projectService.createProject(req.body, req.user.id);
    res.status(201).json({ status: 'success', data });
  } catch (err) {
    next(err);
  }
};

// Get all projects for logged-in user
const getProjects = async (req, res, next) => {
  try {
    const data = await projectService.getProjects(req.user.id);
    res.status(200).json({ status: 'success', data });
  } catch (err) {
    next(err);
  }
};

// Get single project by id
const getProjectById = async (req, res, next) => {
  try {
    const data = await projectService.getProjectById(req.params.id, req.user.id);
    res.status(200).json({ status: 'success', data });
  } catch (err) {
    next(err);
  }
};

// Add member to project by email
const addMember = async (req, res, next) => {
  try {
    const data = await projectService.addMember(req.params.id, req.body.email);
    res.status(201).json({ status: 'success', data });
  } catch (err) {
    next(err);
  }
};

// Remove member from project
const removeMember = async (req, res, next) => {
  try {
    const data = await projectService.removeMember(req.params.id, req.params.userId, req.user.id);
    res.status(200).json({ status: 'success', ...data });
  } catch (err) {
    next(err);
  }
};

module.exports = { createProject, getProjects, getProjectById, addMember, removeMember };
