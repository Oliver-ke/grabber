const { userRegister, userLogin, addDeal, updateDeal, requestDiscount } = require('./rules');

const getValidator = validationName => {
	const rules = {
		userRegister,
		userLogin,
		addDeal,
		updateDeal,
		requestDiscount
	};

	return rules[validationName];
};

module.exports = getValidator;
