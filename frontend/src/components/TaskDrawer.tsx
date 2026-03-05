// // // // // // // // // import { useState } from 'react';
// // // // // // // // // import { X, MessageSquare, Clock, CheckCircle2, Circle, AlertCircle } from 'lucide-react';
// // // // // // // // // import { cn } from '@/lib/utils';
// // // // // // // // // import type { Task, Subtask } from '@/types';
// // // // // // // // // import { PriorityBadge, AvatarInitials, StatusDot } from '@/components/TaskBadges';

// // // // // // // // // interface TaskDrawerProps {
// // // // // // // // //   task: Task | null;
// // // // // // // // //   availableStatus: string[];
// // // // // // // // //   onClose: () => void;
// // // // // // // // //   onStatusChange?: (taskId: number, status: string) => void;
// // // // // // // // // }

// // // // // // // // // export function TaskDrawer({ task, availableStatus, onClose, onStatusChange }: TaskDrawerProps) {
// // // // // // // // //   const [activeTab, setActiveTab] = useState<'details' | 'subtasks' | 'comments'>('details');

// // // // // // // // //   if (!task) return null;

// // // // // // // // //   const mockSubtasks: Subtask[] = [
// // // // // // // // //     { id: 1, taskId: task.id, title: 'Write unit tests', assigneeId: 1, assigneeName: 'Alex Chen', hours: 2, status: 'Done', createdAt: '2025-02-10', updatedAt: '2025-02-12' },
// // // // // // // // //     { id: 2, taskId: task.id, title: 'Update documentation', assigneeId: 2, assigneeName: 'Sarah Kim', hours: 1, status: 'Active', createdAt: '2025-02-11', updatedAt: '2025-02-13' },
// // // // // // // // //   ];

// // // // // // // // //   return (
// // // // // // // // //     <>
// // // // // // // // //       {/* Backdrop */}
// // // // // // // // //       <div className="fixed inset-0 bg-background/50 z-40" onClick={onClose} />

// // // // // // // // //       {/* Drawer */}
// // // // // // // // //       <div className="fixed right-0 top-0 h-full w-[480px] max-w-full bg-card border-l border-border z-50 flex flex-col animate-slide-in-right">
// // // // // // // // //         {/* Header */}
// // // // // // // // //         <div className="flex items-center justify-between px-5 py-3 border-b border-border">
// // // // // // // // //           <div className="flex items-center gap-2.5">
// // // // // // // // //             <StatusDot status={task.status} className="w-2.5 h-2.5" />
// // // // // // // // //             <span className="text-xs font-mono text-muted-foreground">TASK-{task.id}</span>
// // // // // // // // //           </div>
// // // // // // // // //           <button onClick={onClose} className="p-1 rounded hover:bg-muted transition-colors text-muted-foreground">
// // // // // // // // //             <X className="w-4 h-4" />
// // // // // // // // //           </button>
// // // // // // // // //         </div>

// // // // // // // // //         {/* Content */}
// // // // // // // // //         <div className="flex-1 overflow-y-auto scrollbar-thin">
// // // // // // // // //           <div className="px-5 py-4">
// // // // // // // // //             <h2 className="text-lg font-semibold text-foreground mb-1">{task.title}</h2>
// // // // // // // // //             <p className="text-sm text-muted-foreground leading-relaxed">{task.description || 'No description provided.'}</p>
// // // // // // // // //           </div>

// // // // // // // // //           {/* Meta grid */}
// // // // // // // // //           <div className="px-5 grid grid-cols-2 gap-3 pb-4">
// // // // // // // // //             <MetaField label="Status">
// // // // // // // // //               <select
// // // // // // // // //                 value={task.status}
// // // // // // // // //                 onChange={(e) => onStatusChange?.(task.id, e.target.value)}
// // // // // // // // //                 className="text-xs bg-muted rounded px-2 py-1 text-foreground border-0 focus:outline-none focus:ring-1 focus:ring-ring"
// // // // // // // // //               >
// // // // // // // // //                 {availableStatus.map((s) => (
// // // // // // // // //                   <option key={s} value={s}>{s}</option>
// // // // // // // // //                 ))}
// // // // // // // // //               </select>
// // // // // // // // //             </MetaField>
// // // // // // // // //             <MetaField label="Priority">
// // // // // // // // //               <PriorityBadge priority={task.priority} />
// // // // // // // // //             </MetaField>
// // // // // // // // //             <MetaField label="Assignee">
// // // // // // // // //               <div className="flex items-center gap-1.5">
// // // // // // // // //                 {task.assigneeName ? (
// // // // // // // // //                   <>
// // // // // // // // //                     <AvatarInitials name={task.assigneeName} />
// // // // // // // // //                     <span className="text-xs text-foreground">{task.assigneeName}</span>
// // // // // // // // //                   </>
// // // // // // // // //                 ) : (
// // // // // // // // //                   <span className="text-xs text-muted-foreground">Unassigned</span>
// // // // // // // // //                 )}
// // // // // // // // //               </div>
// // // // // // // // //             </MetaField>
// // // // // // // // //             <MetaField label="Story Points">
// // // // // // // // //               <span className="text-xs font-mono text-foreground">{task.storyPoints}</span>
// // // // // // // // //             </MetaField>
// // // // // // // // //             <MetaField label="Hours">
// // // // // // // // //               <span className="text-xs font-mono text-foreground">{task.hours}h</span>
// // // // // // // // //             </MetaField>
// // // // // // // // //           </div>

// // // // // // // // //           {/* Tabs */}
// // // // // // // // //           <div className="border-t border-border">
// // // // // // // // //             <div className="flex px-5 gap-4 pt-2">
// // // // // // // // //               {(['details', 'subtasks', 'comments'] as const).map((tab) => (
// // // // // // // // //                 <button
// // // // // // // // //                   key={tab}
// // // // // // // // //                   onClick={() => setActiveTab(tab)}
// // // // // // // // //                   className={cn(
// // // // // // // // //                     'text-xs pb-2 border-b-2 transition-colors capitalize',
// // // // // // // // //                     activeTab === tab
// // // // // // // // //                       ? 'border-primary text-foreground font-medium'
// // // // // // // // //                       : 'border-transparent text-muted-foreground hover:text-foreground'
// // // // // // // // //                   )}
// // // // // // // // //                 >
// // // // // // // // //                   {tab}
// // // // // // // // //                 </button>
// // // // // // // // //               ))}
// // // // // // // // //             </div>
// // // // // // // // //           </div>

// // // // // // // // //           <div className="px-5 py-3">
// // // // // // // // //             {activeTab === 'subtasks' && (
// // // // // // // // //               <div className="space-y-2">
// // // // // // // // //                 {mockSubtasks.map((sub) => (
// // // // // // // // //                   <div key={sub.id} className="flex items-center gap-2.5 p-2.5 rounded-md bg-muted/50 group">
// // // // // // // // //                     {sub.status === 'Done' ? (
// // // // // // // // //                       <CheckCircle2 className="w-4 h-4 text-success flex-shrink-0" />
// // // // // // // // //                     ) : (
// // // // // // // // //                       <Circle className="w-4 h-4 text-muted-foreground flex-shrink-0" />
// // // // // // // // //                     )}
// // // // // // // // //                     <span className={cn('text-sm flex-1', sub.status === 'Done' && 'line-through text-muted-foreground')}>
// // // // // // // // //                       {sub.title}
// // // // // // // // //                     </span>
// // // // // // // // //                     <span className="text-xs text-muted-foreground font-mono">{sub.hours}h</span>
// // // // // // // // //                     {sub.assigneeName && <AvatarInitials name={sub.assigneeName} />}
// // // // // // // // //                   </div>
// // // // // // // // //                 ))}
// // // // // // // // //               </div>
// // // // // // // // //             )}
// // // // // // // // //             {activeTab === 'details' && (
// // // // // // // // //               <div className="text-sm text-muted-foreground space-y-3">
// // // // // // // // //                 <div className="flex items-center gap-2 text-xs">
// // // // // // // // //                   <Clock className="w-3.5 h-3.5" />
// // // // // // // // //                   <span>Created {new Date(task.createdAt).toLocaleDateString()}</span>
// // // // // // // // //                 </div>
// // // // // // // // //                 <div className="flex items-center gap-2 text-xs">
// // // // // // // // //                   <AlertCircle className="w-3.5 h-3.5" />
// // // // // // // // //                   <span>Updated {new Date(task.updatedAt).toLocaleDateString()}</span>
// // // // // // // // //                 </div>
// // // // // // // // //               </div>
// // // // // // // // //             )}
// // // // // // // // //             {activeTab === 'comments' && (
// // // // // // // // //               <div className="space-y-3">
// // // // // // // // //                 <div className="text-xs text-muted-foreground text-center py-4">No comments yet</div>
// // // // // // // // //                 <div className="flex gap-2">
// // // // // // // // //                   <input
// // // // // // // // //                     type="text"
// // // // // // // // //                     placeholder="Write a comment…"
// // // // // // // // //                     className="flex-1 h-8 px-3 text-xs rounded-md border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
// // // // // // // // //                   />
// // // // // // // // //                   <button className="h-8 px-3 text-xs rounded-md bg-primary text-primary-foreground hover:opacity-90">
// // // // // // // // //                     <MessageSquare className="w-3.5 h-3.5" />
// // // // // // // // //                   </button>
// // // // // // // // //                 </div>
// // // // // // // // //               </div>
// // // // // // // // //             )}
// // // // // // // // //           </div>
// // // // // // // // //         </div>
// // // // // // // // //       </div>
// // // // // // // // //     </>
// // // // // // // // //   );
// // // // // // // // // }

// // // // // // // // // function MetaField({ label, children }: { label: string; children: React.ReactNode }) {
// // // // // // // // //   return (
// // // // // // // // //     <div className="space-y-1">
// // // // // // // // //       <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">{label}</span>
// // // // // // // // //       <div>{children}</div>
// // // // // // // // //     </div>
// // // // // // // // //   );
// // // // // // // // // }





































// // // // // // // // import { useState, useEffect } from 'react';
// // // // // // // // import { 
// // // // // // // //   X, MessageSquare, Clock, CheckCircle2, Circle, 
// // // // // // // //   AlertCircle, Plus, Paperclip, Send, Loader2, Edit2, Save 
// // // // // // // // } from 'lucide-react';
// // // // // // // // import { cn } from '@/lib/utils';
// // // // // // // // import type { Task, Subtask, Comment, User } from '@/types';
// // // // // // // // import { PriorityBadge, AvatarInitials, StatusDot } from '@/components/TaskBadges';
// // // // // // // // import api from '@/lib/api'; 
// // // // // // // // import { Button } from '@/components/ui/button';
// // // // // // // // import { Input } from '@/components/ui/input';
// // // // // // // // import { Textarea } from '@/components/ui/textarea';
// // // // // // // // import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// // // // // // // // interface TaskDrawerProps {
// // // // // // // //   task: Task | null;
// // // // // // // //   availableStatus: string[];
// // // // // // // //   boardMembers: User[];
// // // // // // // //   onClose: () => void;
// // // // // // // //   onTaskUpdate: (updatedTask: Task) => void;
// // // // // // // // }

// // // // // // // // export function TaskDrawer({ task, availableStatus, boardMembers, onClose, onTaskUpdate }: TaskDrawerProps) {
// // // // // // // //   const [activeTab, setActiveTab] = useState<'details' | 'subtasks' | 'comments'>('details');
  
// // // // // // // //   // Edit State
// // // // // // // //   const [isEditing, setIsEditing] = useState(false);
// // // // // // // //   const [editedTask, setEditedTask] = useState<Partial<Task>>({});
  
// // // // // // // //   // Data State
// // // // // // // //   const [subtasks, setSubtasks] = useState<Subtask[]>([]);
// // // // // // // //   const [comments, setComments] = useState<Comment[]>([]);
// // // // // // // //   const [newComment, setNewComment] = useState("");
// // // // // // // //   const [isUploading, setIsUploading] = useState(false);

// // // // // // // //   // Sync data when task opens
// // // // // // // //   useEffect(() => {
// // // // // // // //     if (task) {
// // // // // // // //       setEditedTask(task);
// // // // // // // //       setIsEditing(false);
// // // // // // // //       fetchSubtasks();
// // // // // // // //       fetchComments();
// // // // // // // //     }
// // // // // // // //   }, [task]);

// // // // // // // //   const fetchSubtasks = async () => {
// // // // // // // //     if (!task) return;
// // // // // // // //     try {
// // // // // // // //       const res = await api.get(`/api/tasks/${task.id}/subtasks`);
// // // // // // // //       if (res.data.success) setSubtasks(res.data.subtasks);
// // // // // // // //     } catch (err) { console.error("Subtasks fetch failed", err); }
// // // // // // // //   };

// // // // // // // //   const fetchComments = async () => {
// // // // // // // //     if (!task) return;
// // // // // // // //     try {
// // // // // // // //       const res = await api.get(`/api/tasks/${task.id}/comments`);
// // // // // // // //       if (res.data.success) setComments(res.data.comments);
// // // // // // // //     } catch (err) { console.error("Comments fetch failed", err); }
// // // // // // // //   };

// // // // // // // //   const handleUpdateTask = async () => {
// // // // // // // //     if (!task) return;
// // // // // // // //     try {
// // // // // // // //       // Put API call to update task details
// // // // // // // //       const res = await api.put(`/api/tasks/${task.id}`, editedTask);
// // // // // // // //       if (res.data.success) {
// // // // // // // //         onTaskUpdate(res.data.task);
// // // // // // // //         setIsEditing(false);
// // // // // // // //       }
// // // // // // // //     } catch (err) { console.error("Update failed", err); }
// // // // // // // //   };

// // // // // // // //   const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
// // // // // // // //     const file = e.target.files?.[0];
// // // // // // // //     if (!file) return;

// // // // // // // //     const formData = new FormData();
// // // // // // // //     formData.append('file', file);

// // // // // // // //     setIsUploading(true);
// // // // // // // //     try {
// // // // // // // //       // File upload to dev endpoint
// // // // // // // //       const res = await api.post('/dev/uploadData', formData, {
// // // // // // // //         headers: { 'Content-Type': 'multipart/form-data' }
// // // // // // // //       });
// // // // // // // //       if (res.data.success) {
// // // // // // // //         await handleAddComment(`Uploaded: ${file.name}`, res.data.filePath, file.name);
// // // // // // // //       }
// // // // // // // //     } catch (err) { console.error("Upload failed", err); } finally { setIsUploading(false); }
// // // // // // // //   };

// // // // // // // //   const handleAddComment = async (content: string, filePath?: string, fileName?: string) => {
// // // // // // // //     if (!task || (!content.trim() && !filePath)) return;
// // // // // // // //     try {
// // // // // // // //       const res = await api.post(`/api/tasks/${task.id}/comments`, {
// // // // // // // //         content,
// // // // // // // //         filePath,
// // // // // // // //         fileName
// // // // // // // //       });
// // // // // // // //       if (res.data.success) {
// // // // // // // //         setComments(prev => [...prev, res.data.comment]);
// // // // // // // //         setNewComment("");
// // // // // // // //       }
// // // // // // // //     } catch (err) { console.error("Comment failed", err); }
// // // // // // // //   };

// // // // // // // //   const toggleSubtask = async (sub: Subtask) => {
// // // // // // // //     const newStatus = sub.status === 'Done' ? 'Active' : 'Done';
// // // // // // // //     try {
// // // // // // // //       const res = await api.put(`/api/subtasks/${sub.id}`, { status: newStatus });
// // // // // // // //       if (res.data.success) {
// // // // // // // //         setSubtasks(prev => prev.map(s => s.id === sub.id ? { ...s, status: newStatus } : s));
// // // // // // // //       }
// // // // // // // //     } catch (err) { console.error(err); }
// // // // // // // //   };

// // // // // // // //   if (!task) return null;

// // // // // // // //   return (
// // // // // // // //     <>
// // // // // // // //       <div className="fixed inset-0 bg-background/50 z-40" onClick={onClose} />
// // // // // // // //       <div className="fixed right-0 top-0 h-full w-[500px] max-w-full bg-card border-l border-border z-50 flex flex-col shadow-2xl animate-in slide-in-from-right duration-300">
        
// // // // // // // //         {/* Header */}
// // // // // // // //         <div className="flex items-center justify-between px-5 py-3.5 border-b border-border">
// // // // // // // //           <div className="flex items-center gap-3">
// // // // // // // //             <StatusDot status={editedTask.status || task.status} className="w-2.5 h-2.5" />
// // // // // // // //             <span className="text-xs font-mono text-muted-foreground uppercase tracking-tight">TASK-{task.id}</span>
// // // // // // // //           </div>
// // // // // // // //           <div className="flex items-center gap-2">
// // // // // // // //             {isEditing ? (
// // // // // // // //               <Button size="sm" onClick={handleUpdateTask} className="h-7 text-xs bg-blue-600 hover:bg-blue-700">
// // // // // // // //                 <Save className="w-3 h-3 mr-1.5" /> Save Changes
// // // // // // // //               </Button>
// // // // // // // //             ) : (
// // // // // // // //               <button onClick={() => setIsEditing(true)} className="p-1.5 rounded hover:bg-muted text-muted-foreground transition-colors">
// // // // // // // //                 <Edit2 className="w-4 h-4" />
// // // // // // // //               </button>
// // // // // // // //             )}
// // // // // // // //             <button onClick={onClose} className="p-1.5 rounded hover:bg-muted text-muted-foreground"><X className="w-4 h-4" /></button>
// // // // // // // //           </div>
// // // // // // // //         </div>

// // // // // // // //         {/* Scrollable Content */}
// // // // // // // //         <div className="flex-1 overflow-y-auto scrollbar-none">
// // // // // // // //           <div className="px-5 py-5">
// // // // // // // //             {isEditing ? (
// // // // // // // //               <div className="space-y-4">
// // // // // // // //                 <Input 
// // // // // // // //                   value={editedTask.title} 
// // // // // // // //                   onChange={e => setEditedTask({...editedTask, title: e.target.value})}
// // // // // // // //                   className="text-lg font-semibold bg-muted/30 border-slate-800"
// // // // // // // //                 />
// // // // // // // //                 <Textarea 
// // // // // // // //                   value={editedTask.description || ''} 
// // // // // // // //                   onChange={e => setEditedTask({...editedTask, description: e.target.value})}
// // // // // // // //                   placeholder="Add a detailed description..."
// // // // // // // //                   className="min-h-[120px] bg-muted/30 border-slate-800 text-sm"
// // // // // // // //                 />
// // // // // // // //               </div>
// // // // // // // //             ) : (
// // // // // // // //               <>
// // // // // // // //                 <h2 className="text-xl font-semibold text-foreground mb-2 leading-tight">{task.title}</h2>
// // // // // // // //                 <p className="text-sm text-muted-foreground leading-relaxed">
// // // // // // // //                   {task.description || 'No description provided.'}
// // // // // // // //                 </p>
// // // // // // // //               </>
// // // // // // // //             )}
// // // // // // // //           </div>

// // // // // // // //           {/* Metadata Grid */}
// // // // // // // //           <div className="px-5 grid grid-cols-2 gap-x-8 gap-y-5 pb-6">
// // // // // // // //             <MetaField label="Status">
// // // // // // // //               <Select 
// // // // // // // //                 value={editedTask.status} 
// // // // // // // //                 onValueChange={(val) => {
// // // // // // // //                   setEditedTask({...editedTask, status: val});
// // // // // // // //                   if(!isEditing) handleUpdateTask(); 
// // // // // // // //                 }}
// // // // // // // //               >
// // // // // // // //                 <SelectTrigger className="h-8 bg-muted/50 border-none text-xs"><SelectValue /></SelectTrigger>
// // // // // // // //                 <SelectContent className="bg-slate-900 border-slate-800 text-white">
// // // // // // // //                   {availableStatus.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
// // // // // // // //                 </SelectContent>
// // // // // // // //               </Select>
// // // // // // // //             </MetaField>

// // // // // // // //             <MetaField label="Priority">
// // // // // // // //               <Select 
// // // // // // // //                 value={editedTask.priority} 
// // // // // // // //                 onValueChange={(val) => {
// // // // // // // //                   setEditedTask({...editedTask, priority: val as any});
// // // // // // // //                   if(!isEditing) handleUpdateTask(); 
// // // // // // // //                 }}
// // // // // // // //               >
// // // // // // // //                 <SelectTrigger className="h-8 bg-muted/50 border-none text-xs"><SelectValue /></SelectTrigger>
// // // // // // // //                 <SelectContent className="bg-slate-900 border-slate-800 text-white">
// // // // // // // //                   {['Low', 'Medium', 'High'].map(p => <SelectItem key={p} value={p}>{p}</SelectItem>)}
// // // // // // // //                 </SelectContent>
// // // // // // // //               </Select>
// // // // // // // //             </MetaField>

// // // // // // // //             <MetaField label="Assignee">
// // // // // // // //               <Select 
// // // // // // // //                 value={editedTask.assigneeId?.toString()} 
// // // // // // // //                 onValueChange={(val) => {
// // // // // // // //                   setEditedTask({...editedTask, assigneeId: parseInt(val)});
// // // // // // // //                   if(!isEditing) handleUpdateTask(); 
// // // // // // // //                 }}
// // // // // // // //               >
// // // // // // // //                 <SelectTrigger className="h-8 bg-muted/50 border-none text-xs">
// // // // // // // //                   <SelectValue placeholder="Unassigned" />
// // // // // // // //                 </SelectTrigger>
// // // // // // // //                 <SelectContent className="bg-slate-900 border-slate-800 text-white">
// // // // // // // //                   {boardMembers.map(m => <SelectItem key={m.id} value={m.id.toString()}>{m.name}</SelectItem>)}
// // // // // // // //                 </SelectContent>
// // // // // // // //               </Select>
// // // // // // // //             </MetaField>

// // // // // // // //             <MetaField label="Metrics">
// // // // // // // //               <div className="flex items-center gap-3 text-xs font-mono">
// // // // // // // //                 <span className="bg-muted/50 px-2 py-1 rounded">{task.storyPoints || 0} SP</span>
// // // // // // // //                 <span className="bg-muted/50 px-2 py-1 rounded">{task.hours || 0}h</span>
// // // // // // // //               </div>
// // // // // // // //             </MetaField>
// // // // // // // //           </div>

// // // // // // // //           {/* Navigation Tabs */}
// // // // // // // //           <div className="border-t border-border mt-2">
// // // // // // // //             <div className="flex px-5 gap-6">
// // // // // // // //               {(['details', 'subtasks', 'comments'] as const).map((tab) => (
// // // // // // // //                 <button
// // // // // // // //                   key={tab}
// // // // // // // //                   onClick={() => setActiveTab(tab)}
// // // // // // // //                   className={cn(
// // // // // // // //                     'text-xs py-3 border-b-2 transition-all capitalize font-medium',
// // // // // // // //                     activeTab === tab 
// // // // // // // //                       ? 'border-primary text-foreground' 
// // // // // // // //                       : 'border-transparent text-muted-foreground hover:text-foreground'
// // // // // // // //                   )}
// // // // // // // //                 >
// // // // // // // //                   {tab} {tab === 'subtasks' ? `(${subtasks.length})` : tab === 'comments' ? `(${comments.length})` : ''}
// // // // // // // //                 </button>
// // // // // // // //               ))}
// // // // // // // //             </div>
// // // // // // // //           </div>

// // // // // // // //           <div className="px-5 py-4">
// // // // // // // //             {activeTab === 'subtasks' && (
// // // // // // // //               <div className="space-y-2.5">
// // // // // // // //                 {subtasks.map((sub) => (
// // // // // // // //                   <div key={sub.id} className="flex items-center gap-3 p-3 rounded-lg bg-muted/30 border border-transparent hover:border-border group transition-all">
// // // // // // // //                     <button onClick={() => toggleSubtask(sub)} className="transition-transform active:scale-90">
// // // // // // // //                       {sub.status === 'Done' ? (
// // // // // // // //                         <CheckCircle2 className="w-5 h-5 text-green-500" />
// // // // // // // //                       ) : (
// // // // // // // //                         <Circle className="w-5 h-5 text-muted-foreground" />
// // // // // // // //                       )}
// // // // // // // //                     </button>
// // // // // // // //                     <span className={cn('text-sm flex-1', sub.status === 'Done' && 'line-through text-muted-foreground')}>
// // // // // // // //                       {sub.title}
// // // // // // // //                     </span>
// // // // // // // //                     <div className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2">
// // // // // // // //                        <span className="text-[10px] font-mono text-muted-foreground">{sub.hours}h</span>
// // // // // // // //                        <AvatarInitials name={sub.assigneeName || ''} />
// // // // // // // //                     </div>
// // // // // // // //                   </div>
// // // // // // // //                 ))}
// // // // // // // //                 <Button variant="ghost" size="sm" className="w-full justify-start text-muted-foreground h-9 mt-2 hover:bg-muted/50">
// // // // // // // //                   <Plus className="w-4 h-4 mr-2" /> Add Subtask
// // // // // // // //                 </Button>
// // // // // // // //               </div>
// // // // // // // //             )}

// // // // // // // //             {activeTab === 'details' && (
// // // // // // // //               <div className="space-y-4 pt-1">
// // // // // // // //                 <div className="flex items-center gap-3 text-xs text-muted-foreground">
// // // // // // // //                   <Clock className="w-3.5 h-3.5" />
// // // // // // // //                   <span>Created {new Date(task.createdAt).toLocaleString()}</span>
// // // // // // // //                 </div>
// // // // // // // //                 <div className="flex items-center gap-3 text-xs text-muted-foreground">
// // // // // // // //                   <AlertCircle className="w-3.5 h-3.5" />
// // // // // // // //                   <span>Last updated {new Date(task.updatedAt).toLocaleString()}</span>
// // // // // // // //                 </div>
// // // // // // // //               </div>
// // // // // // // //             )}

