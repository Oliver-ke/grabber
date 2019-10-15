const {
	userRegister,
	userLogin,
	addDeal,
	updateDeal,
	requestDiscount,
	getCategoryDeals,
	addLockDeal,
	addCategory,
	updateCategory
} = require('./rules');

const getValidator = validationName => {
	const rules = {
		userRegister,
		userLogin,
		addDeal,
		updateDeal,
		requestDiscount,
		getCategoryDeals,
		addLockDeal,
		addCategory,
		updateCategory
	};

	return rules[validationName];
};

module.exports = getValidator;
