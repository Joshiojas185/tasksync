import type { Task } from '@/types';
import { PriorityBadge, StatusDot } from '@/components/TaskBadges';
import { Clock, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface KanbanBoardProps {
  columns: string[];
  tasks: Task[];
  onTaskClick: (task: Task) => void;
  onAddTask: (status: string) => void;
  onTaskMove: (taskId: number, newStatus: string) => void;
}

export function KanbanBoard({ columns, tasks, onTaskClick, onAddTask, onTaskMove }: KanbanBoardProps) {
  
  const handleDragStart = (e: React.DragEvent, taskId: number) => {
    e.dataTransfer.setData('taskId', taskId.toString());
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, newStatus: string) => {
    e.preventDefault();
    const taskId = parseInt(e.dataTransfer.getData('taskId'));
    if (!isNaN(taskId)) {
      onTaskMove(taskId, newStatus);
    }
  };

  return (
    <div className="flex-1 flex gap-4 p-4 overflow-x-auto scrollbar-thin bg-slate-950">
      {columns.map((col) => {
        const columnTasks = tasks.filter((t) => t.status === col);
        return (
          <div 
            key={col} 
            className="flex flex-col min-w-[300px] w-[300px]"
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, col)}
          >
            <div className="flex items-center justify-between px-2 pb-3">
              <div className="flex items-center gap-2">
                <StatusDot status={col} />
                <span className="text-sm font-semibold text-slate-200 uppercase tracking-wider">{col}</span>
                <span className="text-xs text-slate-500 bg-slate-900 px-2 py-0.5 rounded-full">{columnTasks.length}</span>
              </div>
              <button onClick={() => onAddTask(col)} className="p-1 hover:bg-slate-800 rounded text-slate-500 hover:text-white transition-colors">
                <Plus className="w-4 h-4" />
              </button>
            </div>

            <div className="flex-1 space-y-3 overflow-y-auto scrollbar-none pb-4 min-h-[150px]">
              {columnTasks.map((task) => (
                <div
                  key={task.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, task.id)}
                  className="cursor-grab active:cursor-grabbing"
                >
                  <KanbanCard task={task} onClick={() => onTaskClick(task)} />
                </div>
              ))}
              <button onClick={() => onAddTask(col)} className="w-full py-2.5 border border-dashed border-slate-800 rounded-lg text-slate-600 hover:text-slate-400 hover:border-slate-600 text-xs transition-all flex items-center justify-center gap-1.5">
                <Plus className="w-3 h-3" /> Add Task
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function KanbanCard({ task, onClick }: { task: Task; onClick: () => void }) {
  return (
    <button onClick={onClick} className="w-full text-left p-4 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 transition-all group shadow-sm">
      <div className="flex items-start justify-between gap-2 mb-2">
        <span className="text-[10px] font-mono text-slate-500">TASK-{task.id}</span>
        <PriorityBadge priority={task.priority} />
      </div>
      <p className="text-sm font-medium text-slate-200 leading-snug mb-3 group-hover:text-blue-400 transition-colors line-clamp-2">{task.title}</p>
      
      <div className="flex items-center justify-between mt-auto">
        <div className="flex items-center gap-2">
          {task.storyPoints > 0 && <span className="text-[10px] font-mono text-slate-400 bg-slate-800 rounded px-1.5 py-0.5">{task.storyPoints} SP</span>}
          {task.hours > 0 && <span className="text-[10px] font-mono text-slate-500 flex items-center gap-1"><Clock className="w-3 h-3" /> {task.hours}h</span>}
        </div>
        
        {/* Profile Picture of Assignee */}
        <Avatar className="h-6 w-6 border border-slate-800">
          <AvatarImage src={task.assigneePicture} />
          <AvatarFallback className="bg-slate-950 text-[10px] text-slate-500">
            {task.assigneeName?.[0]}
          </AvatarFallback>
        </Avatar>
      </div>
    </button>
  );
}