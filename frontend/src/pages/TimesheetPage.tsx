// // // import { useEffect, useState } from 'react';
// // // import { DashboardLayout } from '@/components/DashboardLayout';
// // // import { Topbar } from '@/components/Topbar';
// // // import api from '@/lib/api';
// // // import { cn } from '@/lib/utils';
// // // import { Clock, Calendar, Briefcase, ChevronRight, Layers } from 'lucide-react';
// // // import { Card, CardContent } from '@/components/ui/card';

// // // interface TimesheetData {
// // //   totalHours: number;
// // //   daysWorked: number;
// // //   timesheet: {
// // //     date: string;
// // //     totalHours: number;
// // //     tasks: any[];
// // //   }[];
// // // }

// // // export default function TimesheetPage() {
// // //   const [data, setData] = useState<TimesheetData | null>(null);
// // //   const [loading, setLoading] = useState(true);

// // //   useEffect(() => {
// // //     api.get('/api/timesheet').then(res => {
// // //       if (res.data.success) setData(res.data);
// // //       setLoading(false);
// // //     });
// // //   }, []);

// // //   return (
// // //     <DashboardLayout>
// // //       <Topbar title="Personal Timesheet" subtitle="Track your daily work velocity and logged hours" />
      
// // //       <div className="p-8 max-w-6xl mx-auto space-y-10">
// // //         {/* Stats Overview */}
// // //         <div className="grid grid-cols-3 gap-8">
// // //           <StatCard label="Total Invested" value={`${data?.totalHours || 0}h`} icon={<Clock className="text-blue-500" />} />
// // //           <StatCard label="Days Active" value={`${data?.daysWorked || 0} Days`} icon={<Calendar className="text-emerald-500" />} />
// // //           <StatCard label="Avg. Daily" value={`${data ? (data.totalHours / (data.daysWorked || 1)).toFixed(1) : 0}h`} icon={<Layers className="text-purple-500" />} />
// // //         </div>

// // //         {/* Timeline */}
// // //         <div className="space-y-8">
// // //           {data?.timesheet.map((day, idx) => (
// // //             <div key={idx} className="relative pl-8 border-l border-slate-800">
// // //               <div className="absolute -left-1.5 top-0 w-3 h-3 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
              
// // //               <div className="flex items-center justify-between mb-4">
// // //                 <h3 className="text-lg font-black text-slate-100 uppercase tracking-widest">
// // //                   {new Date(day.date).toLocaleDateString(undefined, { dateStyle: 'full' })}
// // //                 </h3>
// // //                 <span className="px-4 py-1 bg-slate-900 border border-slate-800 rounded-full text-xs font-bold text-slate-400">
// // //                   Total: {day.totalHours}h
// // //                 </span>
// // //               </div>

// // //               <div className="grid gap-4">
// // //                 {day.tasks.map((task: any, tIdx: number) => (
// // //                   <Card key={tIdx} className="bg-slate-900/40 border-slate-800/50 hover:bg-slate-900/60 transition-all group">
// // //                     <CardContent className="p-6 flex items-center gap-6">
// // //                       <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-500 group-hover:text-blue-400 transition-colors">
// // //                         <ChevronRight className="w-5 h-5" />
// // //                       </div>
                      
// // //                       <div className="flex-1">
// // //                         <div className="flex items-center gap-3 mb-1">
// // //                           <span className="text-[10px] font-black uppercase text-blue-500 tracking-tighter">{task.boardTitle}</span>
// // //                           <span className="text-slate-700">•</span>
// // //                           <span className="text-[10px] font-bold text-slate-500">{task.sprintTitle}</span>
// // //                         </div>
// // //                         <p className="text-slate-100 font-bold">{task.subtaskTitle}</p>
// // //                       </div>

// // //                       <div className="text-right">
// // //                         <p className="text-xl font-black text-white font-mono">{task.hoursWorked}h</p>
// // //                         <p className="text-[10px] uppercase text-slate-500 font-bold">Logged</p>
// // //                       </div>
// // //                     </CardContent>
// // //                   </Card>
// // //                 ))}
// // //               </div>
// // //             </div>
// // //           ))}
// // //         </div>
// // //       </div>
// // //     </DashboardLayout>
// // //   );
// // // }

