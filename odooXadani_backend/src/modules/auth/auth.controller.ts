import type{ Request, Response } from 'express';
import { AuthService } from './auth.service.js';
import { LoginSchema } from '../../validators/auth.schema.js';

const service = new AuthService();

export async function login(req: Request, res: Response) {
  // without zod
  // const { email, password } = req.body;
  // const result = await service.login(email, password);

  // after zod
  const data = LoginSchema.parse(req.body);
  const result = await service.login(data.email, data.password);
  res.json(result);
}
