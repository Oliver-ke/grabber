import { ADD_CATEGORY, DELETE_CATEGORY, GET_CATEGORIES, CATEGORY_LOADING } from './types';
import axios from 'axios';

export const getCategories = () => async (dispatch) => {
	//make loading
	dispatch(loading());
	try {
		const { data: { data } } = await axios.get('/api/category');
		dispatch({ type: GET_CATEGORIES, payload: data });
	} catch (error) {
		console.log(error);
	}
};

export const addCategory = (category) => async (dispatch) => {
	//make loading
	dispatch(loading());
	console.log(category);
	try {
		const res = await axios.post('/api/category', category);
		const { data } = res.data;
		if (data) {
			dispatch({ type: ADD_CATEGORY, payload: data });
		}
	} catch (error) {
		console.log(error);
	}
};

export const deleteCategory = (id) => async (dispatch) => {
	dispatch(loading());
	try {
		await axios.delete(`/api/category/${id}`);
		dispatch({ type: DELETE_CATEGORY, payload: id });
	} catch (error) {
		console.log(error);
	}
};

const loading = () => ({ type: CATEGORY_LOADING });
