const express = require('express');
const router = express.Router();
const { createProject, getProjects, getProjectById, addMember, removeMember } = require('../controllers/project.controller');
const { createTask, getTasks } = require('../controllers/task.controller');
const { createProjectValidator, addMemberValidator } = require('../validators/project.validator');
const { createTaskValidator } = require('../validators/task.validator');
const { protect } = require('../middleware/auth.middleware');
const { isProjectMember, isProjectAdmin } = require('../middleware/project.middleware');
const validate = require('../middleware/validate.middleware');

// POST /api/projects
router.post('/', protect, createProjectValidator, validate, createProject);

// GET /api/projects
router.get('/', protect, getProjects);

// GET /api/projects/:id
router.get('/:id', protect, isProjectMember, getProjectById);

// POST /api/projects/:id/members
router.post('/:id/members', protect, isProjectMember, isProjectAdmin, addMemberValidator, validate, addMember);

// DELETE /api/projects/:id/members/:userId
router.delete('/:id/members/:userId', protect, isProjectMember, isProjectAdmin, removeMember);

// POST /api/projects/:id/tasks — Create task (Admin only)
router.post('/:id/tasks', protect, isProjectMember, isProjectAdmin, createTaskValidator, validate, createTask);

// GET /api/projects/:id/tasks — Get tasks (scoped by role)
router.get('/:id/tasks', protect, isProjectMember, getTasks);

module.exports = router;
