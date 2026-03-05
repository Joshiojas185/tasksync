import type { Board, Epic, Sprint, Task } from '@/types';

export const mockBoards: Board[] = [
  { id: 1, title: 'Product Development', description: 'Main product roadmap and features', createdBy: 1, createdAt: '2025-01-15', updatedAt: '2025-02-20' },
  { id: 2, title: 'Marketing Site', description: 'Website redesign project', createdBy: 1, createdAt: '2025-02-01', updatedAt: '2025-02-25' },
  { id: 3, title: 'Mobile App', description: 'iOS and Android development', createdBy: 1, createdAt: '2025-02-10', updatedAt: '2025-02-28' },
];

export const mockEpics: Epic[] = [
  { id: 1, title: 'Authentication', description: 'User auth system', boardId: 1, createdAt: '2025-01-15', updatedAt: '2025-02-20' },
  { id: 2, title: 'Dashboard', description: 'Main dashboard views', boardId: 1, createdAt: '2025-01-20', updatedAt: '2025-02-22' },
  { id: 3, title: 'API Integration', description: 'Third party APIs', boardId: 1, createdAt: '2025-02-01', updatedAt: '2025-02-25' },
];

export const mockSprints: Sprint[] = [
  { id: 1, title: 'Sprint 1 — Auth Foundation', description: 'Core auth features', startTime: '2025-02-01', expiry: '2025-02-14', status: ['To Do', 'In Progress', 'In Review', 'Done'], epicId: 1, createdAt: '2025-02-01', updatedAt: '2025-02-01' },
  { id: 2, title: 'Sprint 2 — Dashboard MVP', description: 'Dashboard basics', startTime: '2025-02-15', expiry: '2025-02-28', status: ['Backlog', 'To Do', 'In Progress', 'Done'], epicId: 2, createdAt: '2025-02-15', updatedAt: '2025-02-15' },
];

export const mockTasks: Task[] = [
  { id: 1, sprintId: 1, title: 'Implement Google OAuth', description: 'Add Google sign-in flow with token verification', assigneeName: 'Alex Chen', storyPoints: 5, hours: 8, status: 'Done', priority: 'High', createdAt: '2025-02-01', updatedAt: '2025-02-10' },
  { id: 2, sprintId: 1, title: 'JWT middleware', description: 'Create token verification middleware for protected routes', assigneeName: 'Sarah Kim', storyPoints: 3, hours: 4, status: 'Done', priority: 'High', createdAt: '2025-02-02', updatedAt: '2025-02-08' },
  { id: 3, sprintId: 1, title: 'Role-based access control', description: 'Implement admin and user role checks', assigneeName: 'Alex Chen', storyPoints: 5, hours: 6, status: 'In Review', priority: 'Medium', createdAt: '2025-02-03', updatedAt: '2025-02-12' },
  { id: 4, sprintId: 1, title: 'Session management', description: 'Handle token refresh and expiry', assigneeName: 'Jordan Lee', storyPoints: 3, hours: 4, status: 'In Progress', priority: 'Medium', createdAt: '2025-02-04', updatedAt: '2025-02-13' },
  { id: 5, sprintId: 1, title: 'Protected route guards', description: 'Create HOC for protected pages', storyPoints: 2, hours: 3, status: 'In Progress', priority: 'Low', createdAt: '2025-02-05', updatedAt: '2025-02-13' },
  { id: 6, sprintId: 1, title: 'Login page UI', description: 'Design and implement the login screen', assigneeName: 'Maya Singh', storyPoints: 3, hours: 5, status: 'To Do', priority: 'Medium', createdAt: '2025-02-05', updatedAt: '2025-02-05' },
  { id: 7, sprintId: 1, title: 'Logout flow', description: 'Clean token invalidation and redirect', assigneeName: 'Sarah Kim', storyPoints: 1, hours: 1, status: 'To Do', priority: 'Low', createdAt: '2025-02-06', updatedAt: '2025-02-06' },
];
