import express from 'express';
import { errorMiddleware } from './middlewares/error.middleware.js';
import { authenticate } from './middlewares/auth.middleware.js';

import * as Auth from './modules/auth/auth.controller.js';
import * as Users from './modules/users/users.controller.js';
import * as Teams from './modules/team/teams.controller.js';
import * as Equipment from './modules/equipment/equipment.controller.js';
import * as Requests from './modules/requests/requests.controller.js';
import * as Polling from './modules/polling/polling.controller.js';

export const app = express();
app.use(express.json());

// routes
app.post('/api/v1/auth/login', Auth.login);

app.use(authenticate);

app.post('/api/v1/users', Users.createUser);
app.patch('/api/v1/users/me/password', Users.changePassword);

app.post('/api/v1/teams', Teams.createTeam);
app.post('/api/v1/teams/:id/members', Teams.addTechnician);

app.post('/api/v1/equipment', Equipment.createEquipment);
app.get('/api/v1/equipment', Equipment.listEquipment);

app.post('/api/v1/requests', Requests.createRequest);
app.post('/api/v1/requests/:id/assign', Requests.assignRequest);
app.post('/api/v1/requests/:id/repair', Requests.repairRequest);
app.post('/api/v1/requests/:id/scrap', Requests.scrapRequest);

app.get('/api/v1/polling/teams/:teamId/requests', Polling.pollTeam);


app.use(errorMiddleware);
