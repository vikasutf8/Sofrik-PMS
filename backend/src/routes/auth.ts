import { Router } from 'express';
import { register, login } from '../controllers/auth';
import { validateBody } from '../middlewares/validation';
import { registerSchema, loginSchema } from '../utils/validation';

const router = Router();

/**
 * @route   POST /api/auth/register
 * @desc    Register a new user
 * @access  Public
 */
router.post('/register', validateBody(registerSchema), register);

/**
 * @route   POST /api/auth/login
 * @desc    Login user
 * @access  Public
 */
router.post('/login', validateBody(loginSchema), login);

export default router;