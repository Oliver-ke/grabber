const router = require('express').Router();
const { createDeal, getDeals, deleteDeal, updateDeal } = require('../../controllers/dealController');
const { isTokenValid, validate } = require('../../middlewares');

/*
	Description: Add a new deal
	Route: POST '/api/deal'
	security: private, only logined in users can add
*/
router.post('/', isTokenValid, validate('addDeal'), createDeal);

/*
	Description: Get all deals
	Route: GET '/api/deal'
	security: public, everyone can access
*/
router.get('/', getDeals);

/*
	Description: Update a deal
	Route: PUT '/api/deal'
	security: private, only logined in users can update
*/
router.put('/:id', validate('updateDeal'), isTokenValid, updateDeal);

/*
	Description: Delete an existing deal
	Route: DELETE '/api/deal'
	security: private, only logined in users can delete
*/
router.delete('/:id', isTokenValid, deleteDeal);

module.exports = router;
