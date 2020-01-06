//reducers untuk function state global
import { GET_CATEGORIES, GET_EVENTS_CATEGORY, GET_CATEGORY_DETAILS } from '../config/constants';
const initialState = {
	data: [],
	category: [],
	isLoading: false,
	isPost: false,
	error: false
};

//menghindari typo untuk actiontype
export const categories = (state = initialState, action) => {
	switch (action.type) {
		case `${GET_CATEGORIES}_PENDING`:
			return {
				...state,
				isLoading: true
			};
		case `${GET_CATEGORIES}_FULFILLED`:
			console.log(action.type);
			return {
				...state,
				data: action.payload.data,
				category: action.payload.data,
				isLoading: false
			};
		case `${GET_CATEGORIES}_REJECTED`:
			return {
				...state,
				error: true,
				isLoading: false
			};
		default:
			return state;
	}
};

export const eventCategory = (state = initialState, action) => {
	switch (action.type) {
		case `${GET_EVENTS_CATEGORY}_PENDING`:
			return {
				...state,
				isLoading: true
			};
		case `${GET_EVENTS_CATEGORY}_FULFILLED`:
			console.log(action.type);
			return {
				...state,
				data: action.payload.data,

				isLoading: false
			};
		case `${GET_EVENTS_CATEGORY}_REJECTED`:
			return {
				...state,
				error: true,
				isLoading: false
			};
		default:
			return state;
	}
};

export const categoryDetails = (state = initialState, action) => {
	switch (action.type) {
		case `${GET_CATEGORY_DETAILS}_PENDING`:
			return {
				...state,
				isLoading: true
			};
		case `${GET_CATEGORY_DETAILS}_FULFILLED`:
			console.log(action.type);
			return {
				...state,
				data: action.payload.data,

				isLoading: false
			};
		case `${GET_CATEGORY_DETAILS}_REJECTED`:
			return {
				...state,
				error: true,
				isLoading: false
			};
		default:
			return state;
	}
};
