import {PAYMENT_ERROR, PAYMENT_LOADING, PAYMENT_SUCCESS} from './types';
import MonnifySDK from "../vendor/vendor";

export const handlePayment = ({ amount, email, name, phoneNumber, paidFor }) => dispatch => {
    console.log(window.location.href);
    dispatch(setLoading());
    MonnifySDK.initialize({
        amount: amount,
        currency: "NGN",
        reference: "" + Math.floor(Math.random() * 1000000000 + 1),
        customerFullName: name,
        customerEmail: email,
        customerMobileNumber: phoneNumber,
        apiKey: "MK_TEST_9RA9U6E84J",
        contractCode: "1834559411",
        paymentDescription: "Test Pay",
        isTestMode: true,
        metadata: {
          name: name,
          ...paidFor
        },
        onComplete: function(response) {
          //Implement what happens when transaction is completed.
          if(response.status && response.status === 'SUCCESS'){
            return dispatch({type: PAYMENT_SUCCESS, payload: response})
          }
          return dispatch({type: PAYMENT_ERROR, payload: response});
        
        },
        onClose: function(data) {
          //Implement what should happen when the modal is closed here
          if(data.status && data.status === 'SUCCESS'){
            return dispatch({type: PAYMENT_SUCCESS, payload: data})
          }
          return dispatch({type: PAYMENT_ERROR, payload: data});
        }
      });
}

export const verifyMonifyPayment = (reference) => async dispatch => {
    dispatch(setLoading());
    console.log('fired');
    // send server request to verify payment;
}

const setLoading = () => ({
    type: PAYMENT_LOADING
  });