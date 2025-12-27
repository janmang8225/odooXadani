export declare class RequestsService {
    createRequest(auth: any, payload: any): Promise<any>;
    assignRequest(auth: any, requestId: string, technicianId: string): Promise<any>;
    repairRequest(auth: any, requestId: string, durationHours: number): Promise<any>;
    scrapRequest(auth: any, requestId: string): Promise<void>;
}
//# sourceMappingURL=requests.service.d.ts.map