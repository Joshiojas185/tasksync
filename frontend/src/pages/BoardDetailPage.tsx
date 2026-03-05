// // // // // // // // // // import { useState, useMemo } from 'react';
// // // // // // // // // // import { useParams, useNavigate } from 'react-router-dom';
// // // // // // // // // // import { DashboardLayout } from '@/components/DashboardLayout';
// // // // // // // // // // import { Topbar } from '@/components/Topbar';
// // // // // // // // // // import { KanbanBoard } from '@/components/KanbanBoard';
// // // // // // // // // // import { TaskDrawer } from '@/components/TaskDrawer';
// // // // // // // // // // import { mockBoards, mockEpics, mockSprints, mockTasks } from '@/lib/mock-data';
// // // // // // // // // // import type { Task } from '@/types';
// // // // // // // // // // import { cn } from '@/lib/utils';
// // // // // // // // // // import { ChevronLeft, ChevronDown, Target, Zap } from 'lucide-react';

// // // // // // // // // // const BoardDetailPage = () => {
// // // // // // // // // //   const { boardId } = useParams();
// // // // // // // // // //   const navigate = useNavigate();
// // // // // // // // // //   const board = mockBoards.find((b) => b.id === Number(boardId));
// // // // // // // // // //   const epics = mockEpics.filter((e) => e.boardId === Number(boardId));

// // // // // // // // // //   const [selectedEpicId, setSelectedEpicId] = useState<number | null>(epics[0]?.id || null);
// // // // // // // // // //   const [selectedSprintId, setSelectedSprintId] = useState<number | null>(null);
// // // // // // // // // //   const [selectedTask, setSelectedTask] = useState<Task | null>(null);

// // // // // // // // // //   const sprints = useMemo(
// // // // // // // // // //     () => (selectedEpicId ? mockSprints.filter((s) => s.epicId === selectedEpicId) : []),
// // // // // // // // // //     [selectedEpicId]
// // // // // // // // // //   );

// // // // // // // // // //   // Auto-select first sprint
// // // // // // // // // //   const activeSprint = useMemo(() => {
// // // // // // // // // //     if (selectedSprintId) return sprints.find((s) => s.id === selectedSprintId);
// // // // // // // // // //     return sprints[0] || null;
// // // // // // // // // //   }, [sprints, selectedSprintId]);

// // // // // // // // // //   const tasks = useMemo(
// // // // // // // // // //     () => (activeSprint ? mockTasks.filter((t) => t.sprintId === activeSprint.id) : []),
// // // // // // // // // //     [activeSprint]
// // // // // // // // // //   );

// // // // // // // // // //   if (!board) return <DashboardLayout><div className="p-4 text-muted-foreground">Board not found</div></DashboardLayout>;

// // // // // // // // // //   return (
// // // // // // // // // //     <DashboardLayout>
// // // // // // // // // //       <Topbar title={board.title} subtitle={board.description} createLabel="New Task" onCreateClick={() => {}}>
// // // // // // // // // //         <button onClick={() => navigate('/')} className="p-1.5 rounded-md hover:bg-muted text-muted-foreground transition-colors mr-1">
// // // // // // // // // //           <ChevronLeft className="w-4 h-4" />
// // // // // // // // // //         </button>
// // // // // // // // // //       </Topbar>

// // // // // // // // // //       {/* Epic + Sprint selectors */}
// // // // // // // // // //       <div className="flex items-center gap-2 px-4 py-2.5 border-b border-border bg-background overflow-x-auto scrollbar-thin">
// // // // // // // // // //         {/* Epics */}
// // // // // // // // // //         <div className="flex items-center gap-1">
// // // // // // // // // //           <Target className="w-3.5 h-3.5 text-muted-foreground mr-1" />
// // // // // // // // // //           {epics.map((epic) => (
// // // // // // // // // //             <button
// // // // // // // // // //               key={epic.id}
// // // // // // // // // //               onClick={() => { setSelectedEpicId(epic.id); setSelectedSprintId(null); }}
// // // // // // // // // //               className={cn(
// // // // // // // // // //                 'text-xs px-2.5 py-1 rounded-md transition-colors',
// // // // // // // // // //                 selectedEpicId === epic.id
// // // // // // // // // //                   ? 'bg-primary/10 text-primary font-medium'
// // // // // // // // // //                   : 'text-muted-foreground hover:bg-muted hover:text-foreground'
// // // // // // // // // //               )}
// // // // // // // // // //             >
// // // // // // // // // //               {epic.title}
// // // // // // // // // //             </button>
// // // // // // // // // //           ))}
// // // // // // // // // //         </div>

// // // // // // // // // //         <div className="w-px h-4 bg-border mx-1" />

// // // // // // // // // //         {/* Sprints */}
// // // // // // // // // //         <div className="flex items-center gap-1">
// // // // // // // // // //           <Zap className="w-3.5 h-3.5 text-muted-foreground mr-1" />
// // // // // // // // // //           {sprints.map((sprint) => (
// // // // // // // // // //             <button
// // // // // // // // // //               key={sprint.id}
// // // // // // // // // //               onClick={() => setSelectedSprintId(sprint.id)}
// // // // // // // // // //               className={cn(
// // // // // // // // // //                 'text-xs px-2.5 py-1 rounded-md transition-colors',
// // // // // // // // // //                 activeSprint?.id === sprint.id
// // // // // // // // // //                   ? 'bg-primary/10 text-primary font-medium'
// // // // // // // // // //                   : 'text-muted-foreground hover:bg-muted hover:text-foreground'
// // // // // // // // // //               )}
// // // // // // // // // //             >
// // // // // // // // // //               {sprint.title}
// // // // // // // // // //             </button>
// // // // // // // // // //           ))}
// // // // // // // // // //           {sprints.length === 0 && (
// // // // // // // // // //             <span className="text-xs text-muted-foreground italic">No sprints</span>
// // // // // // // // // //           )}
// // // // // // // // // //         </div>
// // // // // // // // // //       </div>

// // // // // // // // // //       {/* Kanban */}
// // // // // // // // // //       {activeSprint ? (
// // // // // // // // // //         <KanbanBoard
// // // // // // // // // //           columns={activeSprint.status}
// // // // // // // // // //           tasks={tasks}
// // // // // // // // // //           onTaskClick={setSelectedTask}
// // // // // // // // // //         />
// // // // // // // // // //       ) : (
// // // // // // // // // //         <div className="flex-1 flex items-center justify-center text-muted-foreground text-sm">
// // // // // // // // // //           Select an epic to view sprints
// // // // // // // // // //         </div>
// // // // // // // // // //       )}

// // // // // // // // // //       {/* Task Drawer */}
// // // // // // // // // //       <TaskDrawer
// // // // // // // // // //         task={selectedTask}
// // // // // // // // // //         availableStatus={activeSprint?.status || []}
// // // // // // // // // //         onClose={() => setSelectedTask(null)}
// // // // // // // // // //       />
// // // // // // // // // //     </DashboardLayout>
// // // // // // // // // //   );
// // // // // // // // // // };

// // // // // // // // // // export default BoardDetailPage;















// // // // // // // // // import { useEffect, useState, useMemo } from 'react';
// // // // // // // // // import { useParams, useNavigate } from 'react-router-dom';
// // // // // // // // // import { DashboardLayout } from '@/components/DashboardLayout';
// // // // // // // // // import { Topbar } from '@/components/Topbar';
// // // // // // // // // import { KanbanBoard } from '@/components/KanbanBoard';
// // // // // // // // // import { TaskDrawer } from '@/components/TaskDrawer';
// // // // // // // // // import api from '@/lib/api';
// // // // // // // // // import type { Board, Epic, Sprint, Task } from '@/types';
// // // // // // // // // import { cn } from '@/lib/utils';
// // // // // // // // // import { ChevronLeft, Target, Zap, Plus, Trash2, Edit2 } from 'lucide-react';
// // // // // // // // // import { Button } from '@/components/ui/button';
// // // // // // // // // import { Skeleton } from '@/components/ui/skeleton';

// // // // // // // // // const BoardDetailPage = () => {
// // // // // // // // //   const { boardId } = useParams();
// // // // // // // // //   const navigate = useNavigate();

// // // // // // // // //   // Data State
// // // // // // // // //   const [board, setBoard] = useState<Board | null>(null);
// // // // // // // // //   const [epics, setEpics] = useState<Epic[]>([]);
// // // // // // // // //   const [sprints, setSprints] = useState<Sprint[]>([]);
// // // // // // // // //   const [tasks, setTasks] = useState<Task[]>([]);
  
// // // // // // // // //   // UI State
// // // // // // // // //   const [selectedEpicId, setSelectedEpicId] = useState<number | null>(null);
// // // // // // // // //   const [selectedSprintId, setSelectedSprintId] = useState<number | null>(null);
// // // // // // // // //   const [selectedTask, setSelectedTask] = useState<Task | null>(null);
// // // // // // // // //   const [isLoading, setIsLoading] = useState(true);

// // // // // // // // //   // 1. Fetch Board and Epics on Initial Load
// // // // // // // // //   useEffect(() => {
// // // // // // // // //     const fetchInitialData = async () => {
// // // // // // // // //       try {
// // // // // // // // //         setIsLoading(true);
// // // // // // // // //         const [boardRes, epicsRes] = await Promise.all([
// // // // // // // // //           api.get(`/api/boards/${boardId}`),
// // // // // // // // //           api.get(`/api/boards/${boardId}/epics`)
// // // // // // // // //         ]);

// // // // // // // // //         if (boardRes.data.success) setBoard(boardRes.data.board);
// // // // // // // // //         if (epicsRes.data.success) {
// // // // // // // // //           const fetchedEpics = epicsRes.data.epics;
// // // // // // // // //           setEpics(fetchedEpics);
// // // // // // // // //           if (fetchedEpics.length > 0) setSelectedEpicId(fetchedEpics.id);
// // // // // // // // //         }
// // // // // // // // //       } catch (error) {
// // // // // // // // //         console.error("Failed to fetch board data:", error);
// // // // // // // // //       } finally {
// // // // // // // // //         setIsLoading(false);
// // // // // // // // //       }
// // // // // // // // //     };
// // // // // // // // //     fetchInitialData();
// // // // // // // // //   }, [boardId]);

// // // // // // // // //   // 2. Fetch Sprints when Epic changes
// // // // // // // // //   useEffect(() => {
// // // // // // // // //     if (!selectedEpicId) return;

// // // // // // // // //     const fetchSprints = async () => {
// // // // // // // // //       try {
// // // // // // // // //         const res = await api.get(`/api/epics/${selectedEpicId}/sprints`);
// // // // // // // // //         if (res.data.success) {
// // // // // // // // //           setSprints(res.data.sprints);
// // // // // // // // //           if (res.data.sprints.length > 0) {
// // // // // // // // //             setSelectedSprintId(res.data.sprints.id);
// // // // // // // // //           } else {
// // // // // // // // //             setSelectedSprintId(null);
// // // // // // // // //             setTasks([]);
// // // // // // // // //           }
// // // // // // // // //         }
// // // // // // // // //       } catch (error) {
// // // // // // // // //         console.error("Failed to fetch sprints:", error);
// // // // // // // // //       }
// // // // // // // // //     };
// // // // // // // // //     fetchSprints();
// // // // // // // // //   }, [selectedEpicId]);

// // // // // // // // //   // 3. Fetch Tasks when Sprint changes
// // // // // // // // //   useEffect(() => {
// // // // // // // // //     if (!selectedSprintId) return;

// // // // // // // // //     const fetchTasks = async () => {
// // // // // // // // //       try {
// // // // // // // // //         const res = await api.get(`/api/sprints/${selectedSprintId}/tasks`);
// // // // // // // // //         if (res.data.success) {
// // // // // // // // //           setTasks(res.data.tasks);
// // // // // // // // //         }
// // // // // // // // //       } catch (error) {
// // // // // // // // //         console.error("Failed to fetch tasks:", error);
// // // // // // // // //       }
// // // // // // // // //     };
// // // // // // // // //     fetchTasks();
// // // // // // // // //   }, [selectedSprintId]);

// // // // // // // // //   const activeSprint = useMemo(() => 
// // // // // // // // //     sprints.find(s => s.id === selectedSprintId) || null, 
// // // // // // // // //   [sprints, selectedSprintId]);

// // // // // // // // //   // CRUD Handlers
// // // // // // // // //   const handleCreateEpic = async () => {
// // // // // // // // //     const title = prompt("Enter Epic Title:");
// // // // // // // // //     if (!title) return;
// // // // // // // // //     try {
// // // // // // // // //       const res = await api.post(`/api/boards/${boardId}/epics`, { title });
// // // // // // // // //       if (res.data.success) setEpics([...epics, res.data.epic]);
// // // // // // // // //     } catch (err) { console.error(err); }
// // // // // // // // //   };

// // // // // // // // //   const handleDeleteEpic = async (id: number) => {
// // // // // // // // //     if (!confirm("Delete this epic?")) return;
// // // // // // // // //     try {
// // // // // // // // //       await api.delete(`/api/epics/${id}`);
// // // // // // // // //       setEpics(epics.filter(e => e.id !== id));
// // // // // // // // //       if (selectedEpicId === id) setSelectedEpicId(epics?.id || null);
// // // // // // // // //     } catch (err) { console.error(err); }
// // // // // // // // //   };

// // // // // // // // //   const handleCreateSprint = async () => {
// // // // // // // // //     if (!selectedEpicId) return;
// // // // // // // // //     const title = prompt("Enter Sprint Title:");
// // // // // // // // //     if (!title) return;
// // // // // // // // //     try {
// // // // // // // // //       // Defaulting to a 2-week sprint and standard Kanban columns [cite: 5]
// // // // // // // // //       const startTime = new Date().toISOString();
// // // // // // // // //       const expiry = new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString();
// // // // // // // // //       const res = await api.post(`/api/epics/${selectedEpicId}/sprints`, { 
// // // // // // // // //         title, 
// // // // // // // // //         startTime, 
// // // // // // // // //         expiry, 
// // // // // // // // //         status: ["To Do", "In Progress", "Done"] 
// // // // // // // // //       });
// // // // // // // // //       if (res.data.success) setSprints([...sprints, res.data.sprint]);
// // // // // // // // //     } catch (err) { console.error(err); }
// // // // // // // // //   };

// // // // // // // // //   if (isLoading) return <DashboardLayout><div className="p-8"><Skeleton className="h-12 w-1/4 mb-4" /><Skeleton className="h-64 w-full" /></div></DashboardLayout>;
// // // // // // // // //   if (!board) return <DashboardLayout><div className="p-4 text-white">Board not found</div></DashboardLayout>;

// // // // // // // // //   return (
// // // // // // // // //     <DashboardLayout>
// // // // // // // // //       <Topbar title={board.title} subtitle={board.description} createLabel="New Task" onCreateClick={() => {}}>
// // // // // // // // //         <button onClick={() => navigate('/')} className="p-1.5 rounded-md hover:bg-slate-800 text-slate-400 transition-colors mr-1">
// // // // // // // // //           <ChevronLeft className="w-4 h-4" />
// // // // // // // // //         </button>
// // // // // // // // //       </Topbar>

// // // // // // // // //       {/* Epic Selector Section */}
// // // // // // // // //       <div className="flex items-center gap-2 px-4 py-2.5 border-b border-slate-800 bg-slate-950 overflow-x-auto scrollbar-none">
// // // // // // // // //         <Target className="w-3.5 h-3.5 text-slate-500 mr-1" />
// // // // // // // // //         {epics.map((epic) => (
// // // // // // // // //           <div key={epic.id} className="flex items-center group">
// // // // // // // // //             <button
// // // // // // // // //               onClick={() => setSelectedEpicId(epic.id)}
// // // // // // // // //               className={cn(
// // // // // // // // //                 'text-xs px-2.5 py-1 rounded-md transition-colors flex items-center gap-2',
// // // // // // // // //                 selectedEpicId === epic.id
// // // // // // // // //                   ? 'bg-blue-600/20 text-blue-400 font-medium'
// // // // // // // // //                   : 'text-slate-400 hover:bg-slate-800 hover:text-white'
// // // // // // // // //               )}
// // // // // // // // //             >
// // // // // // // // //               {epic.title}
// // // // // // // // //             </button>
// // // // // // // // //             {selectedEpicId === epic.id && (
// // // // // // // // //               <button onClick={() => handleDeleteEpic(epic.id)} className="ml-1 p-1 opacity-0 group-hover:opacity-100 text-slate-500 hover:text-red-400 transition-all">
// // // // // // // // //                 <Trash2 className="w-3 h-3" />
// // // // // // // // //               </button>
// // // // // // // // //             )}
// // // // // // // // //           </div>
// // // // // // // // //         ))}
// // // // // // // // //         <Button variant="ghost" size="sm" className="h-7 text-xs text-slate-500" onClick={handleCreateEpic}>
// // // // // // // // //           <Plus className="w-3 h-3 mr-1" /> New Epic
// // // // // // // // //         </Button>
// // // // // // // // //       </div>

// // // // // // // // //       {/* Sprint Selector Section */}
// // // // // // // // //       <div className="flex items-center gap-2 px-4 py-2 border-b border-slate-800 bg-slate-900/50 overflow-x-auto scrollbar-none">
// // // // // // // // //         <Zap className="w-3.5 h-3.5 text-slate-500 mr-1" />
// // // // // // // // //         {sprints.map((sprint) => (
// // // // // // // // //           <button
// // // // // // // // //             key={sprint.id}
// // // // // // // // //             onClick={() => setSelectedSprintId(sprint.id)}
// // // // // // // // //             className={cn(
// // // // // // // // //               'text-xs px-2.5 py-1 rounded-md transition-colors',
// // // // // // // // //               selectedSprintId === sprint.id
// // // // // // // // //                 ? 'bg-purple-600/20 text-purple-400 font-medium'
// // // // // // // // //                 : 'text-slate-400 hover:bg-slate-800 hover:text-white'
// // // // // // // // //             )}
// // // // // // // // //           >
// // // // // // // // //             {sprint.title}
// // // // // // // // //           </button>
// // // // // // // // //         ))}
// // // // // // // // //         {selectedEpicId && (
// // // // // // // // //           <Button variant="ghost" size="sm" className="h-7 text-xs text-slate-500" onClick={handleCreateSprint}>
// // // // // // // // //             <Plus className="w-3 h-3 mr-1" /> New Sprint
// // // // // // // // //           </Button>
// // // // // // // // //         )}
// // // // // // // // //       </div>

// // // // // // // // //       {/* Kanban Board */}
// // // // // // // // //       {activeSprint ? (
// // // // // // // // //         <KanbanBoard
// // // // // // // // //           columns={activeSprint.status || ["To Do", "In Progress", "Done"]}
// // // // // // // // //           tasks={tasks}
// // // // // // // // //           onTaskClick={setSelectedTask}
// // // // // // // // //         />
// // // // // // // // //       ) : (
// // // // // // // // //         <div className="flex-1 flex flex-col items-center justify-center text-slate-500 text-sm gap-2">
// // // // // // // // //           <p>No active sprint found for this epic.</p>
// // // // // // // // //           {selectedEpicId && <Button onClick={handleCreateSprint} variant="outline" size="sm">Create First Sprint</Button>}
// // // // // // // // //         </div>
// // // // // // // // //       )}

// // // // // // // // //       <TaskDrawer
// // // // // // // // //         task={selectedTask}
// // // // // // // // //         availableStatus={activeSprint?.status || []}
// // // // // // // // //         onClose={() => setSelectedTask(null)}
// // // // // // // // //       />
// // // // // // // // //     </DashboardLayout>
// // // // // // // // //   );
// // // // // // // // // };

// // // // // // // // // export default BoardDetailPage;














































// // // // // // // // import { useEffect, useState, useMemo } from 'react';
// // // // // // // // import { useParams, useNavigate } from 'react-router-dom';
// // // // // // // // import { DashboardLayout } from '@/components/DashboardLayout';
// // // // // // // // import { Topbar } from '@/components/Topbar';
// // // // // // // // import { KanbanBoard } from '@/components/KanbanBoard';
// // // // // // // // import { TaskDrawer } from '@/components/TaskDrawer';
// // // // // // // // import api from '@/lib/api';
// // // // // // // // import type { Board, Epic, Sprint, Task, User } from '@/types';
// // // // // // // // import { cn } from '@/lib/utils';
// // // // // // // // import { ChevronLeft, Target, Zap, Plus, Trash2, Users, Calendar, Settings } from 'lucide-react';
// // // // // // // // import { Button } from '@/components/ui/button';
// // // // // // // // import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
// // // // // // // // import { Input } from '@/components/ui/input';
// // // // // // // // import { Label } from '@/components/ui/label';
// // // // // // // // import { Textarea } from '@/components/ui/textarea';
// // // // // // // // import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// // // // // // // // const BoardDetailPage = () => {
// // // // // // // //   const { boardId } = useParams();
// // // // // // // //   const navigate = useNavigate();

// // // // // // // //   // Data State
// // // // // // // //   const [board, setBoard] = useState<Board | null>(null);
// // // // // // // //   const [epics, setEpics] = useState<Epic[]>([]);
// // // // // // // //   const [sprints, setSprints] = useState<Sprint[]>([]);
// // // // // // // //   const [tasks, setTasks] = useState<Task[]>([]);
  
// // // // // // // //   // UI & Dialog State
// // // // // // // //   const [selectedEpicId, setSelectedEpicId] = useState<number | null>(null);
// // // // // // // //   const [selectedSprintId, setSelectedSprintId] = useState<number | null>(null);
// // // // // // // //   const [selectedTask, setSelectedTask] = useState<Task | null>(null);
// // // // // // // //   const [dialogType, setDialogType] = useState<'epic' | 'sprint' | 'members' | null>(null);
  
// // // // // // // //   // Form State
// // // // // // // //   const [epicForm, setEpicForm] = useState({ title: '', description: '' });
// // // // // // // //   const [sprintForm, setSprintForm] = useState({ 
// // // // // // // //     title: '', description: '', startTime: '', expiry: '', 
// // // // // // // //     status: ["To Do", "In Progress", "Done"] 
// // // // // // // //   });
// // // // // // // //   const [memberEmail, setMemberEmail] = useState('');

// // // // // // // //   // Initial Fetch [cite: 15, 17]
// // // // // // // //   useEffect(() => {
// // // // // // // //     const fetchInitialData = async () => {
// // // // // // // //       try {
// // // // // // // //         const [boardRes, epicsRes] = await Promise.all([
// // // // // // // //           api.get(`/api/boards/${boardId}`),
// // // // // // // //           api.get(`/api/boards/${boardId}/epics`)
// // // // // // // //         ]);
// // // // // // // //         if (boardRes.data.success) setBoard(boardRes.data.board);
// // // // // // // //         if (epicsRes.data.success) {
// // // // // // // //           setEpics(epicsRes.data.epics);
// // // // // // // //           if (epicsRes.data.epics.length > 0) setSelectedEpicId(epicsRes.data.epics.id);
// // // // // // // //         }
// // // // // // // //       } catch (error) { console.error(error); }
// // // // // // // //     };
// // // // // // // //     fetchInitialData();
// // // // // // // //   }, [boardId]);

// // // // // // // //   // Fetch Sprints [cite: 18]
// // // // // // // //   useEffect(() => {
// // // // // // // //     if (!selectedEpicId) return;
// // // // // // // //     api.get(`/api/epics/${selectedEpicId}/sprints`).then(res => {
// // // // // // // //       if (res.data.success) {
// // // // // // // //         setSprints(res.data.sprints);
// // // // // // // //         setSelectedSprintId(res.data.sprints?.id || null);
// // // // // // // //       }
// // // // // // // //     });
// // // // // // // //   }, [selectedEpicId]);

// // // // // // // //   // Fetch Tasks [cite: 20]
// // // // // // // //   useEffect(() => {
// // // // // // // //     if (!selectedSprintId) return;
// // // // // // // //     api.get(`/api/sprints/${selectedSprintId}/tasks`).then(res => {
// // // // // // // //       if (res.data.success) setTasks(res.data.tasks);
// // // // // // // //     });
// // // // // // // //   }, [selectedSprintId]);

// // // // // // // //   const activeSprint = useMemo(() => sprints.find(s => s.id === selectedSprintId), [sprints, selectedSprintId]);

// // // // // // // //   // Handlers
// // // // // // // //   const handleCreateEpic = async () => {
// // // // // // // //     const res = await api.post(`/api/boards/${boardId}/epics`, epicForm);
// // // // // // // //     if (res.data.success) {
// // // // // // // //       setEpics([...epics, res.data.epic]);
// // // // // // // //       setDialogType(null);
// // // // // // // //     }
// // // // // // // //   };

// // // // // // // //   const handleCreateSprint = async () => {
// // // // // // // //     const res = await api.post(`/api/epics/${selectedEpicId}/sprints`, sprintForm);
// // // // // // // //     if (res.data.success) {
// // // // // // // //       setSprints([...sprints, res.data.sprint]);
// // // // // // // //       setDialogType(null);
// // // // // // // //     }
// // // // // // // //   };

// // // // // // // //   const handleAddMember = async () => {
// // // // // // // //     const res = await api.post(`/api/boards/${boardId}/members`, { email: memberEmail });
// // // // // // // //     if (res.data.success) {
// // // // // // // //       setBoard(prev => prev ? { ...prev, allowedUsers: [...(prev.allowedUsers || []), res.data.user] } : null);
// // // // // // // //       setMemberEmail('');
// // // // // // // //     }
// // // // // // // //   };

// // // // // // // //   if (!board) return <div className="p-10 text-white">Loading...</div>;

// // // // // // // //   return (
// // // // // // // //     <DashboardLayout>
// // // // // // // //       <Topbar title={board.title} subtitle={board.description} createLabel="New Task" onCreateClick={() => {}}>
// // // // // // // //         <div className="flex items-center gap-2 mr-4">
// // // // // // // //           <Button variant="ghost" size="sm" onClick={() => setDialogType('members')} className="text-slate-400 hover:text-white">
// // // // // // // //             <Users className="w-4 h-4 mr-2" /> Members
// // // // // // // //           </Button>
// // // // // // // //           <button onClick={() => navigate('/')} className="p-1.5 rounded-md hover:bg-slate-800 text-slate-400">
// // // // // // // //             <ChevronLeft className="w-4 h-4" />
// // // // // // // //           </button>
// // // // // // // //         </div>
// // // // // // // //       </Topbar>

// // // // // // // //       {/* Epic Tabs */}
// // // // // // // //       <div className="flex items-center gap-2 px-4 py-3 bg-slate-950 border-b border-slate-800">
// // // // // // // //         <Target className="w-4 h-4 text-blue-500 mr-2" />
// // // // // // // //         {epics.map(epic => (
// // // // // // // //           <button
// // // // // // // //             key={epic.id}
// // // // // // // //             onClick={() => setSelectedEpicId(epic.id)}
// // // // // // // //             className={cn(
// // // // // // // //               "px-3 py-1.5 rounded-md text-sm transition-all",
// // // // // // // //               selectedEpicId === epic.id ? "bg-blue-600 text-white" : "text-slate-400 hover:bg-slate-800"
// // // // // // // //             )}
// // // // // // // //           >
// // // // // // // //             {epic.title}
// // // // // // // //           </button>
// // // // // // // //         ))}
// // // // // // // //         <Button variant="ghost" size="sm" onClick={() => setDialogType('epic')} className="text-slate-500"><Plus className="w-3 h-3 mr-1"/> Epic</Button>
// // // // // // // //       </div>

// // // // // // // //       {/* Sprint Tabs */}
// // // // // // // //       <div className="flex items-center gap-2 px-4 py-2 bg-slate-900/50 border-b border-slate-800">
// // // // // // // //         <Zap className="w-4 h-4 text-purple-500 mr-2" />
// // // // // // // //         {sprints.map(sprint => (
// // // // // // // //           <button
// // // // // // // //             key={sprint.id}
// // // // // // // //             onClick={() => setSelectedSprintId(sprint.id)}
// // // // // // // //             className={cn(
// // // // // // // //               "px-3 py-1 text-xs rounded-full border transition-all",
// // // // // // // //               selectedSprintId === sprint.id ? "border-purple-500 bg-purple-500/10 text-purple-400" : "border-slate-700 text-slate-500 hover:border-slate-500"
// // // // // // // //             )}
// // // // // // // //           >
// // // // // // // //             {sprint.title}
// // // // // // // //           </button>
// // // // // // // //         ))}
// // // // // // // //         {selectedEpicId && (
// // // // // // // //           <Button variant="ghost" size="sm" onClick={() => setDialogType('sprint')} className="h-7 text-[10px] text-slate-500"><Plus className="w-3 h-3 mr-1"/> Sprint</Button>
// // // // // // // //         )}
// // // // // // // //       </div>

// // // // // // // //       {/* Kanban Board [cite: 20] */}
// // // // // // // //       {activeSprint ? (
// // // // // // // //         <KanbanBoard columns={activeSprint.status} tasks={tasks} onTaskClick={setSelectedTask} />
// // // // // // // //       ) : (
// // // // // // // //         <div className="flex-1 flex flex-col items-center justify-center text-slate-500">
// // // // // // // //           <Calendar className="w-12 h-12 mb-4 opacity-20" />
// // // // // // // //           <p>No sprint selected or available for this epic.</p>
// // // // // // // //         </div>
// // // // // // // //       )}

// // // // // // // //       {/* Popups (Dialogs) */}
// // // // // // // //       <Dialog open={dialogType === 'epic'} onOpenChange={() => setDialogType(null)}>
// // // // // // // //         <DialogContent className="bg-slate-900 border-slate-800 text-white">
// // // // // // // //           <DialogHeader><DialogTitle>Create Epic</DialogTitle></DialogHeader>
// // // // // // // //           <div className="space-y-4 py-2">
// // // // // // // //             <div className="space-y-1"><Label>Title</Label><Input value={epicForm.title} onChange={e => setEpicForm({...epicForm, title: e.target.value})} className="bg-slate-800 border-slate-700"/></div>
// // // // // // // //             <div className="space-y-1"><Label>Description</Label><Textarea value={epicForm.description} onChange={e => setEpicForm({...epicForm, description: e.target.value})} className="bg-slate-800 border-slate-700"/></div>
// // // // // // // //           </div>
// // // // // // // //           <DialogFooter><Button onClick={handleCreateEpic} className="bg-blue-600 w-full">Save Epic</Button></DialogFooter>
// // // // // // // //         </DialogContent>
// // // // // // // //       </Dialog>

