module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('Deals', {
			id: {
				allowNull: false,
				primaryKey: true,
				type: Sequelize.STRING,
				defaultValue: Sequelize.UUIDV4
			},
			price: {
				type: Sequelize.FLOAT,
				allowNull: false
			},
			discount: {
				type: Sequelize.FLOAT,
				allowNull: false
			},
			minRange: {
				type: Sequelize.INTEGER,
				allowNull: false
			},
			maxRange: {
				type: Sequelize.INTEGER,
				allowNull: false
			},
			disabled: {
				type: Sequelize.BOOLEAN,
				defaultValue: false
			},
			createdBy: {
				type: Sequelize.STRING,
				allowNull: false
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE
			}
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('Deals');
	}
};
