import type { Request, Response } from 'express';
export declare function createRequest(req: Request, res: Response): Promise<void>;
export declare function assignRequest(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
export declare function repairRequest(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
export declare function scrapRequest(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
//# sourceMappingURL=requests.controller.d.ts.map