import { TeamsRepository } from './teams.repository.js';
import { UsersRepository } from '../users/users.repository.js';
import { withTransaction } from '../../database/transactions.js';
import {
  AppError,
  ForbiddenError,
  ValidationError
} from '../../types/errors.js';
import { pool } from '../../config/database.js';

const teamsRepo = new TeamsRepository();
const usersRepo = new UsersRepository();

export class TeamsService {
  async createTeam(actorRole: string, name: string) {
    if (actorRole !== 'ADMIN') {
      throw new ForbiddenError();
    }

    return withTransaction(async (client) => {
      return teamsRepo.createTeam(client, name);
    });
  }

  async addTechnician(
    actorRole: string,
    teamId: string,
    technicianId: string
  ) {
    if (actorRole !== 'ADMIN') {
      throw new ForbiddenError();
    }

    return withTransaction(async (client) => {
      const team = await teamsRepo.findById(client, teamId);
      if (!team) {
        throw new AppError(404, 'TEAM_NOT_FOUND', 'Team not found');
      }

      const user = await usersRepo.findById(client, technicianId);
      if (!user || user.role !== 'TECHNICIAN') {
        throw new ValidationError('User is not a technician');
      }

      if (!user.is_active) {
        throw new ValidationError('Technician is inactive');
      }

      const exists = await teamsRepo.isMember(client, teamId, technicianId);
      if (exists) {
        throw new AppError(409, 'ALREADY_MEMBER', 'Already in team');
      }

      await teamsRepo.addMember(client, teamId, technicianId);
    });
  }

  async removeTechnician(
    actorRole: string,
    teamId: string,
    technicianId: string
  ) {
    if (actorRole !== 'ADMIN') {
      throw new ForbiddenError();
    }

    return withTransaction(async (client) => {
      await teamsRepo.removeMember(client, teamId, technicianId);
    });
  }

  async getTeamsForTechnician(technicianId: string) {
    const client = await pool.connect();
    try {
      return await teamsRepo.getTeamsByTechnician(client, technicianId);
    } finally {
      client.release();
    }
  }

  async assertTechnicianInTeam(
    technicianId: string,
    teamId: string
  ) {
    const client = await pool.connect();
    try {
      const ok = await teamsRepo.isMember(client, teamId, technicianId);
      if (!ok) {
        throw new ForbiddenError('Technician not in team');
      }
    } finally {
      client.release();
    }
  }
}
