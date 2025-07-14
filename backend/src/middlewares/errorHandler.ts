import { Request, Response, NextFunction } from 'express';
import { Error as MongooseError } from 'mongoose';
import { CustomError } from '../utils/customError';
import { sendError } from '../utils/response';

export const globalErrorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  console.error('Error:', error);

  // Custom errors
  if (error instanceof CustomError) {
    sendError(res, error.statusCode, error.message);
    return;
  }

  // MongoDB/Mongoose errors
  if (error instanceof MongooseError.ValidationError) {
    const messages = Object.values(error.errors).map(err => err.message);
    sendError(res, 400, 'Validation failed', messages.join(', '));
    return;
  }

  if (error instanceof MongooseError.CastError) {
    sendError(res, 400, 'Invalid ID format');
    return;
  }

  // MongoDB duplicate key error
  if (error.name === 'MongoError' && (error as any).code === 11000) {
    const field = Object.keys((error as any).keyValue)[0];
    sendError(res, 409, `${field} already exists`);
    return;
  }

  // JWT errors
  if (error.name === 'JsonWebTokenError') {
    sendError(res, 401, 'Invalid token');
    return;
  }

  if (error.name === 'TokenExpiredError') {
    sendError(res, 401, 'Token expired');
    return;
  }

  // Default error
  sendError(
    res,
    500,
    'Internal server error',
    process.env.NODE_ENV === 'development' ? error.message : undefined
  );
};