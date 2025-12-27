export declare class UsersService {
    createUser(actorRole: string, payload: {
        email: string;
        password: string;
        role: string;
    }): Promise<any>;
    getUserById(userId: string): Promise<any>;
    changePassword(userId: string, currentPassword: string, newPassword: string): Promise<void>;
    deactivateUser(actorId: string, actorRole: string, targetUserId: string): Promise<void>;
}
//# sourceMappingURL=users.service.d.ts.map