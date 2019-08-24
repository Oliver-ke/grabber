const { Deal } = require('../database/models');

const createDeal = async (req, res) => {
	const { price, discount, minRange, maxRange, disabled } = req.body;
	const { id: createdBy } = req.decoded;
	const deal = await Deal.create({ price, discount, minRange, maxRange, createdBy, disabled: disabled || false });

	return res.status(201).json({
		status: 201,
		message: 'Deal created',
		data: deal
	});
};

const getDeals = async (req, res) => {
	const deals = await Deal.findAndCountAll({
		order: [['createdAt', 'DESC']]
	});
	const resData = {
		deals: deals.rows,
		count: deals.count
	};
	return res.status(200).json({
		status: 200,
		data: resData
	});
};

const updateDeal = async (req, res) => {
	const { id } = req.params;
	const { price, discount, minRange, maxRange, disabled } = req.body;

	const deal = await Deal.findOne({ where: { id } });
	if (deal) {
		const update = await deal.update({
			price: price || deal.dataValues.price,
			discount: discount || deal.dataValues.discount,
			minRange: minRange || deal.dataValues.minRange,
			maxRange: maxRange || deal.dataValues.maxRange,
			disabled: disabled || deal.dataValues.disabled
		});
		return res.status(201).json({
			status: 201,
			message: 'Deal updated',
			data: update
		});
	}
	return res.status(404).json({
		status: 404,
		message: 'Deal no langer exist'
	});
};

const deleteDeal = async (req, res) => {
	const { id } = req.params;
	const deal = Deal.findOne({ where: { id } });
	await deal.update({ disable: true });

	return res.status(200).json({
		status: 200,
		message: 'Deal deleted successfully'
	});
};

module.exports = { createDeal, getDeals, deleteDeal, updateDeal };
