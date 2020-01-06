import { createStore, combineReducers, applyMiddleware } from 'redux';
import { categories, eventCategory, categoryDetails } from '../_reducers/categories';
import { events, eventsToday, eventsUpcoming, eventsDetail, eventbytitle, addEvent } from '../_reducers/events';
import { isLogin, profileUser } from '../_reducers/user';
import { newOrder, pendingOrder, getPending, approved, getPendingById } from '../_reducers/payments';
import { promise, logger } from './middleware';

//get all reducers available
//global state come from here
const rootReducers = combineReducers({
	categories,
	events,
	eventsToday,
	eventCategory,
	categoryDetails,
	eventsUpcoming,
	eventsDetail,
	eventbytitle,
	isLogin,
	profileUser,
	addEvent,
	newOrder,
	pendingOrder,
	getPendingById,
	approved
});

const store = createStore(rootReducers, applyMiddleware(promise, logger));
export default store;
