export class EquipmentRepository {
    async create(client, data) {
        const { rows } = await client.query(`
      INSERT INTO equipment (
        name, serial_number, purchase_date, warranty_end_date,
        location, assigned_team_id, default_technician_id
      )
      VALUES ($1,$2,$3,$4,$5,$6,$7)
      RETURNING *
      `, [
            data.name,
            data.serial_number,
            data.purchase_date,
            data.warranty_end_date,
            data.location,
            data.assigned_team_id,
            data.default_technician_id
        ]);
        return rows[0];
    }
    async findById(client, id) {
        const { rows } = await client.query(`SELECT * FROM equipment WHERE id = $1`, [id]);
        return rows[0] || null;
    }
    async update(client, id, fields) {
        const keys = Object.keys(fields);
        const values = Object.values(fields);
        const sets = keys.map((k, i) => `${k} = $${i + 2}`).join(', ');
        const { rows } = await client.query(`
      UPDATE equipment
      SET ${sets}, updated_at = now()
      WHERE id = $1
      RETURNING *
      `, [id, ...values]);
        return rows[0];
    }
    async list(client, updatedAfter) {
        const { rows } = await client.query(`
      SELECT *
      FROM equipment
      WHERE ($1::timestamp IS NULL OR updated_at > $1)
      ORDER BY updated_at ASC
      `, [updatedAfter ?? null]);
        return rows;
    }
}
//# sourceMappingURL=equipment.repository.js.map