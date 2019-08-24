module.exports = (sequelize, DataTypes) => {
	const Deal = sequelize.define('Deal', {
		id: {
			allowNull: false,
			primaryKey: true,
			type: DataTypes.STRING,
			defaultValue: DataTypes.UUIDV4
		},
		price: {
			allowNull: false,
			type: DataTypes.FLOAT
		},
		discount: {
			allowNull: false,
			type: DataTypes.FLOAT
		},
		minRange: {
			allowNull: false,
			type: DataTypes.INTEGER
		},
		maxRange: {
			allowNull: false,
			type: DataTypes.INTEGER
		},
		disabled: {
			type: DataTypes.BOOLEAN,
			defaultValue: false
		},
		createdBy: {
			allowNull: false,
			type: DataTypes.STRING
		}
	});
	Deal.associate = models => {
		Deal.belongsTo(models.User, {
			foreignKey: 'createdBy'
		});
	};
	return Deal;
};

// remember to add hashing hooks for password
