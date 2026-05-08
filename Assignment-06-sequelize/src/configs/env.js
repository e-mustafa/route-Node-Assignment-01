import dotenv from 'dotenv';
dotenv.config();

export const configEnv = {
	db: {
		password: process.env.DB_PASSWORD,
		host: process.env.DB_HOST || 'localhost',
		user: process.env.DB_USER || 'root',
		database: process.env.DB_DATABASE || 'blog_app',
	},
	port: process.env.PORT || 3000,
	environment: process.env.ENVIRONMENT || 'development',
};

export const isDev = configEnv.environment === 'development';