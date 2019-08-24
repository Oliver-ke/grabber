const bcrypt = require('bcrypt');
module.exports = (sequelize, DataTypes) => {
	const User = sequelize.define(
		'User',
		{
			id: {
				allowNull: false,
				primaryKey: true,
				type: DataTypes.STRING,
				defaultValue: DataTypes.UUIDV4
			},
			fullName: {
				allowNull: false,
				type: DataTypes.STRING
			},
			email: {
				allowNull: false,
				unique: true,
				type: DataTypes.STRING
			},
			password: {
				allowNull: false,
				type: DataTypes.STRING
			}
		},
		{
			hooks: {
				beforeCreate: user => user.password && user.hashPassword(),
				beforeUpdate: user => user.password && user.hashPassword()
			}
		}
	);
	User.associate = models => {
		User.hasMany(models.Deal, {
			foreignKey: 'createdBy'
		});
	};

	User.prototype.hashPassword = async function hashPassword() {
		const saltRounds = 10;
		this.password = await bcrypt.hash(this.password, saltRounds);
		return this.password;
	};

	User.prototype.validPassword = function validPassword(password) {
		return bcrypt.compare(password, this.password);
	};

	return User;
};

// remember to add hasing hooks for password
