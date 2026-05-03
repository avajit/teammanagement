const prisma = require('../lib/prisma');
const AppError = require('../utils/AppError');
const ROLES = require('../constants/roles');
const { taskDto } = require('../dtos/task.dto');

// Reusable include shape for all task queries
const taskInclude = {
  assignedTo: { select: { id: true, name: true, email: true } },
  createdBy: { select: { id: true, name: true } },
};

// Validate assignee is a member of the project
const assertAssigneeMember = async (projectId, assignedToId) => {
  const member = await prisma.projectMember.findUnique({
    where: { projectId_userId: { projectId, userId: assignedToId } },
  });
  if (!member) throw new AppError('Assigned user is not a member of this project', 400);
};

// Create a task in a project (Admin only, enforced at route level)
const createTask = async (projectId, data, userId) => {
  const { title, description, priority, dueDate, assignedToId } = data;

  if (assignedToId) await assertAssigneeMember(projectId, assignedToId);

  const task = await prisma.task.create({
    data: {
      title,
      description,
      priority,
      dueDate: dueDate ? new Date(dueDate) : null,
      projectId,
      assignedToId: assignedToId || null,
      createdById: userId,
    },
    include: taskInclude,
  });

  return taskDto(task);
};

// Get tasks: Admin sees all, Member sees only their assigned tasks
const getTasks = async (projectId, userId, role) => {
  const where = role === ROLES.ADMIN
    ? { projectId }
    : { projectId, assignedToId: userId };

  const tasks = await prisma.task.findMany({
    where,
    include: taskInclude,
    orderBy: { createdAt: 'desc' },
  });

  return tasks.map(taskDto);
};

// Update task fields (Admin only, enforced at route level)
const updateTask = async (taskId, data, projectId) => {
  const { title, description, priority, dueDate, assignedToId } = data;

  if (assignedToId !== undefined && assignedToId) {
    await assertAssigneeMember(projectId, assignedToId);
  }

  const task = await prisma.task.update({
    where: { id: taskId },
    data: {
      ...(title !== undefined && { title }),
      ...(description !== undefined && { description }),
      ...(priority !== undefined && { priority }),
      ...(dueDate !== undefined && { dueDate: dueDate ? new Date(dueDate) : null }),
      ...(assignedToId !== undefined && { assignedToId: assignedToId || null }),
    },
    include: taskInclude,
  });

  return taskDto(task);
};

// Update task status only (any project member)
const updateTaskStatus = async (taskId, status) => {
  const task = await prisma.task.update({
    where: { id: taskId },
    data: { status },
    include: taskInclude,
  });

  return taskDto(task);
};

// Delete a task (Admin only, enforced at route level)
const deleteTask = async (taskId) => {
  await prisma.task.delete({ where: { id: taskId } });
  return { message: 'Task deleted successfully' };
};

module.exports = { createTask, getTasks, updateTask, updateTaskStatus, deleteTask };
