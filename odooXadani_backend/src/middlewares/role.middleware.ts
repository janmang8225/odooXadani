import type{ Request, Response, NextFunction } from 'express';
import { ForbiddenError } from '../types/errors.js';
import type{ AuthContext } from '../types/auth.js';

export function requireRole(roles: AuthContext['role'][]) {
  return (req: Request, _res: Response, next: NextFunction) => {
    const auth = (req as any).auth as AuthContext;

    if (!auth || !roles.includes(auth.role)) {
      throw new ForbiddenError();
    }

    next();
  };
}
