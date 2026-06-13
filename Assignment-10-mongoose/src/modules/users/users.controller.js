import { Router } from 'express';
import { asyncHandler } from '../../utils/error-handler/index.js';
import { responseSuccess } from '../../utils/response/response.success.js';
import {
	createUserService,
	deleteUserService,
	getUserService,
	getUsersService,
	loginUserService,
	updateUserService,
} from './users.services.js';

const router = Router();

export const routes = {
	base: '/users',
	signup: '/signup',
	login: '/login',
	updateUser: '/:id',
	deleteUser: '/:id',
	getUser: '/:id',
	getUsers: '/',
};

// signup - create user
router.post(
	routes.signup,
	asyncHandler(async (req, res) => {
		const { name, email, password, phone, age } = req.body || {};

		const data = await createUserService({ name, email, password, phone, age });

		responseSuccess({ res, message: 'User Created successfully', data });
		// return res.status(201).json({ success: true, message: 'User Created successfully', data });
	}),
);

// hash password
// encrypt phone

// login
router.post(
	routes.login,
	asyncHandler(async (req, res) => {
		const { email, password } = req.body || {};
		console.log('req.body', req.body);

		const data = await loginUserService({ email, password });

		responseSuccess({ res, message: 'User login successfully', data });
		// return res.status(200).json({ success: true, message: 'User login successfully', data });
	}),
);

// update user data
router.patch(
	routes.updateUser,
	asyncHandler(async (req, res) => {
		const { id } = req.params || {};
		const { name, email, phone, age } = req.body || {};

		const data = await updateUserService(id, { name, email, phone, age });

		responseSuccess({ res, message: 'User Updated successfully', data });
		// return res.status(200).json({ success: true, message: 'User Updated successfully', data });
	}),
);

// delete user
router.delete(
	routes.deleteUser,
	asyncHandler(async (req, res) => {
		const { id } = req.params || {};

		const deletedUser = await deleteUserService(id);

		responseSuccess({ res, message: 'User deleted successfully' });
		// return res.status(200).json({ success: true, message: 'User deleted successfully' });
	}),
);

// get user
router.get(
	routes.getUser,
	asyncHandler(async (req, res) => {
		const { id } = req.params || {};

		const data = await getUserService(id);

		responseSuccess({ res, data });
		// return res.status(200).json({ success: true, data });
	}),
);

// get all users
router.get(
	routes.getUsers,
	asyncHandler(async (req, res) => {
		const data = await getUsersService();

		responseSuccess({ res, data });
		// return res.status(200).json({ success: true, data });
	}),
);

export default router;