// // // // // // // //             {activeTab === 'comments' && (
// // // // // // // //               <div className="space-y-5">
// // // // // // // //                 <div className="space-y-4 max-h-[320px] overflow-y-auto pr-2 scrollbar-none">
// // // // // // // //                   {comments.length === 0 ? (
// // // // // // // //                     <div className="text-xs text-muted-foreground text-center py-10">No discussion yet.</div>
// // // // // // // //                   ) : (
// // // // // // // //                     comments.map(c => (
// // // // // // // //                       <div key={c.id} className="flex gap-3">
// // // // // // // //                         <AvatarInitials name={c.userName || 'U'} />
// // // // // // // //                         <div className="flex-1 bg-muted/30 p-3 rounded-xl rounded-tl-none text-sm border border-border/50">
// // // // // // // //                           <div className="flex justify-between items-center mb-1.5">
// // // // // // // //                             <span className="font-bold text-[11px] uppercase tracking-wider">{c.userName}</span>
// // // // // // // //                             <span className="text-[10px] text-muted-foreground">{new Date(c.createdAt).toLocaleDateString()}</span>
// // // // // // // //                           </div>
// // // // // // // //                           <p className="text-slate-300 leading-relaxed">{c.content}</p>
// // // // // // // //                           {c.filePath && (
// // // // // // // //                             <a href={`http://localhost:4000${c.filePath}`} target="_blank" rel="noopener noreferrer" 
// // // // // // // //                                className="flex items-center gap-2 mt-3 p-2 bg-background/50 rounded-lg border border-border text-[11px] text-blue-400 hover:text-blue-300 transition-colors">
// // // // // // // //                               <Paperclip className="w-3 h-3" /> {c.fileName || 'Attachment'}
// // // // // // // //                             </a>
// // // // // // // //                           )}
// // // // // // // //                         </div>
// // // // // // // //                       </div>
// // // // // // // //                     ))
// // // // // // // //                   )}
// // // // // // // //                 </div>
                
// // // // // // // //                 {/* Comment Input */}
// // // // // // // //                 <div className="pt-4 border-t border-border">
// // // // // // // //                   <div className="relative group">
// // // // // // // //                     <Textarea 
// // // // // // // //                       placeholder="Share an update or feedback..." 
// // // // // // // //                       value={newComment}
// // // // // // // //                       onChange={e => setNewComment(e.target.value)}
// // // // // // // //                       className="pr-20 min-h-[90px] bg-muted/20 border-slate-800 focus:border-primary/50 transition-all text-sm"
// // // // // // // //                     />
// // // // // // // //                     <div className="absolute right-2 bottom-2 flex gap-1.5">
// // // // // // // //                       <label className="cursor-pointer p-2 hover:bg-muted rounded-md transition-colors group/upload">
// // // // // // // //                         <input type="file" className="hidden" onChange={handleFileUpload} disabled={isUploading} />
// // // // // // // //                         {isUploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Paperclip className="w-4 h-4 text-muted-foreground group-hover/upload:text-foreground" />}
// // // // // // // //                       </label>
// // // // // // // //                       <button 
// // // // // // // //                         onClick={() => handleAddComment(newComment)}
// // // // // // // //                         disabled={!newComment.trim() && !isUploading}
// // // // // // // //                         className="p-2 bg-primary text-primary-foreground rounded-md disabled:opacity-50 hover:opacity-90 transition-opacity"
// // // // // // // //                       >
// // // // // // // //                         <Send className="w-4 h-4" />
// // // // // // // //                       </button>
// // // // // // // //                     </div>
// // // // // // // //                   </div>
// // // // // // // //                 </div>
// // // // // // // //               </div>
// // // // // // // //             )}
// // // // // // // //           </div>
// // // // // // // //         </div>
// // // // // // // //       </div>
// // // // // // // //     </>
// // // // // // // //   );
// // // // // // // // }

// // // // // // // // function MetaField({ label, children }: { label: string; children: React.ReactNode }) {
// // // // // // // //   return (
// // // // // // // //     <div className="space-y-1.5">
// // // // // // // //       <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold">{label}</span>
// // // // // // // //       <div className="w-full">{children}</div>
// // // // // // // //     </div>
// // // // // // // //   );
// // // // // // // // }




























// // // // // // // import { useState, useEffect } from 'react';
// // // // // // // import { 
// // // // // // //   X, MessageSquare, Clock, CheckCircle2, Circle, 
// // // // // // //   AlertCircle, Plus, Paperclip, Send, Loader2, Edit2, Save 
// // // // // // // } from 'lucide-react';
// // // // // // // import { cn } from '@/lib/utils';
// // // // // // // import type { Task, Subtask, Comment, User } from '@/types';
// // // // // // // import { PriorityBadge, AvatarInitials, StatusDot } from '@/components/TaskBadges';
// // // // // // // import api from '@/lib/api'; 
// // // // // // // import { Button } from '@/components/ui/button';
// // // // // // // import { Input } from '@/components/ui/input';
// // // // // // // import { Textarea } from '@/components/ui/textarea';
// // // // // // // import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
// // // // // // // import { Label } from '@/components/ui/label';

// // // // // // // interface TaskDrawerProps {
// // // // // // //   task: Task | null;
// // // // // // //   availableStatus: string[];
// // // // // // //   boardMembers: User[];
// // // // // // //   onClose: () => void;
// // // // // // //   onTaskUpdate: (updatedTask: Task) => void;
// // // // // // // }

// // // // // // // export function TaskDrawer({ task, availableStatus, boardMembers, onClose, onTaskUpdate }: TaskDrawerProps) {
// // // // // // //   const [activeTab, setActiveTab] = useState<'details' | 'subtasks' | 'comments'>('details');
// // // // // // //   const [isEditing, setIsEditing] = useState(false);
// // // // // // //   const [editedTask, setEditedTask] = useState<Partial<Task>>({});
// // // // // // //   const [subtasks, setSubtasks] = useState<Subtask[]>([]);
// // // // // // //   const [comments, setComments] = useState<Comment[]>([]);
// // // // // // //   const [newComment, setNewComment] = useState("");
// // // // // // //   const [isUploading, setIsUploading] = useState(false);

// // // // // // //   useEffect(() => {
// // // // // // //     if (task) {
// // // // // // //       setEditedTask(task);
// // // // // // //       setIsEditing(false);
// // // // // // //       fetchSubtasks();
// // // // // // //       fetchComments();
// // // // // // //     }
// // // // // // //   }, [task]);

// // // // // // //   const fetchSubtasks = async () => {
// // // // // // //     if (!task) return;
// // // // // // //     try {
// // // // // // //       const res = await api.get(`/api/tasks/${task.id}/subtasks`);
// // // // // // //       if (res.data.success) setSubtasks(res.data.subtasks);
// // // // // // //     } catch (err) { console.error("Subtasks fetch failed", err); }
// // // // // // //   };

// // // // // // //   const fetchComments = async () => {
// // // // // // //     if (!task) return;
// // // // // // //     try {
// // // // // // //       const res = await api.get(`/api/tasks/${task.id}/comments`);
// // // // // // //       if (res.data.success) setComments(res.data.comments);
// // // // // // //     } catch (err) { console.error("Comments fetch failed", err); }
// // // // // // //   };

// // // // // // //   const handleUpdateTask = async () => {
// // // // // // //     if (!task) return;
// // // // // // //     try {
// // // // // // //       const res = await api.put(`/api/tasks/${task.id}`, editedTask);
// // // // // // //       if (res.data.success) {
// // // // // // //         onTaskUpdate(res.data.task);
// // // // // // //         setIsEditing(false);
// // // // // // //       }
// // // // // // //     } catch (err) { console.error("Update failed", err); }
// // // // // // //   };

// // // // // // //   const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
// // // // // // //     const file = e.target.files?.[0];
// // // // // // //     if (!file) return;
// // // // // // //     const formData = new FormData();
// // // // // // //     formData.append('file', file);
// // // // // // //     setIsUploading(true);
// // // // // // //     try {
// // // // // // //       const res = await api.post('/dev/uploadData', formData, {
// // // // // // //         headers: { 'Content-Type': 'multipart/form-data' }
// // // // // // //       });
// // // // // // //       if (res.data.success) {
// // // // // // //         await handleAddComment(`Uploaded: ${file.name}`, res.data.filePath, file.name);
// // // // // // //       }
// // // // // // //     } catch (err) { console.error("Upload failed", err); } finally { setIsUploading(false); }
// // // // // // //   };

// // // // // // //   const handleAddComment = async (content: string, filePath?: string, fileName?: string) => {
// // // // // // //     if (!task || (!content.trim() && !filePath)) return;
// // // // // // //     try {
// // // // // // //       const res = await api.post(`/api/tasks/${task.id}/comments`, {
// // // // // // //         content,
// // // // // // //         filePath,
// // // // // // //         fileName
// // // // // // //       });
// // // // // // //       if (res.data.success) {
// // // // // // //         setComments(prev => [...prev, res.data.comment]);
// // // // // // //         setNewComment("");
// // // // // // //       }
// // // // // // //     } catch (err) { console.error("Comment failed", err); }
// // // // // // //   };

// // // // // // //   if (!task) return null;

// // // // // // //   return (
// // // // // // //     <>
// // // // // // //       <div className="fixed inset-0 bg-background/60 backdrop-blur-sm z-40 transition-opacity" onClick={onClose} />
// // // // // // //       <div className="fixed right-0 top-0 h-full w-[500px] max-w-full bg-slate-950 border-l border-slate-800 z-50 flex flex-col shadow-2xl animate-in slide-in-from-right duration-300">
        
// // // // // // //         {/* Header */}
// // // // // // //         <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800">
// // // // // // //           <div className="flex items-center gap-3">
// // // // // // //             <StatusDot status={editedTask.status || task.status} className="w-2.5 h-2.5" />
// // // // // // //             <span className="text-xs font-mono text-slate-500 uppercase tracking-wider">TASK-{task.id}</span>
// // // // // // //           </div>
// // // // // // //           <div className="flex items-center gap-2">
// // // // // // //             {isEditing ? (
// // // // // // //               <Button size="sm" onClick={handleUpdateTask} className="h-8 bg-blue-600 hover:bg-blue-700 text-white">
// // // // // // //                 <Save className="w-3.5 h-3.5 mr-2" /> Save
// // // // // // //               </Button>
// // // // // // //             ) : (
// // // // // // //               <button onClick={() => setIsEditing(true)} className="p-2 rounded-md hover:bg-slate-900 text-slate-400 transition-colors">
// // // // // // //                 <Edit2 className="w-4 h-4" />
// // // // // // //               </button>
// // // // // // //             )}
// // // // // // //             <button onClick={onClose} className="p-2 rounded-md hover:bg-slate-900 text-slate-400"><X className="w-5 h-5" /></button>
// // // // // // //           </div>
// // // // // // //         </div>

// // // // // // //         {/* Content Section */}
// // // // // // //         <div className="flex-1 overflow-y-auto scrollbar-none p-6">
// // // // // // //           <div className="mb-8">
// // // // // // //             {isEditing ? (
// // // // // // //               <div className="space-y-4">
// // // // // // //                 <Input 
// // // // // // //                   value={editedTask.title} 
// // // // // // //                   onChange={e => setEditedTask({...editedTask, title: e.target.value})}
// // // // // // //                   className="text-lg font-bold bg-slate-900 border-slate-800 text-slate-100 placeholder:text-slate-600 focus-visible:ring-blue-500"
// // // // // // //                 />
// // // // // // //                 <Textarea 
// // // // // // //                   value={editedTask.description || ''} 
// // // // // // //                   onChange={e => setEditedTask({...editedTask, description: e.target.value})}
// // // // // // //                   placeholder="Add a detailed description..."
// // // // // // //                   className="min-h-[120px] bg-slate-900 border-slate-800 text-slate-300 text-sm placeholder:text-slate-600 focus-visible:ring-blue-500"
// // // // // // //                 />
// // // // // // //               </div>
// // // // // // //             ) : (
// // // // // // //               <>
// // // // // // //                 <h2 className="text-2xl font-bold text-slate-100 mb-3 leading-tight">{task.title}</h2>
// // // // // // //                 <p className="text-sm text-slate-400 leading-relaxed">
// // // // // // //                   {task.description || 'No description provided.'}
// // // // // // //                 </p>
// // // // // // //               </>
// // // // // // //             )}
// // // // // // //           </div>

// // // // // // //           {/* Info Grid */}
// // // // // // //           <div className="grid grid-cols-2 gap-x-8 gap-y-6 mb-8 bg-slate-900/40 p-5 rounded-xl border border-slate-800/50">
// // // // // // //             <MetaField label="Status">
// // // // // // //               <Select 
// // // // // // //                 value={editedTask.status} 
// // // // // // //                 onValueChange={(val) => {
// // // // // // //                   setEditedTask({...editedTask, status: val});
// // // // // // //                   if(!isEditing) handleUpdateTask(); 
// // // // // // //                 }}
// // // // // // //               >
// // // // // // //                 <SelectTrigger className="h-9 bg-slate-950 border-slate-800 text-slate-200 text-xs shadow-sm">
// // // // // // //                   <SelectValue />
// // // // // // //                 </SelectTrigger>
// // // // // // //                 <SelectContent className="bg-slate-900 border-slate-800 text-slate-200">
// // // // // // //                   {availableStatus.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
// // // // // // //                 </SelectContent>
// // // // // // //               </Select>
// // // // // // //             </MetaField>

// // // // // // //             <MetaField label="Priority">
// // // // // // //               <Select 
// // // // // // //                 value={editedTask.priority} 
// // // // // // //                 onValueChange={(val) => {
// // // // // // //                   setEditedTask({...editedTask, priority: val as any});
// // // // // // //                   if(!isEditing) handleUpdateTask(); 
// // // // // // //                 }}
// // // // // // //               >
// // // // // // //                 <SelectTrigger className="h-9 bg-slate-950 border-slate-800 text-slate-200 text-xs shadow-sm">
// // // // // // //                   <SelectValue />
// // // // // // //                 </SelectTrigger>
// // // // // // //                 <SelectContent className="bg-slate-900 border-slate-800 text-slate-200">
// // // // // // //                   {['Low', 'Medium', 'High'].map(p => <SelectItem key={p} value={p}>{p}</SelectItem>)}
// // // // // // //                 </SelectContent>
// // // // // // //               </Select>
// // // // // // //             </MetaField>

// // // // // // //             <MetaField label="Assignee">
// // // // // // //               <Select 
// // // // // // //                 value={editedTask.assigneeId?.toString()} 
// // // // // // //                 onValueChange={(val) => {
// // // // // // //                   setEditedTask({...editedTask, assigneeId: parseInt(val)});
// // // // // // //                   if(!isEditing) handleUpdateTask(); 
// // // // // // //                 }}
// // // // // // //               >
// // // // // // //                 <SelectTrigger className="h-9 bg-slate-950 border-slate-800 text-slate-200 text-xs shadow-sm">
// // // // // // //                   <SelectValue placeholder="Unassigned" />
// // // // // // //                 </SelectTrigger>
// // // // // // //                 <SelectContent className="bg-slate-900 border-slate-800 text-slate-200">
// // // // // // //                   {boardMembers.map(m => <SelectItem key={m.id} value={m.id.toString()}>{m.name}</SelectItem>)}
// // // // // // //                 </SelectContent>
// // // // // // //               </Select>
// // // // // // //             </MetaField>

// // // // // // //             <MetaField label="Story Points">
// // // // // // //               <div className="h-9 flex items-center px-3 bg-slate-950/50 border border-slate-800 rounded-md text-slate-300 text-xs font-mono">
// // // // // // //                 {task.storyPoints || 0} SP
// // // // // // //               </div>
// // // // // // //             </MetaField>
// // // // // // //           </div>

// // // // // // //           {/* Tabs */}
// // // // // // //           <div className="space-y-6">
// // // // // // //             <div className="flex gap-8 border-b border-slate-800">
// // // // // // //               {(['details', 'subtasks', 'comments'] as const).map((tab) => (
// // // // // // //                 <button
// // // // // // //                   key={tab}
// // // // // // //                   onClick={() => setActiveTab(tab)}
// // // // // // //                   className={cn(
// // // // // // //                     'text-xs py-3 border-b-2 transition-all capitalize font-semibold tracking-wide',
// // // // // // //                     activeTab === tab 
// // // // // // //                       ? 'border-blue-500 text-slate-100' 
// // // // // // //                       : 'border-transparent text-slate-500 hover:text-slate-300'
// // // // // // //                   )}
// // // // // // //                 >
// // // // // // //                   {tab} {tab === 'subtasks' ? `(${subtasks.length})` : tab === 'comments' ? `(${comments.length})` : ''}
// // // // // // //                 </button>
// // // // // // //               ))}
// // // // // // //             </div>

// // // // // // //             <div className="pb-10">
// // // // // // //               {activeTab === 'subtasks' && (
// // // // // // //                 <div className="space-y-3">
// // // // // // //                   {subtasks.map((sub) => (
// // // // // // //                     <div key={sub.id} className="flex items-center gap-4 p-4 rounded-xl bg-slate-900/50 border border-slate-800 group transition-all hover:bg-slate-900">
// // // // // // //                       <button className="text-slate-500 hover:text-green-500">
// // // // // // //                         {sub.status === 'Done' ? <CheckCircle2 className="w-5 h-5 text-green-500" /> : <Circle className="w-5 h-5" />}
// // // // // // //                       </button>
// // // // // // //                       <span className={cn('text-sm flex-1 text-slate-200', sub.status === 'Done' && 'line-through text-slate-600')}>
// // // // // // //                         {sub.title}
// // // // // // //                       </span>
// // // // // // //                       <AvatarInitials name={sub.assigneeName || ''} />
// // // // // // //                     </div>
// // // // // // //                   ))}
// // // // // // //                   <Button variant="ghost" className="w-full justify-start text-slate-500 hover:text-slate-200 h-10 border border-dashed border-slate-800 hover:border-slate-700">
// // // // // // //                     <Plus className="w-4 h-4 mr-2" /> Add Subtask
// // // // // // //                   </Button>
// // // // // // //                 </div>
// // // // // // //               )}

// // // // // // //               {activeTab === 'details' && (
// // // // // // //                 <div className="space-y-5 pt-2">
// // // // // // //                   <div className="flex items-center gap-3 text-xs text-slate-500">
// // // // // // //                     <Clock className="w-4 h-4" />
// // // // // // //                     <span>Created on {new Date(task.createdAt).toLocaleDateString(undefined, { dateStyle: 'long' })}</span>
// // // // // // //                   </div>
// // // // // // //                   <div className="flex items-center gap-3 text-xs text-slate-500">
// // // // // // //                     <AlertCircle className="w-4 h-4" />
// // // // // // //                     <span>Last modified {new Date(task.updatedAt).toLocaleDateString(undefined, { dateStyle: 'long' })}</span>
// // // // // // //                   </div>
// // // // // // //                 </div>
// // // // // // //               )}

// // // // // // //               {activeTab === 'comments' && (
// // // // // // //                 <div className="space-y-6">
// // // // // // //                   <div className="space-y-5 max-h-[400px] overflow-y-auto pr-2 scrollbar-none">
// // // // // // //                     {comments.length === 0 ? (
// // // // // // //                       <div className="text-xs text-slate-600 text-center py-12">No activity yet. Start the conversation!</div>
// // // // // // //                     ) : (
// // // // // // //                       comments.map(c => (
// // // // // // //                         <div key={c.id} className="flex gap-4">
// // // // // // //                           <AvatarInitials name={c.userName || 'U'} />
// // // // // // //                           <div className="flex-1 bg-slate-900/80 p-4 rounded-2xl rounded-tl-none border border-slate-800">
// // // // // // //                             <div className="flex justify-between items-center mb-2">
// // // // // // //                               <span className="font-bold text-[10px] uppercase text-blue-400 tracking-widest">{c.userName}</span>
// // // // // // //                               <span className="text-[10px] text-slate-500">{new Date(c.createdAt).toLocaleDateString()}</span>
// // // // // // //                             </div>
// // // // // // //                             <p className="text-slate-300 text-sm leading-relaxed">{c.content}</p>
// // // // // // //                             {c.filePath && (
// // // // // // //                               <a href={`http://localhost:4000${c.filePath}`} target="_blank" rel="noopener noreferrer" 
// // // // // // //                                  className="flex items-center gap-2 mt-3 p-2 bg-slate-950 rounded-lg border border-slate-800 text-[11px] text-slate-400 hover:text-white transition-colors">
// // // // // // //                                 <Paperclip className="w-3.5 h-3.5" /> {c.fileName || 'Attachment'}
// // // // // // //                               </a>
// // // // // // //                             )}
// // // // // // //                           </div>
// // // // // // //                         </div>
// // // // // // //                       ))
// // // // // // //                     )}
// // // // // // //                   </div>
                  
// // // // // // //                   <div className="relative pt-4">
// // // // // // //                     <Textarea 
// // // // // // //                       placeholder="Add a comment or share an update..." 
// // // // // // //                       value={newComment}
// // // // // // //                       onChange={e => setNewComment(e.target.value)}
// // // // // // //                       className="pr-24 min-h-[100px] bg-slate-900 border-slate-800 text-slate-200 text-sm focus-visible:ring-blue-500"
// // // // // // //                     />
// // // // // // //                     <div className="absolute right-3 bottom-3 flex gap-2">
// // // // // // //                       <label className="cursor-pointer p-2 hover:bg-slate-800 rounded-md text-slate-500 hover:text-slate-200">
// // // // // // //                         <input type="file" className="hidden" onChange={handleFileUpload} disabled={isUploading} />
// // // // // // //                         {isUploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Paperclip className="w-4 h-4" />}
// // // // // // //                       </label>
// // // // // // //                       <Button 
// // // // // // //                         onClick={() => handleAddComment(newComment)}
// // // // // // //                         disabled={!newComment.trim() && !isUploading}
// // // // // // //                         className="h-8 px-3 bg-blue-600 hover:bg-blue-700"
// // // // // // //                       >
// // // // // // //                         <Send className="w-3.5 h-3.5" />
// // // // // // //                       </Button>
// // // // // // //                     </div>
// // // // // // //                   </div>
// // // // // // //                 </div>
// // // // // // //               )}
// // // // // // //             </div>
// // // // // // //           </div>
// // // // // // //         </div>
// // // // // // //       </div>
// // // // // // //     </>
// // // // // // //   );
// // // // // // // }

// // // // // // // function MetaField({ label, children }: { label: string; children: React.ReactNode }) {
// // // // // // //   return (
// // // // // // //     <div className="space-y-2">
// // // // // // //       <span className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">{label}</span>
// // // // // // //       <div className="w-full">{children}</div>
// // // // // // //     </div>
// // // // // // //   );
// // // // // // // }









// // // // // // import { useState, useEffect } from 'react';
// // // // // // import { 
// // // // // //   X, MessageSquare, Clock, CheckCircle2, Circle, 
// // // // // //   AlertCircle, Plus, Paperclip, Send, Loader2, Edit2, Save, User as UserIcon 
// // // // // // } from 'lucide-react';
// // // // // // import { cn } from '@/lib/utils';
// // // // // // import type { Task, Subtask, Comment, User } from '@/types';
// // // // // // import { PriorityBadge, AvatarInitials, StatusDot } from '@/components/TaskBadges';
// // // // // // import api from '@/lib/api'; 
// // // // // // import { Button } from '@/components/ui/button';
// // // // // // import { Input } from '@/components/ui/input';
// // // // // // import { Textarea } from '@/components/ui/textarea';
// // // // // // import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
// // // // // // import { Label } from '@/components/ui/label';

// // // // // // interface TaskDrawerProps {
// // // // // //   task: Task | null;
// // // // // //   availableStatus: string[];
// // // // // //   boardMembers: User[];
// // // // // //   onClose: () => void;
// // // // // //   onTaskUpdate: (updatedTask: Task) => void;
// // // // // // }

// // // // // // export function TaskDrawer({ task, availableStatus, boardMembers, onClose, onTaskUpdate }: TaskDrawerProps) {
// // // // // //   const [activeTab, setActiveTab] = useState<'details' | 'subtasks' | 'comments'>('details');
// // // // // //   const [isEditing, setIsEditing] = useState(false);
// // // // // //   const [editedTask, setEditedTask] = useState<Partial<Task>>({});
  
// // // // // //   // Subtasks & Comments Data
// // // // // //   const [subtasks, setSubtasks] = useState<Subtask[]>([]);
// // // // // //   const [comments, setComments] = useState<Comment[]>([]);
  
// // // // // //   // Forms & State
// // // // // //   const [newComment, setNewComment] = useState("");
// // // // // //   const [isUploading, setIsUploading] = useState(false);
// // // // // //   const [isAddingSubtask, setIsAddingSubtask] = useState(false);
// // // // // //   const [subtaskForm, setSubtaskForm] = useState({
// // // // // //     title: '',
// // // // // //     description: '',
// // // // // //     assigneeId: '',
// // // // // //     hours: 0
// // // // // //   });

// // // // // //   useEffect(() => {
// // // // // //     if (task) {
// // // // // //       setEditedTask(task);
// // // // // //       setIsEditing(false);
// // // // // //       setIsAddingSubtask(false);
// // // // // //       fetchSubtasks();
// // // // // //       fetchComments();
// // // // // //     }
// // // // // //   }, [task]);

// // // // // //   const fetchSubtasks = async () => {
// // // // // //     if (!task) return;
// // // // // //     try {
// // // // // //       const res = await api.get(`/api/tasks/${task.id}/subtasks`);
// // // // // //       if (res.data.success) setSubtasks(res.data.subtasks);
// // // // // //     } catch (err) { console.error("Subtasks fetch failed", err); }
// // // // // //   };

