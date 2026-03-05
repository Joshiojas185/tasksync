import { Search, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TopbarProps {
  title: string;
  subtitle?: string;
  onCreateClick?: () => void;
  createLabel?: string;
  children?: React.ReactNode;
}

export function Topbar({ title, subtitle, onCreateClick, createLabel, children }: TopbarProps) {
  return (
    <header className="h-12 flex items-center justify-between px-4 border-b border-topbar-border bg-topbar flex-shrink-0">
      <div className="flex items-center gap-3">
        <div>
          <h1 className="text-sm font-semibold text-foreground leading-tight">{title}</h1>
          {subtitle && <p className="text-xs text-muted-foreground">{subtitle}</p>}
        </div>
      </div>
      <div className="flex items-center gap-2">
        {children}
        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search…"
            className="h-7 w-44 pl-8 pr-3 text-xs rounded-md border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
          />
        </div>
        {onCreateClick && (
          <button
            onClick={onCreateClick}
            className="h-7 px-3 text-xs font-medium rounded-md bg-primary text-primary-foreground hover:opacity-90 transition-opacity flex items-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" />
            {createLabel || 'Create'}
          </button>
        )}
      </div>
    </header>
  );
}
