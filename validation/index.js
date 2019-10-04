const {
	userRegister,
	userLogin,
	addDeal,
	updateDeal,
	requestDiscount,
	getCategoryDeals,
	addLockDeal
} = require('./rules');

const getValidator = validationName => {
	const rules = {
		userRegister,
		userLogin,
		addDeal,
		updateDeal,
		requestDiscount,
		getCategoryDeals,
		addLockDeal
	};

	return rules[validationName];
};

module.exports = getValidator;