// // // // // //   const fetchComments = async () => {
// // // // // //     if (!task) return;
// // // // // //     try {
// // // // // //       const res = await api.get(`/api/tasks/${task.id}/comments`);
// // // // // //       if (res.data.success) setComments(res.data.comments);
// // // // // //     } catch (err) { console.error("Comments fetch failed", err); }
// // // // // //   };

// // // // // //   const handleUpdateTask = async () => {
// // // // // //     if (!task) return;
// // // // // //     try {
// // // // // //       const res = await api.put(`/api/tasks/${task.id}`, editedTask);
// // // // // //       if (res.data.success) {
// // // // // //         onTaskUpdate(res.data.task);
// // // // // //         setIsEditing(false);
// // // // // //       }
// // // // // //     } catch (err) { console.error("Update failed", err); }
// // // // // //   };

// // // // // //   // Subtask Handlers
// // // // // //   const handleAddSubtask = async () => {
// // // // // //     if (!task || !subtaskForm.title.trim()) return;
// // // // // //     try {
// // // // // //       const res = await api.post(`/api/tasks/${task.id}/subtasks`, {
// // // // // //         ...subtaskForm,
// // // // // //         assigneeId: subtaskForm.assigneeId ? parseInt(subtaskForm.assigneeId) : null,
// // // // // //         hours: parseFloat(subtaskForm.hours.toString()) || 0
// // // // // //       });
// // // // // //       if (res.data.success) {
// // // // // //         setSubtasks(prev => [...prev, res.data.subtask]);
// // // // // //         setIsAddingSubtask(false);
// // // // // //         setSubtaskForm({ title: '', description: '', assigneeId: '', hours: 0 });
// // // // // //       }
// // // // // //     } catch (err) { console.error("Subtask failed", err); }
// // // // // //   };

// // // // // //   const toggleSubtaskStatus = async (sub: Subtask) => {
// // // // // //     const newStatus = sub.status === 'Done' ? 'Active' : 'Done';
// // // // // //     try {
// // // // // //       const res = await api.put(`/api/subtasks/${sub.id}`, { status: newStatus });
// // // // // //       if (res.data.success) {
// // // // // //         setSubtasks(prev => prev.map(s => s.id === sub.id ? { ...s, status: newStatus } : s));
// // // // // //       }
// // // // // //     } catch (err) { console.error(err); }
// // // // // //   };

// // // // // //   // Comment & File Handlers
// // // // // //   const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
// // // // // //     const file = e.target.files?.[0];
// // // // // //     if (!file) return;
// // // // // //     const formData = new FormData();
// // // // // //     formData.append('file', file);
// // // // // //     setIsUploading(true);
// // // // // //     try {
// // // // // //       const res = await api.post('/dev/uploadData', formData, {
// // // // // //         headers: { 'Content-Type': 'multipart/form-data' }
// // // // // //       });
// // // // // //       if (res.data.success) {
// // // // // //         await handleAddComment(`Uploaded file: ${file.name}`, res.data.filePath, file.name);
// // // // // //       }
// // // // // //     } catch (err) { console.error("Upload failed", err); } finally { setIsUploading(false); }
// // // // // //   };

// // // // // //   const handleAddComment = async (content: string, filePath?: string, fileName?: string) => {
// // // // // //     if (!task || (!content.trim() && !filePath)) return;
// // // // // //     try {
// // // // // //       const res = await api.post(`/api/tasks/${task.id}/comments`, {
// // // // // //         content,
// // // // // //         filePath,
// // // // // //         fileName
// // // // // //       });
// // // // // //       if (res.data.success) {
// // // // // //         setComments(prev => [...prev, res.data.comment]);
// // // // // //         setNewComment("");
// // // // // //       }
// // // // // //     } catch (err) { console.error("Comment failed", err); }
// // // // // //   };

// // // // // //   if (!task) return null;

// // // // // //   return (
// // // // // //     <>
// // // // // //       <div className="fixed inset-0 bg-background/60 backdrop-blur-sm z-40 transition-opacity" onClick={onClose} />
// // // // // //       <div className="fixed right-0 top-0 h-full w-[500px] max-w-full bg-slate-950 border-l border-slate-800 z-50 flex flex-col shadow-2xl animate-in slide-in-from-right duration-300">
        
// // // // // //         {/* Header */}
// // // // // //         <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800">
// // // // // //           <div className="flex items-center gap-3">
// // // // // //             <StatusDot status={editedTask.status || task.status} className="w-2.5 h-2.5" />
// // // // // //             <span className="text-xs font-mono text-slate-500 uppercase tracking-wider">TASK-{task.id}</span>
// // // // // //           </div>
// // // // // //           <div className="flex items-center gap-2">
// // // // // //             {isEditing ? (
// // // // // //               <Button size="sm" onClick={handleUpdateTask} className="h-8 bg-blue-600 hover:bg-blue-700 text-white">
// // // // // //                 <Save className="w-3.5 h-3.5 mr-2" /> Save
// // // // // //               </Button>
// // // // // //             ) : (
// // // // // //               <button onClick={() => setIsEditing(true)} className="p-2 rounded-md hover:bg-slate-900 text-slate-400 transition-colors">
// // // // // //                 <Edit2 className="w-4 h-4" />
// // // // // //               </button>
// // // // // //             )}
// // // // // //             <button onClick={onClose} className="p-2 rounded-md hover:bg-slate-900 text-slate-400"><X className="w-5 h-5" /></button>
// // // // // //           </div>
// // // // // //         </div>

// // // // // //         {/* Content Section */}
// // // // // //         <div className="flex-1 overflow-y-auto scrollbar-none p-6">
// // // // // //           <div className="mb-8">
// // // // // //             {isEditing ? (
// // // // // //               <div className="space-y-4">
// // // // // //                 <Input 
// // // // // //                   value={editedTask.title} 
// // // // // //                   onChange={e => setEditedTask({...editedTask, title: e.target.value})}
// // // // // //                   className="text-lg font-bold bg-slate-900 border-slate-800 text-slate-100 focus-visible:ring-blue-500"
// // // // // //                 />
// // // // // //                 <Textarea 
// // // // // //                   value={editedTask.description || ''} 
// // // // // //                   onChange={e => setEditedTask({...editedTask, description: e.target.value})}
// // // // // //                   className="min-h-[100px] bg-slate-900 border-slate-800 text-slate-300 text-sm focus-visible:ring-blue-500"
// // // // // //                 />
// // // // // //               </div>
// // // // // //             ) : (
// // // // // //               <>
// // // // // //                 <h2 className="text-2xl font-bold text-slate-100 mb-3 leading-tight">{task.title}</h2>
// // // // // //                 <p className="text-sm text-slate-400 leading-relaxed">{task.description || 'No description provided.'}</p>
// // // // // //               </>
// // // // // //             )}
// // // // // //           </div>

// // // // // //           {/* Info Grid */}
// // // // // //           <div className="grid grid-cols-2 gap-x-8 gap-y-6 mb-8 bg-slate-900/40 p-5 rounded-xl border border-slate-800/50">
// // // // // //             <MetaField label="Status">
// // // // // //               <Select 
// // // // // //                 value={editedTask.status} 
// // // // // //                 onValueChange={(val) => { setEditedTask({...editedTask, status: val}); if(!isEditing) handleUpdateTask(); }}
// // // // // //               >
// // // // // //                 <SelectTrigger className="h-9 bg-slate-950 border-slate-800 text-slate-200 text-xs"><SelectValue /></SelectTrigger>
// // // // // //                 <SelectContent className="bg-slate-900 border-slate-800 text-slate-200">
// // // // // //                   {availableStatus.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
// // // // // //                 </SelectContent>
// // // // // //               </Select>
// // // // // //             </MetaField>

// // // // // //             <MetaField label="Assignee">
// // // // // //               <Select 
// // // // // //                 value={editedTask.assigneeId?.toString()} 
// // // // // //                 onValueChange={(val) => { setEditedTask({...editedTask, assigneeId: parseInt(val)}); if(!isEditing) handleUpdateTask(); }}
// // // // // //               >
// // // // // //                 <SelectTrigger className="h-9 bg-slate-950 border-slate-800 text-slate-200 text-xs"><SelectValue placeholder="Unassigned" /></SelectTrigger>
// // // // // //                 <SelectContent className="bg-slate-900 border-slate-800 text-slate-200">
// // // // // //                   {boardMembers.map(m => <SelectItem key={m.id} value={m.id.toString()}>{m.name}</SelectItem>)}
// // // // // //                 </SelectContent>
// // // // // //               </Select>
// // // // // //             </MetaField>
// // // // // //           </div>

// // // // // //           {/* Tabs */}
// // // // // //           <div className="space-y-6">
// // // // // //             <div className="flex gap-8 border-b border-slate-800">
// // // // // //               {(['details', 'subtasks', 'comments'] as const).map((tab) => (
// // // // // //                 <button
// // // // // //                   key={tab}
// // // // // //                   onClick={() => setActiveTab(tab)}
// // // // // //                   className={cn(
// // // // // //                     'text-xs py-3 border-b-2 transition-all capitalize font-semibold tracking-wide',
// // // // // //                     activeTab === tab ? 'border-blue-500 text-slate-100' : 'border-transparent text-slate-500 hover:text-slate-300'
// // // // // //                   )}
// // // // // //                 >
// // // // // //                   {tab} {tab === 'subtasks' ? `(${subtasks.length})` : tab === 'comments' ? `(${comments.length})` : ''}
// // // // // //                 </button>
// // // // // //               ))}
// // // // // //             </div>

// // // // // //             <div className="pb-10">
// // // // // //               {activeTab === 'subtasks' && (
// // // // // //                 <div className="space-y-4">
// // // // // //                   {subtasks.map((sub) => (
// // // // // //                     <div key={sub.id} className="flex items-center gap-4 p-4 rounded-xl bg-slate-900/50 border border-slate-800 group transition-all hover:bg-slate-900">
// // // // // //                       <button onClick={() => toggleSubtaskStatus(sub)} className="text-slate-500 hover:text-green-500 transition-transform active:scale-90">
// // // // // //                         {sub.status === 'Done' ? <CheckCircle2 className="w-5 h-5 text-green-500" /> : <Circle className="w-5 h-5" />}
// // // // // //                       </button>
// // // // // //                       <div className="flex-1 min-w-0">
// // // // // //                         <p className={cn('text-sm font-medium text-slate-200 truncate', sub.status === 'Done' && 'line-through text-slate-600')}>{sub.title}</p>
// // // // // //                         <p className="text-[10px] text-slate-500 font-mono mt-0.5">{sub.hours}h • {sub.assigneeName || 'Unassigned'}</p>
// // // // // //                       </div>
// // // // // //                       <AvatarInitials name={sub.assigneeName || ''} />
// // // // // //                     </div>
// // // // // //                   ))}

// // // // // //                   {isAddingSubtask ? (
// // // // // //                     <div className="p-4 rounded-xl border border-blue-500/50 bg-slate-900/80 space-y-3">
// // // // // //                       <Input placeholder="Subtask title" value={subtaskForm.title} onChange={e => setSubtaskForm({...subtaskForm, title: e.target.value})} className="h-8 text-sm bg-slate-950 border-slate-800" />
// // // // // //                       <div className="flex gap-3">
// // // // // //                         <Select onValueChange={v => setSubtaskForm({...subtaskForm, assigneeId: v})}>
// // // // // //                           <SelectTrigger className="h-8 bg-slate-950 border-slate-800 text-[11px]"><SelectValue placeholder="Assignee" /></SelectTrigger>
// // // // // //                           <SelectContent className="bg-slate-900 border-slate-800 text-slate-200">{boardMembers.map(m => <SelectItem key={m.id} value={m.id.toString()}>{m.name}</SelectItem>)}</SelectContent>
// // // // // //                         </Select>
// // // // // //                         <Input type="number" placeholder="Hrs" className="h-8 w-20 text-sm bg-slate-950 border-slate-800" value={subtaskForm.hours} onChange={e => setSubtaskForm({...subtaskForm, hours: parseFloat(e.target.value)})} />
// // // // // //                       </div>
// // // // // //                       <div className="flex justify-end gap-2 pt-1">
// // // // // //                         <Button size="sm" variant="ghost" onClick={() => setIsAddingSubtask(false)}>Cancel</Button>
// // // // // //                         <Button size="sm" onClick={handleAddSubtask} className="bg-blue-600 h-7 text-xs">Create</Button>
// // // // // //                       </div>
// // // // // //                     </div>
// // // // // //                   ) : (
// // // // // //                     <Button variant="ghost" onClick={() => setIsAddingSubtask(true)} className="w-full justify-start text-slate-500 hover:text-slate-200 h-10 border border-dashed border-slate-800 hover:border-slate-700">
// // // // // //                       <Plus className="w-4 h-4 mr-2" /> Add Subtask
// // // // // //                     </Button>
// // // // // //                   )}
// // // // // //                 </div>
// // // // // //               )}

// // // // // //               {activeTab === 'comments' && (
// // // // // //                 <div className="space-y-6">
// // // // // //                   <div className="space-y-5 max-h-[400px] overflow-y-auto pr-2 scrollbar-none">
// // // // // //                     {comments.map(c => (
// // // // // //                       <div key={c.id} className="flex gap-4">
// // // // // //                         <AvatarInitials name={c.userName || 'U'} />
// // // // // //                         <div className="flex-1 bg-slate-900/80 p-4 rounded-2xl rounded-tl-none border border-slate-800">
// // // // // //                           <div className="flex justify-between mb-2">
// // // // // //                             <span className="font-bold text-[10px] uppercase text-blue-400">{c.userName}</span>
// // // // // //                             <span className="text-[10px] text-slate-500">{new Date(c.createdAt).toLocaleDateString()}</span>
// // // // // //                           </div>
// // // // // //                           <p className="text-slate-300 text-sm leading-relaxed">{c.content}</p>
// // // // // //                           {c.filePath && (
// // // // // //                             <a href={`http://localhost:4000${c.filePath}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 mt-3 p-2 bg-slate-950 rounded-lg border border-slate-800 text-[11px] text-slate-400 hover:text-white">
// // // // // //                               <Paperclip className="w-3.5 h-3.5" /> {c.fileName || 'Attachment'}
// // // // // //                             </a>
// // // // // //                           )}
// // // // // //                         </div>
// // // // // //                       </div>
// // // // // //                     ))}
// // // // // //                   </div>
// // // // // //                   <div className="relative pt-4">
// // // // // //                     <Textarea placeholder="Add a comment..." value={newComment} onChange={e => setNewComment(e.target.value)} className="pr-24 min-h-[100px] bg-slate-900 border-slate-800 text-slate-200 text-sm" />
// // // // // //                     <div className="absolute right-3 bottom-3 flex gap-2">
// // // // // //                       <label className="cursor-pointer p-2 hover:bg-slate-800 rounded-md text-slate-500 hover:text-slate-200">
// // // // // //                         <input type="file" className="hidden" onChange={handleFileUpload} disabled={isUploading} />
// // // // // //                         {isUploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Paperclip className="w-4 h-4" />}
// // // // // //                       </label>
// // // // // //                       <Button onClick={() => handleAddComment(newComment)} disabled={!newComment.trim() && !isUploading} className="h-8 px-3 bg-blue-600"><Send className="w-3.5 h-3.5" /></Button>
// // // // // //                     </div>
// // // // // //                   </div>
// // // // // //                 </div>
// // // // // //               )}
// // // // // //             </div>
// // // // // //           </div>
// // // // // //         </div>
// // // // // //       </div>
// // // // // //     </>
// // // // // //   );
// // // // // // }

// // // // // // function MetaField({ label, children }: { label: string; children: React.ReactNode }) {
// // // // // //   return (
// // // // // //     <div className="space-y-2">
// // // // // //       <span className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">{label}</span>
// // // // // //       <div className="w-full">{children}</div>
// // // // // //     </div>
// // // // // //   );
// // // // // // }


















// // // // // import { useState, useEffect } from 'react';
// // // // // import { 
// // // // //   X, MessageSquare, Clock, CheckCircle2, Circle,User as UserIcon, 
// // // // //   AlertCircle, Plus, Paperclip, Send, Loader2, Edit2, Save 
// // // // // } from 'lucide-react';
// // // // // import { cn } from '@/lib/utils';
// // // // // import type { Task, Subtask, Comment, User } from '@/types';
// // // // // import { PriorityBadge, AvatarInitials, StatusDot } from '@/components/TaskBadges';
// // // // // import api from '@/lib/api'; 
// // // // // import { Button } from '@/components/ui/button';
// // // // // import { Input } from '@/components/ui/input';
// // // // // import { Textarea } from '@/components/ui/textarea';
// // // // // import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
// // // // // import { Label } from '@/components/ui/label';

// // // // // interface TaskDrawerProps {
// // // // //   task: Task | null;
// // // // //   availableStatus: string[];
// // // // //   boardMembers: User[];
// // // // //   onClose: () => void;
// // // // //   onTaskUpdate: (updatedTask: Task) => void;
// // // // // }

// // // // // export function TaskDrawer({ task, availableStatus, boardMembers, onClose, onTaskUpdate }: TaskDrawerProps) {
// // // // //   const [activeTab, setActiveTab] = useState<'details' | 'subtasks' | 'comments'>('details');
// // // // //   const [isEditing, setIsEditing] = useState(false);
// // // // //   const [editedTask, setEditedTask] = useState<Partial<Task>>({});
  
// // // // //   // Data State
// // // // //   const [subtasks, setSubtasks] = useState<Subtask[]>([]);
// // // // //   const [comments, setComments] = useState<Comment[]>([]);
  
// // // // //   // Form States
// // // // //   const [newComment, setNewComment] = useState("");
// // // // //   const [isUploading, setIsUploading] = useState(false);
// // // // //   const [isAddingSubtask, setIsAddingSubtask] = useState(false);
// // // // //   const [subtaskForm, setSubtaskForm] = useState({
// // // // //     title: '',
// // // // //     description: '',
// // // // //     assigneeId: '',
// // // // //     hours: 0
// // // // //   });

// // // // //   useEffect(() => {
// // // // //     if (task) {
// // // // //       setEditedTask(task);
// // // // //       setIsEditing(false);
// // // // //       setIsAddingSubtask(false);
// // // // //       fetchSubtasks();
// // // // //       fetchComments();
// // // // //     }
// // // // //   }, [task]);

// // // // //   const fetchSubtasks = async () => {
// // // // //     if (!task) return;
// // // // //     try {
// // // // //       const res = await api.get(`/api/tasks/${task.id}/subtasks`);
// // // // //       if (res.data.success) setSubtasks(res.data.subtasks);
// // // // //     } catch (err) { console.error("Subtasks fetch failed", err); }
// // // // //   };

// // // // //   const fetchComments = async () => {
// // // // //     if (!task) return;
// // // // //     try {
// // // // //       const res = await api.get(`/api/tasks/${task.id}/comments`);
// // // // //       if (res.data.success) setComments(res.data.comments);
// // // // //     } catch (err) { console.error("Comments fetch failed", err); }
// // // // //   };

// // // // //   const handleUpdateTask = async () => {
// // // // //     if (!task) return;
// // // // //     try {
// // // // //       const res = await api.put(`/api/tasks/${task.id}`, editedTask);
// // // // //       if (res.data.success) {
// // // // //         onTaskUpdate(res.data.task);
// // // // //         setIsEditing(false);
// // // // //       }
// // // // //     } catch (err) { console.error("Update failed", err); }
// // // // //   };

// // // // //   const handleAddSubtask = async () => {
// // // // //     if (!task || !subtaskForm.title.trim()) return;
// // // // //     try {
// // // // //       const res = await api.post(`/api/tasks/${task.id}/subtasks`, {
// // // // //         ...subtaskForm,
// // // // //         assigneeId: subtaskForm.assigneeId ? parseInt(subtaskForm.assigneeId) : null,
// // // // //         hours: parseFloat(subtaskForm.hours.toString()) || 0
// // // // //       });
// // // // //       if (res.data.success) {
// // // // //         setSubtasks(prev => [...prev, res.data.subtask]);
// // // // //         setIsAddingSubtask(false);
// // // // //         setSubtaskForm({ title: '', description: '', assigneeId: '', hours: 0 });
// // // // //       }
// // // // //     } catch (err) { console.error("Subtask failed", err); }
// // // // //   };

// // // // //   const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
// // // // //     const file = e.target.files?.[0];
// // // // //     if (!file) return;
// // // // //     const formData = new FormData();
// // // // //     formData.append('file', file);
// // // // //     setIsUploading(true);
// // // // //     try {
// // // // //       const res = await api.post('/dev/uploadData', formData, {
// // // // //         headers: { 'Content-Type': 'multipart/form-data' }
// // // // //       });
// // // // //       if (res.data.success) {
// // // // //         await handleAddComment(`Uploaded: ${file.name}`, res.data.filePath, file.name);
// // // // //       }
// // // // //     } catch (err) { console.error("Upload failed", err); } finally { setIsUploading(false); }
// // // // //   };

// // // // //   const toggleSubtaskStatus = async (sub: Subtask) => {
// // // // //   const newStatus = sub.status === 'Done' ? 'Active' : 'Done';
// // // // //   try {
// // // // //     const res = await api.put(`/api/subtasks/${sub.id}`, { status: newStatus });
// // // // //     if (res.data.success) {
// // // // //       setSubtasks(prev => prev.map(s => s.id === sub.id ? { ...s, status: newStatus } : s));
// // // // //     }
// // // // //   } catch (err) {
// // // // //     console.error("Failed to toggle subtask status:", err);
// // // // //   }
// // // // // };
// // // // //   const handleAddComment = async (content: string, filePath?: string, fileName?: string) => {
// // // // //     if (!task || (!content.trim() && !filePath)) return;
// // // // //     try {
// // // // //       const res = await api.post(`/api/tasks/${task.id}/comments`, {
// // // // //         content,
// // // // //         filePath,
// // // // //         fileName
// // // // //       });
// // // // //       if (res.data.success) {
// // // // //         setComments(prev => [...prev, res.data.comment]);
// // // // //         setNewComment("");
// // // // //       }
// // // // //     } catch (err) { console.error("Comment failed", err); }
// // // // //   };

// // // // //   if (!task) return null;

// // // // //   return (
// // // // //     <>
// // // // //       <div className="fixed inset-0 bg-background/60 backdrop-blur-sm z-40" onClick={onClose} />
// // // // //       <div className="fixed right-0 top-0 h-full w-[520px] max-w-full bg-slate-950 border-l border-slate-800 z-50 flex flex-col shadow-2xl animate-in slide-in-from-right duration-300">
        
// // // // //         {/* Header */}
// // // // //         <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800">
// // // // //           <div className="flex items-center gap-3">
// // // // //             <StatusDot status={editedTask.status || task.status} />
// // // // //             <span className="text-xs font-mono text-slate-500 uppercase tracking-wider">TASK-{task.id}</span>
// // // // //           </div>
// // // // //           <div className="flex items-center gap-2">
// // // // //             {isEditing ? (
// // // // //               <Button size="sm" onClick={handleUpdateTask} className="h-8 bg-blue-600 hover:bg-blue-700 text-white">
// // // // //                 <Save className="w-3.5 h-3.5 mr-2" /> Save
// // // // //               </Button>
// // // // //             ) : (
// // // // //               <button onClick={() => setIsEditing(true)} className="p-2 rounded-md hover:bg-slate-900 text-slate-400">
// // // // //                 <Edit2 className="w-4 h-4" />
// // // // //               </button>
// // // // //             )}
// // // // //             <button onClick={onClose} className="p-2 rounded-md hover:bg-slate-900 text-slate-400"><X className="w-5 h-5" /></button>
// // // // //           </div>
// // // // //         </div>

// // // // //         {/* Content Section */}
// // // // //         <div className="flex-1 overflow-y-auto scrollbar-none p-6">
// // // // //           <div className="mb-8">
// // // // //             {isEditing ? (
// // // // //               <div className="space-y-4">
// // // // //                 <Input 
// // // // //                   value={editedTask.title} 
// // // // //                   onChange={e => setEditedTask({...editedTask, title: e.target.value})}
// // // // //                   className="text-lg font-bold bg-slate-900 border-slate-800 text-slate-100 placeholder:text-slate-600"
// // // // //                 />
// // // // //                 <Textarea 
// // // // //                   value={editedTask.description || ''} 
// // // // //                   onChange={e => setEditedTask({...editedTask, description: e.target.value})}
// // // // //                   placeholder="Task description..."
// // // // //                   className="min-h-[100px] bg-slate-900 border-slate-800 text-slate-300 text-sm placeholder:text-slate-600"
// // // // //                 />
// // // // //               </div>
// // // // //             ) : (
// // // // //               <>
// // // // //                 <h2 className="text-2xl font-bold text-slate-100 mb-3 leading-tight">{task.title}</h2>
// // // // //                 <p className="text-sm text-slate-400 leading-relaxed">{task.description || 'No description provided.'}</p>
// // // // //               </>
// // // // //             )}
// // // // //           </div>

// // // // //           {/* Info Grid */}
// // // // //           <div className="grid grid-cols-2 gap-x-8 gap-y-6 mb-8 bg-slate-900/40 p-5 rounded-xl border border-slate-800/50">
// // // // //             <MetaField label="Status">
// // // // //               <Select 
// // // // //                 value={editedTask.status} 
// // // // //                 onValueChange={(val) => { setEditedTask({...editedTask, status: val}); if(!isEditing) handleUpdateTask(); }}
// // // // //               >
// // // // //                 <SelectTrigger className="h-9 bg-slate-950 border-slate-800 text-slate-200 text-xs"><SelectValue /></SelectTrigger>
// // // // //                 <SelectContent className="bg-slate-900 border-slate-800 text-slate-200">
// // // // //                   {availableStatus.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
// // // // //                 </SelectContent>
// // // // //               </Select>
// // // // //             </MetaField>

