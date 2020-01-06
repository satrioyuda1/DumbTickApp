import {
	GET_EVENTS,
	GET_EVENTS_TODAY,
	GET_EVENTS_UPCOMING,
	GET_EVENT_DETAIL,
	GET_EVENT_TITLE,
	ADD_EVENT
} from '../config/constants';
const initialState = {
	data: [],
	isLoading: false,
	error: false
};

export const events = (state = initialState, action) => {
	switch (action.type) {
		case `${GET_EVENTS}_PENDING`:
			return {
				...state,
				isLoading: true
			};
		case `${GET_EVENTS}_FULFILLED`:
			return {
				...state,
				data: action.payload.data,
				isLoading: false
			};
		case `${GET_EVENTS}_REJECTED`:
			return {
				...state,
				error: true,
				isLoading: false
			};
		default:
			return state;
	}
};

export const eventsToday = (state = initialState, action) => {
	switch (action.type) {
		case `${GET_EVENTS_TODAY}_PENDING`:
			return {
				...state,
				isLoading: true
			};
		case `${GET_EVENTS_TODAY}_FULFILLED`:
			return {
				...state,
				data: action.payload.data,
				isLoading: false
			};
		case `${GET_EVENTS_TODAY}_REJECTED`:
			return {
				...state,
				error: true,
				isLoading: false
			};
		default:
			return state;
	}
};

export const eventsUpcoming = (state = initialState, action) => {
	switch (action.type) {
		case `${GET_EVENTS_UPCOMING}_PENDING`:
			return {
				...state,
				isLoading: true
			};
		case `${GET_EVENTS_UPCOMING}_FULFILLED`:
			return {
				...state,
				data: action.payload.data,
				isLoading: false
			};
		case `${GET_EVENTS_UPCOMING}_REJECTED`:
			return {
				...state,
				error: true,
				isLoading: false
			};
		default:
			return state;
	}
};

export const eventsDetail = (state = initialState, action) => {
	switch (action.type) {
		case `${GET_EVENT_DETAIL}_PENDING`:
			return {
				...state,
				isLoading: true
			};
		case `${GET_EVENT_DETAIL}_FULFILLED`:
			return {
				...state,
				data: action.payload.data,
				isLoading: false
			};
		case `${GET_EVENT_DETAIL}_REJECTED`:
			return {
				...state,
				error: true,
				isLoading: false
			};
		default:
			return state;
	}
};

export const eventbytitle = (state = initialState, action) => {
	switch (action.type) {
		case `${GET_EVENT_TITLE}_PENDING`:
			return {
				...state,
				isLoading: true
			};
		case `${GET_EVENT_TITLE}_FULFILLED`:
			return {
				...state,
				data: action.payload.data,
				isLoading: false
			};
		case `${GET_EVENT_TITLE}_REJECTED`:
			return {
				...state,
				error: true,
				isLoading: false
			};
		default:
			return state;
	}
};

export const addEvent = (state = initialState, action) => {
	switch (action.type) {
		case `${ADD_EVENT}_PENDING`:
			return {
				...state,
				isLoading: true
			};
		case `${ADD_EVENT}_FULFILLED`:
			return {
				...state,
				data: action.payload.data,
				isLoading: false
			};
		case `${ADD_EVENT}_REJECTED`:
			return {
				...state,
				error: true,
				isLoading: false
			};
		default:
			return state;
	}
};
