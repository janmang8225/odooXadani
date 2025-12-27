import type{ PoolClient } from 'pg';

export class UsersRepository {
  async findByEmail(client: PoolClient, email: string) {
    const { rows } = await client.query(
      `SELECT * FROM users WHERE email = $1`,
      [email]
    );
    return rows[0] || null;
  }

  async findById(client: PoolClient, id: string) {
    const { rows } = await client.query(
      `SELECT * FROM users WHERE id = $1`,
      [id]
    );
    return rows[0] || null;
  }

  async create(client: PoolClient, data: {
    email: string;
    passwordHash: string;
    role: string;
  }) {
    const { rows } = await client.query(
      `
      INSERT INTO users (email, password_hash, role)
      VALUES ($1, $2, $3)
      RETURNING id, email, role, is_active
      `,
      [data.email, data.passwordHash, data.role]
    );
    return rows[0];
  }

  async deactivate(client: PoolClient, userId: string) {
    await client.query(
      `UPDATE users SET is_active = false, updated_at = now() WHERE id = $1`,
      [userId]
    );
  }

  async updatePassword(
    client: PoolClient,
    userId: string,
    passwordHash: string
  ) {
    await client.query(
      `UPDATE users SET password_hash = $2, updated_at = now() WHERE id = $1`,
      [userId, passwordHash]
    );
  }
}