// // // function StatCard({ label, value, icon }: { label: string; value: string; icon: React.ReactNode }) {
// // //   return (
// // //     <div className="p-8 rounded-[2rem] bg-slate-900/20 border border-slate-800 shadow-inner">
// // //       <div className="flex items-center gap-4 mb-3">
// // //         <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 shadow-sm">{icon}</div>
// // //         <p className="text-[10px] uppercase text-slate-500 font-black tracking-widest">{label}</p>
// // //       </div>
// // //       <p className="text-4xl font-black text-white tracking-tighter">{value}</p>
// // //     </div>
// // //   );
// // // }

























// // import { useEffect, useState } from 'react';
// // import { DashboardLayout } from '@/components/DashboardLayout';
// // import { Topbar } from '@/components/Topbar';
// // import api from '@/lib/api';
// // import { cn } from '@/lib/utils';
// // import { 
// //   Clock, Calendar as CalendarIcon, ChevronRight, 
// //   Layers, Zap, BarChart3, ArrowUpRight, Timer
// // } from 'lucide-react';
// // import { Card } from '@/components/ui/card';
// // import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// // interface TimesheetData {
// //   totalHours: number;
// //   daysWorked: number;
// //   timesheet: {
// //     date: string;
// //     totalHours: number;
// //     tasks: any[];
// //   }[];
// // }

// // export default function TimesheetPage() {
// //   const [data, setData] = useState<TimesheetData | null>(null);
// //   const [loading, setLoading] = useState(true);

// //   useEffect(() => {
// //     api.get('/api/timesheet').then(res => {
// //       if (res.data.success) setData(res.data);
// //       setLoading(false);
// //     });
// //   }, []);

// //   return (
// //     <DashboardLayout>
// //       <Topbar title="Velocity Hub" subtitle="Real-time performance metrics and time distribution" />
      
// //       <div className="p-8 max-w-[1400px] mx-auto space-y-12 animate-in fade-in duration-700">
        
// //         {/* Header Stats - Ultra Modern */}
// //         <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
// //           <MetricCard 
// //             label="Cumulative Hours" 
// //             value={`${data?.totalHours || 0}`} 
// //             unit="HRS"
// //             icon={<Clock className="w-5 h-5 text-blue-400" />} 
// //             trend="+12% vs last week"
// //             glowColor="bg-blue-500/20"
// //           />
// //           <MetricCard 
// //             label="Active Streak" 
// //             value={`${data?.daysWorked || 0}`} 
// //             unit="DAYS"
// //             icon={<Zap className="w-5 h-5 text-amber-400" />} 
// //             trend="Consistent growth"
// //             glowColor="bg-amber-500/20"
// //           />
// //           <MetricCard 
// //             label="Daily Velocity" 
// //             value={`${data ? (data.totalHours / (data.daysWorked || 1)).toFixed(1) : 0}`} 
// //             unit="AVG"
// //             icon={<Timer className="w-5 h-5 text-emerald-400" />} 
// //             trend="Peak efficiency"
// //             glowColor="bg-emerald-500/20"
// //           />
// //           <MetricCard 
// //             label="Focus Score" 
// //             value="94" 
// //             unit="%"
// //             icon={<BarChart3 className="w-5 h-5 text-purple-400" />} 
// //             trend="Top 5% of team"
// //             glowColor="bg-purple-500/20"
// //           />
// //         </div>

// //         {/* Timeline Section */}
// //         <div className="space-y-12">
// //           <div className="flex items-center justify-between">
// //             <h2 className="text-sm font-black uppercase tracking-[0.4em] text-slate-500 flex items-center gap-3">
// //               <div className="w-8 h-[2px] bg-blue-600" />
// //               Work Journal
// //             </h2>
// //           </div>

// //           <div className="space-y-16">
// //             {data?.timesheet.map((day, idx) => (
// //               <div key={idx} className="group relative">
// //                 {/* Visual Connector */}
// //                 {idx !== data.timesheet.length - 1 && (
// //                   <div className="absolute left-[23px] top-[60px] bottom-[-40px] w-[2px] bg-gradient-to-b from-slate-800 to-transparent" />
// //                 )}

