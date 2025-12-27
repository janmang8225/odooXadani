export class AppError extends Error {
    status;
    code;
    constructor(status, code, message) {
        super(message);
        this.status = status;
        this.code = code;
    }
}
export class ValidationError extends AppError {
    constructor(message = 'Validation failed') {
        super(400, 'VALIDATION_ERROR', message);
    }
}
export class AuthError extends AppError {
    constructor(message = 'Unauthorized') {
        super(401, 'AUTH_ERROR', message);
    }
}
export class ForbiddenError extends AppError {
    constructor(message = 'Forbidden') {
        super(403, 'FORBIDDEN', message);
    }
}
//# sourceMappingURL=errors.js.map