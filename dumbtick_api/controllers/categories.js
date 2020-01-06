const Model = require('../models');
const Categories = Model.categories;
const Users = Model.users;
const Events = Model.events;
const { events } = require('../helpers/functions');
exports.index = (req, res) => {
	Categories.findAll({
		attributes: {
			exclude: [ 'createdAt', 'updatedAt' ]
		}
	}).then((data) => res.send(data));
};

exports.eventAll = (req, res) => {
	const id = req.params.id;
	Events.findAll({
		attributes: {
			exclude: [ 'categoryid', 'createdAt', 'updatedAt' ]
		},
		include: [
			{
				model: Categories,
				as: 'category',
				attributes: {
					exclude: [ 'createdAt', 'updatedAt' ]
				},

				where: { id: id }
			},
			{
				model: Users,
				as: 'user',
				attributes: {
					exclude: [ 'password', 'createdAt', 'updatedAt' ]
				}
			}
		]
	})
		.then((data) => {
			if (data.length === null) {
				message = 'Data Not found';
				res.status(200).json(message);
			} else {
				Categories.findOne({
					where: { id: id },
					attributes: [ 'name' ]
				}).then((event) => {
					res.status(200).json(data);
				});
			}
		})
		.catch((error) => {
			message = 'Bad request';
			res.status(400).json(message);
		});
};

exports.show = (req, res) => {
	const id = req.params.id;
	Categories.findOne({
		attributes: {
			exclude: [ 'createdAt', 'updatedAt' ]
		},
		where: { id: id }
	}).then((data) => res.send(data));
};
