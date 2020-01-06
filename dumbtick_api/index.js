require('express-group-routes');
const middleware = require('./middleware');
const express = require('express');
const cors = require('cors');

const app = express();
const bodyParser = require('body-parser');
const port = 5000;

// const categoriesController = require('./controllers/category');
const userController = require('./controllers/auth');
const categoryController = require('./controllers/categories');
const eventController = require('./controllers/event');
const orderController = require('./controllers/order');
const favoritesController = require('./controllers/favorites');

app.use(bodyParser.json());
app.use(cors());

app.group('/api/v1', (router) => {
	//crud categories
	router.get('/categories', categoryController.index);
	router.get('/category/:id/events', categoryController.eventAll);
	router.get('/category/:id', categoryController.show);
	//crud users
	router.post('/signup', userController.signUp);
	router.post('/login', userController.login);
	router.get('/profile', middleware.auth, userController.showProfile);
	router.put('/profile',middleware.auth, userController.edit)
	//crud events
	router.get('/events', eventController.list);
	router.get('/events/search', eventController.search);
	router.post('/event', middleware.auth, eventController.save);
	router.get('/event/:id', eventController.detail);
	router.get('/events/today', eventController.today);
	router.delete('/event/:id', middleware.auth, eventController.delete);
	router.put('/event/:id', middleware.auth, eventController.update);
	router.get('/events/upcoming', eventController.upcomingEvent);
	//crud order
	router.get('/order', middleware.auth, orderController.pendingOrder);
	router.get('/order/:id', middleware.auth, orderController.orderPending);
	router.get('/approved', middleware.auth, orderController.orderApproved);
	router.post('/order', middleware.auth, orderController.addOrder);
	router.put('/confirm/:id', middleware.auth, orderController.confirmOrder);
	router.delete('/order/:id', middleware.auth, orderController.deleteOrder);
	//crud favorites
	router.post('/event/:id/favorite', middleware.auth, favoritesController.addFavorite);
});

app.listen(port, () => {
	console.log(`Listening on port ${port}!`);
});
