import { RequestsService } from './requests.service.js';
import { CreateRequestSchema, AssignRequestSchema, RepairRequestSchema } from '../../validators/requests.schema.js';
const service = new RequestsService();
export async function createRequest(req, res) {
    const auth = req.auth;
    const data = CreateRequestSchema.parse(req.body);
    const result = await service.createRequest(auth, data);
    res.status(201).json(result);
}
export async function assignRequest(req, res) {
    const auth = req.auth;
    const id = req.params.id;
    const technicianId = req.body.technicianId;
    if (!id || typeof id !== 'string') {
        return res.status(400).json({ error: 'Invalid or missing id parameter' });
    }
    if (!technicianId || typeof technicianId !== 'string') {
        return res.status(400).json({ error: 'Invalid or missing technicianId' });
    }
    const assign = AssignRequestSchema.parse(req.body);
    const result = await service.assignRequest(auth, id, assign.technicianId);
    res.json(result);
}
export async function repairRequest(req, res) {
    const auth = req.auth;
    const id = req.params.id;
    const durationHours = req.body.durationHours;
    if (!id || typeof id !== 'string') {
        return res.status(400).json({ error: 'Invalid or missing id parameter' });
    }
    if (durationHours == null || typeof durationHours !== 'number') {
        return res.status(400).json({ error: 'Invalid or missing durationHours' });
    }
    const repair = RepairRequestSchema.parse(req.body);
    const result = await service.repairRequest(auth, id, repair.durationHours);
    res.json(result);
}
export async function scrapRequest(req, res) {
    const auth = req.auth;
    const id = req.params.id;
    if (!id || typeof id !== 'string') {
        return res.status(400).json({ error: 'Invalid or missing id parameter' });
    }
    await service.scrapRequest(auth, id);
    res.status(204).send();
}
//# sourceMappingURL=requests.controller.js.map