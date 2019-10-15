module.exports = (sequelize, DataTypes) => {
	const Category = sequelize.define('Category', {
		id: {
			allowNull: false,
			primaryKey: true,
			type: DataTypes.STRING,
			defaultValue: DataTypes.UUIDV4
		},
		name: {
			allowNull: false,
			type: DataTypes.STRING
		},
		features: {
			allowNull: true,
			type: DataTypes.STRING
		}
	});
	Category.associate = models => {
		Category.hasMany(models.Deal, {
			foreignKey: 'categoryId',
			as: 'dealCategory',
			onDelete: 'cascade',
			hooks: true
		});
	};
	return Category;
};
