export declare class AppError extends Error {
    status: number;
    code: string;
    constructor(status: number, code: string, message: string);
}
export declare class ValidationError extends AppError {
    constructor(message?: string);
}
export declare class AuthError extends AppError {
    constructor(message?: string);
}
export declare class ForbiddenError extends AppError {
    constructor(message?: string);
}
//# sourceMappingURL=errors.d.ts.map