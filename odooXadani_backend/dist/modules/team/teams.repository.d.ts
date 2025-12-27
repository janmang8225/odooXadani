import type { PoolClient } from 'pg';
export declare class TeamsRepository {
    createTeam(client: PoolClient, name: string): Promise<any>;
    findById(client: PoolClient, teamId: string): Promise<any>;
    addMember(client: PoolClient, teamId: string, userId: string): Promise<void>;
    removeMember(client: PoolClient, teamId: string, userId: string): Promise<void>;
    isMember(client: PoolClient, teamId: string, userId: string): Promise<boolean>;
    getTeamsByTechnician(client: PoolClient, userId: string): Promise<any[]>;
}
//# sourceMappingURL=teams.repository.d.ts.map