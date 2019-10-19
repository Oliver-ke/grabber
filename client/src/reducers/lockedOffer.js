import {
	EDIT_LOCKED_OFFER,
	DELETE_LOCKED_OFFER,
	GET_LOCKED_OFFERS,
	LOCKED_OFFER_LOADING,
	SET_EDIT_DATA
} from '../actions/types';

const initialState = {
	lockedOffers: [],
	editData: {},
	loading: false
};

export default (state = initialState, action) => {
	switch (action.type) {
		case GET_LOCKED_OFFERS:
			return {
				...state,
				lockedOffers: action.payload,
				loading: false
			};
		case EDIT_LOCKED_OFFER:
			return {
				...state,
				lockedOffers: state.lockedOffers.map((item) => (item.id === action.payload.id ? action.payload : item)),
				loading: false
			};
		case SET_EDIT_DATA:
			return {
				...state,
				editData: action.payload
			};
		case DELETE_LOCKED_OFFER:
			return {
				...state,
				lockedOffers: state.lockedOffers.filter((offer) => offer.id !== action.payload),
				loading: false
			};
		case LOCKED_OFFER_LOADING:
			return {
				...state,
				loading: true
			};
		default:
			return state;
	}
};
