import { Router } from 'express';
import { addPost, deletePost, getAllPosts, getPostsDetails } from './post.services.js';

const router = Router();

export const routes = {
	base: '/posts',
	create: '/',
	delete: '/:id',
	getDetails: '/details',
	commentCount: '/comment-count',
};

router.post(routes.create, addPost);
router.delete(routes.delete, deletePost);
router.get(routes.getDetails, getPostsDetails);
router.get(routes.commentCount, getAllPosts);

export default router;
