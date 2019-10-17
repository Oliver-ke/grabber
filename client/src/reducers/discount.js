import {
	ADD_DISCOUNT,
	GET_DISCOUNTS,
	EDIT_DISCOUNT_DATA,
	DELETE_DISCOUNT,
	LOADING,
	UPDATE_DISCOUNT
} from '../actions/types';

const initialState = {
	discounts: [],
	editData: {},
	loading: false
};

export default (state = initialState, action) => {
	switch (action.type) {
		case GET_DISCOUNTS:
			return {
				...state,
				discounts: action.payload,
				loading: false
			};

		case ADD_DISCOUNT:
			return {
				...state,
				discounts: [ ...state.discounts, action.payload ],
				loading: false
			};
		case UPDATE_DISCOUNT:
			return {
				...state,
				loading: false,
				discounts: state.discounts.map((item) => (item.id === action.payload.id ? action.payload : item))
			};
		case DELETE_DISCOUNT:
			return {
				...state,
				discounts: state.discounts.filter((discount) => discount.id !== action.payload),
				loading: false
			};
		case EDIT_DISCOUNT_DATA:
			return {
				...state,
				editData: action.payload,
				loading: false
			};
		case LOADING:
			return {
				...state,
				loading: true
			};
		default:
			return state;
	}
};
