import { ADD_ORDER_EVENT, GET_ORDER_PENDING, GET_PENDING, GET_PENDING_ORDER, GET_APPROVED } from '../config/constants';
const initialState = {
	order: [],
	isLoading: false,
	error: false
};

export const newOrder = (state = initialState, action) => {
	switch (action.type) {
		case `${ADD_ORDER_EVENT}_PENDING`:
			return {
				...state,
				isLoading: true
			};
		case `${ADD_ORDER_EVENT}_FULFILLED`:
			return {
				...state,
				data: action.payload.data,
				isLoading: false
			};
		case `${ADD_ORDER_EVENT}_REJECTED`:
			return {
				...state,
				error: true,
				isLoading: false
			};
		default:
			return state;
	}
};

export const pendingOrder = (state = initialState, action) => {
	switch (action.type) {
		case `${GET_ORDER_PENDING}_PENDING`:
			return {
				...state,
				isLoading: true
			};
		case `${GET_ORDER_PENDING}_FULFILLED`:
			return {
				...state,
				order: action.payload.data,
				isLoading: false
			};
		case `${GET_ORDER_PENDING}_REJECTED`:
			return {
				...state,
				error: true,
				isLoading: false
			};
		default:
			return state;
	}
};

// export const orderPending = (state = initialState, action) => {
// 	switch (action.type) {
// 		case `${POST_CONFIRM}_PENDING`:
// 			return {
// 				...state,
// 				isLoading: true
// 			};
// 		case `${POST_CONFIRM}_FULFILLED`:
// 			return {
// 				...state,
// 				order: action.payload.data,
// 				isLoading: false
// 			};
// 		case `${POST_CONFIRM}_REJECTED`:
// 			return {
// 				...state,
// 				error: true,
// 				isLoading: false
// 			};
// 		default:
// 			return state;
// 	}
// };

export const getPendingById = (state = initialState, action) => {
	switch (action.type) {
		case `${GET_PENDING}_PENDING`:
			return {
				...state,
				isLoading: true
			};
		case `${GET_PENDING}_FULFILLED`:
			return {
				...state,
				order: action.payload.data,
				isLoading: false
			};
		case `${GET_PENDING}_REJECTED`:
			return {
				...state,
				error: true,
				isLoading: false
			};
		default:
			return state;
	}
};

export const approved = (state = initialState, action) => {
	switch (action.type) {
		case `${GET_APPROVED}_PENDING`:
			return {
				...state,
				isLoading: true
			};
		case `${GET_APPROVED}_FULFILLED`:
			return {
				...state,
				order: action.payload.data,
				isLoading: false
			};
		case `${GET_APPROVED}_REJECTED`:
			return {
				...state,
				error: true,
				isLoading: false
			};
		default:
			return state;
	}
};
