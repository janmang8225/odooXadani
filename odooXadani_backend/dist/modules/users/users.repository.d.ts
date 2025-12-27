import type { PoolClient } from 'pg';
export declare class UsersRepository {
    findByEmail(client: PoolClient, email: string): Promise<any>;
    findById(client: PoolClient, id: string): Promise<any>;
    create(client: PoolClient, data: {
        email: string;
        passwordHash: string;
        role: string;
    }): Promise<any>;
    deactivate(client: PoolClient, userId: string): Promise<void>;
    updatePassword(client: PoolClient, userId: string, passwordHash: string): Promise<void>;
}
//# sourceMappingURL=users.repository.d.ts.map