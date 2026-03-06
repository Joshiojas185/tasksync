import { useEffect, useState } from 'react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { Topbar } from '@/components/Topbar';
import api from '@/lib/api';
import { cn } from '@/lib/utils';
import { 
  Clock, Zap, BarChart3, Timer, Layers
} from 'lucide-react';
import { Card } from '@/components/ui/card';

interface TimesheetData {
  totalHours: number;
  daysWorked: number;
  timesheet: {
    date: string;
    totalHours: number;
    tasks: any[];
  }[];
}

export default function TimesheetPage() {
  const [data, setData] = useState<TimesheetData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/api/timesheet').then(res => {
      if (res.data.success) setData(res.data);
      setLoading(false);
    });
  }, []);

  return (
    <DashboardLayout>
      <Topbar title="Velocity Hub" subtitle="Performance metrics and time distribution" />
      
      <div className="p-8 w-full max-w-full mx-auto space-y-12 animate-in fade-in duration-700">
        
        {/* Header Stats - Balanced & Clean */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <MetricCard 
            label="Cumulative" 
            value={`${data?.totalHours || 0}`} 
            unit="HRS"
            icon={<Clock className="w-5 h-5 text-blue-400" />} 
            glowColor="bg-blue-500/10"
          />
          <MetricCard 
            label="Active Streak" 
            value={`${data?.daysWorked || 0}`} 
            unit="DAYS"
            icon={<Zap className="w-5 h-5 text-amber-400" />} 
            glowColor="bg-amber-500/10"
          />
          <MetricCard 
            label="Daily Velocity" 
            value={`${data ? (data.totalHours / (data.daysWorked || 1)).toFixed(1) : 0}`} 
            unit="AVG"
            icon={<Timer className="w-5 h-5 text-emerald-400" />} 
            glowColor="bg-emerald-500/10"
          />
          <MetricCard 
            label="Focus Score" 
            value="94" 
            unit="%"
            icon={<BarChart3 className="w-5 h-5 text-purple-400" />} 
            glowColor="bg-purple-500/10"
          />
        </div>

        {/* Timeline Section */}
        <div className="space-y-10">
          <div className="flex items-center gap-4">
            <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-600">
              Work Journal
            </h2>
            <div className="h-px flex-1 bg-slate-900" />
          </div>

          <div className="space-y-16">
            {data?.timesheet.map((day, idx) => (
              <div key={idx} className="group relative">
                {/* Minimal Vertical Line */}
                {idx !== data.timesheet.length - 1 && (
                  <div className="absolute left-[23px] top-[60px] bottom-[-40px] w-[1px] bg-slate-900" />
                )}

                <div className="flex gap-12">
                  {/* Date Anchor */}
                  <div className="relative z-10 shrink-0">
                    <div className="w-12 h-14 rounded-xl bg-slate-950 border border-slate-900 flex flex-col items-center justify-center transition-colors group-hover:border-slate-700 shadow-sm">
                      <span className="text-[9px] font-black text-slate-600 uppercase tracking-tighter mb-1">
                        {new Date(day.date).toLocaleString('default', { month: 'short' })}
                      </span>
                      <span className="text-xl font-black text-white leading-none">
                        {new Date(day.date).getDate()}
                      </span>
                    </div>
                  </div>

                  {/* Daily Content */}
                  <div className="flex-1 space-y-6">
                    <div className="flex items-end justify-between border-b border-slate-900 pb-4">
                      <div className="flex flex-col">
                        <h3 className="text-lg font-bold text-slate-200 tracking-tight">
                          {new Date(day.date).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric' })}
                        </h3>
                        <p className="text-[9px] font-bold text-slate-600 uppercase tracking-widest mt-1">
                          {day.totalHours} Hours Distributed
                        </p>
                      </div>
                      <span className="text-[10px] font-mono font-bold text-slate-500">
                        {((day.totalHours / 8) * 100).toFixed(0)}% LOAD
                      </span>
                    </div>

                    {/* Task Grid - High density packing */}
                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                      {day.tasks.map((task: any, tIdx: number) => (
                        <div 
                          key={tIdx} 
                          className="bg-slate-900/20 border border-slate-900 rounded-2xl p-6 flex items-center justify-between hover:bg-slate-900/40 hover:border-slate-800 transition-all duration-300"
                        >
                          <div className="flex-1 min-w-0 pr-6">
                            <div className="flex items-center gap-2 mb-2">
                              <span className="text-[9px] font-black uppercase text-blue-500 tracking-widest">
                                {task.boardTitle}
                              </span>
                              <div className="w-1 h-1 rounded-full bg-slate-800" />
                              <span className="text-[9px] font-bold text-slate-600 uppercase">
                                {task.sprintTitle}
                              </span>
                            </div>
                            <h4 className="text-base font-bold text-slate-100 truncate">
                              {task.subtaskTitle}
                            </h4>
                            <div className="flex items-center gap-2 mt-1.5 opacity-40">
                                <Layers className="w-3 h-3 text-slate-400" />
                                <span className="text-[10px] text-slate-400 font-medium uppercase tracking-tighter">
                                    {task.taskTitle || 'Default'}
                                </span>
                            </div>
                          </div>

                          <div className="flex flex-col items-end border-l border-slate-900 pl-8 shrink-0">
                            <span className="text-3xl font-black text-white tracking-tighter leading-none">
                                {task.hoursWorked}
                            </span>
                            <span className="text-[9px] font-black text-slate-600 uppercase tracking-[0.2em] mt-1">
                                Hour
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

function MetricCard({ label, value, unit, icon, glowColor }: { 
  label: string; 
  value: string; 
  unit: string;
  icon: React.ReactNode; 
  glowColor: string;
}) {
  return (
    <Card className="relative overflow-hidden bg-slate-900/30 border-slate-900 rounded-[1.5rem] p-8 transition-all duration-500 hover:border-slate-800 group">
      {/* Dynamic Glow */}
      <div className={cn("absolute -right-4 -top-4 w-24 h-24 blur-[40px] rounded-full transition-opacity opacity-50 group-hover:opacity-100", glowColor)} />
      
      <div className="relative z-10 flex flex-col gap-8">
        <div className="w-10 h-10 rounded-xl bg-slate-950 border border-slate-900 flex items-center justify-center">
            {icon}
        </div>

        <div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-5xl font-black text-white tracking-tighter">{value}</span>
            <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest">{unit}</span>
          </div>
          <p className="text-[10px] uppercase text-slate-500 font-black tracking-[0.2em] mt-2">{label}</p>
        </div>
      </div>
    </Card>
  );
}