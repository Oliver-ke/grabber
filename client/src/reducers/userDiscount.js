import {
	GET_USER_DISCOUNT,
	SET_USERS_SELECTION,
	USER_DEAL_LOADING,
	SAVE_USER_DISCOUNT,
	SET_TOTAL_LOCK_PRICE,
	GET_LOCKED_OFFERS,
	CONFIRM_PAYMENT,
	SAVE_USER_DISCOUNT_ERROR,
	PURGE_STATE
} from '../actions/types';

const initialState = {
	discountDetail: {},
	usersSelection: {},
	savedDiscount: {
		saved: false
	},
	lockedOffers: [],
	totalLockPrice: {},
	loading: false,
	confirmPayment: {},
	error: null
};

export default (state = initialState, action) => {
	switch (action.type) {
		case GET_USER_DISCOUNT:
			return {
				...state,
				discountDetail: action.payload,
				loading: false,
				error: null
			};
		case SET_USERS_SELECTION:
			return {
				...state,
				usersSelection: { ...state.usersSelection, ...action.payload }
			};
		case SAVE_USER_DISCOUNT:
			return {
				...state,
				loading: false,
				savedDiscount: { ...action.payload, saved: true },
				error: null
			};
		case SET_TOTAL_LOCK_PRICE:
			return {
				...state,
				totalLockPrice: action.payload
			};
		case SAVE_USER_DISCOUNT_ERROR:
			return {
				...state,
				error: action.payload,
				loading: false
			};
		case GET_LOCKED_OFFERS:
			return {
				...state,
				lockedOffers: action.payload,
				loading: false
			};
		case CONFIRM_PAYMENT:
			return {
				...state,
				confirmPayment: action.payload,
				loading: false,
				error: null
			};
		case USER_DEAL_LOADING:
			return {
				...state,
				loading: true
			};
		case PURGE_STATE:
			return {
				...state,
				savedDiscount: { saved: false }
			};
		default:
			return state;
	}
};
