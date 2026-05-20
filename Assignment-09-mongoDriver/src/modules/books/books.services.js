import { db } from '../../DB/connectionDB.js';
import AppError from '../../utils/error-handler/app-error.js';

const Books = await db.collection('books');

export const createBookService = async ({ title, author, year, genres }) => {
	return await Books.insertOne({ title, author, year, genres });
};

export const createBooksService = async (data) => {
	return await Books.insertMany(data);
};

export const getOneByTitleService = async (title) => {
	return await Books.findOne({ title });
};

export const updateBookByTitleService = async (title, data) => {
	const book = await getOneByTitleService(title);

	const filteredData = Object.fromEntries(Object.entries(data).filter(([_, value]) => value !== undefined));

	if (!book) throw new AppError(404, 'Book not found!');

	// return await Books.updateOne({ title }, { $set: { ...filteredData } });
	return await Books.findOneAndUpdate({ title }, { $set: { ...filteredData } });
};

export const getAllByYearService = async ({ from, to }) => {
	return await Books.find({ year: { $gte: from, $lte: to } }).toArray(); // to only send array of data without info object
};

export const getAllByGenreService = async (genre) => {
	return await Books.find({ genres: { $in: [genre] } }).toArray();
};

export const getAllBooksService = async ({ skip, limit }) => {
	return await Books.find({}, { sort: { year: 'desc' }, skip, limit }).toArray();
};

export const getAllYearIntService = async () => {
	return await Books.find({ year: { $type: 'int' } }).toArray();
};

export const getAllExcludeGenresService = async (genres) => {
	return await Books.find({ genres: { $nin: [...genres] } }).toArray();
};

export const deleteBeforeYearService = async (year) => {
	return await Books.deleteMany({ year: { $lt: year } });
};

export const getAllPublishedAfterService = async (year) => {
	return await Books.aggregate([{ $match: { year: { $gt: year } } }, { $sort: { year: -1 } }]).toArray();
};

export const getAllPublishedAfterProjectService = async (year) => {
	return await Books.aggregate([
		{ $match: { year: { $gt: year } } },
		{ $project: { _id: 0, title: 1, author: 1, year: 1 } },
	]).toArray();
};

export const getAllUnwindGenresService = async (year) => {
	return await Books.aggregate([{ $unwind: '$genres' }]).toArray();
};

export const getAllWithLogsService = async () => {
	return await Books.aggregate([
		// {
		// 	$addFields: {
		// 		stringId: { $toString: '$_id' },
		// 	},
		// },
		{
			$lookup: {
				from: 'logs',
				localField: '_id',
				foreignField: 'book_id',
				as: 'logs',
			},
		},
		// { $project: { stringId: 0 } },
	]).toArray();
};
