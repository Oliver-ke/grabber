const router = require('express').Router();
const { paymentHooks } = require('../../controllers/PaymentController');

router.get('/', paymentHooks);

module.exports = router;