// // // // //             <MetaField label="Assignee">
// // // // //               <Select 
// // // // //                 value={editedTask.assigneeId?.toString()} 
// // // // //                 onValueChange={(val) => { setEditedTask({...editedTask, assigneeId: parseInt(val)}); if(!isEditing) handleUpdateTask(); }}
// // // // //               >
// // // // //                 <SelectTrigger className="h-9 bg-slate-950 border-slate-800 text-slate-200 text-xs"><SelectValue placeholder="Unassigned" /></SelectTrigger>
// // // // //                 <SelectContent className="bg-slate-900 border-slate-800 text-slate-200">
// // // // //                   {boardMembers.map(m => <SelectItem key={m.id} value={m.id.toString()}>{m.name}</SelectItem>)}
// // // // //                 </SelectContent>
// // // // //               </Select>
// // // // //             </MetaField>
// // // // //           </div>

// // // // //           {/* Tabs */}
// // // // //           <div className="space-y-6">
// // // // //             <div className="flex gap-8 border-b border-slate-800">
// // // // //               {(['details', 'subtasks', 'comments'] as const).map((tab) => (
// // // // //                 <button
// // // // //                   key={tab}
// // // // //                   onClick={() => setActiveTab(tab)}
// // // // //                   className={cn(
// // // // //                     'text-xs py-3 border-b-2 transition-all capitalize font-semibold tracking-wide',
// // // // //                     activeTab === tab ? 'border-blue-500 text-slate-100' : 'border-transparent text-slate-500 hover:text-slate-300'
// // // // //                   )}
// // // // //                 >
// // // // //                   {tab} {tab === 'subtasks' ? `(${subtasks.length})` : tab === 'comments' ? `(${comments.length})` : ''}
// // // // //                 </button>
// // // // //               ))}
// // // // //             </div>

// // // // //             <div className="pb-10">
// // // // //               {activeTab === 'subtasks' && (
// // // // //                 <div className="space-y-4">
// // // // //                   {subtasks.map((sub) => (
// // // // //                     <div key={sub.id} className="flex items-start gap-4 p-4 rounded-xl bg-slate-900/50 border border-slate-800 group hover:bg-slate-900 transition-all">
// // // // //                       <button onClick={() => toggleSubtaskStatus(sub)} className="mt-0.5 text-slate-500 hover:text-green-500 transition-transform active:scale-90">
// // // // //                         {sub.status === 'Done' ? <CheckCircle2 className="w-5 h-5 text-green-500" /> : <Circle className="w-5 h-5" />}
// // // // //                       </button>
// // // // //                       <div className="flex-1 min-w-0">
// // // // //                         <p className={cn('text-sm font-medium text-slate-200', sub.status === 'Done' && 'line-through text-slate-600')}>{sub.title}</p>
// // // // //                         {sub.description && <p className="text-xs text-slate-500 mt-1 line-clamp-2">{sub.description}</p>}
// // // // //                         <div className="flex items-center gap-3 mt-2 text-[10px] text-slate-600 font-mono">
// // // // //                           <span>{sub.hours}h</span>
// // // // //                           <span>•</span>
// // // // //                           <span className="flex items-center gap-1"><UserIcon className="w-3 h-3" /> {sub.assigneeName || 'Unassigned'}</span>
// // // // //                         </div>
// // // // //                       </div>
// // // // //                       <AvatarInitials name={sub.assigneeName || ''} />
// // // // //                     </div>
// // // // //                   ))}

// // // // //                   {isAddingSubtask ? (
// // // // //                     <div className="p-5 rounded-xl border border-blue-500/30 bg-slate-900/80 space-y-4">
// // // // //                       <div className="space-y-3">
// // // // //                         <Input placeholder="Subtask title" value={subtaskForm.title} onChange={e => setSubtaskForm({...subtaskForm, title: e.target.value})} className="bg-slate-950 border-slate-800 text-sm" />
// // // // //                         <Textarea placeholder="Subtask description..." value={subtaskForm.description} onChange={e => setSubtaskForm({...subtaskForm, description: e.target.value})} className="bg-slate-950 border-slate-800 text-xs min-h-[60px]" />
// // // // //                         <div className="grid grid-cols-2 gap-3">
// // // // //                           <Select onValueChange={v => setSubtaskForm({...subtaskForm, assigneeId: v})}>
// // // // //                             <SelectTrigger className="h-8 bg-slate-950 border-slate-800 text-[11px]"><SelectValue placeholder="Assignee" /></SelectTrigger>
// // // // //                             <SelectContent className="bg-slate-900 border-slate-800 text-slate-200">{boardMembers.map(m => <SelectItem key={m.id} value={m.id.toString()}>{m.name}</SelectItem>)}</SelectContent>
// // // // //                           </Select>
// // // // //                           <Input type="number" placeholder="Hours" value={subtaskForm.hours} onChange={e => setSubtaskForm({...subtaskForm, hours: parseFloat(e.target.value)})} className="h-8 bg-slate-950 border-slate-800 text-xs" />
// // // // //                         </div>
// // // // //                       </div>
// // // // //                       <div className="flex justify-end gap-2">
// // // // //                         <Button size="sm" variant="ghost" onClick={() => setIsAddingSubtask(false)}>Cancel</Button>
// // // // //                         <Button size="sm" onClick={handleAddSubtask} className="bg-blue-600 h-8 px-4 text-xs">Create Subtask</Button>
// // // // //                       </div>
// // // // //                     </div>
// // // // //                   ) : (
// // // // //                     <Button variant="ghost" onClick={() => setIsAddingSubtask(true)} className="w-full justify-start text-slate-500 hover:text-slate-200 h-11 border border-dashed border-slate-800 hover:border-slate-700">
// // // // //                       <Plus className="w-4 h-4 mr-2" /> Add Subtask
// // // // //                     </Button>
// // // // //                   )}
// // // // //                 </div>
// // // // //               )}

// // // // //               {activeTab === 'comments' && (
// // // // //                 <div className="space-y-6">
// // // // //                   <div className="space-y-5 max-h-[400px] overflow-y-auto pr-2 scrollbar-none">
// // // // //                     {comments.map(c => (
// // // // //                       <div key={c.id} className="flex gap-4">
// // // // //                         <AvatarInitials name={c.userName || 'U'} />
// // // // //                         <div className="flex-1 bg-slate-900/80 p-4 rounded-2xl border border-slate-800">
// // // // //                           <div className="flex justify-between mb-1.5">
// // // // //                             <span className="font-bold text-[10px] uppercase text-blue-400">{c.userName}</span>
// // // // //                             <span className="text-[10px] text-slate-500">{new Date(c.createdAt).toLocaleDateString()}</span>
// // // // //                           </div>
// // // // //                           <p className="text-slate-300 text-sm">{c.content}</p>
// // // // //                           {c.filePath && (
// // // // //                             <a href={`http://localhost:4000${c.filePath}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 mt-3 p-2 bg-slate-950 rounded-lg border border-slate-800 text-[11px] text-slate-400 hover:text-white transition-colors">
// // // // //                               <Paperclip className="w-3.5 h-3.5" /> {c.fileName || 'Attachment'}
// // // // //                             </a>
// // // // //                           )}
// // // // //                         </div>
// // // // //                       </div>
// // // // //                     ))}
// // // // //                   </div>
// // // // //                   <div className="relative pt-4">
// // // // //                     <Textarea placeholder="Add a comment..." value={newComment} onChange={e => setNewComment(e.target.value)} className="pr-24 min-h-[100px] bg-slate-900 border-slate-800 text-slate-200 text-sm focus-visible:ring-blue-500" />
// // // // //                     <div className="absolute right-3 bottom-3 flex gap-2">
// // // // //                       <label className="cursor-pointer p-2 hover:bg-slate-800 rounded-md text-slate-500">
// // // // //                         <input type="file" className="hidden" onChange={handleFileUpload} disabled={isUploading} />
// // // // //                         {isUploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Paperclip className="w-4 h-4" />}
// // // // //                       </label>
// // // // //                       <Button onClick={() => handleAddComment(newComment)} disabled={!newComment.trim() && !isUploading} className="h-8 px-3 bg-blue-600"><Send className="w-3.5 h-3.5" /></Button>
// // // // //                     </div>
// // // // //                   </div>
// // // // //                 </div>
// // // // //               )}
// // // // //             </div>
// // // // //           </div>
// // // // //         </div>
// // // // //       </div>
// // // // //     </>
// // // // //   );
// // // // // }

// // // // // function MetaField({ label, children }: { label: string; children: React.ReactNode }) {
// // // // //   return (
// // // // //     <div className="space-y-2">
// // // // //       <span className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">{label}</span>
// // // // //       <div className="w-full">{children}</div>
// // // // //     </div>
// // // // //   );
// // // // // }



































// // // // import { useState, useEffect } from 'react';
// // // // import { 
// // // //   X, MessageSquare, Clock, CheckCircle2, Circle, 
// // // //   AlertCircle, Plus, Paperclip, Send, Loader2, Edit2, Save, User as UserIcon 
// // // // } from 'lucide-react';
// // // // import { cn } from '@/lib/utils';
// // // // import type { Task, Subtask, Comment, User } from '@/types';
// // // // import { AvatarInitials, StatusDot } from '@/components/TaskBadges';
// // // // import api from '@/lib/api'; 
// // // // import { Button } from '@/components/ui/button';
// // // // import { Input } from '@/components/ui/input';
// // // // import { Textarea } from '@/components/ui/textarea';
// // // // import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
// // // // import { Label } from '@/components/ui/label';

// // // // interface TaskDrawerProps {
// // // //   task: Task | null;
// // // //   availableStatus: string[];
// // // //   boardMembers: User[];
// // // //   onClose: () => void;
// // // //   onTaskUpdate: (updatedTask: Task) => void;
// // // // }

// // // // export function TaskDrawer({ task, availableStatus, boardMembers, onClose, onTaskUpdate }: TaskDrawerProps) {
// // // //   const [activeTab, setActiveTab] = useState<'details' | 'subtasks' | 'comments'>('details');
// // // //   const [isEditing, setIsEditing] = useState(false);
// // // //   const [editedTask, setEditedTask] = useState<Partial<Task>>({});
  
// // // //   // Data State
// // // //   const [subtasks, setSubtasks] = useState<Subtask[]>([]);
// // // //   const [comments, setComments] = useState<Comment[]>([]);
  
// // // //   // UI States
// // // //   const [newComment, setNewComment] = useState("");
// // // //   const [isUploading, setIsUploading] = useState(false);
// // // //   const [isAddingSubtask, setIsAddingSubtask] = useState(false);
// // // //   const [subtaskForm, setSubtaskForm] = useState({
// // // //     title: '',
// // // //     description: '',
// // // //     assigneeId: '',
// // // //     hours: 0
// // // //   });

// // // //   useEffect(() => {
// // // //     if (task) {
// // // //       setEditedTask(task);
// // // //       setIsEditing(false);
// // // //       setIsAddingSubtask(false);
// // // //       fetchSubtasks();
// // // //       fetchComments();
// // // //     }
// // // //   }, [task]);

// // // //   const fetchSubtasks = async () => {
// // // //     if (!task) return;
// // // //     try {
// // // //       const res = await api.get(`/api/tasks/${task.id}/subtasks`);
// // // //       if (res.data.success) setSubtasks(res.data.subtasks);
// // // //     } catch (err) { console.error("Subtasks fetch failed", err); }
// // // //   };

// // // //   const fetchComments = async () => {
// // // //     if (!task) return;
// // // //     try {
// // // //       const res = await api.get(`/api/tasks/${task.id}/comments`);
// // // //       if (res.data.success) setComments(res.data.comments);
// // // //     } catch (err) { console.error("Comments fetch failed", err); }
// // // //   };

// // // //   const handleUpdateTask = async () => {
// // // //     if (!task) return;
// // // //     try {
// // // //       const res = await api.put(`/api/tasks/${task.id}`, editedTask);
// // // //       if (res.data.success) {
// // // //         onTaskUpdate(res.data.task);
// // // //         setIsEditing(false);
// // // //       }
// // // //     } catch (err) { console.error("Update failed", err); }
// // // //   };

// // // //   const handleAddSubtask = async () => {
// // // //     if (!task || !subtaskForm.title.trim()) return;
// // // //     try {
// // // //       const res = await api.post(`/api/tasks/${task.id}/subtasks`, {
// // // //         ...subtaskForm,
// // // //         assigneeId: subtaskForm.assigneeId ? parseInt(subtaskForm.assigneeId) : null,
// // // //         hours: parseFloat(subtaskForm.hours.toString()) || 0
// // // //       });
// // // //       if (res.data.success) {
// // // //         setSubtasks(prev => [...prev, res.data.subtask]);
// // // //         setIsAddingSubtask(false);
// // // //         setSubtaskForm({ title: '', description: '', assigneeId: '', hours: 0 });
// // // //       }
// // // //     } catch (err) { console.error("Subtask failed", err); }
// // // //   };

// // // //   const toggleSubtaskStatus = async (sub: Subtask) => {
// // // //     const newStatus = sub.status === 'Done' ? 'Active' : 'Done';
// // // //     try {
// // // //       const res = await api.put(`/api/subtasks/${sub.id}`, { status: newStatus });
// // // //       if (res.data.success) {
// // // //         setSubtasks(prev => prev.map(s => s.id === sub.id ? { ...s, status: newStatus } : s));
// // // //       }
// // // //     } catch (err) { console.error(err); }
// // // //   };

// // // //   const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
// // // //     const file = e.target.files?.[0];
// // // //     if (!file) return;
// // // //     const formData = new FormData();
// // // //     formData.append('file', file);
// // // //     setIsUploading(true);
// // // //     try {
// // // //       const res = await api.post('/dev/uploadData', formData, {
// // // //         headers: { 'Content-Type': 'multipart/form-data' }
// // // //       });
// // // //       if (res.data.success) {
// // // //         await handleAddComment(`Uploaded file: ${file.name}`, res.data.filePath, file.name);
// // // //       }
// // // //     } catch (err) { console.error("Upload failed", err); } finally { setIsUploading(false); }
// // // //   };

// // // //   const handleAddComment = async (content: string, filePath?: string, fileName?: string) => {
// // // //     if (!task || (!content.trim() && !filePath)) return;
// // // //     try {
// // // //       const res = await api.post(`/api/tasks/${task.id}/comments`, { content, filePath, fileName });
// // // //       if (res.data.success) {
// // // //         setComments(prev => [...prev, res.data.comment]);
// // // //         setNewComment("");
// // // //       }
// // // //     } catch (err) { console.error("Comment failed", err); }
// // // //   };

// // // //   if (!task) return null;

// // // //   return (
// // // //     <>
// // // //       <div className="fixed inset-0 bg-background/60 backdrop-blur-sm z-40 transition-opacity" onClick={onClose} />
// // // //       <div className="fixed right-0 top-0 h-full w-[540px] max-w-full bg-slate-950 border-l border-slate-800 z-50 flex flex-col shadow-2xl animate-in slide-in-from-right duration-300">
        
// // // //         {/* Header */}
// // // //         <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800">
// // // //           <div className="flex items-center gap-3">
// // // //             <StatusDot status={editedTask.status || task.status} />
// // // //             <span className="text-xs font-mono text-slate-500 uppercase tracking-wider">TASK-{task.id}</span>
// // // //           </div>
// // // //           <div className="flex items-center gap-2">
// // // //             {isEditing ? (
// // // //               <Button size="sm" onClick={handleUpdateTask} className="h-8 bg-blue-600 hover:bg-blue-700 text-white font-medium">
// // // //                 <Save className="w-3.5 h-3.5 mr-2" /> Save Changes
// // // //               </Button>
// // // //             ) : (
// // // //               <button onClick={() => setIsEditing(true)} className="p-2 rounded-md hover:bg-slate-900 text-slate-400 transition-colors">
// // // //                 <Edit2 className="w-4 h-4" />
// // // //               </button>
// // // //             )}
// // // //             <button onClick={onClose} className="p-2 rounded-md hover:bg-slate-900 text-slate-400 transition-colors"><X className="w-5 h-5" /></button>
// // // //           </div>
// // // //         </div>

// // // //         {/* Scrollable Content */}
// // // //         <div className="flex-1 overflow-y-auto scrollbar-none p-6">
// // // //           <div className="mb-8">
// // // //             {isEditing ? (
// // // //               <div className="space-y-4">
// // // //                 <Input 
// // // //                   value={editedTask.title} 
// // // //                   onChange={e => setEditedTask({...editedTask, title: e.target.value})}
// // // //                   className="text-lg font-bold bg-slate-900 border-slate-800 text-slate-100 placeholder:text-slate-600"
// // // //                 />
// // // //                 <Textarea 
// // // //                   value={editedTask.description || ''} 
// // // //                   onChange={e => setEditedTask({...editedTask, description: e.target.value})}
// // // //                   placeholder="Task description..."
// // // //                   className="min-h-[100px] bg-slate-900 border-slate-800 text-slate-300 text-sm"
// // // //                 />
// // // //               </div>
// // // //             ) : (
// // // //               <>
// // // //                 <h2 className="text-2xl font-bold text-slate-100 mb-3 leading-tight">{task.title}</h2>
// // // //                 <p className="text-sm text-slate-400 leading-relaxed">{task.description || 'No description provided.'}</p>
// // // //               </>
// // // //             )}
// // // //           </div>

// // // //           {/* Info Grid */}
// // // //           <div className="grid grid-cols-2 gap-x-8 gap-y-6 mb-8 bg-slate-900/40 p-5 rounded-xl border border-slate-800/50">
// // // //             <MetaField label="Status">
// // // //               <Select 
// // // //                 value={editedTask.status} 
// // // //                 onValueChange={(val) => { setEditedTask({...editedTask, status: val}); if(!isEditing) handleUpdateTask(); }}
// // // //               >
// // // //                 <SelectTrigger className="h-9 bg-slate-950 border-slate-800 text-slate-200 text-xs"><SelectValue /></SelectTrigger>
// // // //                 <SelectContent className="bg-slate-900 border-slate-800 text-slate-200">
// // // //                   {availableStatus.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
// // // //                 </SelectContent>
// // // //               </Select>
// // // //             </MetaField>

// // // //             <MetaField label="Priority">
// // // //               {isEditing ? (
// // // //                 <Select 
// // // //                   value={editedTask.priority} 
// // // //                   onValueChange={(val) => setEditedTask({...editedTask, priority: val as any})}
// // // //                 >
// // // //                   <SelectTrigger className="h-9 bg-slate-950 border-slate-800 text-slate-200 text-xs"><SelectValue /></SelectTrigger>
// // // //                   <SelectContent className="bg-slate-900 border-slate-800 text-slate-200">
// // // //                     {['Low', 'Medium', 'High'].map(p => <SelectItem key={p} value={p}>{p}</SelectItem>)}
// // // //                   </SelectContent>
// // // //                 </Select>
// // // //               ) : (
// // // //                 <div className={cn(
// // // //                   "h-9 flex items-center text-xs font-bold uppercase tracking-wider",
// // // //                   task.priority === 'High' ? "text-red-500" : task.priority === 'Medium' ? "text-yellow-500" : "text-green-500"
// // // //                 )}>
// // // //                   {task.priority}
// // // //                 </div>
// // // //               )}
// // // //             </MetaField>

// // // //             <MetaField label="Assignee">
// // // //               <Select 
// // // //                 value={editedTask.assigneeId?.toString()} 
// // // //                 onValueChange={(val) => { setEditedTask({...editedTask, assigneeId: parseInt(val)}); if(!isEditing) handleUpdateTask(); }}
// // // //               >
// // // //                 <SelectTrigger className="h-9 bg-slate-950 border-slate-800 text-slate-200 text-xs"><SelectValue placeholder="Unassigned" /></SelectTrigger>
// // // //                 <SelectContent className="bg-slate-900 border-slate-800 text-slate-200">
// // // //                   {boardMembers.map(m => <SelectItem key={m.id} value={m.id.toString()}>{m.name}</SelectItem>)}
// // // //                 </SelectContent>
// // // //               </Select>
// // // //             </MetaField>

// // // //             <MetaField label="Story Points">
// // // //               {isEditing ? (
// // // //                 <Input type="number" className="h-9 bg-slate-950 border-slate-800 text-slate-200 text-xs" value={editedTask.storyPoints} onChange={e => setEditedTask({...editedTask, storyPoints: parseInt(e.target.value)})} />
// // // //               ) : (
// // // //                 <div className="h-9 flex items-center text-slate-300 text-sm font-medium">{task.storyPoints || 0} SP</div>
// // // //               )}
// // // //             </MetaField>
// // // //           </div>

// // // //           {/* Navigation Tabs */}
// // // //           <div className="space-y-6">
// // // //             <div className="flex gap-8 border-b border-slate-800">
// // // //               {(['details', 'subtasks', 'comments'] as const).map((tab) => (
// // // //                 <button
// // // //                   key={tab}
// // // //                   onClick={() => setActiveTab(tab)}
// // // //                   className={cn(
// // // //                     'text-xs py-3 border-b-2 transition-all capitalize font-semibold tracking-wide',
// // // //                     activeTab === tab ? 'border-blue-500 text-slate-100' : 'border-transparent text-slate-500 hover:text-slate-300'
// // // //                   )}
// // // //                 >
// // // //                   {tab} {tab === 'subtasks' ? `(${subtasks.length})` : tab === 'comments' ? `(${comments.length})` : ''}
// // // //                 </button>
// // // //               ))}
// // // //             </div>

// // // //             <div className="pb-10">
// // // //               {activeTab === 'subtasks' && (
// // // //                 <div className="space-y-4">
// // // //                   {subtasks.map((sub) => (
// // // //                     <div key={sub.id} className="flex items-start gap-4 p-4 rounded-xl bg-slate-900/50 border border-slate-800 group transition-all">
// // // //                       <button onClick={() => toggleSubtaskStatus(sub)} className="mt-0.5 text-slate-500 hover:text-green-500 transition-transform active:scale-90">
// // // //                         {sub.status === 'Done' ? <CheckCircle2 className="w-5 h-5 text-green-500" /> : <Circle className="w-5 h-5" />}
// // // //                       </button>
// // // //                       <div className="flex-1 min-w-0">
// // // //                         <p className={cn('text-sm font-medium text-slate-200', sub.status === 'Done' && 'line-through text-slate-600')}>{sub.title}</p>
// // // //                         {sub.description && <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">{sub.description}</p>}
// // // //                         <div className="flex items-center gap-3 mt-2 text-[10px] text-slate-600 font-mono">
// // // //                           <span>{sub.hours}h</span>
// // // //                           <span>•</span>
// // // //                           <span className="flex items-center gap-1"><UserIcon className="w-3 h-3" /> {sub.assigneeName || 'Unassigned'}</span>
// // // //                         </div>
// // // //                       </div>
// // // //                     </div>
// // // //                   ))}

// // // //                   {isAddingSubtask ? (
// // // //                     <div className="p-5 rounded-xl border border-blue-500/30 bg-slate-900/80 space-y-4 shadow-inner">
// // // //                       <Input placeholder="Subtask title" value={subtaskForm.title} onChange={e => setSubtaskForm({...subtaskForm, title: e.target.value})} className="bg-slate-950 border-slate-800 text-sm text-slate-100" />
// // // //                       <Textarea placeholder="Details (Description)..." value={subtaskForm.description} onChange={e => setSubtaskForm({...subtaskForm, description: e.target.value})} className="bg-slate-950 border-slate-800 text-xs min-h-[60px] text-slate-300" />
// // // //                       <div className="grid grid-cols-2 gap-3">
// // // //                         <Select onValueChange={v => setSubtaskForm({...subtaskForm, assigneeId: v})}>
// // // //                           <SelectTrigger className="h-8 bg-slate-950 border-slate-800 text-[11px] text-slate-200"><SelectValue placeholder="Assignee" /></SelectTrigger>
// // // //                           <SelectContent className="bg-slate-900 border-slate-800 text-slate-200">{boardMembers.map(m => <SelectItem key={m.id} value={m.id.toString()}>{m.name}</SelectItem>)}</SelectContent>
// // // //                         </Select>
// // // //                         <Input type="number" placeholder="Hours" value={subtaskForm.hours} onChange={e => setSubtaskForm({...subtaskForm, hours: parseFloat(e.target.value)})} className="h-8 bg-slate-950 border-slate-800 text-xs text-slate-200" />
// // // //                       </div>
// // // //                       <div className="flex justify-end gap-2"><Button size="sm" variant="ghost" onClick={() => setIsAddingSubtask(false)}>Cancel</Button><Button size="sm" onClick={handleAddSubtask} className="bg-blue-600 h-8 px-4 text-xs font-medium">Create Subtask</Button></div>
// // // //                     </div>
// // // //                   ) : (
// // // //                     <Button variant="ghost" onClick={() => setIsAddingSubtask(true)} className="w-full justify-start text-slate-500 hover:text-slate-200 h-11 border border-dashed border-slate-800 hover:border-slate-700 transition-all">
// // // //                       <Plus className="w-4 h-4 mr-2" /> New Subtask
// // // //                     </Button>
// // // //                   )}
// // // //                 </div>
// // // //               )}

// // // //               {activeTab === 'details' && (
// // // //                 <div className="space-y-5 pt-2">
// // // //                   <div className="flex items-center gap-3 text-xs text-slate-500">
// // // //                     <Clock className="w-4 h-4" />
// // // //                     <span>Created on {new Date(task.createdAt).toLocaleDateString(undefined, { dateStyle: 'long' })}</span>
// // // //                   </div>
// // // //                   <div className="flex items-center gap-3 text-xs text-slate-500">
// // // //                     <AlertCircle className="w-4 h-4" />
// // // //                     <span>Last modified {new Date(task.updatedAt).toLocaleDateString(undefined, { dateStyle: 'long' })}</span>
// // // //                   </div>
// // // //                 </div>
// // // //               )}

