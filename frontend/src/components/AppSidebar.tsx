import { Layout, Clock, LogOut, Settings, CheckSquare, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface AppSidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

export function AppSidebar({ isCollapsed, onToggle }: AppSidebarProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    { icon: Layout, label: 'Boards', href: '/' },
    { icon: Clock, label: 'My Tasks', href: '/timesheet' }
  ];

  return (
    <aside className={cn(
      "bg-slate-950 border-r border-slate-900 flex flex-col h-full transition-all duration-500 ease-in-out relative z-50",
      isCollapsed ? "w-[80px]" : "w-[260px]"
    )}>
      {/* Hover-Glow Toggle Button */}
      <button 
        onClick={onToggle}
        className="absolute -right-3 top-12 w-6 h-6 bg-slate-900 border border-slate-800 rounded-full flex items-center justify-center text-slate-400 hover:text-blue-400 z- transition-all shadow-xl hover:scale-110 active:scale-95"
      >
        {isCollapsed ? <ChevronRight className="w-3 h-3" /> : <ChevronLeft className="w-3 h-3" />}
      </button>

      {/* Brand Header */}
      <div className={cn("p-6 flex items-center gap-3 overflow-hidden whitespace-nowrap", isCollapsed ? "justify-center" : "")}>
        <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center shrink-0 shadow-lg shadow-blue-900/20">
          <CheckSquare className="w-5 h-5 text-white" />
        </div>
        {!isCollapsed && (
          <span className="font-black text-xl text-white tracking-tighter uppercase animate-in fade-in slide-in-from-left-2 duration-500">
            TaskSync
          </span>
        )}
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-3 space-y-2 mt-6">
        {navItems.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                "flex items-center rounded-2xl text-sm font-bold transition-all duration-300 group relative",
                isCollapsed ? "justify-center h-14 w-14 mx-auto" : "px-4 py-3.5 gap-4 w-full",
                isActive
                  ? "bg-blue-600/10 text-blue-400 border border-blue-600/20"
                  : "text-slate-500 hover:text-slate-200 hover:bg-slate-900"
              )}
            >
              <item.icon className={cn(
                "w-5 h-5 shrink-0 transition-colors",
                isActive ? "text-blue-400" : "text-slate-600 group-hover:text-slate-400"
              )} />
              
              {!isCollapsed && (
                <span className="animate-in fade-in slide-in-from-left-2 duration-300">
                  {item.label}
                </span>
              )}

              {/* Active Indicator Dot for Collapsed Mode */}
              {isCollapsed && isActive && (
                <div className="absolute right-1 w-1 h-1 bg-blue-500 rounded-full shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* User & Footer Actions */}
      <div className="p-4 mt-auto border-t border-slate-900/50">
        <div className={cn(
          "bg-slate-900/30 rounded-[1.5rem] border border-slate-800/40 transition-all duration-500 overflow-hidden",
          isCollapsed ? "p-1.5" : "p-4"
        )}>
          <div className={cn("flex items-center gap-3 transition-all", isCollapsed ? "justify-center mb-0 h-10" : "mb-4")}>
            <Avatar className={cn("ring-2 ring-slate-800 transition-all shrink-0", isCollapsed ? "h-8 w-8" : "h-10 w-10")}>
              <AvatarImage src={user?.picture} />
              <AvatarFallback className="bg-blue-600 text-white font-black text-xs">
                {user?.name?.charAt(0) || 'U'}
              </AvatarFallback>
            </Avatar>
            {!isCollapsed && (
              <div className="flex-1 min-w-0 animate-in fade-in duration-500">
                <p className="text-sm font-black text-white truncate leading-tight">{user?.name}</p>
                <p className="text-[9px] text-slate-500 font-bold uppercase tracking-widest truncate mt-0.5">
                  {user?.role?.[0] || 'Member'}
                </p>
              </div>
            )}
          </div>

          {!isCollapsed && (
            <div className="flex gap-2 animate-in slide-in-from-bottom-2 duration-500">
              <button className="flex-1 flex items-center justify-center h-10 rounded-xl bg-slate-800/50 text-slate-500 hover:text-white hover:bg-slate-800 transition-all border border-transparent hover:border-slate-700">
                <Settings className="w-4 h-4" />
              </button>
              <button 
                onClick={handleLogout}
                className="flex-1 flex items-center justify-center h-10 rounded-xl bg-red-950/20 text-red-500 hover:bg-red-600 hover:text-white transition-all border border-red-500/10 hover:border-red-500"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}