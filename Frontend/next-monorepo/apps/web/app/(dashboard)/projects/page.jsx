'use client';

import { useState } from 'react';
import { Plus, FolderKanban, Loader2 } from 'lucide-react';
import { Button } from '@workspace/ui/components/button';
import ProjectCard from '@/components/projects/ProjectCard';
import CreateProjectModal from '@/components/projects/CreateProjectModal';
import { useProjects } from '@/hooks/useProjects';

export default function ProjectsPage() {
  const { projects, loading, error, create } = useProjects();
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="p-8">
      {/* Page Header */}
      <div className="mb-8 flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Projects</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Manage and organize your team's projects
          </p>
        </div>
        <Button onClick={() => setModalOpen(true)} className="gap-2">
          <Plus className="h-4 w-4" />
          New Project
        </Button>
      </div>

      {/* Content */}
      {loading ? (
        <div className="flex items-center justify-center py-24">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        </div>
      ) : error ? (
        <div className="rounded-xl border border-destructive/30 bg-destructive/10 p-6 text-center">
          <p className="text-sm text-destructive">{error}</p>
        </div>
      ) : projects.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border py-24">
          <div className="mb-4 rounded-full bg-muted p-4">
            <FolderKanban className="h-8 w-8 text-muted-foreground/60" />
          </div>
          <h3 className="mb-1 text-base font-semibold text-foreground">No projects yet</h3>
          <p className="mb-4 text-sm text-muted-foreground">Create your first project to get started</p>
          <Button onClick={() => setModalOpen(true)} className="gap-2">
            <Plus className="h-4 w-4" />
            Create Project
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map(project => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}

      <CreateProjectModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onCreate={create}
      />
    </div>
  );
}
