const { requestDiscount, getCategoryDeals } = require('../controllers/dealController');

const checkQuery = (req, res, next) => {
	const { category, studentMax } = req.query;
	if (category && !studentMax) {
		// return cat controller
		return getCategoryDeals(req, res);
	}
	if (studentMax && !category) {
		// return request discount controller
		return requestDiscount(req, res);
	}
	return next();
};

module.exports = checkQuery;
