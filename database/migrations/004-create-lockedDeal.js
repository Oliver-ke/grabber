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
			name: {
				allowNull: false,
				type: Sequelize.STRING
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
			paid: {
				type: Sequelize.BOOLEAN,
				defaultValue: false
			},
			paymentMethod: {
				type: Sequelize.ENUM([ 'online', 'offline', 'pending' ]),
				allowNull: false
			},
			expired: {
				type: Sequelize.BOOLEAN,
				defaultValue: false
			},
			expiresAt: {
				allowNull: true,
				type: Sequelize.DATE
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
