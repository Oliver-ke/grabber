const { check, body, query } = require('express-validator');

// add validation rules here.
const userRegister = [
	// check for empty fields
	check('fullName')
		.matches(/^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{1,250}$/)
		.withMessage(
			'firstName is invalid, firstName should be an alphabetical character, greater then 1 and less than 250 characters, should not include numbers and cannot be left empty'
		)
		.trim(),
	check('email', 'Please provide a valid email').isEmail().isLength({ min: 3, max: 250 }).trim(),
	check('password', 'password should be at least 6 characters').isLength({ min: 6 })
];

const userLogin = [ check('email', 'Invalid email, please provide a valid mail').isEmail().not().isEmpty() ];

const addDeal = [
	body('price', 'Price should be a number').isNumeric().not().isEmpty(),
	body('discount', 'Dicount should be a number').isNumeric().not().isEmpty(),
	body('implementationCost', 'implementationCost should be a number').isNumeric().not().isEmpty(),
	body('implementationDiscount', 'implementationDiscount should be a number').isNumeric().not().isEmpty(),
	body('minRange', 'minRange should be a none empty number').isNumeric().not().isEmpty(),
	body('maxRange', 'maxRange should be a none empty number').isNumeric().not().isEmpty(),
	body('categoryId', 'Please include a categoryId').not().isEmpty(),
	body('disabled', 'disabled should either be true or false').optional().isBoolean().not().isEmpty(),
	body('discountFixed', 'discountFixed should either be true or false').optional().isBoolean().not().isEmpty(),
	body('implementationFixed', 'implementationFixed should either be true or false')
		.optional()
		.isBoolean()
		.not()
		.isEmpty(),
	body('expiryDate', 'provide expiryDate').optional().isString().not().isEmpty()
];

const updateDeal = [
	body('price', 'Price should be a number').optional().isNumeric().not().isEmpty(),
	body('discount', 'Dicount should be a number').optional().isNumeric().not().isEmpty(),
	body('implementationCost', 'implementationCost should be a number').optional().isNumeric().not().isEmpty(),
	body('implementationDiscount', 'implementationDiscount should be a number').optional().isNumeric().not().isEmpty(),
	body('categoryId', 'Please include a categoryId').optional().not().isEmpty(),
	body('minRange', 'minRange should be a none empty number').optional().isNumeric().not().isEmpty(),
	body('maxRange', 'maxRange should be a none empty number').optional().isNumeric().not().isEmpty(),
	body('fixed', 'fixed should either be true or false').optional().isBoolean().not().isEmpty()
];

const requestDiscount = [
	query('studentMax', 'Provide a studentMax parameter as a number').isNumeric().not().isEmpty(),
	query('studentMin', 'Provide a studentMin').isNumeric().not().isEmpty(),
	query('categoryId', 'Provide a categoryId').not().isEmpty()
];

const getCategoryDeals = [ query('categoryId', 'provide a categoryId').isAlphanumeric().not().isEmpty() ];

const addLockDeal = [
	body('email', 'please provide a valid email').trim().isEmail().not().isEmpty(),
	body('school', 'please provide a valid school name').trim().not().isEmpty(),
	body('name', 'please provide your name').trim().not().isEmpty(),
	body('totalPrice', 'please provide a totalPrice').isNumeric().not().isEmpty(),
	body('lockOfferPrice', 'please provide an lockOfferPrice').isNumeric().not().isEmpty(),
	body('paid', 'please provide a valid paid value').optional().isBoolean().not().isEmpty(),
	body('dealId', 'please a dealId').trim().not().isEmpty(),
	body('phone', 'please provide a valid  phone number').trim().isLength({ min: 11, max: 13 })
];

const addCategory = [
	body('name', 'provide a name').isString().not().isEmpty(),
	body('features', 'provide features of category').optional().isString().not().isEmpty()
];

const updateCategory = [
	body('name', 'provide a name').optional().isString().not().isEmpty(),
	body('features', 'provide features of category').optional().isString().not().isEmpty()
];

module.exports = {
	userLogin,
	userRegister,
	addDeal,
	updateDeal,
	requestDiscount,
	getCategoryDeals,
	addLockDeal,
	addCategory,
	updateCategory
};
