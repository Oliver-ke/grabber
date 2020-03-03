const { verifyMonifyPayment } = require('../utils/payment');

const paymentHooks = async (req, res) => {
	const paymentDetail = await verifyMonifyPayment('MNFY|20200302221556|000342');
	return res.status(200).json(paymentDetail);
};

// TODO: create a table for payments and a hook endpoint to get status

module.exports = {
	paymentHooks
};
