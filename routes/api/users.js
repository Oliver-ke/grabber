const router = require('express').Router();
const { createUser } = require('../../controllers/userController');
const { validate } = require('../../middlewares');


/*
	Description: Signup a user
	Route: POST '/api/user'
	security: public, anyone can signup for now
*/
router.post('/', validate('userRegister'), createUser);

module.exports = router;
