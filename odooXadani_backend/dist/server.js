import { app } from './app.js';
import { env } from './config/env.js';
import { pool } from './config/database.js';
async function start() {
    await pool.query('SELECT 1'); // check: db active or not :)
    app.listen(Number(env.PORT), () => {
        console.log(`Server running on port ${env.PORT}`);
    });
}
start().catch((err) => {
    console.error('Startup failed', err);
    process.exit(1);
});
//# sourceMappingURL=server.js.map