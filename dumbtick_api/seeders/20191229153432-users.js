'use strict';

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.bulkInsert(
			'users',
			[
				{
					name: 'dimas',
					email: 'dimas@gmail.com',
					phone: '081373491408',
					username: 'dimasbaik',
					password: '12345',
					image: 'https://via.placeholder.com/150',
					role: 'user',
					createdAt: new Date(),
					updatedAt: new Date()
				}
			],
			{}
		);
	},

	down: (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete('users', null, {});
	}
};
