import { z } from 'zod';

export const CreateUserSchema = z.object({
  email: z.email(),
  password: z.string().min(6),
  role: z.enum(['REQUESTER', 'TECHNICIAN', 'MANAGER', 'ADMIN'])
});

export const ChangePasswordSchema = z.object({
  currentPassword: z.string().min(6),
  newPassword: z.string().min(6)
});
