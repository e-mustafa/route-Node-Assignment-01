import { db } from '../../DB/connectionDB.js';

export const createCollectionService = async (collectionName) => {
	return await db.createCollection(collectionName, {
		validators: {
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
	if(!name || !nationality) throw new AppError(400, 'Please provide all required fields!');

	const existingAuthor = await db.collection('authors').findOne({ name });

	if (existingAuthor) throw new AppError(400, 'Author with this name already exists!');

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
