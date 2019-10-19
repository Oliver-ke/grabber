import axios from 'axios';
import {
	GET_LOCKED_OFFERS,
	LOCKED_OFFER_LOADING,
	GET_ERRORS,
	EDIT_LOCKED_OFFER,
	DELETE_LOCKED_OFFER,
	SET_EDIT_DATA
} from './types';

export const getAllLockedOffers = () => async (dispatch) => {
	dispatch(setLoading());
	try {
		const res = await axios.get('/api/lockDeal');
		const { data } = res.data;
		dispatch({ type: GET_LOCKED_OFFERS, payload: data.lockDeals });
	} catch (error) {
		console.log(error);
		dispatch({ type: GET_ERRORS, payload: error.message });
	}
};

export const setEditData = (payload) => (dispatch) => {
	dispatch({ type: SET_EDIT_DATA, payload });
};

export const updateLockedOffer = (payload) => async (dispatch) => {
	dispatch(setLoading());
	const { id, formInputs } = payload;
	try {
		const res = await axios.put(`/api/lockDeal/${id}`, formInputs);
		const { data } = res.data;
		console.log(data);
		dispatch({ type: EDIT_LOCKED_OFFER, payload: data });
	} catch (error) {
		console.log(error);
		dispatch({ type: GET_ERRORS, payload: error.message });
	}
};

export const deleteLockedOffer = (id) => async (dispatch) => {
	dispatch(setLoading());
	try {
		await axios.delete(`/api/lockDeal/${id}`);
		dispatch({ type: DELETE_LOCKED_OFFER, payload: id });
	} catch (error) {
		console.log(error);
		dispatch({ type: GET_ERRORS, payload: error.message });
	}
};

const setLoading = () => ({ type: LOCKED_OFFER_LOADING });
