const prisma = require('../lib/prisma');
const AppError = require('../utils/AppError');
const ROLES = require('../constants/roles');

// Check user belongs to this project (any role)
const isProjectMember = async (req, _res, next) => {
  try {
    const member = await prisma.projectMember.findUnique({
      where: {
        projectId_userId: {
          projectId: req.params.id,
          userId: req.user.id,
        },
      },
    });

    if (!member) return next(new AppError('You are not a member of this project', 403));

    req.projectRole = member.role;
    next();
  } catch (err) {
    next(err);
  }
};

// Check user is ADMIN of this project
const isProjectAdmin = (req, _res, next) => {
  if (req.projectRole !== ROLES.ADMIN) {
    return next(new AppError('Only project admins can perform this action', 403));
  }
  next();
};

module.exports = { isProjectMember, isProjectAdmin };
