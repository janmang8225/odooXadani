export declare class PollingService {
    pollTeamRequests(auth: any, teamId: string, updatedAfter?: string): Promise<{
        data: any[];
        serverTime: string;
    }>;
    pollTechnicianRequests(auth: any, technicianId: string, updatedAfter?: string): Promise<{
        data: any[];
        serverTime: string;
    }>;
    pollEquipmentOpenCount(auth: any, equipmentId: string): Promise<{
        count: any;
    }>;
    pollPreventiveCalendar(auth: any, from: string, to: string, updatedAfter?: string): Promise<{
        data: any[];
        serverTime: string;
    }>;
}
//# sourceMappingURL=polling.service.d.ts.map