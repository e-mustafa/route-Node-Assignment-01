import { Sequelize } from 'sequelize';
import { configEnv } from '../configs/env.js';

export const sequelize = new Sequelize(configEnv.db.database, configEnv.db.user, configEnv.db.password, {
	host: configEnv.db.host,
	dialect: 'mysql',
});

export const connectDB = async () => {
	try {
		await sequelize.authenticate();
		console.log('✔ Connection has been established successfully.');
	} catch (error) {
		console.error('❌ Unable to connect to the database:', error);
	}
};

export const syncDB = async (options = {}) => {
	try {
		const { default: associations } = await import('./models/associations.js');
		await associations();
		await sequelize.sync({ ...options });
		console.log('✔ Database synchronized successfully');
	} catch (error) {
		console.error('❌ Unable to connect to the database:', error);
	}
};
