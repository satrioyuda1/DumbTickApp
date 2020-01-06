import { LOGIN, USER_DETAIL } from '../config/constants';
const initialState = {
	data: [],
	isLoading: false,
	error: false
};

export const isLogin = (state = initialState, action) => {
	switch (action.type) {
		case `${LOGIN}_PENDING`:
			return {
				...state,
				isLoading: true
			};
		case `${LOGIN}_FULFILLED`:
			return {
				...state,
				data: action.payload.data,
				isLoading: false
			};
		case `${LOGIN}_REJECTED`:
			return {
				...state,
				error: true,
				isLoading: false
			};
		default:
			return state;
	}
};

export const profileUser = (state = initialState, action) => {
	switch (action.type) {
		case `${USER_DETAIL}_PENDING`:
			return {
				...state,
				isLoading: true
			};
		case `${USER_DETAIL}_FULFILLED`:
			return {
				...state,
				data: action.payload.data,
				isLoading: false
			};
		case `${USER_DETAIL}_REJECTED`:
			return {
				...state,
				error: true,
				isLoading: false
			};
		default:
			return state;
	}
};
