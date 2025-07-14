import { Router } from 'express';
import {
  createProject,
  getProjects,
  getProject,
  updateProject,
  deleteProject
} from '../controllers/project';
import { createTask, getTasks } from '../controllers/task';
import { authenticateToken } from '../middlewares/auth';
import { validateBody } from '../middlewares/validation';
import { createProjectSchema, updateProjectSchema, createTaskSchema } from '../utils/validation';

const router = Router();

// All routes require authentication
router.use(authenticateToken);

/**
 * @route   GET /api/projects
 * @desc    Get all projects for authenticated user
 * @access  Private
 */
router.get('/', getProjects);

/**
 * @route   POST /api/projects
 * @desc    Create a new project
 * @access  Private
 */
router.post('/', validateBody(createProjectSchema), createProject);

/**
 * @route   GET /api/projects/:id
 * @desc    Get a specific project
 * @access  Private
 */
router.get('/:id', getProject);

/**
 * @route   PUT /api/projects/:id
 * @desc    Update a project
 * @access  Private
 */
router.put('/:id', validateBody(updateProjectSchema), updateProject);

/**
 * @route   DELETE /api/projects/:id
 * @desc    Delete a project
 * @access  Private
 */
router.delete('/:id', deleteProject);

/**
 * @route   GET /api/projects/:projectId/tasks
 * @desc    Get all tasks for a specific project
 * @access  Private
 */
router.get('/:projectId/tasks', getTasks);

/**
 * @route   POST /api/projects/:projectId/tasks
 * @desc    Create a new task for a specific project
 * @access  Private
 */
router.post('/:projectId/tasks', validateBody(createTaskSchema), createTask);

export default router;