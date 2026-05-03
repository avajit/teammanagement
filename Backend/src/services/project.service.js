const prisma = require('../lib/prisma');
const AppError = require('../utils/AppError');
const ROLES = require('../constants/roles');
const { projectListDto, projectDetailDto, memberDto } = require('../dtos/project.dto');

// Centralized user select shape reused across all queries
const userSelect = { id: true, name: true, email: true };

// Member select shape reused across project queries
const memberSelect = {
  members: {
    select: {
      role: true,
      joinedAt: true,
      user: { select: userSelect },
    },
  },
};

// Create project: save to DB, add creator as ADMIN
const createProject = async ({ name, description }, userId) => {
  const project = await prisma.project.create({
    data: {
      name,
      description,
      createdById: userId,
      members: {
        create: { userId, role: ROLES.ADMIN },
      },
    },
    include: memberSelect,
  });

  return projectDetailDto(project);
};

// Get all projects the user belongs to
const getProjects = async (userId) => {
  const projects = await prisma.project.findMany({
    where: { members: { some: { userId } } },
    include: memberSelect,
    orderBy: { createdAt: 'desc' },
  });

  return projects.map(p => projectListDto(p, userId));
};

// Get single project with full member list
const getProjectById = async (projectId, userId) => {
  const project = await prisma.project.findUnique({
    where: { id: projectId },
    include: memberSelect,
  });

  if (!project) throw new AppError('Project not found', 404);

  return projectDetailDto(project, userId);
};

// Add member by email (Admin only)
const addMember = async (projectId, email) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new AppError('No user found with this email', 404);

  const existing = await prisma.projectMember.findUnique({
    where: { projectId_userId: { projectId, userId: user.id } },
  });
  if (existing) throw new AppError('User is already a member of this project', 409);

  const member = await prisma.projectMember.create({
    data: { projectId, userId: user.id, role: ROLES.MEMBER },
    include: { user: { select: userSelect } },
  });

  return memberDto(member);
};

// Remove member by userId (Admin only)
const removeMember = async (projectId, userId, requesterId) => {
  if (userId === requesterId) throw new AppError('You cannot remove yourself from the project', 400);

  const member = await prisma.projectMember.findUnique({
    where: { projectId_userId: { projectId, userId } },
  });
  if (!member) throw new AppError('User is not a member of this project', 404);
  if (member.role === ROLES.ADMIN) throw new AppError('Cannot remove an admin from the project', 403);

  await prisma.projectMember.delete({
    where: { projectId_userId: { projectId, userId } },
  });

  return { message: 'Member removed successfully' };
};

module.exports = { createProject, getProjects, getProjectById, addMember, removeMember };
