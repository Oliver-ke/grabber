const { LockedDeal: LockDeal, Deal } = require('../database/models');
const { sendMail, payment: { initPayment, confirmPayment } } = require('../utils');

const addLockDeal = async (req, res) => {
	const { email, phone, school, dealId, lockOfferPrice, paymentMethod, totalPrice } = req.body;
	try {
		const deal = await Deal.findByPk(dealId);
		if (deal) {
			const newLockDeal = await LockDeal.create({
				email,
				phone,
				school,
				lockOfferPrice,
				totalPrice,
				paymentMethod,
				dealId
			});
			// handle offline payments
			if (paymentMethod === 'offline') {
				const { error } = await sendMail({ email, amount: lockOfferPrice });
				if (!error) {
					return res.status(201).json({ status: 201, data: newLockDeal });
				}
				return res.status(500).json({ status: 500, message: 'error sending mail' });
			}
			// handle online payments
			const { authorization_url } = await initPayment({ email, amount: lockOfferPrice * 100, phone });
			const resData = { ...newLockDeal.dataValues, payUrl: authorization_url };
			return res.status(201).json({ status: 201, data: resData });
		}
		return res.status(404).json({ status: 404, message: 'Deal does not exist' });
	} catch (error) {
		console.log(error);
		return res.status(500).json({ status: 500, message: 'Error adding lockdeal detail' });
	}
};

// confirms that a user payment was successful
const verifyPayment = async (req, res) => {
	const { reference } = req.params;
	try {
		const response = await confirmPayment(reference);
		if (response.status === 'success') {
			return res.status(200).json({ status: 200, message: 'confirmed' });
		}
		return res.status(500).json({ status: 500, message: 'Server error while confirming payment' });
	} catch (error) {
		if (error.response.status && error.response.status === 400) {
			return res.status(400).json({ status: 400, message: 'Error confirming payment' });
		}
		console.log(error);
		return res.status(500).json({ status: 500, message: 'Server error' });
	}
};

const getLockDeals = async (req, res) => {
	try {
		const lockDeals = await LockDeal.findAndCountAll({
			order: [['createdAt', 'DESC']]
		});
		const resData = {
			lockDeals: lockDeals.rows,
			count: lockDeals.count
		};
		return res.status(200).json({
			status: 200,
			data: resData
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({ status: 500, message: 'Error getting lockdeals' });
	}
};

module.exports = {
	addLockDeal,
	getLockDeals,
	verifyPayment
};
