import { isDev } from '../../configs/env.js';
import AppError from './app-error.js';

// Handle Mongoose Bad ObjectId (CastError)
const handleCastErrorDB = (err) => {
	return new AppError(400, `Invalid ${err.path}: ${err.value}.`);
};

// Handle MongoDB Duplicate Fields (Error Code 11000)
const handleDuplicateFieldsDB = (err) => {
	const value = err.errmsg ? err.errmsg.match(/(["'])(\\?.)*?\1/)[0] : 'value';
	return new AppError(400, `Duplicate field value: ${value}. Please use another value!`);
};

// Handle Mongoose Validation Errors
const handleValidationErrorDB = (err) => {
	const errors = Object.values(err.errors).map((el) => el.message);
	return new AppError(400, `Invalid input data. ${errors.join('. ')}`);
};

// Development error response (Detailed for debugging)
const sendErrorDev = (err, res) => {
	res.status(err.statusCode).json({
		success: false,
		status: err.status,
		message: err.message,
		stack: err.stack,
		error: err,
	});
};

// Production error response (Leaking no internal details)
const sendErrorProd = (err, res) => {
	// Operational, trusted error: send clear message to client
	if (err.isOperational) {
		res.status(err.statusCode).json({
			success: false,
			message: err.message,
		});
	} else {
		// Programming or other unknown error: don't leak details to production users
		console.error('ERROR 💥:', err);
		res.status(500).json({
			success: false,
			message: 'Something went wrong, please try again later.',
		});
	}
};

const globalError = (err, req, res, next) => {
	err.statusCode = err.statusCode || 500;
	err.status = err.status || 'error';

	if (isDev) {
		sendErrorDev(err, res);
	} else {
		// Create a safe copy of the error maintaining its prototype
		let error = Object.create(err);
		error.message = err.message;

		if (err.name === 'CastError') error = handleCastErrorDB(error);
		if (err.code === 11000) error = handleDuplicateFieldsDB(error);
		if (err.name === 'ValidationError') error = handleValidationErrorDB(error);

		sendErrorProd(error, res);
	}
};

export default globalError;
