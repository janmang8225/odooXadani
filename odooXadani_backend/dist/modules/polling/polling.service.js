import { pool } from '../../config/database.js';
import { PollingRepository } from './polling.repository.js';
import { TeamsService } from '../team/teams.service.js';
import { ForbiddenError } from '../../types/errors.js';
const repo = new PollingRepository();
const teamsService = new TeamsService();
export class PollingService {
    async pollTeamRequests(auth, teamId, updatedAfter) {
        if (!['TECHNICIAN', 'MANAGER', 'ADMIN'].includes(auth.role)) {
            throw new ForbiddenError();
        }
        if (auth.role === 'TECHNICIAN') {
            await teamsService.assertTechnicianInTeam(auth.userId, teamId);
        }
        const client = await pool.connect();
        try {
            return {
                data: await repo.teamRequests(client, teamId, updatedAfter),
                serverTime: new Date().toISOString()
            };
        }
        finally {
            client.release();
        }
    }
    async pollTechnicianRequests(auth, technicianId, updatedAfter) {
        if (auth.role !== 'TECHNICIAN' || auth.userId !== technicianId) {
            throw new ForbiddenError();
        }
        const client = await pool.connect();
        try {
            return {
                data: await repo.technicianRequests(client, technicianId, updatedAfter),
                serverTime: new Date().toISOString()
            };
        }
        finally {
            client.release();
        }
    }
    async pollEquipmentOpenCount(auth, equipmentId) {
        const client = await pool.connect();
        try {
            return {
                count: await repo.equipmentOpenCount(client, equipmentId)
            };
        }
        finally {
            client.release();
        }
    }
    async pollPreventiveCalendar(auth, from, to, updatedAfter) {
        if (!['TECHNICIAN', 'MANAGER', 'ADMIN'].includes(auth.role)) {
            throw new ForbiddenError();
        }
        const client = await pool.connect();
        try {
            return {
                data: await repo.preventiveCalendar(client, from, to, updatedAfter),
                serverTime: new Date().toISOString()
            };
        }
        finally {
            client.release();
        }
    }
}
//# sourceMappingURL=polling.service.js.map