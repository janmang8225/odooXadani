import { z } from 'zod';
export const CreateRequestSchema = z.object({
    subject: z.string().min(3),
    type: z.enum(['CORRECTIVE', 'PREVENTIVE']),
    equipment_id: z.uuid(),
    scheduled_date: z.string().optional()
}).refine((d) => d.type === 'CORRECTIVE' || d.scheduled_date, { message: 'scheduled_date required for PREVENTIVE' });
export const AssignRequestSchema = z.object({
    technicianId: z.uuid()
});
export const RepairRequestSchema = z.object({
    durationHours: z.number().positive()
});
//# sourceMappingURL=requests.schema.js.map