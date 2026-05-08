import { isDev } from '../configs/env.js';

export default function catchResError(error, res, sql = false) {
	isDev && console.log(error);

	// handle validation errors
	if (sql) {
		if (['SequelizeValidationError', 'SequelizeUniqueConstraintError'].includes(error.name))
			return res.status(400).json({ success: false, message: error.errors[0].message });
	}

	isDev && console.error(error);

	return res.status(500).json({
		success: false,
		message: error?.message || 'Internal Server Error',
		...(isDev && { error }),
	});
}
