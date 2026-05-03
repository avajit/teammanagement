'use client';

import { useState } from 'react';
import { Plus, ClipboardList, Loader2, Timer, CheckCircle2 } from 'lucide-react';
import TaskCard from './TaskCard';
import TaskFormModal from './TaskFormModal';

const COLUMNS = [
  { status: 'TODO',        label: 'To Do',       icon: ClipboardList, color: 'text-slate-500',  dot: 'bg-slate-400',  border: 'border-slate-200 dark:border-slate-700' },
  { status: 'IN_PROGRESS', label: 'In Progress',  icon: Timer,         color: 'text-blue-500',   dot: 'bg-blue-400',   border: 'border-blue-200 dark:border-blue-900/50' },
  { status: 'DONE',        label: 'Done',         icon: CheckCircle2,  color: 'text-green-500',  dot: 'bg-green-400',  border: 'border-green-200 dark:border-green-900/50' },
];

export default function TaskBoard({ tasks, members, isAdmin, loading, error, onCreateTask, onUpdateTask, onUpdateStatus, onDeleteTask }) {
  const [createOpen, setCreateOpen] = useState(false);
  const [editTask, setEditTask] = useState(null);

  const handleCreate = async (data) => {
    await onCreateTask(data);
  };

  const handleEdit = async (data) => {
    await onUpdateTask(editTask.id, data);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16">
        <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (error) {
    return <p className="text-sm text-destructive py-4">{error}</p>;
  }

  return (
    <>
      {/* Board header */}
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h2 className="text-base font-semibold text-foreground">Tasks</h2>
          <span className="rounded-full bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground">
            {tasks.length}
          </span>
        </div>
        {isAdmin && (
          <button
            onClick={() => setCreateOpen(true)}
            className="flex items-center gap-1.5 rounded-lg bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            <Plus className="h-3.5 w-3.5" />
            Add Task
          </button>
        )}
      </div>

      {/* Kanban columns */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {COLUMNS.map(({ status, label, icon: Icon, color, dot, border }) => {
          const columnTasks = tasks.filter(t => t.status === status);
          return (
            <div key={status} className={`rounded-xl border ${border} bg-muted/30 p-3`}>
              {/* Column header */}
              <div className="mb-3 flex items-center gap-2 px-1">
                <span className={`h-2 w-2 rounded-full ${dot}`} />
                <Icon className={`h-3.5 w-3.5 ${color}`} />
                <span className="text-sm font-medium text-foreground">{label}</span>
                <span className="ml-auto rounded-full bg-background px-2 py-0.5 text-xs font-medium text-muted-foreground border border-border">
                  {columnTasks.length}
                </span>
              </div>

              {/* Task cards */}
              <div className="flex flex-col gap-2.5 min-h-[60px]">
                {columnTasks.length === 0 ? (
                  <div className="flex items-center justify-center rounded-lg border border-dashed border-border py-8">
                    <p className="text-xs text-muted-foreground/50">No tasks</p>
                  </div>
                ) : (
                  columnTasks.map(task => (
                    <TaskCard
                      key={task.id}
                      task={task}
                      isAdmin={isAdmin}
                      onStatusChange={onUpdateStatus}
                      onEdit={setEditTask}
                      onDelete={onDeleteTask}
                    />
                  ))
                )}
              </div>

              {/* Quick-add in TODO column for admins */}
              {isAdmin && status === 'TODO' && (
                <button
                  onClick={() => setCreateOpen(true)}
                  className="mt-2.5 flex w-full items-center gap-2 rounded-lg px-3 py-2 text-xs text-muted-foreground hover:bg-muted transition-colors"
                >
                  <Plus className="h-3.5 w-3.5" />
                  Add a task
                </button>
              )}
            </div>
          );
        })}
      </div>

      {/* Create modal */}
      <TaskFormModal
        isOpen={createOpen}
        onClose={() => setCreateOpen(false)}
        onSubmit={handleCreate}
        members={members}
      />

      {/* Edit modal */}
      <TaskFormModal
        isOpen={!!editTask}
        onClose={() => setEditTask(null)}
        onSubmit={handleEdit}
        members={members}
        task={editTask}
      />
    </>
  );
}
