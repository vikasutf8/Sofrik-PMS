import { Request, Response, NextFunction } from 'express';
import { NotFoundError } from '../utils/customError';

export const notFoundHandler = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  next(new NotFoundError(`Route ${req.originalUrl} not found`));
};