import { LOGIN, USER_DETAIL } from '../config/constants';
import axios from 'axios';

export const login = (dataUser) => {
	return {
		type: LOGIN,
		payload: axios({
			method: 'POST',
			url: `http://localhost:5000/api/v1/login`,
			dataUser
		})
	};
};

export const getProfileUser = () => {
	let token = localStorage.getItem('token');
	token = 'Bearer ' + token;
	return {
		type: USER_DETAIL,
		payload: axios({
			method: 'GET',
			url: `http://localhost:5000/api/v1/profile`,
			headers: {
				Authorization: token
			}
		})
	};
};
