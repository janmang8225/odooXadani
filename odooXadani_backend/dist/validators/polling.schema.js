import { z } from 'zod';
export const UpdatedAfterSchema = z.object({
    updatedAfter: z
        .string()
        .refine((val) => !val || !isNaN(Date.parse(val)), {
        message: 'Invalid date format',
    })
        .optional(),
});
export const PreventiveCalendarSchema = z.object({
    from: z.date(),
    to: z.date(),
    updatedAfter: z
        .string()
        .refine((val) => !isNaN(Date.parse(val)), {
        message: 'Invalid date format',
    })
        .optional(),
});
//# sourceMappingURL=polling.schema.js.map