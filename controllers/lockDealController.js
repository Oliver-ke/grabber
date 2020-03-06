const moment = require('moment');
const { LockedDeal: LockDeal, Deal } = require('../database/models');
const { sendMail, payment: { verifyMonifyPayment } } = require('../utils');

const association = [
	{
		model: Deal,
		as: 'dealLocked',
		attributes: [ 'id', 'code', 'expiryDate' ]
	}
];

const addLockDeal = async (req, res) => {
	const { email, phone, school, dealId, lockOfferPrice, totalPrice, name } = req.body;
	try {
		const deal = await Deal.findByPk(dealId);
		if (deal) {
			const newLockDeal = {
				email,
				phone,
				school,
				lockOfferPrice,
				totalPrice,
				name,
				paymentMethod: 'pending',
				dealId
			};
			// verify that email does not exist or is expired
			const alreadyLocked = await LockDeal.findOne({ where: { email, expired: false, paid: true } });
			if (alreadyLocked) {
				return res.status(422).json({ status: 422, message: "you've already locked this offer" });
			}
			const savedData = await LockDeal.create(newLockDeal);
			return res.status(201).json({ status: 201, data: savedData.dataValues });
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
		const response = await verifyMonifyPayment(reference);
		// check status if  its true or false
		if (response && response.requestSuccessful === true && response.responseMessage === 'success') {
			// change paid to true
			const { customer: { email }, metaData: { lockOfferPrice, totalPrice, name } } = response.responseBody;
			const lockedDeal = await LockDeal.findOne({
				where: { email: email, expired: false }
			});
			// // set expiry date and others
			if (!lockedDeal.expiresAt) {
				const expiresAt = moment().add(45, 'days');
				await lockedDeal.update({ paid: true, expiresAt, paymentMethod: 'online' });
				// send mail here
				await sendMail({ email, lockOfferPrice, totalPrice, name });
			}
			return res.status(200).json({ status: 200, message: 'confirmed', ...response });
		}
		return res.status(500).json({ status: 500, message: 'Server error while confirming payment' });
	} catch (error) {
		if (error.code === 'ENOTFOUND') {
			return res.status(500).json({ status: 500, message: 'No network Connection' });
		}
		if (error.response && error.response.status === 400) {
			return res.status(400).json({ status: 400, message: 'Error confirming payment' });
		}
		return res.status(500).json({ status: 500, message: 'Server error' });
	}
};

const getLockDeals = async (req, res) => {
	try {
		const lockDeals = await LockDeal.findAndCountAll({
			order: [ [ 'createdAt', 'DESC' ] ],
			include: association
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

// update a lockedDeal, like change paid status
const updateLockDeal = async (req, res) => {
	const { id } = req.params;
	const { paid } = req.body;
	try {
		const lockDeal = await LockDeal.findByPk(id);
		if (!lockDeal) {
			return res.status(404).json({ status: 404, message: 'LockedDeal does not exit' });
		}
		const update = await lockDeal.update({ paid });
		return res.status(200).json({ status: 200, data: update });
	} catch (error) {
		console.log(error);
		return res.status(500).json({ status: 500, message: 'Server error' });
	}
};

// delete a lockedDeal
const deleteLockDeal = async (req, res) => {
	const { id } = req.params;
	try {
		await LockDeal.destroy({ where: { id } });
		return res.status(200).json({ status: 200, message: 'item deleted' });
	} catch (error) {
		console.log(error);
		return res.status(500).json({ status: 500, message: 'error deleting item' });
	}
};

module.exports = {
	addLockDeal,
	getLockDeals,
	verifyPayment,
	deleteLockDeal,
	updateLockDeal
};
