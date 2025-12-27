import { z } from 'zod';
export declare const UpdatedAfterSchema: z.ZodObject<{
    updatedAfter: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export declare const PreventiveCalendarSchema: z.ZodObject<{
    from: z.ZodDate;
    to: z.ZodDate;
    updatedAfter: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
//# sourceMappingURL=polling.schema.d.ts.map