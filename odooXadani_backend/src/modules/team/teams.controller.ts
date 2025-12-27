import type{ Request, Response } from 'express';
import { TeamsService } from './teams.service.js';
import { CreateTeamSchema, AddTechnicianSchema } from '../../validators/teams.schema.js';

const service = new TeamsService();

export async function createTeam(req: Request, res: Response) {
  const auth = (req as any).auth;
  const body = CreateTeamSchema.parse(req.body);
  const team = await service.createTeam(auth.role, body.name);

  res.status(201).json(team);
}

export async function addTechnician(req: Request, res: Response) {
  const auth = (req as any).auth;

  const id = req.params.id;
  const technicianId = req.body.technicianId;

  if (!id || typeof id !== 'string') {
    return res.status(400).json({ error: 'Invalid or missing id parameter' });
  }

  if (!technicianId || typeof technicianId !== 'string') {
    return res.status(400).json({ error: 'Invalid or missing technicianId' });
  }

  const data = AddTechnicianSchema.parse(req.body);
  await service.addTechnician(auth.role, id, data.technicianId);
  res.status(204).send();
}