// // // // // // // //       <Dialog open={dialogType === 'sprint'} onOpenChange={() => setDialogType(null)}>
// // // // // // // //         <DialogContent className="bg-slate-900 border-slate-800 text-white max-w-md">
// // // // // // // //           <DialogHeader><DialogTitle>New Sprint</DialogTitle></DialogHeader>
// // // // // // // //           <div className="grid grid-cols-2 gap-4 py-2">
// // // // // // // //             <div className="col-span-2 space-y-1"><Label>Title</Label><Input value={sprintForm.title} onChange={e => setSprintForm({...sprintForm, title: e.target.value})} className="bg-slate-800 border-slate-700"/></div>
// // // // // // // //             <div className="space-y-1"><Label>Start Date</Label><Input type="datetime-local" onChange={e => setSprintForm({...sprintForm, startTime: e.target.value})} className="bg-slate-800 border-slate-700 text-xs"/></div>
// // // // // // // //             <div className="space-y-1"><Label>Expiry Date</Label><Input type="datetime-local" onChange={e => setSprintForm({...sprintForm, expiry: e.target.value})} className="bg-slate-800 border-slate-700 text-xs"/></div>
// // // // // // // //             <div className="col-span-2 space-y-1"><Label>Description</Label><Textarea value={sprintForm.description} onChange={e => setSprintForm({...sprintForm, description: e.target.value})} className="bg-slate-800 border-slate-700"/></div>
// // // // // // // //           </div>
// // // // // // // //           <DialogFooter><Button onClick={handleCreateSprint} className="bg-purple-600 w-full">Launch Sprint</Button></DialogFooter>
// // // // // // // //         </DialogContent>
// // // // // // // //       </Dialog>

// // // // // // // //       <Dialog open={dialogType === 'members'} onOpenChange={() => setDialogType(null)}>
// // // // // // // //         <DialogContent className="bg-slate-900 border-slate-800 text-white">
// // // // // // // //           <DialogHeader><DialogTitle>Manage Members</DialogTitle></DialogHeader>
// // // // // // // //           <div className="space-y-4 py-2">
// // // // // // // //             <div className="flex gap-2">
// // // // // // // //               <Input placeholder="Email address" value={memberEmail} onChange={e => setMemberEmail(e.target.value)} className="bg-slate-800 border-slate-700"/>
// // // // // // // //               <Button onClick={handleAddMember} className="bg-blue-600">Add</Button>
// // // // // // // //             </div>
// // // // // // // //             <div className="space-y-2 max-h-60 overflow-y-auto">
// // // // // // // //               {board.allowedUsers?.map(user => (
// // // // // // // //                 <div key={user.id} className="flex items-center gap-3 p-2 rounded-lg bg-slate-800/50">
// // // // // // // //                   <Avatar className="h-8 w-8"><AvatarImage src={user.picture}/><AvatarFallback>{user.name}</AvatarFallback></Avatar>
// // // // // // // //                   <div className="flex-1"><p className="text-sm font-medium">{user.name}</p><p className="text-xs text-slate-500">{user.email}</p></div>
// // // // // // // //                 </div>
// // // // // // // //               ))}
// // // // // // // //             </div>
// // // // // // // //           </div>
// // // // // // // //         </DialogContent>
// // // // // // // //       </Dialog>

// // // // // // // //       <TaskDrawer task={selectedTask} availableStatus={activeSprint?.status || []} onClose={() => setSelectedTask(null)} />
// // // // // // // //     </DashboardLayout>
// // // // // // // //   );
// // // // // // // // };

// // // // // // // // export default BoardDetailPage;

















































































// // // // // // // import { useEffect, useState, useMemo } from 'react';
// // // // // // // import { useParams, useNavigate } from 'react-router-dom';
// // // // // // // import { DashboardLayout } from '@/components/DashboardLayout';
// // // // // // // import { Topbar } from '@/components/Topbar';
// // // // // // // import { KanbanBoard } from '@/components/KanbanBoard';
// // // // // // // import { TaskDrawer } from '@/components/TaskDrawer';
// // // // // // // import api from '@/lib/api';
// // // // // // // import type { Board, Epic, Sprint, Task } from '@/types';
// // // // // // // import { cn } from '@/lib/utils';
// // // // // // // import { 
// // // // // // //   ChevronLeft, Target, Zap, Plus, Trash2, Edit2, 
// // // // // // //   Calendar, MoreVertical, Layout
// // // // // // // } from 'lucide-react';
// // // // // // // import { Button } from '@/components/ui/button';
// // // // // // // import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
// // // // // // // import { Input } from '@/components/ui/input';
// // // // // // // import { Label } from '@/components/ui/label';
// // // // // // // import { Textarea } from '@/components/ui/textarea';
// // // // // // // import { 
// // // // // // //   DropdownMenu, 
// // // // // // //   DropdownMenuContent, 
// // // // // // //   DropdownMenuItem, 
// // // // // // //   DropdownMenuTrigger 
// // // // // // // } from "@/components/ui/dropdown-menu";

// // // // // // // const BoardDetailPage = () => {
// // // // // // //   const { boardId } = useParams();
// // // // // // //   const navigate = useNavigate();

// // // // // // //   // Data State
// // // // // // //   const [board, setBoard] = useState<Board | null>(null);
// // // // // // //   const [epics, setEpics] = useState<Epic[]>([]);
// // // // // // //   const [sprints, setSprints] = useState<Sprint[]>([]);
// // // // // // //   const [tasks, setTasks] = useState<Task[]>([]);
  
// // // // // // //   // UI & Dialog State
// // // // // // //   const [selectedEpicId, setSelectedEpicId] = useState<number | null>(null);
// // // // // // //   const [selectedSprintId, setSelectedSprintId] = useState<number | null>(null);
// // // // // // //   const [selectedTask, setSelectedTask] = useState<Task | null>(null);
// // // // // // //   const [dialogType, setDialogType] = useState<'epic' | 'sprint' | 'task' | null>(null);
// // // // // // //   const [isEditing, setIsEditing] = useState(false);
// // // // // // //   const [editingId, setEditingId] = useState<number | null>(null);
  
// // // // // // //   // Form States
// // // // // // //   const [epicForm, setEpicForm] = useState({ title: '', description: '' });
// // // // // // //   const [sprintForm, setSprintForm] = useState({ 
// // // // // // //     title: '', description: '', startTime: '', expiry: '', 
// // // // // // //     status: ["To Do", "In Progress", "Done"] 
// // // // // // //   });
// // // // // // //   const [taskForm, setTaskForm] = useState<Partial<Task>>({ 
// // // // // // //     title: '', description: '', status: 'To Do', priority: 'Medium' 
// // // // // // //   });

// // // // // // //   // Initial Fetch: Board and Epics
// // // // // // //   useEffect(() => {
// // // // // // //     const fetchInitialData = async () => {
// // // // // // //       try {
// // // // // // //         const [boardRes, epicsRes] = await Promise.all([
// // // // // // //           api.get(`/api/boards/${boardId}`),
// // // // // // //           api.get(`/api/boards/${boardId}/epics`)
// // // // // // //         ]);
// // // // // // //         if (boardRes.data.success) setBoard(boardRes.data.board);
// // // // // // //         if (epicsRes.data.success) {
// // // // // // //           const fetchedEpics = epicsRes.data.epics;
// // // // // // //           setEpics(fetchedEpics);
// // // // // // //           if (fetchedEpics.length > 0) setSelectedEpicId(fetchedEpics.id);
// // // // // // //         }
// // // // // // //       } catch (error) { console.error("Fetch error:", error); }
// // // // // // //     };
// // // // // // //     fetchInitialData();
// // // // // // //   }, [boardId]);

// // // // // // //   // Fetch Sprints when Epic changes
// // // // // // //   useEffect(() => {
// // // // // // //     if (!selectedEpicId) return;
// // // // // // //     api.get(`/api/epics/${selectedEpicId}/sprints`).then(res => {
// // // // // // //       if (res.data.success) {
// // // // // // //         setSprints(res.data.sprints);
// // // // // // //         setSelectedSprintId(res.data.sprints?.id || null);
// // // // // // //       }
// // // // // // //     });
// // // // // // //   }, [selectedEpicId]);

// // // // // // //   // Fetch Tasks when Sprint changes
// // // // // // //   useEffect(() => {
// // // // // // //     if (!selectedSprintId) return;
// // // // // // //     api.get(`/api/sprints/${selectedSprintId}/tasks`).then(res => {
// // // // // // //       if (res.data.success) setTasks(res.data.tasks);
// // // // // // //     });
// // // // // // //   }, [selectedSprintId]);

// // // // // // //   const activeSprint = useMemo(() => 
// // // // // // //     sprints.find(s => s.id === selectedSprintId), [sprints, selectedSprintId]
// // // // // // //   );

// // // // // // //   // CRUD Handlers
// // // // // // //   const handleSaveEpic = async () => {
// // // // // // //     const apiCall = isEditing 
// // // // // // //       ? api.put(`/api/epics/${editingId}`, epicForm)
// // // // // // //       : api.post(`/api/boards/${boardId}/epics`, epicForm);
    
// // // // // // //     const res = await apiCall;
// // // // // // //     if (res.data.success) {
// // // // // // //       if (isEditing) {
// // // // // // //         setEpics(epics.map(e => e.id === editingId ? res.data.epic : e));
// // // // // // //       } else {
// // // // // // //         setEpics([...epics, res.data.epic]);
// // // // // // //       }
// // // // // // //       closeDialog();
// // // // // // //     }
// // // // // // //   };

// // // // // // //   const handleSaveSprint = async () => {
// // // // // // //     const apiCall = isEditing
// // // // // // //       ? api.put(`/api/sprints/${editingId}`, sprintForm)
// // // // // // //       : api.post(`/api/epics/${selectedEpicId}/sprints`, sprintForm);

// // // // // // //     const res = await apiCall;
// // // // // // //     if (res.data.success) {
// // // // // // //       if (isEditing) {
// // // // // // //         setSprints(sprints.map(s => s.id === editingId ? res.data.sprint : s));
// // // // // // //       } else {
// // // // // // //         setSprints([...sprints, res.data.sprint]);
// // // // // // //       }
// // // // // // //       closeDialog();
// // // // // // //     }
// // // // // // //   };

// // // // // // //   const handleCreateTask = async () => {
// // // // // // //     if (!selectedSprintId) return;
// // // // // // //     const res = await api.post(`/api/sprints/${selectedSprintId}/tasks`, taskForm);
// // // // // // //     if (res.data.success) {
// // // // // // //       setTasks([...tasks, res.data.task]);
// // // // // // //       closeDialog();
// // // // // // //     }
// // // // // // //   };

// // // // // // //   const openTaskDialog = (status?: string) => {
// // // // // // //     setTaskForm({ 
// // // // // // //       title: '', 
// // // // // // //       description: '', 
// // // // // // //       status: status || activeSprint?.status || 'To Do', 
// // // // // // //       priority: 'Medium' 
// // // // // // //     });
// // // // // // //     setDialogType('task');
// // // // // // //   };

// // // // // // //   const closeDialog = () => {
// // // // // // //     setDialogType(null);
// // // // // // //     setIsEditing(false);
// // // // // // //     setEditingId(null);
// // // // // // //     setEpicForm({ title: '', description: '' });
// // // // // // //     setSprintForm({ 
// // // // // // //       title: '', description: '', startTime: '', expiry: '', 
// // // // // // //       status: ["To Do", "In Progress", "Done"] 
// // // // // // //     });
// // // // // // //   };

// // // // // // //   if (!board) return <div className="p-10 text-white">Loading...</div>;

// // // // // // //   return (
// // // // // // //     <DashboardLayout>
// // // // // // //       <Topbar title={board.title} subtitle={board.description} createLabel="New Task" onCreateClick={() => openTaskDialog()}>
// // // // // // //         <button onClick={() => navigate('/')} className="p-1.5 rounded-md hover:bg-slate-800 text-slate-400 mr-4">
// // // // // // //           <ChevronLeft className="w-4 h-4" />
// // // // // // //         </button>
// // // // // // //       </Topbar>

// // // // // // //       {/* Epic Tabs */}
// // // // // // //       <div className="flex items-center gap-2 px-4 py-3 bg-slate-950 border-b border-slate-800 overflow-x-auto scrollbar-none">
// // // // // // //         <Target className="w-4 h-4 text-blue-500 mr-2 shrink-0" />
// // // // // // //         {epics.map(epic => (
// // // // // // //           <div key={epic.id} className="flex items-center group bg-slate-900 rounded-md shrink-0">
// // // // // // //             <button
// // // // // // //               onClick={() => setSelectedEpicId(epic.id)}
// // // // // // //               className={cn(
// // // // // // //                 "px-3 py-1.5 text-sm rounded-l-md transition-all",
// // // // // // //                 selectedEpicId === epic.id ? "bg-blue-600 text-white" : "text-slate-400 hover:text-white"
// // // // // // //               )}
// // // // // // //             >
// // // // // // //               {epic.title}
// // // // // // //             </button>
// // // // // // //             <DropdownMenu>
// // // // // // //               <DropdownMenuTrigger className="px-1.5 py-1.5 hover:bg-slate-800 rounded-r-md text-slate-500">
// // // // // // //                 <MoreVertical className="w-3 h-3" />
// // // // // // //               </DropdownMenuTrigger>
// // // // // // //               <DropdownMenuContent className="bg-slate-900 border-slate-800 text-white">
// // // // // // //                 <DropdownMenuItem onClick={() => { 
// // // // // // //                   setIsEditing(true); 
// // // // // // //                   setEditingId(epic.id); 
// // // // // // //                   setEpicForm({title: epic.title, description: epic.description || ''}); 
// // // // // // //                   setDialogType('epic'); 
// // // // // // //                 }}>Edit Epic</DropdownMenuItem>
// // // // // // //               </DropdownMenuContent>
// // // // // // //             </DropdownMenu>
// // // // // // //           </div>
// // // // // // //         ))}
// // // // // // //         <Button variant="ghost" size="sm" onClick={() => setDialogType('epic')} className="text-slate-500 shrink-0">
// // // // // // //           <Plus className="w-3 h-3 mr-1"/> Epic
// // // // // // //         </Button>
// // // // // // //       </div>

// // // // // // //       {/* Sprint Tabs */}
// // // // // // //       <div className="flex items-center gap-2 px-4 py-2 bg-slate-900/50 border-b border-slate-800 overflow-x-auto scrollbar-none">
// // // // // // //         <Zap className="w-4 h-4 text-purple-500 mr-2 shrink-0" />
// // // // // // //         {sprints.map(sprint => (
// // // // // // //           <div key={sprint.id} className="flex items-center group shrink-0">
// // // // // // //             <button
// // // // // // //               onClick={() => setSelectedSprintId(sprint.id)}
// // // // // // //               className={cn(
// // // // // // //                 "px-3 py-1 text-xs rounded-full border transition-all",
// // // // // // //                 selectedSprintId === sprint.id ? "border-purple-500 bg-purple-500/10 text-purple-400" : "border-slate-700 text-slate-500"
// // // // // // //               )}
// // // // // // //             >
// // // // // // //               {sprint.title}
// // // // // // //             </button>
// // // // // // //             {selectedSprintId === sprint.id && (
// // // // // // //               <button 
// // // // // // //                 onClick={() => {
// // // // // // //                   setIsEditing(true);
// // // // // // //                   setEditingId(sprint.id);
// // // // // // //                   setSprintForm({
// // // // // // //                     title: sprint.title,
// // // // // // //                     description: sprint.description || '',
// // // // // // //                     startTime: sprint.startTime.slice(0, 16),
// // // // // // //                     expiry: sprint.expiry.slice(0, 16),
// // // // // // //                     status: sprint.status
// // // // // // //                   });
// // // // // // //                   setDialogType('sprint');
// // // // // // //                 }}
// // // // // // //                 className="ml-1 p-1 text-slate-500 hover:text-white"
// // // // // // //               >
// // // // // // //                 <Edit2 className="w-3 h-3" />
// // // // // // //               </button>
// // // // // // //             )}
// // // // // // //           </div>
// // // // // // //         ))}
// // // // // // //         {selectedEpicId && (
// // // // // // //           <Button variant="ghost" size="sm" onClick={() => setDialogType('sprint')} className="h-7 text-[10px] text-slate-500 shrink-0">
// // // // // // //             <Plus className="w-3 h-3 mr-1"/> Sprint
// // // // // // //           </Button>
// // // // // // //         )}
// // // // // // //       </div>

// // // // // // //       {/* Kanban Board */}
// // // // // // //       {activeSprint ? (
// // // // // // //         <KanbanBoard 
// // // // // // //           columns={activeSprint.status} 
// // // // // // //           tasks={tasks} 
// // // // // // //           onTaskClick={setSelectedTask}
// // // // // // //           onAddTask={openTaskDialog} 
// // // // // // //         />
// // // // // // //       ) : (
// // // // // // //         <div className="flex-1 flex flex-col items-center justify-center text-slate-500">
// // // // // // //           <Layout className="w-12 h-12 mb-4 opacity-10" />
// // // // // // //           <p>Select or create an epic to view the board.</p>
// // // // // // //         </div>
// // // // // // //       )}

// // // // // // //       {/* Epic Dialog */}
// // // // // // //       <Dialog open={dialogType === 'epic'} onOpenChange={closeDialog}>
// // // // // // //         <DialogContent className="bg-slate-900 border-slate-800 text-white">
// // // // // // //           <DialogHeader><DialogTitle>{isEditing ? 'Edit Epic' : 'Create Epic'}</DialogTitle></DialogHeader>
// // // // // // //           <div className="space-y-4 py-2">
// // // // // // //             <div className="space-y-1">
// // // // // // //               <Label>Title</Label>
// // // // // // //               <Input value={epicForm.title} onChange={e => setEpicForm({...epicForm, title: e.target.value})} className="bg-slate-800 border-slate-700"/>
// // // // // // //             </div>
// // // // // // //             <div className="space-y-1">
// // // // // // //               <Label>Description</Label>
// // // // // // //               <Textarea value={epicForm.description} onChange={e => setEpicForm({...epicForm, description: e.target.value})} className="bg-slate-800 border-slate-700"/>
// // // // // // //             </div>
// // // // // // //           </div>
// // // // // // //           <DialogFooter><Button onClick={handleSaveEpic} className="bg-blue-600 w-full">Save Epic</Button></DialogFooter>
// // // // // // //         </DialogContent>
// // // // // // //       </Dialog>

// // // // // // //       {/* Sprint Dialog */}
// // // // // // //       <Dialog open={dialogType === 'sprint'} onOpenChange={closeDialog}>
// // // // // // //         <DialogContent className="bg-slate-900 border-slate-800 text-white max-w-md">
// // // // // // //           <DialogHeader><DialogTitle>{isEditing ? 'Edit Sprint' : 'New Sprint'}</DialogTitle></DialogHeader>
// // // // // // //           <div className="grid grid-cols-2 gap-4 py-2">
// // // // // // //             <div className="col-span-2 space-y-1">
// // // // // // //               <Label>Title</Label>
// // // // // // //               <Input value={sprintForm.title} onChange={e => setSprintForm({...sprintForm, title: e.target.value})} className="bg-slate-800 border-slate-700"/>
// // // // // // //             </div>
// // // // // // //             <div className="space-y-1">
// // // // // // //               <Label>Start Date</Label>
// // // // // // //               <Input type="datetime-local" value={sprintForm.startTime} onChange={e => setSprintForm({...sprintForm, startTime: e.target.value})} className="bg-slate-800 border-slate-700 text-xs"/>
// // // // // // //             </div>
// // // // // // //             <div className="space-y-1">
// // // // // // //               <Label>Expiry Date</Label>
// // // // // // //               <Input type="datetime-local" value={sprintForm.expiry} onChange={e => setSprintForm({...sprintForm, expiry: e.target.value})} className="bg-slate-800 border-slate-700 text-xs"/>
// // // // // // //             </div>
// // // // // // //             <div className="col-span-2 space-y-1">
// // // // // // //               <Label>Columns (Comma separated)</Label>
// // // // // // //               <Input 
// // // // // // //                 value={sprintForm.status.join(', ')} 
// // // // // // //                 onChange={e => setSprintForm({...sprintForm, status: e.target.value.split(',').map(s => s.trim())})} 
// // // // // // //                 className="bg-slate-800 border-slate-700"
// // // // // // //               />
// // // // // // //             </div>
// // // // // // //           </div>
// // // // // // //           <DialogFooter><Button onClick={handleSaveSprint} className="bg-purple-600 w-full">Save Sprint</Button></DialogFooter>
// // // // // // //         </DialogContent>
// // // // // // //       </Dialog>

// // // // // // //       {/* Task Dialog */}
// // // // // // //       <Dialog open={dialogType === 'task'} onOpenChange={closeDialog}>
// // // // // // //         <DialogContent className="bg-slate-900 border-slate-800 text-white">
// // // // // // //           <DialogHeader><DialogTitle>New Task in {taskForm.status}</DialogTitle></DialogHeader>
// // // // // // //           <div className="space-y-4 py-2">
// // // // // // //             <div className="space-y-1">
// // // // // // //               <Label>Task Title</Label>
// // // // // // //               <Input value={taskForm.title} onChange={e => setTaskForm({...taskForm, title: e.target.value})} className="bg-slate-800 border-slate-700"/>
// // // // // // //             </div>
// // // // // // //             <div className="space-y-1">
// // // // // // //               <Label>Description</Label>
// // // // // // //               <Textarea value={taskForm.description} onChange={e => setTaskForm({...taskForm, description: e.target.value})} className="bg-slate-800 border-slate-700"/>
// // // // // // //             </div>
// // // // // // //           </div>
// // // // // // //           <DialogFooter><Button onClick={handleCreateTask} className="bg-blue-600 w-full">Create Task</Button></DialogFooter>
// // // // // // //         </DialogContent>
// // // // // // //       </Dialog>

// // // // // // //       <TaskDrawer 
// // // // // // //         task={selectedTask} 
// // // // // // //         availableStatus={activeSprint?.status || []} 
// // // // // // //         onClose={() => setSelectedTask(null)} 
// // // // // // //       />
// // // // // // //     </DashboardLayout>
// // // // // // //   );
// // // // // // // };

// // // // // // // export default BoardDetailPage;


























































// // // // // // import { useEffect, useState, useMemo } from 'react';
// // // // // // import { useParams, useNavigate } from 'react-router-dom';
// // // // // // import { DashboardLayout } from '@/components/DashboardLayout';
// // // // // // import { Topbar } from '@/components/Topbar';
// // // // // // import { KanbanBoard } from '@/components/KanbanBoard';
// // // // // // import { TaskDrawer } from '@/components/TaskDrawer';
// // // // // // import api from '@/lib/api';
// // // // // // import type { Board, Epic, Sprint, Task, User } from '@/types';
// // // // // // import { cn } from '@/lib/utils';
// // // // // // import { 
// // // // // //   ChevronLeft, Target, Zap, Plus, MoreVertical, 
// // // // // //   Layout, User as UserIcon, Clock, Star 
// // // // // // } from 'lucide-react';
// // // // // // import { Button } from '@/components/ui/button';
// // // // // // import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
// // // // // // import { Input } from '@/components/ui/input';
// // // // // // import { Label } from '@/components/ui/label';
// // // // // // import { Textarea } from '@/components/ui/textarea';
// // // // // // import { 
// // // // // //   Select, SelectContent, SelectItem, SelectTrigger, SelectValue 
// // // // // // } from "@/components/ui/select";
// // // // // // import { 
// // // // // //   DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger 
// // // // // // } from "@/components/ui/dropdown-menu";

// // // // // // const BoardDetailPage = () => {
// // // // // //   const { boardId } = useParams();
// // // // // //   const navigate = useNavigate();

// // // // // //   // Data State
// // // // // //   const [board, setBoard] = useState<Board | null>(null);
// // // // // //   const [epics, setEpics] = useState<Epic[]>([]);
// // // // // //   const [sprints, setSprints] = useState<Sprint[]>([]);
// // // // // //   const [tasks, setTasks] = useState<Task[]>([]);
  
// // // // // //   // UI & Dialog State
// // // // // //   const [selectedEpicId, setSelectedEpicId] = useState<number | null>(null);
// // // // // //   const [selectedSprintId, setSelectedSprintId] = useState<number | null>(null);
// // // // // //   const [selectedTask, setSelectedTask] = useState<Task | null>(null);
// // // // // //   const [dialogType, setDialogType] = useState<'epic' | 'sprint' | 'task' | null>(null);
  
// // // // // //   // Task Form State (Enhanced for the new API)
// // // // // //   const [taskForm, setTaskForm] = useState({
// // // // // //     title: '',
// // // // // //     description: '',
// // // // // //     assigneeId: '',
// // // // // //     storyPoints: 0,
// // // // // //     hours: 0,
// // // // // //     priority: 'Medium',
// // // // // //     status: ''
// // // // // //   });

// // // // // //   // Fetch Board and Epics
// // // // // //   useEffect(() => {
// // // // // //     const fetchInitialData = async () => {
// // // // // //       try {
// // // // // //         const [boardRes, epicsRes] = await Promise.all([
// // // // // //           api.get(`/api/boards/${boardId}`),
// // // // // //           api.get(`/api/boards/${boardId}/epics`)
// // // // // //         ]);
// // // // // //         if (boardRes.data.success) setBoard(boardRes.data.board);
// // // // // //         if (epicsRes.data.success && epicsRes.data.epics.length > 0) {
// // // // // //           setEpics(epicsRes.data.epics);
// // // // // //           setSelectedEpicId(epicsRes.data.epics.id);
// // // // // //         }
// // // // // //       } catch (error) { console.error(error); }
// // // // // //     };
// // // // // //     fetchInitialData();
// // // // // //   }, [boardId]);

// // // // // //   // Fetch Sprints when Epic changes
// // // // // //   useEffect(() => {
// // // // // //     if (!selectedEpicId) return;
// // // // // //     api.get(`/api/epics/${selectedEpicId}/sprints`).then(res => {
// // // // // //       if (res.data.success) {
// // // // // //         setSprints(res.data.sprints);
// // // // // //         setSelectedSprintId(res.data.sprints?.id || null);
// // // // // //       }
// // // // // //     });
// // // // // //   }, [selectedEpicId]);

// // // // // //   // Fetch Tasks when Sprint changes
// // // // // //   useEffect(() => {
// // // // // //     if (!selectedSprintId) return;
// // // // // //     api.get(`/api/sprints/${selectedSprintId}/tasks`).then(res => {
// // // // // //       if (res.data.success) setTasks(res.data.tasks);
// // // // // //     });
// // // // // //   }, [selectedSprintId]);

// // // // // //   const activeSprint = useMemo(() => 
// // // // // //     sprints.find(s => s.id === selectedSprintId), [sprints, selectedSprintId]
// // // // // //   );

// // // // // //   // Task Creation Handler
// // // // // //   const handleCreateTask = async () => {
// // // // // //     if (!selectedSprintId) return;
// // // // // //     try {
// // // // // //       const res = await api.post(`/api/sprints/${selectedSprintId}/tasks`, {
// // // // // //         ...taskForm,
// // // // // //         assigneeId: taskForm.assigneeId ? parseInt(taskForm.assigneeId) : null,
// // // // // //         storyPoints: parseInt(taskForm.storyPoints.toString()) || 0,
// // // // // //         hours: parseFloat(taskForm.hours.toString()) || 0
// // // // // //       });
// // // // // //       if (res.data.success) {
// // // // // //         setTasks(prev => [...prev, res.data.task]);
// // // // // //         setDialogType(null);
// // // // // //       }
// // // // // //     } catch (err) { console.error("Failed to create task", err); }
// // // // // //   };

// // // // // //   const openTaskDialog = (status?: string) => {
// // // // // //     setTaskForm({
// // // // // //       title: '',
// // // // // //       description: '',
// // // // // //       assigneeId: '',
// // // // // //       storyPoints: 0,
// // // // // //       hours: 0,
// // // // // //       priority: 'Medium',
// // // // // //       status: status || activeSprint?.status || 'To Do'
// // // // // //     });
// // // // // //     setDialogType('task');
// // // // // //   };

// // // // // //   if (!board) return <div className="p-10 text-white">Loading...</div>;

// // // // // //   return (
// // // // // //     <DashboardLayout>
// // // // // //       <Topbar title={board.title} subtitle={board.description} createLabel="New Task" onCreateClick={() => openTaskDialog()}>
// // // // // //         <button onClick={() => navigate('/')} className="p-1.5 rounded-md hover:bg-slate-800 text-slate-400 mr-4 transition-colors">
// // // // // //           <ChevronLeft className="w-4 h-4" />
// // // // // //         </button>
// // // // // //       </Topbar>

// // // // // //       {/* Epic Tabs */}
// // // // // //       <div className="flex items-center gap-2 px-4 py-3 bg-slate-950 border-b border-slate-800 overflow-x-auto scrollbar-none">
// // // // // //         <Target className="w-4 h-4 text-blue-500 mr-2 shrink-0" />
// // // // // //         {epics.map(epic => (
// // // // // //           <button
// // // // // //             key={epic.id}
// // // // // //             onClick={() => setSelectedEpicId(epic.id)}
// // // // // //             className={cn(
// // // // // //               "px-3 py-1.5 text-sm rounded-md transition-all shrink-0",
// // // // // //               selectedEpicId === epic.id ? "bg-blue-600 text-white" : "text-slate-400 hover:bg-slate-800 hover:text-white"
// // // // // //             )}
// // // // // //           >
// // // // // //             {epic.title}
// // // // // //           </button>
// // // // // //         ))}
// // // // // //       </div>

