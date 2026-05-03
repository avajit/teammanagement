import Link from 'next/link';
import { Users, ChevronRight } from 'lucide-react';

const RoleBadge = ({ role }) => (
  <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
    role === 'ADMIN'
      ? 'bg-violet-100 text-violet-700 dark:bg-violet-900/20 dark:text-violet-300'
      : 'bg-sky-100 text-sky-700 dark:bg-sky-900/20 dark:text-sky-300'
  }`}>
    {role}
  </span>
);

export default function ProjectCard({ project }) {
  return (
    <Link href={`/projects/${project.id}`}>
      <div className="group flex flex-col rounded-xl border border-border bg-card p-6 transition-all hover:border-primary/50 hover:shadow-md cursor-pointer h-full">
        <div className="mb-3 flex items-start justify-between gap-3">
          <h3 className="font-semibold text-foreground line-clamp-1 group-hover:text-primary transition-colors text-base">
            {project.name}
          </h3>
          <RoleBadge role={project.myRole} />
        </div>

        <p className="mb-4 flex-1 text-sm text-muted-foreground line-clamp-2 min-h-[40px]">
          {project.description || 'No description provided'}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Users className="h-3.5 w-3.5" />
            <span>{project.memberCount} {project.memberCount === 1 ? 'member' : 'members'}</span>
          </div>
          <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
        </div>
      </div>
    </Link>
  );
}
