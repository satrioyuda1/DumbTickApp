const jwt = require('jsonwebtoken');
const User = require('../models').users;

exports.signUp = (req, res) => {
	const { username, email } = req.body;
	User.findAll({
		where: { username }
	}).then((user) => {
		if (user.length > 0) {
			res.status(500).json({
				error: true,
				message: 'username already regsistered'
			});
		} else {
			User.findAll({
				where: { email }
			})
				.then((user) => {
					if (user.length > 0) {
						res.status(500).json({
							error: true,
							message: 'email has been registered'
						});
					} else {
						User.create({
							name: req.body.name,
							username: req.body.username,
							email: req.body.email,
							password: req.body.password,
							role: req.body.role
						}).then((user) => {
							const token = jwt.sign({ id: user.id, username: user.username }, 'kuncirahasia');
							res.status(201).json({
								message: `Success Sign Up New User`,
								token
							});
						});
					}
				})
				.catch((err) => {
					rest.status(500).json({
						message: err.message
					});
				});
		}
	});
};

exports.login = (req, res) => {
	const { email, password } = req.body;
	User.findOne({
		where: { email, password }
	})
		.then((user) => {
			if (user) {
				const token = jwt.sign({ id: user.id, email: user.email }, 'kuncirahasia');
				if (token) {
					res.status(200).json({
						success: true,
						message: 'success login',
						userId: user.id,
						email: user.email,
						token
					});
				}
			} else {
				res.status(401).json({
					error: true,
					message: 'Wrong email or password'
				});
			}
		})
		.catch((err) => {
			res.status(401).json({
				meesage: err.message
			});
		});
};

exports.showProfile = (req, res) => {
	User.findOne({
		where: { id: req.userId },
		attributes: { exclude: [ 'password', 'createdAt', 'updatedAt' ] }
	}).then((data) => res.send(data));
};

exports.edit = (req, res) => {
	User.findOne({
		where: { id: req.userId }
	})
		.then((user) => {
			if (User === null) {
				res.status(404).json({
					message: 'User not found'
				});
			} else {
				User.update(
					{
						name: req.body.name,
						email: req.body.email,
						phone: req.body.phone,
						image: req.body.image
					},
					{
						where: { id: req.userId }
					}
				).then((edit) => {
					if (edit === 0) {
						res.status(200).json({
							message: 'failed update user'
						});
					} else {
						res.status(200).json(edit);
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
