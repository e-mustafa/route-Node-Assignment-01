import { isDev } from '../../configs/env.js';
import AppError from './app-error.js';

const globalError = (err, req, res, next) => {
	err.statusCode = err.statusCode || 500;
	err.status = err.status || 'error';

	let error = { ...err };
	error.message = err.message;

	if (err.name === 'CastError') error = new AppError(400, `Invalid ${err.path}: ${err.value}.`);

	isDev && console.error('Global Error:', err);
	// final response
	res.status(error.statusCode || 500).json({
		success: false,
		message: error.message || 'Internal Server Error, Please try again later.',
		stack: isDev ? err.stack : undefined,
	});
};

export default globalError;
