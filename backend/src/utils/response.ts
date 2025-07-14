import { Response } from 'express';
import { IApiResponse } from '../types';

export const sendResponse = <T>(
  res: Response,
  statusCode: number,
  message: string,
  data?: T
): Response => {
  const response: IApiResponse<T> = {
    success: statusCode < 400,
    message,
    data
  }; 

  return res.status(statusCode).json(response);
};

export const sendError = (
  res: Response,
  statusCode: number,
  message: string,
  error?: string
): Response => {
  const response: IApiResponse = {
    success: false,
    message,
    error
  };

  return res.status(statusCode).json(response);
};