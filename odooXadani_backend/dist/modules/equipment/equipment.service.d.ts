export declare class EquipmentService {
    createEquipment(actorRole: string, payload: any): Promise<any>;
    updateEquipment(actorRole: string, equipmentId: string, payload: any): Promise<any>;
    getEquipmentById(id: string): Promise<any>;
    listEquipment(updatedAfter?: string): Promise<any[]>;
    assertEquipmentAvailable(equipmentId: string): Promise<void>;
}
//# sourceMappingURL=equipment.service.d.ts.map