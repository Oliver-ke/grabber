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
			unique: true,
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
		paid: {
			type: DataTypes.BOOLEAN,
			defaultValue: false
		},
		paymentMethod: {
			allowNull: false,
			type: DataTypes.ENUM([ 'online', 'offline', 'pending' ])
		},
		expired: {
			type: DataTypes.BOOLEAN,
			defaultValue: false
		},
		expiresAt: {
			allowNull: true,
			type: DataTypes.DATE
		},
		dealId: {
			allowNull: true,
			type: DataTypes.STRING
		}
	});
	LockedDeal.associate = (models) => {
		LockedDeal.belongsTo(models.Deal, {
			foreignKey: 'dealId',
			as: 'dealLocked'
		});
	};
	return LockedDeal;
};
