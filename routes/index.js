const auth = require('./api/auth');
const user = require('./api/users');
const deal = require('./api/deal');
const lockDeal = require('./api/lockDeal');

module.exports = {
	auth,
	user,
	deal,
	lockDeal
};
