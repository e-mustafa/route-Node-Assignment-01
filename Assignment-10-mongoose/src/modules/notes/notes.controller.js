import { Router } from 'express';
import { asyncHandler } from '../../utils/error-handler/index.js';
import { responseSuccess } from '../../utils/response/response.success.js';
import {
	createNoteService,
	deleteNoteService,
	deleteUserNotesService,
	getNoteByContentService,
	getNotesAndUserAggregateService,
	getNotesAndUserService,
	getNoteService,
	getPaginatedNotesService,
	replaceNoteService,
	updateAllNotesService,
	updateNoteService,
} from './notes.services.js';

const router = Router();

export const routes = {
	base: '/notes',
	createNote: '/',
	updateAll: '/all',
	updateNote: '/:id',
	deleteNote: '/:id',
	replaceNote: '/replace/:id',

	getNotes: '/paginate-sort',
	getNoteByContent: '/note-by-content',
	getNotesAndUser: '/note-with-user',
	getNotesAndUserAggregate: '/aggregate',
	getNote: '/:id',

	deleteNotes: '/',
};

// create note
router.post(
	routes.createNote,
	asyncHandler(async (req, res) => {
		const { userId, title, content } = req.body || {};

		const data = await createNoteService({ userId, title, content });

		responseSuccess({
			res,
			status: 201,
			message: 'Note created successfully',
			data,
		});
		// return res.status(201).json({ success: true, message: 'Note created successfully', data });
	}),
);

// update all notes title for user
router.patch(
	routes.updateAll,
	asyncHandler(async (req, res) => {
		const { userId, title } = req.body || {};

		const data = await updateAllNotesService({ userId, title });

		responseSuccess({
			res,
			message: `${data?.modifiedCount} Notes updated successfully`,
		});
		// return res.status(200).json({ success: true, message: 'Notes updated successfully', data });
	}),
);

// update user note
router.patch(
	routes.updateNote,
	asyncHandler(async (req, res) => {
		const { id } = req.params || {};
		const { userId, title, content } = req.body || {};

		const data = await updateNoteService(id, { userId, title, content });

		responseSuccess({ res, message: 'Note updated successfully', data });
		// return res.status(200).json({ success: true, message: 'Note updated successfully', data });
	}),
);

// replace user note
router.put(
	routes.replaceNote,
	asyncHandler(async (req, res) => {
		const { id } = req.params || {};
		const { userId, title, content } = req.body || {};

		const data = await replaceNoteService(id, { userId, title, content });

		responseSuccess({ res, message: 'Note replaced successfully', data });
		// return res.status(200).json({ success: true, message: 'Note replaced successfully', data });
	}),
);

// delete user note
router.delete(
	routes.deleteNote,
	asyncHandler(async (req, res) => {
		const { id } = req.params || {};
		const { userId } = req.body || {};

		const data = await deleteNoteService(id, userId);

		responseSuccess({ res, message: 'Note deleted successfully', data });
		// return res.status(200).json({ success: true, message: 'Note deleted successfully' });
	}),
);

// get user notes with pagination
router.get(
	routes.getNotes,
	asyncHandler(async (req, res) => {
		const { userId } = req.body || {};
		const { page, limit, search } = req.query || {};
		const { data = [], metadata = {} } = await getPaginatedNotesService({
			userId,
			page,
			limit,
			search,
		});

		responseSuccess({ res, data, more: { count: data?.length || 0, metadata } });
		// return res.status(200).json({ success: true, message: 'Note deleted successfully' });
	}),
);

// get user note by content
router.get(
	routes.getNoteByContent,
	asyncHandler(async (req, res) => {
		const { content } = req.query || {};
		const { userId, title } = req.body || {};

		const data = await getNoteByContentService(content, userId);

		if (!data) return responseSuccess({ res, message: 'No Result!', data: {} });

		responseSuccess({ res, data });

		// return res.status(200).json({ success: true, data });
	}),
);

// get user note and user email
router.get(
	routes.getNotesAndUser,
	asyncHandler(async (req, res) => {
		const { userId } = req.body || {};

		const data = await getNotesAndUserService(userId);

		responseSuccess({ res, data });
		// return res.status(200).json({ success: true, data });
	}),
);

// get user note and user info using aggregation
router.get(
	routes.getNotesAndUserAggregate,
	asyncHandler(async (req, res) => {
		const { userId } = req.body || {};
		const { title } = req.query || {};

		const data = await getNotesAndUserAggregateService(userId, title);
		const count = data?.length;

		responseSuccess({
			res,
			message: !count ? 'No result!' : undefined,
			more: { count },
			data,
		});
		// return res.status(200).json({ success: true, data });
	}),
);

// get user note by id
router.get(
	routes.getNote,
	asyncHandler(async (req, res) => {
		const { id } = req.params || {};
		const { userId, title, content } = req.body || {};

		const data = await getNoteService(id, userId);

		responseSuccess({ res, data });
		// return res.status(200).json({ success: true, data });
	}),
);

// delete all user notes
router.delete(
	routes.deleteNotes,
	asyncHandler(async (req, res) => {
		const { userId } = req.body || {};
		const data = await deleteUserNotesService(userId);

		console.log('data', data.deletedCount);

		responseSuccess({ res, message: 'All User notes deleted successfully' });
	}),
);
export default router;
