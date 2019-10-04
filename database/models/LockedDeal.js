module.exports = (sequelize, DataTypes) => {
	const LockedDeal = sequelize.define('LockedDeal', {
		id: {
			allowNull: false,
			primaryKey: true,
			type: DataTypes.STRING,
			defaultValue: DataTypes.UUIDV4
		},
		email: {
			allowNull: false,
			type: DataTypes.STRING
		},
		phone: {
			allowNull: false,
			type: DataTypes.STRING
		},
		school: {
			allowNull: false,
			type: DataTypes.STRING
		},
		totalPrice: {
			allowNull: false,
			type: DataTypes.INTEGER
		},
		lockOfferPrice: {
			allowNull: false,
			type: DataTypes.INTEGER
		},
		paymentMethod: {
			allowNull: false,
			type: DataTypes.ENUM(['online', 'offline'])
		},
		dealId: {
			allowNull: true,
			type: DataTypes.STRING
		}
	});
	LockedDeal.associate = models => {
		LockedDeal.belongsTo(models.Deal, {
			foreignKey: 'dealId'
		});
	};
	return LockedDeal;
};
