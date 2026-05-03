'use client';

import { useState } from 'react';
import { Calendar, Pencil, Trash2, ChevronRight, RotateCcw, CheckCheck } from 'lucide-react';

const PRIORITY_STYLES = {
  HIGH:   { bar: 'bg-red-500',   badge: 'bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400' },
  MEDIUM: { bar: 'bg-amber-400', badge: 'bg-amber-100 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400' },
  LOW:    { bar: 'bg-slate-300', badge: 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400' },
};

const STATUS_TRANSITIONS = {
  TODO:        { label: 'Start',   icon: ChevronRight, next: 'IN_PROGRESS' },
  IN_PROGRESS: { label: 'Done',    icon: CheckCheck,   next: 'DONE' },
  DONE:        { label: 'Reopen',  icon: RotateCcw,    next: 'IN_PROGRESS' },
};

export default function TaskCard({ task, isAdmin, onStatusChange, onEdit, onDelete }) {
  const [busy, setBusy] = useState(false);
  const priority = PRIORITY_STYLES[task.priority] ?? PRIORITY_STYLES.MEDIUM;
  const transition = STATUS_TRANSITIONS[task.status];

  const isOverdue =
    task.dueDate &&
    task.status !== 'DONE' &&
    new Date(task.dueDate) < new Date();

  const handleStatusChange = async () => {
    if (busy) return;
    setBusy(true);
    try { await onStatusChange(task.id, transition.next); }
    finally { setBusy(false); }
  };

  const handleDelete = async () => {
    if (!confirm(`Delete "${task.title}"?`)) return;
    await onDelete(task.id);
  };

  const TransitionIcon = transition.icon;

  return (
    <div className="group relative flex gap-0 rounded-xl border border-border bg-card shadow-sm transition-shadow hover:shadow-md overflow-hidden">
      {/* Priority bar */}
      <div className={`w-1 shrink-0 rounded-l-xl ${priority.bar}`} />

      <div className="flex-1 p-4">
        {/* Title + admin actions */}
        <div className="mb-1 flex items-start justify-between gap-2">
          <h4 className="font-medium text-foreground leading-snug line-clamp-2">{task.title}</h4>
          {isAdmin && (
            <div className="flex shrink-0 gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={() => onEdit(task)}
                className="rounded p-1 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
              >
                <Pencil className="h-3.5 w-3.5" />
              </button>
              <button
                onClick={handleDelete}
                className="rounded p-1 text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </div>
          )}
        </div>

        {/* Description */}
        {task.description && (
          <p className="mb-3 text-xs text-muted-foreground line-clamp-2">{task.description}</p>
        )}

        {/* Meta row */}
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium ${priority.badge}`}>
            {task.priority}
          </span>
          {task.dueDate && (
            <span className={`inline-flex items-center gap-1 text-[10px] ${isOverdue ? 'text-destructive font-medium' : 'text-muted-foreground'}`}>
              <Calendar className="h-3 w-3" />
              {new Date(task.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              {isOverdue && ' · overdue'}
            </span>
          )}
        </div>

        {/* Footer: assignee + move button */}
        <div className="flex items-center justify-between gap-2">
          {task.assignedTo ? (
            <div className="flex items-center gap-1.5">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 text-[10px] font-semibold text-primary">
                {task.assignedTo.name?.charAt(0).toUpperCase()}
              </span>
              <span className="text-xs text-muted-foreground truncate max-w-[100px]">{task.assignedTo.name}</span>
            </div>
          ) : (
            <span className="text-xs text-muted-foreground/50 italic">Unassigned</span>
          )}

          <button
            onClick={handleStatusChange}
            disabled={busy}
            className="flex shrink-0 items-center gap-1 rounded-lg bg-muted px-2.5 py-1 text-[11px] font-medium text-muted-foreground hover:bg-primary/10 hover:text-primary transition-colors disabled:opacity-50"
          >
            <TransitionIcon className="h-3 w-3" />
            {transition.label}
          </button>
        </div>
      </div>
    </div>
  );
}
