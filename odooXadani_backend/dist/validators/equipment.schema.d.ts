import { z } from 'zod';
export declare const CreateEquipmentSchema: z.ZodObject<{
    name: z.ZodString;
    serial_number: z.ZodString;
    purchase_date: z.ZodOptional<z.ZodString>;
    warranty_end_date: z.ZodOptional<z.ZodString>;
    location: z.ZodOptional<z.ZodString>;
    assigned_team_id: z.ZodUUID;
    default_technician_id: z.ZodOptional<z.ZodUUID>;
}, z.core.$strip>;
export declare const UpdateEquipmentSchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    serial_number: z.ZodOptional<z.ZodString>;
    purchase_date: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    warranty_end_date: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    location: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    assigned_team_id: z.ZodOptional<z.ZodUUID>;
    default_technician_id: z.ZodOptional<z.ZodOptional<z.ZodUUID>>;
}, z.core.$strip>;
//# sourceMappingURL=equipment.schema.d.ts.map