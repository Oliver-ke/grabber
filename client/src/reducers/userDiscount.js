import {
	GET_USER_DISCOUNT,
	SET_USERS_SELECTION,
	USER_DEAL_LOADING,
	SAVE_USER_DISCOUNT,
	SET_TOTAL_LOCK_PRICE,
	GET_LOCKED_OFFERS,
	CONFIRM_PAYMENT
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
	confirmPayment: {}
};

export default (state = initialState, action) => {
	switch (action.type) {
		case GET_USER_DISCOUNT:
			return {
				...state,
				discountDetail: action.payload,
				loading: false
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
				savedDiscount: { ...action.payload, saved: true }
			};
		case SET_TOTAL_LOCK_PRICE:
			return {
				...state,
				totalLockPrice: action.payload
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
				loading: false
			};
		case USER_DEAL_LOADING:
			return {
				...state,
				loading: true
			};
		default:
			return state;
	}
};
