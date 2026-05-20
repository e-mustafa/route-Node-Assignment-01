// import { MongoClient } from 'mongoose';
import { MongoClient } from 'mongodb';
import { configEnv } from '../configs/env.js';

const client = new MongoClient(configEnv.db.dbUrl, {
	// serverApi: {
	// 	version: ServerApiVersion.v1,
	// 	strict: true,
	// 	deprecationErrors: true,
	// },
});

export const db = client.db(configEnv.db.database);

export const connectDB = async () => {
	try {
		await client.connect();
		console.log('✔ Connected to MongoDB successfully!');
	} catch (error) {
		console.error('Error connecting to MongoDB:', error);
	}
};
