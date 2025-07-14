import { Request, Response, NextFunction } from 'express';
import User from '../models/User';
import { generateToken } from '../utils/jwt';
import { sendResponse } from '../utils/response';
import { ConflictError, UnauthorizedError } from '../utils/customError';
import { IUserInput } from '../types';

export const register = async (
  req: Request<{}, {}, IUserInput>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new ConflictError('User already exists with this email');
    }

    // Create new user
    const user = new User({ email, password });
    await user.save();

    // Generate token
    const token = generateToken({ userId: user._id.toString(), email: user.email });

    sendResponse(res, 201, 'User registered successfully', {
      user: {
        _id: user._id,
        email: user.email,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
      },
      token
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (
  req: Request<{}, {}, IUserInput>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { email, password } = req.body;

    // Find user and include password for comparison
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      throw new UnauthorizedError('Invalid credentials');
    }

    // Check password
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      throw new UnauthorizedError('Invalid credentials');
    }

    // Generate token
    const token = generateToken({ userId: user._id.toString(), email: user.email });

    sendResponse(res, 200, 'Login successful', {
      user: {
        _id: user._id,
        email: user.email,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
      },
      token
    });
  } catch (error) {
    next(error);
  }
};