// //                 <div className="flex gap-10">
// //                   {/* Date Bubble */}
// //                   <div className="relative z-10 shrink-0">
// //                     <div className="w-12 h-12 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col items-center justify-center shadow-2xl group-hover:border-blue-500/50 transition-colors">
// //                       <span className="text-[10px] font-black text-slate-500 uppercase leading-none mb-1">
// //                         {new Date(day.date).toLocaleString('default', { month: 'short' })}
// //                       </span>
// //                       <span className="text-lg font-black text-white leading-none">
// //                         {new Date(day.date).getDate()}
// //                       </span>
// //                     </div>
// //                   </div>

// //                   {/* Daily Content */}
// //                   <div className="flex-1 space-y-6">
// //                     <div className="flex items-baseline justify-between">
// //                       <div className="flex flex-col">
// //                         <h3 className="text-xl font-black text-slate-100 tracking-tight">
// //                           {new Date(day.date).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric' })}
// //                         </h3>
// //                         <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">
// //                           Productive Window: {day.totalHours} Hours logged
// //                         </p>
// //                       </div>
// //                       <div className="h-px flex-1 mx-8 bg-slate-800/50" />
// //                       <span className="text-xs font-mono font-bold text-blue-500 bg-blue-500/5 px-3 py-1 rounded-full border border-blue-500/10">
// //                         {((day.totalHours / 8) * 100).toFixed(0)}% Utilization
// //                       </span>
// //                     </div>

// //                     <div className="grid grid-cols-1 gap-4">
// //                       {day.tasks.map((task: any, tIdx: number) => (
// //                         <div 
// //                           key={tIdx} 
// //                           className="relative overflow-hidden group/card bg-slate-900/30 border border-slate-800/60 rounded-[1.5rem] hover:bg-slate-900/50 hover:border-slate-700 transition-all duration-300 p-6 flex items-center gap-8 shadow-sm hover:shadow-blue-500/5"
// //                         >
// //                           {/* Inner Gradient Glow */}
// //                           <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/5 blur-[60px] pointer-events-none" />

// //                           <div className="shrink-0 w-14 h-14 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-center text-slate-600 group-hover/card:text-blue-400 group-hover/card:border-blue-500/30 transition-all">
// //                             <ChevronRight className="w-6 h-6" />
// //                           </div>

// //                           <div className="flex-1 min-w-0">
// //                             <div className="flex items-center gap-3 mb-2">
// //                               <span className="px-2 py-0.5 rounded-md bg-blue-500/10 text-blue-400 text-[9px] font-black uppercase tracking-widest border border-blue-500/10">
// //                                 {task.boardTitle}
// //                               </span>
// //                               <span className="text-[10px] font-bold text-slate-600 uppercase tracking-tighter">
// //                                 {task.sprintTitle}
// //                               </span>
// //                             </div>
// //                             <h4 className="text-lg font-bold text-slate-200 truncate group-hover/card:text-white transition-colors">
// //                               {task.subtaskTitle}
// //                             </h4>
// //                             <p className="text-xs text-slate-500 mt-1 flex items-center gap-2">
// //                               <Layers className="w-3 h-3" /> {task.taskTitle || 'General Task'}
// //                             </p>
// //                           </div>

// //                           <div className="text-right shrink-0">
// //                             <div className="flex items-baseline justify-end gap-1">
// //                               <span className="text-3xl font-black text-white tracking-tighter">{task.hoursWorked}</span>
// //                               <span className="text-[10px] font-black text-slate-600 uppercase">hr</span>
// //                             </div>
// //                             <div className="mt-1 flex items-center justify-end gap-2 text-[10px] font-bold text-emerald-500">
// //                               <CheckCircle2 className="w-3 h-3" />
// //                               VERIFIED
// //                             </div>
// //                           </div>
// //                         </div>
// //                       ))}
// //                     </div>
// //                   </div>
// //                 </div>
// //               </div>
// //             ))}
// //           </div>
// //         </div>
// //       </div>
// //     </DashboardLayout>
// //   );
// // }

// // function MetricCard({ label, value, unit, icon, trend, glowColor }: { 
// //   label: string; 
// //   value: string; 
// //   unit: string;
// //   icon: React.ReactNode; 
// //   trend: string;
// //   glowColor: string;
// // }) {
// //   return (
// //     <Card className="relative overflow-hidden bg-slate-900/40 border-slate-800/80 rounded-[2rem] p-8 shadow-2xl group hover:border-slate-700 transition-all duration-500">
// //       <div className={cn("absolute -right-4 -top-4 w-24 h-24 blur-[50px] rounded-full transition-all duration-700 group-hover:blur-[70px]", glowColor)} />
      