// // // // // //       {/* Sprint Tabs */}
// // // // // //       <div className="flex items-center gap-2 px-4 py-2 bg-slate-900/50 border-b border-slate-800 overflow-x-auto scrollbar-none">
// // // // // //         <Zap className="w-4 h-4 text-purple-500 mr-2 shrink-0" />
// // // // // //         {sprints.map(sprint => (
// // // // // //           <button
// // // // // //             key={sprint.id}
// // // // // //             onClick={() => setSelectedSprintId(sprint.id)}
// // // // // //             className={cn(
// // // // // //               "px-3 py-1 text-xs rounded-full border transition-all shrink-0",
// // // // // //               selectedSprintId === sprint.id ? "border-purple-500 bg-purple-500/10 text-purple-400" : "border-slate-700 text-slate-500"
// // // // // //             )}
// // // // // //           >
// // // // // //             {sprint.title}
// // // // // //           </button>
// // // // // //         ))}
// // // // // //       </div>

// // // // // //       {/* Kanban Board */}
// // // // // //       {activeSprint ? (
// // // // // //         <KanbanBoard 
// // // // // //           columns={activeSprint.status} 
// // // // // //           tasks={tasks} 
// // // // // //           onTaskClick={setSelectedTask}
// // // // // //           onAddTask={openTaskDialog} 
// // // // // //         />
// // // // // //       ) : (
// // // // // //         <div className="flex-1 flex flex-col items-center justify-center text-slate-500">
// // // // // //           <Layout className="w-12 h-12 mb-4 opacity-10" />
// // // // // //           <p>Select or create an epic to view the board.</p>
// // // // // //         </div>
// // // // // //       )}

// // // // // //       {/* Full Task Dialog with Multi-Field Support */}
// // // // // //       <Dialog open={dialogType === 'task'} onOpenChange={() => setDialogType(null)}>
// // // // // //         <DialogContent className="bg-slate-900 border-slate-800 text-white max-w-lg scrollbar-none">
// // // // // //           <DialogHeader>
// // // // // //             <DialogTitle>Create New Task</DialogTitle>
// // // // // //           </DialogHeader>
          
// // // // // //           <div className="grid grid-cols-2 gap-4 py-4">
// // // // // //             {/* Title & Description */}
// // // // // //             <div className="col-span-2 space-y-1.5">
// // // // // //               <Label htmlFor="task-title">Title</Label>
// // // // // //               <Input 
// // // // // //                 id="task-title" 
// // // // // //                 placeholder="What needs to be done?"
// // // // // //                 value={taskForm.title} 
// // // // // //                 onChange={e => setTaskForm({...taskForm, title: e.target.value})} 
// // // // // //                 className="bg-slate-800 border-slate-700"
// // // // // //               />
// // // // // //             </div>

// // // // // //             <div className="col-span-2 space-y-1.5">
// // // // // //               <Label htmlFor="task-desc">Description</Label>
// // // // // //               <Textarea 
// // // // // //                 id="task-desc" 
// // // // // //                 placeholder="Add details..."
// // // // // //                 value={taskForm.description} 
// // // // // //                 onChange={e => setTaskForm({...taskForm, description: e.target.value})} 
// // // // // //                 className="bg-slate-800 border-slate-700"
// // // // // //               />
// // // // // //             </div>

// // // // // //             {/* Assignee & Status */}
// // // // // //             <div className="space-y-1.5">
// // // // // //               <Label>Assignee</Label>
// // // // // //               <Select onValueChange={(v) => setTaskForm({...taskForm, assigneeId: v})}>
// // // // // //                 <SelectTrigger className="bg-slate-800 border-slate-700">
// // // // // //                   <SelectValue placeholder="Select member" />
// // // // // //                 </SelectTrigger>
// // // // // //                 <SelectContent className="bg-slate-900 border-slate-800 text-white">
// // // // // //                   {board.allowedUsers?.map(user => (
// // // // // //                     <SelectItem key={user.id} value={user.id.toString()}>{user.name}</SelectItem>
// // // // // //                   ))}
// // // // // //                 </SelectContent>
// // // // // //               </Select>
// // // // // //             </div>

// // // // // //             <div className="space-y-1.5">
// // // // // //               <Label>Initial Status</Label>
// // // // // //               <Select value={taskForm.status} onValueChange={(v) => setTaskForm({...taskForm, status: v})}>
// // // // // //                 <SelectTrigger className="bg-slate-800 border-slate-700">
// // // // // //                   <SelectValue />
// // // // // //                 </SelectTrigger>
// // // // // //                 <SelectContent className="bg-slate-900 border-slate-800 text-white">
// // // // // //                   {activeSprint?.status.map(s => (
// // // // // //                     <SelectItem key={s} value={s}>{s}</SelectItem>
// // // // // //                   ))}
// // // // // //                 </SelectContent>
// // // // // //               </Select>
// // // // // //             </div>

// // // // // //             {/* Metrics: Story Points & Hours */}
// // // // // //             <div className="space-y-1.5">
// // // // // //               <Label>Story Points</Label>
// // // // // //               <Input 
// // // // // //                 type="number" 
// // // // // //                 value={taskForm.storyPoints} 
// // // // // //                 onChange={e => setTaskForm({...taskForm, storyPoints: parseInt(e.target.value)})} 
// // // // // //                 className="bg-slate-800 border-slate-700"
// // // // // //               />
// // // // // //             </div>

// // // // // //             <div className="space-y-1.5">
// // // // // //               <Label>Estimated Hours</Label>
// // // // // //               <Input 
// // // // // //                 type="number" 
// // // // // //                 step="0.5"
// // // // // //                 value={taskForm.hours} 
// // // // // //                 onChange={e => setTaskForm({...taskForm, hours: parseFloat(e.target.value)})} 
// // // // // //                 className="bg-slate-800 border-slate-700"
// // // // // //               />
// // // // // //             </div>

// // // // // //             {/* Priority */}
// // // // // //             <div className="col-span-2 space-y-1.5">
// // // // // //               <Label>Priority</Label>
// // // // // //               <Select value={taskForm.priority} onValueChange={(v) => setTaskForm({...taskForm, priority: v})}>
// // // // // //                 <SelectTrigger className="bg-slate-800 border-slate-700">
// // // // // //                   <SelectValue />
// // // // // //                 </SelectTrigger>
// // // // // //                 <SelectContent className="bg-slate-900 border-slate-800 text-white">
// // // // // //                   <SelectItem value="Low">Low</SelectItem>
// // // // // //                   <SelectItem value="Medium">Medium</SelectItem>
// // // // // //                   <SelectItem value="High">High</SelectItem>
// // // // // //                 </SelectContent>
// // // // // //               </Select>
// // // // // //             </div>
// // // // // //           </div>

// // // // // //           <DialogFooter>
// // // // // //             <Button onClick={handleCreateTask} className="bg-blue-600 hover:bg-blue-700 w-full">
// // // // // //               Create Task
// // // // // //             </Button>
// // // // // //           </DialogFooter>
// // // // // //         </DialogContent>
// // // // // //       </Dialog>

// // // // // //       <TaskDrawer 
// // // // // //         task={selectedTask}
// // // // // //         availableStatus={activeSprint?.status || []}
// // // // // //         onClose={() => setSelectedTask(null)} boardMembers={[]} onTaskUpdate={function (updatedTask: Task): void {
// // // // // //           throw new Error('Function not implemented.');
// // // // // //         } }      />
// // // // // //     </DashboardLayout>
// // // // // //   );
// // // // // // };

// // // // // // export default BoardDetailPage;



























// // // // // // import { useEffect, useState, useMemo } from 'react';
// // // // // // import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
// // // // // // import { DashboardLayout } from '@/components/DashboardLayout';
// // // // // // import { Topbar } from '@/components/Topbar';
// // // // // // import { KanbanBoard } from '@/components/KanbanBoard';
// // // // // // import { TaskDrawer } from '@/components/TaskDrawer';
// // // // // // import api from '@/lib/api';
// // // // // // import type { Board, Epic, Sprint, Task } from '@/types';
// // // // // // import { cn } from '@/lib/utils';
// // // // // // import { 
// // // // // //   ChevronLeft, Target, Zap, Plus, MoreVertical, 
// // // // // //   Users, Edit2 
// // // // // // } from 'lucide-react';
// // // // // // import { Button } from '@/components/ui/button';
// // // // // // import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
// // // // // // import { Input } from '@/components/ui/input';
// // // // // // import { Label } from '@/components/ui/label';
// // // // // // import { Textarea } from '@/components/ui/textarea';
// // // // // // import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// // // // // // import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
// // // // // // import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// // // // // // const BoardDetailPage = () => {
// // // // // //   const { boardId } = useParams();
// // // // // //   const navigate = useNavigate();
// // // // // //   const [searchParams, setSearchParams] = useSearchParams();

// // // // // //   // URL State Management - Syncs with refresh
// // // // // //   const selectedEpicId = searchParams.get('epic') ? parseInt(searchParams.get('epic')!) : null;
// // // // // //   const selectedSprintId = searchParams.get('sprint') ? parseInt(searchParams.get('sprint')!) : null;

// // // // // //   // Data State
// // // // // //   const [board, setBoard] = useState<Board | null>(null);
// // // // // //   const [epics, setEpics] = useState<Epic[]>([]);
// // // // // //   const [sprints, setSprints] = useState<Sprint[]>([]);
// // // // // //   const [tasks, setTasks] = useState<Task[]>([]);
  
// // // // // //   // UI & Dialog State
// // // // // //   const [selectedTask, setSelectedTask] = useState<Task | null>(null);
// // // // // //   const [dialogType, setDialogType] = useState<'epic' | 'sprint' | 'task' | 'members' | null>(null);
// // // // // //   const [isEditing, setIsEditing] = useState(false);
// // // // // //   const [editingId, setEditingId] = useState<number | null>(null);
  
// // // // // //   // Form States
// // // // // //   const [epicForm, setEpicForm] = useState({ title: '', description: '' });
// // // // // //   const [sprintForm, setSprintForm] = useState({ 
// // // // // //     title: '', description: '', startTime: '', expiry: '', 
// // // // // //     status: ["To Do", "In Progress", "Done"] 
// // // // // //   });
// // // // // //   const [taskForm, setTaskForm] = useState({
// // // // // //     title: '', description: '', assigneeId: '', storyPoints: 0, hours: 0, priority: 'Medium', status: ''
// // // // // //   });
// // // // // //   const [memberEmail, setMemberEmail] = useState('');

// // // // // //   // 1. Initial Fetch: Board and Epics
// // // // // //   useEffect(() => {
// // // // // //     const fetchInitialData = async () => {
// // // // // //       try {
// // // // // //         const [boardRes, epicsRes] = await Promise.all([
// // // // // //           api.get(`/api/boards/${boardId}`),
// // // // // //           api.get(`/api/boards/${boardId}/epics`)
// // // // // //         ]);
// // // // // //         if (boardRes.data.success) setBoard(boardRes.data.board);
// // // // // //         if (epicsRes.data.success) {
// // // // // //           setEpics(epicsRes.data.epics);
// // // // // //           // Auto-select first epic if none in URL
// // // // // //           if (!selectedEpicId && epicsRes.data.epics.length > 0) {
// // // // // //             setSearchParams({ epic: epicsRes.data.epics.id.toString() });
// // // // // //           }
// // // // // //         }
// // // // // //       } catch (error) { console.error(error); }
// // // // // //     };
// // // // // //     fetchInitialData();
// // // // // //   }, [boardId]);

// // // // // //   // 2. Fetch Sprints when Epic changes
// // // // // //   useEffect(() => {
// // // // // //     if (!selectedEpicId) return;
// // // // // //     api.get(`/api/epics/${selectedEpicId}/sprints`).then(res => {
// // // // // //       if (res.data.success) {
// // // // // //         setSprints(res.data.sprints);
// // // // // //         // Auto-select first sprint if none in URL
// // // // // //         if (!selectedSprintId && res.data.sprints.length > 0) {
// // // // // //           setSearchParams({ epic: selectedEpicId.toString(), sprint: res.data.sprints.id.toString() });
// // // // // //         }
// // // // // //       }
// // // // // //     });
// // // // // //   }, [selectedEpicId]);

// // // // // //   // 3. Fetch Tasks when Sprint changes
// // // // // //   useEffect(() => {
// // // // // //     if (!selectedSprintId) {
// // // // // //       setTasks([]);
// // // // // //       return;
// // // // // //     }
// // // // // //     api.get(`/api/sprints/${selectedSprintId}/tasks`).then(res => {
// // // // // //       if (res.data.success) setTasks(res.data.tasks);
// // // // // //     });
// // // // // //   }, [selectedSprintId]);

// // // // // //   const activeSprint = useMemo(() => sprints.find(s => s.id === selectedSprintId), [sprints, selectedSprintId]);

// // // // // //   // Handler for Task Updates (from TaskDrawer)
// // // // // //   const handleTaskUpdate = (updatedTask: Task) => {
// // // // // //     setTasks(prev => prev.map(t => t.id === updatedTask.id ? updatedTask : t));
// // // // // //     setSelectedTask(updatedTask);
// // // // // //   };

// // // // // //   // Member Management
// // // // // //   const handleAddMember = async () => {
// // // // // //     try {
// // // // // //       const res = await api.post(`/api/boards/${boardId}/members`, { email: memberEmail });
// // // // // //       if (res.data.success) {
// // // // // //         setBoard(prev => prev ? { ...prev, allowedUsers: [...(prev.allowedUsers || []), res.data.user] } : null);
// // // // // //         setMemberEmail('');
// // // // // //       }
// // // // // //     } catch (err) { console.error(err); }
// // // // // //   };

// // // // // //   // CRUD Handlers for Epics & Sprints
// // // // // //   const handleSaveEpic = async () => {
// // // // // //     const apiCall = isEditing ? api.put(`/api/epics/${editingId}`, epicForm) : api.post(`/api/boards/${boardId}/epics`, epicForm);
// // // // // //     const res = await apiCall;
// // // // // //     if (res.data.success) {
// // // // // //       setEpics(isEditing ? epics.map(e => e.id === editingId ? res.data.epic : e) : [...epics, res.data.epic]);
// // // // // //       setDialogType(null);
// // // // // //     }
// // // // // //   };

// // // // // //   const handleSaveSprint = async () => {
// // // // // //     const apiCall = isEditing ? api.put(`/api/sprints/${editingId}`, sprintForm) : api.post(`/api/epics/${selectedEpicId}/sprints`, sprintForm);
// // // // // //     const res = await apiCall;
// // // // // //     if (res.data.success) {
// // // // // //       setSprints(isEditing ? sprints.map(s => s.id === editingId ? res.data.sprint : s) : [...sprints, res.data.sprint]);
// // // // // //       setDialogType(null);
// // // // // //     }
// // // // // //   };

// // // // // //   const handleCreateTask = async () => {
// // // // // //     const res = await api.post(`/api/sprints/${selectedSprintId}/tasks`, {
// // // // // //       ...taskForm,
// // // // // //       assigneeId: taskForm.assigneeId ? parseInt(taskForm.assigneeId) : null,
// // // // // //     });
// // // // // //     if (res.data.success) {
// // // // // //       setTasks([...tasks, res.data.task]);
// // // // // //       setDialogType(null);
// // // // // //     }
// // // // // //   };

// // // // // //   if (!board) return <div className="p-10 text-white">Loading Board...</div>;

// // // // // //   return (
// // // // // //     <DashboardLayout>
// // // // // //       <Topbar title={board.title} subtitle={board.description} createLabel="New Task" onCreateClick={() => setDialogType('task')}>
// // // // // //         <div className="flex items-center gap-2 mr-4">
// // // // // //           <Button variant="ghost" size="sm" onClick={() => setDialogType('members')} className="text-slate-400 hover:text-white">
// // // // // //             <Users className="w-4 h-4 mr-2" /> Members
// // // // // //           </Button>
// // // // // //           <button onClick={() => navigate('/')} className="p-1.5 rounded-md hover:bg-slate-800 text-slate-400 transition-colors">
// // // // // //             <ChevronLeft className="w-4 h-4" />
// // // // // //           </button>
// // // // // //         </div>
// // // // // //       </Topbar>

// // // // // //       {/* Epic Navigation */}
// // // // // //       <div className="flex items-center gap-2 px-4 py-3 bg-slate-950 border-b border-slate-800 overflow-x-auto scrollbar-none">
// // // // // //         <Target className="w-4 h-4 text-blue-500 mr-2 shrink-0" />
// // // // // //         {epics.map(epic => (
// // // // // //           <div key={epic.id} className="flex items-center group bg-slate-900 rounded-md shrink-0">
// // // // // //             <button
// // // // // //               onClick={() => setSearchParams({ epic: epic.id.toString() })}
// // // // // //               className={cn(
// // // // // //                 "px-3 py-1.5 text-sm rounded-l-md transition-all", 
// // // // // //                 selectedEpicId === epic.id ? "bg-blue-600 text-white" : "text-slate-400 hover:text-white"
// // // // // //               )}
// // // // // //             >
// // // // // //               {epic.title}
// // // // // //             </button>
// // // // // //             <DropdownMenu>
// // // // // //               <DropdownMenuTrigger className="px-1.5 py-1.5 hover:bg-slate-800 rounded-r-md text-slate-500">
// // // // // //                 <MoreVertical className="w-3 h-3" />
// // // // // //               </DropdownMenuTrigger>
// // // // // //               <DropdownMenuContent className="bg-slate-900 border-slate-800 text-white">
// // // // // //                 <DropdownMenuItem onClick={() => { 
// // // // // //                   setIsEditing(true); 
// // // // // //                   setEditingId(epic.id); 
// // // // // //                   setEpicForm({title: epic.title, description: epic.description || ''}); 
// // // // // //                   setDialogType('epic'); 
// // // // // //                 }}>Edit Epic</DropdownMenuItem>
// // // // // //               </DropdownMenuContent>
// // // // // //             </DropdownMenu>
// // // // // //           </div>
// // // // // //         ))}
// // // // // //         <Button variant="ghost" size="sm" onClick={() => { setIsEditing(false); setEpicForm({title: '', description: ''}); setDialogType('epic'); }} className="text-slate-500 shrink-0">
// // // // // //           <Plus className="w-3 h-3 mr-1"/> Epic
// // // // // //         </Button>
// // // // // //       </div>

// // // // // //       {/* Sprint Navigation */}
// // // // // //       <div className="flex items-center gap-2 px-4 py-2 bg-slate-900/50 border-b border-slate-800 overflow-x-auto scrollbar-none">
// // // // // //         <Zap className="w-4 h-4 text-purple-500 mr-2 shrink-0" />
// // // // // //         {sprints.map(sprint => (
// // // // // //           <div key={sprint.id} className="flex items-center group shrink-0">
// // // // // //             <button
// // // // // //               onClick={() => setSearchParams({ epic: selectedEpicId!.toString(), sprint: sprint.id.toString() })}
// // // // // //               className={cn(
// // // // // //                 "px-3 py-1 text-xs rounded-full border transition-all", 
// // // // // //                 selectedSprintId === sprint.id ? "border-purple-500 bg-purple-500/10 text-purple-400" : "border-slate-700 text-slate-500"
// // // // // //               )}
// // // // // //             >
// // // // // //               {sprint.title}
// // // // // //             </button>
// // // // // //             {selectedSprintId === sprint.id && (
// // // // // //               <button onClick={() => { 
// // // // // //                 setIsEditing(true); 
// // // // // //                 setEditingId(sprint.id); 
// // // // // //                 setSprintForm({ 
// // // // // //                   title: sprint.title, 
// // // // // //                   description: sprint.description || '', 
// // // // // //                   startTime: sprint.startTime ? sprint.startTime.slice(0, 16) : '', 
// // // // // //                   expiry: sprint.expiry ? sprint.expiry.slice(0, 16) : '', 
// // // // // //                   status: sprint.status 
// // // // // //                 });
// // // // // //                 setDialogType('sprint');
// // // // // //               }} className="ml-1 p-1 text-slate-500 hover:text-white transition-colors">
// // // // // //                 <Edit2 className="w-3 h-3" />
// // // // // //               </button>
// // // // // //             )}
// // // // // //           </div>
// // // // // //         ))}
// // // // // //         {selectedEpicId && (
// // // // // //           <Button variant="ghost" size="sm" onClick={() => { setIsEditing(false); setSprintForm({title: '', description: '', startTime: '', expiry: '', status: ["To Do", "In Progress", "Done"]}); setDialogType('sprint'); }} className="h-7 text-[10px] text-slate-500 shrink-0">
// // // // // //             <Plus className="w-3 h-3 mr-1"/> Sprint
// // // // // //           </Button>
// // // // // //         )}
// // // // // //       </div>

// // // // // //       {/* Kanban Board */}
// // // // // //       {activeSprint ? (
// // // // // //         <KanbanBoard 
// // // // // //           columns={activeSprint.status} 
// // // // // //           tasks={tasks} 
// // // // // //           onTaskClick={setSelectedTask} 
// // // // // //           onAddTask={(status) => { 
// // // // // //             setTaskForm({ ...taskForm, status, title: '', description: '', assigneeId: '' }); 
// // // // // //             setDialogType('task'); 
// // // // // //           }} 
// // // // // //         />
// // // // // //       ) : (
// // // // // //         <div className="flex-1 flex flex-col items-center justify-center text-slate-500">
// // // // // //           <p>Select or create an epic to view the board.</p>
// // // // // //         </div>
// // // // // //       )}

// // // // // //       {/* Members Dialog */}
// // // // // //       <Dialog open={dialogType === 'members'} onOpenChange={() => setDialogType(null)}>
// // // // // //         <DialogContent className="bg-slate-900 border-slate-800 text-white">
// // // // // //           <DialogHeader><DialogTitle>Manage Board Members</DialogTitle></DialogHeader>
// // // // // //           <div className="flex gap-2 py-4">
// // // // // //             <Input placeholder="User email..." value={memberEmail} onChange={e => setMemberEmail(e.target.value)} className="bg-slate-800 border-slate-700"/>
// // // // // //             <Button onClick={handleAddMember} className="bg-blue-600 hover:bg-blue-700">Add</Button>
// // // // // //           </div>
// // // // // //           <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
// // // // // //             {board.allowedUsers?.map(user => (
// // // // // //               <div key={user.id} className="flex items-center gap-3 p-2 rounded-lg bg-slate-800/50">
// // // // // //                 <Avatar className="h-8 w-8">
// // // // // //                   <AvatarImage src={user.picture}/>
// // // // // //                   <AvatarFallback>{user.name?.charAt(0)}</AvatarFallback>
// // // // // //                 </Avatar>
// // // // // //                 <div className="flex-1">
// // // // // //                   <p className="text-sm font-medium">{user.name}</p>
// // // // // //                   <p className="text-xs text-slate-500">{user.email}</p>
// // // // // //                 </div>
// // // // // //               </div>
// // // // // //             ))}
// // // // // //           </div>
// // // // // //         </DialogContent>
// // // // // //       </Dialog>

// // // // // //       {/* Creation/Edit Dialogs (Epics & Sprints) */}
// // // // // //       <Dialog open={dialogType === 'epic'} onOpenChange={() => setDialogType(null)}>
// // // // // //         <DialogContent className="bg-slate-900 border-slate-800 text-white">
// // // // // //           <DialogHeader><DialogTitle>{isEditing ? 'Edit Epic' : 'New Epic'}</DialogTitle></DialogHeader>
// // // // // //           <div className="space-y-4 py-2">
// // // // // //             <div className="space-y-1"><Label>Title</Label><Input value={epicForm.title} onChange={e => setEpicForm({...epicForm, title: e.target.value})} className="bg-slate-800 border-slate-700"/></div>
// // // // // //             <div className="space-y-1"><Label>Description</Label><Textarea value={epicForm.description} onChange={e => setEpicForm({...epicForm, description: e.target.value})} className="bg-slate-800 border-slate-700"/></div>
// // // // // //           </div>
// // // // // //           <DialogFooter><Button onClick={handleSaveEpic} className="bg-blue-600 w-full">Save Epic</Button></DialogFooter>
// // // // // //         </DialogContent>
// // // // // //       </Dialog>

// // // // // //       <Dialog open={dialogType === 'sprint'} onOpenChange={() => setDialogType(null)}>
// // // // // //         <DialogContent className="bg-slate-900 border-slate-800 text-white max-w-md">
// // // // // //           <DialogHeader><DialogTitle>{isEditing ? 'Edit Sprint' : 'New Sprint'}</DialogTitle></DialogHeader>
// // // // // //           <div className="grid grid-cols-2 gap-4 py-2">
// // // // // //             <div className="col-span-2 space-y-1"><Label>Title</Label><Input value={sprintForm.title} onChange={e => setSprintForm({...sprintForm, title: e.target.value})} className="bg-slate-800 border-slate-700"/></div>
// // // // // //             <div className="space-y-1"><Label>Start Date</Label><Input type="datetime-local" value={sprintForm.startTime} onChange={e => setSprintForm({...sprintForm, startTime: e.target.value})} className="bg-slate-800 border-slate-700 text-xs"/></div>
// // // // // //             <div className="space-y-1"><Label>Expiry Date</Label><Input type="datetime-local" value={sprintForm.expiry} onChange={e => setSprintForm({...sprintForm, expiry: e.target.value})} className="bg-slate-800 border-slate-700 text-xs"/></div>
// // // // // //             <div className="col-span-2 space-y-1"><Label>Status Columns (Comma separated)</Label><Input value={sprintForm.status.join(',')} onChange={e => setSprintForm({...sprintForm, status: e.target.value.split(',')})} className="bg-slate-800 border-slate-700"/></div>
// // // // // //           </div>
// // // // // //           <DialogFooter><Button onClick={handleSaveSprint} className="bg-purple-600 w-full">Save Sprint</Button></DialogFooter>
// // // // // //         </DialogContent>
// // // // // //       </Dialog>

// // // // // //       <Dialog open={dialogType === 'task'} onOpenChange={() => setDialogType(null)}>
// // // // // //         <DialogContent className="bg-slate-900 border-slate-800 text-white">
// // // // // //           <DialogHeader><DialogTitle>New Task in {taskForm.status}</DialogTitle></DialogHeader>
// // // // // //           <div className="space-y-4 py-2">
// // // // // //             <div className="space-y-1"><Label>Title</Label><Input value={taskForm.title} onChange={e => setTaskForm({...taskForm, title: e.target.value})} className="bg-slate-800 border-slate-700" /></div>
// // // // // //             <div className="space-y-1"><Label>Description</Label><Textarea value={taskForm.description} onChange={e => setTaskForm({...taskForm, description: e.target.value})} className="bg-slate-800 border-slate-700" /></div>
// // // // // //             <div className="grid grid-cols-2 gap-4">
// // // // // //               <div className="space-y-1">
// // // // // //                 <Label>Assignee</Label>
// // // // // //                 <Select value={taskForm.assigneeId} onValueChange={v => setTaskForm({...taskForm, assigneeId: v})}>
// // // // // //                   <SelectTrigger className="bg-slate-800 border-slate-700"><SelectValue placeholder="Select member" /></SelectTrigger>
// // // // // //                   <SelectContent className="bg-slate-900 border-slate-800 text-white">
// // // // // //                     {board.allowedUsers?.map(u => (<SelectItem key={u.id} value={u.id.toString()}>{u.name}</SelectItem>))}
// // // // // //                   </SelectContent>
// // // // // //                 </Select>
// // // // // //               </div>
// // // // // //               <div className="space-y-1">
// // // // // //                 <Label>Priority</Label>
// // // // // //                 <Select value={taskForm.priority} onValueChange={v => setTaskForm({...taskForm, priority: v})}>
// // // // // //                   <SelectTrigger className="bg-slate-800 border-slate-700"><SelectValue /></SelectTrigger>
// // // // // //                   <SelectContent className="bg-slate-900 border-slate-800 text-white">
// // // // // //                     <SelectItem value="Low">Low</SelectItem><SelectItem value="Medium">Medium</SelectItem><SelectItem value="High">High</SelectItem>
// // // // // //                   </SelectContent>
// // // // // //                 </Select>
// // // // // //               </div>
// // // // // //             </div>
// // // // // //           </div>
// // // // // //           <DialogFooter><Button onClick={handleCreateTask} className="bg-blue-600 w-full">Create Task</Button></DialogFooter>
// // // // // //         </DialogContent>
// // // // // //       </Dialog>

// // // // // //       <TaskDrawer 
// // // // // //         task={selectedTask}
// // // // // //         availableStatus={activeSprint?.status || []}
// // // // // //         boardMembers={board.allowedUsers || []}
// // // // // //         onClose={() => setSelectedTask(null)}
// // // // // //         onTaskUpdate={handleTaskUpdate}
// // // // // //       />
// // // // // //     </DashboardLayout>
// // // // // //   );
// // // // // // };

// // // // // // export default BoardDetailPage;



















// // // // // import { useEffect, useState, useMemo } from 'react';
// // // // // import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
// // // // // import { DashboardLayout } from '@/components/DashboardLayout';
// // // // // import { Topbar } from '@/components/Topbar';
// // // // // import { KanbanBoard } from '@/components/KanbanBoard';
// // // // // import { TaskDrawer } from '@/components/TaskDrawer';
// // // // // import api from '@/lib/api';
// // // // // import type { Board, Epic, Sprint, Task } from '@/types';
// // // // // import { cn } from '@/lib/utils';
// // // // // import { 
// // // // //   ChevronLeft, Target, Zap, Plus, MoreVertical, 
// // // // //   Users, Edit2 
// // // // // } from 'lucide-react';
// // // // // import { Button } from '@/components/ui/button';
// // // // // import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
// // // // // import { Input } from '@/components/ui/input';
// // // // // import { Label } from '@/components/ui/label';
// // // // // import { Textarea } from '@/components/ui/textarea';
// // // // // import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// // // // // import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
// // // // // import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// // // // // const BoardDetailPage = () => {
// // // // //   const { boardId } = useParams();
// // // // //   const navigate = useNavigate();
// // // // //   const [searchParams, setSearchParams] = useSearchParams();

// // // // //   // URL State Management - Syncs with refresh
// // // // //   const selectedEpicId = searchParams.get('epic') ? parseInt(searchParams.get('epic')!) : null;
// // // // //   const selectedSprintId = searchParams.get('sprint') ? parseInt(searchParams.get('sprint')!) : null;

// // // // //   // Data State
// // // // //   const [board, setBoard] = useState<Board | null>(null);
// // // // //   const [epics, setEpics] = useState<Epic[]>([]);
// // // // //   const [sprints, setSprints] = useState<Sprint[]>([]);
// // // // //   const [tasks, setTasks] = useState<Task[]>([]);
  
