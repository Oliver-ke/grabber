const { Deal } = require('../database/models');
const sequelize = require('sequelize');
const { generateRandom } = require('../utils');
const { eq } = sequelize.Op;

const createDeal = async (req, res) => {
	const {
		price,
		discount,
		implementationCost,
		implementationDiscount,
		minRange,
		maxRange,
		category,
		fixed
	} = req.body;
	const { id: createdBy } = req.decoded;
	try {
		const deal = await Deal.create({
			price,
			discount,
			implementationCost,
			implementationDiscount,
			minRange,
			maxRange,
			createdBy,
			fixed: fixed || false,
			category
		});
		return res.status(201).json({
			status: 201,
			message: 'Deal created',
			data: deal
		});
	} catch (err) {
		console.log(err);
		return res.status(500).json({
			status: 500,
			message: 'Error creating deal, please ensure valid input'
		});
	}
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
	const {
		price,
		discount,
		minRange,
		maxRange,
		category,
		fixed,
		implementationCost: impCost,
		implementationDiscount: impDiscount
	} = req.body;

	const deal = await Deal.findOne({ where: { id } });
	if (deal) {
		const update = await deal.update({
			price: price || deal.dataValues.price,
			discount: discount || deal.dataValues.discount,
			minRange: minRange || deal.dataValues.minRange,
			maxRange: maxRange || deal.dataValues.maxRange,
			category: category || deal.dataValues.category,
			implementationCost: impCost || deal.dataValues.implementationCost,
			implementationDiscount: impDiscount || deal.dataValues.implementationDiscount,
			fixed: fixed
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
	await Deal.destroy({ where: { id } });
	return res.status(200).json({
		status: 200,
		message: 'Deal deleted successfully'
	});
};

const requestDiscount = async (req, res) => {
	const { studentMax, studentMin, category } = req.query;
	const deal = await Deal.findOne({
		where: {
			category: category,
			minRange: {
				[eq]: parseInt(studentMin)
			},
			maxRange: {
				[eq]: parseInt(studentMax)
			}
		}
	});

	if (deal) {
		const { discount: realDiscount, fixed, implementationDiscount: impDiscount, ...filtered } = deal.dataValues;

		const givenDiscount = fixed ? realDiscount : generateRandom(realDiscount / 2, realDiscount);

		const givenImpDiscount = fixed ? impDiscount : generateRandom(impDiscount / 2, impDiscount);

		const resData = { ...filtered, discount: givenDiscount, fixed, implementationDiscount: givenImpDiscount };
		return res.status(200).json({
			status: 200,
			data: resData
		});
	}
	return res.status(404).json({ status: 404, message: 'No discount for the given range' });
};

const getCategoryDeals = async (req, res) => {
	const { category } = req.query;
	try {
		const deals = await Deal.findAll({
			where: { category }
		});
		if (deals) {
			return res.status(200).json({
				status: 200,
				data: deals
			});
		}
	} catch (error) {
		console.log(error.message);
		return res.status(404).json({
			status: 404,
			message: `Category ${category} does not exist`
		});
	}
	return res.status(404).json({
		status: 404,
		message: 'No deal for the given category'
	});
};
module.exports = {
	createDeal,
	getDeals,
	deleteDeal,
	updateDeal,
	requestDiscount,
	getCategoryDeals
};
