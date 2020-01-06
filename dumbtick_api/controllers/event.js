const Events = require('../models').events;
const Categories = require('../models').categories;
const Users = require('../models').users;
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const { events, formatRupiah, formatDate } = require('../helpers/functions');

exports.list = (req, res) => {
	Events.findAll({
		attributes: [ 'id', 'title', 'description', 'price', 'startTime', 'image' ]
	}).then((data) => {
		res.send(data);
	});
};

exports.search = (req, res) => {
	console.log(req.query);

	Events.findAll({
		where: {
			[Op.or]: [
				{
					title: {
						[Op.like]: `%${req.query.title}%`
					}
				},
				{
					startTime: {
						[Op.substring]: req.query.startTime
					}
				}
			]
		},
		attributes: {
			exclude: [ 'createdBy' ]
		}
	}).then((data) => {
		if (data.length > 0) {
			res.status(200).json(data);
		} else {
			res.status(200).json({
				success: false,
				message: 'event not founds'
			});
		}
	});
};

exports.detail = (req, res) => {
	const id = req.params.id;
	Events.findOne({
		where: { id: id },
		include: [
			{
				model: Categories,
				as: 'category',
				attributes: [ 'id', 'name' ]
			},
			{
				model: Users,
				as: 'user'
			}
		]
	}).then((data) => {
		if (data === null) {
			res.status(200).json({
				message: 'event not found'
			});
		} else {
			console.log(data);
			res.status(200).json({
				id: data.id,
				title: data.title,
				category_name: data.category.name,
				category: {
					id: data.category.id,
					name: data.category.name
				},
				startTime: formatDate(data.startTime),
				endTime: formatDate(data.endTime),
				price: formatRupiah(data.price),
				description: data.description,
				address: data.address,
				urlMaps: data.urlMap,
				img: data.image,
				id: data.user.id,
				userName: data.user.name,
				name: data.user.name,
				phoneNumber: data.user.phone,
				email: data.user.email,
				image: data.user.image
			});
		}
	});
};

exports.save = (req, res) => {
	let trimTitle;
	const { createdBy, title, categoryId, startTime, endTime, description, image, price, address, urlMap } = req.body;
	trimTitle = title.trim();
	Events.findAll({
		where: { title: trimTitle }
	})
		.then((response) => {
			if (response.length > 0) {
				res.status(403).json({
					message: 'Title already used'
				});
				
			} else {
				Events.create({
					createdBy: req.userId,
					title: trimTitle,
					categoryId,
					startTime,
					endTime,
					description,
					image,
					price,
					address,
					urlMap
				}).then((data) => {
					console.log(data);
					Categories.findOne({
						where: {
							id: data.categoryId
						}
					}).then((category) => {
						Users.findOne({
							where: {
								id: data.createdBy
							}
						}).then((user) => {
							res.status(200).json({
								id: data.id,
								title: data.title,
								categoryId: data.categoryId,
								startTime: formatDate(data.startTime),
								endTime: formatDate(data.endTime),
								description: data.description,
								image: data.image,
								price: data.price,
								address: data.address,
								urlMap: data.urlMap
							});
						});
					});
				});
			}
		})
		.catch((err) => {
			res.status(500).json({
				message: err.message
			});
		});
};

exports.update = (req, res) => {
	// const { createdBy, title, categoryId, startTime, endTime, description, image, price, address, urlMap } = req.body;

	// console.log(id);
	Events.findOne({
		where: { id: req.params.id }
	})
		.then((event) => {
			if (event === null) {
				res.status(404).json({
					message: 'Event not found'
				});
			} else {
				if (event.createdBy !== req.userId) {
					res.status(403).json({
						message: 'Unathorized for update event'
					});
				} else {
					Events.update(req.body, {
						where: {
							id: req.params.id
						}
					}).then((data) => {
						if (data === 0) {
							res.status(200).json({
								message: 'update event failed'
							});
						} else {
							Events.findOne({
								where: { id: req.params.id, createdBy: req.userId }
							}).then((response) => {
								res.status(200).json({
									message: 'update event succsess',
									response
								});
							});
						}
					});
				}
			}
		})
		.catch((err) => {
			res.status(500).json({
				message: err.message
			});
		});
};

exports.delete = (req, res) => {
	const id = req.params.id;
	Events.findOne({
		where: { id: id }
	})
		.then((response) => {
			if (response === null) {
				res.status(200).json({
					message: 'Event not found'
				});
			} else {
				if (response.createdBy !== req.userId) {
					res.status(403).json({
						message: 'not authorized'
					});
				} else {
					Events.destroy({
						where: { id: id }
					}).then((data) => {
						if (data === null) {
							res.status(200).json({
								message: 'deleted failed'
							});
						} else {
							res.status(200).json({
								succsess: true,
								message: 'deleted data success'
							});
						}
					});
				}
			}
		})
		.catch((err) => {
			res.status(500).json({
				message: err.message
			});
		});
};

exports.today = (req, res) => {
	let message = '';

	let today = new Date();
	let dd = String(today.getDate()).padStart(2, '0');
	let mm = String(today.getMonth() + 1).padStart(2, '0');
	let yyyy = today.getFullYear();

	today = yyyy + '-' + mm + '-' + dd;

	Events.findAll({
		attributes: {
			exclude: [ 'category_id', 'creator_user_id', 'createdAt', 'updatedAt' ]
		},
		include: [
			{
				model: Categories,
				as: 'category',
				attributes: {
					exclude: [ 'createdAt', 'updatedAt' ]
				}
			},
			{
				model: Users,
				as: 'user',
				attributes: {
					exclude: [ 'password', 'createdAt', 'updatedAt' ]
				}
			}
		],
		where: {
			startTime: {
				[Op.substring]: today
			}
			// start_time: today
		}
	})
		.then((data) => {
			if (data.length === null) {
				res.status(200).json({ message: 'Data Not found' });
			} else {
				res.status(200).json(data);
			}
		})
		.catch((error) => {
			message = 'Bad request';
			res.status(400).json({ message });
		});
};

exports.upcomingEvent = (req, res) => {
	let today = new Date();
	let date = new Date(today);
	date.setDate(today.getDate() + 1);

	let dd = String(date.getDate()).padStart(2, '0');
	let mm = String(date.getMonth() + 1).padStart(2, '0');
	let yyyy = date.getFullYear();

	date = yyyy + '-' + mm + '-' + dd;

	Events.findAll({
		attributes: {
			exclude: [ 'category_id', 'creator_user_id', 'createdAt', 'updatedAt' ]
		},
		include: [
			{
				model: Categories,
				as: 'category',
				attributes: {
					exclude: [ 'createdAt', 'updatedAt' ]
				}
			},
			{
				model: Users,
				as: 'user',
				attributes: {
					exclude: [ 'password', 'createdAt', 'updatedAt' ]
				}
			}
		],
		where: {
			startTime: {
				[Op.substring]: date
			}
			// start_time: today
		}
	})
		.then((data) => {
			if (data.length === null) {
				res.status(200).json({ message: 'Data Not found' });
			} else {
				res.status(200).json(data);
			}
		})
		.catch((error) => {
			message = 'Bad request';
			res.status(400).json({ message });
		});
};
