const Events = require('../models').events;
const Categories = require('../models').categories;
const Users = require('../models').users;
const Orders = require('../models').orders;
const { newPayments, formatDate, formatRupiah } = require('../helpers/functions');

exports.addOrder = (req, res) => {
	Events.findOne({
		where: { id: req.body.eventId },
		include: [
			{
				model: Categories,
				as: 'category'
			},
			{
				model: Users,
				as: 'user'
			}
		]
	})
		.then((event) => {
			if (event === null) {
				res.status(404).json({
					message: 'data not found'
				});
			} else {
				const { quantity, eventId } = req.body;
				const status = 'pending';
				Orders.create({
					quantity: quantity,
					totalPrice: quantity * event.price,
					status: status,
					eventId: eventId,
					buyerId: req.userId
				}).then((data) => {
					if (data === 0) {
						res.status(500).json({
							message: 'order failed'
						});
					} else {
						console.log(data);

						res.status(200).json({
							succsess: true,
							id: data.id,
							event: {
								id: event.id,
								title: event.title,
								category: {
									id: event.category.id,
									name: event.category.name
								},
								startTime: formatDate(event.startTime),
								endTime: formatDate(event.endTime),
								price: formatRupiah(event.price),
								description: event.description,
								address: event.address,
								urlMaps: event.urlMap,
								img: event.image,
								createdBy: {
									id: event.user.id,
									name: event.user.name,
									phoneNumber: event.user.phone,
									email: event.user.email,
									img: event.user.image
								}
							},
							quantity: data.quantity,
							totalPrice: data.totalPrice,
							status: data.status
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

exports.pendingOrder = (req, res) => {
	const status = 'pending';
	Orders.findAll({
		where: { buyerId: req.userId, status: status },
		include: [
			{
				model: Events,
				as: 'event',
				include: [
					{
						model: Categories,
						as: 'category'
					},
					{
						model: Users,
						as: 'user'
					}
				]
			},
			{
				model: Users,
				as: 'buyer'
			}
		]
	})
		.then((orders) => {
			if (Orders === null) {
				res.status(404).json({
					message: 'data not found'
				});
			} else {
				res.status(200).json(orders);
			}
		})
		.catch((err) => {
			res.status(500).json({
				message: err.message
			});
		});
};

exports.confirmOrder = (req, res) => {
	const status = 'confirm';
	Orders.findOne({
		where: { id: req.params.id }
	})
		.then((orders) => {
			if (Orders === null) {
				res.status(404).json({
					message: 'data not found'
				});
			} else {
				Orders.update(
					{
						status: status
					},
					{
						where: { id: req.params.id }
					}
				).then((order) => {
					if (order === 0) {
						res.status(200).json({
							message: 'failed update order'
						});
					} else {
						Events.findOne({
							where: {
								id: orders.eventId
							},
							include: [
								{
									model: Categories,
									as: 'category'
								},
								{
									model: Users,
									as: 'user'
								}
							]
						}).then((event) => {
							console.log(order);

							res.status(200).json({
								id: event.id,
								event: {
									id: event.id,
									title: event.title,
									category: {
										id: event.category.id,
										name: event.category.name
									},
									startTime: formatDate(event.startTime),
									endTime: formatDate(event.endTime),
									price: formatRupiah(event.price),
									description: event.description,
									address: event.address,
									urlMaps: event.urlMap,
									img: event.image,
									createdBy: {
										id: event.user.id,
										name: event.user.name,
										phoneNumber: event.user.phone,
										email: event.user.email,
										img: event.user.image
									}
								},
								quantity: orders.quantity,
								totalPrice: formatRupiah(orders.totalPrice),
								status: status
							});
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

exports.deleteOrder = (req, res) => {
	Orders.findOne({ where: { id: req.params.id } })
		.then((order) => {
			if (order === null) {
				res.status(404).json({
					message: 'data not found'
				});
			} else {
				if (order.buyerId !== req.userId) {
					res.status(403).json({
						message: 'not authorized'
					});
				} else {
					Orders.destroy({
						where: { id: req.params.id }
					}).then((data) => {
						if (data === 0) {
							res.status(200).json({
								message: 'failed delete order'
							});
						} else {
							res.status(200).json({
								message: 'sucsess delete order'
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

exports.orderPending = (req, res) => {
	const id = req.params.id;
	Orders.findOne({
		where: { id: id, status: 'pending' },
		include: [
			{
				model: Events,
				as: 'event',
				include: [
					{
						model: Categories,
						as: 'category'
					},
					{
						model: Users,
						as: 'user'
					}
				]
			},
			{
				model: Users,
				as: 'buyer'
			}
		]
	}).then((data) => {
		if (data === null) {
			res.status(200).json({
				message: 'data not found'
			});
		} else {
			console.log(data);
			res.status(200).json(data);
		}
	});
};

exports.orderApproved = (req, res) => {
	const status = 'approved';
	Orders.findAll({
		where: { buyerId: req.userId, status: status },
		include: [
			{
				model: Events,
				as: 'event',
				include: [
					{
						model: Categories,
						as: 'category'
					},
					{
						model: Users,
						as: 'user'
					}
				]
			},
			{
				model: Users,
				as: 'buyer'
			}
		]
	})
		.then((orders) => {
			if (Orders === null) {
				res.status(404).json({
					message: 'data not found'
				});
			} else {
				res.status(200).json(orders);
			}
		})
		.catch((err) => {
			res.status(500).json({
				message: err.message
			});
		});
};
