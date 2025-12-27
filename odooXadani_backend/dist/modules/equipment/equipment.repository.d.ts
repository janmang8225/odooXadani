import type { PoolClient } from 'pg';
export declare class EquipmentRepository {
    create(client: PoolClient, data: any): Promise<any>;
    findById(client: PoolClient, id: string): Promise<any>;
    update(client: PoolClient, id: string, fields: any): Promise<any>;
    list(client: PoolClient, updatedAfter?: string): Promise<any[]>;
}
//# sourceMappingURL=equipment.repository.d.ts.map