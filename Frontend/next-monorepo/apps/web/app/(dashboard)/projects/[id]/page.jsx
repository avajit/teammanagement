'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Plus, Users, Loader2, AlertCircle } from 'lucide-react';
import { Button } from '@workspace/ui/components/button';
import { useAuthContext } from '@/context/AuthContext';
import { useProject } from '@/hooks/useProjects';
import { useTasks } from '@/hooks/useTasks';
import MembersList from '@/components/projects/MembersList';
import AddMemberModal from '@/components/projects/AddMemberModal';
import TaskBoard from '@/components/tasks/TaskBoard';

export default function ProjectDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const { user } = useAuthContext();
  const { project, loading, error, addMember, removeMember } = useProject(id);
  const { tasks, loading: tasksLoading, error: tasksError, createTask, updateTask, updateTaskStatus, deleteTask } = useTasks(id);
  const [addModalOpen, setAddModalOpen] = useState(false);

  const isAdmin = project?.myRole === 'ADMIN';

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center py-24">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 md:p-8">
        <div className="flex items-center gap-3 rounded-xl border border-destructive/30 bg-destructive/10 p-6">
          <AlertCircle className="h-5 w-5 text-destructive shrink-0" />
          <p className="text-sm text-destructive">{error}</p>
        </div>
      </div>
    );
  }

  if (!project) return null;

  return (
    <div className="p-4 md:p-8">
      {/* Back button */}
      <button
        onClick={() => router.push('/projects')}
        className="mb-6 flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Projects
      </button>

      {/* Project header */}
      <div className="mb-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">{project.name}</h1>
            {project.description && (
              <p className="mt-2 text-sm text-muted-foreground max-w-2xl">{project.description}</p>
            )}
          </div>
          <span className={`mt-1 inline-flex shrink-0 items-center rounded-full px-3 py-1 text-xs font-medium ${
            project.myRole === 'ADMIN'
              ? 'bg-violet-100 text-violet-700 dark:bg-violet-900/20 dark:text-violet-300'
              : 'bg-sky-100 text-sky-700 dark:bg-sky-900/20 dark:text-sky-300'
          }`}>
            {project.myRole}
          </span>
        </div>
      </div>

      {/* Members section */}
      <div className="mb-10">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-muted-foreground" />
            <h2 className="text-base font-semibold text-foreground">
              Members <span className="text-muted-foreground font-normal">({project.members.length})</span>
            </h2>
          </div>
          {isAdmin && (
            <Button onClick={() => setAddModalOpen(true)} size="sm" className="gap-2">
              <Plus className="h-3.5 w-3.5" />
              Add Member
            </Button>
          )}
        </div>

        <MembersList
          members={project.members}
          myRole={project.myRole}
          currentUserId={user?.id}
          onRemove={removeMember}
        />
      </div>

      {/* Tasks section */}
      <TaskBoard
        tasks={tasks}
        members={project.members}
        isAdmin={isAdmin}
        loading={tasksLoading}
        error={tasksError}
        onCreateTask={createTask}
        onUpdateTask={updateTask}
        onUpdateStatus={updateTaskStatus}
        onDeleteTask={deleteTask}
      />

      <AddMemberModal
        isOpen={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        onAdd={addMember}
      />
    </div>
  );
}
