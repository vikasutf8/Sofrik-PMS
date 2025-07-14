import { Request, Response, NextFunction } from 'express';
import Task from '../models/Task';
import Project from '../models/Project';
import { sendResponse } from '../utils/response';
import { NotFoundError, ForbiddenError } from '../utils/customError';
import { IAuthRequest, ITaskInput } from '../types';

export const createTask = async (
  req: IAuthRequest & Request<{ projectId: string }, {}, ITaskInput>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { projectId } = req.params;
    const { title, description, status, dueDate } = req.body;
    const userId = req.user!.userId;

    // Check if project exists and belongs to user
    const project = await Project.findById(projectId);
    if (!project) {
      throw new NotFoundError('Project not found');
    }

    if (project.user.toString() !== userId) {
      throw new ForbiddenError('Access denied to this project');
    }

    const task = new Task({
      title,
      description,
      status,
      dueDate,
      project: projectId
    });

    await task.save();

    sendResponse(res, 201, 'Task created successfully', task);
  } catch (error) {
    next(error);
  }
};

export const getTasks = async (
  req: IAuthRequest & Request<{ projectId: string }>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { projectId } = req.params;
    const { status } = req.query;
    const userId = req.user!.userId;

    // Check if project exists and belongs to user
    const project = await Project.findById(projectId);
    if (!project) {
      throw new NotFoundError('Project not found');
    }

    if (project.user.toString() !== userId) {
      throw new ForbiddenError('Access denied to this project');
    }

    const filter: any = { project: projectId };
    if (status) filter.status = status;

    const tasks = await Task.find(filter)
      .sort({ createdAt: -1 })
      .lean();

    sendResponse(res, 200, 'Tasks retrieved successfully', tasks);
  } catch (error) {
    next(error);
  }
};

export const getTask = async (
  req: IAuthRequest & Request<{ id: string }>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const userId = req.user!.userId;

    const task = await Task.findById(id).populate('project', 'user').lean();

    if (!task) {
      throw new NotFoundError('Task not found');
    }

    if ((task.project as any).user.toString() !== userId) {
      throw new ForbiddenError('Access denied to this task');
    }

    sendResponse(res, 200, 'Task retrieved successfully', task);
  } catch (error) {
    next(error);
  }
};

export const updateTask = async (
  req: IAuthRequest & Request<{ id: string }, {}, Partial<ITaskInput>>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const userId = req.user!.userId;
    const updates = req.body;

    const task = await Task.findById(id).populate('project', 'user');

    if (!task) {
      throw new NotFoundError('Task not found');
    }

    if ((task.project as any).user.toString() !== userId) {
      throw new ForbiddenError('Access denied to this task');
    }

    Object.assign(task, updates);
    await task.save();

    sendResponse(res, 200, 'Task updated successfully', task);
  } catch (error) {
    next(error);
  }
};

export const deleteTask = async (
  req: IAuthRequest & Request<{ id: string }>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const userId = req.user!.userId;

    const task = await Task.findById(id).populate('project', 'user');

    if (!task) {
      throw new NotFoundError('Task not found');
    }

    if ((task.project as any).user.toString() !== userId) {
      throw new ForbiddenError('Access denied to this task');
    }

    await task.deleteOne();

    sendResponse(res, 200, 'Task deleted successfully');
  } catch (error) {
    next(error);
  }
};

export const getTasksByStatus = async (
  req: IAuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { status } = req.query;
    const userId = req.user!.userId;

    // Get all projects belonging to the user
    const userProjects = await Project.find({ user: userId }).select('_id');
    const projectIds = userProjects.map(project => project._id);

    const filter: any = { project: { $in: projectIds } };
    if (status) filter.status = status;

    const tasks = await Task.find(filter)
      .populate('project', 'title')
      .sort({ createdAt: -1 })
      .lean();

    sendResponse(res, 200, 'Tasks retrieved successfully', tasks);
  } catch (error) {
    next(error);
  }
};