// // // //               {activeTab === 'comments' && (
// // // //                 <div className="space-y-6">
// // // //                   <div className="space-y-5 max-h-[400px] overflow-y-auto pr-2 scrollbar-none">
// // // //                     {comments.map(c => (
// // // //                       <div key={c.id} className="flex gap-4">
// // // //                         <AvatarInitials name={c.userName || 'U'} />
// // // //                         <div className="flex-1 bg-slate-900/80 p-4 rounded-2xl border border-slate-800 shadow-sm">
// // // //                           <div className="flex justify-between mb-1.5">
// // // //                             <span className="font-bold text-[10px] uppercase text-blue-400 tracking-widest">{c.userName}</span>
// // // //                             <span className="text-[10px] text-slate-500">{new Date(c.createdAt).toLocaleDateString()}</span>
// // // //                           </div>
// // // //                           <p className="text-slate-300 text-sm leading-relaxed">{c.content}</p>
// // // //                           {c.filePath && (
// // // //                             <a href={`http://localhost:4000${c.filePath}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 mt-3 p-2 bg-slate-950 rounded-lg border border-slate-800 text-[11px] text-slate-400 hover:text-white transition-colors">
// // // //                               <Paperclip className="w-3.5 h-3.5" /> {c.fileName || 'Attachment'}
// // // //                             </a>
// // // //                           )}
// // // //                         </div>
// // // //                       </div>
// // // //                     ))}
// // // //                   </div>
// // // //                   <div className="relative pt-4">
// // // //                     <Textarea placeholder="Add a comment or feedback..." value={newComment} onChange={e => setNewComment(e.target.value)} className="pr-24 min-h-[100px] bg-slate-900 border-slate-800 text-slate-200 text-sm focus-visible:ring-blue-500" />
// // // //                     <div className="absolute right-3 bottom-3 flex gap-2">
// // // //                       <label className="cursor-pointer p-2 hover:bg-slate-800 rounded-md text-slate-500 hover:text-slate-100 transition-colors">
// // // //                         <input type="file" className="hidden" onChange={handleFileUpload} disabled={isUploading} />
// // // //                         {isUploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Paperclip className="w-4 h-4" />}
// // // //                       </label>
// // // //                       <Button onClick={() => handleAddComment(newComment)} disabled={!newComment.trim() && !isUploading} className="h-8 px-3 bg-blue-600 hover:bg-blue-700 transition-colors"><Send className="w-3.5 h-3.5" /></Button>
// // // //                     </div>
// // // //                   </div>
// // // //                 </div>
// // // //               )}
// // // //             </div>
// // // //           </div>
// // // //         </div>
// // // //       </div>
// // // //     </>
// // // //   );
// // // // }

// // // // function MetaField({ label, children }: { label: string; children: React.ReactNode }) {
// // // //   return (
// // // //     <div className="space-y-2">
// // // //       <span className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">{label}</span>
// // // //       <div className="w-full">{children}</div>
// // // //     </div>
// // // //   );
// // // // }




































// // // import { useState, useEffect } from 'react';
// // // import { 
// // //   X, MessageSquare, Clock, CheckCircle2, Circle, 
// // //   AlertCircle, Plus, Paperclip, Send, Loader2, Edit2, Save, User as UserIcon 
// // // } from 'lucide-react';
// // // import { cn } from '@/lib/utils';
// // // import type { Task, Subtask, Comment, User } from '@/types';
// // // import { AvatarInitials, StatusDot } from '@/components/TaskBadges';
// // // import api from '@/lib/api'; 
// // // import { Button } from '@/components/ui/button';
// // // import { Input } from '@/components/ui/input';
// // // import { Textarea } from '@/components/ui/textarea';
// // // import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// // // interface TaskDrawerProps {
// // //   task: Task | null;
// // //   availableStatus: string[];
// // //   boardMembers: User[];
// // //   onClose: () => void;
// // //   onTaskUpdate: (updatedTask: Task) => void;
// // // }

// // // export function TaskDrawer({ task, availableStatus, boardMembers, onClose, onTaskUpdate }: TaskDrawerProps) {
// // //   const [activeTab, setActiveTab] = useState<'details' | 'subtasks' | 'comments'>('details');
// // //   const [isEditing, setIsEditing] = useState(false);
// // //   const [editedTask, setEditedTask] = useState<Partial<Task>>({});
  
// // //   const [subtasks, setSubtasks] = useState<Subtask[]>([]);
// // //   const [comments, setComments] = useState<Comment[]>([]);
// // //   const [newComment, setNewComment] = useState("");
// // //   const [isUploading, setIsUploading] = useState(false);
// // //   const [isAddingSubtask, setIsAddingSubtask] = useState(false);
// // //   const [subtaskForm, setSubtaskForm] = useState({ title: '', description: '', assigneeId: '', hours: 0 });

// // //   useEffect(() => {
// // //     if (task) {
// // //       setEditedTask(task);
// // //       setIsEditing(false);
// // //       setIsAddingSubtask(false);
// // //       fetchSubtasks();
// // //       fetchComments();
// // //     }
// // //   }, [task]);

// // //   const fetchSubtasks = async () => {
// // //     if (!task) return;
// // //     try {
// // //       const res = await api.get(`/api/tasks/${task.id}/subtasks`);
// // //       if (res.data.success) setSubtasks(res.data.subtasks);
// // //     } catch (err) { console.error(err); }
// // //   };

// // //     const handleAddComment = async (content: string, filePath?: string, fileName?: string) => {
// // //     if (!task || (!content.trim() && !filePath)) return;
// // //     try {
// // //       const res = await api.post(`/api/tasks/${task.id}/comments`, {
// // //         content,
// // //         filePath,
// // //         fileName
// // //       });
// // //       if (res.data.success) {
// // //         setComments(prev => [...prev, res.data.comment]);
// // //         setNewComment("");
// // //       }
// // //     } catch (err) { console.error("Comment failed", err); }
// // //   };


// // //     const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
// // //     const file = e.target.files?.[0];
// // //     if (!file) return;
// // //     const formData = new FormData();
// // //     formData.append('file', file);
// // //     setIsUploading(true);
// // //     try {
// // //       const res = await api.post('/dev/uploadData', formData, {
// // //         headers: { 'Content-Type': 'multipart/form-data' }
// // //       });
// // //       if (res.data.success) {
// // //         await handleAddComment(`Uploaded file: ${file.name}`, res.data.filePath, file.name);
// // //       }
// // //     } catch (err) { console.error("Upload failed", err); } finally { setIsUploading(false); }
// // //   };


// // //   const fetchComments = async () => {
// // //     if (!task) return;
// // //     try {
// // //       const res = await api.get(`/api/tasks/${task.id}/comments`);
// // //       if (res.data.success) setComments(res.data.comments);
// // //     } catch (err) { console.error(err); }
// // //   };

// // //   const handleUpdateTask = async () => {
// // //     if (!task) return;
// // //     try {
// // //       const res = await api.put(`/api/tasks/${task.id}`, editedTask);
// // //       if (res.data.success) {
// // //         onTaskUpdate(res.data.task);
// // //         setIsEditing(false);
// // //       }
// // //     } catch (err) { console.error("Update failed", err); }
// // //   };

// // //   const handleAddSubtask = async () => {
// // //     if (!task || !subtaskForm.title.trim()) return;
// // //     try {
// // //       const res = await api.post(`/api/tasks/${task.id}/subtasks`, {
// // //         ...subtaskForm,
// // //         assigneeId: subtaskForm.assigneeId ? parseInt(subtaskForm.assigneeId) : null,
// // //         hours: parseFloat(subtaskForm.hours.toString()) || 0
// // //       });
// // //       if (res.data.success) {
// // //         setSubtasks(prev => [...prev, res.data.subtask]);
// // //         setIsAddingSubtask(false);
// // //         setSubtaskForm({ title: '', description: '', assigneeId: '', hours: 0 });
// // //       }
// // //     } catch (err) { console.error(err); }
// // //   };

// // //   const handleSubtaskUpdate = async (sub: Subtask, updates: Partial<Subtask>) => {
// // //     try {
// // //       // Sends the full subtask structure as requested
// // //       const payload = {
// // //         title: updates.title ?? sub.title,
// // //         description: updates.description ?? sub.description,
// // //         status: updates.status ?? sub.status,
// // //         assigneeId: updates.assigneeId ?? sub.assigneeId,
// // //         hours: updates.hours ?? sub.hours
// // //       };
// // //       const res = await api.put(`/api/subtasks/${sub.id}`, payload);
// // //       if (res.data.success) {
// // //         setSubtasks(prev => prev.map(s => s.id === sub.id ? { ...s, ...updates } : s));
// // //       }
// // //     } catch (err) { console.error("Subtask update failed", err); }
// // //   };

// // //   if (!task) return null;

// // //   return (
// // //     <>
// // //       <div className="fixed inset-0 bg-background/60 backdrop-blur-sm z-40" onClick={onClose} />
// // //       <div className="fixed right-0 top-0 h-full w-[540px] max-w-full bg-slate-950 border-l border-slate-800 z-50 flex flex-col shadow-2xl animate-in slide-in-from-right duration-300">
        
// // //         {/* Header */}
// // //         <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800">
// // //           <div className="flex items-center gap-3">
// // //             <StatusDot status={editedTask.status || task.status} />
// // //             <span className="text-xs font-mono text-slate-500 uppercase tracking-wider">TASK-{task.id}</span>
// // //           </div>
// // //           <div className="flex items-center gap-2">
// // //             {isEditing ? (
// // //               <Button size="sm" onClick={handleUpdateTask} className="h-8 bg-blue-600 hover:bg-blue-700 text-white font-medium">
// // //                 <Save className="w-3.5 h-3.5 mr-2" /> Save
// // //               </Button>
// // //             ) : (
// // //               <button onClick={() => setIsEditing(true)} className="p-2 rounded-md hover:bg-slate-900 text-slate-400 transition-colors">
// // //                 <Edit2 className="w-4 h-4" />
// // //               </button>
// // //             )}
// // //             <button onClick={onClose} className="p-2 rounded-md hover:bg-slate-900 text-slate-400"><X className="w-5 h-5" /></button>
// // //           </div>
// // //         </div>

// // //         <div className="flex-1 overflow-y-auto scrollbar-none p-6">
// // //           {/* Title & Priority Section */}
// // //           <div className="mb-8">
// // //             <div className="flex items-start justify-between gap-4 mb-3">
// // //               <div className="flex-1">
// // //                 {isEditing ? (
// // //                   <Input 
// // //                     value={editedTask.title} 
// // //                     onChange={e => setEditedTask({...editedTask, title: e.target.value})}
// // //                     className="text-xl font-bold bg-slate-900 border-slate-800 text-slate-100 placeholder:text-slate-600 focus-visible:ring-blue-500"
// // //                   />
// // //                 ) : (
// // //                   <h2 className="text-2xl font-bold text-slate-100 leading-tight inline-block mr-3">{task.title}</h2>
// // //                 )}
                
// // //                 {/* Colored Priority Text on Title Line */}
// // //                 {!isEditing && (
// // //                   <span className={cn(
// // //                     "text-[11px] font-bold uppercase tracking-widest align-middle",
// // //                     task.priority === 'High' ? "text-red-500" : task.priority === 'Medium' ? "text-yellow-500" : "text-green-500"
// // //                   )}>
// // //                     {task.priority}
// // //                   </span>
// // //                 )}
// // //               </div>
// // //             </div>

// // //             {isEditing ? (
// // //               <Textarea 
// // //                 value={editedTask.description || ''} 
// // //                 onChange={e => setEditedTask({...editedTask, description: e.target.value})}
// // //                 placeholder="Task description..."
// // //                 className="min-h-[100px] bg-slate-900 border-slate-800 text-slate-300 text-sm focus-visible:ring-blue-500"
// // //               />
// // //             ) : (
// // //               <p className="text-sm text-slate-400 leading-relaxed">{task.description || 'No description provided.'}</p>
// // //             )}
// // //           </div>

// // //           {/* Info Grid */}
// // //           <div className="grid grid-cols-2 gap-x-8 gap-y-6 mb-8 bg-slate-900/40 p-5 rounded-xl border border-slate-800/50">
// // //             <MetaField label="Status">
// // //               <Select 
// // //                 value={editedTask.status} 
// // //                 onValueChange={(val) => { setEditedTask({...editedTask, status: val}); if(!isEditing) handleUpdateTask(); }}
// // //               >
// // //                 <SelectTrigger className="h-9 bg-slate-950 border-slate-800 text-slate-200 text-xs shadow-sm"><SelectValue /></SelectTrigger>
// // //                 <SelectContent className="bg-slate-900 border-slate-800 text-slate-200">
// // //                   {availableStatus.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
// // //                 </SelectContent>
// // //               </Select>
// // //             </MetaField>

// // //             <MetaField label="Assignee">
// // //               <Select 
// // //                 value={editedTask.assigneeId?.toString()} 
// // //                 onValueChange={(val) => { setEditedTask({...editedTask, assigneeId: parseInt(val)}); if(!isEditing) handleUpdateTask(); }}
// // //               >
// // //                 <SelectTrigger className="h-9 bg-slate-950 border-slate-800 text-slate-200 text-xs shadow-sm"><SelectValue placeholder="Unassigned" /></SelectTrigger>
// // //                 <SelectContent className="bg-slate-900 border-slate-800 text-slate-200">
// // //                   {boardMembers.map(m => <SelectItem key={m.id} value={m.id.toString()}>{m.name}</SelectItem>)}
// // //                 </SelectContent>
// // //               </Select>
// // //             </MetaField>

// // //             {/* Restored Metrics as Text Values */}
// // //             <MetaField label="Story Points">
// // //               {isEditing ? (
// // //                 <Input type="number" className="h-9 bg-slate-950 border-slate-800 text-slate-200 text-xs" value={editedTask.storyPoints} onChange={e => setEditedTask({...editedTask, storyPoints: parseInt(e.target.value)})} />
// // //               ) : (
// // //                 <div className="h-9 flex items-center text-slate-300 text-sm font-medium">{task.storyPoints || 0} SP</div>
// // //               )}
// // //             </MetaField>

// // //             <MetaField label="Hours Remaining">
// // //               {isEditing ? (
// // //                 <Input type="number" className="h-9 bg-slate-950 border-slate-800 text-slate-200 text-xs" value={editedTask.hours} onChange={e => setEditedTask({...editedTask, hours: parseFloat(e.target.value)})} />
// // //               ) : (
// // //                 <div className="h-9 flex items-center text-slate-300 text-sm font-medium">{task.hours || 0}h</div>
// // //               )}
// // //             </MetaField>
            
// // //             {isEditing && (
// // //               <MetaField label="Edit Priority">
// // //                 <Select value={editedTask.priority} onValueChange={(val) => setEditedTask({...editedTask, priority: val as any})}>
// // //                   <SelectTrigger className="h-9 bg-slate-950 border-slate-800 text-slate-200 text-xs"><SelectValue /></SelectTrigger>
// // //                   <SelectContent className="bg-slate-900 border-slate-800 text-slate-200">
// // //                     {['Low', 'Medium', 'High'].map(p => <SelectItem key={p} value={p}>{p}</SelectItem>)}
// // //                   </SelectContent>
// // //                 </Select>
// // //               </MetaField>
// // //             )}
// // //           </div>

// // //           {/* Navigation Tabs */}
// // //           <div className="space-y-6">
// // //             <div className="flex gap-8 border-b border-slate-800">
// // //               {(['details', 'subtasks', 'comments'] as const).map((tab) => (
// // //                 <button
// // //                   key={tab}
// // //                   onClick={() => setActiveTab(tab)}
// // //                   className={cn(
// // //                     'text-xs py-3 border-b-2 transition-all capitalize font-semibold tracking-wide',
// // //                     activeTab === tab ? 'border-blue-500 text-slate-100' : 'border-transparent text-slate-500 hover:text-slate-300'
// // //                   )}
// // //                 >
// // //                   {tab} ({tab === 'subtasks' ? subtasks.length : comments.length})
// // //                 </button>
// // //               ))}
// // //             </div>

// // //             <div className="pb-10">
// // //               {activeTab === 'subtasks' && (
// // //                 <div className="space-y-4">
// // //                   {subtasks.map((sub) => (
// // //                     <div key={sub.id} className="flex items-start gap-4 p-4 rounded-xl bg-slate-900/50 border border-slate-800 group hover:bg-slate-900">
// // //                       <button 
// // //                         onClick={() => handleSubtaskUpdate(sub, { status: sub.status === 'Done' ? 'Active' : 'Done' })} 
// // //                         className="mt-0.5 text-slate-500 hover:text-green-500 transition-transform active:scale-90"
// // //                       >
// // //                         {sub.status === 'Done' ? <CheckCircle2 className="w-5 h-5 text-green-500" /> : <Circle className="w-5 h-5" />}
// // //                       </button>
// // //                       <div className="flex-1 min-w-0">
// // //                         <p className={cn('text-sm font-medium text-slate-200', sub.status === 'Done' && 'line-through text-slate-600')}>{sub.title}</p>
// // //                         {sub.description && <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">{sub.description}</p>}
// // //                         <div className="flex items-center gap-3 mt-2 text-[10px] text-slate-600 font-mono">
// // //                           <span>{sub.hours}h</span>
// // //                           <span>•</span>
// // //                           <span className="flex items-center gap-1"><UserIcon className="w-3 h-3" /> {sub.assigneeName || 'Unassigned'}</span>
// // //                         </div>
// // //                       </div>
// // //                       <AvatarInitials name={sub.assigneeName || ''} />
// // //                     </div>
// // //                   ))}

// // //                   {isAddingSubtask ? (
// // //                     <div className="p-5 rounded-xl border border-blue-500/30 bg-slate-900/80 space-y-4 shadow-inner">
// // //                       <Input placeholder="Subtask title" value={subtaskForm.title} onChange={e => setSubtaskForm({...subtaskForm, title: e.target.value})} className="bg-slate-950 border-slate-800 text-sm text-slate-100" />
// // //                       <Textarea placeholder="Details (Description)..." value={subtaskForm.description} onChange={e => setSubtaskForm({...subtaskForm, description: e.target.value})} className="bg-slate-950 border-slate-800 text-xs min-h-[60px] text-slate-300" />
// // //                       <div className="grid grid-cols-2 gap-3">
// // //                         <Select onValueChange={v => setSubtaskForm({...subtaskForm, assigneeId: v})}>
// // //                           <SelectTrigger className="h-8 bg-slate-950 border-slate-800 text-[11px] text-slate-200"><SelectValue placeholder="Assignee" /></SelectTrigger>
// // //                           <SelectContent className="bg-slate-900 border-slate-800 text-slate-200">{boardMembers.map(m => <SelectItem key={m.id} value={m.id.toString()}>{m.name}</SelectItem>)}</SelectContent>
// // //                         </Select>
// // //                         <Input type="number" placeholder="Hours" value={subtaskForm.hours} onChange={e => setSubtaskForm({...subtaskForm, hours: parseFloat(e.target.value)})} className="h-8 bg-slate-950 border-slate-800 text-xs text-slate-200" />
// // //                       </div>
// // //                       <div className="flex justify-end gap-2 pt-2"><Button size="sm" variant="ghost" onClick={() => setIsAddingSubtask(false)}>Cancel</Button><Button size="sm" onClick={handleAddSubtask} className="bg-blue-600 h-8 px-4 text-xs font-medium">Create Subtask</Button></div>
// // //                     </div>
// // //                   ) : (
// // //                     <Button variant="ghost" onClick={() => setIsAddingSubtask(true)} className="w-full justify-start text-slate-500 hover:text-slate-200 h-11 border border-dashed border-slate-800 hover:border-slate-700 transition-all">
// // //                       <Plus className="w-4 h-4 mr-2" /> New Subtask
// // //                     </Button>
// // //                   )}
// // //                 </div>
// // //               )}

// // //               {activeTab === 'details' && (
// // //                 <div className="space-y-5 pt-2">
// // //                   <div className="flex items-center gap-3 text-xs text-slate-500">
// // //                     <Clock className="w-4 h-4" />
// // //                     <span>Created on {new Date(task.createdAt).toLocaleDateString(undefined, { dateStyle: 'long' })}</span>
// // //                   </div>
// // //                   <div className="flex items-center gap-3 text-xs text-slate-500">
// // //                     <AlertCircle className="w-4 h-4" />
// // //                     <span>Last modified {new Date(task.updatedAt).toLocaleDateString(undefined, { dateStyle: 'long' })}</span>
// // //                   </div>
// // //                 </div>
// // //               )}

// // //               {activeTab === 'comments' && (
// // //                 <div className="space-y-6">
// // //                   <div className="space-y-5 max-h-[400px] overflow-y-auto pr-2 scrollbar-none">
// // //                     {comments.map(c => (
// // //                       <div key={c.id} className="flex gap-4">
// // //                         <AvatarInitials name={c.userName || 'U'} />
// // //                         <div className="flex-1 bg-slate-900/80 p-4 rounded-2xl border border-slate-800 shadow-sm">
// // //                           <div className="flex justify-between mb-1.5">
// // //                             <span className="font-bold text-[10px] uppercase text-blue-400 tracking-widest">{c.userName}</span>
// // //                             <span className="text-[10px] text-slate-500">{new Date(c.createdAt).toLocaleDateString()}</span>
// // //                           </div>
// // //                           <p className="text-slate-300 text-sm leading-relaxed">{c.content}</p>
// // //                           {c.filePath && (
// // //                             <a href={`http://localhost:4000${c.filePath}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 mt-3 p-2 bg-slate-950 rounded-lg border border-slate-800 text-[11px] text-slate-400 hover:text-white transition-colors">
// // //                               <Paperclip className="w-3.5 h-3.5" /> {c.fileName || 'Attachment'}
// // //                             </a>
// // //                           )}
// // //                         </div>
// // //                       </div>
// // //                     ))}
// // //                   </div>
// // //                   <div className="relative pt-4">
// // //                     <Textarea placeholder="Add a comment or feedback..." value={newComment} onChange={e => setNewComment(e.target.value)} className="pr-24 min-h-[100px] bg-slate-900 border-slate-800 text-slate-200 text-sm focus-visible:ring-blue-500" />
// // //                     <div className="absolute right-3 bottom-3 flex gap-2">
// // //                       <label className="cursor-pointer p-2 hover:bg-slate-800 rounded-md text-slate-500 hover:text-slate-100 transition-colors">
// // //                         <input type="file" className="hidden" onChange={handleFileUpload} disabled={isUploading} />
// // //                         {isUploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Paperclip className="w-4 h-4" />}
// // //                       </label>
// // //                       <Button onClick={() => handleAddComment(newComment)} disabled={!newComment.trim() && !isUploading} className="h-8 px-3 bg-blue-600 hover:bg-blue-700 transition-colors"><Send className="w-3.5 h-3.5" /></Button>
// // //                     </div>
// // //                   </div>
// // //                 </div>
// // //               )}
// // //             </div>
// // //           </div>
// // //         </div>
// // //       </div>
// // //     </>
// // //   );
// // // }

// // // function MetaField({ label, children }: { label: string; children: React.ReactNode }) {
// // //   return (
// // //     <div className="space-y-2">
// // //       <span className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">{label}</span>
// // //       <div className="w-full">{children}</div>
// // //     </div>
// // //   );
// // // }






























// // import { useState, useEffect } from 'react';
// // import { 
// //   X, MessageSquare, Clock, CheckCircle2, Circle, 
// //   AlertCircle, Plus, Paperclip, Send, Loader2, Edit2, Save, User as UserIcon, History, Calendar
// // } from 'lucide-react';
// // import { cn } from '@/lib/utils';
// // import type { Task, Subtask, Comment, User, SubtaskWorkLog } from '@/types';
// // import { AvatarInitials, StatusDot } from '@/components/TaskBadges';
// // import api from '@/lib/api'; 
// // import { Button } from '@/components/ui/button';
// // import { Input } from '@/components/ui/input';
// // import { Textarea } from '@/components/ui/textarea';
// // import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
// // import { Label } from '@/components/ui/label';

// // interface TaskDrawerProps {
// //   task: Task | null;
// //   availableStatus: string[];
// //   boardMembers: User[];
// //   onClose: () => void;
// //   onTaskUpdate: (updatedTask: Task) => void;
// // }

// // export function TaskDrawer({ task, availableStatus, boardMembers, onClose, onTaskUpdate }: TaskDrawerProps) {
// //   const [activeTab, setActiveTab] = useState<'details' | 'subtasks' | 'comments'>('details');
// //   const [isEditingTask, setIsEditingTask] = useState(false);
// //   const [editedTask, setEditedTask] = useState<Partial<Task>>({});
  
// //   // Data States
// //   const [subtasks, setSubtasks] = useState<Subtask[]>([]);
// //   const [workLogs, setWorkLogs] = useState<Record<number, SubtaskWorkLog[]>>({});
// //   const [comments, setComments] = useState<Comment[]>([]);
  
// //   // UI States
// //   const [editingSubtaskId, setEditingSubtaskId] = useState<number | null>(null);
// //   const [loggingHoursFor, setLoggingHoursFor] = useState<number | null>(null);
// //   const [newComment, setNewComment] = useState("");
// //   const [isUploading, setIsUploading] = useState(false);

// //   // Form States
// //   const [subtaskEditForm, setSubtaskEditForm] = useState<Partial<Subtask>>({});
// //   const [subtaskCreateForm, setSubtaskCreateForm] = useState({ title: '', description: '', assigneeId: '', hours: 0 });
// //   const [isAddingSubtask, setIsAddingSubtask] = useState(false);
// //   const [logForm, setLogForm] = useState({ hoursWorked: 0, workDate: new Date().toISOString().split('T') });

