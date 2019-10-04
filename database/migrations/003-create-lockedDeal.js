module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('LockedDeals', {
			id: {
				allowNull: false,
				primaryKey: true,
				type: Sequelize.STRING,
				defaultValue: Sequelize.UUIDV4
			},
			email: {
				type: Sequelize.STRING,
				allowNull: false
			},
			phone: {
				type: Sequelize.STRING,
				allowNull: false
			},
			school: {
				type: Sequelize.STRING,
				allowNull: false
			},
			totalPrice: {
				type: Sequelize.INTEGER,
				allowNull: false
			},
			lockOfferPrice: {
				type: Sequelize.INTEGER,
				allowNull: false
			},
			paymentMethod: {
				type: Sequelize.ENUM(['online', 'offline']),
				allowNull: false
			},
			dealId: {
				type: Sequelize.STRING,
				allowNull: true,
				references: {
					model: 'Deals',
					key: 'id'
				},
				onUpdate: 'CASCADE',
				onDelete: 'SET NULL'
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
		return queryInterface.dropTable('LockedDeals');
	}
};