// // // // //   // UI & Dialog State
// // // // //   const [selectedTask, setSelectedTask] = useState<Task | null>(null);
// // // // //   const [dialogType, setDialogType] = useState<'epic' | 'sprint' | 'task' | 'members' | null>(null);
// // // // //   const [isEditing, setIsEditing] = useState(false);
// // // // //   const [editingId, setEditingId] = useState<number | null>(null);
  
// // // // //   // Form States
// // // // //   const [epicForm, setEpicForm] = useState({ title: '', description: '' });
// // // // //   const [sprintForm, setSprintForm] = useState({ 
// // // // //     title: '', description: '', startTime: '', expiry: '', 
// // // // //     status: ["To Do", "In Progress", "Done"] 
// // // // //   });
// // // // //   // const [taskForm, setTaskForm] = useState({
// // // // //   //   title: '', description: '', assigneeId: '', storyPoints: 0, hours: 0, priority: 'Medium', status: ''
// // // // //   // });

// // // // //   const [taskForm, setTaskForm] = useState({
// // // // //   title: '',
// // // // //   description: '',
// // // // //   assigneeId: '',
// // // // //   storyPoints: 0,
// // // // //   hours: 0,
// // // // //   priority: 'Medium',
// // // // //   status: ''
// // // // // });
// // // // //   const [memberEmail, setMemberEmail] = useState('');

// // // // //   // 1. Initial Fetch: Board and Epics
// // // // //   useEffect(() => {
// // // // //     const fetchInitialData = async () => {
// // // // //       try {
// // // // //         const [boardRes, epicsRes] = await Promise.all([
// // // // //           api.get(`/api/boards/${boardId}`),
// // // // //           api.get(`/api/boards/${boardId}/epics`)
// // // // //         ]);
// // // // //         if (boardRes.data.success) setBoard(boardRes.data.board);
// // // // //         if (epicsRes.data.success) {
// // // // //           setEpics(epicsRes.data.epics);
// // // // //           // Auto-select first epic if none in URL
// // // // //           if (!selectedEpicId && epicsRes.data.epics.length > 0) {
// // // // //             setSearchParams({ epic: epicsRes.data.epics.id.toString() });
// // // // //           }
// // // // //         }
// // // // //       } catch (error) { console.error(error); }
// // // // //     };
// // // // //     fetchInitialData();
// // // // //   }, [boardId]);

// // // // //   // 2. Fetch Sprints when Epic changes
// // // // //   useEffect(() => {
// // // // //     if (!selectedEpicId) return;
// // // // //     api.get(`/api/epics/${selectedEpicId}/sprints`).then(res => {
// // // // //       if (res.data.success) {
// // // // //         setSprints(res.data.sprints);
// // // // //         // Auto-select first sprint if none in URL
// // // // //         if (!selectedSprintId && res.data.sprints.length > 0) {
// // // // //           setSearchParams({ epic: selectedEpicId.toString(), sprint: res.data.sprints.id.toString() });
// // // // //         }
// // // // //       }
// // // // //     });
// // // // //   }, [selectedEpicId]);

// // // // //   // 3. Fetch Tasks when Sprint changes
// // // // //   useEffect(() => {
// // // // //     if (!selectedSprintId) {
// // // // //       setTasks([]);
// // // // //       return;
// // // // //     }
// // // // //     api.get(`/api/sprints/${selectedSprintId}/tasks`).then(res => {
// // // // //       if (res.data.success) setTasks(res.data.tasks);
// // // // //     });
// // // // //   }, [selectedSprintId]);

// // // // //   const activeSprint = useMemo(() => sprints.find(s => s.id === selectedSprintId), [sprints, selectedSprintId]);

// // // // //   // Handler for Task Updates (from TaskDrawer)
// // // // //   const handleTaskUpdate = (updatedTask: Task) => {
// // // // //     setTasks(prev => prev.map(t => t.id === updatedTask.id ? updatedTask : t));
// // // // //     setSelectedTask(updatedTask);
// // // // //   };

// // // // //   // Member Management
// // // // //   const handleAddMember = async () => {
// // // // //     try {
// // // // //       const res = await api.post(`/api/boards/${boardId}/users`, { userId: memberEmail });
// // // // //       if (res.data.success) {
// // // // //         setBoard(prev => prev ? { ...prev, allowedUsers: [...(prev.allowedUsers || []), res.data.user] } : null);
// // // // //         setMemberEmail('');
// // // // //       }
// // // // //     } catch (err) { console.error(err); }
// // // // //   };

// // // // //   // CRUD Handlers for Epics & Sprints
// // // // //   const handleSaveEpic = async () => {
// // // // //     const apiCall = isEditing ? api.put(`/api/epics/${editingId}`, epicForm) : api.post(`/api/boards/${boardId}/epics`, epicForm);
// // // // //     const res = await apiCall;
// // // // //     if (res.data.success) {
// // // // //       setEpics(isEditing ? epics.map(e => e.id === editingId ? res.data.epic : e) : [...epics, res.data.epic]);
// // // // //       setDialogType(null);
// // // // //     }
// // // // //   };

// // // // //   // const handleSaveSprint = async () => {
// // // // //   //   const apiCall = isEditing ? api.put(`/api/sprints/${editingId}`, sprintForm) : api.post(`/api/epics/${selectedEpicId}/sprints`, sprintForm);
// // // // //   //   const res = await apiCall;
// // // // //   //   if (res.data.success) {
// // // // //   //     setSprints(isEditing ? sprints.map(s => s.id === editingId ? res.data.sprint : s) : [...sprints, res.data.sprint]);
// // // // //   //     setDialogType(null);
// // // // //   //   }
// // // // //   // };

// // // // //   // const handleCreateTask = async () => {
// // // // //   //   const res = await api.post(`/api/sprints/${selectedSprintId}/tasks`, {
// // // // //   //     ...taskForm,
// // // // //   //     assigneeId: taskForm.assigneeId ? parseInt(taskForm.assigneeId) : null,
// // // // //   //   });
// // // // //   //   if (res.data.success) {
// // // // //   //     setTasks([...tasks, res.data.task]);
// // // // //   //     setDialogType(null);
// // // // //   //   }
// // // // //   // };

// // // // //   const handleSaveSprint = async () => {
// // // // //   if (!sprintForm.title.trim() || !sprintForm.description.trim()) {
// // // // //     alert("Title and Description are required");
// // // // //     return;
// // // // //   }

// // // // //   const payload = {
// // // // //     ...sprintForm,
// // // // //     description: sprintForm.description.trim()
// // // // //   };

// // // // //   const apiCall = isEditing
// // // // //     ? api.put(`/api/sprints/${editingId}`, payload)
// // // // //     : api.post(`/api/epics/${selectedEpicId}/sprints`, payload);

// // // // //   const res = await apiCall;

// // // // //   if (res.data.success) {
// // // // //     setSprints(prev =>
// // // // //       isEditing
// // // // //         ? prev.map(s => s.id === editingId ? res.data.sprint : s)
// // // // //         : [...prev, res.data.sprint]
// // // // //     );
// // // // //     setDialogType(null);
// // // // //   }
// // // // // };
// // // // //   const handleCreateTask = async () => {
// // // // //   const res = await api.post(`/api/sprints/${selectedSprintId}/tasks`, {
// // // // //     ...taskForm,
// // // // //     assigneeId: taskForm.assigneeId ? parseInt(taskForm.assigneeId) : null,
// // // // //     storyPoints: Number(taskForm.storyPoints) || 0,
// // // // //     hours: Number(taskForm.hours) || 0
// // // // //   });

// // // // //   if (res.data.success) {
// // // // //     setTasks(prev => [...prev, res.data.task]);
// // // // //     setDialogType(null);
// // // // //   }
// // // // // };

// // // // //   if (!board) return <div className="p-10 text-white">Loading Board...</div>;

// // // // //   return (
// // // // //     <DashboardLayout>
// // // // //       <Topbar title={board.title} subtitle={board.description} createLabel="New Task" onCreateClick={() => setDialogType('task')}>
// // // // //         <div className="flex items-center gap-2 mr-4">
// // // // //           <Button variant="ghost" size="sm" onClick={() => setDialogType('members')} className="text-slate-400 hover:text-white">
// // // // //             <Users className="w-4 h-4 mr-2" /> Members
// // // // //           </Button>
// // // // //           <button onClick={() => navigate('/')} className="p-1.5 rounded-md hover:bg-slate-800 text-slate-400 transition-colors">
// // // // //             <ChevronLeft className="w-4 h-4" />
// // // // //           </button>
// // // // //         </div>
// // // // //       </Topbar>

// // // // //       {/* Epic Navigation */}
// // // // //       <div className="flex items-center gap-2 px-4 py-3 bg-slate-950 border-b border-slate-800 overflow-x-auto scrollbar-none">
// // // // //         <Target className="w-4 h-4 text-blue-500 mr-2 shrink-0" />
// // // // //         {epics.map(epic => (
// // // // //           <div key={epic.id} className="flex items-center group bg-slate-900 rounded-md shrink-0">
// // // // //             <button
// // // // //               onClick={() => setSearchParams({ epic: epic.id.toString() })}
// // // // //               className={cn(
// // // // //                 "px-3 py-1.5 text-sm rounded-l-md transition-all", 
// // // // //                 selectedEpicId === epic.id ? "bg-blue-600 text-white" : "text-slate-400 hover:text-white"
// // // // //               )}
// // // // //             >
// // // // //               {epic.title}
// // // // //             </button>
// // // // //             <DropdownMenu>
// // // // //               <DropdownMenuTrigger className="px-1.5 py-1.5 hover:bg-slate-800 rounded-r-md text-slate-500">
// // // // //                 <MoreVertical className="w-3 h-3" />
// // // // //               </DropdownMenuTrigger>
// // // // //               <DropdownMenuContent className="bg-slate-900 border-slate-800 text-white">
// // // // //                 <DropdownMenuItem onClick={() => { 
// // // // //                   setIsEditing(true); 
// // // // //                   setEditingId(epic.id); 
// // // // //                   setEpicForm({title: epic.title, description: epic.description || ''}); 
// // // // //                   setDialogType('epic'); 
// // // // //                 }}>Edit Epic</DropdownMenuItem>
// // // // //               </DropdownMenuContent>
// // // // //             </DropdownMenu>
// // // // //           </div>
// // // // //         ))}
// // // // //         <Button variant="ghost" size="sm" onClick={() => { setIsEditing(false); setEpicForm({title: '', description: ''}); setDialogType('epic'); }} className="text-slate-500 shrink-0">
// // // // //           <Plus className="w-3 h-3 mr-1"/> Epic
// // // // //         </Button>
// // // // //       </div>

// // // // //       {/* Sprint Navigation */}
// // // // //       <div className="flex items-center gap-2 px-4 py-2 bg-slate-900/50 border-b border-slate-800 overflow-x-auto scrollbar-none">
// // // // //         <Zap className="w-4 h-4 text-purple-500 mr-2 shrink-0" />
// // // // //         {sprints.map(sprint => (
// // // // //           <div key={sprint.id} className="flex items-center group shrink-0">
// // // // //             <button
// // // // //               onClick={() => setSearchParams({ epic: selectedEpicId!.toString(), sprint: sprint.id.toString() })}
// // // // //               className={cn(
// // // // //                 "px-3 py-1 text-xs rounded-full border transition-all", 
// // // // //                 selectedSprintId === sprint.id ? "border-purple-500 bg-purple-500/10 text-purple-400" : "border-slate-700 text-slate-500"
// // // // //               )}
// // // // //             >
// // // // //               {sprint.title}
// // // // //             </button>
// // // // //             {selectedSprintId === sprint.id && (
// // // // //               <button onClick={() => { 
// // // // //                 setIsEditing(true); 
// // // // //                 setEditingId(sprint.id); 
// // // // //                 setSprintForm({ 
// // // // //                   title: sprint.title, 
// // // // //                   description: sprint.description || '', 
// // // // //                   startTime: sprint.startTime ? sprint.startTime.slice(0, 16) : '', 
// // // // //                   expiry: sprint.expiry ? sprint.expiry.slice(0, 16) : '', 
// // // // //                   status: sprint.status 
// // // // //                 });
// // // // //                 setDialogType('sprint');
// // // // //               }} className="ml-1 p-1 text-slate-500 hover:text-white transition-colors">
// // // // //                 <Edit2 className="w-3 h-3" />
// // // // //               </button>
// // // // //             )}
// // // // //           </div>
// // // // //         ))}
// // // // //         {selectedEpicId && (
// // // // //           <Button variant="ghost" size="sm" onClick={() => { setIsEditing(false); setSprintForm({title: '', description: '', startTime: '', expiry: '', status: ["To Do", "In Progress", "Done"]}); setDialogType('sprint'); }} className="h-7 text-[10px] text-slate-500 shrink-0">
// // // // //             <Plus className="w-3 h-3 mr-1"/> Sprint
// // // // //           </Button>
// // // // //         )}
// // // // //       </div>

// // // // //       {/* Kanban Board */}
// // // // //       {activeSprint ? (
// // // // //         <KanbanBoard 
// // // // //           columns={activeSprint.status} 
// // // // //           tasks={tasks} 
// // // // //           onTaskClick={setSelectedTask} 
// // // // //           onAddTask={(status) => { 
// // // // //             setTaskForm({ ...taskForm, status, title: '', description: '', assigneeId: '' }); 
// // // // //             setDialogType('task'); 
// // // // //           }} 
// // // // //         />
// // // // //       ) : (
// // // // //         <div className="flex-1 flex flex-col items-center justify-center text-slate-500">
// // // // //           <p>Select or create an epic to view the board.</p>
// // // // //         </div>
// // // // //       )}

// // // // //       {/* Members Dialog */}
// // // // //       <Dialog open={dialogType === 'members'} onOpenChange={() => setDialogType(null)}>
// // // // //         <DialogContent className="bg-slate-900 border-slate-800 text-white">
// // // // //           <DialogHeader><DialogTitle>Manage Board Members</DialogTitle></DialogHeader>
// // // // //           <div className="flex gap-2 py-4">
// // // // //             <Input placeholder="User email..." value={memberEmail} onChange={e => setMemberEmail(e.target.value)} className="bg-slate-800 border-slate-700"/>
// // // // //             <Button onClick={handleAddMember} className="bg-blue-600 hover:bg-blue-700">Add</Button>
// // // // //           </div>
// // // // //           <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
// // // // //             {board.allowedUsers?.map(user => (
// // // // //               <div key={user.id} className="flex items-center gap-3 p-2 rounded-lg bg-slate-800/50">
// // // // //                 <Avatar className="h-8 w-8">
// // // // //                   <AvatarImage src={user.picture}/>
// // // // //                   <AvatarFallback>{user.name?.charAt(0)}</AvatarFallback>
// // // // //                 </Avatar>
// // // // //                 <div className="flex-1">
// // // // //                   <p className="text-sm font-medium">{user.name}</p>
// // // // //                   <p className="text-xs text-slate-500">{user.email}</p>
// // // // //                 </div>
// // // // //               </div>
// // // // //             ))}
// // // // //           </div>
// // // // //         </DialogContent>
// // // // //       </Dialog>

// // // // //       {/* Creation/Edit Dialogs (Epics & Sprints) */}
// // // // //       <Dialog open={dialogType === 'epic'} onOpenChange={() => setDialogType(null)}>
// // // // //         <DialogContent className="bg-slate-900 border-slate-800 text-white">
// // // // //           <DialogHeader><DialogTitle>{isEditing ? 'Edit Epic' : 'New Epic'}</DialogTitle></DialogHeader>
// // // // //           <div className="space-y-4 py-2">
// // // // //             <div className="space-y-1"><Label>Title</Label><Input value={epicForm.title} onChange={e => setEpicForm({...epicForm, title: e.target.value})} className="bg-slate-800 border-slate-700"/></div>
// // // // //             <div className="space-y-1"><Label>Description</Label><Textarea value={epicForm.description} onChange={e => setEpicForm({...epicForm, description: e.target.value})} className="bg-slate-800 border-slate-700"/></div>
// // // // //           </div>
// // // // //           <DialogFooter><Button onClick={handleSaveEpic} className="bg-blue-600 w-full">Save Epic</Button></DialogFooter>
// // // // //         </DialogContent>
// // // // //       </Dialog>

// // // // //       {/* <Dialog open={dialogType === 'sprint'} onOpenChange={() => setDialogType(null)}>
// // // // //         <DialogContent className="bg-slate-900 border-slate-800 text-white max-w-md">
// // // // //           <DialogHeader><DialogTitle>{isEditing ? 'Edit Sprint' : 'New Sprint'}</DialogTitle></DialogHeader>
// // // // //           <div className="grid grid-cols-2 gap-4 py-2">
// // // // //             <div className="col-span-2 space-y-1"><Label>Title</Label><Input value={sprintForm.title} onChange={e => setSprintForm({...sprintForm, title: e.target.value})} className="bg-slate-800 border-slate-700"/></div>
// // // // //             <div className="space-y-1"><Label>Start Date</Label><Input type="datetime-local" value={sprintForm.startTime} onChange={e => setSprintForm({...sprintForm, startTime: e.target.value})} className="bg-slate-800 border-slate-700 text-xs"/></div>
// // // // //             <div className="space-y-1"><Label>Expiry Date</Label><Input type="datetime-local" value={sprintForm.expiry} onChange={e => setSprintForm({...sprintForm, expiry: e.target.value})} className="bg-slate-800 border-slate-700 text-xs"/></div>
// // // // //             <div className="col-span-2 space-y-1"><Label>Status Columns (Comma separated)</Label><Input value={sprintForm.status.join(',')} onChange={e => setSprintForm({...sprintForm, status: e.target.value.split(',')})} className="bg-slate-800 border-slate-700"/></div>
// // // // //           </div>
// // // // //           <DialogFooter><Button onClick={handleSaveSprint} className="bg-purple-600 w-full">Save Sprint</Button></DialogFooter>
// // // // //         </DialogContent>
// // // // //       </Dialog> */}
// // // // //       <Dialog open={dialogType === 'sprint'} onOpenChange={() => setDialogType(null)}>
// // // // //   <DialogContent className="bg-slate-900 border-slate-800 text-white max-w-md">
// // // // //     <DialogHeader>
// // // // //       <DialogTitle>{isEditing ? 'Edit Sprint' : 'New Sprint'}</DialogTitle>
// // // // //     </DialogHeader>

// // // // //     <div className="grid grid-cols-2 gap-4 py-2">

// // // // //       {/* Title */}
// // // // //       <div className="col-span-2 space-y-1">
// // // // //         <Label>Title *</Label>
// // // // //         <Input
// // // // //           value={sprintForm.title}
// // // // //           onChange={e => setSprintForm({ ...sprintForm, title: e.target.value })}
// // // // //           className="bg-slate-800 border-slate-700"
// // // // //         />
// // // // //       </div>

// // // // //       {/* Description (NOW REQUIRED) */}
// // // // //       <div className="col-span-2 space-y-1">
// // // // //         <Label>Description *</Label>
// // // // //         <Textarea
// // // // //           value={sprintForm.description}
// // // // //           onChange={e => setSprintForm({ ...sprintForm, description: e.target.value })}
// // // // //           className="bg-slate-800 border-slate-700"
// // // // //         />
// // // // //       </div>

// // // // //       {/* Start */}
// // // // //       <div className="space-y-1">
// // // // //         <Label>Start Date</Label>
// // // // //         <Input
// // // // //           type="datetime-local"
// // // // //           value={sprintForm.startTime}
// // // // //           onChange={e => setSprintForm({ ...sprintForm, startTime: e.target.value })}
// // // // //           className="bg-slate-800 border-slate-700 text-xs"
// // // // //         />
// // // // //       </div>

// // // // //       {/* Expiry */}
// // // // //       <div className="space-y-1">
// // // // //         <Label>Expiry Date</Label>
// // // // //         <Input
// // // // //           type="datetime-local"
// // // // //           value={sprintForm.expiry}
// // // // //           onChange={e => setSprintForm({ ...sprintForm, expiry: e.target.value })}
// // // // //           className="bg-slate-800 border-slate-700 text-xs"
// // // // //         />
// // // // //       </div>

// // // // //       {/* Status Columns */}
// // // // //       <div className="col-span-2 space-y-1">
// // // // //         <Label>Status Columns (Comma separated)</Label>
// // // // //         <Input
// // // // //           value={sprintForm.status.join(',')}
// // // // //           onChange={e =>
// // // // //             setSprintForm({
// // // // //               ...sprintForm,
// // // // //               status: e.target.value.split(',').map(s => s.trim())
// // // // //             })
// // // // //           }
// // // // //           className="bg-slate-800 border-slate-700"
// // // // //         />
// // // // //       </div>

// // // // //     </div>

// // // // //     <DialogFooter>
// // // // //       <Button
// // // // //         onClick={handleSaveSprint}
// // // // //         className="bg-purple-600 w-full"
// // // // //         disabled={!sprintForm.title.trim() || !sprintForm.description.trim()}
// // // // //       >
// // // // //         Save Sprint
// // // // //       </Button>
// // // // //     </DialogFooter>
// // // // //   </DialogContent>
// // // // // </Dialog>

// // // // //     <Dialog open={dialogType === 'task'} onOpenChange={() => setDialogType(null)}>
// // // // //   <DialogContent className="bg-slate-900 border-slate-800 text-white max-w-lg">
// // // // //     <DialogHeader>
// // // // //       <DialogTitle>New Task in {taskForm.status}</DialogTitle>
// // // // //     </DialogHeader>

// // // // //     <div className="grid grid-cols-2 gap-4 py-4">

// // // // //       {/* Title */}
// // // // //       <div className="col-span-2 space-y-1">
// // // // //         <Label>Title</Label>
// // // // //         <Input
// // // // //           value={taskForm.title}
// // // // //           onChange={e => setTaskForm({ ...taskForm, title: e.target.value })}
// // // // //           className="bg-slate-800 border-slate-700"
// // // // //         />
// // // // //       </div>

// // // // //       {/* Description */}
// // // // //       <div className="col-span-2 space-y-1">
// // // // //         <Label>Description</Label>
// // // // //         <Textarea
// // // // //           value={taskForm.description}
// // // // //           onChange={e => setTaskForm({ ...taskForm, description: e.target.value })}
// // // // //           className="bg-slate-800 border-slate-700"
// // // // //         />
// // // // //       </div>

// // // // //       {/* Assignee */}
// // // // //       <div className="space-y-1">
// // // // //         <Label>Assignee</Label>
// // // // //         <Select
// // // // //           value={taskForm.assigneeId}
// // // // //           onValueChange={v => setTaskForm({ ...taskForm, assigneeId: v })}
// // // // //         >
// // // // //           <SelectTrigger className="bg-slate-800 border-slate-700">
// // // // //             <SelectValue placeholder="Select member" />
// // // // //           </SelectTrigger>
// // // // //           <SelectContent className="bg-slate-900 border-slate-800 text-white">
// // // // //             {board.allowedUsers?.map(u => (
// // // // //               <SelectItem key={u.id} value={u.id.toString()}>
// // // // //                 {u.name}
// // // // //               </SelectItem>
// // // // //             ))}
// // // // //           </SelectContent>
// // // // //         </Select>
// // // // //       </div>

// // // // //       {/* Initial Status */}
// // // // //       <div className="space-y-1">
// // // // //         <Label>Status</Label>
// // // // //         <Select
// // // // //           value={taskForm.status}
// // // // //           onValueChange={v => setTaskForm({ ...taskForm, status: v })}
// // // // //         >
// // // // //           <SelectTrigger className="bg-slate-800 border-slate-700">
// // // // //             <SelectValue />
// // // // //           </SelectTrigger>
// // // // //           <SelectContent className="bg-slate-900 border-slate-800 text-white">
// // // // //             {activeSprint?.status.map(s => (
// // // // //               <SelectItem key={s} value={s}>
// // // // //                 {s}
// // // // //               </SelectItem>
// // // // //             ))}
// // // // //           </SelectContent>
// // // // //         </Select>
// // // // //       </div>

// // // // //       {/* Story Points */}
// // // // //       <div className="space-y-1">
// // // // //         <Label>Story Points</Label>
// // // // //         <Input
// // // // //           type="number"
// // // // //           value={taskForm.storyPoints}
// // // // //           onChange={e =>
// // // // //             setTaskForm({
// // // // //               ...taskForm,
// // // // //               storyPoints: parseInt(e.target.value) || 0
// // // // //             })
// // // // //           }
// // // // //           className="bg-slate-800 border-slate-700"
// // // // //         />
// // // // //       </div>

// // // // //       {/* Estimated Hours */}
// // // // //       <div className="space-y-1">
// // // // //         <Label>Estimated Hours</Label>
// // // // //         <Input
// // // // //           type="number"
// // // // //           step="0.5"
// // // // //           value={taskForm.hours}
// // // // //           onChange={e =>
// // // // //             setTaskForm({
// // // // //               ...taskForm,
// // // // //               hours: parseFloat(e.target.value) || 0
// // // // //             })
// // // // //           }
// // // // //           className="bg-slate-800 border-slate-700"
// // // // //         />
// // // // //       </div>

// // // // //       {/* Priority */}
// // // // //       <div className="col-span-2 space-y-1">
// // // // //         <Label>Priority</Label>
// // // // //         <Select
// // // // //           value={taskForm.priority}
// // // // //           onValueChange={v => setTaskForm({ ...taskForm, priority: v })}
// // // // //         >
// // // // //           <SelectTrigger className="bg-slate-800 border-slate-700">
// // // // //             <SelectValue />
// // // // //           </SelectTrigger>
// // // // //           <SelectContent className="bg-slate-900 border-slate-800 text-white">
// // // // //             <SelectItem value="Low">Low</SelectItem>
// // // // //             <SelectItem value="Medium">Medium</SelectItem>
// // // // //             <SelectItem value="High">High</SelectItem>
// // // // //           </SelectContent>
// // // // //         </Select>
// // // // //       </div>

// // // // //     </div>

// // // // //     <DialogFooter>
// // // // //       <Button
// // // // //         onClick={handleCreateTask}
// // // // //         className="bg-blue-600 hover:bg-blue-700 w-full"
// // // // //       >
// // // // //         Create Task
// // // // //       </Button>
// // // // //     </DialogFooter>
// // // // //   </DialogContent>
// // // // // </Dialog>

// // // // //       <TaskDrawer 
// // // // //         task={selectedTask}
// // // // //         availableStatus={activeSprint?.status || []}
// // // // //         boardMembers={board.allowedUsers || []}
// // // // //         onClose={() => setSelectedTask(null)}
// // // // //         onTaskUpdate={handleTaskUpdate}
// // // // //       />
// // // // //     </DashboardLayout>
// // // // //   );
// // // // // };

// // // // // export default BoardDetailPage;

























// // // // import { useEffect, useState, useMemo } from 'react';
// // // // import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
// // // // import { DashboardLayout } from '@/components/DashboardLayout';
// // // // import { Topbar } from '@/components/Topbar';
// // // // import { KanbanBoard } from '@/components/KanbanBoard';
// // // // import { TaskDrawer } from '@/components/TaskDrawer';
// // // // import api from '@/lib/api';
// // // // import type { Board, Epic, Sprint, Task, User } from '@/types';
// // // // import { cn } from '@/lib/utils';
// // // // import { 
// // // //   ChevronLeft, Target, Zap, Plus, MoreVertical, 
// // // //   Users, Edit2 
// // // // } from 'lucide-react';
// // // // import { Button } from '@/components/ui/button';
// // // // import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
// // // // import { Input } from '@/components/ui/input';
// // // // import { Label } from '@/components/ui/label';
// // // // import { Textarea } from '@/components/ui/textarea';
// // // // import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// // // // import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
// // // // import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// // // // const BoardDetailPage = () => {
// // // //   const { boardId } = useParams();
// // // //   const navigate = useNavigate();
// // // //   const [searchParams, setSearchParams] = useSearchParams();

// // // //   // URL State Management
// // // //   const selectedEpicId = searchParams.get('epic') ? parseInt(searchParams.get('epic')!) : null;
// // // //   const selectedSprintId = searchParams.get('sprint') ? parseInt(searchParams.get('sprint')!) : null;

// // // //   // Data State
// // // //   const [board, setBoard] = useState<Board | null>(null);
// // // //   const [epics, setEpics] = useState<Epic[]>([]);
// // // //   const [sprints, setSprints] = useState<Sprint[]>([]);
// // // //   const [tasks, setTasks] = useState<Task[]>([]);
  
// // // //   // UI & Dialog State
// // // //   const [selectedTask, setSelectedTask] = useState<Task | null>(null);
// // // //   const [dialogType, setDialogType] = useState<'epic' | 'sprint' | 'task' | 'members' | null>(null);
// // // //   const [isEditing, setIsEditing] = useState(false);
// // // //   const [editingId, setEditingId] = useState<number | null>(null);
  
// // // //   // Form States
// // // //   const [epicForm, setEpicForm] = useState({ title: '', description: '' });
// // // //   const [sprintForm, setSprintForm] = useState({ 
// // // //     title: '', description: '', startTime: '', expiry: '', 
// // // //     status: ["To Do", "In Progress", "Done"] 
// // // //   });
// // // //   const [taskForm, setTaskForm] = useState({
// // // //     title: '', description: '', assigneeId: '', storyPoints: 0, hours: 0, priority: 'Medium', status: ''
// // // //   });
// // // //   const [memberEmail, setMemberEmail] = useState('');

// // // //   // 1. Initial Fetch: Board and Epics
// // // //   useEffect(() => {
// // // //     const fetchInitialData = async () => {
// // // //       try {
// // // //         const [boardRes, epicsRes] = await Promise.all([
// // // //           api.get(`/api/boards/${boardId}`),
// // // //           api.get(`/api/boards/${boardId}/epics`)
// // // //         ]);
// // // //         if (boardRes.data.success) setBoard(boardRes.data.board);
// // // //         if (epicsRes.data.success) {
// // // //           setEpics(epicsRes.data.epics);
// // // //           if (!selectedEpicId && epicsRes.data.epics.length > 0) {
// // // //             setSearchParams({ epic: epicsRes.data.epics.id.toString() });
// // // //           }
// // // //         }
// // // //       } catch (error) { console.error(error); }
// // // //     };
// // // //     fetchInitialData();
// // // //   }, [boardId]);

