// Format a single member inside a project response
const memberDto = (member) => ({
  id: member.user.id,
  name: member.user.name,
  email: member.user.email,
  role: member.role,
  joinedAt: member.joinedAt,
});

// Format a project for list responses (no members)
const projectListDto = (project, userId) => ({
  id: project.id,
  name: project.name,
  description: project.description,
  createdAt: project.createdAt,
  memberCount: project.members.length,
  myRole: project.members.find(m => m.user.id === userId)?.role ?? 'MEMBER',
});

// Format a single project with full member list
const projectDetailDto = (project, userId) => ({
  id: project.id,
  name: project.name,
  description: project.description,
  createdAt: project.createdAt,
  members: project.members.map(memberDto),
  myRole: project.members.find(m => m.user.id === userId)?.role ?? 'MEMBER',
});

module.exports = { projectListDto, projectDetailDto, memberDto };
