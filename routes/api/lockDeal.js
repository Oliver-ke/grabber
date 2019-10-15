const router = require('express').Router();
const {
	addLockDeal,
	getLockDeals,
	verifyPayment,
	updateLockDeal,
	deleteLockDeal
} = require('../../controllers/lockDealController');
const { isTokenValid, validate } = require('../../middlewares/index');

/*
	Description: Add a new lockDeal offer
	Route: POST '/api/lockDeal'
	security: public anyone should be able to lock a deal
*/
router.post('/', validate('addLockDeal'), addLockDeal);

/*
	Description: Confirms payment
	Route: POST '/api/lockDeal/<ref>'
	security: public anyone should be able to confirm payment
*/
router.get('/:reference', verifyPayment);

/*
	Description: Get all locked offer
	Route: GET '/api/lockDeal'
	security: private, only for admin
*/
router.get('/', isTokenValid, getLockDeals);

/*
	Description: UPDATE A locked deal
	Route: PUT '/api/lockDeal'
	security: private, only for admin
*/
router.put('/:id', isTokenValid, updateLockDeal);

/*
	Description: Delete a locked deal
	Route: DELETE '/api/lockDeal'
	security: private, only for admin
*/
router.delete('/:id', isTokenValid, deleteLockDeal);

module.exports = router;
