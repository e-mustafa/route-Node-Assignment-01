import mysql from 'mysql2/promise';

export async function connectDB(config = {}) {
	try {
		const connection = await mysql.createConnection({
			host: 'localhost',
			user: 'root',
			password: '',
			// multipleStatements: true, // Enable to execute multiple queries in one go
			...config,
		});
		console.log('✔ 📞 Database connected successfully');
		return connection;
	} catch (error) {
		console.error('❌ Error connecting database:', error);
		throw error;
	}
}

export async function createDB(connection, dbName = 'retail_store') {
	try {
		await connection.execute(`CREATE DATABASE IF NOT EXISTS ${dbName}`);
		console.log('✔ database created successfully');

		await connection.query(`USE ${dbName}`);
		console.log(`✔ Using database`);
	} catch (error) {
		console.log('❌ Error creating database:', error);
		throw error;
	}
}

// helper functions
export async function runStep(connection, query, message, params = []) {
	try {
		const result = await connection.execute(query, params);
		if (message) console.log(`✔ ${message}`);
		return result;
	} catch (error) {
		console.error(`❌ Error in: ${message}\n`, error.message);
		throw error;
	}
}
