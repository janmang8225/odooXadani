import { z } from 'zod';
export declare const CreateRequestSchema: z.ZodObject<{
    subject: z.ZodString;
    type: z.ZodEnum<{
        PREVENTIVE: "PREVENTIVE";
        CORRECTIVE: "CORRECTIVE";
    }>;
    equipment_id: z.ZodUUID;
    scheduled_date: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export declare const AssignRequestSchema: z.ZodObject<{
    technicianId: z.ZodUUID;
}, z.core.$strip>;
export declare const RepairRequestSchema: z.ZodObject<{
    durationHours: z.ZodNumber;
}, z.core.$strip>;
//# sourceMappingURL=requests.schema.d.ts.map