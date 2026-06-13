import { configEnv } from './configs/env.js';
import { ConnectDB } from './DB/connection.js';
import { noteRouter, noteRoutes, userRouter, userRoutes } from './modules/index.js';
import { globalErrorHandler } from './utils/error-handler/index.js';
import { throwException } from './utils/response/throw.exceptions.js';

const urlBase = configEnv.urlApiBase;

export default async function bootstrap(app, express) {
	app.use(express.json());

	await ConnectDB();

	app.use(`${urlBase}${userRoutes.base}`, userRouter);
	app.use(`${urlBase}${noteRoutes.base}`, noteRouter);

	app.all('*dummy', (req, res, next) => {
		throwException(404, `❌ This route not exist!`);
		// next(new AppError(404, `Can't find this route on this server!`));
	});

	app.use(globalErrorHandler);
}
