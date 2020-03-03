import {
	PAYMENT_ERROR,
	PAYMENT_SUCCESS,
	PAYMENT_LOADING,
	PAYMENT_CONFIRM_FAILED,
	PAYMENT_CONFIRM_TRUE
} from '../actions/types';

const initialState = {
	paymentDetail: null,
	paymentLoading: false,
	confirmed: null,
	confirmPayload: {},
	paymentError: null
};

export default (state = initialState, action) => {
	switch (action.type) {
		case PAYMENT_SUCCESS:
			return {
				...state,
				paymentDetail: action.payload,
				paymentLoading: false
			};
		case PAYMENT_CONFIRM_TRUE:
			return {
				...state,
				confirmed: true,
				confirmPayload: action.payload,
				payloadLoading: false
			};
		case PAYMENT_CONFIRM_FAILED:
			return {
				...state,
				confirmed: false,
				payloadLoading: false
			};
		case PAYMENT_ERROR:
			return {
				...state,
				paymentError: action.payload,
				paymentLoading: false
			};
		case PAYMENT_LOADING:
			return {
				...state,
				paymentLoading: true
			};

		default:
			return state;
	}
};
