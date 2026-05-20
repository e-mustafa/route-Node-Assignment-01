import { connectDB } from './DB/connectionDB.js';
import { booksRouter, booksRoutes, collectionsRouter, collectionsRoutes, logsRouter, logsRoutes } from './modules/index.js';
import { AppError, globalError } from './utils/error-handler/index.js';

const urlBase = '/api/v1';

export const bootstrap = async (app, express) => {
	app.use(express.json());

	await connectDB();

	// app.use('/api/v1/users', (await import('./modules/users/user.routes.js')).default);

	app.get('/api/v1/collections', (req, res) => {
		res.json({ success: true, message: 'Collections route is working!' });
	});

	app.use(`${urlBase}${collectionsRoutes.base}`, collectionsRouter);
	app.use(`${urlBase}${booksRoutes.base}`, booksRouter);
	app.use(`${urlBase}${logsRoutes.base}`, logsRouter);

	app.all('*dummy', (req, res, next) => {
		next(new AppError(404, `Can't find this route on this server!`));
	});

	app.use(globalError);
};