// // // //   // 2. Fetch Sprints when Epic changes
// // // //   useEffect(() => {
// // // //     if (!selectedEpicId) return;
// // // //     api.get(`/api/epics/${selectedEpicId}/sprints`).then(res => {
// // // //       if (res.data.success) {
// // // //         setSprints(res.data.sprints);
// // // //         if (!selectedSprintId && res.data.sprints.length > 0) {
// // // //           setSearchParams({ epic: selectedEpicId.toString(), sprint: res.data.sprints.id.toString() });
// // // //         }
// // // //       }
// // // //     });
// // // //   }, [selectedEpicId]);

// // // //   // 3. Fetch Tasks when Sprint changes
// // // //   useEffect(() => {
// // // //     if (!selectedSprintId) {
// // // //       setTasks([]);
// // // //       return;
// // // //     }
// // // //     api.get(`/api/sprints/${selectedSprintId}/tasks`).then(res => {
// // // //       if (res.data.success) setTasks(res.data.tasks);
// // // //     });
// // // //   }, [selectedSprintId]);

// // // //   const activeSprint = useMemo(() => sprints.find(s => s.id === selectedSprintId), [sprints, selectedSprintId]);

// // // //   // Drag and Drop Logic
// // // //   const handleTaskMove = async (taskId: number, newStatus: string) => {
// // // //     const taskToMove = tasks.find(t => t.id === taskId);
// // // //     if (!taskToMove || taskToMove.status === newStatus) return;

// // // //     // Optimistic UI update
// // // //     const previousTasks = [...tasks];
// // // //     setTasks(prev => prev.map(t => t.id === taskId ? { ...t, status: newStatus } : t));

// // // //     try {
// // // //       // Body matches your Backend requirements: full task entries
// // // //       await api.put(`/api/tasks/${taskId}`, {
// // // //         title: taskToMove.title,
// // // //         description: taskToMove.description,
// // // //         assigneeId: taskToMove.assigneeId,
// // // //         storyPoints: taskToMove.storyPoints,
// // // //         hours: taskToMove.hours,
// // // //         priority: taskToMove.priority,
// // // //         status: newStatus
// // // //       });
// // // //     } catch (err) {
// // // //       console.error("Move failed:", err);
// // // //       setTasks(previousTasks); // Revert on failure
// // // //     }
// // // //   };

// // // //   const handleTaskUpdate = (updatedTask: Task) => {
// // // //     setTasks(prev => prev.map(t => t.id === updatedTask.id ? updatedTask : t));
// // // //     setSelectedTask(updatedTask);
// // // //   };

// // // //   const handleAddMember = async () => {
// // // //     try {
// // // //       const res = await api.post(`/api/boards/${boardId}/users`, { userId: memberEmail });
// // // //       if (res.data.success) {
// // // //         setBoard(prev => prev ? { ...prev, allowedUsers: [...(prev.allowedUsers || []), res.data.user] } : null);
// // // //         setMemberEmail('');
// // // //       }
// // // //     } catch (err) { console.error(err); }
// // // //   };

// // // //   const handleSaveEpic = async () => {
// // // //     const apiCall = isEditing ? api.put(`/api/epics/${editingId}`, epicForm) : api.post(`/api/boards/${boardId}/epics`, epicForm);
// // // //     const res = await apiCall;
// // // //     if (res.data.success) {
// // // //       setEpics(isEditing ? epics.map(e => e.id === editingId ? res.data.epic : e) : [...epics, res.data.epic]);
// // // //       setDialogType(null);
// // // //     }
// // // //   };

// // // //   const handleSaveSprint = async () => {
// // // //     if (!sprintForm.title.trim() || !sprintForm.description.trim()) return;
// // // //     const apiCall = isEditing ? api.put(`/api/sprints/${editingId}`, sprintForm) : api.post(`/api/epics/${selectedEpicId}/sprints`, sprintForm);
// // // //     const res = await apiCall;
// // // //     if (res.data.success) {
// // // //       setSprints(prev => isEditing ? prev.map(s => s.id === editingId ? res.data.sprint : s) : [...prev, res.data.sprint]);
// // // //       setDialogType(null);
// // // //     }
// // // //   };

// // // //   const handleCreateTask = async () => {
// // // //     const res = await api.post(`/api/sprints/${selectedSprintId}/tasks`, {
// // // //       ...taskForm,
// // // //       assigneeId: taskForm.assigneeId ? parseInt(taskForm.assigneeId) : null,
// // // //       storyPoints: Number(taskForm.storyPoints) || 0,
// // // //       hours: Number(taskForm.hours) || 0
// // // //     });
// // // //     if (res.data.success) {
// // // //       setTasks(prev => [...prev, res.data.task]);
// // // //       setDialogType(null);
// // // //     }
// // // //   };

// // // //   if (!board) return <div className="p-10 text-white">Loading Board...</div>;

// // // //   return (
// // // //     <DashboardLayout>
// // // //       <Topbar title={board.title} subtitle={board.description} createLabel="New Task" onCreateClick={() => setDialogType('task')}>
// // // //         <div className="flex items-center gap-2 mr-4">
// // // //           <Button variant="ghost" size="sm" onClick={() => setDialogType('members')} className="text-slate-400 hover:text-white">
// // // //             <Users className="w-4 h-4 mr-2" /> Members
// // // //           </Button>
// // // //           <button onClick={() => navigate('/')} className="p-1.5 rounded-md hover:bg-slate-800 text-slate-400 transition-colors">
// // // //             <ChevronLeft className="w-4 h-4" />
// // // //           </button>
// // // //         </div>
// // // //       </Topbar>

// // // //       {/* Epic Navigation */}
// // // //       <div className="flex items-center gap-2 px-4 py-3 bg-slate-950 border-b border-slate-800 overflow-x-auto scrollbar-none">
// // // //         <Target className="w-4 h-4 text-blue-500 mr-2 shrink-0" />
// // // //         {epics.map(epic => (
// // // //           <div key={epic.id} className="flex items-center group bg-slate-900 rounded-md shrink-0">
// // // //             <button
// // // //               onClick={() => setSearchParams({ epic: epic.id.toString() })}
// // // //               className={cn("px-3 py-1.5 text-sm rounded-l-md transition-all", selectedEpicId === epic.id ? "bg-blue-600 text-white" : "text-slate-400 hover:text-white")}
// // // //             >
// // // //               {epic.title}
// // // //             </button>
// // // //             <DropdownMenu>
// // // //               <DropdownMenuTrigger className="px-1.5 py-1.5 hover:bg-slate-800 rounded-r-md text-slate-500"><MoreVertical className="w-3 h-3" /></DropdownMenuTrigger>
// // // //               <DropdownMenuContent className="bg-slate-900 border-slate-800 text-white">
// // // //                 <DropdownMenuItem onClick={() => { setIsEditing(true); setEditingId(epic.id); setEpicForm({title: epic.title, description: epic.description || ''}); setDialogType('epic'); }}>Edit Epic</DropdownMenuItem>
// // // //               </DropdownMenuContent>
// // // //             </DropdownMenu>
// // // //           </div>
// // // //         ))}
// // // //         <Button variant="ghost" size="sm" onClick={() => { setIsEditing(false); setEpicForm({title: '', description: ''}); setDialogType('epic'); }} className="text-slate-500 shrink-0"><Plus className="w-3 h-3 mr-1"/> Epic</Button>
// // // //       </div>

// // // //       {/* Sprint Navigation */}
// // // //       <div className="flex items-center gap-2 px-4 py-2 bg-slate-900/50 border-b border-slate-800 overflow-x-auto scrollbar-none">
// // // //         <Zap className="w-4 h-4 text-purple-500 mr-2 shrink-0" />
// // // //         {sprints.map(sprint => (
// // // //           <div key={sprint.id} className="flex items-center group shrink-0">
// // // //             <button
// // // //               onClick={() => setSearchParams({ epic: selectedEpicId!.toString(), sprint: sprint.id.toString() })}
// // // //               className={cn("px-3 py-1 text-xs rounded-full border transition-all", selectedSprintId === sprint.id ? "border-purple-500 bg-purple-500/10 text-purple-400" : "border-slate-700 text-slate-500")}
// // // //             >
// // // //               {sprint.title}
// // // //             </button>
// // // //             {selectedSprintId === sprint.id && (
// // // //               <button onClick={() => { 
// // // //                 setIsEditing(true); setEditingId(sprint.id); 
// // // //                 setSprintForm({ title: sprint.title, description: sprint.description || '', startTime: sprint.startTime?.slice(0, 16), expiry: sprint.expiry?.slice(0, 16), status: sprint.status });
// // // //                 setDialogType('sprint');
// // // //               }} className="ml-1 p-1 text-slate-500 hover:text-white transition-colors"><Edit2 className="w-3 h-3" /></button>
// // // //             )}
// // // //           </div>
// // // //         ))}
// // // //         {selectedEpicId && <Button variant="ghost" size="sm" onClick={() => { setIsEditing(false); setSprintForm({title: '', description: '', startTime: '', expiry: '', status: ["To Do", "In Progress", "Done"]}); setDialogType('sprint'); }} className="h-7 text-[10px] text-slate-500 shrink-0"><Plus className="w-3 h-3 mr-1"/> Sprint</Button>}
// // // //       </div>

// // // //       {/* Kanban Board with Task Move Handler */}
// // // //       {activeSprint ? (
// // // //         <KanbanBoard 
// // // //           columns={activeSprint.status} 
// // // //           tasks={tasks} 
// // // //           onTaskClick={setSelectedTask} 
// // // //           onAddTask={(status) => { setTaskForm({ ...taskForm, status, title: '', description: '', assigneeId: '' }); setDialogType('task'); }} 
// // // //           onTaskMove={handleTaskMove}
// // // //         />
// // // //       ) : (
// // // //         <div className="flex-1 flex flex-col items-center justify-center text-slate-500"><p>Select or create an epic to view the board.</p></div>
// // // //       )}

// // // //       {/* Dialogs ... (Remained same as your current version but enabled) */}
// // // //       {/* Task Creation Dialog */}
// // // //       <Dialog open={dialogType === 'task'} onOpenChange={() => setDialogType(null)}>
// // // //         <DialogContent className="bg-slate-900 border-slate-800 text-white max-w-lg">
// // // //           <DialogHeader><DialogTitle>New Task in {taskForm.status}</DialogTitle></DialogHeader>
// // // //           <div className="grid grid-cols-2 gap-4 py-4">
// // // //             <div className="col-span-2 space-y-1"><Label>Title</Label><Input value={taskForm.title} onChange={e => setTaskForm({ ...taskForm, title: e.target.value })} className="bg-slate-800 border-slate-700"/></div>
// // // //             <div className="col-span-2 space-y-1"><Label>Description</Label><Textarea value={taskForm.description} onChange={e => setTaskForm({ ...taskForm, description: e.target.value })} className="bg-slate-800 border-slate-700"/></div>
// // // //             <div className="space-y-1"><Label>Assignee</Label>
// // // //               <Select value={taskForm.assigneeId} onValueChange={v => setTaskForm({ ...taskForm, assigneeId: v })}>
// // // //                 <SelectTrigger className="bg-slate-800 border-slate-700"><SelectValue placeholder="Select member" /></SelectTrigger>
// // // //                 <SelectContent className="bg-slate-900 border-slate-800 text-white">{board.allowedUsers?.map(u => (<SelectItem key={u.id} value={u.id.toString()}>{u.name}</SelectItem>))}</SelectContent>
// // // //               </Select>
// // // //             </div>
// // // //             <div className="space-y-1"><Label>Story Points</Label><Input type="number" value={taskForm.storyPoints} onChange={e => setTaskForm({ ...taskForm, storyPoints: parseInt(e.target.value) || 0 })} className="bg-slate-800 border-slate-700" /></div>
// // // //             <div className="space-y-1"><Label>Estimated Hours</Label><Input type="number" step="0.5" value={taskForm.hours} onChange={e => setTaskForm({ ...taskForm, hours: parseFloat(e.target.value) || 0 })} className="bg-slate-800 border-slate-700" /></div>
// // // //             <div className="space-y-1"><Label>Priority</Label>
// // // //               <Select value={taskForm.priority} onValueChange={v => setTaskForm({ ...taskForm, priority: v })}>
// // // //                 <SelectTrigger className="bg-slate-800 border-slate-700"><SelectValue /></SelectTrigger>
// // // //                 <SelectContent className="bg-slate-900 border-slate-800 text-white"><SelectItem value="Low">Low</SelectItem><SelectItem value="Medium">Medium</SelectItem><SelectItem value="High">High</SelectItem></SelectContent>
// // // //               </Select>
// // // //             </div>
// // // //           </div>
// // // //           <DialogFooter><Button onClick={handleCreateTask} className="bg-blue-600 hover:bg-blue-700 w-full">Create Task</Button></DialogFooter>
// // // //         </DialogContent>
// // // //       </Dialog>

// // // //       <TaskDrawer 
// // // //         task={selectedTask}
// // // //         availableStatus={activeSprint?.status || []}
// // // //         boardMembers={board.allowedUsers || []}
// // // //         onClose={() => setSelectedTask(null)}
// // // //         onTaskUpdate={handleTaskUpdate}
// // // //       />
// // // //     </DashboardLayout>
// // // //   );
// // // // };

// // // // export default BoardDetailPage;































// // // import { useEffect, useState, useMemo } from 'react';
// // // import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
// // // import { DashboardLayout } from '@/components/DashboardLayout';
// // // import { Topbar } from '@/components/Topbar';
// // // import { KanbanBoard } from '@/components/KanbanBoard';
// // // import { TaskDrawer } from '@/components/TaskDrawer';
// // // import api from '@/lib/api';
// // // import type { Board, Epic, Sprint, Task } from '@/types';
// // // import { cn } from '@/lib/utils';
// // // import { 
// // //   ChevronLeft, Target, Zap, Plus, MoreVertical, 
// // //   Users, Edit2 
// // // } from 'lucide-react';
// // // import { Button } from '@/components/ui/button';
// // // import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
// // // import { Input } from '@/components/ui/input';
// // // import { Label } from '@/components/ui/label';
// // // import { Textarea } from '@/components/ui/textarea';
// // // import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// // // import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
// // // import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// // // const BoardDetailPage = () => {
// // //   const { boardId } = useParams();
// // //   const navigate = useNavigate();
// // //   const [searchParams, setSearchParams] = useSearchParams();

// // //   const selectedEpicId = searchParams.get('epic') ? parseInt(searchParams.get('epic')!) : null;
// // //   const selectedSprintId = searchParams.get('sprint') ? parseInt(searchParams.get('sprint')!) : null;

// // //   const [board, setBoard] = useState<Board | null>(null);
// // //   const [epics, setEpics] = useState<Epic[]>([]);
// // //   const [sprints, setSprints] = useState<Sprint[]>([]);
// // //   const [tasks, setTasks] = useState<Task[]>([]);
  
// // //   const [selectedTask, setSelectedTask] = useState<Task | null>(null);
// // //   const [dialogType, setDialogType] = useState<'epic' | 'sprint' | 'task' | 'members' | null>(null);
// // //   const [isEditing, setIsEditing] = useState(false);
// // //   const [editingId, setEditingId] = useState<number | null>(null);
  
// // //   const [epicForm, setEpicForm] = useState({ title: '', description: '' });
// // //   const [sprintForm, setSprintForm] = useState({ 
// // //     title: '', description: '', startTime: '', expiry: '', 
// // //     status: ["To Do", "In Progress", "Done"] 
// // //   });

// // //   const [taskForm, setTaskForm] = useState({
// // //     title: '', description: '', assigneeId: '', storyPoints: 0, hours: 0, priority: 'Medium', status: ''
// // //   });
// // //   const [memberEmail, setMemberEmail] = useState('');

// // //   useEffect(() => {
// // //     const fetchInitialData = async () => {
// // //       try {
// // //         const [boardRes, epicsRes] = await Promise.all([
// // //           api.get(`/api/boards/${boardId}`),
// // //           api.get(`/api/boards/${boardId}/epics`)
// // //         ]);
// // //         if (boardRes.data.success) setBoard(boardRes.data.board);
// // //         if (epicsRes.data.success) {
// // //           setEpics(epicsRes.data.epics);
// // //           if (!selectedEpicId && epicsRes.data.epics.length > 0) {
// // //             setSearchParams({ epic: epicsRes.data.epics.id.toString() });
// // //           }
// // //         }
// // //       } catch (error) { console.error(error); }
// // //     };
// // //     fetchInitialData();
// // //   }, [boardId]);

// // //   useEffect(() => {
// // //     if (!selectedEpicId) return;
// // //     api.get(`/api/epics/${selectedEpicId}/sprints`).then(res => {
// // //       if (res.data.success) {
// // //         setSprints(res.data.sprints);
// // //         if (!selectedSprintId && res.data.sprints.length > 0) {
// // //           setSearchParams({ epic: selectedEpicId.toString(), sprint: res.data.sprints.id.toString() });
// // //         }
// // //       }
// // //     });
// // //   }, [selectedEpicId]);

// // //   useEffect(() => {
// // //     if (!selectedSprintId) {
// // //       setTasks([]);
// // //       return;
// // //     }
// // //     api.get(`/api/sprints/${selectedSprintId}/tasks`).then(res => {
// // //       if (res.data.success) setTasks(res.data.tasks);
// // //     });
// // //   }, [selectedSprintId]);

// // //   const activeSprint = useMemo(() => sprints.find(s => s.id === selectedSprintId), [sprints, selectedSprintId]);

// // //   const handleTaskMove = async (taskId: number, newStatus: string) => {
// // //     const taskToMove = tasks.find(t => t.id === taskId);
// // //     if (!taskToMove || taskToMove.status === newStatus) return;

// // //     const previousTasks = [...tasks];
// // //     setTasks(prev => prev.map(t => t.id === taskId ? { ...t, status: newStatus } : t));

// // //     try {
// // //       await api.put(`/api/tasks/${taskId}`, { ...taskToMove, status: newStatus });
// // //     } catch (err) {
// // //       console.error("Move failed:", err);
// // //       setTasks(previousTasks);
// // //     }
// // //   };

// // //   const handleTaskUpdate = (updatedTask: Task) => {
// // //     setTasks(prev => prev.map(t => t.id === updatedTask.id ? updatedTask : t));
// // //     setSelectedTask(updatedTask);
// // //   };

// // //   const handleSaveEpic = async () => {
// // //     const apiCall = isEditing ? api.put(`/api/epics/${editingId}`, epicForm) : api.post(`/api/boards/${boardId}/epics`, epicForm);
// // //     const res = await apiCall;
// // //     if (res.data.success) {
// // //       setEpics(prev => isEditing ? prev.map(e => e.id === editingId ? { ...e, ...epicForm } : e) : [...prev, res.data.epic]);
// // //       setDialogType(null);
// // //     }
// // //   };

// // //   const handleSaveSprint = async () => {
// // //     if (!sprintForm.title.trim() || !sprintForm.description.trim()) return;
// // //     const apiCall = isEditing ? api.put(`/api/sprints/${editingId}`, sprintForm) : api.post(`/api/epics/${selectedEpicId}/sprints`, sprintForm);
// // //     const res = await apiCall;
// // //     if (res.data.success) {
// // //       setSprints(prev => isEditing ? prev.map(s => s.id === editingId ? { ...s, ...sprintForm } : s) : [...prev, res.data.sprint]);
// // //       setDialogType(null);
// // //     }
// // //   };

// // //   const handleCreateTask = async () => {
// // //     try {
// // //       const res = await api.post(`/api/sprints/${selectedSprintId}/tasks`, {
// // //         ...taskForm,
// // //         assigneeId: taskForm.assigneeId ? parseInt(taskForm.assigneeId) : null,
// // //         storyPoints: Number(taskForm.storyPoints) || 0,
// // //         hours: Number(taskForm.hours) || 0
// // //       });

// // //       if (res.data.success) {
// // //         // Important: Use the full task object returned from server or fetch again
// // //         const newTaskRes = await api.get(`/api/tasks/${res.data.task.id}`);
// // //         if (newTaskRes.data.success) {
// // //           setTasks(prev => [...prev, newTaskRes.data.task]);
// // //         }
// // //         setDialogType(null);
// // //       }
// // //     } catch (err) { console.error(err); }
// // //   };

// // //   if (!board) return <div className="p-10 text-white">Loading Board...</div>;

// // //   return (
// // //     <DashboardLayout>
// // //       <Topbar title={board.title} subtitle={board.description} createLabel="New Task" onCreateClick={() => {
// // //         setTaskForm({ ...taskForm, status: activeSprint?.status || '', title: '', description: '', assigneeId: '' });
// // //         setDialogType('task');
// // //       }}>
// // //         <div className="flex items-center gap-2 mr-4">
// // //           <Button variant="ghost" size="sm" onClick={() => setDialogType('members')} className="text-slate-400 hover:text-white">
// // //             <Users className="w-4 h-4 mr-2" /> Members
// // //           </Button>
// // //           <button onClick={() => navigate('/')} className="p-1.5 rounded-md hover:bg-slate-800 text-slate-400 transition-colors">
// // //             <ChevronLeft className="w-4 h-4" />
// // //           </button>
// // //         </div>
// // //       </Topbar>

// // //       <div className="flex items-center gap-2 px-4 py-3 bg-slate-950 border-b border-slate-800 overflow-x-auto scrollbar-none">
// // //         <Target className="w-4 h-4 text-blue-500 mr-2 shrink-0" />
// // //         {epics.map(epic => (
// // //           <div key={epic.id} className="flex items-center group bg-slate-900 rounded-md shrink-0">
// // //             <button
// // //               onClick={() => setSearchParams({ epic: epic.id.toString() })}
// // //               className={cn("px-3 py-1.5 text-sm rounded-l-md transition-all", selectedEpicId === epic.id ? "bg-blue-600 text-white" : "text-slate-400 hover:text-white")}
// // //             >
// // //               {epic.title}
// // //             </button>
// // //             <DropdownMenu>
// // //               <DropdownMenuTrigger className="px-1.5 py-1.5 hover:bg-slate-800 rounded-r-md text-slate-500"><MoreVertical className="w-3 h-3" /></DropdownMenuTrigger>
// // //               <DropdownMenuContent className="bg-slate-900 border-slate-800 text-white">
// // //                 <DropdownMenuItem onClick={() => { setIsEditing(true); setEditingId(epic.id); setEpicForm({title: epic.title, description: epic.description || ''}); setDialogType('epic'); }}>Edit Epic</DropdownMenuItem>
// // //               </DropdownMenuContent>
// // //             </DropdownMenu>
// // //           </div>
// // //         ))}
// // //         <Button variant="ghost" size="sm" onClick={() => { setIsEditing(false); setEpicForm({title: '', description: ''}); setDialogType('epic'); }} className="text-slate-500 shrink-0"><Plus className="w-3 h-3 mr-1"/> Epic</Button>
// // //       </div>

// // //       <div className="flex items-center gap-2 px-4 py-2 bg-slate-900/50 border-b border-slate-800 overflow-x-auto scrollbar-none">
// // //         <Zap className="w-4 h-4 text-purple-500 mr-2 shrink-0" />
// // //         {sprints.map(sprint => (
// // //           <div key={sprint.id} className="flex items-center group shrink-0">
// // //             <button
// // //               onClick={() => setSearchParams({ epic: selectedEpicId!.toString(), sprint: sprint.id.toString() })}
// // //               className={cn("px-3 py-1 text-xs rounded-full border transition-all", selectedSprintId === sprint.id ? "border-purple-500 bg-purple-500/10 text-purple-400" : "border-slate-700 text-slate-500")}
// // //             >
// // //               {sprint.title}
// // //             </button>
// // //             {selectedSprintId === sprint.id && (
// // //               <button onClick={() => { 
// // //                 setIsEditing(true); setEditingId(sprint.id); 
// // //                 setSprintForm({ title: sprint.title, description: sprint.description || '', startTime: sprint.startTime?.slice(0, 16) || '', expiry: sprint.expiry?.slice(0, 16) || '', status: sprint.status });
// // //                 setDialogType('sprint');
// // //               }} className="ml-1 p-1 text-slate-500 hover:text-white transition-colors"><Edit2 className="w-3 h-3" /></button>
// // //             )}
// // //           </div>
// // //         ))}
// // //         {selectedEpicId && <Button variant="ghost" size="sm" onClick={() => { setIsEditing(false); setSprintForm({title: '', description: '', startTime: '', expiry: '', status: ["To Do", "In Progress", "Done"]}); setDialogType('sprint'); }} className="h-7 text-[10px] text-slate-500 shrink-0"><Plus className="w-3 h-3 mr-1"/> Sprint</Button>}
// // //       </div>

// // //       {activeSprint ? (
// // //         <KanbanBoard 
// // //           columns={activeSprint.status} 
// // //           tasks={tasks} 
// // //           onTaskClick={setSelectedTask} 
// // //           onAddTask={(status) => { 
// // //             setTaskForm({ ...taskForm, status, title: '', description: '', assigneeId: '' }); 
// // //             setDialogType('task'); 
// // //           }} 
// // //           onTaskMove={handleTaskMove}
// // //         />
// // //       ) : (
// // //         <div className="flex-1 flex flex-col items-center justify-center text-slate-500"><p>Select or create an epic to view the board.</p></div>
// // //       )}

// // //       {/* Task Creation Dialog */}
// // //       <Dialog open={dialogType === 'task'} onOpenChange={() => setDialogType(null)}>
// // //         <DialogContent className="bg-slate-900 border-slate-800 text-white max-w-lg">
// // //           <DialogHeader><DialogTitle>New Task in {taskForm.status}</DialogTitle></DialogHeader>
// // //           <div className="grid grid-cols-2 gap-4 py-4">
// // //             <div className="col-span-2 space-y-1"><Label>Title</Label><Input value={taskForm.title} onChange={e => setTaskForm({ ...taskForm, title: e.target.value })} className="bg-slate-800 border-slate-700"/></div>
// // //             <div className="col-span-2 space-y-1"><Label>Description</Label><Textarea value={taskForm.description} onChange={e => setTaskForm({ ...taskForm, description: e.target.value })} className="bg-slate-800 border-slate-700"/></div>
// // //             <div className="space-y-1"><Label>Assignee</Label>
// // //               <Select value={taskForm.assigneeId} onValueChange={v => setTaskForm({ ...taskForm, assigneeId: v })}>
// // //                 <SelectTrigger className="bg-slate-800 border-slate-700"><SelectValue placeholder="Select member" /></SelectTrigger>
// // //                 <SelectContent className="bg-slate-900 border-slate-800 text-white">{board.allowedUsers?.map(u => (<SelectItem key={u.id} value={u.id.toString()}>{u.name}</SelectItem>))}</SelectContent>
// // //               </Select>
// // //             </div>
// // //             <div className="space-y-1"><Label>Status</Label>
// // //               <Select value={taskForm.status} onValueChange={v => setTaskForm({ ...taskForm, status: v })}>
// // //                 <SelectTrigger className="bg-slate-800 border-slate-700"><SelectValue /></SelectTrigger>
// // //                 <SelectContent className="bg-slate-900 border-slate-800 text-white">{activeSprint?.status.map(s => (<SelectItem key={s} value={s}>{s}</SelectItem>))}</SelectContent>
// // //               </Select>
// // //             </div>
// // //             <div className="space-y-1"><Label>Story Points</Label><Input type="number" value={taskForm.storyPoints} onChange={e => setTaskForm({ ...taskForm, storyPoints: parseInt(e.target.value) || 0 })} className="bg-slate-800 border-slate-700" /></div>
// // //             <div className="space-y-1"><Label>Estimated Hours</Label><Input type="number" step="0.5" value={taskForm.hours} onChange={e => setTaskForm({ ...taskForm, hours: parseFloat(e.target.value) || 0 })} className="bg-slate-800 border-slate-700" /></div>
// // //             <div className="col-span-2 space-y-1"><Label>Priority</Label>
// // //               <Select value={taskForm.priority} onValueChange={v => setTaskForm({ ...taskForm, priority: v })}>
// // //                 <SelectTrigger className="bg-slate-800 border-slate-700"><SelectValue /></SelectTrigger>
// // //                 <SelectContent className="bg-slate-900 border-slate-800 text-white"><SelectItem value="Low">Low</SelectItem><SelectItem value="Medium">Medium</SelectItem><SelectItem value="High">High</SelectItem></SelectContent>
// // //               </Select>
// // //             </div>
// // //           </div>
// // //           <DialogFooter><Button onClick={handleCreateTask} className="bg-blue-600 hover:bg-blue-700 w-full">Create Task</Button></DialogFooter>
// // //         </DialogContent>
// // //       </Dialog>

// // //       {/* Epic Dialog */}
// // //       <Dialog open={dialogType === 'epic'} onOpenChange={() => setDialogType(null)}>
// // //         <DialogContent className="bg-slate-900 border-slate-800 text-white">
// // //           <DialogHeader><DialogTitle>{isEditing ? 'Edit Epic' : 'New Epic'}</DialogTitle></DialogHeader>
// // //           <div className="space-y-4 py-2">
// // //             <div className="space-y-1"><Label>Title</Label><Input value={epicForm.title} onChange={e => setEpicForm({...epicForm, title: e.target.value})} className="bg-slate-800 border-slate-700"/></div>
// // //             <div className="space-y-1"><Label>Description</Label><Textarea value={epicForm.description} onChange={e => setEpicForm({...epicForm, description: e.target.value})} className="bg-slate-800 border-slate-700"/></div>
// // //           </div>
// // //           <DialogFooter><Button onClick={handleSaveEpic} className="bg-blue-600 w-full">Save Epic</Button></DialogFooter>
// // //         </DialogContent>
// // //       </Dialog>