// //       <div className="relative z-10 flex flex-col h-full">
// //         <div className="flex items-center justify-between mb-6">
// //           <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 shadow-xl group-hover:scale-110 transition-transform duration-500">
// //             {icon}
// //           </div>
// //           <div className="flex items-center gap-1 text-[10px] font-black text-emerald-400 bg-emerald-400/5 px-2 py-1 rounded-lg">
// //             <ArrowUpRight className="w-3 h-3" />
// //             LIVE
// //           </div>
// //         </div>

// //         <div className="mt-auto">
// //           <div className="flex items-baseline gap-2">
// //             <span className="text-5xl font-black text-white tracking-tighter">{value}</span>
// //             <span className="text-xs font-black text-slate-600 uppercase tracking-widest">{unit}</span>
// //           </div>
// //           <p className="text-[10px] uppercase text-slate-500 font-bold tracking-[0.2em] mt-2 ml-1">{label}</p>
// //         </div>

// //         <div className="mt-6 pt-6 border-t border-slate-800/50 flex items-center justify-between">
// //           <span className="text-[10px] font-bold text-slate-500 italic">{trend}</span>
// //         </div>
// //       </div>
// //     </Card>
// //   );
// // }

// // // Minimalist Check Icon helper
// // function CheckCircle2({ className }: { className?: string }) {
// //   return (
// //     <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
// //       <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
// //     </svg>
// //   );
// // }















// import { useEffect, useState } from 'react';
// import { DashboardLayout } from '@/components/DashboardLayout';
// import { Topbar } from '@/components/Topbar';
// import api from '@/lib/api';
// import { cn } from '@/lib/utils';
// import { 
//   Clock, Calendar as CalendarIcon, ChevronRight, 
//   Layers, Zap, Timer, LayoutGrid, CheckCircle
// } from 'lucide-react';
// import { Card } from '@/components/ui/card';

// interface TimesheetData {
//   totalHours: number;
//   daysWorked: number;
//   timesheet: {
//     date: string;
//     totalHours: number;
//     tasks: any[];
//   }[];
// }

// export default function TimesheetPage() {
//   const [data, setData] = useState<TimesheetData | null>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     api.get('/api/timesheet').then(res => {
//       if (res.data.success) setData(res.data);
//       setLoading(false);
//     });
//   }, []);

//   return (
//     <DashboardLayout>
//       <Topbar title="Velocity Analytics" subtitle="Maximize your productivity with a full-canvas view of your work history" />
      
//       <div className="p-6 w-full space-y-8 animate-in fade-in duration-500">
        
//         {/* Compact Horizontal Stats Bar - Uses 100% width */}
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//           <MetricBar label="Log Volume" value={`${data?.totalHours || 0}`} unit="Hours" icon={<Clock className="text-blue-400 w-4 h-4" />} color="blue" />
//           <MetricBar label="Consistency" value={`${data?.daysWorked || 0}`} unit="Days" icon={<Zap className="text-amber-400 w-4 h-4" />} color="amber" />
//           <MetricBar label="Burn Rate" value={`${data ? (data.totalHours / (data.daysWorked || 1)).toFixed(1) : 0}`} unit="Avg/Day" icon={<Timer className="text-emerald-400 w-4 h-4" />} color="emerald" />
//           <MetricBar label="Active Projects" value="12" unit="Total" icon={<LayoutGrid className="text-purple-400 w-4 h-4" />} color="purple" />
//         </div>

