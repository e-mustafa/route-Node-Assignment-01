import { Types } from 'mongoose';
import Note from '../../DB/models/note.model.js';
import User from '../../DB/models/user.model.js';
import { getDataWithPagination } from '../../utils/queries/get-data-with pagination.js';
import { throwException } from '../../utils/response/throw.exceptions.js';

export async function createNoteService({ userId, title, content }) {
	if (!userId || !title || !content) {
		// throw new  AppError(400, 'Please provide note information, userId, title and content');
		throwException(400, 'Please provide note information, userId, title and content');
	}

	const user = await User.findById(userId);
	if (!user) {
		throwException(404, 'userId wrong!, No user not found for this userId');
	}

	return await Note.create({ userId, title, content });
}

export async function updateNoteService(id, { userId, title, content }) {
	if (!id) {
		throwException(400, 'Please provide note id');
	}

	if (!userId || !title || !content) {
		throwException(400, 'Please provide note information, userId, title and content');
	}

	const note = await Note.findById(id);
	if (!note) {
		throwException(404, 'Note not found!');
	}

	const user = await User.findById(userId);
	if (!user) {
		throwException(404, 'Wrong userId, user not found');
	}

	if (userId != note.userId) {
		throwException(403, 'You are not the owner!');
	}

	const newNote = await Note.findByIdAndUpdate(
		id,
		{ title, content },
		{ runValidators: true, returnDocument: 'after' },
	).select('-__v');
	if (!newNote) {
		throwException(404, 'Note not found!');
	}

	return newNote;
}

export async function replaceNoteService(id, { userId, title, content }) {
	if (!id) {
		throwException(400, 'Please provide note id');
	}

	if (!userId || !title || !content) {
		throwException(400, 'Please provide note information, userId, title and content');
	}

	const note = await Note.findById(id);
	if (!note) {
		throwException(404, 'Note not found!');
	}

	const user = await User.findById(userId);
	if (!user) {
		throwException(404, 'Wrong userId, user not found');
	}

	if (userId != note.userId) {
		throwException(403, 'You are not the owner!');
	}

	const newNote = await Note.findOneAndReplace(
		{ _id: id },
		{ userId, title, content },
		{ runValidators: true, returnDocument: 'after' },
	);

	if (!newNote) {
		throwException(404, 'Note not found!');
	}

	return newNote;
}

export async function updateAllNotesService({ userId, title }) {
	if (!userId || !title) {
		throwException(400, 'Please provide note information, userId, title');
	}

	const user = await User.findById(userId);
	if (!user) {
		throwException(404, 'Wrong userId, user not found');
	}

	const notes = await Note.find({ userId });
	if (!notes) {
		throwException(404, 'No Note found!');
	}

	if (userId != notes[0]?.userId) {
		throwException(403, 'You are not the owner!');
	}

	const newNotes = await Note.updateMany({ userId }, { title });
	if (!newNotes.matchedCount) {
		throwException(404, 'Note not found!');
	}

	return newNotes;
}

export async function deleteNoteService(id, userId) {
	if (!id) {
		throwException(400, 'Please provide note id');
	}

	if (!userId) {
		throwException(400, 'Please provide note information, userId');
	}

	console.log('id', id);

	const note = await Note.findById(id);
	if (!note) {
		throwException(404, 'Note not found!');
	}

	const user = await User.findById(userId);
	if (!user) {
		throwException(404, 'Wrong userId, user not found');
	}

	if (userId != note?.userId) {
		throwException(403, 'You are not the owner!');
	}

	// const deleted = await User.findByIdAndDelete(id);
	const deleted = await Note.findOneAndDelete({ _id: id, userId }).select('-__v');
	if (!deleted) {
		throwException(404, 'Note not found!');
	}

	return deleted;
}

// export async function getNotesService(userId, { page = 1, limit = 10 }) {
// 	if (!userId) {
// 		throwException(400, 'Please provide note information, userId');
// 	}

// 	const user = await User.findById(userId);
// 	if (!user) {
// 		throwException(404, 'Wrong userId, user not found');
// 	}

// 	const notes = await Note.find({ userId }, '-__v', { includeResultMetadata: true })
// 		.limit(limit)
// 		.skip(limit * (page - 1))
// 		.sort('-createdAt').countDocuments();
// 	// .select('-__v'); // get data without version
// 	console.log('notes', notes);
// 	return notes;
// }

// export async function getPaginatedNotesService({ userId, page = 1, limit = 10, search = '' }) {
// 	// 1. Parse and validate inputs to ensure they are safe numbers (>= 1)
// 	const parsedPage = Math.max(1, parseInt(page) || 1);
// 	const parsedLimit = Math.max(1, parseInt(limit) || 10);

// 	// Calculate the number of documents to skip
// 	const skip = (parsedPage - 1) * parsedLimit;

// 	// 2. Build the database query object dynamically
// 	const query = { userId };

// 	// If a search term is provided, add a case-insensitive partial match filter on the title
// 	if (search) {
// 		query.title = {
// 			$regex: search, // Use Regular Expression for partial matching
// 			$options: 'i', // 'i' flag makes the search case-insensitive
// 		};
// 	}

