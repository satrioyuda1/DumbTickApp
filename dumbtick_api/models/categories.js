'use strict';
module.exports = (sequelize, DataTypes) => {
	const categories = sequelize.define(
		'categories',
		{
			name: DataTypes.STRING,
			image: DataTypes.STRING
		},
		{}
	);
	categories.associate = function(models) {
		// associations can be defined here
		categories.hasMany(models.events, {
			as: 'category',
			foreignKey: 'categoryId'
		});
	};
	return categories;
};