// //   useEffect(() => {
// //     if (task) {
// //       setEditedTask(task);
// //       setIsEditingTask(false);
// //       setIsAddingSubtask(false);
// //       fetchSubtasks();
// //       fetchComments();
// //     }
// //   }, [task]);

// //   const fetchSubtasks = async () => {
// //     if (!task) return;
// //     try {
// //       const res = await api.get(`/api/tasks/${task.id}/subtasks`);
// //       if (res.data.success) {
// //         setSubtasks(res.data.subtasks);
// //         res.data.subtasks.forEach((s: Subtask) => fetchWorkLogs(s.id));
// //       }
// //     } catch (err) { console.error(err); }
// //   };

// //   const fetchWorkLogs = async (subtaskId: number) => {
// //     try {
// //       const res = await api.get(`/api/subtasks/${subtaskId}/worklogs`);
// //       if (res.data.success) setWorkLogs(prev => ({ ...prev, [subtaskId]: res.data.workLogs }));
// //     } catch (err) { console.error(err); }
// //   };

// //   const fetchComments = async () => {
// //     if (!task) return;
// //     try {
// //       const res = await api.get(`/api/tasks/${task.id}/comments`);
// //       if (res.data.success) setComments(res.data.comments);
// //     } catch (err) { console.error(err); }
// //   };

// //   const handleUpdateTask = async () => {
// //     if (!task) return;
// //     try {
// //       const res = await api.put(`/api/tasks/${task.id}`, editedTask);
// //       if (res.data.success) {
// //         onTaskUpdate(res.data.task);
// //         setIsEditingTask(false);
// //       }
// //     } catch (err) { console.error("Update failed", err); }
// //   };

// //   const handleSubtaskUpdate = async (subId: number, data: Partial<Subtask>) => {
// //     try {
// //       // Send title, description, status, assigneeId, hours to the API
// //       const res = await api.put(`/api/subtasks/${subId}`, data);
// //       if (res.data.success) {
// //         setSubtasks(prev => prev.map(s => s.id === subId ? { ...s, ...data } : s));
// //         setEditingSubtaskId(null);
// //       }
// //     } catch (err) { console.error(err); }
// //   };

// //   const handleAddSubtask = async () => {
// //     if (!task || !subtaskCreateForm.title.trim()) return;
// //     try {
// //       const res = await api.post(`/api/tasks/${task.id}/subtasks`, {
// //         ...subtaskCreateForm,
// //         assigneeId: subtaskCreateForm.assigneeId ? parseInt(subtaskCreateForm.assigneeId) : null,
// //         hours: parseFloat(subtaskCreateForm.hours.toString()) || 0
// //       });
// //       if (res.data.success) {
// //         setSubtasks(prev => [...prev, res.data.subtask]);
// //         setIsAddingSubtask(false);
// //         setSubtaskCreateForm({ title: '', description: '', assigneeId: '', hours: 0 });
// //       }
// //     } catch (err) { console.error(err); }
// //   };

// //   const handleAddWorkLog = async (subtaskId: number) => {
// //     if (logForm.hoursWorked <= 0) return;
// //     try {
// //       const res = await api.post(`/api/subtasks/${subtaskId}/worklogs`, logForm);
// //       if (res.data.success) {
// //         setLoggingHoursFor(null);
// //         fetchWorkLogs(subtaskId);
// //         setLogForm({ hoursWorked: 0, workDate: new Date().toISOString().split('T') });
// //       }
// //     } catch (err) { console.error(err); }
// //   };

// //   const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
// //     const file = e.target.files?.[0];
// //     if (!file) return;
// //     const formData = new FormData();
// //     formData.append('file', file);
// //     setIsUploading(true);
// //     try {
// //       const res = await api.post('/dev/uploadData', formData, {
// //         headers: { 'Content-Type': 'multipart/form-data' }
// //       });
// //       if (res.data.success) {
// //         await handleAddComment(`Shared an attachment: ${file.name}`, res.data.filePath, file.name);
// //       }
// //     } catch (err) { console.error(err); } finally { setIsUploading(false); }
// //   };

// //   const handleAddComment = async (content: string, filePath?: string, fileName?: string) => {
// //     if (!task || (!content.trim() && !filePath)) return;
// //     try {
// //       const res = await api.post(`/api/tasks/${task.id}/comments`, { 
// //         content, filePath, fileName 
// //       });
// //       if (res.data.success) {
// //         setComments(prev => [...prev, res.data.comment]);
// //         setNewComment("");
// //       }
// //     } catch (err) { console.error(err); }
// //   };

// //   if (!task) return null;

// //   return (
// //     <>
// //       <div className="fixed inset-0 bg-background/60 backdrop-blur-sm z-40" onClick={onClose} />
// //       <div className="fixed right-0 top-0 h-full w-full md:w-1/2 bg-slate-950 border-l border-slate-800 z-50 flex flex-col shadow-2xl animate-in slide-in-from-right duration-300">
        
// //         {/* Header */}
// //         <div className="flex items-center justify-between px-6 py-5 border-b border-slate-800 bg-slate-900/20">
// //           <div className="flex items-center gap-4">
// //             <StatusDot status={editedTask.status || task.status} />
// //             <div className="flex flex-col">
// //               <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest leading-none mb-1">TASK-{task.id}</span>
// //               <span className={cn(
// //                 "text-[10px] font-bold uppercase tracking-widest leading-none",
// //                 task.priority === 'High' ? "text-red-500" : task.priority === 'Medium' ? "text-yellow-500" : "text-green-500"
// //               )}>{task.priority} Priority</span>
// //             </div>
// //           </div>
// //           <div className="flex items-center gap-3">
// //             {isEditingTask ? (
// //               <Button size="sm" onClick={handleUpdateTask} className="bg-blue-600 hover:bg-blue-700 text-white font-medium">
// //                 <Save className="w-4 h-4 mr-2" /> Save Changes
// //               </Button>
// //             ) : (
// //               <button onClick={() => setIsEditingTask(true)} className="p-2 rounded-md hover:bg-slate-900 text-slate-400 transition-colors border border-transparent hover:border-slate-800">
// //                 <Edit2 className="w-4 h-4" />
// //               </button>
// //             )}
// //             <button onClick={onClose} className="p-2 rounded-md hover:bg-slate-900 text-slate-400 transition-colors border border-transparent hover:border-slate-800"><X className="w-5 h-5" /></button>
// //           </div>
// //         </div>

// //         <div className="flex-1 overflow-y-auto scrollbar-none p-8">
          
// //           {/* Title Section */}
// //           <div className="mb-10">
// //             {isEditingTask ? (
// //               <div className="space-y-4">
// //                 <Input 
// //                   value={editedTask.title} 
// //                   onChange={e => setEditedTask({...editedTask, title: e.target.value})}
// //                   className="text-2xl font-bold bg-slate-900/50 border-slate-800 text-slate-100 h-14"
// //                 />
// //                 <Textarea 
// //                   value={editedTask.description || ''} 
// //                   onChange={e => setEditedTask({...editedTask, description: e.target.value})}
// //                   className="min-h-[120px] bg-slate-900/50 border-slate-800 text-slate-300 text-base"
// //                 />
// //               </div>
// //             ) : (
// //               <div>
// //                 <h2 className="text-3xl font-bold text-slate-100 mb-4 tracking-tight leading-tight">{task.title}</h2>
// //                 <p className="text-base text-slate-400 leading-relaxed">{task.description || 'No description provided.'}</p>
// //               </div>
// //             )}
// //           </div>

// //           {/* Task Info Grid */}
// //           <div className="grid grid-cols-4 gap-6 mb-10 bg-slate-900/40 p-6 rounded-2xl border border-slate-800/50">
// //              <MetaBlock label="Status" value={task.status} icon={<StatusDot status={task.status} className="w-2 h-2" />} />
// //              <MetaBlock label="Assignee" value={task.assigneeName || 'Unassigned'} icon={<UserIcon className="w-3 h-3" />} />
// //              <MetaBlock label="Story Points" value={`${task.storyPoints} SP`} />
// //              <MetaBlock label="Estimated" value={`${task.hours}h`} />
// //           </div>

// //           {/* Tabs */}
// //           <div className="flex gap-10 border-b border-slate-800 mb-8">
// //             {['details', 'subtasks', 'comments'].map((tab) => (
// //               <button 
// //                 key={tab} 
// //                 onClick={() => setActiveTab(tab as any)} 
// //                 className={cn(
// //                   'text-sm py-4 border-b-2 transition-all capitalize font-bold tracking-wide', 
// //                   activeTab === tab ? 'border-blue-500 text-slate-100' : 'border-transparent text-slate-500 hover:text-slate-300'
// //                 )}
// //               >
// //                 {tab === 'subtasks' ? `Subtasks (${subtasks.length})` : tab === 'comments' ? `Discussion (${comments.length})` : 'Info'}
// //               </button>
// //             ))}
// //           </div>

// //           <div className="pb-24">
// //             {activeTab === 'subtasks' && (
// //               <div className="space-y-6">
// //                 {subtasks.map((sub) => {
// //                   const logged = workLogs[sub.id]?.reduce((acc, curr) => acc + Number(curr.hoursWorked), 0) || 0;
// //                   const isEditingSub = editingSubtaskId === sub.id;

// //                   return (
// //                     <div key={sub.id} className="p-6 rounded-2xl bg-slate-900/30 border border-slate-800 group hover:border-slate-700 transition-all">
// //                       {isEditingSub ? (
// //                         <div className="space-y-4">
// //                           <Input value={subtaskEditForm.title} onChange={e => setSubtaskEditForm({...subtaskEditForm, title: e.target.value})} className="bg-slate-950 border-slate-800" />
// //                           <Textarea value={subtaskEditForm.description} onChange={e => setSubtaskEditForm({...subtaskEditForm, description: e.target.value})} className="bg-slate-950 border-slate-800 text-sm" />
// //                           <div className="flex gap-3">
// //                             <Select value={subtaskEditForm.assigneeId?.toString()} onValueChange={v => setSubtaskEditForm({...subtaskEditForm, assigneeId: parseInt(v)})}>
// //                                <SelectTrigger className="bg-slate-950 border-slate-800 h-9"><SelectValue placeholder="Assignee"/></SelectTrigger>
// //                                <SelectContent className="bg-slate-900 border-slate-800 text-slate-100">{boardMembers.map(m => <SelectItem key={m.id} value={m.id.toString()}>{m.name}</SelectItem>)}</SelectContent>
// //                             </Select>
// //                             <Input type="number" placeholder="Hours" value={subtaskEditForm.hours} onChange={e => setSubtaskEditForm({...subtaskEditForm, hours: parseFloat(e.target.value)})} className="bg-slate-950 border-slate-800 w-32 h-9" />
// //                           </div>
// //                           <div className="flex gap-2 justify-end">
// //                              <Button size="sm" variant="ghost" onClick={() => setEditingSubtaskId(null)}>Cancel</Button>
// //                              <Button size="sm" onClick={() => handleSubtaskUpdate(sub.id, subtaskEditForm)} className="bg-blue-600">Update</Button>
// //                           </div>
// //                         </div>
// //                       ) : (
// //                         <div className="space-y-5">
// //                           <div className="flex items-start justify-between">
// //                             <div className="flex items-start gap-4">
// //                               <button onClick={() => handleSubtaskUpdate(sub.id, { status: sub.status === 'Done' ? 'Active' : 'Done' })} className="mt-1">
// //                                 {sub.status === 'Done' ? <CheckCircle2 className="w-6 h-6 text-green-500" /> : <Circle className="w-6 h-6 text-slate-700" />}
// //                               </button>
// //                               <div className="min-w-0">
// //                                 <p className={cn("text-lg font-bold text-slate-100", sub.status === 'Done' && "line-through text-slate-600 opacity-60")}>{sub.title}</p>
// //                                 <p className="text-sm text-slate-500 mt-1 leading-relaxed">{sub.description}</p>
// //                               </div>
// //                             </div>
// //                             <button onClick={() => { setEditingSubtaskId(sub.id); setSubtaskEditForm(sub); }} className="p-2 opacity-0 group-hover:opacity-100 hover:bg-slate-800 rounded-md text-slate-500 transition-all"><Edit2 className="w-4 h-4" /></button>
// //                           </div>
                          
// //                           <div className="flex items-center justify-between pt-5 border-t border-slate-800/50">
// //                             <div className="flex gap-8">
// //                               <LogStat label="Estimated" value={`${sub.hours}h`} />
// //                               <LogStat label="Logged" value={`${logged}h`} color={logged > sub.hours ? "text-red-400" : "text-green-400"} />
// //                               <LogStat label="Left" value={`${Math.max(0, sub.hours - logged)}h`} />
// //                             </div>
// //                             <div className="flex items-center gap-3">
// //                                <Button size="sm" variant="outline" onClick={() => setLoggingHoursFor(loggingHoursFor === sub.id ? null : sub.id)} className="border-slate-700 h-9 px-4 text-[11px] font-bold hover:bg-slate-800"><Clock className="w-4 h-4 mr-2 text-blue-400"/> Log Hours</Button>
// //                                <AvatarInitials name={sub.assigneeName || ''} />
// //                             </div>
// //                           </div>

// //                           {loggingHoursFor === sub.id && (
// //                             <div className="flex gap-3 pt-5 animate-in slide-in-from-top-2">
// //                               <Input type="number" placeholder="Hrs" onChange={e => setLogForm({...logForm, hoursWorked: parseFloat(e.target.value)})} className="bg-slate-950 border-slate-800 w-24 h-10" />
// //                               <Input type="date" value={logForm.workDate} onChange={e => setLogForm({...logForm, workDate: e.target.value})} className="bg-slate-950 border-slate-800 w-44 h-10" />
// //                               <Button onClick={() => handleAddWorkLog(sub.id)} className="bg-green-600 h-10 px-6 font-bold">Record</Button>
// //                             </div>
// //                           )}

// //                           {workLogs[sub.id]?.length > 0 && (
// //                             <div className="mt-5 p-5 bg-slate-950/40 rounded-2xl border border-slate-800/50 space-y-3">
// //                                <p className="text-[10px] uppercase text-slate-500 font-bold tracking-widest flex items-center gap-2 mb-1"><History className="w-3.5 h-3.5 text-blue-500"/> Work Log History</p>
// //                                {workLogs[sub.id].map(log => (
// //                                  <div key={log.id} className="text-xs text-slate-400 flex justify-between py-2 border-b border-slate-800/50 last:border-0 transition-colors">
// //                                    <span className="flex items-center gap-2"><Calendar className="w-3 h-3 opacity-50"/> {new Date(log.workDate).toLocaleDateString()}</span>
// //                                    <span className="font-bold text-slate-200">{log.hoursWorked}h</span>
// //                                  </div>
// //                                ))}
// //                             </div>
// //                           )}
// //                         </div>
// //                       )}
// //                     </div>
// //                   );
// //                 })}
// //                 {isAddingSubtask ? (
// //                   <div className="p-6 rounded-2xl border border-blue-500/30 bg-slate-900/50 space-y-4">
// //                     <Input placeholder="Subtask title" value={subtaskCreateForm.title} onChange={e => setSubtaskCreateForm({...subtaskCreateForm, title: e.target.value})} className="bg-slate-950 border-slate-800" />
// //                     <Textarea placeholder="Details..." value={subtaskCreateForm.description} onChange={e => setSubtaskCreateForm({...subtaskCreateForm, description: e.target.value})} className="bg-slate-950 border-slate-800 text-sm" />
// //                     <div className="flex gap-3">
// //                        <Select onValueChange={v => setSubtaskCreateForm({...subtaskCreateForm, assigneeId: v})}>
// //                           <SelectTrigger className="bg-slate-950 border-slate-800 h-9"><SelectValue placeholder="Assignee"/></SelectTrigger>
// //                           <SelectContent className="bg-slate-900 border-slate-800 text-slate-100">{boardMembers.map(m => <SelectItem key={m.id} value={m.id.toString()}>{m.name}</SelectItem>)}</SelectContent>
// //                        </Select>
// //                        <Input type="number" placeholder="Est. Hours" value={subtaskCreateForm.hours} onChange={e => setSubtaskCreateForm({...subtaskCreateForm, hours: parseFloat(e.target.value)})} className="bg-slate-950 border-slate-800 w-32 h-9" />
// //                     </div>
// //                     <div className="flex gap-2 justify-end">
// //                        <Button size="sm" variant="ghost" onClick={() => setIsAddingSubtask(false)}>Cancel</Button>
// //                        <Button size="sm" onClick={handleAddSubtask} className="bg-blue-600">Create</Button>
// //                     </div>
// //                   </div>
// //                 ) : (
// //                   <Button variant="ghost" onClick={() => setIsAddingSubtask(true)} className="w-full justify-start text-slate-500 hover:text-slate-200 h-14 border border-dashed border-slate-800 hover:border-slate-700">
// //                     <Plus className="w-5 h-5 mr-3" /> New Subtask
// //                   </Button>
// //                 )}
// //               </div>
// //             )}

// //             {activeTab === 'comments' && (
// //               <div className="space-y-8">
// //                 <div className="space-y-6 max-h-[500px] overflow-y-auto pr-3 scrollbar-none">
// //                   {comments.map(c => (
// //                     <div key={c.id} className="flex gap-5">
// //                       <AvatarInitials name={c.userName} />
// //                       <div className="flex-1 bg-slate-900/60 p-5 rounded-2xl rounded-tl-none border border-slate-800 shadow-sm relative group">
// //                         <div className="flex justify-between items-center mb-3">
// //                           <span className="font-bold text-[11px] uppercase text-blue-400 tracking-widest">{c.userName}</span>
// //                           <span className="text-[10px] text-slate-600 font-mono">{new Date(c.createdAt).toLocaleString()}</span>
// //                         </div>
// //                         <p className="text-slate-200 text-sm leading-relaxed whitespace-pre-wrap">{c.content}</p>
// //                         {c.filePath && (
// //                           <a href={`http://localhost:4000${c.filePath}`} target="_blank" rel="noopener noreferrer" 
// //                              className="flex items-center gap-3 mt-5 p-4 bg-slate-950/80 rounded-xl border border-slate-800 hover:border-blue-500/40 transition-all group/file">
// //                             <Paperclip className="w-4 h-4 text-blue-400" />
// //                             <div className="flex flex-col min-w-0">
// //                                <span className="text-xs font-bold text-slate-200 truncate">{c.fileName || 'Attachment'}</span>
// //                                <span className="text-[9px] text-slate-500 uppercase">Click to open</span>
// //                             </div>
// //                           </a>
// //                         )}
// //                       </div>
// //                     </div>
// //                   ))}
// //                 </div>
                
// //                 <div className="relative pt-6 border-t border-slate-800">
// //                   <Textarea 
// //                     placeholder="Type your message..." 
// //                     value={newComment} 
// //                     onChange={e => setNewComment(e.target.value)} 
// //                     className="pr-28 min-h-[120px] bg-slate-900/80 border-slate-800 rounded-2xl text-slate-100 text-sm shadow-inner" 
// //                   />
// //                   <div className="absolute right-4 bottom-4 flex gap-3">
// //                     <label className="cursor-pointer p-2.5 hover:bg-slate-800 rounded-xl text-slate-500 hover:text-slate-100 transition-all border border-transparent hover:border-slate-700">
// //                       <input type="file" className="hidden" onChange={handleFileUpload} disabled={isUploading} />
// //                       {isUploading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Paperclip className="w-5 h-5" />}
// //                     </label>
// //                     <Button onClick={() => handleAddComment(newComment)} disabled={!newComment.trim() && !isUploading} className="h-11 px-6 bg-blue-600 hover:bg-blue-700 rounded-xl font-bold shadow-lg shadow-blue-900/20">
// //                       <Send className="w-4 h-4" />
// //                     </Button>
// //                   </div>
// //                 </div>
// //               </div>
// //             )}

// //             {activeTab === 'details' && (
// //               <div className="space-y-6 pt-4 animate-in fade-in">
// //                 <TimelineBlock label="Created" date={task.createdAt} icon={<Calendar className="w-4 h-4 text-blue-400"/>}/>
// //                 <TimelineBlock label="Updated" date={task.updatedAt} icon={<Clock className="w-4 h-4 text-purple-400"/>}/>
// //               </div>
// //             )}
// //           </div>
// //         </div>
// //       </div>
// //     </>
// //   );
// // }

// // // UI HELPERS

// // function MetaBlock({ label, value, icon }: { label: string; value: string; icon?: React.ReactNode }) {
// //   return (
// //     <div className="space-y-2">
// //       <p className="text-[10px] uppercase text-slate-500 font-bold tracking-widest leading-none">{label}</p>
// //       <div className="flex items-center gap-2">
// //         {icon}
// //         <p className="text-slate-100 font-bold text-sm truncate leading-none">{value}</p>
// //       </div>
// //     </div>
// //   );
// // }

// // function LogStat({ label, value, color }: { label: string; value: string; color?: string }) {
// //   return (
// //     <div className="space-y-1">
// //       <p className="text-[10px] uppercase text-slate-500 font-bold tracking-tighter leading-none">{label}</p>
// //       <p className={cn("text-sm font-mono font-bold leading-none", color || "text-slate-200")}>{value}</p>
// //     </div>
// //   );
// // }

// // function TimelineBlock({ label, date, icon }: { label: string; date: string; icon: React.ReactNode }) {
// //   return (
// //     <div className="flex items-center gap-5 p-6 rounded-2xl bg-slate-900/30 border border-slate-800">
// //       <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 shadow-sm">{icon}</div>
// //       <div>
// //         <p className="text-[10px] uppercase text-slate-500 font-bold tracking-widest mb-1">{label}</p>
// //         <p className="text-slate-100 font-medium text-base">{new Date(date).toLocaleString()}</p>
// //       </div>
// //     </div>
// //   );
// // }































// import { useState, useEffect } from 'react';
// import { 
//   X, MessageSquare, Clock, CheckCircle2, Circle, 
//   AlertCircle, Plus, Paperclip, Send, Loader2, Edit2, Save, User as UserIcon, History, Calendar
// } from 'lucide-react';
// import { cn } from '@/lib/utils';
// import type { Task, Subtask, Comment, User, SubtaskWorkLog } from '@/types';
// import { AvatarInitials, StatusDot } from '@/components/TaskBadges';
// import api from '@/lib/api'; 
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Textarea } from '@/components/ui/textarea';
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
// import { Label } from '@/components/ui/label';
// import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';

// interface TaskDrawerProps {
//   task: Task | null;
//   availableStatus: string[];
//   boardMembers: User[];
//   onClose: () => void;
//   onTaskUpdate: (updatedTask: Task) => void;
// }

// export function TaskDrawer({ task, availableStatus, boardMembers, onClose, onTaskUpdate }: TaskDrawerProps) {
//   const [activeTab, setActiveTab] = useState<'details' | 'subtasks' | 'comments'>('details');
//   const [isEditingTask, setIsEditingTask] = useState(false);
//   const [editedTask, setEditedTask] = useState<Partial<Task>>({});
  
//   // Data States
//   const [subtasks, setSubtasks] = useState<Subtask[]>([]);
//   const [workLogs, setWorkLogs] = useState<Record<number, SubtaskWorkLog[]>>({});
//   const [comments, setComments] = useState<Comment[]>([]);
  
//   // UI Flow States
//   const [editingSubtaskId, setEditingSubtaskId] = useState<number | null>(null);
//   const [loggingHoursFor, setLoggingHoursFor] = useState<Subtask | null>(null);
//   const [isAddingSubtask, setIsAddingSubtask] = useState(false);
//   const [newComment, setNewComment] = useState("");
//   const [isUploading, setIsUploading] = useState(false);

//   // Form States
//   const [subtaskEditForm, setSubtaskEditForm] = useState<Partial<Subtask>>({});
//   const [subtaskCreateForm, setSubtaskCreateForm] = useState({ title: '', description: '', assigneeId: '', hours: 0 });
//   const [logForm, setLogForm] = useState({ hoursWorked: 0, workDate: new Date().toISOString().split('T') });

//   useEffect(() => {
//     if (task) {
//       setEditedTask(task);
//       setIsEditingTask(false);
//       setIsAddingSubtask(false);
//       fetchSubtasks();
//       fetchComments();
//     }
//   }, [task]);

//   const fetchSubtasks = async () => {
//     if (!task) return;
//     try {
//       const res = await api.get(`/api/tasks/${task.id}/subtasks`);
//       if (res.data.success) {
//         setSubtasks(res.data.subtasks);
//         res.data.subtasks.forEach((s: Subtask) => fetchWorkLogs(s.id));
//       }
//     } catch (err) { console.error(err); }
//   };

//   const fetchWorkLogs = async (subtaskId: number) => {
//     try {
//       const res = await api.get(`/api/subtasks/${subtaskId}/worklogs`);
//       if (res.data.success) setWorkLogs(prev => ({ ...prev, [subtaskId]: res.data.worklogs }));
//     } catch (err) { console.error(err); }
//   };

//   const fetchComments = async () => {
//     if (!task) return;
//     try {
//       const res = await api.get(`/api/tasks/${task.id}/comments`);
//       if (res.data.success) setComments(res.data.comments);
//     } catch (err) { console.error(err); }
//   };

//   const handleUpdateTask = async () => {
//     if (!task) return;
//     try {
//       const res = await api.put(`/api/tasks/${task.id}`, editedTask);
//       if (res.data.success) {
//         onTaskUpdate(res.data.task);
//         setIsEditingTask(false);
//       }
//     } catch (err) { console.error("Update failed", err); }
//   };

//   const handleSubtaskUpdate = async (subId: number, data: Partial<Subtask>) => {
//     try {
//       const original = subtasks.find(s => s.id === subId);
//       if (!original) return;
//       const payload = { ...original, ...data };
//       const res = await api.put(`/api/subtasks/${subId}`, payload);
//       if (res.data.success) {
//         setSubtasks(prev => prev.map(s => s.id === subId ? { ...s, ...data } : s));
//         setEditingSubtaskId(null);
//       }
//     } catch (err) { console.error(err); }
//   };

