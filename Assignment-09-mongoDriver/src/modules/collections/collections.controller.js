import { Router } from 'express';
// import { asyncHandler } from '../../utils/error-handler/index.js';
import { AppError, asyncHandler } from '../../utils/error-handler/index.js';
import {
	createAuthorService,
	createBooksIndexService,
	createCollectionService,
	createLogsCappedService,
} from './collections.services.js';

const router = Router();

export const routes = {
	base: '/collections',
	createCollection: '/books',
	createAuthors: '/authors',
	createLogs: '/logs/capped',
	createBooksIndex: '/books/index',
};

// create collection with validation "Books"
router.post(
	routes.createCollection,
	asyncHandler(async (req, res) => {
		const collectionName = req.body.name || 'books';
		const data = await createCollectionService(collectionName);

		if (!data || data.collectionName !== collectionName) {
			throw new AppError(400, `Failed to create Collection '${collectionName}'`);
		}

		return res.status(201).json({ success: true, message: `Collection '${collectionName}' created successfully!` });
	}),
);

// create collection by inserting document "Authors"
router.post(
	routes.createAuthors,
	asyncHandler(async (req, res) => {
		const { name, nationality } = req.body;
		const data = await createAuthorService({ name, nationality });

		if (!data || !data.acknowledged) {
			throw new AppError(400, `Failed to create Author '${name}'!`);
		}

		return res.status(201).json({ success: true, message: `Author '${name}' created successfully!`, ...data });
	}),
);

// create capped collection "Logs"
router.post(
	routes.createLogs,
	asyncHandler(async (req, res) => {
		const collectionName = req.body.name || 'logs';
		const data = await createLogsCappedService(collectionName);

		if (!data || data.collectionName !== collectionName) {
			throw new AppError(400, `Failed to create Collection '${collectionName}'`);
		}

		return res.status(201).json({ success: true, message: `Collection '${collectionName}' created successfully!` });
	}),
);

// create index for "Books" collection
router.post(
	routes.createBooksIndex,
	asyncHandler(async (req, res) => {
		const collectionName = req.body.name || 'books';
		const data = await createBooksIndexService(collectionName);

		console.log('createBooksIndexService', data);

		if (!data) {
			throw new AppError(400, `Failed to create index for collection '${collectionName}'`);
		}

		return res
			.status(201)
			.json({ success: true, message: `Index of collection '${collectionName}' created successfully!` });
	}),
);
export default router;
