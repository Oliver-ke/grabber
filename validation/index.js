const { userRegister, userLogin, addDeal, updateDeal } = require('./rules');

const getValidator = validationName => {
	const rules = {
		userRegister,
		userLogin,
		addDeal,
		updateDeal
	};

	return rules[validationName];
};

module.exports = getValidator;
