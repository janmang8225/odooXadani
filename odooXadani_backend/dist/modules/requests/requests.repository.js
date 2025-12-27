export class RequestsRepository {
    async create(client, data) {
        const { rows } = await client.query(`
      INSERT INTO maintenance_requests (
        subject, type, equipment_id, team_id,
        assigned_technician_id, scheduled_date,
        status, created_by
      )
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
      RETURNING *
      `, [
            data.subject,
            data.type,
            data.equipment_id,
            data.team_id,
            data.assigned_technician_id,
            data.scheduled_date,
            data.status,
            data.created_by
        ]);
        return rows[0];
    }
    async findById(client, id) {
        const { rows } = await client.query(`SELECT * FROM maintenance_requests WHERE id = $1`, [id]);
        return rows[0] || null;
    }
    async update(client, id, fields) {
        const keys = Object.keys(fields);
        const values = Object.values(fields);
        const sets = keys.map((k, i) => `${k} = $${i + 2}`).join(', ');
        const { rows } = await client.query(`
      UPDATE maintenance_requests
      SET ${sets}, updated_at = now()
      WHERE id = $1
      RETURNING *
      `, [id, ...values]);
        return rows[0];
    }
}
//# sourceMappingURL=requests.repository.js.map