import { ADD_CATEGORY, DELETE_CATEGORY, GET_CATEGORIES, CATEGORY_LOADING } from '../actions/types';

const initialState = {
	categories: [],
	loading: false
};

export default (state = initialState, action) => {
	switch (action.type) {
		case GET_CATEGORIES:
			return {
				...state,
				categories: action.payload,
				loading: false
			};
		case ADD_CATEGORY:
			return {
				...state,
				categories: [ ...state.categories, action.payload ],
				loading: false
			};
		case DELETE_CATEGORY:
			return {
				...state,
				categories: state.categories.filter((category) => category.id !== action.payload),
				loading: false
			};
		case CATEGORY_LOADING:
			return {
				...state,
				loading: true
			};
		default:
			return state;
	}
};
