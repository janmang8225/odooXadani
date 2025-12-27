export declare class TeamsService {
    createTeam(actorRole: string, name: string): Promise<any>;
    addTechnician(actorRole: string, teamId: string, technicianId: string): Promise<void>;
    removeTechnician(actorRole: string, teamId: string, technicianId: string): Promise<void>;
    getTeamsForTechnician(technicianId: string): Promise<any[]>;
    assertTechnicianInTeam(technicianId: string, teamId: string): Promise<void>;
}
//# sourceMappingURL=teams.service.d.ts.map