// // //       {/* Sprint Dialog */}
// // //       <Dialog open={dialogType === 'sprint'} onOpenChange={() => setDialogType(null)}>
// // //         <DialogContent className="bg-slate-900 border-slate-800 text-white max-w-md">
// // //           <DialogHeader><DialogTitle>{isEditing ? 'Edit Sprint' : 'New Sprint'}</DialogTitle></DialogHeader>
// // //           <div className="grid grid-cols-2 gap-4 py-2">
// // //             <div className="col-span-2 space-y-1"><Label>Title *</Label><Input value={sprintForm.title} onChange={e => setSprintForm({ ...sprintForm, title: e.target.value })} className="bg-slate-800 border-slate-700"/></div>
// // //             <div className="col-span-2 space-y-1"><Label>Description *</Label><Textarea value={sprintForm.description} onChange={e => setSprintForm({ ...sprintForm, description: e.target.value })} className="bg-slate-800 border-slate-700"/></div>
// // //             <div className="space-y-1"><Label>Start Date</Label><Input type="datetime-local" value={sprintForm.startTime} onChange={e => setSprintForm({ ...sprintForm, startTime: e.target.value })} className="bg-slate-800 border-slate-700 text-xs"/></div>
// // //             <div className="space-y-1"><Label>Expiry Date</Label><Input type="datetime-local" value={sprintForm.expiry} onChange={e => setSprintForm({ ...sprintForm, expiry: e.target.value })} className="bg-slate-800 border-slate-700 text-xs"/></div>
// // //             <div className="col-span-2 space-y-1"><Label>Status Columns (Comma separated)</Label><Input value={sprintForm.status.join(',')} onChange={e => setSprintForm({ ...sprintForm, status: e.target.value.split(',').map(s => s.trim()) })} className="bg-slate-800 border-slate-700"/></div>
// // //           </div>
// // //           <DialogFooter><Button onClick={handleSaveSprint} className="bg-purple-600 w-full" disabled={!sprintForm.title.trim() || !sprintForm.description.trim()}>Save Sprint</Button></DialogFooter>
// // //         </DialogContent>
// // //       </Dialog>

// // //       <TaskDrawer 
// // //         task={selectedTask}
// // //         availableStatus={activeSprint?.status || []}
// // //         boardMembers={board.allowedUsers || []}
// // //         onClose={() => setSelectedTask(null)}
// // //         onTaskUpdate={handleTaskUpdate}
// // //       />
// // //     </DashboardLayout>
// // //   );
// // // };

// // // export default BoardDetailPage;









// // // import { useEffect, useState, useMemo } from 'react';
// // // import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
// // // import { DashboardLayout } from '@/components/DashboardLayout';
// // // import { Topbar } from '@/components/Topbar';
// // // import { KanbanBoard } from '@/components/KanbanBoard';
// // // import { TaskDrawer } from '@/components/TaskDrawer';
// // // import api from '@/lib/api';
// // // import type { Board, Epic, Sprint, Task, User } from '@/types';
// // // import { cn } from '@/lib/utils';
// // // import { 
// // //   ChevronLeft, Target, Zap, Plus, MoreVertical, 
// // //   Users, Edit2, Search, Check
// // // } from 'lucide-react';
// // // import { Button } from '@/components/ui/button';
// // // import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
// // // import { Input } from '@/components/ui/input';
// // // import { Label } from '@/components/ui/label';
// // // import { Textarea } from '@/components/ui/textarea';
// // // import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// // // import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
// // // import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// // // const BoardDetailPage = () => {
// // //   const { boardId } = useParams();
// // //   const navigate = useNavigate();
// // //   const [searchParams, setSearchParams] = useSearchParams();

// // //   const selectedEpicId = searchParams.get('epic') ? parseInt(searchParams.get('epic')!) : null;
// // //   const selectedSprintId = searchParams.get('sprint') ? parseInt(searchParams.get('sprint')!) : null;

// // //   const [board, setBoard] = useState<Board | null>(null);
// // //   const [epics, setEpics] = useState<Epic[]>([]);
// // //   const [sprints, setSprints] = useState<Sprint[]>([]);
// // //   const [tasks, setTasks] = useState<Task[]>([]);
  
// // //   const [selectedTask, setSelectedTask] = useState<Task | null>(null);
// // //   const [dialogType, setDialogType] = useState<'epic' | 'sprint' | 'task' | 'members' | null>(null);
// // //   const [isEditing, setIsEditing] = useState(false);
// // //   const [editingId, setEditingId] = useState<number | null>(null);
  
// // //   const [epicForm, setEpicForm] = useState({ title: '', description: '' });
// // //   const [sprintForm, setSprintForm] = useState({ 
// // //     title: '', description: '', startTime: '', expiry: '', 
// // //     status: ["To Do", "In Progress", "Done"] 
// // //   });

// // //   const [taskForm, setTaskForm] = useState({
// // //     title: '', description: '', assigneeId: '', storyPoints: 0, hours: 0, priority: 'Medium', status: ''
// // //   });

// // //   // Member Search State
// // //   const [memberSearchQuery, setMemberSearchQuery] = useState('');
// // //   const [memberSearchResults, setMemberSearchResults] = useState<User[]>([]);
// // //   const [isSearchingMembers, setIsSearchingMembers] = useState(false);

// // //   useEffect(() => {
// // //     const fetchInitialData = async () => {
// // //       try {
// // //         const [boardRes, epicsRes] = await Promise.all([
// // //           api.get(`/api/boards/${boardId}`),
// // //           api.get(`/api/boards/${boardId}/epics`)
// // //         ]);
// // //         if (boardRes.data.success) setBoard(boardRes.data.board);
// // //         if (epicsRes.data.success) {
// // //           setEpics(epicsRes.data.epics);
// // //           if (!selectedEpicId && epicsRes.data.epics.length > 0) {
// // //             setSearchParams({ epic: epicsRes.data.epics.id.toString() });
// // //           }
// // //         }
// // //       } catch (error) { console.error(error); }
// // //     };
// // //     fetchInitialData();
// // //   }, [boardId]);

// // //   useEffect(() => {
// // //     if (!selectedEpicId) return;
// // //     api.get(`/api/epics/${selectedEpicId}/sprints`).then(res => {
// // //       if (res.data.success) {
// // //         setSprints(res.data.sprints);
// // //         if (!selectedSprintId && res.data.sprints.length > 0) {
// // //           setSearchParams({ epic: selectedEpicId.toString(), sprint: res.data.sprints.id.toString() });
// // //         }
// // //       }
// // //     });
// // //   }, [selectedEpicId]);

// // //   useEffect(() => {
// // //     if (!selectedSprintId) {
// // //       setTasks([]);
// // //       return;
// // //     }
// // //     api.get(`/api/sprints/${selectedSprintId}/tasks`).then(res => {
// // //       if (res.data.success) setTasks(res.data.tasks);
// // //     });
// // //   }, [selectedSprintId]);

// // //   const activeSprint = useMemo(() => sprints.find(s => s.id === selectedSprintId), [sprints, selectedSprintId]);

// // //   const handleTaskMove = async (taskId: number, newStatus: string) => {
// // //     const taskToMove = tasks.find(t => t.id === taskId);
// // //     if (!taskToMove || taskToMove.status === newStatus) return;

// // //     const previousTasks = [...tasks];
// // //     setTasks(prev => prev.map(t => t.id === taskId ? { ...t, status: newStatus } : t));

// // //     try {
// // //       await api.put(`/api/tasks/${taskId}`, { ...taskToMove, status: newStatus });
// // //     } catch (err) {
// // //       console.error("Move failed:", err);
// // //       setTasks(previousTasks);
// // //     }
// // //   };

// // //   const handleTaskUpdate = (updatedTask: Task) => {
// // //     setTasks(prev => prev.map(t => t.id === updatedTask.id ? updatedTask : t));
// // //     setSelectedTask(updatedTask);
// // //   };

// // //   const handleSaveEpic = async () => {
// // //     const apiCall = isEditing ? api.put(`/api/epics/${editingId}`, epicForm) : api.post(`/api/boards/${boardId}/epics`, epicForm);
// // //     const res = await apiCall;
// // //     if (res.data.success) {
// // //       setEpics(prev => isEditing ? prev.map(e => e.id === editingId ? { ...e, ...epicForm } : e) : [...prev, res.data.epic]);
// // //       setDialogType(null);
// // //     }
// // //   };

// // //   const handleSaveSprint = async () => {
// // //     if (!sprintForm.title.trim() || !sprintForm.description.trim()) return;
// // //     const apiCall = isEditing ? api.put(`/api/sprints/${editingId}`, sprintForm) : api.post(`/api/epics/${selectedEpicId}/sprints`, sprintForm);
// // //     const res = await apiCall;
// // //     if (res.data.success) {
// // //       setSprints(prev => isEditing ? prev.map(s => s.id === editingId ? { ...s, ...sprintForm } : s) : [...prev, res.data.sprint]);
// // //       setDialogType(null);
// // //     }
// // //   };

// // //   const handleCreateTask = async () => {
// // //     try {
// // //       const res = await api.post(`/api/sprints/${selectedSprintId}/tasks`, {
// // //         ...taskForm,
// // //         assigneeId: taskForm.assigneeId ? parseInt(taskForm.assigneeId) : null,
// // //         storyPoints: Number(taskForm.storyPoints) || 0,
// // //         hours: Number(taskForm.hours) || 0
// // //       });

// // //       if (res.data.success) {
// // //         const newTaskRes = await api.get(`/api/tasks/${res.data.task.id}`);
// // //         if (newTaskRes.data.success) {
// // //           setTasks(prev => [...prev, newTaskRes.data.task]);
// // //         }
// // //         setDialogType(null);
// // //       }
// // //     } catch (err) { console.error(err); }
// // //   };

// // //   // Member Search Logic
// // //   useEffect(() => {
// // //     if (memberSearchQuery.length < 3) {
// // //       setMemberSearchResults([]);
// // //       return;
// // //     }

// // //     const searchUsers = async () => {
// // //       setIsSearchingMembers(true);
// // //       try {
// // //         const res = await api.get(`/dev/search/user?q=${memberSearchQuery}`);
// // //         // DB call returns simple array
// // //         setMemberSearchResults(res.data); 
// // //       } catch (err) {
// // //         console.error("User search failed:", err);
// // //       } finally {
// // //         setIsSearchingMembers(false);
// // //       }
// // //     };

// // //     const timeoutId = setTimeout(searchUsers, 300);
// // //     return () => clearTimeout(timeoutId);
// // //   }, [memberSearchQuery]);

// // //   const handleAddMemberToBoard = async (userId: number) => {
// // //     try {
// // //       // API expects userId in body
// // //       const res = await api.post(`/api/boards/${boardId}/users`, { userId });
// // //       if (res.data.success) {
// // //         // Refresh board to show new member list
// // //         const boardRes = await api.get(`/api/boards/${boardId}`);
// // //         if (boardRes.data.success) setBoard(boardRes.data.board);
// // //         setMemberSearchQuery('');
// // //         setMemberSearchResults([]);
// // //       }
// // //     } catch (err) {
// // //       console.error("Failed to add member:", err);
// // //     }
// // //   };

// // //   if (!board) return <div className="p-10 text-white">Loading Board...</div>;

// // //   return (
// // //     <DashboardLayout>
// // //       <Topbar title={board.title} subtitle={board.description} createLabel="New Task" onCreateClick={() => {
// // //         setTaskForm({ ...taskForm, status: activeSprint?.status || '', title: '', description: '', assigneeId: '' });
// // //         setDialogType('task');
// // //       }}>
// // //         <div className="flex items-center gap-2 mr-4">
// // //           <Button variant="ghost" size="sm" onClick={() => setDialogType('members')} className="text-slate-400 hover:text-white">
// // //             <Users className="w-4 h-4 mr-2" /> Members
// // //           </Button>
// // //           <button onClick={() => navigate('/')} className="p-1.5 rounded-md hover:bg-slate-800 text-slate-400 transition-colors">
// // //             <ChevronLeft className="w-4 h-4" />
// // //           </button>
// // //         </div>
// // //       </Topbar>

// // //       <div className="flex items-center gap-2 px-4 py-3 bg-slate-950 border-b border-slate-800 overflow-x-auto scrollbar-none">
// // //         <Target className="w-4 h-4 text-blue-500 mr-2 shrink-0" />
// // //         {epics.map(epic => (
// // //           <div key={epic.id} className="flex items-center group bg-slate-900 rounded-md shrink-0">
// // //             <button
// // //               onClick={() => setSearchParams({ epic: epic.id.toString() })}
// // //               className={cn("px-3 py-1.5 text-sm rounded-l-md transition-all", selectedEpicId === epic.id ? "bg-blue-600 text-white" : "text-slate-400 hover:text-white")}
// // //             >
// // //               {epic.title}
// // //             </button>
// // //             <DropdownMenu>
// // //               <DropdownMenuTrigger className="px-1.5 py-1.5 hover:bg-slate-800 rounded-r-md text-slate-500"><MoreVertical className="w-3 h-3" /></DropdownMenuTrigger>
// // //               <DropdownMenuContent className="bg-slate-900 border-slate-800 text-white">
// // //                 <DropdownMenuItem onClick={() => { setIsEditing(true); setEditingId(epic.id); setEpicForm({title: epic.title, description: epic.description || ''}); setDialogType('epic'); }}>Edit Epic</DropdownMenuItem>
// // //               </DropdownMenuContent>
// // //             </DropdownMenu>
// // //           </div>
// // //         ))}
// // //         <Button variant="ghost" size="sm" onClick={() => { setIsEditing(false); setEpicForm({title: '', description: ''}); setDialogType('epic'); }} className="text-slate-500 shrink-0"><Plus className="w-3 h-3 mr-1"/> Epic</Button>
// // //       </div>

// // //       <div className="flex items-center gap-2 px-4 py-2 bg-slate-900/50 border-b border-slate-800 overflow-x-auto scrollbar-none">
// // //         <Zap className="w-4 h-4 text-purple-500 mr-2 shrink-0" />
// // //         {sprints.map(sprint => (
// // //           <div key={sprint.id} className="flex items-center group shrink-0">
// // //             <button
// // //               onClick={() => setSearchParams({ epic: selectedEpicId!.toString(), sprint: sprint.id.toString() })}
// // //               className={cn("px-3 py-1 text-xs rounded-full border transition-all", selectedSprintId === sprint.id ? "border-purple-500 bg-purple-500/10 text-purple-400" : "border-slate-700 text-slate-500")}
// // //             >
// // //               {sprint.title}
// // //             </button>
// // //             {selectedSprintId === sprint.id && (
// // //               <button onClick={() => { 
// // //                 setIsEditing(true); setEditingId(sprint.id); 
// // //                 setSprintForm({ title: sprint.title, description: sprint.description || '', startTime: sprint.startTime?.slice(0, 16) || '', expiry: sprint.expiry?.slice(0, 16) || '', status: sprint.status });
// // //                 setDialogType('sprint');
// // //               }} className="ml-1 p-1 text-slate-500 hover:text-white transition-colors"><Edit2 className="w-3 h-3" /></button>
// // //             )}
// // //           </div>
// // //         ))}
// // //         {selectedEpicId && <Button variant="ghost" size="sm" onClick={() => { setIsEditing(false); setSprintForm({title: '', description: '', startTime: '', expiry: '', status: ["To Do", "In Progress", "Done"]}); setDialogType('sprint'); }} className="h-7 text-[10px] text-slate-500 shrink-0"><Plus className="w-3 h-3 mr-1"/> Sprint</Button>}
// // //       </div>

// // //       {activeSprint ? (
// // //         <KanbanBoard 
// // //           columns={activeSprint.status} 
// // //           tasks={tasks} 
// // //           onTaskClick={setSelectedTask} 
// // //           onAddTask={(status) => { 
// // //             setTaskForm({ ...taskForm, status, title: '', description: '', assigneeId: '' }); 
// // //             setDialogType('task'); 
// // //           }} 
// // //           onTaskMove={handleTaskMove}
// // //         />
// // //       ) : (
// // //         <div className="flex-1 flex flex-col items-center justify-center text-slate-500"><p>Select or create an epic to view the board.</p></div>
// // //       )}

// // //       {/* Task Creation Dialog */}
// // //       <Dialog open={dialogType === 'task'} onOpenChange={() => setDialogType(null)}>
// // //         <DialogContent className="bg-slate-900 border-slate-800 text-white max-w-lg">
// // //           <DialogHeader><DialogTitle>New Task in {taskForm.status}</DialogTitle></DialogHeader>
// // //           <div className="grid grid-cols-2 gap-4 py-4">
// // //             <div className="col-span-2 space-y-1"><Label>Title</Label><Input value={taskForm.title} onChange={e => setTaskForm({ ...taskForm, title: e.target.value })} className="bg-slate-800 border-slate-700"/></div>
// // //             <div className="col-span-2 space-y-1"><Label>Description</Label><Textarea value={taskForm.description} onChange={e => setTaskForm({ ...taskForm, description: e.target.value })} className="bg-slate-800 border-slate-700"/></div>
// // //             <div className="space-y-1"><Label>Assignee</Label>
// // //               <Select value={taskForm.assigneeId} onValueChange={v => setTaskForm({ ...taskForm, assigneeId: v })}>
// // //                 <SelectTrigger className="bg-slate-800 border-slate-700"><SelectValue placeholder="Select member" /></SelectTrigger>
// // //                 <SelectContent className="bg-slate-900 border-slate-800 text-white">{board.allowedUsers?.map(u => (<SelectItem key={u.id} value={u.id.toString()}>{u.name}</SelectItem>))}</SelectContent>
// // //               </Select>
// // //             </div>
// // //             <div className="space-y-1"><Label>Status</Label>
// // //               <Select value={taskForm.status} onValueChange={v => setTaskForm({ ...taskForm, status: v })}>
// // //                 <SelectTrigger className="bg-slate-800 border-slate-700"><SelectValue /></SelectTrigger>
// // //                 <SelectContent className="bg-slate-900 border-slate-800 text-white">{activeSprint?.status.map(s => (<SelectItem key={s} value={s}>{s}</SelectItem>))}</SelectContent>
// // //               </Select>
// // //             </div>
// // //             <div className="space-y-1"><Label>Story Points</Label><Input type="number" value={taskForm.storyPoints} onChange={e => setTaskForm({ ...taskForm, storyPoints: parseInt(e.target.value) || 0 })} className="bg-slate-800 border-slate-700" /></div>
// // //             <div className="space-y-1"><Label>Estimated Hours</Label><Input type="number" step="0.5" value={taskForm.hours} onChange={e => setTaskForm({ ...taskForm, hours: parseFloat(e.target.value) || 0 })} className="bg-slate-800 border-slate-700" /></div>
// // //             <div className="col-span-2 space-y-1"><Label>Priority</Label>
// // //               <Select value={taskForm.priority} onValueChange={v => setTaskForm({ ...taskForm, priority: v })}>
// // //                 <SelectTrigger className="bg-slate-800 border-slate-700"><SelectValue /></SelectTrigger>
// // //                 <SelectContent className="bg-slate-900 border-slate-800 text-white"><SelectItem value="Low">Low</SelectItem><SelectItem value="Medium">Medium</SelectItem><SelectItem value="High">High</SelectItem></SelectContent>
// // //               </Select>
// // //             </div>
// // //           </div>
// // //           <DialogFooter><Button onClick={handleCreateTask} className="bg-blue-600 hover:bg-blue-700 w-full">Create Task</Button></DialogFooter>
// // //         </DialogContent>
// // //       </Dialog>

// // //       {/* Epic Dialog */}
// // //       <Dialog open={dialogType === 'epic'} onOpenChange={() => setDialogType(null)}>
// // //         <DialogContent className="bg-slate-900 border-slate-800 text-white">
// // //           <DialogHeader><DialogTitle>{isEditing ? 'Edit Epic' : 'New Epic'}</DialogTitle></DialogHeader>
// // //           <div className="space-y-4 py-2">
// // //             <div className="space-y-1"><Label>Title</Label><Input value={epicForm.title} onChange={e => setEpicForm({...epicForm, title: e.target.value})} className="bg-slate-800 border-slate-700"/></div>
// // //             <div className="space-y-1"><Label>Description</Label><Textarea value={epicForm.description} onChange={e => setEpicForm({...epicForm, description: e.target.value})} className="bg-slate-800 border-slate-700"/></div>
// // //           </div>
// // //           <DialogFooter><Button onClick={handleSaveEpic} className="bg-blue-600 w-full">Save Epic</Button></DialogFooter>
// // //         </DialogContent>
// // //       </Dialog>

// // //       {/* Sprint Dialog */}
// // //       <Dialog open={dialogType === 'sprint'} onOpenChange={() => setDialogType(null)}>
// // //         <DialogContent className="bg-slate-900 border-slate-800 text-white max-w-md">
// // //           <DialogHeader><DialogTitle>{isEditing ? 'Edit Sprint' : 'New Sprint'}</DialogTitle></DialogHeader>
// // //           <div className="grid grid-cols-2 gap-4 py-2">
// // //             <div className="col-span-2 space-y-1"><Label>Title *</Label><Input value={sprintForm.title} onChange={e => setSprintForm({ ...sprintForm, title: e.target.value })} className="bg-slate-800 border-slate-700"/></div>
// // //             <div className="col-span-2 space-y-1"><Label>Description *</Label><Textarea value={sprintForm.description} onChange={e => setSprintForm({ ...sprintForm, description: e.target.value })} className="bg-slate-800 border-slate-700"/></div>
// // //             <div className="space-y-1"><Label>Start Date</Label><Input type="datetime-local" value={sprintForm.startTime} onChange={e => setSprintForm({ ...sprintForm, startTime: e.target.value })} className="bg-slate-800 border-slate-700 text-xs"/></div>
// // //             <div className="space-y-1"><Label>Expiry Date</Label><Input type="datetime-local" value={sprintForm.expiry} onChange={e => setSprintForm({ ...sprintForm, expiry: e.target.value })} className="bg-slate-800 border-slate-700 text-xs"/></div>
// // //             <div className="col-span-2 space-y-1"><Label>Status Columns (Comma separated)</Label><Input value={sprintForm.status.join(',')} onChange={e => setSprintForm({ ...sprintForm, status: e.target.value.split(',').map(s => s.trim()) })} className="bg-slate-800 border-slate-700"/></div>
// // //           </div>
// // //           <DialogFooter><Button onClick={handleSaveSprint} className="bg-purple-600 w-full" disabled={!sprintForm.title.trim() || !sprintForm.description.trim()}>Save Sprint</Button></DialogFooter>
// // //         </DialogContent>
// // //       </Dialog>

// // //       {/* Members Dialog with Integrated Search */}
// // //       <Dialog open={dialogType === 'members'} onOpenChange={() => {
// // //         setDialogType(null);
// // //         setMemberSearchQuery('');
// // //         setMemberSearchResults([]);
// // //       }}>
// // //         <DialogContent className="bg-slate-900 border-slate-800 text-white sm:max-w-[450px]">
// // //           <DialogHeader>
// // //             <DialogTitle>Manage Board Members</DialogTitle>
// // //           </DialogHeader>
          
// // //           <div className="space-y-6 py-4">
// // //             {/* Search Input Section */}
// // //             <div className="space-y-2">
// // //               <Label>Search Users</Label>
// // //               <div className="relative">
// // //                 <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-500" />
// // //                 <Input 
// // //                   placeholder="Enter name or email..." 
// // //                   value={memberSearchQuery} 
// // //                   onChange={e => setMemberSearchQuery(e.target.value)} 
// // //                   className="pl-9 bg-slate-800 border-slate-700"
// // //                 />
// // //               </div>
              
// // //               {/* Search Results Dropdown */}
// // //               {memberSearchResults.length > 0 && (
// // //                 <div className="mt-2 border border-slate-700 rounded-md bg-slate-800 max-h-48 overflow-y-auto shadow-xl">
// // //                   {memberSearchResults.map(user => {
// // //                     const isAlreadyMember = board.allowedUsers?.some(u => u.id === user.id);
// // //                     return (
// // //                       <div 
// // //                         key={user.id} 
// // //                         className="flex items-center justify-between p-3 border-b border-slate-700 last:border-0 hover:bg-slate-700 transition-colors"
// // //                       >
// // //                         <div className="flex items-center gap-3">
// // //                           <Avatar className="h-8 w-8">
// // //                             <AvatarImage src={user.picture} />
// // //                             <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
// // //                           </Avatar>
// // //                           <div className="flex flex-col">
// // //                             <span className="text-sm font-medium">{user.name}</span>
// // //                             <span className="text-xs text-slate-400">{user.email}</span>
// // //                           </div>
// // //                         </div>
// // //                         {isAlreadyMember ? (
// // //                           <div className="text-blue-500 bg-blue-500/10 p-1 rounded">
// // //                             <Check className="h-4 w-4" />
// // //                           </div>
// // //                         ) : (
// // //                           <Button 
// // //                             size="sm" 
// // //                             className="h-7 text-xs bg-blue-600 hover:bg-blue-700"
// // //                             onClick={() => handleAddMemberToBoard(user.id)}
// // //                           >
// // //                             Add
// // //                           </Button>
// // //                         )}
// // //                       </div>
// // //                     );
// // //                   })}
// // //                 </div>
// // //               )}
// // //               {memberSearchQuery.length >= 3 && memberSearchResults.length === 0 && !isSearchingMembers && (
// // //                 <p className="text-xs text-slate-500 mt-2">No users found matching "{memberSearchQuery}"</p>
// // //               )}
// // //               {isSearchingMembers && (
// // //                 <p className="text-xs text-slate-500 mt-2 animate-pulse">Searching...</p>
// // //               )}
// // //             </div>

// // //             {/* Current Members List */}
// // //             <div className="space-y-3">
// // //               <Label className="text-slate-500">Current Members ({board.allowedUsers?.length || 0})</Label>
// // //               <div className="space-y-2 max-h-48 overflow-y-auto pr-2 scrollbar-thin">
// // //                 {board.allowedUsers?.map(user => (
// // //                   <div key={user.id} className="flex items-center gap-3 p-2 rounded-lg bg-slate-800/50 border border-slate-700/50">
// // //                     <Avatar className="h-8 w-8">
// // //                       <AvatarImage src={user.picture}/>
// // //                       <AvatarFallback>{user.name?.charAt(0)}</AvatarFallback>
// // //                     </Avatar>
// // //                     <div className="flex-1 min-w-0">
// // //                       <p className="text-sm font-medium truncate">{user.name}</p>
// // //                       <p className="text-xs text-slate-500 truncate">{user.email}</p>
// // //                     </div>
// // //                   </div>
// // //                 ))}
// // //               </div>
// // //             </div>
// // //           </div>
// // //         </DialogContent>
// // //       </Dialog>

// // //       <TaskDrawer 
// // //         task={selectedTask}
// // //         availableStatus={activeSprint?.status || []}
// // //         boardMembers={board.allowedUsers || []}
// // //         onClose={() => setSelectedTask(null)}
// // //         onTaskUpdate={handleTaskUpdate}
// // //       />
// // //     </DashboardLayout>
// // //   );
// // // };

// // // export default BoardDetailPage;









// // import { useEffect, useState, useMemo } from 'react';
// // import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
// // import { DashboardLayout } from '@/components/DashboardLayout';
// // import { Topbar } from '@/components/Topbar';
// // import { KanbanBoard } from '@/components/KanbanBoard';
// // import { TaskDrawer } from '@/components/TaskDrawer';
// // import api from '@/lib/api';
// // import type { Board, Epic, Sprint, Task, User } from '@/types';
// // import { cn } from '@/lib/utils';
// // import { 
// //   ChevronLeft, Target, Zap, Plus, MoreVertical, 
// //   Users, Edit2, Search, Check, Filter
// // } from 'lucide-react';
// // import { Button } from '@/components/ui/button';
// // import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
// // import { Input } from '@/components/ui/input';
// // import { Label } from '@/components/ui/label';
// // import { Textarea } from '@/components/ui/textarea';
// // import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// // import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
// // import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// // const BoardDetailPage = () => {
// //   const { boardId } = useParams();
// //   const navigate = useNavigate();
// //   const [searchParams, setSearchParams] = useSearchParams();

// //   const selectedEpicId = searchParams.get('epic') ? parseInt(searchParams.get('epic')!) : null;
// //   const selectedSprintId = searchParams.get('sprint') ? parseInt(searchParams.get('sprint')!) : null;

// //   const [board, setBoard] = useState<Board | null>(null);
// //   const [epics, setEpics] = useState<Epic[]>([]);
// //   const [sprints, setSprints] = useState<Sprint[]>([]);
// //   const [tasks, setTasks] = useState<Task[]>([]);
  
// //   // Filtering State
// //   const [filterUserId, setFilterUserId] = useState<number | null>(null);

// //   const [selectedTask, setSelectedTask] = useState<Task | null>(null);
// //   const [dialogType, setDialogType] = useState<'epic' | 'sprint' | 'task' | 'members' | null>(null);
// //   const [isEditing, setIsEditing] = useState(false);
// //   const [editingId, setEditingId] = useState<number | null>(null);
  
// //   const [epicForm, setEpicForm] = useState({ title: '', description: '' });
// //   const [sprintForm, setSprintForm] = useState({ 
// //     title: '', description: '', startTime: '', expiry: '', 
// //     status: ["To Do", "In Progress", "Done"] 
// //   });

// //   const [taskForm, setTaskForm] = useState({
// //     title: '', description: '', assigneeId: '', storyPoints: 0, hours: 0, priority: 'Medium', status: ''
// //   });

// //   const [memberSearchQuery, setMemberSearchQuery] = useState('');
// //   const [memberSearchResults, setMemberSearchResults] = useState<User[]>([]);
// //   const [isSearchingMembers, setIsSearchingMembers] = useState(false);

// //   useEffect(() => {
// //     const fetchInitialData = async () => {
// //       try {
// //         const [boardRes, epicsRes] = await Promise.all([
// //           api.get(`/api/boards/${boardId}`),
// //           api.get(`/api/boards/${boardId}/epics`)
// //         ]);
// //         if (boardRes.data.success) setBoard(boardRes.data.board);
// //         if (epicsRes.data.success) {
// //           setEpics(epicsRes.data.epics);
// //           if (!selectedEpicId && epicsRes.data.epics.length > 0) {
// //             setSearchParams({ epic: epicsRes.data.epics.id.toString() });
// //           }
// //         }
// //       } catch (error) { console.error(error); }
// //     };
// //     fetchInitialData();
// //   }, [boardId]);

