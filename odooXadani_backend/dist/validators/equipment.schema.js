import { z } from 'zod';
export const CreateEquipmentSchema = z.object({
    name: z.string().min(2),
    serial_number: z.string().min(3),
    purchase_date: z.string().optional(),
    warranty_end_date: z.string().optional(),
    location: z.string().optional(),
    assigned_team_id: z.uuid(),
    default_technician_id: z.uuid().optional()
});
export const UpdateEquipmentSchema = CreateEquipmentSchema.partial();
//# sourceMappingURL=equipment.schema.js.map