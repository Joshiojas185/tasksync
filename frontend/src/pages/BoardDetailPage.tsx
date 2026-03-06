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
        const res = await api.get(`/api/dev/search/user?q=${memberSearchQuery}`);
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