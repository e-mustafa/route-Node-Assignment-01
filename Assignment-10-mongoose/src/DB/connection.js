import { connect } from 'mongoose';
import { configEnv } from '../configs/env.js';

export async function ConnectDB() {
	try {
		await connect(configEnv.db.dbUrl);
		console.log('✔ Connected to Database successfully!');
	} catch (error) {
		console.error('Error connecting to Database:', error);
	}
}
