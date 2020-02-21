import MonnifySDK from "../vendor/vendor";
export default ({ amount, email, name, phoneNumber, paidFor }) => {
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
      console.log("Oncomplete", response);
      return response;
    },
    onClose: function(data) {
      //Implement what should happen when the modal is closed here
      console.log("Oncancel", data);
      return data;
    }
  });
};

// TODO
/**
 * Add all payment logic to action
 * implement state change for actions
 * dispatch to listening components
 */