// //   useEffect(() => {
// //     if (!selectedEpicId) return;
// //     api.get(`/api/epics/${selectedEpicId}/sprints`).then(res => {
// //       if (res.data.success) {
// //         setSprints(res.data.sprints);
// //         if (!selectedSprintId && res.data.sprints.length > 0) {
// //           setSearchParams({ epic: selectedEpicId.toString(), sprint: res.data.sprints.id.toString() });
// //         }
// //       }
// //     });
// //   }, [selectedEpicId]);

// //   useEffect(() => {
// //     if (!selectedSprintId) {
// //       setTasks([]);
// //       return;
// //     }
// //     api.get(`/api/sprints/${selectedSprintId}/tasks`).then(res => {
// //       if (res.data.success) setTasks(res.data.tasks);
// //     });
// //   }, [selectedSprintId]);

// //   const activeSprint = useMemo(() => sprints.find(s => s.id === selectedSprintId), [sprints, selectedSprintId]);

// //   // Derived filtered tasks
// //   const filteredTasks = useMemo(() => {
// //     if (!filterUserId) return tasks;
// //     return tasks.filter(t => t.assigneeId === filterUserId);
// //   }, [tasks, filterUserId]);

// //   const handleTaskMove = async (taskId: number, newStatus: string) => {
// //     const taskToMove = tasks.find(t => t.id === taskId);
// //     if (!taskToMove || taskToMove.status === newStatus) return;

// //     const previousTasks = [...tasks];
// //     setTasks(prev => prev.map(t => t.id === taskId ? { ...t, status: newStatus } : t));

// //     try {
// //       await api.put(`/api/tasks/${taskId}`, { ...taskToMove, status: newStatus });
// //     } catch (err) {
// //       console.error("Move failed:", err);
// //       setTasks(previousTasks);
// //     }
// //   };

// //   const handleTaskUpdate = (updatedTask: Task) => {
// //     setTasks(prev => prev.map(t => t.id === updatedTask.id ? updatedTask : t));
// //     setSelectedTask(updatedTask);
// //   };

// //   const handleSaveEpic = async () => {
// //     const apiCall = isEditing ? api.put(`/api/epics/${editingId}`, epicForm) : api.post(`/api/boards/${boardId}/epics`, epicForm);
// //     const res = await apiCall;
// //     if (res.data.success) {
// //       setEpics(prev => isEditing ? prev.map(e => e.id === editingId ? { ...e, ...epicForm } : e) : [...prev, res.data.epic]);
// //       setDialogType(null);
// //     }
// //   };

// //   const handleSaveSprint = async () => {
// //     if (!sprintForm.title.trim() || !sprintForm.description.trim()) return;
// //     const apiCall = isEditing ? api.put(`/api/sprints/${editingId}`, sprintForm) : api.post(`/api/epics/${selectedEpicId}/sprints`, sprintForm);
// //     const res = await apiCall;
// //     if (res.data.success) {
// //       setSprints(prev => isEditing ? prev.map(s => s.id === editingId ? { ...s, ...sprintForm } : s) : [...prev, res.data.sprint]);
// //       setDialogType(null);
// //     }
// //   };

// //   const handleCreateTask = async () => {
// //     try {
// //       const res = await api.post(`/api/sprints/${selectedSprintId}/tasks`, {
// //         ...taskForm,
// //         assigneeId: taskForm.assigneeId ? parseInt(taskForm.assigneeId) : null,
// //         storyPoints: Number(taskForm.storyPoints) || 0,
// //         hours: Number(taskForm.hours) || 0
// //       });

// //       if (res.data.success) {
// //         const newTaskRes = await api.get(`/api/tasks/${res.data.task.id}`);
// //         if (newTaskRes.data.success) {
// //           setTasks(prev => [...prev, newTaskRes.data.task]);
// //         }
// //         setDialogType(null);
// //       }
// //     } catch (err) { console.error(err); }
// //   };

// //   useEffect(() => {
// //     if (memberSearchQuery.length < 3) {
// //       setMemberSearchResults([]);
// //       return;
// //     }
// //     const searchUsers = async () => {
// //       setIsSearchingMembers(true);
// //       try {
// //         const res = await api.get(`/dev/search/user?q=${memberSearchQuery}`);
// //         setMemberSearchResults(res.data); 
// //       } catch (err) { console.error("User search failed:", err); }
// //       finally { setIsSearchingMembers(false); }
// //     };
// //     const timeoutId = setTimeout(searchUsers, 300);
// //     return () => clearTimeout(timeoutId);
// //   }, [memberSearchQuery]);

// //   const handleAddMemberToBoard = async (userId: number) => {
// //     try {
// //       const res = await api.post(`/api/boards/${boardId}/users`, { userId });
// //       if (res.data.success) {
// //         const boardRes = await api.get(`/api/boards/${boardId}`);
// //         if (boardRes.data.success) setBoard(boardRes.data.board);
// //         setMemberSearchQuery('');
// //         setMemberSearchResults([]);
// //       }
// //     } catch (err) { console.error("Failed to add member:", err); }
// //   };

// //   if (!board) return <div className="p-10 text-white">Loading Board...</div>;

// //   return (
// //     <DashboardLayout>
// //       <Topbar title={board.title} subtitle={board.description} createLabel="New Task" onCreateClick={() => {
// //         setTaskForm({ ...taskForm, status: activeSprint?.status || '', title: '', description: '', assigneeId: '' });
// //         setDialogType('task');
// //       }}>
// //         <div className="flex items-center gap-3 mr-4">
// //           {/* Member Filter Dropdown */}
// //           <div className="flex items-center gap-2 px-3 py-1 bg-slate-900 border border-slate-800 rounded-lg">
// //             <Filter className="w-3.5 h-3.5 text-slate-500" />
// //             <Select 
// //               value={filterUserId?.toString() || 'all'} 
// //               onValueChange={(v) => setFilterUserId(v === 'all' ? null : parseInt(v))}
// //             >
// //               <SelectTrigger className="h-7 w-[140px] border-none bg-transparent text-xs text-slate-300 focus:ring-0">
// //                 <SelectValue placeholder="All Members" />
// //               </SelectTrigger>
// //               <SelectContent className="bg-slate-900 border-slate-800 text-slate-200">
// //                 <SelectItem value="all">All Members</SelectItem>
// //                 {board.allowedUsers?.map(u => (
// //                   <SelectItem key={u.id} value={u.id.toString()}>{u.name}</SelectItem>
// //                 ))}
// //               </SelectContent>
// //             </Select>
// //           </div>

// //           <Button variant="ghost" size="sm" onClick={() => setDialogType('members')} className="text-slate-400 hover:text-white">
// //             <Users className="w-4 h-4 mr-2" /> Members
// //           </Button>
// //           <button onClick={() => navigate('/')} className="p-1.5 rounded-md hover:bg-slate-800 text-slate-400 transition-colors">
// //             <ChevronLeft className="w-4 h-4" />
// //           </button>
// //         </div>
// //       </Topbar>

// //       <div className="flex items-center gap-2 px-4 py-3 bg-slate-950 border-b border-slate-800 overflow-x-auto scrollbar-none">
// //         <Target className="w-4 h-4 text-blue-500 mr-2 shrink-0" />
// //         {epics.map(epic => (
// //           <div key={epic.id} className="flex items-center group bg-slate-900 rounded-md shrink-0">
// //             <button
// //               onClick={() => setSearchParams({ epic: epic.id.toString() })}
// //               className={cn("px-3 py-1.5 text-sm rounded-l-md transition-all", selectedEpicId === epic.id ? "bg-blue-600 text-white" : "text-slate-400 hover:text-white")}
// //             >
// //               {epic.title}
// //             </button>
// //             <DropdownMenu>
// //               <DropdownMenuTrigger className="px-1.5 py-1.5 hover:bg-slate-800 rounded-r-md text-slate-500"><MoreVertical className="w-3 h-3" /></DropdownMenuTrigger>
// //               <DropdownMenuContent className="bg-slate-900 border-slate-800 text-white">
// //                 <DropdownMenuItem onClick={() => { setIsEditing(true); setEditingId(epic.id); setEpicForm({title: epic.title, description: epic.description || ''}); setDialogType('epic'); }}>Edit Epic</DropdownMenuItem>
// //               </DropdownMenuContent>
// //             </DropdownMenu>
// //           </div>
// //         ))}
// //         <Button variant="ghost" size="sm" onClick={() => { setIsEditing(false); setEpicForm({title: '', description: ''}); setDialogType('epic'); }} className="text-slate-500 shrink-0"><Plus className="w-3 h-3 mr-1"/> Epic</Button>
// //       </div>

// //       <div className="flex items-center gap-2 px-4 py-2 bg-slate-900/50 border-b border-slate-800 overflow-x-auto scrollbar-none">
// //         <Zap className="w-4 h-4 text-purple-500 mr-2 shrink-0" />
// //         {sprints.map(sprint => (
// //           <div key={sprint.id} className="flex items-center group shrink-0">
// //             <button
// //               onClick={() => setSearchParams({ epic: selectedEpicId!.toString(), sprint: sprint.id.toString() })}
// //               className={cn("px-3 py-1 text-xs rounded-full border transition-all", selectedSprintId === sprint.id ? "border-purple-500 bg-purple-500/10 text-purple-400" : "border-slate-700 text-slate-500")}
// //             >
// //               {sprint.title}
// //             </button>
// //             {selectedSprintId === sprint.id && (
// //               <button onClick={() => { 
// //                 setIsEditing(true); setEditingId(sprint.id); 
// //                 setSprintForm({ title: sprint.title, description: sprint.description || '', startTime: sprint.startTime?.slice(0, 16) || '', expiry: sprint.expiry?.slice(0, 16) || '', status: sprint.status });
// //                 setDialogType('sprint');
// //               }} className="ml-1 p-1 text-slate-500 hover:text-white transition-colors"><Edit2 className="w-3 h-3" /></button>
// //             )}
// //           </div>
// //         ))}
// //         {selectedEpicId && <Button variant="ghost" size="sm" onClick={() => { setIsEditing(false); setSprintForm({title: '', description: '', startTime: '', expiry: '', status: ["To Do", "In Progress", "Done"]}); setDialogType('sprint'); }} className="h-7 text-[10px] text-slate-500 shrink-0"><Plus className="w-3 h-3 mr-1"/> Sprint</Button>}
// //       </div>

// //       {activeSprint ? (
// //         <KanbanBoard 
// //           columns={activeSprint.status} 
// //           tasks={filteredTasks} 
// //           onTaskClick={setSelectedTask} 
// //           onAddTask={(status) => { 
// //             setTaskForm({ ...taskForm, status, title: '', description: '', assigneeId: '' }); 
// //             setDialogType('task'); 
// //           }} 
// //           onTaskMove={handleTaskMove}
// //         />
// //       ) : (
// //         <div className="flex-1 flex flex-col items-center justify-center text-slate-500"><p>Select or create an epic to view the board.</p></div>
// //       )}

// //       {/* Dialogs */}
// //       <Dialog open={dialogType === 'members'} onOpenChange={() => setDialogType(null)}>
// //         <DialogContent className="bg-slate-900 border-slate-800 text-white sm:max-w-[450px]">
// //           <DialogHeader><DialogTitle>Manage Board Members</DialogTitle></DialogHeader>
// //           <div className="space-y-6 py-4">
// //             <div className="space-y-2">
// //               <Label>Search Users</Label>
// //               <div className="relative">
// //                 <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-500" />
// //                 <Input placeholder="Enter name or email..." value={memberSearchQuery} onChange={e => setMemberSearchQuery(e.target.value)} className="pl-9 bg-slate-800 border-slate-700" />
// //               </div>
// //               {memberSearchResults.length > 0 && (
// //                 <div className="mt-2 border border-slate-700 rounded-md bg-slate-800 max-h-48 overflow-y-auto shadow-xl">
// //                   {memberSearchResults.map(user => {
// //                     const isAlreadyMember = board.allowedUsers?.some(u => u.id === user.id);
// //                     return (
// //                       <div key={user.id} className="flex items-center justify-between p-3 border-b border-slate-700 last:border-0 hover:bg-slate-700">
// //                         <div className="flex items-center gap-3">
// //                           <Avatar className="h-8 w-8"><AvatarImage src={user.picture} /><AvatarFallback>{user.name}</AvatarFallback></Avatar>
// //                           <div className="flex flex-col"><span className="text-sm font-medium">{user.name}</span><span className="text-xs text-slate-400">{user.email}</span></div>
// //                         </div>
// //                         {isAlreadyMember ? <Check className="h-4 w-4 text-blue-500" /> : <Button size="sm" className="h-7 text-xs bg-blue-600" onClick={() => handleAddMemberToBoard(user.id)}>Add</Button>}
// //                       </div>
// //                     );
// //                   })}
// //                 </div>
// //               )}
// //             </div>
// //             <div className="space-y-3">
// //               <Label className="text-slate-500">Current Members ({board.allowedUsers?.length || 0})</Label>
// //               <div className="space-y-2 max-h-48 overflow-y-auto pr-2">
// //                 {board.allowedUsers?.map(user => (
// //                   <div key={user.id} className="flex items-center gap-3 p-2 rounded-lg bg-slate-800/50 border border-slate-700/50">
// //                     <Avatar className="h-8 w-8"><AvatarImage src={user.picture}/><AvatarFallback>{user.name}</AvatarFallback></Avatar>
// //                     <div className="flex-1 min-w-0"><p className="text-sm font-medium truncate">{user.name}</p><p className="text-xs text-slate-500 truncate">{user.email}</p></div>
// //                   </div>
// //                 ))}
// //               </div>
// //             </div>
// //           </div>
// //         </DialogContent>
// //       </Dialog>

// //       <Dialog open={dialogType === 'task'} onOpenChange={() => setDialogType(null)}>
// //         <DialogContent className="bg-slate-900 border-slate-800 text-white max-w-lg">
// //           <DialogHeader><DialogTitle>New Task</DialogTitle></DialogHeader>
// //           <div className="grid grid-cols-2 gap-4 py-4">
// //             <div className="col-span-2 space-y-1"><Label>Title</Label><Input value={taskForm.title} onChange={e => setTaskForm({ ...taskForm, title: e.target.value })} className="bg-slate-800 border-slate-700"/></div>
// //             <div className="col-span-2 space-y-1"><Label>Description</Label><Textarea value={taskForm.description} onChange={e => setTaskForm({ ...taskForm, description: e.target.value })} className="bg-slate-800 border-slate-700"/></div>
// //             <div className="space-y-1"><Label>Assignee</Label>
// //               <Select value={taskForm.assigneeId} onValueChange={v => setTaskForm({ ...taskForm, assigneeId: v })}>
// //                 <SelectTrigger className="bg-slate-800 border-slate-700"><SelectValue placeholder="Select member" /></SelectTrigger>
// //                 <SelectContent className="bg-slate-900 border-slate-800 text-white">{board.allowedUsers?.map(u => (<SelectItem key={u.id} value={u.id.toString()}>{u.name}</SelectItem>))}</SelectContent>
// //               </Select>
// //             </div>
// //             <div className="space-y-1"><Label>Status</Label>
// //               <Select value={taskForm.status} onValueChange={v => setTaskForm({ ...taskForm, status: v })}>
// //                 <SelectTrigger className="bg-slate-800 border-slate-700"><SelectValue /></SelectTrigger>
// //                 <SelectContent className="bg-slate-900 border-slate-800 text-white">{activeSprint?.status.map(s => (<SelectItem key={s} value={s}>{s}</SelectItem>))}</SelectContent>
// //               </Select>
// //             </div>
// //             <div className="space-y-1"><Label>Story Points</Label><Input type="number" value={taskForm.storyPoints} onChange={e => setTaskForm({ ...taskForm, storyPoints: parseInt(e.target.value) || 0 })} className="bg-slate-800 border-slate-700" /></div>
// //             <div className="space-y-1"><Label>Estimated Hours</Label><Input type="number" step="0.5" value={taskForm.hours} onChange={e => setTaskForm({ ...taskForm, hours: parseFloat(e.target.value) || 0 })} className="bg-slate-800 border-slate-700" /></div>
// //             <div className="col-span-2 space-y-1"><Label>Priority</Label>
// //               <Select value={taskForm.priority} onValueChange={v => setTaskForm({ ...taskForm, priority: v })}>
// //                 <SelectTrigger className="bg-slate-800 border-slate-800"><SelectValue /></SelectTrigger>
// //                 <SelectContent className="bg-slate-900 border-slate-800 text-white"><SelectItem value="Low">Low</SelectItem><SelectItem value="Medium">Medium</SelectItem><SelectItem value="High">High</SelectItem></SelectContent>
// //               </Select>
// //             </div>
// //           </div>
// //           <DialogFooter><Button onClick={handleCreateTask} className="bg-blue-600 w-full">Create Task</Button></DialogFooter>
// //         </DialogContent>
// //       </Dialog>

// //       <TaskDrawer 
// //         task={selectedTask}
// //         availableStatus={activeSprint?.status || []}
// //         boardMembers={board.allowedUsers || []}
// //         onClose={() => setSelectedTask(null)}
// //         onTaskUpdate={handleTaskUpdate}
// //       />
// //     </DashboardLayout>
// //   );
// // };

// // export default BoardDetailPage;























// import { useEffect, useState, useMemo } from 'react';
// import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
// import { DashboardLayout } from '@/components/DashboardLayout';
// import { Topbar } from '@/components/Topbar';
// import { KanbanBoard } from '@/components/KanbanBoard';
// import { TaskDrawer } from '@/components/TaskDrawer';
// import api from '@/lib/api';
// import type { Board, Epic, Sprint, Task, User } from '@/types';
// import { cn } from '@/lib/utils';
// import { 
//   ChevronLeft, Target, Zap, Plus, MoreVertical, 
//   Users, Edit2, Search, Check, Filter
// } from 'lucide-react';
// import { Button } from '@/components/ui/button';
// import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { Textarea } from '@/components/ui/textarea';
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// const BoardDetailPage = () => {
//   const { boardId } = useParams();
//   const navigate = useNavigate();
//   const [searchParams, setSearchParams] = useSearchParams();

//   const selectedEpicId = searchParams.get('epic') ? parseInt(searchParams.get('epic')!) : null;
//   const selectedSprintId = searchParams.get('sprint') ? parseInt(searchParams.get('sprint')!) : null;

//   const [board, setBoard] = useState<Board | null>(null);
//   const [epics, setEpics] = useState<Epic[]>([]);
//   const [sprints, setSprints] = useState<Sprint[]>([]);
//   const [tasks, setTasks] = useState<Task[]>([]);
  
//   // Filtering State
//   const [filterUserId, setFilterUserId] = useState<number | null>(null);

//   const [selectedTask, setSelectedTask] = useState<Task | null>(null);
//   const [dialogType, setDialogType] = useState<'epic' | 'sprint' | 'task' | 'members' | null>(null);
//   const [isEditing, setIsEditing] = useState(false);
//   const [editingId, setEditingId] = useState<number | null>(null);
  
//   const [epicForm, setEpicForm] = useState({ title: '', description: '' });
//   const [sprintForm, setSprintForm] = useState({ 
//     title: '', description: '', startTime: '', expiry: '', 
//     status: ["To Do", "In Progress", "Done"] 
//   });

//   const [taskForm, setTaskForm] = useState({
//     title: '', description: '', assigneeId: '', storyPoints: 0, hours: 0, priority: 'Medium', status: ''
//   });

//   const [memberSearchQuery, setMemberSearchQuery] = useState('');
//   const [memberSearchResults, setMemberSearchResults] = useState<User[]>([]);
//   const [isSearchingMembers, setIsSearchingMembers] = useState(false);

//   useEffect(() => {
//     const fetchInitialData = async () => {
//       try {
//         const [boardRes, epicsRes] = await Promise.all([
//           api.get(`/api/boards/${boardId}`),
//           api.get(`/api/boards/${boardId}/epics`)
//         ]);
//         if (boardRes.data.success) setBoard(boardRes.data.board);
//         if (epicsRes.data.success) {
//           setEpics(epicsRes.data.epics);
//           if (!selectedEpicId && epicsRes.data.epics.length > 0) {
//             setSearchParams({ epic: epicsRes.data.epics.id.toString() });
//           }
//         }
//       } catch (error) { console.error(error); }
//     };
//     fetchInitialData();
//   }, [boardId]);

//   useEffect(() => {
//     if (!selectedEpicId) return;
//     api.get(`/api/epics/${selectedEpicId}/sprints`).then(res => {
//       if (res.data.success) {
//         setSprints(res.data.sprints);
//         if (!selectedSprintId && res.data.sprints.length > 0) {
//           setSearchParams({ epic: selectedEpicId.toString(), sprint: res.data.sprints.id.toString() });
//         }
//       }
//     });
//   }, [selectedEpicId]);

//   useEffect(() => {
//     if (!selectedSprintId) {
//       setTasks([]);
//       return;
//     }
//     api.get(`/api/sprints/${selectedSprintId}/tasks`).then(res => {
//       if (res.data.success) setTasks(res.data.tasks);
//     });
//   }, [selectedSprintId]);

//   const activeSprint = useMemo(() => sprints.find(s => s.id === selectedSprintId), [sprints, selectedSprintId]);

//   const filteredTasks = useMemo(() => {
//     if (!filterUserId) return tasks;
//     return tasks.filter(t => t.assigneeId === filterUserId);
//   }, [tasks, filterUserId]);

//   const handleTaskMove = async (taskId: number, newStatus: string) => {
//     const taskToMove = tasks.find(t => t.id === taskId);
//     if (!taskToMove || taskToMove.status === newStatus) return;

//     const previousTasks = [...tasks];
//     setTasks(prev => prev.map(t => t.id === taskId ? { ...t, status: newStatus } : t));

//     try {
//       await api.put(`/api/tasks/${taskId}`, { ...taskToMove, status: newStatus });
//     } catch (err) {
//       console.error("Move failed:", err);
//       setTasks(previousTasks);
//     }
//   };

//   const handleTaskUpdate = (updatedTask: Task) => {
//     setTasks(prev => prev.map(t => t.id === updatedTask.id ? updatedTask : t));
//     setSelectedTask(updatedTask);
//   };

//   const handleSaveEpic = async () => {
//     const apiCall = isEditing 
//       ? api.put(`/api/epics/${editingId}`, epicForm) 
//       : api.post(`/api/boards/${boardId}/epics`, epicForm);
    
//     const res = await apiCall;
//     if (res.data.success) {
//       setEpics(prev => isEditing 
//         ? prev.map(e => e.id === editingId ? { ...e, ...epicForm } : e)
//         : [...prev, res.data.epic]
//       );
//       setDialogType(null);
//     }
//   };

//   const handleSaveSprint = async () => {
//     if (!sprintForm.title.trim() || !sprintForm.description.trim()) return;
    
//     const apiCall = isEditing 
//       ? api.put(`/api/sprints/${editingId}`, sprintForm) 
//       : api.post(`/api/epics/${selectedEpicId}/sprints`, sprintForm);

//     const res = await apiCall;
//     if (res.data.success) {
//       setSprints(prev => isEditing 
//         ? prev.map(s => s.id === editingId ? { ...s, ...sprintForm } : s)
//         : [...prev, res.data.sprint]
//       );
//       setDialogType(null);
//     }
//   };

//   const handleCreateTask = async () => {
//     try {
//       const res = await api.post(`/api/sprints/${selectedSprintId}/tasks`, {
//         ...taskForm,
//         assigneeId: taskForm.assigneeId ? parseInt(taskForm.assigneeId) : null,
//         storyPoints: Number(taskForm.storyPoints) || 0,
//         hours: Number(taskForm.hours) || 0
//       });

//       if (res.data.success) {
//         const newTaskRes = await api.get(`/api/tasks/${res.data.task.id}`);
//         if (newTaskRes.data.success) {
//           setTasks(prev => [...prev, newTaskRes.data.task]);
//         }
//         setDialogType(null);
//       }
//     } catch (err) { console.error(err); }
//   };

//   useEffect(() => {
//     if (memberSearchQuery.length < 3) {
//       setMemberSearchResults([]);
//       return;
//     }
//     const searchUsers = async () => {
//       setIsSearchingMembers(true);
//       try {
//         const res = await api.get(`/dev/search/user?q=${memberSearchQuery}`);
//         setMemberSearchResults(res.data); 
//       } catch (err) { console.error("User search failed:", err); }
//       finally { setIsSearchingMembers(false); }
//     };
//     const timeoutId = setTimeout(searchUsers, 300);
//     return () => clearTimeout(timeoutId);
//   }, [memberSearchQuery]);

//   const handleAddMemberToBoard = async (userId: number) => {
//     try {
//       const res = await api.post(`/api/boards/${boardId}/users`, { userId });
//       if (res.data.success) {
//         const boardRes = await api.get(`/api/boards/${boardId}`);
//         if (boardRes.data.success) setBoard(boardRes.data.board);
//         setMemberSearchQuery('');
//         setMemberSearchResults([]);
//       }
//     } catch (err) { console.error("Failed to add member:", err); }
//   };

//   if (!board) return <div className="p-10 text-white">Loading Board...</div>;

//   return (
//     <DashboardLayout>
//       <Topbar title={board.title} subtitle={board.description} createLabel="New Task" onCreateClick={() => {
//         setTaskForm({ ...taskForm, status: activeSprint?.status || '', title: '', description: '', assigneeId: '' });
//         setDialogType('task');
//       }}>
//         <div className="flex items-center gap-3 mr-4">
//           <div className="flex items-center gap-2 px-3 py-1 bg-slate-900 border border-slate-800 rounded-lg">
//             <Filter className="w-3.5 h-3.5 text-slate-500" />
//             <Select 
//               value={filterUserId?.toString() || 'all'} 
//               onValueChange={(v) => setFilterUserId(v === 'all' ? null : parseInt(v))}
//             >
//               <SelectTrigger className="h-7 w-[140px] border-none bg-transparent text-xs text-slate-300 focus:ring-0">
//                 <SelectValue placeholder="All Members" />
//               </SelectTrigger>
//               <SelectContent className="bg-slate-900 border-slate-800 text-slate-200">
//                 <SelectItem value="all">All Members</SelectItem>
//                 {board.allowedUsers?.map(u => (
//                   <SelectItem key={u.id} value={u.id.toString()}>{u.name}</SelectItem>
//                 ))}
//               </SelectContent>
//             </Select>
//           </div>

//           <Button variant="ghost" size="sm" onClick={() => setDialogType('members')} className="text-slate-400 hover:text-white">
//             <Users className="w-4 h-4 mr-2" /> Members
//           </Button>
//           <button onClick={() => navigate('/')} className="p-1.5 rounded-md hover:bg-slate-800 text-slate-400 transition-colors">
//             <ChevronLeft className="w-4 h-4" />
//           </button>
//         </div>
//       </Topbar>

//       {/* Epic Navigation */}
//       <div className="flex items-center gap-2 px-4 py-3 bg-slate-950 border-b border-slate-800 overflow-x-auto scrollbar-none">
//         <Target className="w-4 h-4 text-blue-500 mr-2 shrink-0" />
//         {epics.map(epic => (
//           <div key={epic.id} className="flex items-center group bg-slate-900 rounded-md shrink-0">
//             <button
//               onClick={() => setSearchParams({ epic: epic.id.toString() })}
//               className={cn("px-3 py-1.5 text-sm rounded-l-md transition-all", selectedEpicId === epic.id ? "bg-blue-600 text-white" : "text-slate-400 hover:text-white")}
//             >
//               {epic.title}
//             </button>
//             <DropdownMenu>
//               <DropdownMenuTrigger className="px-1.5 py-1.5 hover:bg-slate-800 rounded-r-md text-slate-500"><MoreVertical className="w-3 h-3" /></DropdownMenuTrigger>
//               <DropdownMenuContent className="bg-slate-900 border-slate-800 text-white">
//                 <DropdownMenuItem onClick={() => { 
//                   setIsEditing(true); 
//                   setEditingId(epic.id); 
//                   setEpicForm({title: epic.title, description: epic.description || ''}); 
//                   setDialogType('epic'); 
//                 }}>Edit Epic</DropdownMenuItem>
//               </DropdownMenuContent>
//             </DropdownMenu>
//           </div>
//         ))}
//         <Button variant="ghost" size="sm" onClick={() => { setIsEditing(false); setEpicForm({title: '', description: ''}); setDialogType('epic'); }} className="text-slate-500 shrink-0"><Plus className="w-3 h-3 mr-1"/> Epic</Button>
//       </div>

//       {/* Sprint Navigation */}
//       <div className="flex items-center gap-2 px-4 py-2 bg-slate-900/50 border-b border-slate-800 overflow-x-auto scrollbar-none">
//         <Zap className="w-4 h-4 text-purple-500 mr-2 shrink-0" />
//         {sprints.map(sprint => (
//           <div key={sprint.id} className="flex items-center group shrink-0">
//             <button
//               onClick={() => setSearchParams({ epic: selectedEpicId!.toString(), sprint: sprint.id.toString() })}
//               className={cn("px-3 py-1 text-xs rounded-full border transition-all", selectedSprintId === sprint.id ? "border-purple-500 bg-purple-500/10 text-purple-400" : "border-slate-700 text-slate-500")}
//             >
//               {sprint.title}
//             </button>
//             {selectedSprintId === sprint.id && (
//               <button onClick={() => { 
//                 setIsEditing(true); setEditingId(sprint.id); 
//                 setSprintForm({ title: sprint.title, description: sprint.description || '', startTime: sprint.startTime?.slice(0, 16) || '', expiry: sprint.expiry?.slice(0, 16) || '', status: sprint.status });
//                 setDialogType('sprint');
//               }} className="ml-1 p-1 text-slate-500 hover:text-white transition-colors"><Edit2 className="w-3 h-3" /></button>
//             )}
//           </div>
//         ))}
//         {selectedEpicId && <Button variant="ghost" size="sm" onClick={() => { setIsEditing(false); setSprintForm({title: '', description: '', startTime: '', expiry: '', status: ["To Do", "In Progress", "Done"]}); setDialogType('sprint'); }} className="h-7 text-[10px] text-slate-500 shrink-0"><Plus className="w-3 h-3 mr-1"/> Sprint</Button>}
//       </div>

