import { Router } from 'express';
import {
	createBulkComments,
	findOrCreateComment,
	getCommentDetails,
	getResentComments,
	searchInComments,
	updateComment,
} from './comment.services.js';

const router = Router();

export const routes = {
	base: '/comments',
	create: '/',
	update: '/:id',
	findOrCreate: '/find-or-create',
	search: '/search',
	resent: '/newest/:id',
	details: '/details/:id',
};
router.post(routes.create, createBulkComments);
router.patch(routes.update, updateComment);
router.post(routes.findOrCreate, findOrCreateComment);
router.get(routes.search, searchInComments);
router.get(routes.resent, getResentComments);
router.get(routes.details, getCommentDetails);

export default router;
