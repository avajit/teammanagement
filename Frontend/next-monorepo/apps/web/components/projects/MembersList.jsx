'use client';

import { Trash2, ShieldCheck, User } from 'lucide-react';

const RoleBadge = ({ role }) => (
  <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium ${
    role === 'ADMIN'
      ? 'bg-violet-100 text-violet-700 dark:bg-violet-900/20 dark:text-violet-300'
      : 'bg-sky-100 text-sky-700 dark:bg-sky-900/20 dark:text-sky-300'
  }`}>
    {role === 'ADMIN' ? <ShieldCheck className="h-3 w-3" /> : <User className="h-3 w-3" />}
    {role}
  </span>
);

const Avatar = ({ name }) => {
  const initials = name?.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) || '?';
  return (
    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
      {initials}
    </div>
  );
};

export default function MembersList({ members, myRole, currentUserId, onRemove }) {
  const isAdmin = myRole === 'ADMIN';

  return (
    <div className="divide-y divide-border rounded-xl border border-border bg-card overflow-hidden">
      {members.map(member => (
        <div key={member.id} className="flex items-center gap-4 px-5 py-4">
          <Avatar name={member.name} />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <p className="text-sm font-medium text-foreground truncate">{member.name}</p>
              {member.id === currentUserId && (
                <span className="text-xs text-muted-foreground">(you)</span>
              )}
            </div>
            <p className="text-xs text-muted-foreground truncate">{member.email}</p>
          </div>
          <RoleBadge role={member.role} />
          {isAdmin && member.role !== 'ADMIN' && member.id !== currentUserId && (
            <button
              onClick={() => onRemove(member.id)}
              className="ml-2 rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
              title="Remove member"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          )}
        </div>
      ))}
    </div>
  );
}
