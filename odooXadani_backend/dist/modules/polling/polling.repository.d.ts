import type { PoolClient } from 'pg';
export declare class PollingRepository {
    teamRequests(client: PoolClient, teamId: string, updatedAfter?: string): Promise<any[]>;
    technicianRequests(client: PoolClient, technicianId: string, updatedAfter?: string): Promise<any[]>;
    equipmentOpenCount(client: PoolClient, equipmentId: string): Promise<any>;
    preventiveCalendar(client: PoolClient, from: string, to: string, updatedAfter?: string): Promise<any[]>;
}
//# sourceMappingURL=polling.repository.d.ts.map