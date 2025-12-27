export class TeamsRepository {
    async createTeam(client, name) {
        const { rows } = await client.query(`
      INSERT INTO maintenance_teams (name)
      VALUES ($1)
      RETURNING id, name
      `, [name]);
        return rows[0];
    }
    async findById(client, teamId) {
        const { rows } = await client.query(`SELECT * FROM maintenance_teams WHERE id = $1`, [teamId]);
        return rows[0] || null;
    }
    async addMember(client, teamId, userId) {
        await client.query(`
      INSERT INTO team_members (team_id, user_id)
      VALUES ($1, $2)
      `, [teamId, userId]);
    }
    async removeMember(client, teamId, userId) {
        await client.query(`
      DELETE FROM team_members
      WHERE team_id = $1 AND user_id = $2
      `, [teamId, userId]);
    }
    async isMember(client, teamId, userId) {
        const { rows } = await client.query(`
      SELECT 1 FROM team_members
      WHERE team_id = $1 AND user_id = $2
      `, [teamId, userId]);
        return rows.length > 0;
    }
    async getTeamsByTechnician(client, userId) {
        const { rows } = await client.query(`
      SELECT t.*
      FROM maintenance_teams t
      JOIN team_members tm ON tm.team_id = t.id
      WHERE tm.user_id = $1
      `, [userId]);
        return rows;
    }
}
//# sourceMappingURL=teams.repository.js.map