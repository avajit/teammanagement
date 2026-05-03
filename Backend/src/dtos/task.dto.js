// Shape returned for every task response
const taskDto = (task) => ({
  id: task.id,
  title: task.title,
  description: task.description,
  priority: task.priority,
  status: task.status,
  dueDate: task.dueDate,
  createdAt: task.createdAt,
  updatedAt: task.updatedAt,
  projectId: task.projectId,
  assignedTo: task.assignedTo
    ? { id: task.assignedTo.id, name: task.assignedTo.name, email: task.assignedTo.email }
    : null,
  createdBy: { id: task.createdBy.id, name: task.createdBy.name },
});

module.exports = { taskDto };
