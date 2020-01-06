import {
	GET_EVENTS,
	GET_EVENTS_TODAY,
	GET_EVENTS_UPCOMING,
	GET_EVENT_DETAIL,
	GET_EVENT_TITLE,
	ADD_EVENT
} from '../config/constants';
import axios from 'axios';

export const getEvents = () => {
	return {
		type: GET_EVENTS,
		payload: axios({
			method: 'GET',
			url: 'http://localhost:5000/api/v1/events'
		})
	};
};

export const getEventsToday = () => {
	return {
		type: GET_EVENTS_TODAY,
		payload: axios({
			method: 'GET',
			url: 'http://localhost:5000/api/v1/events/today'
		})
	};
};

export const getEventUpcoming = () => {
	return {
		type: GET_EVENTS_UPCOMING,
		payload: axios({
			method: 'GET',
			url: 'http://localhost:5000/api/v1/events/upcoming'
		})
	};
};

export const eventsDetails = (eventId) => {
	return {
		type: GET_EVENT_DETAIL,
		payload: axios({
			method: 'GET',
			url: `http://localhost:5000/api/v1/event/${eventId}`
		})
	};
};

export const eventbytitle = (title) => {
	return {
		type: GET_EVENT_TITLE,
		payload: axios({
			method: 'GET',
			url: `http://localhost:5000/api/v1/events/search/?title=${title}`
		})
	};
};

export const addEvent = (event) => {
	let token = localStorage.getItem('token');
	token = 'Bearer ' + token;
	return {
		type: ADD_EVENT,
		payload: axios({
			method: 'POST',
			url: `http://localhost:5000/api/v1/event`,
			headers: {
				Authorization: token
			},
			data: event
		})
	};
};
