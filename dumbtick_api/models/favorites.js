'use strict';
module.exports = (sequelize, DataTypes) => {
	const favorites = sequelize.define(
		'favorites',
		{
			userId: DataTypes.INTEGER,
			eventId: DataTypes.INTEGER
		},
		{}
	);
	favorites.associate = function(models) {
		// associations can be defined here
		favorites.belongsTo(models.users, {
			foreignKey: 'userId',
			sourceKey: 'id'
		});
		favorites.belongsTo(models.events, {
			foreignKey: 'eventId',
			sourceKey: 'id'
		});
	};
	return favorites;
};
