import axios, { type AxiosInstance, type AxiosResponse } from 'axios';
import type {
    ApiResponse,
    AuthResponse,
    LoginFormData,
    RegisterFormData,
    Project,
    ProjectFormData,
    Task,
    TaskFormData
} from '../types';

class ApiService {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Request interceptor to add auth token
    this.api.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response interceptor for error handling
    this.api.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          localStorage.removeItem('token');
          window.location.href = '/login';
        }
        return Promise.reject(error);
      }
    );
  }

  // Authentication APIs
  async register(userData: RegisterFormData): Promise<ApiResponse<AuthResponse>> {
    const response: AxiosResponse<ApiResponse<AuthResponse>> = await this.api.post(
      '/auth/register',
      userData
    );
    return response.data;
  }

  async login(credentials: LoginFormData): Promise<ApiResponse<AuthResponse>> {
    const response: AxiosResponse<ApiResponse<AuthResponse>> = await this.api.post(
      '/auth/login',
      credentials
    );
    return response.data;
  }

  // Project APIs
  async getProjects(): Promise<ApiResponse<Project[]>> {
    const response: AxiosResponse<ApiResponse<Project[]>> = await this.api.get('/projects');
    return response.data;
  }

  async getProject(id: string): Promise<ApiResponse<Project>> {
    const response: AxiosResponse<ApiResponse<Project>> = await this.api.get(`/projects/${id}`);
    return response.data;
  }

  async createProject(projectData: ProjectFormData): Promise<ApiResponse<Project>> {
    const response: AxiosResponse<ApiResponse<Project>> = await this.api.post(
      '/projects',
      projectData
    );
    return response.data;
  }

  async updateProject(id: string, projectData: ProjectFormData): Promise<ApiResponse<Project>> {
    const response: AxiosResponse<ApiResponse<Project>> = await this.api.put(
      `/projects/${id}`,
      projectData
    );
    return response.data;
  }

  async deleteProject(id: string): Promise<ApiResponse<void>> {
    const response: AxiosResponse<ApiResponse<void>> = await this.api.delete(`/projects/${id}`);
    return response.data;
  }

  // Task APIs
  async getProjectTasks(projectId: string): Promise<ApiResponse<Task[]>> {
    const response: AxiosResponse<ApiResponse<Task[]>> = await this.api.get(
      `/projects/${projectId}/tasks`
    );
    return response.data;
  }

  async createTask(projectId: string, taskData: TaskFormData): Promise<ApiResponse<Task>> {
    const response: AxiosResponse<ApiResponse<Task>> = await this.api.post(
      `/projects/${projectId}/tasks`,
      taskData
    );
    return response.data;
  }

  async updateTask(id: string, taskData: TaskFormData): Promise<ApiResponse<Task>> {
    const response: AxiosResponse<ApiResponse<Task>> = await this.api.put(
      `/tasks/${id}`,
      taskData
    );
    return response.data;
  }

  async deleteTask(id: string): Promise<ApiResponse<void>> {
    const response: AxiosResponse<ApiResponse<void>> = await this.api.delete(`/tasks/${id}`);
    return response.data;
  }

  async getTasksByStatus(status: string): Promise<ApiResponse<Task[]>> {
    const response: AxiosResponse<ApiResponse<Task[]>> = await this.api.get(
      `/tasks?status=${status}`
    );
    return response.data;
  }
}

export const apiService = new ApiService();