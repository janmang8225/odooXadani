import type{ PoolClient } from 'pg';

export class PollingRepository {
  async teamRequests(
    client: PoolClient,
    teamId: string,
    updatedAfter?: string
  ) {
    const { rows } = await client.query(
      `
      SELECT *
      FROM maintenance_requests
      WHERE team_id = $1
        AND ($2::timestamp IS NULL OR updated_at > $2)
      ORDER BY updated_at ASC
      `,
      [teamId, updatedAfter ?? null]
    );
    return rows;
  }

  async technicianRequests(
    client: PoolClient,
    technicianId: string,
    updatedAfter?: string
  ) {
    const { rows } = await client.query(
      `
      SELECT *
      FROM maintenance_requests
      WHERE assigned_technician_id = $1
        AND ($2::timestamp IS NULL OR updated_at > $2)
      ORDER BY updated_at ASC
      `,
      [technicianId, updatedAfter ?? null]
    );
    return rows;
  }

  async equipmentOpenCount(client: PoolClient, equipmentId: string) {
    const { rows } = await client.query(
      `
      SELECT COUNT(*)::int AS count
      FROM maintenance_requests
      WHERE equipment_id = $1
        AND status IN ('NEW', 'IN_PROGRESS')
      `,
      [equipmentId]
    );
    return rows[0].count;
  }

  async preventiveCalendar(
    client: PoolClient,
    from: string,
    to: string,
    updatedAfter?: string
  ) {
    const { rows } = await client.query(
      `
      SELECT *
      FROM maintenance_requests
      WHERE type = 'PREVENTIVE'
        AND scheduled_date BETWEEN $1 AND $2
        AND ($3::timestamp IS NULL OR updated_at > $3)
      ORDER BY scheduled_date ASC
      `,
      [from, to, updatedAfter ?? null]
    );
    return rows;
  }
}
