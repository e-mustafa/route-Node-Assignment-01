export default class AppError extends Error {
	constructor(statusCode, message, originalError = null) {
		super(message);
		this.statusCode = statusCode || 500;
		this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
		this.isOperational = true; // Indicates this is a known, operational error

		// Attach the original error object or technical details for logging purposes
		this.originalError = originalError;

		Error.captureStackTrace(this, this.constructor);
	}
}
