export interface User {
  id: number;
  googleId?: string;
  name: string;
  email: string;
  picture?: string;
  role: string[];
  createdAt?: string;
  updatedAt?: string;
}

export interface Board {
  id: number;
  title: string;
  description?: string;
  createdBy: number;
  createdAt: string;
  updatedAt: string;
  allowedUsers?: User[];
}

export interface Epic {
  id: number;
  title: string;
  description?: string;
  boardId: number;
  createdBy?: number;
  createdAt: string;
  updatedAt: string;
}

export interface Sprint {
  id: number;
  title: string;
  description?: string;
  startTime: string;
  expiry: string;
  status: string[]; // dynamic columns e.g. ["To Do", "In Progress", "Done"]
  epicId: number;
  createdBy?: number;
  createdAt: string;
  updatedAt: string;
}

export interface Task {
  id: number;
  sprintId: number;
  title: string;
  description?: string;
  assigneeId?: number;
  assigneeName?: string;
  assigneeEmail?: string;
  assigneePicture?: string;
  storyPoints: number;
  hours: number;
  status: string;
  priority: 'Low' | 'Medium' | 'High';
  createdBy?: number;
  createdAt: string;
  updatedAt: string;
  subtasks?: Subtask[];
}

export interface Subtask {
  id: number;
  taskId: number;
  title: string;
  description?: string;
  assigneeId: number;
  assigneeName?: string;
  assigneeEmail?: string;
  hours: number;
  status: 'Active' | 'Done';
  completedAt?: string;
  createdBy?: number;
  createdAt: string;
  updatedAt: string;
}

export interface SubtaskWorkLog {
  id: number;
  subtaskId: number;
  userId: number;
  userName?: string;
  workDate: string;
  hoursWorked: number;
  createdAt: string;
}

export interface Comment {
  id: number;
  taskId?: number;
  subtaskId?: number;
  userId: number;
  userName: string;
  userPicture?: string;
  content: string;
  fileName?: string;
  filePath?: string;
  createdAt: string;
}

export interface WorkLog {
  id: number;
  subtaskId: number;
  userId: number;
  workDate: string;
  hoursWorked: number;
  createdAt: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
}
