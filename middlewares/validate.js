const { validationResult } = require('express-validator');
const getValidator = require('../validation');

module.exports = validationName => {
	const rules = getValidator(validationName);
	return [
		...rules,
		(req, res, next) => {
			const errors = validationResult(req);
			const resErrorMsg = {};
			errors.array().forEach(error => {
				resErrorMsg[error.param] = error.msg;
			});
			if (!errors.isEmpty()) {
				return res.status(422).json({ status: 422, errors: resErrorMsg });
			}
			return next();
		}
	];
};
