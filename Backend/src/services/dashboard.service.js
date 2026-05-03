const prisma = require('../lib/prisma');
const ROLES = require('../constants/roles');

// Aggregate all dashboard stats for the logged-in user
const getStats = async (userId) => {
  // Resolve every project the user belongs to
  const memberships = await prisma.projectMember.findMany({
    where: { userId },
    select: { projectId: true, role: true },
  });

  const projectIds = memberships.map(m => m.projectId);
  const asAdmin  = memberships.filter(m => m.role === ROLES.ADMIN).length;
  const asMember = memberships.filter(m => m.role === ROLES.MEMBER).length;

  if (projectIds.length === 0) {
    return {
      projects: { total: 0, asAdmin: 0, asMember: 0, totalMembers: 0 },
      tasks:    { total: 0, todo: 0, inProgress: 0, done: 0, overdue: 0 },
    };
  }

  const filter = { projectId: { in: projectIds } };

  const [totalTasks, statusGroups, overdueCount, uniqueMembers] = await Promise.all([
    prisma.task.count({ where: filter }),

    prisma.task.groupBy({
      by: ['status'],
      where: filter,
      _count: { status: true },
    }),

    prisma.task.count({
      where: {
        ...filter,
        status: { not: 'DONE' },
        dueDate: { lt: new Date() },
      },
    }),

    // Distinct members across all user's projects
    prisma.projectMember.findMany({
      where: filter,
      select: { userId: true },
      distinct: ['userId'],
    }),
  ]);

  // Flatten groupBy result into a simple map
  const statusMap = { TODO: 0, IN_PROGRESS: 0, DONE: 0 };
  statusGroups.forEach(({ status, _count }) => {
    statusMap[status] = _count.status;
  });

  return {
    projects: {
      total: projectIds.length,
      asAdmin,
      asMember,
      totalMembers: uniqueMembers.length,
    },
    tasks: {
      total: totalTasks,
      todo: statusMap.TODO,
      inProgress: statusMap.IN_PROGRESS,
      done: statusMap.DONE,
      overdue: overdueCount,
    },
  };
};

module.exports = { getStats };
