import { EquipmentService } from './equipment.service.js';
import { CreateEquipmentSchema, UpdateEquipmentSchema } from '../../validators/equipment.schema.js';
const service = new EquipmentService();
export async function createEquipment(req, res) {
    const auth = req.auth;
    const data = CreateEquipmentSchema.parse(req.body);
    const eq = await service.createEquipment(auth.role, data);
    res.status(201).json(eq);
}
export async function listEquipment(req, res) {
    const data = await service.listEquipment(req.query.updatedAfter);
    res.json(data);
}
//# sourceMappingURL=equipment.controller.js.map