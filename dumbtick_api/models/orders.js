'use strict';
module.exports = (sequelize, DataTypes) => {
	const orders = sequelize.define(
		'orders',
		{
			buyerId: DataTypes.INTEGER,
			eventId: DataTypes.INTEGER,
			quantity: DataTypes.INTEGER,
			totalPrice: DataTypes.INTEGER,
			status: DataTypes.STRING
		},
		{}
	);
	orders.associate = function(models) {
		// associations can be defined here
		orders.belongsTo(models.users, {
			foreignKey: 'buyerId',
			as: 'buyer',
			sourceKey: 'id'
		});
		orders.belongsTo(models.events, {
			foreignKey: 'eventId',
			as: 'event',
			sourceKey: 'id'
		});
	};

	return orders;
};
