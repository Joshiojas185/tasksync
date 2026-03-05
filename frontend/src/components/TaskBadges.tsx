import { cn } from '@/lib/utils';

const priorityConfig = {
  High: 'bg-destructive/15 text-destructive',
  Medium: 'bg-warning/15 text-warning',
  Low: 'bg-muted text-muted-foreground',
};

interface PriorityBadgeProps {
  priority: 'Low' | 'Medium' | 'High';
}

export function PriorityBadge({ priority }: PriorityBadgeProps) {
  return (
    <span className={cn('text-[10px] font-medium px-1.5 py-0.5 rounded', priorityConfig[priority])}>
      {priority}
    </span>
  );
}

interface StatusDotProps {
  status: string;
  className?: string;
}

const statusColors: Record<string, string> = {
  'Done': 'bg-success',
  'In Progress': 'bg-info',
  'In Review': 'bg-warning',
  'To Do': 'bg-muted-foreground',
  'Backlog': 'bg-muted-foreground/50',
};

export function StatusDot({ status, className }: StatusDotProps) {
  return (
    <span className={cn('w-2 h-2 rounded-full', statusColors[status] || 'bg-muted-foreground', className)} />
  );
}

interface AvatarInitialsProps {
  name: string;
  className?: string;
}

export function AvatarInitials({ name, className }: AvatarInitialsProps) {
  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className={cn('w-5 h-5 rounded-full bg-primary/20 text-primary flex items-center justify-center text-[9px] font-semibold', className)}>
      {initials}
    </div>
  );
}
