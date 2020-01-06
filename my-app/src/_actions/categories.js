import { GET_CATEGORIES, GET_EVENTS_CATEGORY, GET_CATEGORY_DETAILS } from '../config/constants';
import axios from 'axios';

export const getCategories = () => {
	return {
		type: GET_CATEGORIES,
		payload: axios({
			method: 'GET',
			url: 'http://localhost:5000/api/v1/categories'
		})
	};
};

export const getEventCategory = (categoryId) => {
	return {
		type: GET_EVENTS_CATEGORY,
		payload: axios({
			method: 'GET',
			url: `http://localhost:5000/api/v1/category/${categoryId}/events`
		})
	};
};

export const categoryDetails = (categoryId) => {
	return {
		type: GET_CATEGORY_DETAILS,
		payload: axios({
			method: 'GET',
			url: `http://localhost:5000/api/v1/category/${categoryId}`
		})
	};
};
