import { Router } from 'express';
import { addUser, createOrUpdateUser, deleteUser, getAllUsers, getUserByEmail, getUserById, updateUser } from './user.services.js';

const router = Router();

export const routes = {
	base: '/users',
	getAll: '/',
	signup: '/signup',
	createOrUpdate: '/:id',
	getById: '/:id',
	getByEmail: '/by-email',

	update: '/:id',
	delete: '/:id',
};

router.get(routes.getAll, getAllUsers);
router.post(routes.signup, addUser);
router.put(routes.createOrUpdate, createOrUpdateUser);
router.get(routes.getById, getUserById);
router.get(routes.getByEmail, getUserByEmail);

router.patch(routes.update, updateUser);
router.delete(routes.delete, deleteUser);

export default router;
