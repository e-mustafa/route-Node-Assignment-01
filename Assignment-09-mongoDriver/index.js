import express from 'express';
import { bootstrap } from './src/bootstrap.js';
import { configEnv } from './src/configs/env.js';

const app = express();

const PORT = configEnv.port;

await bootstrap(app, express);

// Handle synchronous uncaught exceptions (e.g., using an undefined variable)
process.on('uncaughtException', (err) => {
	console.error('UNCAUGHT EXCEPTION! 💥 Shutting down...');
	console.error(err.name, err.message, err.stack);
	process.exit(1);
});

// Your server initialization code (e.g., app.listen...)
app.listen(PORT, () => console.log(`✔ Server is running on port ${PORT}`));

// Handle asynchronous unhandled rejections (e.g., DB connection failure)
process.on('unhandledRejection', (err) => {
	console.error('UNHANDLED REJECTION! 💥 Shutting down gracefully...');
	console.error(err.name, err.message);
	server.close(() => {
		process.exit(1);
	});
});


//! 👈🏻👈🏻👈🏻👈🏻 <-- postman collection
// https://documenter.getpostman.com/view/49016393/2sBXwjuYuG

//! 👈🏻👈🏻👈🏻👈🏻 <-- Github link
// https://github.com/e-mustafa/route-Node-Assignments/tree/main/Assignment-09-mongoDriver
