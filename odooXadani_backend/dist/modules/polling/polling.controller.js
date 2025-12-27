import { PollingService } from './polling.service.js';
import { UpdatedAfterSchema, PreventiveCalendarSchema } from '../../validators/polling.schema.js';
const service = new PollingService();
export async function pollTeam(req, res) {
    const auth = req.auth;
    const teamId = req.params.teamId;
    // const updatedAfter = req.query.updatedAfter;
    const updatedAfter = UpdatedAfterSchema.parse(req.query);
    if (!teamId || typeof teamId !== 'string') {
        return res.status(400).json({ error: 'Invalid or missing teamId parameter' });
    }
    if (!updatedAfter || typeof updatedAfter !== 'string') {
        return res.status(400).json({ error: 'Invalid or missing updatedAfter query parameter' });
    }
    const result = await service.pollTeamRequests(auth, teamId, updatedAfter);
    res.json(result);
}
//# sourceMappingURL=polling.controller.js.map