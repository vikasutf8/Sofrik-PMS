import { Request, Response, NextFunction } from 'express';
import Project from '../models/Project';
import Task from '../models/Task';
import { sendResponse } from '../utils/response';
import { NotFoundError, ForbiddenError } from '../utils/customError';
import { IAuthRequest, IProjectInput } from '../types';

export const createProject = async (
  req: IAuthRequest & Request<{}, {}, IProjectInput>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { title, description, status } = req.body;
    const userId = req.user!.userId;

    const project = new Project({
      title,
      description,
      status,
      user: userId
    });

    await project.save();

    sendResponse(res, 201, 'Project created successfully', project);
  } catch (error) {
    next(error);
  }
};

export const getProjects = async (
  req: IAuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const userId = req.user!.userId;
    const { status } = req.query;

    const filter: any = { user: userId };
    if (status) filter.status = status;

    const projects = await Project.find(filter)
      .sort({ createdAt: -1 })
      .lean();

    sendResponse(res, 200, 'Projects retrieved successfully', projects);
  } catch (error) {
    next(error);
  }
};

export const getProject = async (
  req: IAuthRequest & Request<{ id: string }>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const userId = req.user!.userId;

    const project = await Project.findById(id).lean();

    if (!project) {
      throw new NotFoundError('Project not found');
    }

    if (project.user.toString() !== userId) {
      throw new ForbiddenError('Access denied to this project');
    }

    sendResponse(res, 200, 'Project retrieved successfully', project);
  } catch (error) {
    next(error);
  }
};

export const updateProject = async (
  req: IAuthRequest & Request<{ id: string }, {}, Partial<IProjectInput>>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const userId = req.user!.userId;
    const updates = req.body;

    const project = await Project.findById(id);

    if (!project) {
      throw new NotFoundError('Project not found');
    }

    if (project.user.toString() !== userId) {
      throw new ForbiddenError('Access denied to this project');
    }

    Object.assign(project, updates);
    await project.save();

    sendResponse(res, 200, 'Project updated successfully', project);
  } catch (error) {
    next(error);
  }
};

export const deleteProject = async (
  req: IAuthRequest & Request<{ id: string }>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const userId = req.user!.userId;

    const project = await Project.findById(id);

    if (!project) {
      throw new NotFoundError('Project not found');
    }

    if (project.user.toString() !== userId) {
      throw new ForbiddenError('Access denied to this project');
    }

    // Delete associated tasks
    await Task.deleteMany({ project: id });

    // Delete project
    await project.deleteOne();

    sendResponse(res, 200, 'Project deleted successfully');
  } catch (error) {
    next(error);
  }
};