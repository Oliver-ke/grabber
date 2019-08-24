const router = require('express').Router();
const loginUser = require('../../controllers/authController');
const { validate } = require('../../middlewares');


/*
	Description: Login a user
	Route: POST '/api/auth'
	security: public, everyone can attempt login
*/
router.post('/', validate('userLogin'), loginUser);

module.exports = router;
