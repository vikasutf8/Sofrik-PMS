import jwt, { SignOptions } from 'jsonwebtoken';
import { IJwtPayload } from '../types';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';


export const generateToken = (payload: { userId: string; email: string }): string => {
//   return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
  const options: SignOptions = { expiresIn: 3600*24*7 };
  return jwt.sign(payload, JWT_SECRET, options);
};

export const verifyToken = (token: string): IJwtPayload => {
  try {
    return jwt.verify(token, JWT_SECRET) as IJwtPayload;
  } catch (error) {
    throw new Error('Invalid token');
  }
};

export const decodeToken = (token: string): IJwtPayload | null => {
  try {
    return jwt.decode(token) as IJwtPayload;
  } catch (error) {
    return null;
  }
};