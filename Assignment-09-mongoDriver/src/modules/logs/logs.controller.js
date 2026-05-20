import { Router } from 'express';
import { AppError, asyncHandler } from '../../utils/error-handler/index.js';
import { createLogService } from './logs.services.js';

const router = Router();

export const routes = {
	base: '/logs',
	create: '/',
};

router.post(
	routes.create,
	asyncHandler(async (req, res) => {
		const { book_id, action,message,level,timestamp } = req.body;
		const data = await createLogService({ book_id, action, message, level, timestamp });

		if (!data.acknowledged) throw new AppError(400, `Failed to create log`);

		return res.status(201).json({ success: true, message: `Log created successfully!`, ...data });
	}),
);

export default router;
