import { combineReducers } from 'redux';
import authReducer from './auth';
import discountReducer from './discount';
import userDiscountReducer from './userDiscount';
import categoryReducer from './category';
import errorReducer from './error';
import lockedOffer from './lockedOffer';
import paymentReducer from './paymentReducer';

export default combineReducers({
	auth: authReducer,
	discount: discountReducer,
	userDiscount: userDiscountReducer,
	category: categoryReducer,
	errors: errorReducer,
	lockedOffer,
	payment: paymentReducer
});
