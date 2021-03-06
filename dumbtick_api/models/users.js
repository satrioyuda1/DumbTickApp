'use strict';
module.exports = (sequelize, DataTypes) => {
	const users = sequelize.define(
		'users',
		{
			name: DataTypes.STRING,
			email: DataTypes.STRING,
			phone: DataTypes.STRING,
			username: DataTypes.STRING,
			password: DataTypes.STRING,
			image: DataTypes.STRING,
			role: DataTypes.STRING
		},
		{}
	);
	users.associate = function(models) {
		// associations can be defined here
		users.hasMany(models.events, {
			as: 'user',
			foreignKey: 'createdBy'
		});
		users.hasMany(models.orders, {
			as: 'buyer',
			foreignKey: 'buyerId'
		});
	};
	return users;
};
