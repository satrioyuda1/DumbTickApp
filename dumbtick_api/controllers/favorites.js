const Events = require('../models').events;
const Categories = require('../models').categories;
const Users = require('../models').users;
const Favorites = require('../models').favorites;

exports.addFavorite = (req, res) => {
	let request = {
		userId: req.userId,
		eventId: req.body.eventId
	};
	Events.findOne({
		where: { id: req.params.id }
	})
		.then((event) => {
			if (event === null) {
				res.status(404).json({
					message: 'Event not found'
				});
			} else {
				Favorites.findOne({
					where: { userId: req.userId, eventId: req.body.eventId }
				}).then((favorites) => {
					if (favorites === null) {
						Favorites.create(request).then((response) => {
							res.status(200).json({
								message: 'Following success',
								response
							});
						});
					} else {
						res.status(404).json({
							error: true,
							message: 'You have favorites this event'
						});
					}
				});
			}
		})
		.catch((err) => {
			res.status(500).json({
				message: err.message
			});
		});
};
