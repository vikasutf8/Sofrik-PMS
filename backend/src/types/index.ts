import { Request } from 'express';
import { JwtPayload } from 'jsonwebtoken';

// User types
export interface IUser {
  _id: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUserInput {
  email: string;
  password: string;
}

export interface IUserResponse {
  _id: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

// Project types
export interface IProject {
  _id: string;
  title: string;
  description: string;
  status: 'active' | 'completed';
  user: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IProjectInput {
  title: string;
  description: string;
  status?: 'active' | 'completed';
}

// Task types
export interface ITask {
  _id: string;
  title: string;
  description: string;
  status: 'todo' | 'in-progress' | 'done';
  dueDate?: Date;
  project: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ITaskInput {
  title: string;
  description: string;
  status?: 'todo' | 'in-progress' | 'done';
  dueDate?: Date;
}

// Auth types
export interface IAuthRequest extends Request {
  user?: {
    userId: string;
    email: string;
  };
}

export interface IJwtPayload extends JwtPayload {
  userId: string;
  email: string;
}

// API Response types
export interface IApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}

export interface IPaginatedResponse<T = any> {
  success: boolean;
  message: string;
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

// Error types
export interface ICustomError extends Error {
  statusCode: number;
  isOperational?: boolean;
}

// Validation types
export interface IValidationError {
  field: string;
  message: string;
}

// Filter types
export interface ITaskFilter {
  status?: 'todo' | 'in-progress' | 'done';
  projectId?: string;
}