// 	// 3. Execute both queries concurrently to optimize performance (saves a database round-trip)
// 	const [notes, totalItems] = await Promise.all([
// 		Note.find(query)
// 			.select('-__v') // Exclude the version key automatically
// 			.sort('-createdAt') // Sort from newest to oldest
// 			.skip(skip) // Skip documents for previous pages
// 			.limit(parsedLimit), // Restrict the results to the limit size

// 		Note.countDocuments(query), // Get total count of documents matching the search criteria
// 	]);

// 	// 4. Calculate total number of available pages
// 	const totalPages = Math.ceil(totalItems / parsedLimit);

// 	// 5. Return the result combined with helpful metadata for the frontend
// 	return {
// 		metadata: {
// 			totalItems,
// 			totalPages,
// 			currentPage: parsedPage,
// 			limit: parsedLimit,
// 			hasNextPage: parsedPage < totalPages,
// 			hasPrevPage: parsedPage > 1,
// 		},
// 		notes,
// 	};
// }

export async function getPaginatedNotesService({ userId, page = 1, limit = 10, search = '' }) {
	if (!userId) {
		throwException(400, 'Please provide note information, userId');
	}

	const user = await User.findById(userId);
	if (!user) {
		throwException(404, 'Wrong userId, user not found');
	}

	const data = await getDataWithPagination({
		Model: Note,
		initQuery: { userId },
		page,
		limit,
		search,
	});

	return data;
}

export async function getNoteService(id, userId) {
	if (!id) {
		throwException(400, 'Please provide note id');
	}

	if (!userId) {
		throwException(400, 'Please provide note information, userId.');
	}

	const note = await Note.findById(id);
	if (!note) {
		throwException(404, 'Note not found!');
	}

	const user = await User.findById(userId);
	if (!user) {
		throwException(404, 'Wrong userId, user not found');
	}

	if (userId != note.userId) {
		throwException(403, 'You are not the owner!');
	}

	return note;
}

// export async function getNoteByContentService(content, userId) {
// 	if (!content) {
// 		throwException(400, 'Please provide note content');
// 	}
// 	console.log('content, userId', content, userId);

// 	if (!userId) {
// 		throwException(400, 'Please provide note information, userId.');
// 	}

// 	const note = await Note.findOne({
// 		content: {
// 			$regex: content, // Use Regular Expression for partial matching
// 			$options: 'i', // 'i' flag makes the search case-insensitive
// 		},
// 	});

// 	if (!note) {
// 		// throwException(404, 'No result!');
// 		return note;
// 	}

// 	const user = await User.findById(userId);
// 	if (!user) {
// 		throwException(404, 'Wrong userId, user not found');
// 	}

// 	if (userId != note.userId) {
// 		throwException(403, 'You are not the owner!');
// 	}

// 	return note;
// }

export async function getNoteByContentService(content, userId) {
	if (!content) {
		throwException(400, 'Please provide note content');
	}
	console.log('content, userId', content, userId);

	if (!userId) {
		throwException(400, 'Please provide note information, userId.');
	}

	const user = await User.findById(userId);
	if (!user) {
		throwException(404, 'Wrong userId, user not found');
	}

	const note = await Note.findOne({
		content: {
			$regex: content, // Use Regular Expression for partial matching
			$options: 'i', // 'i' flag makes the search case-insensitive
		},
		userId,
	});

	return note;
}

export async function getNotesAndUserService(userId) {
	if (!userId) {
		throwException(400, 'Please provide note information, userId.');
	}

	const user = await User.findById(userId);
	if (!user) {
		throwException(404, 'Wrong userId, user not found');
	}

	const notes = await Note.find({ userId })
		.select('title userId createdAt')
		// .populate('userId', 'email -_id')
		.populate({ path: 'userId', select: 'email -_id' })
		.exec();

	return notes;
}

export async function getNotesAndUserAggregateService(userId, title = '') {
	if (!userId) {
		throwException(400, 'Please provide note information, userId.');
	}

	const user = await User.findById(userId);
	if (!user) {
		throwException(404, 'Wrong userId, user not found');
	}

	const notes = await Note.aggregate([
		// Stage 1: Filter notes by userId and case-insensitive title search
		{
			$match: {
				userId: new Types.ObjectId(userId),
				title: { $regex: title, $options: 'i' },
			},
		},
		// Stage 2: Join with 'users' collection (Note the pluralized lowercase 'users')
		{
			$lookup: {
				from: 'users',
				localField: 'userId',
				foreignField: '_id',
				as: 'user',
			},
		},
		// Stage 3: Flatten the 'user' array into a single object since it's a 1-to-1 relationship
		{
			$unwind: '$user',
		},
		// Stage 4: Project and clean the final output fields
		{
			$project: {
				_id: 1,
				title: 1,
				content: 1,
				createdAt: 1,
				// updatedAt: 1,

				'user.name': 1,
				'user.email': 1,
			},
		},
	]);

	return notes;
}

export async function deleteUserNotesService(userId) {
	if (!userId) {
		throwException(400, 'Please provide note information, userId.');
	}

	const user = await User.findById(userId);
	if (!user) {
		throwException(404, 'Wrong userId, user not found');
	}

	const deleteNotes = await Note.deleteMany({ userId });

	if (!deleteNotes?.deletedCount) {
		throwException(404, 'User has no notes!');
	}

	console.log('deleteNotes', deleteNotes);
	return deleteNotes;
}
