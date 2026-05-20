import { db } from '../../DB/connectionDB.js';

export const createCollectionService = async (collectionName) => {
	return await db.createCollection(collectionName, {
		validator: {
			$jsonSchema: {
				bsonType: 'object',
				required: ['title'],
				properties: {
					title: {
						bsonType: 'string',
						minLength: 2,
						description: 'Title must be a string and at least 2 characters long and is required',
					},
				},
			},
		},
	});
};

export const createAuthorService = async ({ name, nationality }) => {
	const data = await db.collection('authors').insertOne({ name, nationality });

	return data;
};

export const createLogsCappedService = async (collectionName) => {
	return await db.createCollection(collectionName, {
		capped: true,
		size: 1048576, // 1MB = 1024 * 1024 bytes
	});
};

export const createBooksIndexService = async (collectionName) => {
	return await db.collection(collectionName).createIndex({ title: 1 });
};
