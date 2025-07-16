// User Types
export interface User {
  _id: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
}

// Project Types
export interface Project {
  _id: string;
  title: string;
  description: string;
  status: 'active' | 'completed';
  user: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProjectFormData {
  title: string;
  description: string;
  status: 'active' | 'completed';
}

export interface ProjectState {
  projects: Project[];
  currentProject: Project | null;
  isLoading: boolean;
  error: string | null;
}

// Task Types
export interface Task {
  _id: string;
  title: string;
  description: string;
  status: 'todo' | 'in-progress' | 'done';
  dueDate: string;
  project: string;
  createdAt: string;
  updatedAt: string;
}

export interface TaskFormData {
  title: string;
  description: string;
  status: 'todo' | 'in-progress' | 'done';
  dueDate: string;
}

export interface TaskState {
  tasks: Task[];
  isLoading: boolean;
  error: string | null;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

// Form Types
export interface LoginFormData {
  email: string;
  password: string;
}

export interface RegisterFormData {
  email: string;
  password: string;
  confirmPassword: string;
}

// Filter Types
export interface TaskFilter {
  status?: 'todo' | 'in-progress' | 'done';
}

// Root State Type
export interface RootState {
  auth: AuthState;
  projects: ProjectState;
  tasks: TaskState;
}