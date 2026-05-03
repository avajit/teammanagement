const prisma = require('../lib/prisma');
const AppError = require('../utils/AppError');
const ROLES = require('../constants/roles');

// Load task and verify caller is a member of the task's project
const isTaskProjectMember = async (req, _res, next) => {
  try {
    const task = await prisma.task.findUnique({ where: { id: req.params.id } });
    if (!task) return next(new AppError('Task not found', 404));

    const member = await prisma.projectMember.findUnique({
      where: { projectId_userId: { projectId: task.projectId, userId: req.user.id } },
    });
    if (!member) return next(new AppError('You are not a member of this project', 403));

    req.task = task;
    req.projectRole = member.role;
    next();
  } catch (err) {
    next(err);
  }
};

// Require ADMIN role in the task's project
const isTaskProjectAdmin = (req, _res, next) => {
  if (req.projectRole !== ROLES.ADMIN) {
    return next(new AppError('Only project admins can perform this action', 403));
  }
  next();
};

module.exports = { isTaskProjectMember, isTaskProjectAdmin };