//   const handleAddSubtask = async () => {
//     if (!task || !subtaskCreateForm.title.trim()) return;
//     try {
//       const res = await api.post(`/api/tasks/${task.id}/subtasks`, {
//         ...subtaskCreateForm,
//         assigneeId: subtaskCreateForm.assigneeId ? parseInt(subtaskCreateForm.assigneeId.toString()) : null,
//         hours: parseFloat(subtaskCreateForm.hours.toString()) || 0
//       });
//       if (res.data.success) {
//         setSubtasks(prev => [...prev, res.data.subtask]);
//         setIsAddingSubtask(false);
//         setSubtaskCreateForm({ title: '', description: '', assigneeId: '', hours: 0 });
//         fetchWorkLogs(res.data.subtask.id);
//       }
//     } catch (err) { console.error(err); }
//   };

//   const handleAddWorkLog = async () => {
//     if (!loggingHoursFor || logForm.hoursWorked <= 0) return;
//     try {
//       const res = await api.post(`/api/subtasks/${loggingHoursFor.id}/worklogs`, logForm);
//       if (res.data.success) {
//         fetchWorkLogs(loggingHoursFor.id);
//         setLoggingHoursFor(null);
//         setLogForm({ hoursWorked: 0, workDate: new Date().toISOString().split('T') });
//       }
//     } catch (err) { console.error(err); }
//   };

//   const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (!file) return;
//     const formData = new FormData();
//     formData.append('file', file);
//     setIsUploading(true);
//     try {
//       const res = await api.post('/dev/uploadData', formData, {
//         headers: { 'Content-Type': 'multipart/form-data' }
//       });
//       if (res.data.fileUrl) {
//         await handleAddComment(`Shared an attachment: ${file.name}`, file.name, res.data.fileUrl);
//       }
//     } catch (err) { console.error(err); } finally { setIsUploading(false); }
//   };

//   const handleAddComment = async (content: string, fileName?: string, filePath?: string) => {
//     if (!task || (!content.trim() && !filePath)) return;
//     try {
//       const res = await api.post(`/api/comments`, { 
//         taskId: task.id,
//         content, 
//         fileName: fileName || null, 
//         filePath: filePath || null 
//       });
//       if (res.data.success) {
//         fetchComments();
//         setNewComment("");
//       }
//     } catch (err) { console.error(err); }
//   };

//   if (!task) return null;

//   return (
//     <>
//       <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40" onClick={onClose} />
//       <div className="fixed right-0 top-0 h-full w-full md:w-[80%] bg-slate-950 border-l border-slate-800 z-50 flex flex-col shadow-2xl transition-all duration-300">
        
//         {/* Header */}
//         <div className="flex items-center justify-between px-10 py-8 border-b border-slate-800 bg-slate-900/30">
//           <div className="flex flex-col gap-2">
//             <div className="flex items-center gap-3">
//               <StatusDot status={task.status} />
//               <span className="text-xs font-mono text-slate-500 uppercase tracking-[0.2em]">TASK-{task.id}</span>
//             </div>
//             <div className="flex items-center gap-5">
//               {isEditingTask ? (
//                 <Input 
//                   value={editedTask.title} 
//                   onChange={e => setEditedTask({...editedTask, title: e.target.value})}
//                   className="text-3xl font-bold bg-slate-900 border-slate-700 text-slate-100 h-14 w-[500px] focus:ring-blue-500"
//                 />
//               ) : (
//                 <h2 className="text-4xl font-bold text-slate-100 tracking-tight">{task.title}</h2>
//               )}
//               {!isEditingTask && (
//                 <span className={cn(
//                   "px-4 py-1.5 rounded-lg text-xs font-black uppercase tracking-widest border shadow-lg",
//                   task.priority === 'High' ? "text-red-400 border-red-500/20 bg-red-500/10" : 
//                   task.priority === 'Medium' ? "text-yellow-400 border-yellow-500/20 bg-yellow-500/10" : 
//                   "text-emerald-400 border-emerald-500/20 bg-emerald-500/10"
//                 )}>
//                   {task.priority}
//                 </span>
//               )}
//             </div>
//           </div>
//           <div className="flex items-center gap-4">
//             {isEditingTask ? (
//               <Button onClick={handleUpdateTask} className="bg-blue-600 hover:bg-blue-500 text-white font-bold h-12 px-8 shadow-xl shadow-blue-900/20">
//                 <Save className="w-5 h-5 mr-2" /> Save Updates
//               </Button>
//             ) : (
//               <Button variant="outline" onClick={() => setIsEditingTask(true)} className="border-slate-700 bg-slate-900 text-slate-100 hover:bg-slate-800 h-12 px-6 font-bold">
//                 <Edit2 className="w-4 h-4 mr-2 text-blue-400" /> Edit Details
//               </Button>
//             )}
//             <button onClick={onClose} className="p-3 rounded-2xl hover:bg-slate-800 text-slate-400 transition-all"><X className="w-7 h-7" /></button>
//           </div>
//         </div>

//         <div className="flex-1 flex overflow-hidden">
//           {/* Main Content Area */}
//           <div className="flex-1 overflow-y-auto p-10 scrollbar-thin">
            
//             {/* Overview */}
//             <div className="mb-14">
//               <Label className="text-[11px] uppercase text-slate-500 font-black tracking-widest mb-4 block">Description</Label>
//               {isEditingTask ? (
//                 <Textarea 
//                   value={editedTask.description || ''} 
//                   onChange={e => setEditedTask({...editedTask, description: e.target.value})}
//                   className="min-h-[200px] bg-slate-900 border-slate-700 text-slate-300 text-lg leading-relaxed rounded-2xl p-6"
//                 />
//               ) : (
//                 <div className="bg-slate-900/30 border border-slate-800 p-8 rounded-3xl">
//                   <p className="text-xl text-slate-300 leading-relaxed whitespace-pre-wrap">{task.description || 'Provide more details for this task...'}</p>
//                 </div>
//               )}
//             </div>

//             {/* Tabs */}
//             <div className="flex gap-12 border-b border-slate-800 mb-10">
//               {['details', 'subtasks', 'comments'].map((tab) => (
//                 <button 
//                   key={tab} 
//                   onClick={() => setActiveTab(tab as any)} 
//                   className={cn(
//                     'text-sm py-6 border-b-2 transition-all capitalize font-black tracking-widest', 
//                     activeTab === tab ? 'border-blue-500 text-white' : 'border-transparent text-slate-600 hover:text-slate-400'
//                   )}
//                 >
//                   {tab === 'subtasks' ? `Subtasks (${subtasks.length})` : tab === 'comments' ? `Conversation` : 'Metadata'}
//                 </button>
//               ))}
//             </div>

//             <div className="pb-32">
//               {activeTab === 'subtasks' && (
//                 <div className="space-y-8">
//                   {subtasks.map((sub) => {
//                     const logged = workLogs[sub.id]?.reduce((acc, curr) => acc + Number(curr.hoursWorked), 0) || 0;
//                     const isEditingSub = editingSubtaskId === sub.id;

//                     return (
//                       <div key={sub.id} className="p-10 rounded-[2.5rem] bg-slate-900/40 border border-slate-800 transition-all hover:border-slate-700 shadow-xl">
//                         {isEditingSub ? (
//                           <div className="space-y-6">
//                             <Input value={subtaskEditForm.title} onChange={e => setSubtaskEditForm({...subtaskEditForm, title: e.target.value})} className="bg-slate-950 border-slate-700 h-14 text-xl font-bold" />
//                             <Textarea value={subtaskEditForm.description} onChange={e => setSubtaskEditForm({...subtaskEditForm, description: e.target.value})} className="bg-slate-950 border-slate-700 text-slate-300 text-base" />
//                             <div className="flex gap-4">
//                                <Select value={subtaskEditForm.assigneeId?.toString()} onValueChange={v => setSubtaskEditForm({...subtaskEditForm, assigneeId: parseInt(v)})}>
//                                   <SelectTrigger className="bg-slate-950 border-slate-700 h-12 font-bold"><SelectValue placeholder="Assignee"/></SelectTrigger>
//                                   <SelectContent className="bg-slate-900 border-slate-800 text-white">{boardMembers.map(m => <SelectItem key={m.id} value={m.id.toString()}>{m.name}</SelectItem>)}</SelectContent>
//                                </Select>
//                                <Input type="number" placeholder="Hrs" value={subtaskEditForm.hours} onChange={e => setSubtaskEditForm({...subtaskEditForm, hours: parseFloat(e.target.value)})} className="bg-slate-950 border-slate-700 w-32 h-12 font-bold" />
//                                <Button onClick={() => handleSubtaskUpdate(sub.id, subtaskEditForm)} className="bg-blue-600 h-12 px-8 font-black ml-auto uppercase text-xs">Update Subtask</Button>
//                             </div>
//                           </div>
//                         ) : (
//                           <div className="space-y-8">
//                             <div className="flex items-start justify-between">
//                               <div className="flex items-start gap-8">
//                                 <button onClick={() => handleSubtaskUpdate(sub.id, { status: sub.status === 'Done' ? 'Active' : 'Done' })} className="mt-1 transition-transform active:scale-90">
//                                   {sub.status === 'Done' ? <CheckCircle2 className="w-10 h-10 text-emerald-500" /> : <Circle className="w-10 h-10 text-slate-800 hover:text-slate-600" />}
//                                 </button>
//                                 <div className="space-y-2">
//                                   <p className={cn("text-2xl font-bold text-slate-100", sub.status === 'Done' && "line-through text-slate-600 opacity-50")}>{sub.title}</p>
//                                   <p className="text-base text-slate-500 leading-relaxed">{sub.description}</p>
//                                 </div>
//                               </div>
//                               <button onClick={() => { setEditingSubtaskId(sub.id); setSubtaskEditForm(sub); }} className="p-3 bg-slate-900 rounded-2xl text-slate-500 hover:text-blue-400 transition-colors"><Edit2 className="w-5 h-5" /></button>
//                             </div>
                            
//                             <div className="flex items-center justify-between pt-8 border-t border-slate-800">
//                               <div className="flex gap-12">
//                                 <LogEntry label="Estimated" value={`${sub.hours}h`} />
//                                 <LogEntry label="Actual Log" value={`${logged}h`} color={logged > sub.hours ? "text-red-400" : "text-emerald-400"} />
//                                 <LogEntry label="Remainder" value={`${Math.max(0, sub.hours - logged)}h`} />
//                               </div>
//                               <div className="flex items-center gap-6">
//                                  <Button size="lg" variant="outline" onClick={() => setLoggingHoursFor(sub)} className="border-slate-800 bg-slate-900 hover:bg-slate-800 text-blue-400 font-black text-xs uppercase tracking-widest h-12 px-6">
//                                    <Clock className="w-5 h-5 mr-3"/> Log Hours
//                                  </Button>
//                                  <AvatarInitials name={sub.assigneeName || ''} className="h-10 w-10 text-base" />
//                               </div>
//                             </div>

//                             {workLogs[sub.id]?.length > 0 && (
//                               <div className="mt-8 p-8 bg-slate-950/40 rounded-[2rem] border border-slate-800/60">
//                                  <p className="text-[10px] uppercase text-slate-500 font-black tracking-[0.3em] flex items-center gap-3 mb-4"><History className="w-4 h-4 text-blue-500"/> Work Log History</p>
//                                  <div className="divide-y divide-slate-800/50">
//                                    {workLogs[sub.id].map(log => (
//                                      <div key={log.id} className="text-sm text-slate-400 flex justify-between py-4 group transition-colors hover:bg-slate-900/20 px-2 rounded-xl">
//                                        <span className="flex items-center gap-3 font-medium"><Calendar className="w-4 h-4 opacity-30"/> {new Date(log.workDate).toLocaleDateString(undefined, { dateStyle: 'long' })}</span>
//                                        <span className="font-mono font-black text-slate-100 bg-slate-800 px-3 py-1 rounded-lg">{log.hoursWorked}h</span>
//                                      </div>
//                                    ))}
//                                  </div>
//                               </div>
//                             )}
//                           </div>
//                         )}
//                       </div>
//                     );
//                   })}
                  
//                   {isAddingSubtask ? (
//                     <div className="p-10 rounded-[3rem] border-2 border-dashed border-blue-500/30 bg-blue-500/5 space-y-6 animate-in slide-in-from-top-2">
//                        <Input placeholder="What needs to be done?" onChange={e => setSubtaskCreateForm({...subtaskCreateForm, title: e.target.value})} className="h-14 bg-slate-950 border-slate-800 font-bold text-lg" />
//                        <Textarea placeholder="Context and details..." onChange={e => setSubtaskCreateForm({...subtaskCreateForm, description: e.target.value})} className="bg-slate-950 border-slate-800 text-slate-300" />
//                        <div className="flex gap-6">
//                           <Select onValueChange={v => setSubtaskCreateForm({...subtaskCreateForm, assigneeId: v})}>
//                              <SelectTrigger className="h-12 bg-slate-950 border-slate-800 font-bold"><SelectValue placeholder="Assign To"/></SelectTrigger>
//                              <SelectContent className="bg-slate-900 border-slate-800 text-white">{boardMembers.map(m => <SelectItem key={m.id} value={m.id.toString()}>{m.name}</SelectItem>)}</SelectContent>
//                           </Select>
//                           <Input type="number" placeholder="Hours" onChange={e => setSubtaskCreateForm({...subtaskCreateForm, hours: parseFloat(e.target.value)})} className="h-12 bg-slate-950 border-slate-800 w-32 font-bold" />
//                           <Button onClick={handleAddSubtask} className="bg-blue-600 h-12 px-10 font-black ml-auto uppercase text-xs">Initialize Subtask</Button>
//                        </div>
//                     </div>
//                   ) : (
//                     <Button variant="ghost" onClick={() => setIsAddingSubtask(true)} className="w-full justify-center text-slate-600 hover:text-blue-400 h-20 border-2 border-dashed border-slate-800 hover:border-blue-500/30 transition-all rounded-[2rem] text-sm font-black uppercase tracking-[0.3em]">
//                       <Plus className="w-6 h-6 mr-4" /> Create New Subtask
//                     </Button>
//                   )}
//                 </div>
//               )}

//               {activeTab === 'comments' && (
//                 <div className="space-y-12 max-w-5xl mx-auto">
//                   <div className="space-y-10">
//                     {comments.map(c => (
//                       <div key={c.id} className="flex gap-8 group">
//                         <AvatarInitials name={c.userName} className="h-12 w-12" />
//                         <div className="flex-1 bg-slate-900/60 p-8 rounded-[2.5rem] rounded-tl-none border border-slate-800 shadow-xl relative">
//                           <div className="flex justify-between items-center mb-4">
//                             <span className="font-black text-[11px] uppercase text-blue-400 tracking-[0.2em]">{c.userName}</span>
//                             <span className="text-[10px] text-slate-600 font-mono">{new Date(c.createdAt).toLocaleString()}</span>
//                           </div>
//                           <p className="text-slate-200 text-lg leading-relaxed whitespace-pre-wrap">{c.content}</p>
//                           {c.filePath && (
//                             <a href={c.filePath} target="_blank" rel="noopener noreferrer" 
//                                className="flex items-center gap-5 mt-8 p-6 bg-slate-950/80 rounded-[1.5rem] border border-slate-800 hover:border-blue-500/40 transition-all group/file">
//                               <div className="p-4 bg-blue-500/10 rounded-2xl"><Paperclip className="w-6 h-6 text-blue-400" /></div>
//                               <div className="flex flex-col">
//                                  <span className="text-base font-black text-slate-100">{c.fileName || 'Attachment'}</span>
//                                  <span className="text-[11px] text-slate-600 uppercase font-black tracking-widest mt-1">Preview Attachment</span>
//                               </div>
//                             </a>
//                           )}
//                         </div>
//                       </div>
//                     ))}
//                   </div>

//                   <div className="relative pt-10 mt-16 border-t border-slate-800">
//                     <Textarea 
//                       placeholder="Discuss progress..." 
//                       value={newComment} 
//                       onChange={e => setNewComment(e.target.value)} 
//                       className="pr-40 min-h-[160px] bg-slate-900 border-slate-800 rounded-[2.5rem] text-slate-100 text-xl shadow-inner p-10 focus:ring-blue-500" 
//                     />
//                     <div className="absolute right-10 bottom-10 flex gap-6">
//                       <label className="cursor-pointer p-4 bg-slate-950 rounded-2xl text-slate-500 hover:text-blue-400 transition-all border border-slate-800 shadow-sm">
//                         <input type="file" className="hidden" onChange={handleFileUpload} disabled={isUploading} />
//                         {isUploading ? <Loader2 className="w-7 h-7 animate-spin" /> : <Paperclip className="w-7 h-7" />}
//                       </label>
//                       <Button onClick={() => handleAddComment(newComment)} disabled={!newComment.trim() && !isUploading} className="h-16 px-12 bg-blue-600 hover:bg-blue-500 rounded-[1.5rem] font-black text-xs uppercase tracking-[0.2em] shadow-2xl shadow-blue-900/30">
//                         Post Message
//                       </Button>
//                     </div>
//                   </div>
//                 </div>
//               )}

//               {activeTab === 'details' && (
//                 <div className="grid grid-cols-2 gap-10 pt-6">
//                   <TimelineWidget label="Initialization" date={task.createdAt} icon={<Calendar className="w-6 h-6 text-blue-500"/>} />
//                   <TimelineWidget label="Latest Update" date={task.updatedAt} icon={<Clock className="w-6 h-6 text-purple-500"/>} />
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* Right Sidebar */}
//           <div className="w-[400px] border-l border-slate-800 bg-slate-900/20 p-12 space-y-12 shrink-0">
//               <SidebarSection label="Workflow Status">
//                 <Select value={editedTask.status} onValueChange={(v) => { setEditedTask({...editedTask, status: v}); if(!isEditingTask) handleUpdateTask(); }}>
//                   <SelectTrigger className="h-14 bg-slate-900 border-slate-700 text-white font-black uppercase text-[11px] tracking-widest"><SelectValue /></SelectTrigger>
//                   <SelectContent className="bg-slate-900 border-slate-700 text-white">
//                     {availableStatus.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
//                   </SelectContent>
//                 </Select>
//               </SidebarSection>

//               <SidebarSection label="Primary Owner">
//                 <Select value={editedTask.assigneeId?.toString()} onValueChange={(v) => { setEditedTask({...editedTask, assigneeId: parseInt(v)}); if(!isEditingTask) handleUpdateTask(); }}>
//                   <SelectTrigger className="h-14 bg-slate-900 border-slate-700 text-white font-bold"><SelectValue placeholder="Unassigned" /></SelectTrigger>
//                   <SelectContent className="bg-slate-900 border-slate-700 text-white">
//                     {boardMembers.map(m => <SelectItem key={m.id} value={m.id.toString()}>{m.name}</SelectItem>)}
//                   </SelectContent>
//                 </Select>
//               </SidebarSection>

//               {isEditingTask && (
//                 <SidebarSection label="Priority Rank">
//                   <Select value={editedTask.priority} onValueChange={(v) => setEditedTask({...editedTask, priority: v as any})}>
//                     <SelectTrigger className="h-14 bg-slate-900 border-slate-700 text-white font-black uppercase text-[11px] tracking-widest"><SelectValue /></SelectTrigger>
//                     <SelectContent className="bg-slate-900 border-slate-700 text-white">
//                       {['Low', 'Medium', 'High'].map(p => <SelectItem key={p} value={p}>{p}</SelectItem>)}
//                     </SelectContent>
//                   </Select>
//                 </SidebarSection>
//               )}
              
//               <div className="pt-10 border-t border-slate-800 space-y-8">
//                  <SidebarMetric label="Ticket Value" value={`${task.storyPoints} Story Points`} />
//                  <SidebarMetric label="Burn Rate" value={`${task.hours} Hours Estimated`} />
//               </div>
//           </div>
//         </div>
//       </div>

//       {/* LOG HOURS POPUP */}
//       <Dialog open={!!loggingHoursFor} onOpenChange={() => setLoggingHoursFor(null)}>
//         <DialogContent className="bg-slate-950 border-slate-800 text-white max-w-lg rounded-[2.5rem] p-12 shadow-3xl">
//           <DialogHeader className="mb-10">
//             <DialogTitle className="text-3xl font-black flex items-center gap-4 tracking-tighter">
//               <div className="p-3 bg-blue-500/10 rounded-2xl"><Clock className="w-8 h-8 text-blue-500" /></div>
//               Record Progress
//             </DialogTitle>
//             <p className="text-slate-500 text-lg mt-4 font-medium leading-relaxed">Logging time for: <br/><span className="text-white font-black italic">"{loggingHoursFor?.title}"</span></p>
//           </DialogHeader>
//           <div className="space-y-10">
//             <div className="space-y-3">
//               <Label className="text-[11px] uppercase font-black text-slate-600 tracking-[0.3em] ml-1">Execution Date</Label>
//               <Input type="date" value={logForm.workDate} onChange={e => setLogForm({...logForm, workDate: e.target.value})} className="h-16 bg-slate-900 border-slate-800 text-xl font-bold rounded-2xl" />
//             </div>
//             <div className="space-y-3">
//               <Label className="text-[11px] uppercase font-black text-slate-600 tracking-[0.3em] ml-1">Hours Invested</Label>
//               <Input type="number" placeholder="0.0" step="0.25" onChange={e => setLogForm({...logForm, hoursWorked: parseFloat(e.target.value)})} className="h-16 bg-slate-900 border-slate-800 text-2xl font-black rounded-2xl" />
//             </div>
//           </div>
//           <DialogFooter className="mt-14 flex gap-4">
//             <Button variant="ghost" onClick={() => setLoggingHoursFor(null)} className="h-16 px-10 text-slate-500 font-bold text-base hover:bg-slate-900 rounded-2xl">Cancel</Button>
//             <Button onClick={handleAddWorkLog} className="bg-blue-600 hover:bg-blue-500 h-16 px-12 font-black text-sm uppercase tracking-widest rounded-[1.5rem] shadow-2xl shadow-blue-900/40">Submit Log</Button>
//           </DialogFooter>
//         </DialogContent>
//       </Dialog>
//     </>
//   );
// }

// // STYLED COMPONENT HELPERS

// function SidebarSection({ label, children }: { label: string; children: React.ReactNode }) {
//   return (
//     <div className="space-y-4">
//       <p className="text-[10px] uppercase text-slate-600 font-black tracking-[0.3em] leading-none ml-1">{label}</p>
//       {children}
//     </div>
//   );
// }

// function SidebarMetric({ label, value }: { label: string; value: string }) {
//   return (
//     <div className="space-y-2">
//       <p className="text-[10px] uppercase text-slate-600 font-black tracking-widest">{label}</p>
//       <p className="text-slate-100 font-black text-lg tracking-tight">{value}</p>
//     </div>
//   );
// }

// function LogEntry({ label, value, color }: { label: string; value: string; color?: string }) {
//   return (
//     <div className="space-y-2">
//       <p className="text-[10px] uppercase text-slate-600 font-black tracking-tighter leading-none">{label}</p>
//       <p className={cn("text-xl font-mono font-black leading-none", color || "text-slate-100")}>{value}</p>
//     </div>
//   );
// }

// function TimelineWidget({ label, date, icon }: { label: string; date: string; icon: React.ReactNode }) {
//   return (
//     <div className="flex items-center gap-8 p-10 rounded-[2.5rem] bg-slate-900/30 border border-slate-800 shadow-inner">
//       <div className="p-5 rounded-[1.5rem] bg-slate-950 border border-slate-800 shadow-xl">{icon}</div>
//       <div className="space-y-2">
//         <p className="text-[10px] uppercase text-slate-600 font-black tracking-widest leading-none">{label}</p>
//         <p className="text-white font-black text-xl leading-none">{new Date(date).toLocaleDateString()}</p>
//         <p className="text-[11px] text-slate-500 font-mono uppercase font-black">{new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
//       </div>
//     </div>
//   );
// }























import { useState, useEffect } from 'react';
import { 
  X, MessageSquare, Clock, CheckCircle2, Circle, 
  AlertCircle, Plus, Paperclip, Send, Loader2, Edit2, Save, User as UserIcon, History, Calendar, ChevronDown
} from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Task, Subtask, Comment, User, SubtaskWorkLog } from '@/types';
import { AvatarInitials, StatusDot } from '@/components/TaskBadges';
import api from '@/lib/api'; 
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

interface TaskDrawerProps {
  task: Task | null;
  availableStatus: string[];
  boardMembers: User[];
  onClose: () => void;
  onTaskUpdate: (updatedTask: Task) => void;
}

