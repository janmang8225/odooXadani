import jwt, { type SignOptions } from 'jsonwebtoken';
import { pool } from '../../config/database.js';
import { UsersRepository } from '../users/users.repository.js';
import { verifyPassword } from '../../utils/password.js';
import { AppError, AuthError, ForbiddenError } from '../../types/errors.js';
import { jwtConfig } from '../../config/jwt.js';

const usersRepo = new UsersRepository();

export class AuthService {
  async login(email: string, password: string) {
    const client = await pool.connect();
    try {
      const user = await usersRepo.findByEmail(client, email);

      if (!user) {
        throw new AuthError('Invalid credentials');
      }

      if (!user.is_active) {
        throw new ForbiddenError('User is inactive');
      }

      const valid = await verifyPassword(password, user.password_hash);
      if (!valid) {
        throw new AuthError('Invalid credentials');
      }

      const token = jwt.sign(
        { sub: user.id, role: user.role },
        jwtConfig.secret as jwt.Secret,
        { expiresIn: jwtConfig.expiresIn as string} as SignOptions
      );

      return {
        accessToken: token,
        expiresIn: jwtConfig.expiresIn
      };
    } finally {
      client.release();
    }
  }
}
