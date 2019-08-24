const generateToken = require('../utils/generateToken');
const { User, Deal } = require('../database/models');

const createTokenPayload = user => {
	return {
		id: user.id,
		fullName: user.fullName,
		email: user.email
	};
};
const createUser = async (req, res) => {
	const { email, fullName, password } = req.body;
	let userObject = {
		fullName: fullName.toLowerCase(),
		password,
		email: email.toLowerCase()
	};
	/* istanbul ignore next */
	userObject = process.env.NODE_ENV === 'test' ? { ...userObject, ...{ role } } : userObject;

	const emailExists = await User.findOne({
		where: { email: email.toLowerCase() }
	});
	if (emailExists) {
		return res.status(409).json({ status: 409, error: 'email exist' });
	}
	const user = await User.create(userObject);
	const token = generateToken(createTokenPayload(user));
	return res.status(201).json({
		status: 201,
		data: {
			id: user.id,
			fullName: user.fullName,
			email: user.email
		},
		token
	});
};

//get all users
const getAllUsers = async (req, res) => {
	const users = await User.find();
};

//delete a user

// update user
const updateUserDetails = async (req, res) => {
	const { reqUserId } = req.decoded;
	const { fullName, password, id } = req.body;
	const user = await User.findOne({
		where: { id }
	});

	// check if requer is a superAdmin

	const updatedUser = await user.update({
		firstName: (fullName && fullName.trim()) || user.dataValues.fullName,
		password: password || user.dataValues.password
	});

	return res.status(201).json({
		status: 201,
		data: {
			fullName: updatedUser.fullName,
			password: updatedUser.password
		}
	});
};
module.exports = {
	createUser
};
