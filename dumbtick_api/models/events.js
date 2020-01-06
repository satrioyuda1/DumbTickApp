'use strict';
module.exports = (sequelize, DataTypes) => {
	const events = sequelize.define(
		'events',
		{
			title: DataTypes.STRING,
			categoryId: DataTypes.STRING,
			startTime: DataTypes.DATE,
			endTime: DataTypes.DATE,
			price: DataTypes.INTEGER,
			description: DataTypes.TEXT,
			address: DataTypes.STRING,
			urlMap: DataTypes.STRING,
			image: DataTypes.STRING,
			createdBy: DataTypes.INTEGER
		},
		{}
	);
	events.associate = function(models) {
		// associations can be defined here
		events.belongsTo(models.categories, {
			foreignKey: 'categoryId',
			sourceKey: 'id',
			as: 'category'
		});
		events.belongsTo(models.users, {
			foreignKey: 'createdBy',
			sourceKey: 'id'
		});
		events.hasMany(models.orders, {
			foreignKey: 'eventId',
			as: 'event'
		});
	};
	return events;
};
