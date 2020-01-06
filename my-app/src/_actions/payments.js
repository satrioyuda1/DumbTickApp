import { ADD_ORDER_EVENT, GET_ORDER_PENDING, GET_PENDING_ORDER, GET_PENDING, GET_APPROVED } from '../config/constants';
import axios from 'axios';

export const setNewOrder = (order) => {
	let token = localStorage.getItem('token');
	token = 'Bearer ' + token;
	return {
		type: ADD_ORDER_EVENT,
		payload: axios({
			method: 'POST',
			url: 'http://localhost:5000/api/v1/order/',
			headers: {
				Authorization: token
			},
			data: order
		})
	};
};
export const getPendingOrder = () => {
	let token = localStorage.getItem('token');
	token = 'Bearer ' + token;
	return {
		type: GET_ORDER_PENDING,
		payload: axios({
			method: 'GET',
			url: 'http://localhost:5000/api/v1/order/',
			headers: {
				Authorization: token
			}
		})
	};
};

export const getPending = (id) => {
	let token = localStorage.getItem('token');
	token = 'Bearer ' + token;
	return {
		type: GET_PENDING,
		payload: axios({
			method: 'GET',
			url: `http://localhost:5000/api/v1/order/${id}`,
			headers: {
				Authorization: token
			}
		})
	};
};

export const getApproved = (id) => {
	let token = localStorage.getItem('token');
	token = 'Bearer ' + token;
	return {
		type: GET_APPROVED,
		payload: axios({
			method: 'GET',
			url: `http://localhost:5000/api/v1/approved`,
			headers: {
				Authorization: token
			}
		})
	};
};
