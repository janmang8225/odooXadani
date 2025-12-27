import type { PoolClient } from 'pg';
export declare class RequestsRepository {
    create(client: PoolClient, data: any): Promise<any>;
    findById(client: PoolClient, id: string): Promise<any>;
    update(client: PoolClient, id: string, fields: any): Promise<any>;
}
//# sourceMappingURL=requests.repository.d.ts.map