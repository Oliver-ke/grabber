const jwt = require('jsonwebtoken');
const { User } = require('../database/models');

const secret = process.env.SECRET_KEY;

const isTokenValid = (req, res, next) => {
	try {
		const token = req.headers.authorization.split(' ')[1];
		jwt.verify(token, secret, async (err, decoded) => {
			if (!token || err) {
				return res.status(401).json({
					status: 401,
					error: 'Invalid token'
				});
			}
			const user = await User.findByPk(decoded.id);
			if (!user) {
				return res.status(401).json({
					status: 401,
					error: 'Invalid token'
				});
			}
			req.decoded = decoded;
			return next();
		});
	} catch (error) {
		return res.status(401).json({
			status: 401,
			error: 'Invalid token'
		});
	}
};

module.exports = isTokenValid;
