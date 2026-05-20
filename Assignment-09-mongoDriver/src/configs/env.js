import dotenv from 'dotenv';

dotenv.config();

export const configEnv = {
	db: {
		dbUrl: process.env.MONGO_URL,
		database: process.env.DB_NAME,
	},
	port: process.env.PORT || 4000,
	environment: process.env.ENVIRONMENT || 'development',
};

export const isDev = configEnv.environment === 'development';

