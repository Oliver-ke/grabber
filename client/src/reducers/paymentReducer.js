import {
    PAYMENT_ERROR,
    PAYMENT_SUCCESS,
    PAYMENT_LOADING
} from '../actions/types';

const initialState = {
    paymentDetail: null,
    paymentLoading: false,
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
