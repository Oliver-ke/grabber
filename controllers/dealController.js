const { Deal, Category } = require('../database/models');
const sequelize = require('sequelize');
const { getRandomNum, generateCode } = require('../utils');
const { eq } = sequelize.Op;

const association = [
	{
		model: Category,
		as: 'dealCategory',
		attributes: [ 'id', 'name', 'features' ],
	},
];

const createDeal = async (req, res) => {
	const {
		price,
		discount,
		implementationCost,
		implementationDiscount,
		minRange,
		maxRange,
		categoryId,
		fixed,
	} = req.body;
	const { id: createdBy } = req.decoded;
	try {
		const category = await Category.findByPk(categoryId);
		if (!category) {
			return res.status(404).json({ status: 404, message: 'No category with the given categoryId' });
		}
		const deal = await Deal.create({
			price,
			discount,
			implementationCost,
			implementationDiscount,
			minRange,
			maxRange,
			createdBy,
			fixed: fixed || false,
			categoryId,
			code: generateCode(),
		});
		const dealCategory = {
			name: category.dataValues.name,
			features: category.dataValues.features,
			id: category.dataValues.id,
		};
		const resData = { ...deal.dataValues, dealCategory };
		return res.status(201).json({
			status: 201,
			message: 'Deal created',
			data: resData,
		});
	} catch (err) {
		console.log(err);
		return res.status(500).json({
			status: 500,
			message: 'Error creating deal, please ensure valid input',
		});
	}
};

const getDeals = async (req, res) => {
	const deals = await Deal.findAndCountAll({
		order: [ [ 'createdAt', 'DESC' ] ],
		include: association,
	});
	const resData = {
		deals: deals.rows,
		count: deals.count,
	};
	return res.status(200).json({
		status: 200,
		data: resData,
	});
};

const updateDeal = async (req, res) => {
	const { id } = req.params;
	const {
		price,
		discount,
		minRange,
		maxRange,
		categoryId,
		fixed,
		implementationCost: impCost,
		implementationDiscount: impDiscount,
	} = req.body;

	const deal = await Deal.findOne({ where: { id } });
	if (deal) {
		const update = await deal.update({
			price: price || deal.dataValues.price,
			discount: discount || deal.dataValues.discount,
			minRange: minRange || deal.dataValues.minRange,
			maxRange: maxRange || deal.dataValues.maxRange,
			categoryId: categoryId || deal.dataValues.categoryId,
			implementationCost: impCost || deal.dataValues.implementationCost,
			implementationDiscount: impDiscount || deal.dataValues.implementationDiscount,
			fixed: fixed,
		});
		return res.status(201).json({
			status: 201,
			message: 'Deal updated',
			data: update,
		});
	}
	return res.status(404).json({
		status: 404,
		message: 'Deal no langer exist',
	});
};

const deleteDeal = async (req, res) => {
	const { id } = req.params;
	await Deal.destroy({ where: { id } });
	return res.status(200).json({
		status: 200,
		message: 'Deal deleted successfully',
	});
};

const requestDiscount = async (req, res) => {
	const { studentMax, studentMin, categoryId } = req.query;
	const deal = await Deal.findOne({
		where: {
			categoryId: categoryId,
			minRange: {
				[eq]: parseInt(studentMin),
			},
			maxRange: {
				[eq]: parseInt(studentMax),
			},
		},
	});

	if (deal) {
		const { discount: realDiscount, fixed, implementationDiscount: impDiscount, ...filtered } = deal.dataValues;

		const givenDiscount = fixed ? realDiscount : getRandomNum(realDiscount / 2, realDiscount);

		const givenImpDiscount = fixed ? impDiscount : getRandomNum(impDiscount / 2, impDiscount);

		const resData = { ...filtered, discount: givenDiscount, fixed, implementationDiscount: givenImpDiscount };
		return res.status(200).json({
			status: 200,
			data: resData,
		});
	}
	return res.status(404).json({ status: 404, message: 'No discount for the given range' });
};

const getCategoryDeals = async (req, res) => {
	const { categoryId } = req.query;
	try {
		const deals = await Deal.findAll({
			where: { categoryId },
			include: association,
		});
		if (deals) {
			return res.status(200).json({
				status: 200,
				data: deals,
			});
		}
	} catch (error) {
		console.log(error.message);
		return res.status(404).json({
			status: 404,
			message: `Category ${categoryId} does not exist`,
		});
	}
	return res.status(404).json({
		status: 404,
		message: 'No deal for the given categoryId',
	});
};
module.exports = {
	createDeal,
	getDeals,
	deleteDeal,
	updateDeal,
	requestDiscount,
	getCategoryDeals,
};
