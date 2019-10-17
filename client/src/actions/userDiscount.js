import axios from 'axios';
import {
	GET_USER_DISCOUNT,
	SET_USERS_SELECTION,
	USER_DEAL_LOADING,
	GET_ERRORS,
	SAVE_USER_DISCOUNT,
	SET_TOTAL_LOCK_PRICE,
	GET_LOCKED_OFFERS,
	CONFIRM_PAYMENT
} from './types';

//window.location.href = `${authorization_url}`;
export const getUserDiscount = (selectionDetail) => async (dispatch) => {
	// make request
	dispatch(setLoading());
	const { range, category } = selectionDetail;
	const minRange = range.value[0];
	const maxRange = range.value[1];
	const uri = `/api/deal/request?studentMax=${maxRange}&studentMin=${minRange}&category=${category.alias}`;
	try {
		const res = await axios.get(uri);
		const { data } = res;
		dispatch({ type: GET_USER_DISCOUNT, payload: data.data });
	} catch (error) {
		console.log(error);
		dispatch({ type: GET_ERRORS, payload: error.message });
	}
};

export const setTotalLockPrice = (detail) => (dispatch) => {
	dispatch({ type: SET_TOTAL_LOCK_PRICE, payload: detail });
};

// Seves the users discount selection.
export const saveUserDiscount = (details) => async (dispatch) => {
	dispatch(setLoading());
	try {
		const res = await axios.post('/api/lockDeal', details);
		const { data } = res.data;
		dispatch({ type: SAVE_USER_DISCOUNT, payload: data });
	} catch (error) {
		console.log(error.response.data);
		dispatch({ type: GET_ERRORS, payload: error.message });
	}
};

export const getAllLockedOffers = () => async (dispatch) => {
	dispatch(setLoading());
	try {
		const res = await axios.get('/api/lockDeal');
		const { data } = res.data;
		dispatch({ type: GET_LOCKED_OFFERS, payload: data });
	} catch (error) {
		console.log(error);
		dispatch({ type: GET_ERRORS, payload: error.message });
	}
};

export const confirmPayment = (reference) => async (dispatch) => {
	dispatch(setLoading());
	try {
		const res = await axios.get(`/api/lockDeal/${reference}`);
		dispatch({ type: CONFIRM_PAYMENT, payload: res.data });
	} catch (error) {
		dispatch({ type: CONFIRM_PAYMENT, payload: error.response.data });
	}
};

export const setSelection = (selection) => (dispatch) => {
	return dispatch({ type: SET_USERS_SELECTION, payload: selection });
};

const setLoading = () => ({
	type: USER_DEAL_LOADING
});
