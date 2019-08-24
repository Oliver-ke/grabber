const jwt = require('jsonwebtoken');

module.exports = (payload) => {
	const secret = process.env.SECRET_KEY;
	const time = { expiresIn: '4380hrs' };
	return jwt.sign(payload, secret, time);
};
