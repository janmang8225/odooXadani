import { z } from 'zod';

export const CreateTeamSchema = z.object({
  name: z.string().min(2)
});

export const AddTechnicianSchema = z.object({
  technicianId: z.uuid()
});
