const express = require('express');
const router = express.Router();
const { updateTask, updateTaskStatus, deleteTask } = require('../controllers/task.controller');
const { updateTaskValidator, updateStatusValidator } = require('../validators/task.validator');
const { protect } = require('../middleware/auth.middleware');
const { isTaskProjectMember, isTaskProjectAdmin } = require('../middleware/task.middleware');
const validate = require('../middleware/validate.middleware');

// PATCH /api/tasks/:id/status — Update status (any project member) — must be before /:id
router.patch('/:id/status', protect, isTaskProjectMember, updateStatusValidator, validate, updateTaskStatus);

// PATCH /api/tasks/:id — Update full task (Admin only)
router.patch('/:id', protect, isTaskProjectMember, isTaskProjectAdmin, updateTaskValidator, validate, updateTask);

// DELETE /api/tasks/:id — Delete task (Admin only)
router.delete('/:id', protect, isTaskProjectMember, isTaskProjectAdmin, deleteTask);

module.exports = router;
