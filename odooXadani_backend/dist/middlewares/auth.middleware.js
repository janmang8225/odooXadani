import jwt from 'jsonwebtoken';
import { jwtConfig } from '../config/jwt.js';
import { AuthError } from '../types/errors.js';
export function authenticate(req, _res, next) {
    const header = req.headers.authorization;
    if (!header) {
        throw new AuthError('Missing token');
    }
    const [, token] = header.split(' ');
    if (!token) {
        throw new AuthError('Invalid token');
    }
    try {
        const payload = jwt.verify(token, jwtConfig.secret);
        const auth = {
            userId: payload.sub,
            role: payload.role
        };
        console.log("f " + payload.sub + " f: " + payload.role);
        req.auth = auth;
        next();
    }
    catch {
        throw new AuthError('Invalid or expired token');
    }
}
//# sourceMappingURL=auth.middleware.js.map