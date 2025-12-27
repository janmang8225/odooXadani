import type { Request, Response, NextFunction } from 'express';
import type { AuthContext } from '../types/auth.js';
export declare function requireRole(roles: AuthContext['role'][]): (req: Request, _res: Response, next: NextFunction) => void;
//# sourceMappingURL=role.middleware.d.ts.map