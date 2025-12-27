import { EquipmentRepository } from './equipment.repository.js';
import { TeamsRepository } from '../team/teams.repository.js';
import { UsersRepository } from '../users/users.repository.js';
import { withTransaction } from '../../database/transactions.js';
import { pool } from '../../config/database.js';
import { AppError, ForbiddenError, ValidationError } from '../../types/errors.js';
const repo = new EquipmentRepository();
const teamsRepo = new TeamsRepository();
const usersRepo = new UsersRepository();
export class EquipmentService {
    async createEquipment(actorRole, payload) {
        if (actorRole !== 'ADMIN') {
            throw new ForbiddenError();
        }
        return withTransaction(async (client) => {
            const team = await teamsRepo.findById(client, payload.assigned_team_id);
            if (!team) {
                throw new ValidationError('Invalid team');
            }
            if (payload.default_technician_id) {
                const tech = await usersRepo.findById(client, payload.default_technician_id);
                if (!tech || tech.role !== 'TECHNICIAN') {
                    throw new ValidationError('Invalid technician');
                }
            }
            return repo.create(client, payload);
        });
    }
    async updateEquipment(actorRole, equipmentId, payload) {
        if (actorRole !== 'ADMIN') {
            throw new ForbiddenError();
        }
        return withTransaction(async (client) => {
            const eq = await repo.findById(client, equipmentId);
            if (!eq) {
                throw new AppError(404, 'EQUIPMENT_NOT_FOUND', 'Equipment not found');
            }
            if (eq.is_scrapped) {
                throw new AppError(409, 'SCRAPPED', 'Equipment is scrapped');
            }
            return repo.update(client, equipmentId, payload);
        });
    }
    async getEquipmentById(id) {
        const client = await pool.connect();
        try {
            const eq = await repo.findById(client, id);
            if (!eq) {
                throw new AppError(404, 'EQUIPMENT_NOT_FOUND', 'Equipment not found');
            }
            return eq;
        }
        finally {
            client.release();
        }
    }
    async listEquipment(updatedAfter) {
        const client = await pool.connect();
        try {
            return await repo.list(client, updatedAfter);
        }
        finally {
            client.release();
        }
    }
    async assertEquipmentAvailable(equipmentId) {
        const client = await pool.connect();
        try {
            const eq = await repo.findById(client, equipmentId);
            if (!eq) {
                throw new AppError(404, 'EQUIPMENT_NOT_FOUND', 'Equipment not found');
            }
            if (eq.is_scrapped) {
                throw new AppError(409, 'SCRAPPED', 'Equipment is scrapped');
            }
        }
        finally {
            client.release();
        }
    }
}
//# sourceMappingURL=equipment.service.js.map