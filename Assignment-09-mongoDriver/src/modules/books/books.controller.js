import { Router } from 'express';
import { AppError, asyncHandler } from '../../utils/error-handler/index.js';
import {
	createBookService,
	createBooksService,
	deleteBeforeYearService,
	getAllBooksService,
	getAllByGenreService,
	getAllByYearService,
	getAllExcludeGenresService,
	getAllPublishedAfterProjectService,
	getAllPublishedAfterService,
	getAllUnwindGenresService,
	getAllWithLogsService,
	getAllYearIntService,
	getOneByTitleService,
	updateBookByTitleService,
} from './books.services.js';

const router = Router();

export const routes = {
	base: '/books',
	create: '/',
	createBulk: '/batch',
	updateOneByTitle: '/:title',

	getOneByTitle: '/title',
	getAllByYear: '/year',
	getAllByGenre: '/genre',
	getAllSkipLimit: '/skip-limit',
	getAllYearInt: '/year-integer',
	getAllExcludeGenres: '/exclude-genres',

	deleteBeforeYear: '/before-year',

	getAllPublishedAfter: '/aggregate1',
	getAllPublishedAfterProject: '/aggregate2',
	getAllUnwindGenresService: '/aggregate3',
	getAllWithLogs: '/aggregate4',
};

router.post(
	routes.create,
	asyncHandler(async (req, res) => {
		const { title, author, year, genres } = req.body;
		const data = await createBookService({ title, author, year, genres });

		if (!data.acknowledged) return res.status(400).json({ success: false, message: `Failed to create book '${title}'!` });

		return res.status(201).json({ success: true, message: `Book '${title}' created successfully!`, ...data });
	}),
);

router.post(
	routes.createBulk,
	asyncHandler(async (req, res) => {
		const { body } = req;

		if (!Array.isArray(body)) {
			throw new AppError(400, 'Invalid input data! Expected an array of books.');
		}

		const data = await createBooksService(body);

		if (!data.acknowledged) return res.status(400).json({ success: false, message: `Failed to create books!` });

		return res.status(201).json({ success: true, message: `${data.insertedCount} Books created successfully!`, ...data });
	}),
);

router.patch(
	routes.updateOneByTitle,
	asyncHandler(async (req, res) => {
		const { title, author, year, genres } = req.body;
		const data = await updateBookByTitleService(req.params.title, { title, author, year, genres });

		// if (!data.acknowledged) throw new AppError(400, `Failed to Update book!`);

		// delete data.upsertedId;
		// delete data.upsertedCount;

		return res.status(200).json({ success: true, message: `Book Updated successfully!`, data });
	}),
);

router.get(
	routes.getOneByTitle,
	asyncHandler(async (req, res) => {
		const { title } = req.query;

		if (!title) throw new AppError(400, 'Please provide book title.');

		const book = await getOneByTitleService(title);

		if (!book) throw new AppError(404, 'Book not found.');

		return res.status(200).json({ success: true, data: book });
	}),
);

router.get(
	routes.getAllByYear,
	asyncHandler(async (req, res) => {
		const { from, to } = req.query;
		const data = await getAllByYearService({ from: +from, to: +to });

		return res.status(200).json({ success: true, count: data?.length || 0, data });
	}),
);

router.get(
	routes.getAllByGenre,
	asyncHandler(async (req, res) => {
		const data = await getAllByGenreService(req.query.genre);

		return res.status(200).json({ success: true, count: data?.length || 0, data });
	}),
);

router.get(
	routes.getAllSkipLimit,
	asyncHandler(async (req, res) => {
		const { skip, limit } = req.query;
		const data = await getAllBooksService({ skip: +skip ?? 2, limit: +limit ?? 3 });

		return res.status(200).json({ success: true, count: data?.length || 0, data });
	}),
);

router.get(
	routes.getAllYearInt,
	asyncHandler(async (req, res) => {
		const data = await getAllYearIntService();

		return res.status(200).json({ success: true, count: data?.length || 0, data });
	}),
);

router.get(
	routes.getAllExcludeGenres,
	asyncHandler(async (req, res) => {
		let { genres } = req.query;
		if (typeof genres === 'string') genres = genres.split(',');

		const data = await getAllExcludeGenresService(genres);
		return res.status(200).json({ success: true, count: data?.length || 0, data });
	}),
);

router.delete(
	routes.deleteBeforeYear,
	asyncHandler(async (req, res) => {
		const { acknowledged, deletedCount } = await deleteBeforeYearService(+req.query.year);

		if (!acknowledged || !deletedCount) throw new AppError(404, 'No Books found to delete.');

		return res
			.status(200)
			.json({ success: true, message: `${deletedCount} Book${deletedCount > 1 && 's'} deleted successfully.` });
	}),
);

router.get(
	routes.getAllPublishedAfter,
	asyncHandler(async (req, res) => {
		const data = await getAllPublishedAfterService(+req.query.year);

		return res.status(200).json({ success: true, count: data?.length || 0, data });
	}),
);

router.get(
	routes.getAllPublishedAfterProject,
	asyncHandler(async (req, res) => {
		const data = await getAllPublishedAfterProjectService(+req.query.year);

		return res.status(200).json({ success: true, count: data?.length || 0, data });
	}),
);

router.get(
	routes.getAllUnwindGenresService,
	asyncHandler(async (req, res) => {
		const data = await getAllUnwindGenresService();

		return res.status(200).json({ success: true, count: data?.length || 0, data });
	}),
);

router.get(
	routes.getAllWithLogs,
	asyncHandler(async (req, res) => {
		const data = await getAllWithLogsService();

		return res.status(200).json({ success: true, count: data?.length || 0, data });
	}),
);

export default router;