export function TaskDrawer({ task, availableStatus, boardMembers, onClose, onTaskUpdate }: TaskDrawerProps) {
  const [activeTab, setActiveTab] = useState<'details' | 'subtasks' | 'comments'>('details');
  const [isEditingTask, setIsEditingTask] = useState(false);
  const [editedTask, setEditedTask] = useState<Partial<Task>>({});
  
  // Data States
  const [subtasks, setSubtasks] = useState<Subtask[]>([]);
  const [workLogs, setWorkLogs] = useState<Record<number, SubtaskWorkLog[]>>({});
  const [comments, setComments] = useState<Comment[]>([]);
  
  // UI States
  const [editingSubtaskId, setEditingSubtaskId] = useState<number | null>(null);
  const [loggingHoursFor, setLoggingHoursFor] = useState<Subtask | null>(null);
  const [isAddingSubtask, setIsAddingSubtask] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  // Form States
  const [subtaskEditForm, setSubtaskEditForm] = useState<Partial<Subtask>>({});
  const [subtaskCreateForm, setSubtaskCreateForm] = useState({ title: '', description: '', assigneeId: '', hours: 0 });
  const [logForm, setLogForm] = useState({ hoursWorked: 0, workDate: new Date().toISOString().split('T') });

  useEffect(() => {
    if (task) {
      setEditedTask(task);
      setIsEditingTask(false);
      setIsAddingSubtask(false);
      fetchSubtasks();
      fetchComments();
    }
  }, [task]);

  const fetchSubtasks = async () => {
    if (!task) return;
    try {
      const res = await api.get(`/api/tasks/${task.id}/subtasks`);
      if (res.data.success) {
        setSubtasks(res.data.subtasks);
        res.data.subtasks.forEach((s: Subtask) => fetchWorkLogs(s.id));
      }
    } catch (err) { console.error(err); }
  };

  const fetchWorkLogs = async (subtaskId: number) => {
    try {
      const res = await api.get(`/api/subtasks/${subtaskId}/worklogs`);
      if (res.data.success) setWorkLogs(prev => ({ ...prev, [subtaskId]: res.data.worklogs }));
    } catch (err) { console.error(err); }
  };

  const fetchComments = async () => {
    if (!task) return;
    try {
      const res = await api.get(`/api/tasks/${task.id}/comments`);
      if (res.data.success) setComments(res.data.comments);
    } catch (err) { console.error(err); }
  };

  const handleUpdateTask = async () => {
    if (!task) return;
    try {
      const res = await api.put(`/api/tasks/${task.id}`, editedTask);
      if (res.data.success) {
        onTaskUpdate({ ...task, ...editedTask } as Task);
        setIsEditingTask(false);
      }
    } catch (err) { console.error("Update failed", err); }
  };

  const handleSubtaskUpdate = async (subId: number, data: Partial<Subtask>) => {
    try {
      const original = subtasks.find(s => s.id === subId);
      if (!original) return;
      const payload = { ...original, ...data };
      const res = await api.put(`/api/subtasks/${subId}`, payload);
      if (res.data.success) {
        setSubtasks(prev => prev.map(s => s.id === subId ? { ...s, ...data } : s));
        setEditingSubtaskId(null);
      }
    } catch (err) { console.error(err); }
  };

  const handleAddSubtask = async () => {
    if (!task || !subtaskCreateForm.title.trim()) return;
    try {
      const res = await api.post(`/api/tasks/${task.id}/subtasks`, {
        ...subtaskCreateForm,
        assigneeId: subtaskCreateForm.assigneeId ? parseInt(subtaskCreateForm.assigneeId.toString()) : null,
        hours: parseFloat(subtaskCreateForm.hours.toString()) || 0
      });
      if (res.data.success) {
        setSubtasks(prev => [...prev, res.data.subtask]);
        setIsAddingSubtask(false);
        setSubtaskCreateForm({ title: '', description: '', assigneeId: '', hours: 0 });
        fetchWorkLogs(res.data.subtask.id);
      }
    } catch (err) { console.error(err); }
  };

  const handleAddWorkLog = async () => {
    if (!loggingHoursFor || logForm.hoursWorked <= 0) return;
    try {
      const res = await api.post(`/api/subtasks/${loggingHoursFor.id}/worklogs`, logForm);
      if (res.data.success) {
        fetchWorkLogs(loggingHoursFor.id);
        setLoggingHoursFor(null);
        setLogForm({ hoursWorked: 0, workDate: new Date().toISOString().split('T') });
      }
    } catch (err) { console.error(err); }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const formData = new FormData();
    formData.append('file', file);
    setIsUploading(true);
    try {
      const res = await api.post('/dev/uploadData', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      if (res.data.fileUrl) {
        await handleAddComment(`Shared an attachment: ${file.name}`, file.name, res.data.fileUrl);
      }
    } catch (err) { console.error(err); } finally { setIsUploading(false); }
  };

  const handleAddComment = async (content: string, fileName?: string, filePath?: string) => {
    if (!task || (!content.trim() && !filePath)) return;
    try {
      const res = await api.post(`/api/comments`, { 
        taskId: task.id,
        content, 
        fileName: fileName || null, 
        filePath: filePath || null 
      });
      if (res.data.success) {
        fetchComments();
        setNewComment("");
      }
    } catch (err) { console.error(err); }
  };

  if (!task) return null;

  return (
    <>
      <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40" onClick={onClose} />
      <div className="fixed right-0 top-0 h-full w-full md:w-[80%] bg-slate-950 border-l border-slate-800 z-50 flex flex-col shadow-2xl transition-all duration-300">
        
        {/* Header */}
        <div className="flex items-center justify-between px-10 py-8 border-b border-slate-800 bg-slate-900/30">
          <div className="flex flex-col gap-2 flex-1">
            <div className="flex items-center gap-3">
              <StatusDot status={editedTask.status || task.status} />
              <span className="text-xs font-mono text-slate-500 uppercase tracking-widest">TASK-{task.id}</span>
            </div>
            <div className="flex items-center gap-5">
              {isEditingTask ? (
                <Input 
                  value={editedTask.title} 
                  onChange={e => setEditedTask({...editedTask, title: e.target.value})}
                  className="text-3xl font-bold bg-slate-900 border-slate-700 text-slate-100 h-14 w-full max-w-[600px] focus:ring-blue-500"
                />
              ) : (
                <h2 className="text-4xl font-bold text-slate-100 tracking-tight">{task.title}</h2>
              )}
              {!isEditingTask && (
                <span className={cn(
                  "px-4 py-1.5 rounded-lg text-xs font-black uppercase tracking-widest border",
                  task.priority === 'High' ? "text-red-400 border-red-500/20 bg-red-500/10" : 
                  task.priority === 'Medium' ? "text-yellow-400 border-yellow-500/20 bg-yellow-500/10" : 
                  "text-emerald-400 border-emerald-500/20 bg-emerald-500/10"
                )}>
                  {task.priority}
                </span>
              )}
            </div>
          </div>
          <div className="flex items-center gap-4">
            {isEditingTask ? (
              <Button onClick={handleUpdateTask} className="bg-blue-600 hover:bg-blue-500 text-white font-bold h-12 px-8 shadow-xl">
                <Save className="w-5 h-5 mr-2" /> Save Updates
              </Button>
            ) : (
              <Button variant="outline" onClick={() => setIsEditingTask(true)} className="border-slate-700 bg-slate-900 text-slate-100 hover:bg-slate-800 h-12 px-6 font-bold">
                <Edit2 className="w-4 h-4 mr-2 text-blue-400" /> Edit Task
              </Button>
            )}
            <button onClick={onClose} className="p-3 rounded-2xl hover:bg-slate-800 text-slate-400 transition-all"><X className="w-7 h-7" /></button>
          </div>
        </div>

        <div className="flex-1 flex overflow-hidden">
          {/* Main Content Area */}
          <div className="flex-1 overflow-y-auto p-10 scrollbar-thin border-r border-slate-800">
            
            {/* Description */}
            <div className="mb-14">
              <Label className="text-[11px] uppercase text-slate-500 font-black tracking-widest mb-4 block">Description</Label>
              {isEditingTask ? (
                <Textarea 
                  value={editedTask.description || ''} 
                  onChange={e => setEditedTask({...editedTask, description: e.target.value})}
                  className="min-h-[200px] bg-slate-900 border-slate-700 text-slate-300 text-lg leading-relaxed rounded-2xl p-6"
                />
              ) : (
                <div className="bg-slate-900/30 border border-slate-800 p-8 rounded-3xl min-h-[120px]">
                  <p className="text-xl text-slate-300 leading-relaxed whitespace-pre-wrap">{task.description || 'No description provided.'}</p>
                </div>
              )}
            </div>

            {/* Tabs */}
            <div className="flex gap-12 border-b border-slate-800 mb-10">
              {['details', 'subtasks', 'comments'].map((tab) => (
                <button 
                  key={tab} 
                  onClick={() => setActiveTab(tab as any)} 
                  className={cn(
                    'text-sm py-6 border-b-2 transition-all capitalize font-black tracking-widest', 
                    activeTab === tab ? 'border-blue-500 text-white' : 'border-transparent text-slate-600 hover:text-slate-400'
                  )}
                >
                  {tab === 'subtasks' ? `Subtasks (${subtasks.length})` : tab === 'comments' ? `Conversation` : 'Metadata'}
                </button>
              ))}
            </div>

            <div className="pb-32">
              {activeTab === 'subtasks' && (
                <div className="space-y-8">
                  {subtasks.map((sub) => {
                    const logged = workLogs[sub.id]?.reduce((acc, curr) => acc + Number(curr.hoursWorked), 0) || 0;
                    const isEditingSub = editingSubtaskId === sub.id;

                    return (
                      <div key={sub.id} className="p-8 rounded-[2rem] bg-slate-900/40 border border-slate-800 transition-all hover:border-slate-700 shadow-xl">
                        {isEditingSub ? (
                          <div className="space-y-6">
                            <div className="grid grid-cols-1 gap-4">
                              <Label className="text-[10px] uppercase text-slate-500 font-bold">Subtask Title</Label>
                              <Input value={subtaskEditForm.title} onChange={e => setSubtaskEditForm({...subtaskEditForm, title: e.target.value})} className="bg-slate-950 border-slate-700 h-12 text-lg font-bold text-white" />
                              
                              <Label className="text-[10px] uppercase text-slate-500 font-bold">Details</Label>
                              <Textarea value={subtaskEditForm.description} onChange={e => setSubtaskEditForm({...subtaskEditForm, description: e.target.value})} className="bg-slate-950 border-slate-700 text-slate-300 text-sm h-24" />
                            </div>
                            <div className="flex gap-4 items-end">
                               <div className="flex-1 space-y-2">
                                  <Label className="text-[10px] uppercase text-slate-500 font-bold">Assignee</Label>
                                  <Select value={subtaskEditForm.assigneeId?.toString()} onValueChange={v => setSubtaskEditForm({...subtaskEditForm, assigneeId: parseInt(v)})}>
                                     <SelectTrigger className="bg-slate-950 border-slate-700 h-11 text-white"><SelectValue/></SelectTrigger>
                                     <SelectContent className="bg-slate-900 border-slate-800 text-white">{boardMembers.map(m => <SelectItem key={m.id} value={m.id.toString()}>{m.name}</SelectItem>)}</SelectContent>
                                  </Select>
                               </div>
                               <div className="w-32 space-y-2">
                                  <Label className="text-[10px] uppercase text-slate-500 font-bold">Total Est.</Label>
                                  <Input type="number" value={subtaskEditForm.hours} onChange={e => setSubtaskEditForm({...subtaskEditForm, hours: parseFloat(e.target.value)})} className="bg-slate-950 border-slate-700 h-11 text-white" />
                               </div>
                               <Button onClick={() => handleSubtaskUpdate(sub.id, subtaskEditForm)} className="bg-blue-600 h-11 px-6 font-bold shadow-lg">Update</Button>
                               <Button variant="ghost" onClick={() => setEditingSubtaskId(null)} className="h-11 px-6 text-slate-500">Cancel</Button>
                            </div>
                          </div>
                        ) : (
                          <div className="space-y-6">
                            <div className="flex items-start justify-between">
                              <div className="flex items-start gap-6">
                                <button onClick={() => handleSubtaskUpdate(sub.id, { status: sub.status === 'Done' ? 'Active' : 'Done' })} className="mt-1">
                                  {sub.status === 'Done' ? <CheckCircle2 className="w-8 h-8 text-emerald-500" /> : <Circle className="w-8 h-8 text-slate-700 hover:text-slate-500 transition-colors" />}
                                </button>
                                <div className="space-y-1">
                                  <p className={cn("text-xl font-bold text-slate-100", sub.status === 'Done' && "line-through text-slate-600 opacity-50")}>{sub.title}</p>
                                  <p className="text-base text-slate-500 leading-relaxed">{sub.description}</p>
                                </div>
                              </div>
                              <button onClick={() => { setEditingSubtaskId(sub.id); setSubtaskEditForm(sub); }} className="p-3 bg-slate-900/50 rounded-2xl text-slate-500 hover:text-blue-400 transition-colors"><Edit2 className="w-5 h-5" /></button>
                            </div>
                            
                            <div className="flex items-center justify-between pt-8 border-t border-slate-800">
                              <div className="flex gap-12">
                                <LogStat label="Estimated" value={`${sub.hours}h`} />
                                <LogStat label="Logged" value={`${logged}h`} color={logged > sub.hours ? "text-red-400" : "text-emerald-400"} />
                                <LogStat label="Balance" value={`${Math.max(0, sub.hours - logged)}h`} />
                              </div>
                              <div className="flex items-center gap-6">
                                 <Button size="lg" variant="outline" onClick={() => setLoggingHoursFor(sub)} className="border-slate-800 bg-slate-900 hover:bg-slate-800 text-blue-400 font-black text-xs h-12 px-6 shadow-sm">
                                   <Clock className="w-5 h-5 mr-3"/> Log Hours
                                 </Button>
                                 <AvatarInitials name={sub.assigneeName || ''} className="h-10 w-10 text-base" />
                              </div>
                            </div>

                            {/* Collapsible Logs History */}
                            {workLogs[sub.id]?.length > 0 && (
                              <Accordion type="single" collapsible className="w-full border-t border-slate-800/50 mt-4">
                                <AccordionItem value="logs" className="border-none">
                                  <AccordionTrigger className="text-[10px] uppercase text-slate-500 font-black tracking-[0.3em] hover:no-underline py-4">
                                    <div className="flex items-center gap-3"><History className="w-4 h-4 text-blue-500"/> Work Log History</div>
                                  </AccordionTrigger>
                                  <AccordionContent>
                                    <div className="grid grid-cols-1 gap-2 pb-4">
                                      {workLogs[sub.id].map(log => (
                                        <div key={log.id} className="text-sm text-slate-400 flex justify-between py-4 bg-slate-950/30 px-6 rounded-2xl border border-slate-800/50">
                                          <span className="flex items-center gap-4 font-medium"><Calendar className="w-4 h-4 text-slate-600"/> {new Date(log.workDate).toLocaleDateString(undefined, { dateStyle: 'full' })}</span>
                                          <span className="font-mono font-black text-white bg-slate-800 px-4 py-1.5 rounded-xl shadow-sm">{log.hoursWorked}h</span>
                                        </div>
                                      ))}
                                    </div>
                                  </AccordionContent>
                                </AccordionItem>
                              </Accordion>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
                  
                  {isAddingSubtask ? (
                    <div className="p-10 rounded-[3rem] border-2 border-dashed border-blue-500/30 bg-blue-500/5 space-y-6 animate-in slide-in-from-top-2">
                       <Input placeholder="Enter subtask title..." onChange={e => setSubtaskCreateForm({...subtaskCreateForm, title: e.target.value})} className="h-14 bg-slate-950 border-slate-800 font-bold text-lg text-white" />
                       <Textarea placeholder="Context and details..." onChange={e => setSubtaskCreateForm({...subtaskCreateForm, description: e.target.value})} className="bg-slate-950 border-slate-800 text-slate-300" />
                       <div className="flex gap-6">
                          <Select onValueChange={v => setSubtaskCreateForm({...subtaskCreateForm, assigneeId: parseInt(v)})}>
                             <SelectTrigger className="h-12 bg-slate-950 border-slate-800 text-white font-bold"><SelectValue placeholder="Assign To"/></SelectTrigger>
                             <SelectContent className="bg-slate-900 border-slate-800 text-white">{boardMembers.map(m => <SelectItem key={m.id} value={m.id.toString()}>{m.name}</SelectItem>)}</SelectContent>
                          </Select>
                          <Input type="number" placeholder="Hrs" onChange={e => setSubtaskCreateForm({...subtaskCreateForm, hours: parseFloat(e.target.value)})} className="h-12 bg-slate-950 border-slate-800 w-32 font-bold text-white" />
                          <Button onClick={handleAddSubtask} className="bg-blue-600 h-12 px-10 font-black ml-auto uppercase text-xs tracking-widest shadow-xl">Initialize</Button>
                       </div>
                    </div>
                  ) : (
                    <Button variant="ghost" onClick={() => setIsAddingSubtask(true)} className="w-full justify-center text-slate-600 hover:text-blue-400 h-24 border-2 border-dashed border-slate-800 hover:border-blue-500/30 transition-all rounded-[2rem] text-sm font-black uppercase tracking-[0.4em]">
                      <Plus className="w-7 h-7 mr-4" /> Create New Subtask
                    </Button>
                  )}
                </div>
              )}

              {activeTab === 'comments' && (
                <div className="space-y-12 max-w-5xl mx-auto">
                  <div className="space-y-10">
                    {comments.map(c => (
                      <div key={c.id} className="flex gap-8 group">
                        <AvatarInitials name={c.userName} className="h-12 w-12" />
                        <div className="flex-1 bg-slate-900/60 p-8 rounded-[2.5rem] rounded-tl-none border border-slate-800 shadow-sm relative">
                          <div className="flex justify-between items-center mb-4">
                            <span className="font-black text-xs text-blue-400 uppercase tracking-widest">{c.userName}</span>
                            <span className="text-[10px] text-slate-600 font-mono">{new Date(c.createdAt).toLocaleString()}</span>
                          </div>
                          <p className="text-slate-200 text-lg leading-relaxed whitespace-pre-wrap">{c.content}</p>
                          {c.filePath && (
                            <a href={c.filePath} target="_blank" rel="noopener noreferrer" 
                               className="flex items-center gap-6 mt-8 p-6 bg-slate-950 rounded-[2rem] border border-slate-800 hover:border-blue-500/40 transition-all group/file">
                              <div className="p-4 bg-blue-500/10 rounded-2xl"><Paperclip className="w-7 h-7 text-blue-400" /></div>
                              <div className="flex flex-col">
                                 <span className="text-lg font-black text-slate-100">{c.fileName || 'Attachment'}</span>
                                 <span className="text-[11px] text-slate-600 uppercase font-black tracking-widest mt-1">Open Cloud Link</span>
                              </div>
                            </a>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="relative pt-10 mt-16 border-t border-slate-800">
                    <Textarea 
                      placeholder="Share progress..." 
                      value={newComment} 
                      onChange={e => setNewComment(e.target.value)} 
                      className="pr-40 min-h-[160px] bg-slate-900 border-slate-800 rounded-[2.5rem] text-slate-100 text-xl shadow-inner p-10 focus:ring-blue-500" 
                    />
                    <div className="absolute right-10 bottom-10 flex gap-6">
                      <label className="cursor-pointer p-4 bg-slate-950 rounded-2xl text-slate-500 hover:text-blue-400 transition-all border border-slate-800">
                        <input type="file" className="hidden" onChange={handleFileUpload} disabled={isUploading} />
                        {isUploading ? <Loader2 className="w-8 h-8 animate-spin" /> : <Paperclip className="w-8 h-8" />}
                      </label>
                      <Button onClick={() => handleAddComment(newComment)} disabled={!newComment.trim() || isUploading} className="h-16 px-12 bg-blue-600 hover:bg-blue-500 rounded-[1.5rem] font-black text-xs uppercase tracking-widest shadow-2xl">
                        Post message
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'details' && (
                <div className="grid grid-cols-1 gap-8 max-w-3xl pt-6">
                  <TimelineWidget label="Initial Creation" date={task.createdAt} icon={<Calendar className="w-8 h-8 text-blue-500"/>} />
                  <TimelineWidget label="Last Activity" date={task.updatedAt} icon={<Clock className="w-8 h-8 text-purple-500"/>} />
                </div>
              )}
            </div>
          </div>

          {/* Persistent Sidebar */}
          <div className="w-[380px] bg-slate-900/10 p-12 space-y-12 shrink-0 border-l border-slate-800 overflow-y-auto">
              <SidebarItem label="Workflow Status">
                <Select value={editedTask.status} onValueChange={(v) => { setEditedTask({...editedTask, status: v}); if(!isEditingTask) handleUpdateTask(); }}>
                  <SelectTrigger className="h-14 bg-slate-900 border-slate-700 text-white font-black uppercase text-[11px] tracking-widest"><SelectValue /></SelectTrigger>
                  <SelectContent className="bg-slate-900 border-slate-700 text-white">
                    {availableStatus.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                  </SelectContent>
                </Select>
              </SidebarItem>

              <SidebarItem label="Ownership">
                <Select value={editedTask.assigneeId?.toString()} onValueChange={(v) => { setEditedTask({...editedTask, assigneeId: parseInt(v)}); if(!isEditingTask) handleUpdateTask(); }}>
                  <SelectTrigger className="h-14 bg-slate-900 border-slate-700 text-white font-bold"><SelectValue placeholder="Unassigned" /></SelectTrigger>
                  <SelectContent className="bg-slate-900 border-slate-700 text-white">
                    {boardMembers.map(m => <SelectItem key={m.id} value={m.id.toString()}>{m.name}</SelectItem>)}
                  </SelectContent>
                </Select>
              </SidebarItem>

              <div className="space-y-8 pt-8 border-t border-slate-800">
                 <SidebarStat label="Story Points" value={editedTask.storyPoints} isEditing={isEditingTask} onChange={v => setEditedTask({...editedTask, storyPoints: parseInt(v)})} />
                 <SidebarStat label="Estimated Burn" value={editedTask.hours} isEditing={isEditingTask} onChange={v => setEditedTask({...editedTask, hours: parseFloat(v)})} suffix="Hours" />
              </div>

              {isEditingTask && (
                <SidebarItem label="Priority Setting">
                  <Select value={editedTask.priority} onValueChange={(v) => setEditedTask({...editedTask, priority: v as any})}>
                    <SelectTrigger className="h-14 bg-slate-900 border-slate-700 text-white font-black uppercase text-[11px] tracking-widest"><SelectValue /></SelectTrigger>
                    <SelectContent className="bg-slate-900 border-slate-700 text-white">
                      {['Low', 'Medium', 'High'].map(p => <SelectItem key={p} value={p}>{p}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </SidebarItem>
              )}
          </div>
        </div>
      </div>

      {/* LOG HOURS POPUP */}
      <Dialog open={!!loggingHoursFor} onOpenChange={() => setLoggingHoursFor(null)}>
        <DialogContent className="bg-slate-950 border-slate-800 text-white max-w-lg rounded-[3rem] p-12 shadow-3xl border-2">
          <DialogHeader className="mb-10 text-center">
            <DialogTitle className="text-4xl font-black tracking-tighter block w-full mb-4">Record Progress</DialogTitle>
            <p className="text-slate-500 text-lg">Logging time for: <br/><span className="text-white font-black">"{loggingHoursFor?.title}"</span></p>
          </DialogHeader>
          <div className="space-y-12">
            <div className="space-y-4">
              <Label className="text-[11px] uppercase font-black text-slate-500 tracking-[0.4em] ml-2">Log Date</Label>
              <Input type="date" value={logForm.workDate} onChange={e => setLogForm({...logForm, workDate: e.target.value})} className="h-16 bg-slate-900 border-slate-800 text-xl font-bold rounded-2xl text-white" />
            </div>
            <div className="space-y-4">
              <Label className="text-[11px] uppercase font-black text-slate-500 tracking-[0.4em] ml-2">Hours Invested</Label>
              <Input type="number" placeholder="0.0" step="0.25" onChange={e => setLogForm({...logForm, hoursWorked: parseFloat(e.target.value)})} className="h-16 bg-slate-900 border-slate-800 text-3xl font-black rounded-2xl text-white" />
            </div>
          </div>
          <DialogFooter className="mt-16 flex flex-col gap-4 sm:flex-col">
            <Button onClick={handleAddWorkLog} className="bg-blue-600 hover:bg-blue-500 h-20 w-full font-black text-sm uppercase tracking-widest rounded-[1.5rem] shadow-2xl">Validate and Log</Button>
            <Button variant="ghost" onClick={() => setLoggingHoursFor(null)} className="h-14 w-full text-slate-600 hover:text-slate-300 font-bold text-lg">Dismiss</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

// HELPERS

function SidebarItem({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-4">
      <p className="text-[10px] uppercase text-slate-600 font-black tracking-[0.3em] ml-1">{label}</p>
      {children}
    </div>
  );
}

function SidebarStat({ label, value, isEditing, onChange, suffix = "" }: { label: string; value?: number; isEditing: boolean; onChange: (v: string) => void; suffix?: string }) {
  return (
    <div className="space-y-3">
      <p className="text-[10px] uppercase text-slate-600 font-black tracking-widest">{label}</p>
      {isEditing ? (
        <Input type="number" value={value} onChange={e => onChange(e.target.value)} className="h-12 bg-slate-900 border-slate-800 text-white font-black" />
      ) : (
        <p className="text-white font-black text-3xl tracking-tighter">{value || 0} <span className="text-slate-700 text-sm font-bold uppercase tracking-widest ml-1">{suffix}</span></p>
      )}
    </div>
  );
}

function LogStat({ label, value, color }: { label: string; value: string; color?: string }) {
  return (
    <div className="space-y-3 text-center">
      <p className="text-[10px] uppercase text-slate-600 font-black tracking-tighter">{label}</p>
      <p className={cn("text-2xl font-mono font-black", color || "text-slate-100")}>{value}</p>
    </div>
  );
}

function TimelineWidget({ label, date, icon }: { label: string; date: string; icon: React.ReactNode }) {
  return (
    <div className="flex items-center gap-10 p-10 rounded-[3rem] bg-slate-900/40 border border-slate-800 shadow-inner">
      <div className="p-6 rounded-[1.5rem] bg-slate-950 border border-slate-800 shadow-2xl">{icon}</div>
      <div className="space-y-2">
        <p className="text-[11px] uppercase text-slate-600 font-black tracking-[0.4em] leading-none">{label}</p>
        <p className="text-white font-black text-2xl tracking-tighter">{new Date(date).toLocaleDateString(undefined, { dateStyle: 'long' })}</p>
        <p className="text-xs text-slate-500 font-mono uppercase font-black">{new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
      </div>
    </div>
  );
}