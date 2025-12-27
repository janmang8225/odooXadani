import { z } from 'zod';
export declare const CreateUserSchema: z.ZodObject<{
    email: z.ZodEmail;
    password: z.ZodString;
    role: z.ZodEnum<{
        REQUESTER: "REQUESTER";
        TECHNICIAN: "TECHNICIAN";
        MANAGER: "MANAGER";
        ADMIN: "ADMIN";
    }>;
}, z.core.$strip>;
export declare const ChangePasswordSchema: z.ZodObject<{
    currentPassword: z.ZodString;
    newPassword: z.ZodString;
}, z.core.$strip>;
//# sourceMappingURL=users.schema.d.ts.map