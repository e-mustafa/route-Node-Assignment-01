import { ObjectId } from 'mongodb';
import { db } from '../../DB/connectionDB.js';

export const createLogService = async ({ book_id, action, message, level, timestamp }) => {
	const data = await db.collection('logs').insertOne(
		{ book_id: new ObjectId(book_id), action, message, level, timestamp }
	);
	return data;
};
