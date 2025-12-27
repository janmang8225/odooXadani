import type{ Request, Response } from 'express';
import { UsersService } from './users.service.js';
import { CreateUserSchema } from '../../validators/users.schema.js';
import { ChangePasswordSchema } from '../../validators/users.schema.js';

const service = new UsersService();

export async function createUser(req: Request, res: Response) {
  const auth = (req as any).auth;
  const data = CreateUserSchema.parse(req.body);
  const user = await service.createUser(auth.role, data);
  res.status(201).json(user);
}

export async function changePassword(req: Request, res: Response) {
  const auth = (req as any).auth;
  const data = ChangePasswordSchema.parse(req.body);
  await service.changePassword(auth.userId, data.currentPassword, data.newPassword);
  res.status(204).send();
}
