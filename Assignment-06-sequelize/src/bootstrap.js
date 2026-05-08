import { connectDB, syncDB } from './DB/connection.js';
import { CommentModel, PostModel, UserModel } from './DB/models/index.js';
// import { commentRoutes } from './modules/comments/comment.controller.js';
import { commentRouter, commentRoutes, postRouter, postRoutes, userRouter, userRoutes } from './modules/index.js';

export { CommentModel, PostModel, UserModel };

export const bootstrap = async (app, express) => {
	app.use(express.json());
	// app.use(express.urlencoded({ extended: true }));

	await connectDB();
	await syncDB({ force: false, alter: false });

	app.use(`/api/v1${userRoutes.base}`, userRouter);
	app.use(`/api/v1${postRoutes.base}`, postRouter);
	app.use(`/api/v1${commentRoutes.base}`, commentRouter);

	app.all('/*dummy', (req, res) => {
		return res.status(404).json({ message: 'Route Not Found' });
	});
};
