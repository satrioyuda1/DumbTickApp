'use strict';

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.bulkInsert(
			'events',
			[
				{
					title: 'Raisa',
					categoryId: 1,
					startTime: new Date(),
					endTime: new Date(),
					price: 20000,
					description: 'horeeeee',
					address: 'tangsel',
					urlMap: 'http:',
					image: 'https://via.placeholder.com/150',
					createdBy: 2,
					createdAt: new Date(),
					updatedAt: new Date()
				}
			],
			{}
		);
	},

	down: (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete('events', null, {});
	}
};
