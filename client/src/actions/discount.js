import {
	GET_DISCOUNTS,
	GET_ERRORS,
	ADD_DISCOUNT,
	DELETE_DISCOUNT,
	EDIT_DISCOUNT_DATA,
	UPDATE_DISCOUNT,
	LOADING
} from './types';
import axios from 'axios';

// add a new discount
const addDiscount = (discount) => async (dispatch) => {
	dispatch(setLoading());
	try {
		const res = await axios.post('/api/deal', discount);
		const { data } = res.data;
		dispatch({
			type: ADD_DISCOUNT,
			payload: data
		});
	} catch (error) {
		console.log(error);
		dispatch({ type: GET_ERRORS, payload: { error: error.response.data } });
	}
};

const getDiscount = () => async (dispatch) => {
	dispatch(setLoading());
	try {
		const res = await axios.get('/api/deal');
		const { data: { deals } } = res.data;
		dispatch({
			type: GET_DISCOUNTS,
			payload: deals
		});
	} catch (error) {
		console.log(error);
		dispatch({ type: GET_ERRORS, payload: { error: error.message } });
	}
};

const updateDiscount = (discount) => async (dispatch) => {
	dispatch(setLoading());
	const { formInputs, updatedCategory } = discount;
	const { id, ...rest } = formInputs;
	try {
		const res = await axios.put(`/api/deal/${id}`, rest);
		const { data } = res.data;
		dispatch({
			type: UPDATE_DISCOUNT,
			payload: { ...data, dealCategory: updatedCategory }
		});
	} catch (error) {
		console.log(error);
		dispatch({ type: GET_ERRORS, payload: { error: error.response.data } });
	}
};

const deleteDiscount = (id) => async (dispatch) => {
	dispatch(setLoading());
	try {
		await axios.delete(`/api/deal/${id}`);
		dispatch({
			type: DELETE_DISCOUNT,
			payload: id
		});
	} catch (error) {
		console.log(error);
		dispatch({ type: GET_ERRORS, payload: { error: error.response.data } });
	}
};

const editData = (dicount) => (dispatch) => {
	dispatch({ type: EDIT_DISCOUNT_DATA, payload: dicount });
};

export const setLoading = () => {
	return {
		type: LOADING
	};
};

export { getDiscount, deleteDiscount, addDiscount, editData, updateDiscount };
