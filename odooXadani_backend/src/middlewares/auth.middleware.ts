import type{ Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { jwtConfig } from '../config/jwt.js';
import { AuthError } from '../types/errors.js';
import type{ AuthContext } from '../types/auth.js';

export function authenticate(
  req: Request,
  _res: Response,
  next: NextFunction
) {
  const header = req.headers.authorization;
  if (!header) {
    throw new AuthError('Missing token');
  }

  const [, token] = header.split(' ');
  if (!token) {
    throw new AuthError('Invalid token');
  }

  try {
    const payload = jwt.verify(token, jwtConfig.secret) as any;

    const auth: AuthContext = {
      userId: payload.sub,
      role: payload.role
    };
    (req as any).auth = auth;
    next();
  } catch {
    throw new AuthError('Invalid or expired token');
  }
}
