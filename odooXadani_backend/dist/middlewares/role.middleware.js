import { ForbiddenError } from '../types/errors.js';
export function requireRole(roles) {
    return (req, _res, next) => {
        const auth = req.auth;
        if (!auth || !roles.includes(auth.role)) {
            throw new ForbiddenError();
        }
        next();
    };
}
//# sourceMappingURL=role.middleware.js.map