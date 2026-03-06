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
      const res = await api.post('/api/dev/uploadData', formData, {
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