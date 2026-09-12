'use client';

import {
  FolderKanban, Users, ShieldCheck, UserCheck,
  ListTodo, Timer, CheckCircle2, ClipboardList, AlertTriangle,
} from 'lucide-react';
import Link from 'next/link';
import { useAuthContext } from '@/context/AuthContext';
import { useProjects } from '@/hooks/useProjects';
import { useDashboardStats } from '@/hooks/useDashboardStats';
import StatsCard from '@/components/dashboard/StatsCard';

const RoleBadge = ({ role }) => (
  <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
    role === 'ADMIN'
      ? 'bg-violet-100 text-violet-700 dark:bg-violet-900/20 dark:text-violet-300'
      : 'bg-sky-100 text-sky-700 dark:bg-sky-900/20 dark:text-sky-300'
  }`}>
    {role}
  </span>
);

export default function DashboardPage() {
  const { user } = useAuthContext();
  const { projects, loading: projectsLoading } = useProjects();
  const { stats, loading: statsLoading } = useDashboardStats();

  const greeting = () => {
    const h = new Date().getHours();
    if (h < 12) return 'Good morning';
    if (h < 18) return 'Good afternoon';
    return 'Good evening';
  };

  const v = (n) => (statsLoading ? '—' : (n ?? 0));
  const overdue = stats?.tasks?.overdue ?? 0;

  return (
    <div className="p-4 md:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground">
          {greeting()}, {user?.name?.split(' ')[0]} 👋
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Here's an overview of your team's work
        </p>
      </div>

      {/* Overdue alert banner */}
      {!statsLoading && overdue > 0 && (
        <div className="mb-6 flex flex-wrap items-center gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 md:px-5 md:py-3.5 dark:border-red-900/40 dark:bg-red-900/10">
          <AlertTriangle className="h-4 w-4 shrink-0 text-red-500" />
          <p className="text-sm font-medium text-red-700 dark:text-red-400">
            {overdue} task{overdue > 1 ? 's are' : ' is'} overdue across your projects.
          </p>
          <Link href="/projects" className="text-xs font-semibold text-red-600 hover:underline dark:text-red-400 sm:ml-auto">
            View projects →
          </Link>
        </div>
      )}

      {/* Project stats */}
      <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground/60">Projects</p>
      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard icon={FolderKanban} label="Total Projects" value={v(stats?.projects?.total)}       color="default" />
        <StatsCard icon={ShieldCheck}  label="As Admin"       value={v(stats?.projects?.asAdmin)}     description="Projects you manage"    color="purple" />
        <StatsCard icon={UserCheck}    label="As Member"      value={v(stats?.projects?.asMember)}    description="Projects you joined"    color="green"  />
        <StatsCard icon={Users}        label="Total Members"  value={v(stats?.projects?.totalMembers)} description="Unique across projects" color="orange" />
      </div>

      {/* Task stats */}
      <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground/60">Tasks</p>
      <div className="mb-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard icon={ClipboardList} label="Total Tasks"  value={v(stats?.tasks?.total)}      color="default" />
        <StatsCard icon={ListTodo}      label="To Do"        value={v(stats?.tasks?.todo)}       description="Waiting to be started" color="slate" />
        <StatsCard icon={Timer}         label="In Progress"  value={v(stats?.tasks?.inProgress)} description="Currently active"      color="blue"  />
        <StatsCard icon={CheckCircle2}  label="Completed"    value={v(stats?.tasks?.done)}       description="Tasks finished"        color="green" />
      </div>

      {/* Recent Projects */}
      <div>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-base font-semibold text-foreground">Recent Projects</h2>
          <Link href="/projects" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            View all →
          </Link>
        </div>

        {projectsLoading ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-36 animate-pulse rounded-xl border border-border bg-muted" />
            ))}
          </div>
        ) : projects.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border py-16">
            <FolderKanban className="mb-3 h-10 w-10 text-muted-foreground/50" />
            <p className="text-sm font-medium text-muted-foreground">No projects yet</p>
            <Link href="/projects" className="mt-2 text-sm text-primary hover:underline">
              Create your first project →
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {projects.slice(0, 6).map(project => (
              <Link key={project.id} href={`/projects/${project.id}`}>
                <div className="group rounded-xl border border-border bg-card p-5 transition-all hover:border-primary/50 hover:shadow-md">
                  <div className="mb-3 flex items-start justify-between gap-2">
                    <h3 className="font-semibold text-foreground line-clamp-1 group-hover:text-primary transition-colors">
                      {project.name}
                    </h3>
                    <RoleBadge role={project.myRole} />
                  </div>
                  <p className="mb-4 text-sm text-muted-foreground line-clamp-2 min-h-[40px]">
                    {project.description || 'No description'}
                  </p>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Users className="h-3.5 w-3.5" />
                    <span>{project.memberCount} {project.memberCount === 1 ? 'member' : 'members'}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
