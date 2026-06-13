import express from 'express';
import bootstrap from './src/bootstrap.js';
import { configEnv } from './src/configs/env.js';

const app = express();
const port = configEnv.port;

await bootstrap(app, express);

// Handle synchronous uncaught exceptions (e.g., using an undefined variable)
process.on('uncaughtException', (err) => {
	console.error('UNCAUGHT EXCEPTION! 💥 Shutting down...');
	console.error(err.name, err.message, err.stack);
	process.exit(1);
});

app.listen(port, () => console.log(`✔ App listening on port ${port}`));

// Handle asynchronous unhandled rejections (e.g., DB connection failure)
process.on('unhandledRejection', (err) => {
	console.error('UNHANDLED REJECTION! 💥 Shutting down gracefully...');
	console.error(err.name, err.message);
	server.close(() => {
		process.exit(1);
	});
});