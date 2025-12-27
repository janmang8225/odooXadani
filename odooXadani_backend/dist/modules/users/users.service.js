import { UsersRepository } from './users.repository.js';
import { hashPassword, verifyPassword } from '../../utils/password.js';
import { AppError, ForbiddenError, ValidationError } from '../../types/errors.js';
import { withTransaction } from '../../database/transactions.js';
import { pool } from '../../config/database.js';
const repo = new UsersRepository();
export class UsersService {
    async createUser(actorRole, payload) {
        if (actorRole !== 'ADMIN') {
            throw new ForbiddenError();
        }
        return withTransaction(async (client) => {
            const existing = await repo.findByEmail(client, payload.email);
            if (existing) {
                throw new AppError(409, 'DUPLICATE_EMAIL', 'Email already exists');
            }
            const passwordHash = await hashPassword(payload.password);
            return repo.create(client, {
                email: payload.email,
                passwordHash,
                role: payload.role
            });
        });
    }
    async getUserById(userId) {
        const client = await pool.connect();
        try {
            const user = await repo.findById(client, userId);
            if (!user) {
                throw new AppError(404, 'USER_NOT_FOUND', 'User not found');
            }
            return user;
        }
        finally {
            client.release();
        }
    }
    async changePassword(userId, currentPassword, newPassword) {
        return withTransaction(async (client) => {
            const user = await repo.findById(client, userId);
            if (!user) {
                throw new AppError(404, 'USER_NOT_FOUND', 'User not found');
            }
            const valid = await verifyPassword(currentPassword, user.password_hash);
            if (!valid) {
                throw new ValidationError('Invalid current password');
            }
            const newHash = await hashPassword(newPassword);
            await repo.updatePassword(client, userId, newHash);
        });
    }
    async deactivateUser(actorId, actorRole, targetUserId) {
        if (actorRole !== 'ADMIN') {
            throw new ForbiddenError();
        }
        if (actorId === targetUserId) {
            throw new ValidationError('Cannot deactivate self');
        }
        return withTransaction(async (client) => {
            const user = await repo.findById(client, targetUserId);
            if (!user) {
                throw new AppError(404, 'USER_NOT_FOUND', 'User not found');
            }
            await repo.deactivate(client, targetUserId);
        });
    }
}
//# sourceMappingURL=users.service.js.map