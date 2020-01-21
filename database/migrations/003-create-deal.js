module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('Deals', {
			id: {
				allowNull: false,
				primaryKey: true,
				type: Sequelize.STRING,
				defaultValue: Sequelize.UUIDV4,
			},
			price: {
				type: Sequelize.FLOAT,
				allowNull: false,
			},
			discount: {
				type: Sequelize.FLOAT,
				allowNull: false,
			},
			implementationCost: {
				allowNull: false,
				type: Sequelize.FLOAT,
			},
			implementationDiscount: {
				allowNull: false,
				type: Sequelize.FLOAT,
			},
			minRange: {
				type: Sequelize.INTEGER,
				allowNull: false,
			},
			maxRange: {
				type: Sequelize.INTEGER,
				allowNull: false,
			},
			categoryId: {
				type: Sequelize.STRING,
				allowNull: true,
				references: {
					model: 'Categories',
					key: 'id',
				},
				onUpdate: 'CASCADE',
				onDelete: 'SET NULL',
			},
			discountFixed: {
				type: Sequelize.BOOLEAN,
				defaultValue: false,
			},
			implementationFixed: {
				type: Sequelize.BOOLEAN,
				defaultValue: false,
			},
			expiryDate: {
				type: Sequelize.DATE,
				allowNull: true,
			},
			code: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			createdBy: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('Deals');
	},
};
