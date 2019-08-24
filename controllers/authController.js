const { User } = require('../database/models');
const generateToken = require('../utils/generateToken');


const loginUser = async (req, res) => {
	const { email, password } = req.body;
	const user = await User.findOne({
		where: { email: email.toLowerCase() }
	});
	const isPasswordValid = (user && (await user.validPassword(password))) || false;
	if (isPasswordValid) {
		const userObject = {
			fullName: user.dataValues.fullName,
			email: user.dataValues.email,
			id: user.dataValues.id
		};
		return res.status(201).json({
			status: 201,
			data: userObject,
			token: generateToken(userObject)
		});
	}
	return res.status(401).json({
		status: 401,
		error: 'Incorrect email or password',
	});
};

module.exports = loginUser;
