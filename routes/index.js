const auth = require('./api/auth');
const user = require('./api/users');
const deal = require('./api/deal');
const lockDeal = require('./api/lockDeal');
const category = require('./api/category');

module.exports = {
	auth,
	user,
	deal,
	lockDeal,
	category
};
