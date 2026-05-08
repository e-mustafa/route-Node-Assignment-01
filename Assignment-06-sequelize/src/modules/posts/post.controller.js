import { Router } from 'express';
import { addPost, deletePost, getAllPosts, getPostsDetails, updatePost } from './post.services.js';

const router = Router();

export const routes = {
	base: '/posts',
	create: '/',
	delete: '/:id',
	getDetails: '/details',
	commentCount: '/comment-count',

	// ***************** extra
	update: '/:id',
};

router.post(routes.create, addPost);
router.delete(routes.delete, deletePost);
router.get(routes.getDetails, getPostsDetails);
router.get(routes.commentCount, getAllPosts);

// ***************** extra
router.patch(routes.update, updatePost);

export default router;
