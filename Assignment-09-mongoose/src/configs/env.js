import { configDotenv } from 'dotenv';

configDotenv();

export const configEnv = {
	port: process.env.APP_PORT || 4000,
	environment: process.env.ENVIRONMENT || 'development',
	db: {
		dbUrl: process.env.DATABASE_URL,
		dbName: process.env.DATABASE_Name,
	},
};

export const isDev = configEnv.environment == 'development';
