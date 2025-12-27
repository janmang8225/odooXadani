import { AppError } from '../types/errors.js';
export function errorMiddleware(err, _req, res, _next) {
    if (err instanceof AppError) {
        return res.status(err.status).json({
            code: err.code,
            message: err.message
        });
    }
    console.error(err);
    return res.status(500).json({
        code: 'INTERNAL_ERROR',
        message: 'Something went wrong'
    });
}
//# sourceMappingURL=error.middleware.js.map