//         {/* The Broad Journal - Horizontal Focused */}
//         <div className="space-y-6">
//           {data?.timesheet.map((day, idx) => (
//             <div key={idx} className="bg-slate-900/20 border border-slate-800/60 rounded-[2rem] overflow-hidden">
//               {/* Date Ribbon Header - Spans Full Width */}
//               <div className="flex items-center justify-between px-8 py-4 bg-slate-900/40 border-b border-slate-800/50">
//                 <div className="flex items-center gap-6">
//                   <div className="flex flex-col">
//                     <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] leading-none mb-1">
//                        {new Date(day.date).toLocaleString('default', { month: 'long', year: 'numeric' })}
//                     </span>
//                     <h3 className="text-xl font-black text-white tracking-tighter flex items-center gap-3">
//                       {new Date(day.date).getDate()}
//                       <span className="text-slate-700 font-medium">/</span>
//                       {new Date(day.date).toLocaleDateString(undefined, { weekday: 'long' })}
//                     </h3>
//                   </div>
                  
//                   <div className="h-8 w-px bg-slate-800 mx-2" />
                  
//                   <div className="flex gap-8">
//                      <QuickStat label="Logged" value={`${day.totalHours}h`} />
//                      <QuickStat label="Utilization" value={`${((day.totalHours / 8) * 100).toFixed(0)}%`} />
//                   </div>
//                 </div>

//                 <div className="flex items-center gap-2">
//                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
//                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Entry Verified</span>
//                 </div>
//               </div>

//               {/* Tasks Grid - Uses horizontal space effectively */}
//               <div className="p-4 grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-4">
//                 {day.tasks.map((task: any, tIdx: number) => (
//                   <div 
//                     key={tIdx} 
//                     className="group bg-slate-950/40 border border-slate-800/40 rounded-2xl p-5 flex items-center gap-5 hover:bg-slate-900/60 hover:border-blue-500/20 transition-all duration-300"
//                   >
//                     <div className="w-12 h-12 shrink-0 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center group-hover:text-blue-400 transition-colors">
//                       <ChevronRight className="w-5 h-5" />
//                     </div>

//                     <div className="flex-1 min-w-0">
//                       <div className="flex items-center gap-2 mb-1">
//                         <span className="text-[9px] font-black uppercase text-blue-500 tracking-wider">
//                           {task.boardTitle}
//                         </span>
//                         <span className="text-slate-800">•</span>
//                         <span className="text-[9px] font-bold text-slate-500 truncate">
//                           {task.sprintTitle}
//                         </span>
//                       </div>
//                       <h4 className="text-sm font-bold text-slate-200 truncate leading-tight">
//                         {task.subtaskTitle}
//                       </h4>
//                       <p className="text-[10px] text-slate-600 mt-1 flex items-center gap-1 font-medium">
//                         <Layers className="w-3 h-3" /> {task.taskTitle || 'Default Ticket'}
//                       </p>
//                     </div>

//                     <div className="text-right pl-4 border-l border-slate-800/50">
//                       <span className="text-2xl font-black text-white font-mono leading-none tracking-tighter">
//                         {task.hoursWorked}
//                       </span>
//                       <p className="text-[9px] font-black text-slate-600 uppercase tracking-widest">Hours</p>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </DashboardLayout>
//   );
// }

// function MetricBar({ label, value, unit, icon, color }: { 
//   label: string; value: string; unit: string; icon: React.ReactNode; color: string;
// }) {
//   const colorMap: any = {
//     blue: "border-blue-500/20 bg-blue-500/5",
//     amber: "border-amber-500/20 bg-amber-500/5",
//     emerald: "border-emerald-500/20 bg-emerald-500/5",
//     purple: "border-purple-500/20 bg-purple-500/5"
//   };

//   return (
//     <div className={cn("p-5 rounded-3xl border flex items-center justify-between shadow-sm", colorMap[color])}>
//       <div className="flex items-center gap-4">
//         <div className="w-10 h-10 rounded-xl bg-slate-950 flex items-center justify-center border border-slate-800 shadow-xl">
//           {icon}
//         </div>
//         <div>
//           <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest leading-none mb-1">{label}</p>
//           <div className="flex items-baseline gap-1">
//             <span className="text-2xl font-black text-white tracking-tighter leading-none">{value}</span>
//             <span className="text-[10px] font-bold text-slate-600 uppercase">{unit}</span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// function QuickStat({ label, value }: { label: string; value: string }) {
//   return (
//     <div className="flex flex-col">
//       <span className="text-[9px] font-black text-slate-600 uppercase tracking-widest leading-none mb-1">{label}</span>
//       <span className="text-sm font-black text-slate-300 leading-none">{value}</span>
//     </div>
//   );
// }


































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