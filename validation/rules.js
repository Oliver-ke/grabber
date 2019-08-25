const { check, query } = require('express-validator');

// add validation rules here.
const userRegister = [
	// check for empty fields
	check('fullName')
		.matches(/^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{1,250}$/)
		.withMessage(
			'firstName is invalid, firstName should be an alphabetical character, greater then 1 and less than 250 characters, should not include numbers and cannot be left empty'
		)
		.trim(),
	check('email', 'Please provide a valid email')
		.isEmail()
		.isLength({ min: 3, max: 250 })
		.trim(),
	check('password', 'password should be at least 6 characters').isLength({ min: 6 })
];

const userLogin = [
	check('email', 'Invalid email, please provide a valid mail')
		.isEmail()
		.not()
		.isEmpty()
];

const addDeal = [
	check('price', 'Price should be a number')
		.isNumeric()
		.not()
		.isEmpty(),
	check('discount', 'Dicount should be a number')
		.isNumeric()
		.not()
		.isEmpty(),
	check('minRange', 'minRange should be a none empty number')
		.isNumeric()
		.not()
		.isEmpty(),
	check('maxRange', 'maxRange should be a none empty number')
		.isNumeric()
		.not()
		.isEmpty(),
	check('disabled', 'disabled should either be true or false')
		.optional()
		.isBoolean()
		.not()
		.isEmpty()
];

const updateDeal = [
	check('price', 'Price should be a number')
		.optional()
		.isNumeric()
		.not()
		.isEmpty(),
	check('discount', 'Dicount should be a number')
		.optional()
		.isNumeric()
		.not()
		.isEmpty(),
	check('minRange', 'minRange should be a none empty number')
		.optional()
		.isNumeric()
		.not()
		.isEmpty(),
	check('maxRange', 'maxRange should be a none empty number')
		.optional()
		.isNumeric()
		.not()
		.isEmpty(),
	check('disabled', 'disabled should either be true or false')
		.optional()
		.isBoolean()
		.not()
		.isEmpty()
];

const requestDiscount = [
	query('studentMax', 'Provide a studentMax parameter as a number')
		.isNumeric()
		.not()
		.isEmpty()
];

module.exports = {
	userLogin,
	userRegister,
	addDeal,
	updateDeal,
	requestDiscount
};
