// import type { Board, Epic, Sprint, Task, Subtask, Comment, WorkLog, User } from '@/types';

// const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:4000';

// const getToken = () => localStorage.getItem('auth_token');

// const headers = (): HeadersInit => {
//   const token = getToken();
//   return {
//     'Content-Type': 'application/json',
//     ...(token ? { Authorization: `Bearer ${token}` } : {}),
//   };
// };

// const request = async <T>(url: string, options?: RequestInit): Promise<T> => {
//   const res = await fetch(`${API_BASE}${url}`, { ...options, headers: headers() });
//   if (!res.ok) {
//     const err = await res.json().catch(() => ({ message: res.statusText }));
//     throw new Error(err.error || err.message || 'Request failed');
//   }
//   return res.json();
// };

// // Auth
// export const authMe = () => request<{ success: boolean; user: User }>('/api/auth/me');

// // Boards
// export const fetchBoards = () => request<{ success: boolean; boards: Board[] }>('/api/boards');
// export const fetchBoard = (id: number) => request<{ success: boolean; board: Board }>(`/api/boards/${id}`);
// export const createBoard = (data: { title: string; description?: string }) => request<{ success: boolean; board: Board }>('/api/boards', { method: 'POST', body: JSON.stringify(data) });
// export const updateBoard = (id: number, data: { title: string; description?: string }) => request('/api/boards/' + id, { method: 'PUT', body: JSON.stringify(data) });
// export const deleteBoard = (id: number) => request('/api/boards/' + id, { method: 'DELETE' });

// // Epics
// export const fetchEpics = (boardId: number) => request<{ success: boolean; epics: Epic[] }>(`/api/boards/${boardId}/epics`);
// export const createEpic = (boardId: number, data: { title: string; description?: string }) => request<{ success: boolean; epic: Epic }>(`/api/boards/${boardId}/epics`, { method: 'POST', body: JSON.stringify(data) });
// export const deleteEpic = (id: number) => request(`/api/epics/${id}`, { method: 'DELETE' });

// // Sprints
// export const fetchSprints = (epicId: number) => request<{ success: boolean; sprints: Sprint[] }>(`/api/epics/${epicId}/sprints`);
// export const createSprint = (epicId: number, data: Partial<Sprint>) => request(`/api/epics/${epicId}/sprints`, { method: 'POST', body: JSON.stringify(data) });
// export const deleteSprint = (id: number) => request(`/api/sprints/${id}`, { method: 'DELETE' });

// // Tasks
// export const fetchTasks = (sprintId: number) => request<{ success: boolean; tasks: Task[]; availableStatus: string[] }>(`/api/sprints/${sprintId}/tasks`);
// export const fetchTask = (id: number) => request<{ success: boolean; task: Task; availableStatus: string[] }>(`/api/tasks/${id}`);
// export const createTask = (sprintId: number, data: Partial<Task>) => request(`/api/sprints/${sprintId}/tasks`, { method: 'POST', body: JSON.stringify(data) });
// export const updateTask = (id: number, data: Partial<Task>) => request(`/api/tasks/${id}`, { method: 'PUT', body: JSON.stringify(data) });
// export const deleteTask = (id: number) => request(`/api/tasks/${id}`, { method: 'DELETE' });

// // Subtasks
// export const fetchSubtasks = (taskId: number) => request<{ success: boolean; subtasks: Subtask[] }>(`/api/tasks/${taskId}/subtasks`);
// export const createSubtask = (taskId: number, data: Partial<Subtask>) => request(`/api/tasks/${taskId}/subtasks`, { method: 'POST', body: JSON.stringify(data) });
// export const updateSubtask = (id: number, data: Partial<Subtask>) => request(`/api/subtasks/${id}`, { method: 'PUT', body: JSON.stringify(data) });
// export const deleteSubtask = (id: number) => request(`/api/subtasks/${id}`, { method: 'DELETE' });

// // Comments
// export const fetchTaskComments = (taskId: number) => request<{ success: boolean; comments: Comment[] }>(`/api/tasks/${taskId}/comments`);
// export const createTaskComment = (taskId: number, data: { content: string }) => request(`/api/tasks/${taskId}/comments`, { method: 'POST', body: JSON.stringify(data) });

// // Work Logs
// export const fetchWorkLogs = (subtaskId: number) => request<{ success: boolean; workLogs: WorkLog[] }>(`/api/subtasks/${subtaskId}/worklogs`);
// export const createWorkLog = (subtaskId: number, data: { workDate: string; hoursWorked: number }) => request(`/api/subtasks/${subtaskId}/worklogs`, { method: 'POST', body: JSON.stringify(data) });









import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:4000', // Matches your backend PORT [cite: 21]
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`; // Required by verifyToken [cite: 21]
  }
  return config;
});

export default api;