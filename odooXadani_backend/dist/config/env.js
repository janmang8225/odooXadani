import { z } from 'zod';
import 'dotenv/config';
const EnvSchema = z.object({
    NODE_ENV: z.enum(['development', 'production', 'test']),
    PORT: z.string().regex(/^\d+$/),
    DATABASE_URL: z.string(),
    JWT_SECRET: z.string().min(32),
    JWT_EXPIRES_IN: z.string()
});
export const env = EnvSchema.parse(process.env);
//# sourceMappingURL=env.js.map