import { RequestsRepository } from './requests.repository.js';
import { EquipmentService } from '../equipment/equipment.service.js';
import { TeamsService } from '../team/teams.service.js';
import { withTransaction } from '../../database/transactions.js';
import { pool } from '../../config/database.js';
import {
  AppError,
  ForbiddenError,
  ValidationError
} from '../../types/errors.js';

const repo = new RequestsRepository();
const equipmentService = new EquipmentService();
const teamsService = new TeamsService();

const VALID_TRANSITIONS: Record<string, string[]> = {
  NEW: ['IN_PROGRESS', 'SCRAP'],
  IN_PROGRESS: ['REPAIRED', 'SCRAP'],
  REPAIRED: [],
  SCRAP: []
};

export class RequestsService {
  async createRequest(auth: any, payload: any) {
    if (
      payload.type === 'PREVENTIVE' &&
      auth.role !== 'MANAGER'
    ) {
      throw new ForbiddenError();
    }

    await equipmentService.assertEquipmentAvailable(payload.equipment_id);

    return withTransaction(async (client) => {
      const equipment = await equipmentService.getEquipmentById(
        payload.equipment_id
      );

      return repo.create(client, {
        subject: payload.subject,
        type: payload.type,
        equipment_id: payload.equipment_id,
        team_id: equipment.assigned_team_id,
        assigned_technician_id: equipment.default_technician_id,
        scheduled_date: payload.scheduled_date,
        status: 'NEW',
        created_by: auth.userId
      });
    });
  }

  async assignRequest(auth: any, requestId: string, technicianId: string) {
    return withTransaction(async (client) => {
      const req = await repo.findById(client, requestId);
      if (!req) {
        throw new AppError(404, 'REQUEST_NOT_FOUND', 'Request not found');
      }

      if (req.status !== 'NEW') {
        throw new ValidationError('Cannot assign at this stage');
      }

      if (auth.role === 'TECHNICIAN' && auth.userId !== technicianId) {
        throw new ForbiddenError();
      }

      await teamsService.assertTechnicianInTeam(
        technicianId,
        req.team_id
      );

      return repo.update(client, requestId, {
        assigned_technician_id: technicianId,
        status: 'IN_PROGRESS'
      });
    });
  }

  async repairRequest(auth: any, requestId: string, durationHours: number) {
    return withTransaction(async (client) => {
      const req = await repo.findById(client, requestId);
      if (!req) {
        throw new AppError(404, 'REQUEST_NOT_FOUND', 'Request not found');
      }

      if (req.status !== 'IN_PROGRESS') {
        throw new ValidationError('Invalid state');
      }

      if (req.assigned_technician_id !== auth.userId) {
        throw new ForbiddenError();
      }

      return repo.update(client, requestId, {
        status: 'REPAIRED',
        duration_hours: durationHours
      });
    });
  }

  async scrapRequest(auth: any, requestId: string) {
    if (!['MANAGER', 'ADMIN'].includes(auth.role)) {
      throw new ForbiddenError();
    }

    return withTransaction(async (client) => {
      const req = await repo.findById(client, requestId);
      if (!req) {
        throw new AppError(404, 'REQUEST_NOT_FOUND', 'Request not found');
      }

      const allowedTransitions = VALID_TRANSITIONS[req.status];

      if (!Array.isArray(allowedTransitions) || !allowedTransitions.includes('SCRAP')) {
        throw new ValidationError(
          `Cannot scrap request with status "${req.status}". Allowed transitions: ${allowedTransitions?.join(', ') || 'none'}`
        );
      }


      await repo.update(client, requestId, { status: 'SCRAP' });

      await client.query(
        `UPDATE equipment SET is_scrapped = true, updated_at = now()
         WHERE id = $1`,
        [req.equipment_id]
      );
    });
  }
}
