import express from 'express';
import { bootstrap } from './src/bootstrap.js';
import { configEnv } from './src/configs/env.js';

const app = express();

const PORT = configEnv.port;

await bootstrap(app, express);

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
