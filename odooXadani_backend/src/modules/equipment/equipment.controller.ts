import type{ Request, Response } from 'express';
import { EquipmentService } from './equipment.service.js';
import {
  CreateEquipmentSchema,
  UpdateEquipmentSchema
} from '../../validators/equipment.schema.js';

const service = new EquipmentService();

export async function createEquipment(req: Request, res: Response) {
  const auth = (req as any).auth;
  const data = CreateEquipmentSchema.parse(req.body);
  const eq = await service.createEquipment(auth.role, data);

  res.status(201).json(eq);
}

export async function listEquipment(req: Request, res: Response) {
  const data = await service.listEquipment(req.query.updatedAfter as string);
  res.json(data);
}
