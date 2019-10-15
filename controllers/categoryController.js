const { Category } = require('../database/models');
const sequelize = require('sequelize');

// controller for adding category
const addCategory = async (req, res) => {
	const { name, features } = req.body;
	try {
		const newCategory = await Category.create({ name, features });
		return res.status(201).json({ status: 201, data: newCategory, message: 'Category created' });
	} catch (error) {
		console.log(error);
		return res.status(500).json({ status: 500, message: 'server error' });
	}
};

// controller to get all categories
const getCategories = async (req, res) => {
	try {
		const categories = await Category.findAll({
			order: [['createdAt', 'DESC']]
		});
		// const resData = {
		// 	deals: deals.rows
		// };
		return res.status(200).json({
			status: 200,
			data: categories
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json({ status: 500, messgae: 'error getting categories' });
	}
};

const updateCategory = async (req, res) => {
	const { id } = req.params;
	const { features, name } = req.body;
	try {
		const category = await Category.findByPk(id);
		if (!category) {
			return res.status(404).json({ status: 404, message: 'category does not exist' });
		}
		const update = await category.update({
			features: features || category.dataValues.features,
			name: name || category.dataValues.name
		});
		return res.status(200).json({ status: 200, messgae: 'category updated', data: update });
	} catch (error) {
		console.log(error);
		return res.status(500).json({ status: 500, message: 'error updating category' });
	}
};

const deleteCategory = async (req, res) => {
	const { id } = req.params;
	try {
		await Category.destroy({ where: { id } });
		return res.status(200).json({ status: 200, message: 'Category deleted' });
	} catch (error) {
		console.log(error);
		return res.status(500).json({ status: 500, message: 'server error' });
	}
};

module.exports = {
	addCategory,
	getCategories,
	updateCategory,
	deleteCategory
};