//       {/* Board */}
//       {activeSprint ? (
//         <KanbanBoard 
//           columns={activeSprint.status} 
//           tasks={filteredTasks} 
//           onTaskClick={setSelectedTask} 
//           onAddTask={(status) => { 
//             setTaskForm({ ...taskForm, status, title: '', description: '', assigneeId: '' }); 
//             setDialogType('task'); 
//           }} 
//           onTaskMove={handleTaskMove}
//         />
//       ) : (
//         <div className="flex-1 flex flex-col items-center justify-center text-slate-500"><p>Select or create an epic to view the board.</p></div>
//       )}

//       {/* Epic Dialog */}
//       <Dialog open={dialogType === 'epic'} onOpenChange={() => setDialogType(null)}>
//         <DialogContent className="bg-slate-900 border-slate-800 text-white">
//           <DialogHeader><DialogTitle>{isEditing ? 'Edit Epic' : 'New Epic'}</DialogTitle></DialogHeader>
//           <div className="space-y-4 py-2">
//             <div className="space-y-1"><Label>Title</Label><Input value={epicForm.title} onChange={e => setEpicForm({...epicForm, title: e.target.value})} className="bg-slate-800 border-slate-700"/></div>
//             <div className="space-y-1"><Label>Description</Label><Textarea value={epicForm.description} onChange={e => setEpicForm({...epicForm, description: e.target.value})} className="bg-slate-800 border-slate-700"/></div>
//           </div>
//           <DialogFooter><Button onClick={handleSaveEpic} className="bg-blue-600 w-full">Save Epic</Button></DialogFooter>
//         </DialogContent>
//       </Dialog>

//       {/* Sprint Dialog */}
//       <Dialog open={dialogType === 'sprint'} onOpenChange={() => setDialogType(null)}>
//         <DialogContent className="bg-slate-900 border-slate-800 text-white max-w-md">
//           <DialogHeader><DialogTitle>{isEditing ? 'Edit Sprint' : 'New Sprint'}</DialogTitle></DialogHeader>
//           <div className="grid grid-cols-2 gap-4 py-2">
//             <div className="col-span-2 space-y-1"><Label>Title *</Label><Input value={sprintForm.title} onChange={e => setSprintForm({ ...sprintForm, title: e.target.value })} className="bg-slate-800 border-slate-700"/></div>
//             <div className="col-span-2 space-y-1"><Label>Description *</Label><Textarea value={sprintForm.description} onChange={e => setSprintForm({ ...sprintForm, description: e.target.value })} className="bg-slate-800 border-slate-700"/></div>
//             <div className="space-y-1"><Label>Start Date</Label><Input type="datetime-local" value={sprintForm.startTime} onChange={e => setSprintForm({ ...sprintForm, startTime: e.target.value })} className="bg-slate-800 border-slate-700 text-xs"/></div>
//             <div className="space-y-1"><Label>Expiry Date</Label><Input type="datetime-local" value={sprintForm.expiry} onChange={e => setSprintForm({ ...sprintForm, expiry: e.target.value })} className="bg-slate-800 border-slate-700 text-xs"/></div>
//             <div className="col-span-2 space-y-1"><Label>Status Columns (Comma separated)</Label><Input value={sprintForm.status.join(',')} onChange={e => setSprintForm({ ...sprintForm, status: e.target.value.split(',').map(s => s.trim()) })} className="bg-slate-800 border-slate-700"/></div>
//           </div>
//           <DialogFooter><Button onClick={handleSaveSprint} className="bg-purple-600 w-full" disabled={!sprintForm.title.trim() || !sprintForm.description.trim()}>Save Sprint</Button></DialogFooter>
//         </DialogContent>
//       </Dialog>

//       {/* Task Creation Dialog */}
//       <Dialog open={dialogType === 'task'} onOpenChange={() => setDialogType(null)}>
//         <DialogContent className="bg-slate-900 border-slate-800 text-white max-w-lg">
//           <DialogHeader><DialogTitle>New Task</DialogTitle></DialogHeader>
//           <div className="grid grid-cols-2 gap-4 py-4">
//             <div className="col-span-2 space-y-1"><Label>Title</Label><Input value={taskForm.title} onChange={e => setTaskForm({ ...taskForm, title: e.target.value })} className="bg-slate-800 border-slate-700"/></div>
//             <div className="col-span-2 space-y-1"><Label>Description</Label><Textarea value={taskForm.description} onChange={e => setTaskForm({ ...taskForm, description: e.target.value })} className="bg-slate-800 border-slate-700"/></div>
//             <div className="space-y-1"><Label>Assignee</Label>
//               <Select value={taskForm.assigneeId} onValueChange={v => setTaskForm({ ...taskForm, assigneeId: v })}>
//                 <SelectTrigger className="bg-slate-800 border-slate-700"><SelectValue placeholder="Select member" /></SelectTrigger>
//                 <SelectContent className="bg-slate-900 border-slate-800 text-white">{board.allowedUsers?.map(u => (<SelectItem key={u.id} value={u.id.toString()}>{u.name}</SelectItem>))}</SelectContent>
//               </Select>
//             </div>
//             <div className="space-y-1"><Label>Status</Label>
//               <Select value={taskForm.status} onValueChange={v => setTaskForm({ ...taskForm, status: v })}>
//                 <SelectTrigger className="bg-slate-800 border-slate-700"><SelectValue /></SelectTrigger>
//                 <SelectContent className="bg-slate-900 border-slate-800 text-white">{activeSprint?.status.map(s => (<SelectItem key={s} value={s}>{s}</SelectItem>))}</SelectContent>
//               </Select>
//             </div>
//             <div className="space-y-1"><Label>Story Points</Label><Input type="number" value={taskForm.storyPoints} onChange={e => setTaskForm({ ...taskForm, storyPoints: parseInt(e.target.value) || 0 })} className="bg-slate-800 border-slate-700" /></div>
//             <div className="space-y-1"><Label>Estimated Hours</Label><Input type="number" step="0.5" value={taskForm.hours} onChange={e => setTaskForm({ ...taskForm, hours: parseFloat(e.target.value) || 0 })} className="bg-slate-800 border-slate-700" /></div>
//             <div className="col-span-2 space-y-1"><Label>Priority</Label>
//               <Select value={taskForm.priority} onValueChange={v => setTaskForm({ ...taskForm, priority: v })}>
//                 <SelectTrigger className="bg-slate-800 border-slate-700"><SelectValue /></SelectTrigger>
//                 <SelectContent className="bg-slate-900 border-slate-800 text-white"><SelectItem value="Low">Low</SelectItem><SelectItem value="Medium">Medium</SelectItem><SelectItem value="High">High</SelectItem></SelectContent>
//               </Select>
//             </div>
//           </div>
//           <DialogFooter><Button onClick={handleCreateTask} className="bg-blue-600 hover:bg-blue-700 w-full">Create Task</Button></DialogFooter>
//         </DialogContent>
//       </Dialog>

//       <Dialog open={dialogType === 'members'} onOpenChange={() => setDialogType(null)}>
//         <DialogContent className="bg-slate-900 border-slate-800 text-white sm:max-w-[450px]">
//           <DialogHeader><DialogTitle>Manage Board Members</DialogTitle></DialogHeader>
//           <div className="space-y-6 py-4">
//             <div className="space-y-2">
//               <Label>Search Users</Label>
//               <div className="relative">
//                 <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-500" />
//                 <Input placeholder="Enter name or email..." value={memberSearchQuery} onChange={e => setMemberSearchQuery(e.target.value)} className="pl-9 bg-slate-800 border-slate-700" />
//               </div>
//               {memberSearchResults.length > 0 && (
//                 <div className="mt-2 border border-slate-700 rounded-md bg-slate-800 max-h-48 overflow-y-auto shadow-xl">
//                   {memberSearchResults.map(user => {
//                     const isAlreadyMember = board.allowedUsers?.some(u => u.id === user.id);
//                     return (
//                       <div key={user.id} className="flex items-center justify-between p-3 border-b border-slate-700 last:border-0 hover:bg-slate-700">
//                         <div className="flex items-center gap-3">
//                           <Avatar className="h-8 w-8"><AvatarImage src={user.picture} /><AvatarFallback>{user.name}</AvatarFallback></Avatar>
//                           <div className="flex flex-col"><span className="text-sm font-medium">{user.name}</span><span className="text-xs text-slate-400">{user.email}</span></div>
//                         </div>
//                         {isAlreadyMember ? <Check className="h-4 w-4 text-blue-500" /> : <Button size="sm" className="h-7 text-xs bg-blue-600" onClick={() => handleAddMemberToBoard(user.id)}>Add</Button>}
//                       </div>
//                     );
//                   })}
//                 </div>
//               )}
//             </div>
//             <div className="space-y-3">
//               <Label className="text-slate-500">Current Members ({board.allowedUsers?.length || 0})</Label>
//               <div className="space-y-2 max-h-48 overflow-y-auto pr-2">
//                 {board.allowedUsers?.map(user => (
//                   <div key={user.id} className="flex items-center gap-3 p-2 rounded-lg bg-slate-800/50 border border-slate-700/50">
//                     <Avatar className="h-8 w-8"><AvatarImage src={user.picture}/><AvatarFallback>{user.name}</AvatarFallback></Avatar>
//                     <div className="flex-1 min-w-0"><p className="text-sm font-medium truncate">{user.name}</p><p className="text-xs text-slate-500 truncate">{user.email}</p></div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </DialogContent>
//       </Dialog>

//       <TaskDrawer 
//         task={selectedTask}
//         availableStatus={activeSprint?.status || []}
//         boardMembers={board.allowedUsers || []}
//         onClose={() => setSelectedTask(null)}
//         onTaskUpdate={handleTaskUpdate}
//       />
//     </DashboardLayout>
//   );
// };

// export default BoardDetailPage;



























import { useEffect, useState, useMemo } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { DashboardLayout } from '@/components/DashboardLayout';
import { Topbar } from '@/components/Topbar';
import { KanbanBoard } from '@/components/KanbanBoard';
import { TaskDrawer } from '@/components/TaskDrawer';
import api from '@/lib/api';
import type { Board, Epic, Sprint, Task, User } from '@/types';
import { cn } from '@/lib/utils';
import { 
  ChevronLeft, Target, Zap, Plus, MoreVertical, 
  Users, Edit2, Search, Check, Filter
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const BoardDetailPage = () => {
  const { boardId } = useParams();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const selectedEpicId = searchParams.get('epic') ? parseInt(searchParams.get('epic')!) : null;
  const selectedSprintId = searchParams.get('sprint') ? parseInt(searchParams.get('sprint')!) : null;

  const [board, setBoard] = useState<Board | null>(null);
  const [epics, setEpics] = useState<Epic[]>([]);
  const [sprints, setSprints] = useState<Sprint[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  
  const [filterUserId, setFilterUserId] = useState<number | null>(null);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [dialogType, setDialogType] = useState<'epic' | 'sprint' | 'task' | 'members' | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  
  const [epicForm, setEpicForm] = useState({ title: '', description: '' });
  const [sprintForm, setSprintForm] = useState({ 
    title: '', description: '', startTime: '', expiry: '', 
    status: ["To Do", "In Progress", "Done"] 
  });

  const [taskForm, setTaskForm] = useState({
    title: '', description: '', assigneeId: '', storyPoints: 0, hours: 0, priority: 'Medium', status: ''
  });

  const [memberSearchQuery, setMemberSearchQuery] = useState('');
  const [memberSearchResults, setMemberSearchResults] = useState<User[]>([]);
  const [isSearchingMembers, setIsSearchingMembers] = useState(false);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [boardRes, epicsRes] = await Promise.all([
          api.get(`/api/boards/${boardId}`),
          api.get(`/api/boards/${boardId}/epics`)
        ]);
        if (boardRes.data.success) setBoard(boardRes.data.board);
        if (epicsRes.data.success) {
          setEpics(epicsRes.data.epics);
          if (!selectedEpicId && epicsRes.data.epics.length > 0) {
            setSearchParams({ epic: epicsRes.data.epics.id.toString() });
          }
        }
      } catch (error) { console.error(error); }
    };
    fetchInitialData();
  }, [boardId]);

  useEffect(() => {
    if (!selectedEpicId) return;
    api.get(`/api/epics/${selectedEpicId}/sprints`).then(res => {
      if (res.data.success) {
        setSprints(res.data.sprints);
        if (!selectedSprintId && res.data.sprints.length > 0) {
          setSearchParams({ epic: selectedEpicId.toString(), sprint: res.data.sprints.id.toString() });
        }
      }
    });
  }, [selectedEpicId]);

  useEffect(() => {
    if (!selectedSprintId) {
      setTasks([]);
      return;
    }
    api.get(`/api/sprints/${selectedSprintId}/tasks`).then(res => {
      if (res.data.success) setTasks(res.data.tasks);
    });
  }, [selectedSprintId]);

  const activeSprint = useMemo(() => sprints.find(s => s.id === selectedSprintId), [sprints, selectedSprintId]);

  const filteredTasks = useMemo(() => {
    if (!filterUserId) return tasks;
    return tasks.filter(t => t.assigneeId === filterUserId);
  }, [tasks, filterUserId]);

  const handleTaskMove = async (taskId: number, newStatus: string) => {
    const taskToMove = tasks.find(t => t.id === taskId);
    if (!taskToMove || taskToMove.status === newStatus) return;
    const previousTasks = [...tasks];
    setTasks(prev => prev.map(t => t.id === taskId ? { ...t, status: newStatus } : t));
    try {
      await api.put(`/api/tasks/${taskId}`, { ...taskToMove, status: newStatus });
    } catch (err) {
      setTasks(previousTasks);
    }
  };

  const handleTaskUpdate = (updatedTask: Task) => {
    setTasks(prev => prev.map(t => t.id === updatedTask.id ? updatedTask : t));
    setSelectedTask(updatedTask);
  };

  const handleSaveEpic = async () => {
    const apiCall = isEditing ? api.put(`/api/epics/${editingId}`, epicForm) : api.post(`/api/boards/${boardId}/epics`, epicForm);
    const res = await apiCall;
    if (res.data.success) {
      setEpics(prev => isEditing ? prev.map(e => e.id === editingId ? { ...e, ...epicForm } : e) : [...prev, res.data.epic]);
      setDialogType(null);
    }
  };

  const handleSaveSprint = async () => {
    if (!sprintForm.title.trim() || !sprintForm.description.trim()) return;
    const apiCall = isEditing ? api.put(`/api/sprints/${editingId}`, sprintForm) : api.post(`/api/epics/${selectedEpicId}/sprints`, sprintForm);
    const res = await apiCall;
    if (res.data.success) {
      setSprints(prev => isEditing ? prev.map(s => s.id === editingId ? { ...s, ...sprintForm } : s) : [...prev, res.data.sprint]);
      setDialogType(null);
    }
  };

  const handleCreateTask = async () => {
    try {
      const res = await api.post(`/api/sprints/${selectedSprintId}/tasks`, {
        ...taskForm,
        assigneeId: taskForm.assigneeId ? parseInt(taskForm.assigneeId) : null,
        storyPoints: Number(taskForm.storyPoints) || 0,
        hours: Number(taskForm.hours) || 0
      });
      if (res.data.success) {
        const newTaskRes = await api.get(`/api/tasks/${res.data.task.id}`);
        if (newTaskRes.data.success) setTasks(prev => [...prev, newTaskRes.data.task]);
        setDialogType(null);
      }
    } catch (err) { console.error(err); }
  };

  const handleAddMemberToBoard = async (userId: number) => {
    try {
      const res = await api.post(`/api/boards/${boardId}/users`, { userId });
      if (res.data.success) {
        const boardRes = await api.get(`/api/boards/${boardId}`);
        if (boardRes.data.success) setBoard(boardRes.data.board);
        setMemberSearchQuery('');
        setMemberSearchResults([]);
      }
    } catch (err) { console.error(err); }
  };

  useEffect(() => {
    if (memberSearchQuery.length < 3) {
      setMemberSearchResults([]);
      return;
    }
    const searchUsers = async () => {
      setIsSearchingMembers(true);
      try {
        const res = await api.get(`/dev/search/user?q=${memberSearchQuery}`);
        setMemberSearchResults(res.data); 
      } catch (err) { console.error(err); }
      finally { setIsSearchingMembers(false); }
    };
    const timeoutId = setTimeout(searchUsers, 300);
    return () => clearTimeout(timeoutId);
  }, [memberSearchQuery]);

  if (!board) return <div className="p-10 text-white">Loading Board...</div>;

  return (
    <DashboardLayout>
      <Topbar title={board.title} subtitle={board.description} createLabel="New Task" onCreateClick={() => {
        setTaskForm({ title: '', description: '', assigneeId: '', storyPoints: 0, hours: 0, priority: 'Medium', status: activeSprint?.status || '' });
        setDialogType('task');
      }}>
        <div className="flex items-center gap-6 mr-4">
          <div className="flex items-center -space-x-2 overflow-hidden">
            <TooltipProvider>
              {board.allowedUsers?.map((u) => (
                <Tooltip key={u.id}>
                  <TooltipTrigger asChild>
                    <button
                      onClick={() => setFilterUserId(filterUserId === u.id ? null : u.id)}
                      className={cn(
                        "relative transition-all duration-200 hover:z-10",
                        filterUserId === u.id ? "ring-2 ring-blue-500 scale-110 z-10" : "opacity-70 hover:opacity-100"
                      )}
                    >
                      <Avatar className="h-8 w-8 border-2 border-slate-950">
                        <AvatarImage src={u.picture} />
                        <AvatarFallback className="bg-slate-800 text-[10px]">{u.name}</AvatarFallback>
                      </Avatar>
                    </button>
                  </TooltipTrigger>
                  <TooltipContent className="bg-slate-900 border-slate-800 text-white text-xs"><p>{u.name}</p></TooltipContent>
                </Tooltip>
              ))}
              {filterUserId && (
                <button onClick={() => setFilterUserId(null)} className="ml-4 text-[10px] font-black uppercase text-slate-500 hover:text-white">Clear Filter</button>
              )}
            </TooltipProvider>
          </div>
          <div className="h-4 w-px bg-slate-800" />
          <Button variant="ghost" size="sm" onClick={() => setDialogType('members')} className="text-slate-400 hover:text-white"><Users className="w-4 h-4 mr-2" /> Members</Button>
          <button onClick={() => navigate('/')} className="p-1.5 rounded-md hover:bg-slate-800 text-slate-400"><ChevronLeft className="w-4 h-4" /></button>
        </div>
      </Topbar>

      {/* Nav Section */}
      <div className="flex items-center gap-2 px-4 py-3 bg-slate-950 border-b border-slate-800 overflow-x-auto scrollbar-none">
        <Target className="w-4 h-4 text-blue-500 mr-2 shrink-0" />
        {epics.map(epic => (
          <div key={epic.id} className="flex items-center group bg-slate-900 rounded-md shrink-0">
            <button onClick={() => setSearchParams({ epic: epic.id.toString() })} className={cn("px-3 py-1.5 text-sm rounded-l-md transition-all", selectedEpicId === epic.id ? "bg-blue-600 text-white" : "text-slate-400 hover:text-white")}>{epic.title}</button>
            <DropdownMenu>
              <DropdownMenuTrigger className="px-1.5 py-1.5 hover:bg-slate-800 rounded-r-md text-slate-500"><MoreVertical className="w-3 h-3" /></DropdownMenuTrigger>
              <DropdownMenuContent className="bg-slate-900 border-slate-800 text-white"><DropdownMenuItem onClick={() => { setIsEditing(true); setEditingId(epic.id); setEpicForm({title: epic.title, description: epic.description || ''}); setDialogType('epic'); }}>Edit Epic</DropdownMenuItem></DropdownMenuContent>
            </DropdownMenu>
          </div>
        ))}
        <Button variant="ghost" size="sm" onClick={() => { setIsEditing(false); setEpicForm({title: '', description: ''}); setDialogType('epic'); }} className="text-slate-500 shrink-0"><Plus className="w-3 h-3 mr-1"/> Epic</Button>
      </div>

      <div className="flex items-center gap-2 px-4 py-2 bg-slate-900/50 border-b border-slate-800 overflow-x-auto scrollbar-none">
        <Zap className="w-4 h-4 text-purple-500 mr-2 shrink-0" />
        {sprints.map(sprint => (
          <div key={sprint.id} className="flex items-center group shrink-0">
            <button onClick={() => setSearchParams({ epic: selectedEpicId!.toString(), sprint: sprint.id.toString() })} className={cn("px-3 py-1 text-xs rounded-full border transition-all", selectedSprintId === sprint.id ? "border-purple-500 bg-purple-500/10 text-purple-400" : "border-slate-700 text-slate-500")}>{sprint.title}</button>
            {selectedSprintId === sprint.id && (
              <button onClick={() => { setIsEditing(true); setEditingId(sprint.id); setSprintForm({ title: sprint.title, description: sprint.description || '', startTime: sprint.startTime?.slice(0, 16) || '', expiry: sprint.expiry?.slice(0, 16) || '', status: sprint.status }); setDialogType('sprint'); }} className="ml-1 p-1 text-slate-500 hover:text-white"><Edit2 className="w-3 h-3" /></button>
            )}
          </div>
        ))}
        {selectedEpicId && <Button variant="ghost" size="sm" onClick={() => { setIsEditing(false); setSprintForm({title: '', description: '', startTime: '', expiry: '', status: ["To Do", "In Progress", "Done"]}); setDialogType('sprint'); }} className="h-7 text-[10px] text-slate-500 shrink-0"><Plus className="w-3 h-3 mr-1"/> Sprint</Button>}
      </div>

      {activeSprint ? (
        <KanbanBoard columns={activeSprint.status} tasks={filteredTasks} onTaskClick={setSelectedTask} onAddTask={(status) => { setTaskForm({ ...taskForm, status, title: '', description: '', assigneeId: '' }); setDialogType('task'); }} onTaskMove={handleTaskMove} />
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center text-slate-500"><p>Select or create an epic to view the board.</p></div>
      )}

      {/* Task Creation Dialog */}
      <Dialog open={dialogType === 'task'} onOpenChange={() => setDialogType(null)}>
        <DialogContent className="bg-slate-900 border-slate-800 text-white max-w-lg">
          <DialogHeader><DialogTitle className="text-xl font-bold">New Task</DialogTitle></DialogHeader>
          <div className="grid grid-cols-2 gap-4 py-4">
            <div className="col-span-2 space-y-1.5">
              <Label className="text-xs uppercase font-bold text-slate-500 tracking-wider">Title</Label>
              <Input value={taskForm.title} onChange={e => setTaskForm({ ...taskForm, title: e.target.value })} className="bg-slate-800 border-slate-700 h-10" placeholder="Task name..." />
            </div>
            <div className="col-span-2 space-y-1.5">
              <Label className="text-xs uppercase font-bold text-slate-500 tracking-wider">Description</Label>
              <Textarea value={taskForm.description} onChange={e => setTaskForm({ ...taskForm, description: e.target.value })} className="bg-slate-800 border-slate-700 min-h-[100px]" placeholder="Details..." />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs uppercase font-bold text-slate-500 tracking-wider">Assignee</Label>
              <Select value={taskForm.assigneeId} onValueChange={v => setTaskForm({ ...taskForm, assigneeId: v })}>
                <SelectTrigger className="bg-slate-800 border-slate-700"><SelectValue placeholder="Unassigned" /></SelectTrigger>
                <SelectContent className="bg-slate-900 border-slate-800 text-white">{board.allowedUsers?.map(u => (<SelectItem key={u.id} value={u.id.toString()}>{u.name}</SelectItem>))}</SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs uppercase font-bold text-slate-500 tracking-wider">Priority</Label>
              <Select value={taskForm.priority} onValueChange={v => setTaskForm({ ...taskForm, priority: v })}>
                <SelectTrigger className="bg-slate-800 border-slate-700"><SelectValue /></SelectTrigger>
                <SelectContent className="bg-slate-900 border-slate-800 text-white">
                  <SelectItem value="Low">Low</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="High">High</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs uppercase font-bold text-slate-500 tracking-wider">Story Points</Label>
              <Input type="number" value={taskForm.storyPoints} onChange={e => setTaskForm({ ...taskForm, storyPoints: parseInt(e.target.value) || 0 })} className="bg-slate-800 border-slate-700" />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs uppercase font-bold text-slate-500 tracking-wider">Est. Hours</Label>
              <Input type="number" step="0.5" value={taskForm.hours} onChange={e => setTaskForm({ ...taskForm, hours: parseFloat(e.target.value) || 0 })} className="bg-slate-800 border-slate-700" />
            </div>
            <div className="col-span-2 space-y-1.5">
              <Label className="text-xs uppercase font-bold text-slate-500 tracking-wider">Status</Label>
              <Select value={taskForm.status} onValueChange={v => setTaskForm({ ...taskForm, status: v })}>
                <SelectTrigger className="bg-slate-800 border-slate-700"><SelectValue /></SelectTrigger>
                <SelectContent className="bg-slate-900 border-slate-800 text-white">{activeSprint?.status.map(s => (<SelectItem key={s} value={s}>{s}</SelectItem>))}</SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter><Button onClick={handleCreateTask} className="bg-blue-600 hover:bg-blue-700 w-full font-bold">Create Task</Button></DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Epic Dialog */}
      <Dialog open={dialogType === 'epic'} onOpenChange={() => setDialogType(null)}>
        <DialogContent className="bg-slate-900 border-slate-800 text-white">
          <DialogHeader><DialogTitle>{isEditing ? 'Edit Epic' : 'New Epic'}</DialogTitle></DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-1"><Label>Title</Label><Input value={epicForm.title} onChange={e => setEpicForm({...epicForm, title: e.target.value})} className="bg-slate-800 border-slate-700"/></div>
            <div className="space-y-1"><Label>Description</Label><Textarea value={epicForm.description} onChange={e => setEpicForm({...epicForm, description: e.target.value})} className="bg-slate-800 border-slate-700"/></div>
          </div>
          <DialogFooter><Button onClick={handleSaveEpic} className="bg-blue-600 w-full">Save Epic</Button></DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Sprint Dialog */}
      <Dialog open={dialogType === 'sprint'} onOpenChange={() => setDialogType(null)}>
        <DialogContent className="bg-slate-900 border-slate-800 text-white max-w-md">
          <DialogHeader><DialogTitle>{isEditing ? 'Edit Sprint' : 'New Sprint'}</DialogTitle></DialogHeader>
          <div className="grid grid-cols-2 gap-4 py-2">
            <div className="col-span-2 space-y-1"><Label>Title *</Label><Input value={sprintForm.title} onChange={e => setSprintForm({ ...sprintForm, title: e.target.value })} className="bg-slate-800 border-slate-700"/></div>
            <div className="col-span-2 space-y-1"><Label>Description *</Label><Textarea value={sprintForm.description} onChange={e => setSprintForm({ ...sprintForm, description: e.target.value })} className="bg-slate-800 border-slate-700"/></div>
            <div className="space-y-1"><Label>Start Date</Label><Input type="datetime-local" value={sprintForm.startTime} onChange={e => setSprintForm({ ...sprintForm, startTime: e.target.value })} className="bg-slate-800 border-slate-700 text-xs"/></div>
            <div className="space-y-1"><Label>Expiry Date</Label><Input type="datetime-local" value={sprintForm.expiry} onChange={e => setSprintForm({ ...sprintForm, expiry: e.target.value })} className="bg-slate-800 border-slate-700 text-xs"/></div>
            <div className="col-span-2 space-y-1"><Label>Status Columns (Comma separated)</Label><Input value={sprintForm.status.join(',')} onChange={e => setSprintForm({ ...sprintForm, status: e.target.value.split(',').map(s => s.trim()) })} className="bg-slate-800 border-slate-700"/></div>
          </div>
          <DialogFooter><Button onClick={handleSaveSprint} className="bg-purple-600 w-full" disabled={!sprintForm.title.trim() || !sprintForm.description.trim()}>Save Sprint</Button></DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={dialogType === 'members'} onOpenChange={() => setDialogType(null)}>
        <DialogContent className="bg-slate-900 border-slate-800 text-white sm:max-w-[450px]">
          <DialogHeader><DialogTitle>Manage Board Members</DialogTitle></DialogHeader>
          <div className="space-y-6 py-4">
            <div className="space-y-2">
              <Label>Search Users</Label>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-500" />
                <Input placeholder="Enter name or email..." value={memberSearchQuery} onChange={e => setMemberSearchQuery(e.target.value)} className="pl-9 bg-slate-800 border-slate-700" />
              </div>
              {memberSearchResults.length > 0 && (
                <div className="mt-2 border border-slate-700 rounded-md bg-slate-800 max-h-48 overflow-y-auto">
                  {memberSearchResults.map(user => {
                    const isAlreadyMember = board.allowedUsers?.some(u => u.id === user.id);
                    return (
                      <div key={user.id} className="flex items-center justify-between p-3 border-b border-slate-700 last:border-0 hover:bg-slate-700 transition-colors">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8"><AvatarImage src={user.picture} /><AvatarFallback>{user.name}</AvatarFallback></Avatar>
                          <div className="flex flex-col"><span className="text-sm font-medium">{user.name}</span><span className="text-xs text-slate-400">{user.email}</span></div>
                        </div>
                        {isAlreadyMember ? <Check className="h-4 w-4 text-blue-500" /> : <Button size="sm" className="h-7 text-xs bg-blue-600" onClick={() => handleAddMemberToBoard(user.id)}>Add</Button>}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
            <div className="space-y-3">
              <Label className="text-slate-500">Current Members ({board.allowedUsers?.length || 0})</Label>
              <div className="space-y-2 max-h-48 overflow-y-auto pr-2">
                {board.allowedUsers?.map(user => (
                  <div key={user.id} className="flex items-center gap-3 p-2 rounded-lg bg-slate-800/50 border border-slate-700/50">
                    <Avatar className="h-8 w-8"><AvatarImage src={user.picture}/><AvatarFallback>{user.name}</AvatarFallback></Avatar>
                    <div className="flex-1 min-w-0"><p className="text-sm font-medium truncate">{user.name}</p><p className="text-xs text-slate-500 truncate">{user.email}</p></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <TaskDrawer task={selectedTask} availableStatus={activeSprint?.status || []} boardMembers={board.allowedUsers || []} onClose={() => setSelectedTask(null)} onTaskUpdate={handleTaskUpdate} />
    </DashboardLayout>
  );
};

export default BoardDetailPage;