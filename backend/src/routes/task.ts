import { Router } from 'express';
import {
  getTask,
  updateTask,
  deleteTask,
  getTasksByStatus
} from '../controllers/task';
import { authenticateToken } from '../middlewares/auth';
import { validateBody, validateQuery } from '../middlewares/validation';
import { updateTaskSchema, taskFilterSchema } from '../utils/validation';

const router = Router();

// All routes require authentication
router.use(authenticateToken);

/**
 * @route   GET /api/tasks
 * @desc    Get all tasks for authenticated user with optional status filter
 * @access  Private
 */
router.get('/', validateQuery(taskFilterSchema), getTasksByStatus);

/**
 * @route   GET /api/tasks/:id
 * @desc    Get a specific task
 * @access  Private
 */
router.get('/:id', getTask);

/**
 * @route   PUT /api/tasks/:id
 * @desc    Update a task
 * @access  Private
 */
router.put('/:id', validateBody(updateTaskSchema), updateTask);

/**
 * @route   DELETE /api/tasks/:id
 * @desc    Delete a task
 * @access  Private
 */
router.delete('/:id', deleteTask);

export default router;