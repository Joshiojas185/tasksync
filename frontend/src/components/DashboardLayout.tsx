import { useState } from 'react';
import { AppSidebar } from './AppSidebar';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="flex h-screen w-screen bg-slate-950 overflow-hidden text-slate-200">
      {/* Fixed Sidebar with correct props */}
      <AppSidebar 
        isCollapsed={isCollapsed} 
        onToggle={() => setIsCollapsed(!isCollapsed)} 
      />
      
      {/* Main content now adjusts its width smoothly based on sidebar state */}
      <main className={cn(
        "flex-1 flex flex-col min-w-0 relative transition-all duration-500 ease-in-out",
        isCollapsed ? "ml-0" : "ml-0" 
      )}>
        <div className="flex-1 overflow-y-auto scrollbar-thin">
          {children}
        </div>
      </main>
    </div>
  );
}

// Add this helper if not already in your utils
import { cn } from '@/lib/utils';